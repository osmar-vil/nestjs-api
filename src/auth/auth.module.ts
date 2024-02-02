import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Client } from 'src/clients/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: '123456789', // TODO: add it .env
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
