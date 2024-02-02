import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

export type CreateClientComand = {
  name: string;
  password: string;
};

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  static async create(input: CreateClientComand) {
    const client = new Client();
    client.name = input.name;
    client.password = await bcrypt.hash(input.password, 10);
    return client;
  }
}
