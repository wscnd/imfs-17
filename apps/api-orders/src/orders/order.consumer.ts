import {
  AmqpConnection,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { IRabbitOrderMessage, OrderStatus } from '@nx-imfs-17/shared/types';
import { OrdersService } from './orders.service';

@Injectable()
export class OrderConsumer {
  constructor(
    private orderService: OrdersService,
    private amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    exchange: process.env.RABBITMQ_EXCHANGE_ORDERS,
    routingKey: process.env.RABBITMQ_RK_ORDER_UPDATED,
    queue: process.env.RABBITMQ_QUEUE_ORDER_UPDATED,
  })
  async consume(message: IRabbitOrderMessage) {
    if (!message) {
      await this.sendToError(
        new InvalidStatusError('invalid message'),
        message,
      );
    } else {
      try {
        switch (message.status) {
          case OrderStatus.PAID:
            await this.orderService.pay(message.order_id);
            return;
          case OrderStatus.FAILED:
            await this.orderService.fail(message.order_id);
            return;
          default:
            throw new InvalidStatusError('invalid status');
        }
      } catch (e) {
        await this.sendToError(e, message);
      }
    }

    return new Nack(false);
  }

  async sendToError(e: Error, message) {
    await this.amqpConnection.publish(
      process.env.RABBITMQ_EXCHANGE_ORDERS,
      process.env.RABBITMQ_RK_ORDER_FAILED,
      {
        error: e.message,
        order_id: message?.order_id,
      },
    );
  }
}

class InvalidStatusError extends Error {
  constructor(invalidStatus: string) {
    super(`Invalid Status: ${invalidStatus}`);
  }
}
