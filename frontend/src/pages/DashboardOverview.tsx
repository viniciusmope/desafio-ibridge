import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getResumo, getTopOperadores, getTopListas, getTopCampanhas } from '../api/client';
import { SummaryTable } from '../components/SummaryTable';
import { TopChart } from '../components/TopChart';
import type { ResumoItem, TopItem } from '../types/data';

export function DashboardOverview() {
  const [resumoData, setResumoData] = useState<ResumoItem[]>([]);
  const [operadoresData, setOperadoresData] = useState<TopItem[]>([]);
  const [listasData, setListasData] = useState<TopItem[]>([]);
  const [campanhasData, setCampanhasData] = useState<TopItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumo, operadores, listas, campanhas] = await Promise.all([
          getResumo(),
          getTopOperadores(),
          getTopListas(),
          getTopCampanhas(),
        ]);
        setResumoData(resumo);
        setOperadoresData(operadores);
        setListasData(listas);
        setCampanhasData(campanhas);
      } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <h1>Dashboard de Resultados</h1>
      <section>
        <h2><Link to="/resumo">Resumo por Lista</Link></h2>
        <SummaryTable data={resumoData} />
      </section>
      <section className="charts-grid">
        <div className="chart-container">
          <Link to="/top-operadores">
            <TopChart data={operadoresData} title="Top 10 Operadores" />
          </Link>
        </div>
        <div className="chart-container">
          <Link to="/top-listas">
            <TopChart data={listasData} title="Top 10 Listas" />
          </Link>
        </div>
        <div className="chart-container">
          <Link to="/top-campanhas">
            <TopChart data={campanhasData} title="Top 10 Campanhas" />
          </Link>
        </div>
      </section>
    </div>
  );
}