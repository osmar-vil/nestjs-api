import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { In, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private OrderRepo: Repository<Order>,
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: number }) {
    const productIds = createOrderDto.items.map((x) => x.product_id);
    const uniqueProductIds = [...new Set(productIds)]; // this strategy delete the duplicated IDs
    const products = await this.ProductRepo.findBy({
      id: In(uniqueProductIds),
    });

    if (products.length !== uniqueProductIds.length)
      throw new Error(
        `Some products wasn't find, please verify your list. products send: ${productIds}; find Products: ${products.map((x) => x.id)}`,
      );

    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((x) => {
        const { price } = products.find((y) => (y.id = x.product_id));

        return {
          product_id: x.product_id,
          quantity: x.quantity,
          price,
        };
      }),
    });

    await this.OrderRepo.save(order);
    return order;
  }

  async findAll(client_id: number) {
    const [row, count] = await this.OrderRepo.findAndCountBy({ client_id });
    return { count, row };
  }

  findOne(id: string, client_id: number) {
    return this.OrderRepo.findOneByOrFail({ id, client_id });
  }
}
