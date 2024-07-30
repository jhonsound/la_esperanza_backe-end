import { DataSource } from 'typeorm';
import { EXERCISES_REPOSITORY } from 'src/constants/repository';
import { Exercise } from './entities/exercise.entity';

export const exercisesProvider = [
  {
    provide: EXERCISES_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource?.getRepository(Exercise),
    inject: ['DATA_SOURCE'],
  },
];
