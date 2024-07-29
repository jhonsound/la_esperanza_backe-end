import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, TokenDto, UserTokenDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    console.log('🚀 ~ AuthService ~ register ~ registerDto:', registerDto);
    try {
      const userFound = await this.usersService.findByEmail(
        registerDto.userName,
      );
      if (userFound) {
        throw new HttpException(
          'This email already exists',
          HttpStatus.CONFLICT,
        );
      }
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const newUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = newUser;
      const { access_token } = this.generateToken(result);
      return { ...result, access_token };
    } catch (error) {
      console.log('🚀 ~ AuthService ~ register ~ error:', error);
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    try {
      const user = await this.validateUser(
        loginDto.userName,
        loginDto.password,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const { access_token } = this.generateToken(user);

      const loginUser: UserTokenDto = {
        user,
        access_token,
      };

      return loginUser;
    } catch (error) {
      console.log('🚀 ~ AuthService ~ login ~ error:', error);
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  private async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(userName);

    if (!user) throw new HttpException('user not found', HttpStatus.CONFLICT);

    const match = await bcrypt.compare(pass, user.password);

    if (!match)
      throw new HttpException('password incorrect', HttpStatus.CONFLICT);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  private generateToken(user: any): TokenDto {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
