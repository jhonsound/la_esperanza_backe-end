import { DataSource } from 'typeorm';
import { STUDENT_MISSION_REPOSITORY } from 'src/constants/repository';
import { StudentMission } from './entities/student-mission.entity';

export const studentMissionProvider = [
  {
    provide: STUDENT_MISSION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource?.getRepository(StudentMission),
    inject: ['DATA_SOURCE'],
  },
];
