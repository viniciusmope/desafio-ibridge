import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { TopItem } from '../types/data';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels
);

interface TopChartProps {
  data: TopItem[];
  title: string;
}

export function TopChart({ data, title }: TopChartProps) {
  const chartOptions = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    aspectRatio: 1.5, 
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
      datalabels: { 
        anchor: 'end' as const,
        align: 'end' as const,
        formatter: (value: string) => parseInt(value, 10), 
        color: '#444',
      },
    },
  };

  const chartData = {
    labels: data.map((item) => item.nome),
    datasets: [
      {
        label: 'Fechamentos',
        data: data.map((item) => parseInt(item.total_fechamentos, 10)),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={chartOptions} data={chartData} />;
}