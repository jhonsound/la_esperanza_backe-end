import { DataSource } from 'typeorm';
import { LEVEL_REPOSITORY } from 'src/constants/repository';
import { Level } from './entities/level.entity';

export const levelsProvider = [
  {
    provide: LEVEL_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource?.getRepository(Level),
    inject: ['DATA_SOURCE'],
  },
];
