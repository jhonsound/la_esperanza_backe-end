import { DataSource } from 'typeorm';
import { STUDENT_EXERCISE_REPOSITORY } from 'src/constants/repository';
import { StudentExercise } from './entities/student-exercise.entity';

export const studentExercisesProvider = [
  {
    provide: STUDENT_EXERCISE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource?.getRepository(StudentExercise),
    inject: ['DATA_SOURCE'],
  },
];
