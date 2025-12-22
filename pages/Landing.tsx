
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-shield-halved text-white text-xs"></i>
          </div>
          <span className="text-xl font-black tracking-tighter">ANGEL CAMPUS</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#process" className="hover:text-blue-600 transition-colors">How it works</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-blue-600 text-white px-6 py-2 rounded-full text-[11px] font-black tracking-widest uppercase hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            #1 Undetectable <br/><span className="text-blue-600">AI for Campus Clubs</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            동아리 아웃리치 자동화부터 AI 기반 엔젤 매칭까지. <br/>
            엔젤캠퍼스는 동아리가 성장에만 집중할 수 있는 완벽한 인프라를 제공합니다.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <button 
              onClick={onStart}
              className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-black tracking-widest uppercase hover:bg-blue-700 transition-all shadow-2xl shadow-blue-300/50 flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-rocket"></i> 서비스 입장하기
            </button>
            <button className="w-full md:w-auto bg-white text-gray-400 px-10 py-4 rounded-xl font-black tracking-widest uppercase border border-gray-100 hover:border-blue-200 hover:text-blue-600 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Mockup Display */}
        <div className="max-w-6xl mx-auto mt-24 relative animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="bg-white rounded-3xl p-4 shadow-[0_100px_100px_-50px_rgba(37,99,235,0.1)] border border-blue-50">
             <div className="bg-gray-50 rounded-2xl aspect-video overflow-hidden border border-gray-100 relative">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" alt="Dashboard" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                {/* Floating UI Elements */}
                <div className="absolute top-10 left-10 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-white/50 w-64">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">AI Matching...</span>
                   </div>
                   <div className="space-y-3">
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[78%]"></div>
                      </div>
                      <div className="text-[11px] font-bold text-gray-800">최적의 후원자를 찾았습니다.</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Four Ways Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-20 text-center">
            Four ways we make your <br/><span className="text-blue-600">meetings better</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-600 rounded-[2.5rem] p-12 text-white shadow-2xl shadow-blue-200 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <i className="fa-solid fa-bolt text-9xl"></i>
              </div>
              <h3 className="text-2xl font-black mb-4 leading-tight">AI Outreach Engine</h3>
              <p className="text-blue-100 font-medium leading-relaxed mb-8">
                동아리의 활동 내역을 분석하여 가장 적합한 후원자를 300ms 만에 찾아내고, 개인화된 이메일을 자동으로 발송합니다.
              </p>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                 <div className="text-[10px] uppercase font-black tracking-widest mb-2 opacity-50">Target Selected</div>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20"></div>
                    <div>
                       <div className="text-xs font-bold">IT 인프라팀 엔젤</div>
                       <div className="text-[9px] opacity-60 italic">98% Match Probability</div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-12 text-[#111] shadow-xl border border-gray-100 overflow-hidden relative group">
              <h3 className="text-2xl font-black mb-4 leading-tight">Discovery Algorithm</h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                유튜브 알고리즘처럼 후원자의 관심사에 맞춰 동아리의 프로젝트를 실시간으로 노출합니다. 원하는 엔젤이 먼저 여러분을 찾아오게 하세요.
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                 <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                       <img src="https://picsum.photos/seed/reco/100/100" className="w-full h-full object-cover" alt="reco" />
                    </div>
                    <div className="space-y-2">
                       <div className="h-4 w-32 bg-gray-100 rounded"></div>
                       <div className="h-3 w-48 bg-gray-50 rounded"></div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-12 text-[#111] shadow-xl border border-gray-100 overflow-hidden relative group">
              <h3 className="text-2xl font-black mb-4 leading-tight">Direct Messaging</h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                후원자와의 소통은 더 이상 어렵지 않습니다. 플랫폼 내 실시간 메시징 기능을 통해 신뢰를 쌓고 더 큰 프로젝트를 도모하세요.
              </p>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 max-w-[240px]">
                 <div className="flex flex-col gap-3">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-none text-[10px] font-bold self-end">
                       이번 프로젝트에 관심 있습니다!
                    </div>
                    <div className="bg-gray-100 text-gray-600 p-3 rounded-2xl rounded-tl-none text-[10px] font-bold self-start">
                       감사합니다! 바로 상세안내 드릴게요.
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-12 text-[#111] shadow-xl border border-gray-100 overflow-hidden relative group">
              <h3 className="text-2xl font-black mb-4 leading-tight">Club Collaboration</h3>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                동아리 간 협력은 성장의 지름길입니다. 프로젝트가 겹친다면 팀을 이루세요. 시너지를 통해 더 높은 엔젤 스코어를 획득할 수 있습니다.
              </p>
              <div className="flex -space-x-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/collab${i}/50/50`} className="w-full h-full object-cover" alt="avatar" />
                   </div>
                 ))}
                 <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-500 flex items-center justify-center text-white text-xs font-black">
                    +
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Process */}
      <section id="process" className="py-32 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-24 text-center">Meeting notes in 3 steps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
             <div className="hidden md:block absolute top-12 left-[20%] right-[20%] border-t border-dashed border-gray-200"></div>
             
             <div className="relative text-center group">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-gray-100 mx-auto flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                   <i className="fa-solid fa-id-card text-3xl text-blue-600"></i>
                </div>
                <h4 className="text-lg font-black mb-4">1. Register Club</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium px-4">동아리 정보를 입력하고 활동 내역을 인증받으세요.</p>
             </div>

             <div className="relative text-center group">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-gray-100 mx-auto flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                   <i className="fa-solid fa-microchip text-3xl text-blue-600"></i>
                </div>
                <h4 className="text-lg font-black mb-4">2. AI Optimization</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium px-4">AI가 분석하여 최적의 아웃리치 타겟과 노출 알고리즘을 설정합니다.</p>
             </div>

             <div className="relative text-center group">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-gray-100 mx-auto flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                   <i className="fa-solid fa-handshake text-3xl text-blue-600"></i>
                </div>
                <h4 className="text-lg font-black mb-4">3. Get Supported</h4>
                <p className="text-sm text-gray-400 leading-relaxed font-medium px-4">엔젤들의 제안을 수락하고 프로젝트를 성공적으로 완수하세요.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
              <div className="text-5xl font-black text-blue-600 mb-4">12+</div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">Supported Universities</div>
           </div>
           <div className="p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
              <div className="text-5xl font-black text-blue-600 mb-4">300ms</div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">Matching Speed</div>
           </div>
           <div className="p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
              <div className="text-5xl font-black text-blue-600 mb-4">95%</div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">Response Rate</div>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-gray-50 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black tracking-tight mb-16 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
             {[
               { q: '엔젤캠퍼스는 무료인가요?', a: '동아리 등록 및 기본 아웃리치 기능은 전액 무료입니다.' },
               { q: '어떤 동아리가 지원 가능한가요?', a: '대학교 소속 정동아리, 가동아리, 연합동아리 모두 가능합니다.' },
               { q: 'AI 추천 알고리즘은 어떻게 작동하나요?', a: '동아리의 과거 포트폴리오와 게시물 텍스트 임베딩을 분석하여 엔젤의 관심사와 매칭합니다.' }
             ].map((faq, idx) => (
               <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <h4 className="font-black text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-400 font-medium leading-relaxed">{faq.a}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-20 text-white shadow-2xl shadow-blue-300 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Ready to grow your club?</h2>
            <p className="text-xl text-blue-100 mb-12 font-medium">지금 바로 대한민국 최고의 캠퍼스 인프라에 합류하세요.</p>
            <button 
              onClick={onStart}
              className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black tracking-widest uppercase hover:bg-blue-50 transition-all shadow-xl"
            >
              Start for Free
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-100 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-white text-[10px]"></i>
              </div>
              <span className="font-black tracking-tighter text-gray-400">ANGEL CAMPUS</span>
           </div>
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
             © 2024 Angel Campus. All rights reserved.
           </div>
           <div className="flex gap-6 text-gray-300 text-lg">
              <i className="fa-brands fa-instagram hover:text-blue-600 cursor-pointer"></i>
              <i className="fa-brands fa-twitter hover:text-blue-600 cursor-pointer"></i>
              <i className="fa-brands fa-github hover:text-blue-600 cursor-pointer"></i>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
