// src/entities/ejercicio.entity.ts
import { Level } from 'src/modules/levels/entities/level.entity';
import { StudentExercise } from 'src/modules/users/entities/student-exercise.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  urlFrame: string;

  @Column({ type: 'int', default: 0 })
  score: number; // Campo para puntaje

  @ManyToOne(() => Level, (level) => level.exercises)
  level: Level;

  @OneToMany(
    () => StudentExercise,
    (studentExercise) => studentExercise.exercise,
  )
  studentExercises: StudentExercise[];
}
