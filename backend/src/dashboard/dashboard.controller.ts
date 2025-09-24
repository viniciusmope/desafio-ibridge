import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller() 
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('resumo') 
  getResumo() {
    return this.dashboardService.getResumo();
  }

  @Get('top-operadores') 
  getTopOperadores() {
    return this.dashboardService.getTopOperadores();
  }

  @Get('top-listas') 
  getTopListas() {
    return this.dashboardService.getTopListas();
  }

  @Get('top-campanhas') 
  getTopCampanhas() {
    return this.dashboardService.getTopCampanhas();
  }
}