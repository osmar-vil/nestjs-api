import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../clients/entities/client.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    private jwtSecret: JwtService,
  ) {}

  async login({ name, password }: AuthDto) {
    const client = await this.clientRepo.findOneBy({ name });

    if (!client || !(await client.verifyPassword(password)))
      throw new UnauthorizedException(
        'something get wrong, please verify your user name or password',
      );

    return {
      access_token: this.jwtSecret.sign({
        sub: client.id,
        user_name: client.name,
      }),
    };
  }
}
