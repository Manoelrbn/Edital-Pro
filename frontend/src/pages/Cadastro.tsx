import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoVera from '../assets/logo-vera.png';

export function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // REDE NEURAL (Tela Inteira)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 65; 
    const connectionDist = 140;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        if (!canvas) throw new Error("Canvas not initialized");
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5; 
        this.radius = Math.random() * 1.5 + 0.5; 
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00D4B2'; 
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00D4B2';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 178, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex text-slate-100 font-sans overflow-hidden bg-veraDarkBg">
      
      {/* ========================================= */}
      {/* CAMADA 1: CORES E TRANSIÇÃO (FUNDO)         */}
      {/* ========================================= */}
      <div className="absolute inset-0 flex z-0 pointer-events-none">
        <div className="w-full lg:w-1/2 bg-veraDarkBg"></div>
        <div className="hidden lg:block lg:w-1/2 bg-veraNavy relative">
            {/* ESTE É O TRUQUE: Um degradê que começa no escuro e some, matando a linha reta */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-veraDarkBg to-transparent"></div>
        </div>
      </div>

      {/* ========================================= */}
      {/* CAMADA 2: REDE NEURAL (TELA INTEIRA)        */}
      {/* ========================================= */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-[5] opacity-40 pointer-events-none"
      />

      {/* ========================================= */}
      {/* CAMADA 3: CONTEÚDO (INTERATIVO)             */}
      {/* ========================================= */}
      
      {/* LADO ESQUERDO: Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10 py-12">
        
        <Link 
          to="/" 
          className="absolute top-8 left-8 sm:left-16 md:left-24 xl:left-32 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-veraCyan transition-colors group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para o início
        </Link>

        {/* Logo Mobile */}
        <Link to="/" className="lg:hidden flex items-center gap-3 mb-10 mt-8">
          <img src={logoVera} alt="Vera" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,212,178,0.5)]" />
          <span className="font-poppins font-extrabold text-xl tracking-wider text-white">VERA<span className="text-veraCyan">.AI</span></span>
        </Link>

        <div className="max-w-md w-full mx-auto mt-8 lg:mt-0 bg-veraDarkBg/40 p-8 rounded-3xl backdrop-blur-sm border border-slate-800/50 shadow-2xl lg:bg-transparent lg:p-0 lg:rounded-none lg:backdrop-blur-none lg:border-none lg:shadow-none">
          <h2 className="text-3xl font-poppins font-extrabold text-white mb-2">
            Comece sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-veraCyan to-emerald-400">Jornada</span>
          </h2>
          <p className="text-slate-400 text-sm mb-8">Crie sua conta gratuita e pare de estudar no escuro hoje mesmo.</p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            <div className="space-y-1 group">
              <label className="text-xs font-bold text-slate-400 group-focus-within:text-veraCyan uppercase tracking-wider transition-colors">Nome Completo</label>
              <input 
                type="text" 
                placeholder="João Silva" 
                className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-veraCyan focus:ring-1 focus:ring-veraCyan transition-all hover:border-slate-500 backdrop-blur-md"
              />
            </div>

            <div className="space-y-1 group">
              <label className="text-xs font-bold text-slate-400 group-focus-within:text-veraCyan uppercase tracking-wider transition-colors">E-mail</label>
              <input 
                type="email" 
                placeholder="joao@exemplo.com" 
                className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-veraCyan focus:ring-1 focus:ring-veraCyan transition-all hover:border-slate-500 backdrop-blur-md"
              />
            </div>

            <div className="space-y-1 group">
              <label className="text-xs font-bold text-slate-400 group-focus-within:text-veraCyan uppercase tracking-wider transition-colors">Senha</label>
              <div className="relative">
                <input 
                  type={mostrarSenha ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:border-veraCyan focus:ring-1 focus:ring-veraCyan transition-all hover:border-slate-500 backdrop-blur-md"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-veraCyan transition-colors"
                >
                  {mostrarSenha ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.59-3.59m-3.59-3.59l-3.59-3.59" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-veraCyan to-teal-500 text-veraNavy font-poppins font-bold text-base px-5 py-3.5 rounded-xl hover:shadow-glowCyan hover:scale-[1.03] active:scale-[0.98] transition-all mt-4">
              Criar Conta Grátis
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-veraCyan font-bold hover:underline transition-all">
              Faça login
            </Link>
          </p>
        </div>
      </div>

      {/* LADO DIREITO: Branding Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center z-10 pointer-events-none">
        
        {/* Luzes de fundo coloridas mantidas para o neon */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-veraCyan/15 blur-[100px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-veraOrange/10 blur-[100px] rounded-full pointer-events-none animate-pulse delay-75"></div>
        
        <div className="relative max-w-md text-center pointer-events-auto">
          <Link to="/" className="inline-flex flex-col items-center gap-4 mb-8 transform hover:scale-105 transition-all duration-500">
            {/* Aumentei a logo (w-36 h-36) e ajeitei as margens */}
            <img src={logoVera} alt="Vera" className="w-36 h-36 -mb-4 object-contain drop-shadow-[0_0_20px_rgba(0,212,178,0.4)] animate-[bounce_3s_infinite]" />
            <div>
              <span className="font-poppins font-extrabold text-4xl tracking-wider text-white">VERA</span>
              <span className="text-sm block text-veraCyan font-bold tracking-widest -mt-1">INTELECTO E DADOS</span>
            </div>
          </Link>
          
          <div className="bg-slate-900/40 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-md shadow-xl hover:border-veraCyan/30 hover:-translate-y-1 transition-all duration-500 cursor-default mt-4">
            <p className="text-slate-300 italic mb-4 leading-relaxed">
              "A maioria dos estudantes falha não por falta de esforço, mas por estudar de forma desalinhada com a banca."
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-veraCyan animate-pulse shadow-[0_0_8px_rgba(0,212,178,0.8)]"></span>
              <span className="text-xs font-bold text-veraCyan tracking-widest uppercase">Inteligência Preditiva</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}