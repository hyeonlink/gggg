
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      
      {/* Navigation: Minimal & Sharp */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-white text-[10px]"></i>
          </div>
          <span className="text-lg font-black tracking-tighter text-white">Angel Campus</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#collaboration" className="hover:text-white transition-colors">Collab</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
        </div>

        <button 
          onClick={onStart}
          className="bg-white text-black px-6 py-2 rounded-sm text-[10px] font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section: Clean & Solid */}
      <section className="relative pt-48 pb-32 px-6 z-10 flex flex-col items-center border-b border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded mb-8">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">University Club Network</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[1.05]">
            동아리의 가치를 <br/><span className="text-blue-600">데이터로 증명하다</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-base md:text-lg text-white/40 font-medium mb-12 leading-relaxed">
            엔젤캠퍼스는 동아리의 모든 활동을 분석하여 최적의 후원자와 연결하고, <br className="hidden md:block" />
            성장을 위한 비즈니스 인프라를 자동으로 구축합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24">
            <button 
              onClick={onStart}
              className="bg-blue-600 text-white px-10 py-5 rounded-sm font-black tracking-widest uppercase text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
            >
              Get Started Now
            </button>
            <button className="bg-transparent border border-white/10 text-white px-10 py-5 rounded-sm font-black tracking-widest uppercase text-[10px] hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Mockup: No Glow, Clean Borders */}
        <div className="max-w-5xl w-full mx-auto relative px-4">
          <div className="bg-[#0a0a0a] rounded-xl p-2 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="bg-black rounded-lg aspect-[16/9] overflow-hidden border border-white/5 relative">
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-10 grayscale" alt="Interface" />
               
               {/* Floating Info Card */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-black border border-white/10 p-8 rounded-lg space-y-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest">Matching Status</span>
                    <i className="fa-solid fa-check text-[10px] text-green-500"></i>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white leading-tight">활동 분석 결과 <br/><span className="text-blue-600">최적의 후원사 3곳</span>이 <br/>제안을 기다리고 있습니다.</h3>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[94%]"></div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                     <i className="fa-solid fa-paper-plane"></i>
                     <span>제안서 자동 생성 완료</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Minimal Grid */}
      <section id="features" className="py-32 px-6 relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase">Core Infrastructure</h2>
            <p className="text-white/20 font-bold text-xs uppercase tracking-[0.4em]">Professional growth tools for campus clubs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 01. Automated Outreach */}
            <div className="bg-[#0a0a0a] p-8 border border-white/5 hover:border-blue-600 transition-all group flex flex-col justify-between min-h-[320px]">
              <div>
                <i className="fa-solid fa-envelope-open-text text-xl text-blue-600 mb-6 block"></i>
                <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">AI Outreach</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">
                  동아리 성향을 분석하여 최적의 후원자 리스트를 추출하고, 맞춤형 제안 이메일을 자동으로 전송합니다.
                </p>
              </div>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6">Automated Engine</span>
            </div>

            {/* 02. Smart Discovery */}
            <div className="bg-[#0a0a0a] p-8 border border-white/5 hover:border-blue-600 transition-all group flex flex-col justify-between min-h-[320px]">
              <div>
                <i className="fa-solid fa-magnifying-glass-chart text-xl text-blue-600 mb-6 block"></i>
                <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Algorithm Matching</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">
                  후원자의 관심사와 동아리의 프로젝트를 정교하게 매칭하여 노출 확률을 극대화합니다.
                </p>
              </div>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6">Smart Discovery</span>
            </div>

            {/* 03. Messaging */}
            <div className="bg-[#0a0a0a] p-8 border border-white/5 hover:border-blue-600 transition-all group flex flex-col justify-between min-h-[320px]">
              <div>
                <i className="fa-solid fa-comment-dots text-xl text-blue-600 mb-6 block"></i>
                <h3 className="text-lg font-black mb-4 uppercase tracking-tighter">Direct Connect</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">
                  복잡한 절차 없이 플랫폼 내에서 후원자와 실시간으로 소통하고 협약을 진행할 수 있습니다.
                </p>
              </div>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6">Real-time Messaging</span>
            </div>

            {/* 04. Collaboration */}
            <div className="bg-blue-600 p-8 border border-blue-600 flex flex-col justify-between min-h-[320px]">
              <div>
                <i className="fa-solid fa-handshake-angle text-xl text-white mb-6 block"></i>
                <h3 className="text-lg font-black mb-4 uppercase tracking-tighter text-white">Synergy Collab</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  비슷한 목표를 가진 동아리와 프로젝트를 공유하고 연합하여 더 큰 가치를 창출하세요.
                </p>
              </div>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-6">Club Collaboration</span>
            </div>

          </div>
        </div>
      </section>

      {/* Collaboration Preview: Flat & Clear */}
      <section id="collaboration" className="py-32 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-start gap-20">
              <div className="flex-1 space-y-8">
                 <h2 className="text-4xl font-black tracking-tighter leading-tight uppercase">더 큰 목표를 향한 <br/><span className="text-blue-600">연합 비즈니스</span></h2>
                 <p className="text-base text-white/40 font-medium leading-relaxed">
                   단독 동아리 프로젝트보다 연합 프로젝트가 평균 2.4배 더 높은 후원 성공률을 보입니다. <br />
                   엔젤캠퍼스 AI가 여러분과 함께할 최고의 파트너 동아리를 추천합니다.
                 </p>
                 <div className="flex gap-12">
                    <div>
                       <div className="text-3xl font-black text-white mb-1">120+</div>
                       <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Active Clubs</div>
                    </div>
                    <div>
                       <div className="text-3xl font-black text-white mb-1">45%</div>
                       <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Response Lift</div>
                    </div>
                 </div>
              </div>
              <div className="flex-1 w-full">
                 <div className="border border-white/5 bg-[#0a0a0a] p-1 gap-1 grid grid-cols-2 rounded-lg">
                    <div className="bg-black p-8 text-center border border-white/5">
                       <i className="fa-solid fa-terminal text-blue-600 mb-4 block"></i>
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">IT Team</span>
                    </div>
                    <div className="bg-blue-600 p-8 text-center flex items-center justify-center">
                       <i className="fa-solid fa-plus text-white"></i>
                    </div>
                    <div className="col-span-2 bg-black p-8 text-center border border-white/5">
                       <i className="fa-solid fa-robot text-blue-600 mb-4 block"></i>
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Robotics Team</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA: Final Action */}
      <section className="py-48 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-12">
           <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">Empowering <br/>Campus Dreams.</h2>
           <p className="text-lg text-white/20 font-bold uppercase tracking-[0.2em]">대한민국 모든 동아리의 성장을 지원합니다.</p>
           <button 
             onClick={onStart}
             className="bg-white text-black px-12 py-6 rounded-sm font-black tracking-[0.4em] uppercase hover:bg-blue-600 hover:text-white transition-all mx-auto text-[11px] block"
           >
             Get Started (Free)
           </button>
        </div>
      </section>

      {/* Footer: Simple & Clean */}
      <footer className="py-16 border-t border-white/5 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-white text-[8px]"></i>
              </div>
              <span className="font-black text-lg text-white tracking-tighter">Angel Campus</span>
           </div>
           
           <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
           </div>
           
           <p className="text-[9px] font-bold text-white/10 uppercase tracking-[0.2em]">© 2024 Angel Campus. Standard Edition.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
