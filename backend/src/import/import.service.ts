import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { DeepPartial, Repository } from 'typeorm'; 
import {
  Campanha,
  Categoria,
  Chamada,
  Contato,
  Lista,
  Operador,
  Situacao,
} from '../entities';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);
  private readonly DATA_URL = 'https://www.ibridge.com.br/dados-teste-tecnico.json';

  constructor(
    @InjectRepository(Campanha) private readonly campanhaRepo: Repository<Campanha>,
    @InjectRepository(Categoria) private readonly categoriaRepo: Repository<Categoria>,
    @InjectRepository(Chamada) private readonly chamadaRepo: Repository<Chamada>,
    @InjectRepository(Contato) private readonly contatoRepo: Repository<Contato>,
    @InjectRepository(Lista) private readonly listaRepo: Repository<Lista>,
    @InjectRepository(Operador) private readonly operadorRepo: Repository<Operador>,
    @InjectRepository(Situacao) private readonly situacaoRepo: Repository<Situacao>,
  ) {}

  public async run() {
    this.logger.log('Iniciando o processo de importação...');

    await this.seedSituacoes();

    this.logger.log('Buscando dados da URL...');
    const { data } = await axios.get(this.DATA_URL);
    this.logger.log(`${data.length} registros encontrados.`);

    for (const item of data) {
      const telefone = item.chamada_telefone?.toString().replace(/\D/g, '') || '';

      const [datePart, timePart] = item.chamada_datahora.split(' ');
      const [day, month, year] = datePart.split('/');
      const datahora = new Date(`${year}-${month}-${day}T${timePart}:00`);
      
      const campanha = await this.findOrCreate(this.campanhaRepo, { 
        id: item.campanha_id, 
        nome: item.campanha_nome 
      });

      const lista = await this.findOrCreate(this.listaRepo, { 
        id: item.lista_id, 
        nome: item.lista_nome, 
        campanha 
      });

      const operador = await this.findOrCreate(this.operadorRepo, { 
        id: item.chamada_operador_id, 
        nome: item.chamada_operador_nome 
      });

      const contato = await this.findOrCreate(this.contatoRepo, { 
        id: item.contato_id, 
        nome: item.contato_nome, 
        telefone 
      });
      
      const categoria = await this.findOrCreate(this.categoriaRepo, { 
        id: item.chamada_categoria_id, 
        nome: item.chamada_categoria_nome 
      });
      
      const chamada = this.chamadaRepo.create({
        id: item.chamada_id,
        datahora,
        contato,
        lista,
        campanha,
        operador,
        categoria,
        situacao: { id: item.chamada_situacao_id },
      });
      
      await this.chamadaRepo.save(chamada);
    }

    this.logger.log('Importação concluída com sucesso!');
  }
  
  private async seedSituacoes() {
    this.logger.log('Verificando e semeando situações...');
    await this.situacaoRepo.save([
      { id: 1, nome: 'Sem Contato' },
      { id: 2, nome: 'Contato' },
      { id: 3, nome: 'Abordagem' },
      { id: 4, nome: 'Fechamento' },
    ]);
  }

  private async findOrCreate<T extends { id: number }>(
    repo: Repository<T>,
    entityData: DeepPartial<T> & { id: number },
  ): Promise<T> {

    const found = await repo.findOneBy({ id: entityData.id } as any);
    
    if (found) {
      return found;
    }
    
    return repo.save(entityData);
  }
}