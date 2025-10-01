import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Chamada } from './chamada.entity';

@Entity('contato')
export class Contato {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @OneToMany(() => Chamada, chamada => chamada.contato)
  chamadas: Chamada[];
}