import { Module } from '@nestjs/common';
import { MissionController } from './missions.controller';
import { DatabaseModule } from '../database/database.module';
import { MissionService } from './missions.service';
import { missionProvider } from './missions.provider';
import { userProvider } from '../users/users.provider';
import { levelsProvider } from '../levels/levels.provider';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [MissionController],
  providers: [
    MissionService,
    ...missionProvider,
    ...userProvider,
    ...levelsProvider,
  ],
  exports: [MissionService],
})
export class MissionsModule {}
