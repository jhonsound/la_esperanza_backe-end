import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Mission } from 'src/modules/missions/entities/mission.entity';
import { Clan } from 'src/modules/clans/entities/clans.entity';

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

  @Column()
  score: number;

  @ManyToOne(() => Role, (role) => role.user)
  rol: Role;

  @ManyToOne(() => Clan, (clan) => clan.members)
  clan: Clan;

  @ManyToMany(() => Mission, (mission) => mission.users)
  missions: Mission[];
}
