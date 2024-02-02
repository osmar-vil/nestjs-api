import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { EntityNotFoundError, Repository } from 'typeorm';

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
    return this.clientRepo.find();
  }

  async findOne(id: number) {
    try {
      return await this.clientRepo.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError)
        throw new BadRequestException(error.message);
      throw new Error(error);
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.clientRepo.save({ id, ...updateClientDto });
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.clientRepo.delete(id);
    return entity;
  }
}
