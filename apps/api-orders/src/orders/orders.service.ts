import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto, client_id: number) {
    const productIds = [
      ...new Set(createOrderDto.items.map(({ product_id }) => product_id)),
    ];

    const productPrices = await this.productRepository.findBy({
      id: In(productIds),
    });

    if (productPrices.length !== createOrderDto.items.length) {
      throw new Error(`Algum produto não existe.\n${createOrderDto.items}`);
    }

    const order = Order.create({
      client_id,
      items: createOrderDto.items.map(({ product_id, quantity }) => {
        const { price } = productPrices.find(({ id }) => product_id === id);
        return {
          price,
          product_id,
          quantity,
        };
      }),
    });

    const created = await this.repository.save(order);
    await this.amqpConnection.publish(
      process.env.RABBITMQ_EXCHANGE_ORDERS,
      process.env.RABBITMQ_RK_ORDER_CREATED,
      {
        order_id: order.id,
        card_hash: createOrderDto.card_hash,
        total: order.total,
      },
    );
    return created;
  }

  findAll(client_id: number) {
    return this.repository.find({
      where: {
        client_id,
      },
    });
  }

  async findOne(id: string) {
    return await this.repository.findOneByOrFail({ id });
  }

  async pay(id: string) {
    const order = await this.repository.findOneByOrFail({
      id,
    });

    order.pay();
    await this.repository.save(order);

    return order;
  }

  async fail(id: string) {
    const order = await this.repository.findOneByOrFail({
      id,
    });

    order.fail();
    await this.repository.save(order);
    return order;
  }
}
