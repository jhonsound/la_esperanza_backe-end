// src/entities/usuario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
  /* OneToMany, */
} from 'typeorm';
/* import { ProgresoEstudiante } from './progreso-estudiante.entity'; */
import { Role } from 'src/modules/roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100, name: 'user_name' })
  userName: string;

  @Column({ name: 'password_hash' })
  password: string;

  @Column({ name: 'identity_card' })
  identityCard: number;

  @ManyToOne(() => Role, (role) => role.user)
  rol: Role;

  /* @OneToMany(() => ProgresoEstudiante, (progreso) => progreso.usuario)
  progresos: ProgresoEstudiante[]; */
}
