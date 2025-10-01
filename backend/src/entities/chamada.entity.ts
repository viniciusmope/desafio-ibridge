import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Campanha } from './campanha.entity';
import { Categoria } from './categoria.entity';
import { Contato } from './contato.entity';
import { Lista } from './lista.entity';
import { Operador } from './operador.entity';
import { Situacao } from './situacao.entity';

@Entity('chamada')
export class Chamada {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'datetime' })
  datahora: Date;

  @ManyToOne(() => Contato, contato => contato.chamadas)
  @JoinColumn({ name: 'contato_id' })
  contato: Contato;

  @ManyToOne(() => Lista, lista => lista.chamadas)
  @JoinColumn({ name: 'lista_id' })
  lista: Lista;

  @ManyToOne(() => Campanha, campanha => campanha.chamadas)
  @JoinColumn({ name: 'campanha_id' })
  campanha: Campanha;

  @ManyToOne(() => Operador, operador => operador.chamadas)
  @JoinColumn({ name: 'operador_id' })
  operador: Operador;

  @ManyToOne(() => Situacao, situacao => situacao.chamadas)
  @JoinColumn({ name: 'situacao_id' })
  situacao: Situacao;

  @ManyToOne(() => Categoria, categoria => categoria.chamadas)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;
}