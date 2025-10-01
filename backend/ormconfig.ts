import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Campanha } from './src/entities/campanha.entity';
import { Categoria } from './src/entities/categoria.entity';
import { Chamada } from './src/entities/chamada.entity';
import { Contato } from './src/entities/contato.entity';
import { Lista } from './src/entities/lista.entity';
import { Operador } from './src/entities/operador.entity';
import { Situacao } from './src/entities/situacao.entity';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    Campanha,
    Categoria,
    Chamada,
    Contato,
    Lista,
    Operador,
    Situacao,
  ],
  migrations: ['src/migrations/*.ts'],
});