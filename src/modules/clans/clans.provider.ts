import { DataSource } from 'typeorm';
import { CLANS_REPOSITORY } from 'src/constants/repository';
import { Clan } from './entities/clans.entity';

export const clansProvider = [
  {
    provide: CLANS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource?.getRepository(Clan),
    inject: ['DATA_SOURCE'],
  },
];
