// src/entities/ejercicio.entity.ts
import { Level } from 'src/modules/levels/entities/level.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  link: string;

  @ManyToOne(() => Level, (level) => level.exercises)
  level: Level;
}
