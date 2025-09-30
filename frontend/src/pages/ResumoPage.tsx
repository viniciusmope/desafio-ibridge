import { useState, useEffect } from 'react';
import { getResumo } from '../api/client';
import type { ResumoItem } from '../types/data';
import { SummaryTable } from '../components/SummaryTable';

export function ResumoPage() {
  const [data, setData] = useState<ResumoItem[]>([]);
  useEffect(() => {
    getResumo().then(setData);
  }, []);
  return (
    <div className="single-view-container">
      <h1>Resumo por Lista</h1>
      <SummaryTable data={data} />
    </div>
  );
}