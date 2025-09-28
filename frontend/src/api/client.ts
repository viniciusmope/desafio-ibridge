import axios from 'axios';
import type { ResumoItem, TopItem } from '../types/data';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getResumo = async (): Promise<ResumoItem[]> => {
  const response = await apiClient.get('/resumo');
  return response.data;
};

export const getTopOperadores = async (): Promise<TopItem[]> => {
  const response = await apiClient.get('/top-operadores');
  return response.data;
};

export const getTopListas = async (): Promise<TopItem[]> => {
  const response = await apiClient.get('/top-listas');
  return response.data;
};

export const getTopCampanhas = async (): Promise<TopItem[]> => {
  const response = await apiClient.get('/top-campanhas');
  return response.data;
};