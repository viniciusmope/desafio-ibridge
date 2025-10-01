import { useState, useEffect } from 'react';
import { getTopOperadores } from '../api/client';
import type { TopItem } from '../types/data';
import { TopChart } from '../components/TopChart';

export function TopOperadoresPage() {
  const [data, setData] = useState<TopItem[]>([]);
  useEffect(() => {
    getTopOperadores().then(setData);
  }, []);
  return (
    <div className="single-view-container">
      <TopChart data={data} title="Top 10 Operadores por Fechamento" />
    </div>
  );
}