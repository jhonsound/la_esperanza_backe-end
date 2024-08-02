import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';
import { IsJWT } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  identityCard: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  rolId: string;

  clanId: number;
}

export class LoginDto {
  userName: string;
  password: string;
}

export class TokenDto {
  @IsJWT()
  access_token: string;
}

export class UserTokenDto {
  user: User;

  @IsJWT()
  access_token: string;
}
