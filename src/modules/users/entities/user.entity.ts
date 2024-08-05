// src/modules/users/entities/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Clan } from 'src/modules/clans/entities/clans.entity';
import { StudentMission } from './student-mission.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100, name: 'user_name' })
  userName: string;

  @Column({ name: 'password_hash' })
  password: string;

  @Column({ name: 'identity_card' })
  identityCard: string;

  @Column({ type: 'int', default: 0 })
  score: number;

  @ManyToOne(() => Role, (role) => role.users)
  rol: Role;

  @ManyToOne(() => Clan, (clan) => clan.members)
  clan: Clan;

  @OneToMany(() => StudentMission, (studentMission) => studentMission.user)
  studentMissions: StudentMission[];
}
