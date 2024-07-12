import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { DatabaseModule } from '../database/database.module';
import { userProvider } from '../users/users.provider';
import { roleProvider } from '../roles/role.provider';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ...userProvider, ...roleProvider],
})
export class AuthModule {}
