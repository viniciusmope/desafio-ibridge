import type { ResumoItem } from '../types/data';

interface SummaryTableProps {
  data: ResumoItem[];
}

export function SummaryTable({ data }: SummaryTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Campanha</th>
            <th>Lista</th>
            <th>Chamadas</th>
            <th>Sem Contato</th>
            <th>Contato</th>
            <th>Abordagem</th>
            <th>Fechamento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={`${item.campanha_nome}-${item.lista_nome}`}>
              <td>{item.campanha_nome}</td>
              <td>{item.lista_nome}</td>
              <td>{item.total_chamadas}</td>
              <td>{item.sem_contato}</td>
              <td>{item.contato}</td>
              <td>{item.abordagem}</td>
              <td>{item.fechamento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}