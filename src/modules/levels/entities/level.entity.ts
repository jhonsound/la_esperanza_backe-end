// src/entities/nivel.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Mission } from 'src/modules/missions/entities/mission.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @ManyToOne(() => Mission, (mission) => mission.levels)
  mision: Mission;

  @OneToMany(() => Exercise, (exercise) => exercise.level)
  exercises: Exercise[];
}
