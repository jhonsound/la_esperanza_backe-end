// src/entities/ejercicio.entity.ts
import { Level } from 'src/modules/levels/entities/level.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  urlFrame: string;

  @ManyToOne(() => Level, (level) => level.exercises)
  level: Level;
}
