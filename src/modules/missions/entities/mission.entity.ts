// src/entities/mision.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Level } from 'src/modules/levels/entities/level.entity';
/* import { ProgresoEstudiante } from './progreso-estudiante.entity'; */

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Level, (level) => level.mision)
  levels: Level[];

  /* @OneToMany(() => ProgresoEstudiante, progreso => progreso.mision)
  progresos: ProgresoEstudiante[]; */
}
