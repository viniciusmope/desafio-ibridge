import { useEffect, useState } from 'react';
import { getResumo, getTopOperadores, getTopListas, getTopCampanhas } from './api/client';
import { SummaryTable } from './components/SummaryTable';
import { TopChart } from './components/TopChart';
import type { ResumoItem, TopItem } from './types/data';

function App() {
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
        <h2>Resumo por Lista</h2>
        <SummaryTable data={resumoData} />
      </section>

      <section className="charts-grid">
        <div className="chart-container">
          <TopChart data={operadoresData} title="Top 10 Operadores por Fechamento" />
        </div>
        <div className="chart-container">
          <TopChart data={listasData} title="Top 10 Listas por Fechamento" />
        </div>
        <div className="chart-container">
          <TopChart data={campanhasData} title="Top 10 Campanhas por Fechamento" />
        </div>
      </section>
    </div>
  );
}

export default App