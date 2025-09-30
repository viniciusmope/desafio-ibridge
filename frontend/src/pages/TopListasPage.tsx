import { useState, useEffect } from 'react';
import { getTopListas } from '../api/client';
import type { TopItem } from '../types/data';
import { TopChart } from '../components/TopChart';

export function TopListasPage() {
  const [data, setData] = useState<TopItem[]>([]);
  useEffect(() => {
    getTopListas().then(setData);
  }, []);
  return (
    <div className="single-view-container">
      <TopChart data={data} title="Top 10 Listas por Fechamento" />
    </div>
  );
}