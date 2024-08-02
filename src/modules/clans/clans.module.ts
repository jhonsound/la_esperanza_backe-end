import { Module } from '@nestjs/common';
import { ClansService } from './clans.service';
import { ClansController } from './clans.controller';
import { DatabaseModule } from '../database/database.module';
import { clansProvider } from './clans.provider';
import { userProvider } from '../users/users.provider';

@Module({
  imports: [DatabaseModule],
  providers: [ClansService, ...clansProvider, ...userProvider],
  controllers: [ClansController],
})
export class ClansModule {}
