import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  static create(input: CreateClientComand) {
    const client = new Client();
    client.name = input.name;
    client.password = input.password; // TODO: hash it.
    return client;
  }
}
