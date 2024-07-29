import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Level } from 'src/modules/levels/entities/level.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToMany(() => Level, (level) => level.missions)
  @JoinTable({
    name: 'mission_levels',
    joinColumn: {
      name: 'mission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'level_id',
      referencedColumnName: 'id',
    },
  })
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
