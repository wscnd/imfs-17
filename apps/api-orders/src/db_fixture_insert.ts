import { NestFactory } from "@nestjs/core";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppModule } from "./app/app.module";
import { Product } from "./modules/products/entities/product.entity";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepository = dataSource.getRepository<Product>('Product');
  await productRepository.insert([
    {
      id: '30f7d68e-d3fd-4d77-91b3-1e8a7c3248b5',
      name: 'Product 1',
      image_url: 'img_urll',
      description: 'Description 1',
      price: 100,
    },
    {
      id: '424821be-b6b7-4ee8-b648-9002e25fd3a6',
      name: 'Product 8',
      image_url: 'img_urll',
      description: 'Description 8',
      price: 800,
    },
    {
      id: '73ef6ec7-0392-4b02-8694-c9b0b55f8185',
      name: 'Product 5',
      image_url: 'img_urll',
      description: 'Description 5',
      price: 500,
    },
    {
      id: '744296a2-971d-45fa-9f05-23e1fa89c4c9',
      name: 'Product 3',
      image_url: 'img_urll',
      description: 'Description 3',
      price: 300,
    },
    {
      id: '7de32342-45f7-4ec6-95a0-ed4f21b6bbbc',
      name: 'Product 4',
      image_url: 'img_urll',
      description: 'Description 4',
      price: 400,
    },
    {
      id: '8ebc5a47-407e-4b58-9b29-a35cd950e6dc',
      name: 'Product 7',
      image_url: 'img_urll',
      description: 'Description 7',
      price: 700,
    },
    {
      id: 'b147ae2d-5af3-4a18-9eed-3daea817d49c',
      name: 'Product 9',
      image_url: 'img_urll',
      description: 'Description 9',
      price: 900,
    },
    {
      id: 'cb011767-457c-4c9f-9b46-200c05189fa2',
      name: 'Product 10',
      image_url: 'img_urll',
      description: 'Description 10',
      price: 1000,
    },
    {
      id: 'd500e466-0184-4816-b838-f6515bcc73f9',
      name: 'Product 2',
      image_url: 'img_urll',
      description: 'Description 2',
      price: 200,
    },
    {
      id: 'da4b3303-4171-46bf-9ba4-f872cc8f4e25',
      name: 'Product 6',
      image_url: 'img_urll',
      description: 'Description 6',
      price: 600,
    },
  ]);

  await app.close();
}

bootstrap();
