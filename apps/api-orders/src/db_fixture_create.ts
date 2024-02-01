import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from './app/app.module';
import { Product } from './modules/products/entities/product.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepository = dataSource.getRepository<Product>('Product');
  const created = await productRepository.create([
    {
      name: 'Product 1',
      description: 'Description 1',
      image_url: 'img_urll',
      price: 100,
    },
    {
      name: 'Product 2',
      description: 'Description 2',
      image_url: 'img_urll',
      price: 200,
    },
    {
      name: 'Product 3',
      description: 'Description 3',
      image_url: 'img_urll',
      price: 300,
    },
    {
      name: 'Product 4',
      description: 'Description 4',
      image_url: 'img_urll',
      price: 400,
    },
    {
      name: 'Product 5',
      description: 'Description 5',
      image_url: 'img_urll',
      price: 500,
    },
    {
      name: 'Product 6',
      description: 'Description 6',
      image_url: 'img_urll',
      price: 600,
    },
    {
      name: 'Product 7',
      description: 'Description 7',
      image_url: 'img_urll',
      price: 700,
    },
    {
      name: 'Product 8',
      description: 'Description 8',
      image_url: 'img_urll',
      price: 800,
    },
    {
      name: 'Product 9',
      description: 'Description 9',
      image_url: 'img_urll',
      price: 900,
    },
    {
      name: 'Product 10',
      description: 'Description 10',
      image_url: 'img_urll',
      price: 1000,
    },
  ]);

  await productRepository.save(created);

  await app.close();
}

bootstrap();
