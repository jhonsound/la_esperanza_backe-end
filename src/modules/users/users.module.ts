import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userProvider } from './users.provider';
import { roleProvider } from '../roles/role.provider';
import { ClansService } from '../clans/clans.service';
import { clansProvider } from '../clans/clans.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ClansService,
    ...clansProvider,
    ...userProvider,
    ...roleProvider,
  ],
})
export class UsersModule {}
