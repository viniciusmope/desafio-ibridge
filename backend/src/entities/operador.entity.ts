import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Chamada } from './chamada.entity';

@Entity('operador')
export class Operador {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Chamada, chamada => chamada.operador)
  chamadas: Chamada[];
}