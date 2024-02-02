import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const nameExist = await this.clientRepo.findOneBy({
      name: createClientDto.name,
    });
    if (nameExist)
      throw new BadRequestException(
        `this name: "${createClientDto.name}" is already taken, please provided a new one`,
      );

    const client = await Client.create(createClientDto);
    await this.clientRepo.save(client);
    return client;
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
