import { useState, useEffect } from 'react';
import { getTopCampanhas } from '../api/client';
import type { TopItem } from '../types/data';
import { TopChart } from '../components/TopChart';

export function TopCampanhasPage() {
  const [data, setData] = useState<TopItem[]>([]);
  useEffect(() => {
    getTopCampanhas().then(setData);
  }, []);
  return (
    <div className="single-view-container">
      <TopChart data={data} title="Top 10 Campanhas por Fechamento" />
    </div>
  );
}