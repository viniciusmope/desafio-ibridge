import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { DeepPartial, In, Repository } from 'typeorm';
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

    const dataUrl = process.env.DATA_URL;
    if (!dataUrl) {
      this.logger.error('DATA_URL não está definida no arquivo .env');
      return;
    }

    this.logger.log('Buscando dados da URL...');
    const { data } = await axios.get(dataUrl);
    this.logger.log(`${data.length} registros encontrados. Iniciando processamento...`);

    const campanhasMap = new Map<number, DeepPartial<Campanha> & { id: number }>();
    const listasMap = new Map<number, DeepPartial<Lista> & { id: number }>();
    const operadoresMap = new Map<number, DeepPartial<Operador> & { id: number }>();
    const contatosMap = new Map<number, DeepPartial<Contato> & { id: number }>();
    const categoriasMap = new Map<number, DeepPartial<Categoria> & { id: number }>();

    for (const item of data) {
      if (!campanhasMap.has(item.campanha_id)) {
        campanhasMap.set(item.campanha_id, { id: item.campanha_id, nome: item.campanha_nome });
      }
      if (!listasMap.has(item.lista_id)) {
        listasMap.set(item.lista_id, { id: item.lista_id, nome: item.lista_nome, campanha: { id: item.campanha_id } });
      }
      if (!operadoresMap.has(item.chamada_operador_id)) {
        operadoresMap.set(item.chamada_operador_id, { id: item.chamada_operador_id, nome: item.chamada_operador_nome });
      }
      if (!contatosMap.has(item.contato_id)) {
        const telefone = item.chamada_telefone?.toString().replace(/\D/g, '') || '';
        contatosMap.set(item.contato_id, { id: item.contato_id, nome: item.contato_nome, telefone });
      }
      if (!categoriasMap.has(item.chamada_categoria_id)) {
        categoriasMap.set(item.chamada_categoria_id, { id: item.chamada_categoria_id, nome: item.chamada_categoria_nome });
      }
    }

    this.logger.log('Sincronizando Campanhas...');
    await this.findAndCreate(this.campanhaRepo, [...campanhasMap.values()]);
    
    this.logger.log('Sincronizando Operadores...');
    await this.findAndCreate(this.operadorRepo, [...operadoresMap.values()]);

    this.logger.log('Sincronizando Contatos...');
    await this.findAndCreate(this.contatoRepo, [...contatosMap.values()]);

    this.logger.log('Sincronizando Categorias...');
    await this.findAndCreate(this.categoriaRepo, [...categoriasMap.values()]);

    this.logger.log('Sincronizando Listas...');
    await this.findAndCreate(this.listaRepo, [...listasMap.values()]);

    this.logger.log('Montando as chamadas...');
    const chamadasToInsert: DeepPartial<Chamada>[] = data.map(item => {
      const [datePart, timePart] = item.chamada_datahora.split(' ');
      const [day, month, year] = datePart.split('/');
      const datahora = new Date(`${year}-${month}-${day}T${timePart}`);

      return {
        id: item.chamada_id,
        datahora,
        contato: { id: item.contato_id },
        lista: { id: item.lista_id },
        campanha: { id: item.campanha_id },
        operador: { id: item.chamada_operador_id },
        categoria: { id: item.chamada_categoria_id },
        situacao: { id: item.chamada_situacao_id },
      };
    });

    this.logger.log(`Inserindo ${chamadasToInsert.length} chamadas...`);
    await this.chamadaRepo.save(chamadasToInsert, { chunk: 500 });

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

  private async findAndCreate<T extends { id: number }>(
    repo: Repository<T>,
    entities: (DeepPartial<T> & { id: number })[],
  ) {
    if (entities.length === 0) {
      return;
    }

    const entityIds = entities.map((e) => e.id);

    const foundEntities = await repo.find({
      where: { id: In(entityIds) } as any,
      select: ['id'] as any,
    });
    
    const foundIds = new Set(foundEntities.map((e) => e.id));

    const newEntities = entities.filter((e) => !foundIds.has(e.id));

    if (newEntities.length > 0) {
      this.logger.log(`Criando ${newEntities.length} novos registros em ${repo.metadata.tableName}...`);
      await repo.save(newEntities, { chunk: 500 });
    }
  }
}