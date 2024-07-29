import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Mission } from 'src/modules/missions/entities/mission.entity';

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
  identityCard: number;

  @Column()
  score: number;

  @ManyToOne(() => Role, (role) => role.user)
  rol: Role;

  @ManyToMany(() => Mission, (mission) => mission.users)
  missions: Mission[];
}
