import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as páginas
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    // BrowserRouter é o "ouvinte" que fica prestando atenção na URL do navegador
    <BrowserRouter>
      {/* Routes é a caixa que guarda todas as rotas possíveis */}
      <Routes>

        {/** Landing page é a página principal */}
        <Route path="/" element={<Landing />} />
        
        {/* Route é a regra: se o caminho (path) for "/", desenhe o componente (element) Login */}
        <Route path="/" element={<Login />} />
        
        {/* Se o caminho for "/dashboard", desenhe a Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;