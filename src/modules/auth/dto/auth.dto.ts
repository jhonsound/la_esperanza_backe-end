import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  rolId: number;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

import { IsJWT } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class TokenDto {
  @IsJWT()
  access_token: string;
}

export class UserTokenDto {
  user: User;

  @IsJWT()
  access_token: string;
}
