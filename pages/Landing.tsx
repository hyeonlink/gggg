
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] pointer-events-none z-0 opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-900/30"></div>
      </div>

      {/* Navigation: Dark Minimal */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/40">
            <i className="fa-solid fa-shield-halved text-white text-[10px]"></i>
          </div>
          <span className="text-lg font-black tracking-tighter text-white">Angel Campus</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.1em] text-white/30">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#process" className="hover:text-white transition-colors">How it works</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <button 
          onClick={onStart}
          className="bg-white text-black px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all shadow-lg"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-60 pb-32 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            #1 Undetectable <br/><span className="text-blue-600">AI for Campus Clubs</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-white/40 font-medium mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            엔젤캠퍼스는 동아리의 가치를 정밀하게 분석하여 <br/>
            최적의 후원자와 연결하는 비즈니스 인프라입니다.
          </p>
          <div className="flex justify-center mb-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <button 
              onClick={onStart}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black tracking-widest uppercase text-xs hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/20 flex items-center gap-3"
            >
              <i className="fa-solid fa-rocket"></i> Get Started for Free
            </button>
          </div>
        </div>

        {/* Hero Mockup: Cluely Dark Style */}
        <div className="max-w-6xl mx-auto relative px-4 animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="bg-[#0a0a0a] rounded-[3rem] p-4 shadow-[0_80px_120px_-30px_rgba(0,0,0,1)] border border-white/5 relative overflow-hidden">
            <div className="bg-black rounded-[2.5rem] aspect-[16/10] overflow-hidden border border-white/5 relative">
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 grayscale" alt="Dark UI" />
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-black/80"></div>
               
               {/* Floating AI Bubble: Dark Glass */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black/60 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl border border-white/10 space-y-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">AI Matching Engine</span>
                    <i className="fa-solid fa-bolt-lightning text-blue-500 animate-pulse"></i>
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-white leading-tight">"귀하의 동아리를 위한 <br/><span className="text-blue-500">3개의 엔젤 제안</span>이 대기 중입니다."</h3>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[84%] shadow-[0_0_20px_rgba(37,99,235,0.8)]"></div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl text-[10px] text-white/30 font-bold uppercase tracking-widest border border-white/5">
                     Outreach email generation in progress...
                  </div>
               </div>
            </div>
          </div>
          {/* Decorative icons */}
          <div className="flex justify-center gap-3 mt-8 opacity-10">
             {[1,2,3,4,5].map(i => <div key={i} className="w-10 h-10 bg-white rounded-xl"></div>)}
          </div>
        </div>
      </section>

      {/* Feature Grid: Dark Cluely Style */}
      <section id="features" className="py-40 px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-24 text-center">
            Four ways we make your <br/><span className="text-white/20">clubs better</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-600 rounded-[2.5rem] p-12 text-white shadow-[0_40px_80px_-20px_rgba(37,99,235,0.3)] flex flex-col justify-between min-h-[440px] border border-blue-400/20 group hover:-translate-y-2 transition-transform duration-500">
              <div>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Real-time Outreach</span>
                <h3 className="text-3xl font-black mb-4 leading-tight">AI가 대신하는 <br/>최적의 엔젤 발굴</h3>
                <p className="text-blue-100/70 font-medium leading-relaxed">
                  엔젤캠퍼스의 AI는 XXXms 만에 동아리의 성향과 게시물을 분석하여 가장 적합한 후원자와 매칭을 시작합니다.
                </p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/10 mt-10">
                 <div className="h-12 w-full bg-white/10 rounded-xl mb-3 animate-pulse"></div>
                 <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 text-white border border-white/5 shadow-2xl flex flex-col justify-between min-h-[440px] group hover:-translate-y-2 transition-transform duration-500">
              <div>
                <span className="bg-white/5 text-white/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Auto Emailing</span>
                <h3 className="text-3xl font-black mb-4 leading-tight">개인화된 <br/>이메일 자동 발송</h3>
                <p className="text-white/40 font-medium leading-relaxed">
                  제안부터 사후 감사 인사까지. AI가 후원자 한 명 한 명에게 사용자가 직접 작성한 이메일을 자동으로 전송합니다.
                </p>
              </div>
              <div className="bg-black rounded-2xl p-6 border border-white/5 mt-10 space-y-3">
                 <div className="h-2 w-full bg-white/10 rounded-full"></div>
                 <div className="h-2 w-5/6 bg-white/5 rounded-full"></div>
                 <div className="h-2 w-4/6 bg-white/5 rounded-full"></div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 text-white border border-white/5 shadow-2xl flex flex-col justify-between min-h-[440px] group hover:-translate-y-2 transition-transform duration-500">
              <div>
                <span className="bg-white/5 text-white/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Smart Discovery</span>
                <h3 className="text-3xl font-black mb-4 leading-tight">XXX처럼 <br/>추천되는 동아리</h3>
                <p className="text-white/40 font-medium leading-relaxed">
                  엔젤의 관심사에 맞춰 동아리의 프로젝트를 실시간으로 노출합니다. 기다리지 말고 먼저 발견되세요.
                </p>
              </div>
              <div className="flex -space-x-4 mt-10">
                 {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full bg-black border-4 border-[#0a0a0a] shadow-xl overflow-hidden"><img src={`https://picsum.photos/seed/sponsor${i}/100/100`} className="w-full h-full object-cover" /></div>)}
                 <div className="w-12 h-12 rounded-full bg-blue-600 border-4 border-[#0a0a0a] flex items-center justify-center text-xs font-black">+</div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 text-white border border-white/5 shadow-2xl flex flex-col justify-between min-h-[440px] group hover:-translate-y-2 transition-transform duration-500">
              <div>
                <span className="bg-white/5 text-white/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Direct Connect</span>
                <h3 className="text-3xl font-black mb-4 leading-tight">복잡한 절차 없는 <br/>실시간 메시징</h3>
                <p className="text-white/40 font-medium leading-relaxed">
                  매칭된 후원자와 즉각적인 소통이 가능합니다. 엔젤캠퍼스 플랫폼 내에서 모든 협의를 마무리하세요.
                </p>
              </div>
              <div className="bg-black rounded-2xl p-6 border border-white/5 mt-10 flex flex-col gap-2">
                 <div className="h-8 w-3/4 bg-blue-600/20 rounded-lg self-end border border-blue-500/10"></div>
                 <div className="h-8 w-2/3 bg-white/5 rounded-lg self-start"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full z-0"></div>
      </section>

      {/* 3 Step Process */}
      <section id="process" className="py-40 bg-[#050505] px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl font-black tracking-tight mb-24 text-center">Meeting success in 3 steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-white/5"></div>
             
             {[
               { icon: 'fa-play', title: 'Start Angel', desc: '동아리 정보를 입력하고 활동을 시작하세요.' },
               { icon: 'fa-stop', title: 'End Processing', desc: 'AI가 활동을 분석하고 후원자를 매칭합니다.' },
               { icon: 'fa-file-lines', title: 'Get Support', desc: '최종 매칭 결과와 후원 제안을 받아보세요.' }
             ].map((step, idx) => (
               <div key={idx} className="relative group text-center">
                  <div className="bg-black aspect-square rounded-[2rem] border border-white/10 flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                     <i className={`fa-solid ${step.icon} text-3xl text-white/20 group-hover:text-blue-500 transition-colors`}></i>
                  </div>
                  <div className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Step {idx + 1}</div>
                  <h4 className="text-xl font-black mb-4 uppercase">{step.title}</h4>
                  <p className="text-sm text-white/30 font-medium leading-relaxed px-4">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Undetectable Stats Section */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto text-center mb-24">
           <h2 className="text-5xl font-black tracking-tight mb-6">No meeting bots. <br/><span className="text-blue-600 italic">100% personal.</span></h2>
           <a href="#" className="text-white/20 text-xs font-bold tracking-widest uppercase hover:text-white transition-colors">How does Angel Campus stay undetectable?</a>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 px-1 py-1 bg-white/5 rounded-[3rem]">
           <div className="bg-black rounded-[2.5rem] p-20 flex flex-col items-center text-center border border-white/5">
              <span className="text-white/10 text-[10px] font-black uppercase tracking-widest mb-10">Traditional Outreach</span>
              <div className="w-32 h-32 bg-white/5 rounded-3xl flex items-center justify-center border border-white/5 mb-10">
                 <i className="fa-solid fa-ghost text-4xl text-white/10"></i>
              </div>
              <h4 className="text-2xl font-black mb-4 leading-tight opacity-40">복사 붙여넣기로 반복되는 <br/>차가운 스팸성 메일</h4>
           </div>
           <div className="bg-blue-600 rounded-[2.5rem] p-20 flex flex-col items-center text-center text-white relative overflow-hidden shadow-2xl">
              <span className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-10 relative z-10">Angel Campus</span>
              <div className="w-32 h-32 bg-white/10 rounded-3xl flex items-center justify-center mb-10 relative z-10 border border-white/20">
                 <i className="fa-solid fa-heart-pulse text-4xl text-white"></i>
              </div>
              <h4 className="text-2xl font-black mb-4 leading-tight relative z-10">AI가 매칭한 데이터 기반의 <br/>진정성 있는 개인화 메시지</h4>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] rounded-full pointer-events-none"></div>
           </div>
        </div>
      </section>

      {/* Real-time Transcription Style Stats */}
      <section className="py-40 px-6 bg-[#030303]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
           <div className="flex-1 bg-black rounded-[3rem] p-16 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="bg-[#0a0a0a] rounded-3xl p-10 border border-white/10 relative z-10">
                 <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-10">Real-time Outreach Tracking</h4>
                 <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                       <div className="h-3 flex-grow bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 w-3/4 animate-pulse"></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-white/5"></div>
                       <div className="h-3 flex-grow bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-white/10 w-1/2"></div>
                       </div>
                    </div>
                    <div className="text-2xl font-black italic text-blue-500 mt-10">MATCHING LIVE...</div>
                 </div>
              </div>
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
           </div>
           
           <div className="flex-1 space-y-12">
              <h2 className="text-5xl font-black tracking-tight leading-tight">AI performance <br/>that speaks for itself.</h2>
              <div className="space-y-12">
                 <div className="flex gap-12 items-start">
                    <div className="text-5xl font-black text-blue-600 italic min-w-[120px]">12+</div>
                    <div>
                       <h5 className="text-xl font-black mb-3 uppercase">Universities</h5>
                       <p className="text-white/30 text-sm leading-relaxed">전국 00개 이상 주요 대학의 정동아리들이 이미 신뢰를 보내고 있습니다.</p>
                    </div>
                 </div>
                 <div className="flex gap-12 items-start border-t border-white/5 pt-12">
                    <div className="text-5xl font-black text-blue-600 italic min-w-[120px]">300ms</div>
                    <div>
                       <h5 className="text-xl font-black mb-3 uppercase">Response time</h5>
                       <p className="text-white/30 text-sm leading-relaxed">압도적인 매칭 속도로 후원자와 동아리 간의 공백을 최소화합니다.</p>
                    </div>
                 </div>
                 <div className="flex gap-12 items-start border-t border-white/5 pt-12">
                    <div className="text-5xl font-black text-blue-600 italic min-w-[120px]">95%</div>
                    <div>
                       <h5 className="text-xl font-black mb-3 uppercase">Match Accuracy</h5>
                       <p className="text-white/30 text-sm leading-relaxed">고도화된 텍스트 분석을 통한 최고 수준의 매칭 정확도.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-60 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-10 relative z-10">
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">AI THAT SUPPORTS<br/><span className="text-blue-600">THE DREAM.</span></h2>
           <p className="text-xl text-white/30 font-medium">지금 바로 여러분의 동아리를 위한 엔젤을 만나보세요.</p>
           <button 
             onClick={onStart}
             className="bg-white text-black px-12 py-6 rounded-2xl font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all shadow-[0_20px_60px_rgba(255,255,255,0.1)] flex items-center gap-4 mx-auto text-sm"
           >
             <i className="fa-solid fa-arrow-right-long"></i> Enter the Engine
           </button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none"></div>
      </section>

      {/* Footer: Simple Dark */}
      <footer className="py-24 border-t border-white/5 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-20">
              <div className="space-y-6">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <i className="fa-solid fa-shield-halved text-white text-[10px]"></i>
                    </div>
                    <span className="font-black text-2xl tracking-tighter">Angel Campus</span>
                 </div>
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Servers Operational
                 </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                 <div className="space-y-5">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-white/20">Resources</h6>
                    <ul className="text-xs text-white/40 space-y-4 font-bold uppercase tracking-tighter">
                       <li className="hover:text-blue-500 cursor-pointer">Mobile App</li>
                       <li className="hover:text-blue-500 cursor-pointer">Manifesto</li>
                    </ul>
                 </div>
                 <div className="space-y-5">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-white/20">Support</h6>
                    <ul className="text-xs text-white/40 space-y-4 font-bold uppercase tracking-tighter">
                       <li className="hover:text-blue-500 cursor-pointer">Help Center</li>
                       <li className="hover:text-blue-500 cursor-pointer">Contact</li>
                    </ul>
                 </div>
                 <div className="space-y-5">
                    <h6 className="text-[10px] font-black uppercase tracking-widest text-white/20">Legal</h6>
                    <ul className="text-xs text-white/40 space-y-4 font-bold uppercase tracking-tighter">
                       <li className="hover:text-blue-600 cursor-pointer">Privacy</li>
                       <li className="hover:text-blue-600 cursor-pointer">Terms</li>
                    </ul>
                 </div>
              </div>
           </div>
           <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">© 2024 Angel Campus. Secure Mode.</span>
              <div className="flex gap-10 text-white/10 text-lg">
                 <i className="fa-brands fa-twitter hover:text-white cursor-pointer transition-colors"></i>
                 <i className="fa-brands fa-instagram hover:text-white cursor-pointer transition-colors"></i>
                 <i className="fa-brands fa-github hover:text-white cursor-pointer transition-colors"></i>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
