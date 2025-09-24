import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chamada } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Chamada)
    private readonly chamadaRepository: Repository<Chamada>,
  ) {}

  async getResumo() {
    return this.chamadaRepository
      .createQueryBuilder('chamada')
      .select('campanha.nome', 'campanha_nome')
      .addSelect('lista.nome', 'lista_nome')
      .addSelect('COUNT(chamada.id)', 'total_chamadas')
      .addSelect("SUM(CASE WHEN chamada.situacao_id = 1 THEN 1 ELSE 0 END)", 'sem_contato')
      .addSelect("SUM(CASE WHEN chamada.situacao_id = 2 THEN 1 ELSE 0 END)", 'contato')
      .addSelect("SUM(CASE WHEN chamada.situacao_id = 3 THEN 1 ELSE 0 END)", 'abordagem')
      .addSelect("SUM(CASE WHEN chamada.situacao_id = 4 THEN 1 ELSE 0 END)", 'fechamento')
      .innerJoin('chamada.lista', 'lista')
      .innerJoin('chamada.campanha', 'campanha')
      .groupBy('lista.id, campanha.id')
      .orderBy('campanha.nome, lista.nome')
      .getRawMany(); 
  }

  getTopOperadores() {
    return this.getTopByEntity('operador');
  }

  getTopListas() {
    return this.getTopByEntity('lista');
  }

  getTopCampanhas() {
    return this.getTopByEntity('campanha');
  }

  private async getTopByEntity(entityName: 'operador' | 'lista' | 'campanha') {
    return this.chamadaRepository
      .createQueryBuilder('chamada')
      .select(`${entityName}.nome`, 'nome')
      .addSelect('COUNT(chamada.id)', 'total_fechamentos')
      .innerJoin(`chamada.${entityName}`, entityName)
      .where('chamada.situacao_id = 4') 
      .groupBy(`${entityName}.id`)
      .orderBy('total_fechamentos', 'DESC')
      .limit(10)
      .getRawMany();
  }
}