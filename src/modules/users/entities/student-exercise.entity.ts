import { Entity, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StudentLevel } from './student-level.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';

@Entity()
export class StudentExercise {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => StudentLevel, (level) => level.studentExercises)
  studentLevel: StudentLevel;

  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @Column()
  score: number; // Puntaje específico del estudiante para este ejercicio

  // Otros campos relevantes
}
