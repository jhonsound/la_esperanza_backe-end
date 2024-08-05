import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Level } from 'src/modules/levels/entities/level.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { StudentMission } from 'src/modules/users/entities/student-mission.entity';

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'mission_description' })
  missionDescription: string;

  @Column({ type: 'int', default: 0 })
  score: number; // Campo para puntaje

  @OneToMany(() => Level, (level) => level.missions)
  levels: Level[];

  @OneToMany(() => StudentMission, (studentMission) => studentMission.mission)
  studentMissions: StudentMission[];
}
