
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140%] h-[100vh] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12)_0%,_transparent_70%)]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation: Floating Glassmorphism */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 bg-black/40 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <i className="fa-solid fa-shield-halved text-white text-xs"></i>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">Angel Campus</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#process" className="hover:text-white transition-colors">How it works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <button 
          onClick={onStart}
          className="bg-white text-black px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
        >
          Enter App
        </button>
      </nav>

      {/* Hero Content */}
      <section className="relative pt-52 pb-32 px-6 z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Next Gen Club Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white leading-[1.05]">
            #1 Undetectable <br/><span className="text-blue-600">AI for Campus Clubs</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-lg text-white/40 font-medium mb-12 leading-relaxed">
            엔젤캠퍼스는 동아리의 가치를 데이터로 증명하고 <br/>
            최적의 후원자와 연결하는 딥 블랙 비즈니스 엔진입니다.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-32">
            <button 
              onClick={onStart}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-rocket"></i> 시작하기 (Free)
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-white/10 transition-all">
              Documentation
            </button>
          </div>
        </div>

        {/* Mockup Display */}
        <div className="max-w-6xl w-full mx-auto relative px-4 group">
          <div className="bg-[#0f0f0f] rounded-[3rem] p-4 shadow-[0_100px_150px_-50px_rgba(0,0,0,1)] border border-white/5 relative overflow-hidden">
            <div className="bg-black rounded-[2.5rem] aspect-[16/9] overflow-hidden border border-white/5 relative">
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 grayscale" alt="Dark Interface" />
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-black/80"></div>
               
               {/* Floating UI Elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black/60 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">Matching Live</span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500/20"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white leading-tight">"엔젤 3명이 귀하의 <br/>프로필을 검토 중입니다."</h3>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[92%] shadow-[0_0_20px_rgba(37,99,235,0.8)]"></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-widest">
                       <span>Analyzing Potential</span>
                       <span>92% Accuracy</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4">
                     <i className="fa-solid fa-envelope-open-text text-blue-500"></i>
                     <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">자동 제안 메일 생성 완료</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-40 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-24 text-center">
            How we empower <br/><span className="text-white/20 italic">your club</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-600 rounded-[2.5rem] p-12 text-white shadow-2xl flex flex-col justify-between min-h-[440px] border border-white/10 hover:-translate-y-2 transition-all duration-500">
              <div>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">01 Real-time Analysis</span>
                <h3 className="text-3xl font-black mb-4 leading-tight">AI 기반의 <br/>정밀한 동아리 브랜딩</h3>
                <p className="text-blue-100/70 font-medium leading-relaxed">
                  엔젤캠퍼스 AI는 활동 내역을 분석하여 후원자들이 가장 매력적으로 느낄 수 있는 동아리 브랜딩 요소를 추출합니다.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10 mt-10">
                 <div className="h-10 w-full bg-white/10 rounded-lg mb-3"></div>
                 <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div className="bg-[#0f0f0f] rounded-[2.5rem] p-12 text-white border border-white/5 shadow-2xl flex flex-col justify-between min-h-[440px] hover:-translate-y-2 transition-all duration-500">
              <div>
                <span className="bg-white/5 text-white/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">02 Automated Outreach</span>
                <h3 className="text-3xl font-black mb-4 leading-tight">타겟팅된 <br/>후원 제안 자동화</h3>
                <p className="text-white/40 font-medium leading-relaxed">
                  프로젝트 성격에 맞는 엔젤을 선별하고, 관리자의 이름으로 직접적인 제안 메일을 자동 발송합니다.
                </p>
              </div>
              <div className="space-y-3 mt-10">
                 <div className="h-3 w-full bg-white/10 rounded-full"></div>
                 <div className="h-3 w-4/5 bg-white/5 rounded-full"></div>
                 <div className="h-3 w-3/5 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-24 border-t border-white/5 px-6 bg-black text-center relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-white text-[8px]"></i>
            </div>
            <span className="font-black text-xl tracking-tighter">Angel Campus</span>
          </div>
          <div className="flex gap-10 text-white/20 text-xs font-black uppercase tracking-widest">
            <a href="#" className="hover:text-blue-500 transition-colors">Manifesto</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Press</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
          </div>
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
            © 2024 Angel Campus. Secure Dark Infrastructure.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
