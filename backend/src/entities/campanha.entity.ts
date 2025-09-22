import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Lista } from './lista.entity';
import { Chamada } from './chamada.entity';

@Entity('campanha')
export class Campanha {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Lista, lista => lista.campanha)
  listas: Lista[];

  @OneToMany(() => Chamada, chamada => chamada.campanha)
  chamadas: Chamada[];
}