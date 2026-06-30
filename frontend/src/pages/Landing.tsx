import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoVera from '../assets/logo-vera.png';

export function Landing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6; 
        this.vy = (Math.random() - 0.5) * 0.6; 
        this.radius = Math.random() * 2 + 1; 
      }

      update() {
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
            const alpha = (1 - dist / connectionDist) * 0.12;
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
    <div className="bg-veraDarkBg text-slate-100 overflow-x-hidden min-h-screen relative font-sans">
      
      {/* BACKGROUND ANIMADO */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30 z-0"
      />

      {/* HEADER / NAVBAR */}
      <nav className="relative z-50 border-b border-slate-800/60 bg-veraNavy/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoVera} 
              alt="Logo Vera AI" 
              className="w-20 h-20 object-contain" 
            />
            <div>
              <span className="font-poppins font-extrabold text-xl tracking-wider text-white">VERA</span>
              <span className="text-xs block text-veraCyan font-bold tracking-widest -mt-1">INTELECTO E DADOS</span>
            </div>
          </Link>
          
          {/* Links atualizados */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <a href="#funcionalidades" className="text-slate-300 hover:text-veraCyan transition-colors">Funcionalidades</a>
            <a href="#funcionalidades" className="text-slate-300 hover:text-veraCyan transition-colors">Concursos</a>
            <a href="#planos" className="text-slate-300 hover:text-veraCyan transition-colors">Planos</a>
            <a href="#faq" className="text-slate-300 hover:text-veraCyan transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:inline-block text-sm font-bold text-slate-300 hover:text-white transition-colors">
              Entrar
            </Link>
            <Link to="/cadastro" className="bg-gradient-to-r from-veraCyan to-teal-500 text-veraNavy font-poppins font-bold text-sm px-5 py-2.5 rounded-xl hover:shadow-glowCyan hover:scale-[1.02] transition-all">
              Cadastre-se
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. SEÇÃO HERO */}
      <section className="relative z-10 pt-16 pb-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo - Textos */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-veraCyan/10 border border-veraCyan/30 text-veraCyan text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-veraCyan animate-ping"></span>
              A IA QUE APROVA EM CONCURSOS
            </div>
            
            <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              O Amanhecer da sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-veraCyan to-emerald-400">Aprovação</span>.
            </h1>
            
            <p className="text-slate-300 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Chega de estudar o que não cai. A Vera mapeia o edital, identifica seus pontos fracos e cria simulados inéditos baseados no histórico da banca.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/cadastro" className="bg-gradient-to-r from-veraCyan to-emerald-400 text-veraNavy font-poppins font-extrabold text-base px-8 py-4 rounded-2xl shadow-glowCyan hover:scale-[1.03] active:scale-[0.98] transition-all text-center">
                Quero Mapear Meu Edital
              </Link>
            </div>
          </div>

          {/* Lado Direito - NOVO MOCKUP DE CHAT/PAINEL */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-veraCyan/20 to-veraOrange/20 blur-2xl opacity-40 pointer-events-none"></div>
            
            <div className="relative card-blur border border-slate-700/50 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
              {/* Header do mock */}
              <div className="flex items-center border-b border-slate-700/50 pb-3 gap-3">
                <img src={logoVera} alt="Vera" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-sm font-bold text-white">Vera Assistant</h3>
                  <span className="text-[10px] text-veraCyan flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-veraCyan"></span> Analisando TRF-6
                  </span>
                </div>
              </div>

              {/* Balão do Usuário */}
              <div className="self-end bg-slate-800/80 border border-slate-700 rounded-2xl rounded-tr-sm p-3 max-w-[85%]">
                <p className="text-xs text-slate-300">Quais matérias devo priorizar no edital do TRF-6 para Analista?</p>
              </div>

              {/* Balão da IA */}
              <div className="self-start bg-veraNavyLight/50 border border-veraCyan/30 rounded-2xl rounded-tl-sm p-4 max-w-[90%] shadow-[0_0_15px_rgba(0,212,178,0.1)]">
                <p className="text-xs text-white leading-relaxed mb-3">
                  Edital mapeado com sucesso! Com base nos últimos 5 anos da banca Cebraspe, aqui está o seu foco estratégico:
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-[11px] bg-slate-900/50 p-2 rounded">
                    <span className="text-slate-300">Direito Administrativo</span>
                    <span className="text-veraCyan font-bold">28% da prova</span>
                  </div>
                  <div className="flex justify-between text-[11px] bg-slate-900/50 p-2 rounded">
                    <span className="text-slate-300">Direito Constitucional</span>
                    <span className="text-veraCyan font-bold">22% da prova</span>
                  </div>
                </div>
                <button className="mt-3 text-[10px] bg-veraCyan text-veraNavy px-3 py-1.5 rounded-lg font-bold w-full hover:bg-emerald-400 transition-colors">
                  Gerar Simulado Inédito (Prioridade)
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. SEÇÃO FUNCIONALIDADES (Por que vale a pena?) */}
      <section id="funcionalidades" className="relative z-10 py-24 bg-slate-900/50 border-y border-slate-800/60 px-6">
        <div class="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-white mb-4">Pare de estudar no escuro</h2>
            <p className="text-slate-400 text-lg">A inteligência de dados transforma o seu tempo na sua maior vantagem competitiva.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-veraNavy/40 border border-slate-800 p-8 rounded-2xl hover:border-veraCyan/50 transition-all">
              <div className="text-3xl text-veraCyan mb-4">🎯</div>
              <h3 className="font-bold text-xl text-white mb-3">Edital Verticalizado com IA</h3>
              <p className="text-sm text-slate-400">Jogue o PDF do edital e a Vera organiza tudo em minutos, mostrando o que tem maior probabilidade de cair na sua prova.</p>
            </div>
            
            <div className="bg-veraNavy/40 border border-slate-800 p-8 rounded-2xl hover:border-veraOrange/50 transition-all">
              <div className="text-3xl text-veraOrange mb-4">🧠</div>
              <h3 className="font-bold text-xl text-white mb-3">Simulados Autorais</h3>
              <p className="text-sm text-slate-400">Nossa IA estuda o estilo da sua banca e gera questões 100% inéditas focadas exclusivamente nas matérias que você mais erra.</p>
            </div>

            <div className="bg-veraNavy/40 border border-slate-800 p-8 rounded-2xl hover:border-veraCyan/50 transition-all">
              <div className="text-3xl text-veraCyan mb-4">📊</div>
              <h3 className="font-bold text-xl text-white mb-3">Radar de Desempenho</h3>
              <p className="text-sm text-slate-400">Acompanhe seu progresso em tempo real. Saiba exatamente a sua chance de aprovação baseada nas notas de corte anteriores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO DE PLANOS */}
      <section id="planos" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-extrabold text-3xl sm:text-4xl text-white mb-4">Escolha sua rota de aprovação</h2>
            <p className="text-slate-400 text-lg">Cancele quando quiser. Sem letras miúdas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Plano Grátis */}
            <div className="bg-veraNavy/30 border border-slate-700 p-8 rounded-3xl flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2">Concurseiro Iniciante</h3>
              <div className="text-4xl font-extrabold text-white mb-6">Grátis</div>
              <ul className="space-y-4 text-sm text-slate-300 mb-8 flex-1">
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Análise de 1 edital por mês</li>
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Até 50 questões resolvidas</li>
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Chat com a Vera (Básico)</li>
              </ul>
              <Link to="/cadastro" className="w-full py-3 rounded-xl border border-slate-500 text-white font-bold hover:bg-slate-800 transition-colors text-center">
                Começar Grátis
              </Link>
            </div>

            {/* Plano Premium */}
            <div className="bg-gradient-to-b from-veraNavyLight to-veraNavy border border-veraCyan p-8 rounded-3xl relative shadow-[0_0_30px_rgba(0,212,178,0.15)] flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-veraCyan text-veraNavy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Mais Escolhido
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Vera Pro</h3>
              <div className="text-4xl font-extrabold text-veraCyan mb-1">R$ 49<span className="text-lg text-slate-400 font-normal">/mês</span></div>
              <p className="text-xs text-slate-400 mb-6">Cobrado mensalmente</p>
              
              <ul className="space-y-4 text-sm text-slate-200 mb-8 flex-1">
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Editais Ilimitados</li>
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Geração de Simulados Inéditos</li>
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Painel de Análise Preditiva (Gaps)</li>
                <li className="flex items-center gap-3"><span className="text-veraCyan">✓</span> Plano de Estudos Dinâmico</li>
              </ul>
              <Link to="/cadastro" className="w-full py-3 rounded-xl bg-veraCyan text-veraNavy font-bold hover:bg-emerald-400 transition-colors shadow-lg text-center">
                Assinar o Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER DE RESPEITO */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-[#06101A] pt-16 pb-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Coluna 1: Marca e Sobre */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-3">
                <img src={logoVera} alt="Vera" className="w-8 h-8 object-contain grayscale brightness-200 opacity-80" />
                <span className="font-poppins font-extrabold text-lg tracking-wider text-white">VERA<span className="text-veraCyan">.AI</span></span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                A inteligência artificial focada exclusivamente em otimizar a aprovação de concurseiros através de análise de dados e editais.
              </p>
              {/* Ícones de Redes Sociais (Placeholder) */}
              <div className="flex gap-3 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-veraCyan hover:text-veraNavy hover:border-veraCyan transition-all">
                  <span className="font-bold text-[10px]">IG</span>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-veraCyan hover:text-veraNavy hover:border-veraCyan transition-all">
                  <span className="font-bold text-[10px]">IN</span>
                </a>
              </div>
            </div>

            {/* Coluna 2: Produto */}
            <div>
              <h4 className="font-poppins font-bold text-white mb-4">Produto</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#funcionalidades" className="hover:text-veraCyan transition-colors">Funcionalidades</a></li>
                <li><a href="#planos" className="hover:text-veraCyan transition-colors">Preços e Planos</a></li>
                <li><Link to="/cadastro" className="hover:text-veraCyan transition-colors">Criar Conta</Link></li>
                <li><Link to="/login" className="hover:text-veraCyan transition-colors">Entrar na Plataforma</Link></li>
              </ul>
            </div>

            {/* Coluna 3: Suporte & Legal */}
            <div>
              <h4 className="font-poppins font-bold text-white mb-4">Suporte & Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-veraCyan transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-veraCyan transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-veraCyan transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-veraCyan transition-colors">Trabalhe Conosco</a></li>
              </ul>
            </div>

            {/* Coluna 4: Contato e Localização */}
            <div>
              <h4 className="font-poppins font-bold text-white mb-4">Contato</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-veraCyan">✉</span> contato@vera-ai.com.br
                </li>
                <li className="flex items-start gap-2 pt-2">
                  <span className="text-veraCyan mt-0.5">📍</span> 
                  <span>Belo Horizonte, MG<br/>Brasil</span>
                </li>
              </ul>
            </div>
            
          </div>

          {/* Barra inferior de Direitos Autorais */}
          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Vera Inteligência e Dados. Todos os direitos reservados.
            </p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              Feito com <span className="text-veraOrange">☕</span> e muita IA.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}