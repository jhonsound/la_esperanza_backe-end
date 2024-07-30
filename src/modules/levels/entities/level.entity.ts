import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Mission } from 'src/modules/missions/entities/mission.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';

@Entity('levels')
export class Level {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => Mission, (mission) => mission.levels)
  missions: Mission;

  @OneToMany(() => Exercise, (exercise) => exercise.level)
  exercises: Exercise[];
}
