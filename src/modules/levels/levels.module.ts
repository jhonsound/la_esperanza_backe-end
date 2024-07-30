import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { DatabaseModule } from '../database/database.module';
import { levelsProvider } from './levels.provider';
import { missionProvider } from '../missions/missions.provider';
import { exercisesProvider } from '../exercises/exercises.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LevelsController],
  providers: [
    LevelsService,
    ...levelsProvider,
    ...missionProvider,
    ...exercisesProvider,
  ],
})
export class LevelsModule {}
