import { Module } from '@nestjs/common';
import { MissionController } from './missions.controller';
import { DatabaseModule } from '../database/database.module';
import { MissionService } from './missions.service';
import { missionProvider } from './missions.provider';
import { userProvider } from '../users/users.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MissionController],
  providers: [MissionService, ...missionProvider, ...userProvider],
})
export class MissionsModule {}
