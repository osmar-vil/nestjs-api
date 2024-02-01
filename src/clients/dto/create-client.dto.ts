import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClientDto {
  @MaxLength(20)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(8)
  @MaxLength(12)
  @IsString()
  @IsNotEmpty()
  password: string;
}
