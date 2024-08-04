import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { DatabaseModule } from '../database/database.module';
import { levelsProvider } from './levels.provider';
import { missionProvider } from '../missions/missions.provider';
import { exercisesProvider } from '../exercises/exercises.provider';
import { MissionService } from '../missions/missions.service';
import { userProvider } from '../users/users.provider';
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LevelsController],
  providers: [
    LevelsService,
    MissionService,
    ...levelsProvider,
    ...missionProvider,
    ...exercisesProvider,
    ...userProvider,
  ],
})
export class LevelsModule {}
