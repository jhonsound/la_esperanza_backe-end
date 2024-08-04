import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { DatabaseModule } from '../database/database.module';
import { exercisesProvider } from './exercises.provider';
import { LevelsService } from '../levels/levels.service';
import { levelsProvider } from '../levels/levels.provider';
import { missionProvider } from '../missions/missions.provider';
import { LevelsModule } from '../levels/levels.module';
import { MissionsModule } from '../missions/missions.module';

@Module({
  imports: [DatabaseModule, MissionsModule],
  controllers: [ExercisesController],
  providers: [
    ExercisesService,
    LevelsService,
    ...levelsProvider,
    ...missionProvider,
    ...exercisesProvider,
  ],
})
export class ExercisesModule {}
