import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Campanha } from './campanha.entity';
import { Chamada } from './chamada.entity';

@Entity('lista')
export class Lista {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;

  @ManyToOne(() => Campanha, campanha => campanha.listas)
  @JoinColumn({ name: 'campanha_id' })
  campanha: Campanha;

  @OneToMany(() => Chamada, chamada => chamada.lista)
  chamadas: Chamada[];
}