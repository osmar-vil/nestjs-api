import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateOrderItemComand, OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export type CreateOrderComand = {
  client_id: number;
  items: CreateOrderItemComand[];
};

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column()
  client_id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus = OrderStatus.PENDING;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrderItem, (x) => x.order, { cascade: ['insert'] })
  items: OrderItem[];

  static create(input: CreateOrderComand) {
    const order = new Order();
    order.client_id = input.client_id;
    order.items = input.items.map((x) => OrderItem.create(x));
    order.total = order.items.reduce((sum, x) => sum + x.price * x.quantity, 0);

    return order;
  }
}
