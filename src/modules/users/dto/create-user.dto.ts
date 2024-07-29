import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  rolId: number;
}
