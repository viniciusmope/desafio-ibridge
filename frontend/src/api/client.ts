import axios from 'axios';
import type { ResumoItem, TopItem } from '../types/data';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getResumo = async (): Promise<ResumoItem[]> => {
  try {
    const response = await apiClient.get('/resumo');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    return [];
  }
};

export const getTopOperadores = async (): Promise<TopItem[]> => {
  try {
    const response = await apiClient.get('/top-operadores');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar top operadores:', error);
    return [];
  }
};

export const getTopListas = async (): Promise<TopItem[]> => {
  try {
    const response = await apiClient.get('/top-listas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar top listas:', error);
    return [];
  }
};

export const getTopCampanhas = async (): Promise<TopItem[]> => {
  try {
    const response = await apiClient.get('/top-campanhas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar top campanhas:', error);
    return [];
  }
};