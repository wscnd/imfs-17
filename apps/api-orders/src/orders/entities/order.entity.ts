import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from '@nx-imfs-17/shared/types';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  // TODO: create foreign key
  @Column()
  client_id: number; // usuario autenticado

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
    eager: true,
  })
  items: Array<OrderItem>;

  static create(input: CreateOrderCommand) {
    const order = new Order();
    order.client_id = input.client_id;
    order.items = input.items.map((i) => {
      const items = new OrderItem();
      items.product_id = i.product_id;
      items.quantity = i.quantity;
      items.price = i.price;
      return items;
    });
    order.total = order.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return order;
  }

  pay() {
    switch (this.status) {
      case OrderStatus.PAID:
        throw new Error('order already paid');

      case OrderStatus.FAILED:
        throw new Error('order failed');

      default:
        this.status = OrderStatus.PAID;
    }
  }

  fail() {
    switch (this.status) {
      case OrderStatus.FAILED:
        throw new Error('order already failed');
      case OrderStatus.PAID:
        throw new Error('order already paid');
      default:
        this.status = OrderStatus.FAILED;
    }
  }
}

export type CreateOrderCommand = {
  client_id: number;
  items: Array<{
    price: number;
    product_id: string;
    quantity: number;
  }>;
};
