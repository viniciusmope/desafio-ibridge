import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Chamada } from './chamada.entity';

@Entity('situacao')
export class Situacao {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Chamada, chamada => chamada.situacao)
  chamadas: Chamada[];
}