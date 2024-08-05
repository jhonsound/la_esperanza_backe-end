// src/entities/ejercicio.entity.ts
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clan')
export class Clan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  average: number;

  @Column({
    type: 'enum',
    enum: ['Motivated', 'Achiever', 'Leader', 'Innovator', 'Basic'],
    default: 'Motivated',
  })
  insigne: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @OneToMany(() => User, (user) => user.clan)
  members: User[];
}
