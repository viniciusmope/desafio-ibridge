import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Chamada } from '../entities';              

@Module({
  imports: [TypeOrmModule.forFeature([Chamada])], 
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}