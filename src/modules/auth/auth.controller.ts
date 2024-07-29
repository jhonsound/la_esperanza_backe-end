// src/modules/auth/auth.controller.ts
import { Controller, Post, Body /* s */ } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('🚀 ~ AuthController ~ register ~ registerDto:', registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    console.log('🚀 ~ AuthController ~ login ~ loginDto:', loginDto);
    return this.authService.login(loginDto);
  }
}
