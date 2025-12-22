
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative">
      
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[140%] h-[100vh] bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation: Floating Glassmorphism Dark */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <i className="fa-solid fa-shield-halved text-white text-xs"></i>
          </div>
          <span className="text-xl font-black tracking-tighter text-white">Angel Campus</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#collaboration" className="hover:text-white transition-colors">Collab</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
        </div>

        <button 
          onClick={onStart}
          className="bg-white text-black px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95 shadow-xl"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-60 pb-32 px-6 z-10 flex flex-col items-center">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">No.1 Club Growth Engine</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white leading-[1.05]">
            동아리의 꿈을 <br/><span className="text-blue-600">AI로 연결하다</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12 leading-relaxed">
            엔젤캠퍼스는 동아리 활동을 분석하여 최적의 후원자를 찾고, <br/>
            복잡한 제안 과정을 자동화하며, 동아리 간의 시너지를 만드는 플랫폼입니다.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-32">
            <button 
              onClick={onStart}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-rocket"></i> 지금 시작하기 (Free)
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-white/10 transition-all">
              See How it Works
            </button>
          </div>
        </div>

        {/* Mockup Display */}
        <div className="max-w-6xl w-full mx-auto relative px-4 group">
          <div className="bg-[#0a0a0a] rounded-[3rem] p-4 shadow-[0_100px_150px_-50px_rgba(0,0,0,1)] border border-white/5 relative overflow-hidden">
            <div className="bg-black rounded-[2.5rem] aspect-[16/9] overflow-hidden border border-white/5 relative">
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 grayscale" alt="Interface" />
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-black/80"></div>
               
               {/* Floating AI Status Card */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black/60 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">AI Matching Live</span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white leading-tight">"당신의 동아리 활동을 좋아하는 <br/><span className="text-blue-600">3명의 후원자</span>를 찾았습니다."</h3>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[94%] shadow-[0_0_20px_rgba(37,99,235,0.8)]"></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-widest">
                       <span>Analyzing Potential</span>
                       <span>94% Accuracy</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center gap-4">
                     <i className="fa-solid fa-envelope-circle-check text-blue-500"></i>
                     <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">자동 후원 제안서 발송 완료</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Deep Black Branding */}
      <section id="features" className="py-40 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">동아리를 위한 <br/><span className="text-blue-600 italic">지능형 인프라</span></h2>
            <p className="text-white/40 font-medium text-lg uppercase tracking-widest">우리는 동아리의 가치를 증명하는 방식을 바꿉니다.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 01. Automated Outreach */}
            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
                  <i className="fa-solid fa-paper-plane text-2xl text-blue-500 group-hover:text-white"></i>
                </div>
                <h3 className="text-3xl font-black mb-6">AI 아웃리치 <br/>자동화 엔진</h3>
                <p className="text-white/40 font-medium leading-relaxed mb-10">
                  일일이 후원자를 찾고 메일을 쓰지 마세요. AI가 동아리의 성향과 맞는 후원자 리스트를 뽑고, 가장 매력적인 제안 메일을 관리자 이름으로 자동 발송합니다.
                </p>
              </div>
              <div className="flex gap-2">
                 <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5">후원자 발굴</span>
                 <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5">메일 자동화</span>
              </div>
            </div>

            {/* 02. Smart Discovery */}
            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
                  <i className="fa-solid fa-wand-magic-sparkles text-2xl text-blue-500 group-hover:text-white"></i>
                </div>
                <h3 className="text-3xl font-black mb-6">알고리즘 기반 <br/>브랜드 노출</h3>
                <p className="text-white/40 font-medium leading-relaxed mb-10">
                  유튜브 알고리즘처럼, AI가 동아리의 프로젝트와 활동 내역을 분석하여 관심 있는 후원자들의 피드에 여러분의 동아리를 우선적으로 노출시킵니다.
                </p>
              </div>
              <div className="flex gap-2">
                 <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5">스마트 매칭</span>
                 <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5">데이터 분석</span>
              </div>
            </div>

            {/* 03. Direct Message */}
            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 border border-white/5 shadow-2xl hover:border-blue-500/30 transition-all duration-500 group flex flex-col justify-between min-h-[480px]">
              <div>
                <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
                  <i className="fa-solid fa-comments text-2xl text-blue-500 group-hover:text-white"></i>
                </div>
                <h3 className="text-3xl font-black mb-6">다이렉트 소통 <br/>메시징 시스템</h3>
                <p className="text-white/40 font-medium leading-relaxed mb-10">
                  복잡한 컨택 절차 없이 매칭된 후원자와 즉시 대화를 시작하세요. 플랫폼 내 메신저를 통해 빠르고 안전하게 후원 및 파트너십 논의를 진행할 수 있습니다.
                </p>
              </div>
              <div className="flex gap-2">
                 <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5">실시간 채팅</span>
                 <span className="px-4 py-1.5 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40 border border-white/5">즉각 연결</span>
              </div>
            </div>

            {/* 04. Club Collaboration */}
            <div className="bg-blue-600 rounded-[2.5rem] p-12 text-white shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[480px] border border-white/10">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-10">
                  <i className="fa-solid fa-users-viewfinder text-2xl text-white"></i>
                </div>
                <h3 className="text-3xl font-black mb-6">동아리 간 <br/>프로젝트 협업</h3>
                <p className="text-blue-100 font-medium leading-relaxed mb-10">
                  하고 싶은 프로젝트가 겹치나요? 엔젤캠퍼스에서는 다른 동아리의 프로젝트를 확인하고 언제든 협업을 제안할 수 있습니다. 함께할 때 더 큰 지원을 받을 수 있습니다.
                </p>
              </div>
              <div className="flex gap-2">
                 <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">시너지 창출</span>
                 <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">연합 프로젝트</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Collaboration Preview Dark */}
      <section id="collaboration" className="py-40 relative">
        <div className="max-w-6xl mx-auto px-6">
           <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-8">
                 <h2 className="text-5xl font-black tracking-tighter leading-tight text-white">혼자보다 함께할 때 <br/><span className="text-blue-600">가치는 더 커집니다.</span></h2>
                 <p className="text-lg text-white/40 font-medium leading-relaxed">
                   비슷한 목표를 가진 동아리들을 AI가 추천해줍니다. <br/>
                   연합 행사를 기획하고, 후원금 규모를 키워보세요. <br/>
                   엔젤캠퍼스는 동아리들의 건강한 생태계를 지원합니다.
                 </p>
                 <div className="flex gap-10">
                    <div className="text-center">
                       <div className="text-4xl font-black text-blue-600 mb-1">120+</div>
                       <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Active Clubs</div>
                    </div>
                    <div className="text-center">
                       <div className="text-4xl font-black text-blue-600 mb-1">45%</div>
                       <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Success Rate</div>
                    </div>
                 </div>
              </div>
              <div className="flex-1 w-full relative">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 text-center space-y-4 hover:border-blue-500/20 transition-all">
                       <div className="w-14 h-14 rounded-full bg-blue-600/10 mx-auto flex items-center justify-center border border-blue-500/20"><i className="fa-solid fa-code text-blue-500 text-xl"></i></div>
                       <div className="font-black text-[10px] uppercase tracking-widest text-white/40">IT Club A</div>
                    </div>
                    <div className="bg-blue-600 p-8 rounded-3xl text-center space-y-4 text-white shadow-[0_0_50px_rgba(37,99,235,0.3)]">
                       <div className="w-14 h-14 rounded-full bg-white/20 mx-auto flex items-center justify-center"><i className="fa-solid fa-bolt text-white text-xl"></i></div>
                       <div className="font-black text-[10px] uppercase tracking-widest">COLLAB ACTIVE</div>
                    </div>
                    <div className="col-span-2 bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 text-center space-y-4 hover:border-blue-500/20 transition-all">
                       <div className="w-14 h-14 rounded-full bg-indigo-600/10 mx-auto flex items-center justify-center border border-indigo-500/20"><i className="fa-solid fa-robot text-indigo-500 text-xl"></i></div>
                       <div className="font-black text-[10px] uppercase tracking-widest text-white/40">Robot Club B</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA Dark */}
      <section className="py-60 px-6 text-center relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12">
           <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white">당신의 동아리의 <br/><span className="text-blue-600">꿈을 응원합니다.</span></h2>
           <p className="text-xl text-white/40 font-medium">지금 바로 엔젤캠퍼스에 동아리를 등록하고 새로운 가능성을 만나보세요.</p>
           <button 
             onClick={onStart}
             className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_60px_rgba(37,99,235,0.3)] flex items-center gap-4 mx-auto text-sm"
           >
             <i className="fa-solid fa-arrow-right-long"></i> 동아리 등록하고 시작하기
           </button>
        </div>
      </section>

      {/* Footer Dark */}
      <footer className="py-24 border-t border-white/5 px-6 bg-black relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-10">
           <div className="flex justify-center items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-white text-[10px]"></i>
              </div>
              <span className="font-black text-2xl text-white tracking-tighter">Angel Campus</span>
           </div>
           <div className="flex justify-center gap-10 text-[10px] font-black uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a>
           </div>
           <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">© 2024 Angel Campus. Secure Dark Infrastructure.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
