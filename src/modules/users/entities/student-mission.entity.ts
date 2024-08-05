import {
  Entity,
  ManyToOne,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Mission } from 'src/modules/missions/entities/mission.entity';
import { StudentLevel } from './student-level.entity';
import { Exclude, Expose, Type } from 'class-transformer';
@Entity()
export class StudentMission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.studentMissions, {
    eager: true,
    cascade: true,
  })
  user: User;

  @ManyToOne(() => Mission, {
    eager: true,
  })
  mission: Mission;

  @OneToMany(
    () => StudentLevel,
    (studentLevel) => studentLevel.studentMission,
    {
      onDelete: 'CASCADE',
    },
  )
  @Expose({ toPlainOnly: true })
  studentLevels: StudentLevel[];

  @Column({ default: 0 })
  score: number;
}
