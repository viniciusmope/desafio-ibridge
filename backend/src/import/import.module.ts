import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ImportService } from './import.service';
import * as entities from '../entities'; 

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(entities)) 
  ],
  providers: [ImportService]
})
export class ImportModule {}