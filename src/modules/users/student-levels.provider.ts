import { DataSource } from 'typeorm';
import { STUDENT_LEVEL_REPOSITORY } from 'src/constants/repository';
import { StudentLevel } from './entities/student-level.entity';

export const studentLevelsProvider = [
  {
    provide: STUDENT_LEVEL_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource?.getRepository(StudentLevel),
    inject: ['DATA_SOURCE'],
  },
];
