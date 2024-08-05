// src/modules/levels/entities/level.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Mission } from 'src/modules/missions/entities/mission.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';
import { StudentLevel } from 'src/modules/users/entities/student-level.entity';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'int', default: 0 })
  score: number;

  @ManyToOne(() => Mission, (mission) => mission.levels)
  missions: Mission;

  @OneToMany(() => Exercise, (exercise) => exercise.level)
  exercises: Exercise[];

  @OneToMany(() => StudentLevel, (studentLevel) => studentLevel.level)
  studentLevels: StudentLevel[];
}
