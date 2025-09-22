import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Chamada } from './chamada.entity';

@Entity('categoria')
export class Categoria {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Chamada, chamada => chamada.categoria)
  chamadas: Chamada[];
}