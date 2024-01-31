import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

export type CreateOrderItemComand = {
  product_id: string;
  quantity: number;
  price: number;
};

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @ManyToOne(() => Order)
  order: Order;

  static create(input: CreateOrderItemComand) {
    const orderItem = new OrderItem();
    orderItem.product_id = input.product_id;
    orderItem.quantity = input.quantity;
    orderItem.price = input.price;
    return orderItem;
  }
}
