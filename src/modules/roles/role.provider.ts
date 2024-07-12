import { DataSource } from 'typeorm';
import { ROLE_REPOSITORY } from 'src/constants/repository';
import { Role } from './entities/role.entity';

export const roleProvider = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource?.getRepository(Role),
    inject: ['DATA_SOURCE'],
  },
];
