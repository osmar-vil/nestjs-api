import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Client } from '../clients/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '123456789', // TODO: add it .env
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
