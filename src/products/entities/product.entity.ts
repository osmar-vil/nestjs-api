import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column()
  image_urL: string;
  @Column()
  price: number;
}
