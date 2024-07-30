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

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'mission_description' })
  missionDescription: string;

  @OneToMany(() => Level, (level) => level.missions)
  levels: Level[];

  @ManyToMany(() => User, (user) => user.missions)
  @JoinTable({
    name: 'mission_users',
    joinColumn: {
      name: 'mission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
