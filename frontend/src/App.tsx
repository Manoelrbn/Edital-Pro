import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { Landing } from './pages/Landing';
import { Cadastro } from './pages/Cadastro';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

// 1. componente inteligente para escutar a mudança de rotas
function RotasComLoading() {
  const location = useLocation(); // O "radar" que sabe em qual página estamos
  const [isLoading, setIsLoading] = useState(false);

  // 2. Toda vez que a rota (location.pathname) mudar, esse código roda
  useEffect(() => {
    setIsLoading(true); // Liga a tela de loading
    
    // Simula um tempo de processamento de IA (400ms)
    const timer = setTimeout(() => {
      setIsLoading(false); // Desliga a tela de loading
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* 3. A NOSSA TELA DE LOADING (Aparece por cima de tudo com z-[9999]) */}
      <div 
        className={`fixed inset-0 z-[9999] bg-veraDarkBg flex flex-col items-center justify-center transition-opacity duration-300 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Círculo neon girando */}
          <div className="w-16 h-16 border-4 border-slate-800 border-t-veraCyan rounded-full animate-spin"></div>
          {/* O "V" da Vera fixo no meio do spinner */}
          <span className="absolute text-veraCyan font-poppins font-extrabold text-xl">V</span>
        </div>
        <span className="mt-6 text-[10px] font-bold text-veraCyan tracking-[0.2em] uppercase animate-pulse">
          Sincronizando
        </span>
      </div>

      {/* 4. AS ROTAS DO APP */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

// 5. O Componente App original apenas "envelopa" tudo com o BrowserRouter
export function App() {
  return (
    <BrowserRouter>
      <RotasComLoading />
    </BrowserRouter>
  );
}

export default App;