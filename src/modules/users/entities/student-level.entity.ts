import {
  Entity,
  ManyToOne,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentMission } from './student-mission.entity';
import { Level } from 'src/modules/levels/entities/level.entity';
import { StudentExercise } from './student-exercise.entity';
import { Expose } from 'class-transformer';

@Entity()
export class StudentLevel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => StudentMission,
    (studentMission) => studentMission.studentLevels,
    {
      cascade: true, // Permite guardar automáticamente cuando se guarda StudentLevel
      onDelete: 'CASCADE', // Eliminar StudentLevel cuando se elimina StudentMission
    },
  )
  @Expose({ toPlainOnly: true })
  studentMission: StudentMission;

  @ManyToOne(() => Level, {
    eager: true, // Carga automáticamente los datos de Level cuando se carga StudentLevel
  })
  level: Level;

  @Column({ default: 0 }) // Asegura un valor por defecto
  score: number;

  @OneToMany(() => StudentExercise, (exercise) => exercise.studentLevel, {
    cascade: true, // Permite guardar automáticamente los ejercicios cuando se guarda StudentLevel
  })
  @Expose({ toPlainOnly: true })
  studentExercises: StudentExercise[];

  @Column({ default: 0 }) // Asegura un valor por defecto
  progress: number;
}
