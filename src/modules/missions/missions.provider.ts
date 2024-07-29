import { DataSource } from 'typeorm';
import { MISSION_REPOSITORY } from 'src/constants/repository';
import { Mission } from './entities/mission.entity';

export const missionProvider = [
  {
    provide: MISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource?.getRepository(Mission),
    inject: ['DATA_SOURCE'],
  },
];
