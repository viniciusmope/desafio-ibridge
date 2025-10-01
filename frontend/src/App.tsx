import { Routes, Route, Link } from 'react-router-dom';
import { DashboardOverview } from './pages/DashboardOverview';
import { ResumoPage } from './pages/ResumoPage';
import { TopListasPage } from './pages/TopListasPage';
import { TopOperadoresPage } from './pages/TopOperadoresPage';
import { TopCampanhasPage } from './pages/TopCampanhasPage';

function App() {
  return (
    <>
      <nav className="main-nav">
        <Link to="/">Visão Geral</Link>
        <Link to="/resumo">Resumo</Link>
        <Link to="/top-operadores">Top Operadores</Link>
        <Link to="/top-listas">Top Listas</Link>
        <Link to="/top-campanhas">Top Campanhas</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/resumo" element={<ResumoPage />} />
          <Route path="/top-listas" element={<TopListasPage />} />
          <Route path="/top-operadores" element={<TopOperadoresPage />} />
          <Route path="/top-campanhas" element={<TopCampanhasPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;