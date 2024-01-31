import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([
    {
      name: 'Product 01',
      description: 'Product 01 description',
      image_url: 'https://via.placeholder.com/150',
      price: 50,
      id: '7a21b95e-4b29-4cb3-9535-84a3a6d19ef0',
    },
    {
      name: 'Product 02',
      description: 'Product 02 description',
      image_url: 'https://via.placeholder.com/150',
      price: 75,
      id: '8d4c2f19-65fd-4a29-92c9-d32f2d84b2bc',
    },
    {
      name: 'Product 03',
      description: 'Product 03 description',
      image_url: 'https://via.placeholder.com/150',
      price: 120,
      id: 'f7a9e0cd-462f-4e65-849f-1b413ae8a076',
    },
    {
      name: 'Product 04',
      description: 'Product 04 description',
      image_url: 'https://via.placeholder.com/150',
      price: 90,
      id: '2fc83e9d-3cb3-4d2b-aa67-5118c5f55d1d',
    },
    {
      name: 'Product 05',
      description: 'Product 05 description',
      image_url: 'https://via.placeholder.com/150',
      price: 60,
      id: '6a1f94c7-aa87-4db0-890f-8ad37a0e93ef',
    },
    {
      name: 'Product 06',
      description: 'Product 06 description',
      image_url: 'https://via.placeholder.com/150',
      price: 100,
      id: '4b3e8617-02ef-436e-852a-280c0a03a84e',
    },
    {
      name: 'Product 07',
      description: 'Product 07 description',
      image_url: 'https://via.placeholder.com/150',
      price: 80,
      id: '9e8b352c-73ab-4a25-a2a9-96a285d0df9f',
    },
    {
      name: 'Product 08',
      description: 'Product 08 description',
      image_url: 'https://via.placeholder.com/150',
      price: 110,
      id: 'c2c489e7-2548-4f36-9267-f0a4d7915354',
    },
    {
      name: 'Product 09',
      description: 'Product 09 description',
      image_url: 'https://via.placeholder.com/150',
      price: 70,
      id: 'b098b36a-92a5-494b-b2cc-6a1c2c63a2bc',
    },
    {
      name: 'Product 10',
      description: 'Product 10 description',
      image_url: 'https://via.placeholder.com/150',
      price: 95,
      id: '3dcd161e-f059-4844-ae94-832a8e888dbb',
    },
    {
      name: 'Product 11',
      description: 'Product 11 description',
      image_url: 'https://via.placeholder.com/150',
      price: 85,
      id: 'a6a4d719-c2a8-4fa6-9e91-8d7759244c9e',
    },
    {
      name: 'Product 12',
      description: 'Product 12 description',
      image_url: 'https://via.placeholder.com/150',
      price: 65,
      id: 'e157c8d6-7680-4e76-8f90-5ee1cf2675c5',
    },
    {
      name: 'Product 13',
      description: 'Product 13 description',
      image_url: 'https://via.placeholder.com/150',
      price: 115,
      id: '1a2c3e4f-5678-90ab-cdef-123456789abc',
    },
    {
      name: 'Product 14',
      description: 'Product 14 description',
      image_url: 'https://via.placeholder.com/150',
      price: 75,
      id: 'f0a1b2c3-d4e5-6789-0abc-123456789def',
    },
    {
      name: 'Product 15',
      description: 'Product 15 description',
      image_url: 'https://via.placeholder.com/150',
      price: 110,
      id: '567890ab-cdef-1234-5678-90abcdef0123',
    },
    {
      name: 'Product 16',
      description: 'Product 16 description',
      image_url: 'https://via.placeholder.com/150',
      price: 95,
      id: '90123456-789a-bcde-f012-3456789abcde',
    },
    {
      name: 'Product 17',
      description: 'Product 17 description',
      image_url: 'https://via.placeholder.com/150',
      price: 80,
      id: 'cdef0123-4567-89ab-cdef-0123456789ab',
    },
    {
      name: 'Product 18',
      description: 'Product 18 description',
      image_url: 'https://via.placeholder.com/150',
      price: 105,
      id: '23456789-abcdef-0123-4567-89abcdef01',
    },
    {
      name: 'Product 19',
      description: 'Product 19 description',
      image_url: 'https://via.placeholder.com/150',
      price: 70,
      id: '89abcdef-0123-4567-89ab-cdef01234567',
    },
    {
      name: 'Product 20',
      description: 'Product 20 description',
      image_url: 'https://via.placeholder.com/150',
      price: 100,
      id: '3456789a-bcde-f012-3456-789abcdef012',
    },
  ]);

  await app.close();
}
bootstrap();
