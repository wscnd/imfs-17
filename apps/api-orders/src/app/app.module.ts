import { Module } from "@nestjs/common";
import { AuthModule } from "../modules/auth/auth.module";
import { OrderItem } from "../modules/orders/entities/order-item.entity";
import { Order } from "../modules/orders/entities/order.entity";
import { OrdersModule } from "../modules/orders/orders.module";
import { Product } from "../modules/products/entities/product.entity";
import { ProductsModule } from "../modules/products/products.module";
import { RabbitmqModule } from "../modules/rabbitmq/rabbitmq.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'product_db_dev',
      entities: [Product, OrderItem, Order],
      synchronize: true,
      logging: true,
    }),
    ProductsModule,
    OrdersModule,
    AuthModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
