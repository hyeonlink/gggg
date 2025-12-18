
import React, { useState } from 'react';
import { MOCK_SPONSORS } from '../constants';

const Sponsors: React.FC = () => {
  const [tab, setTab] = useState<'INDIVIDUAL' | 'CORPORATE'>('INDIVIDUAL');

  const filteredSponsors = MOCK_SPONSORS.filter(s => s.type === tab);

  return (
    <div className="min-h-screen bg-black p-6 md:p-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter uppercase mb-6">ANGELS</h1>
          <p className="text-white/40 tracking-[0.4em] font-light uppercase text-sm">캠퍼스의 미래를 함께 설계하는 후원자 군단</p>
        </header>

        {/* Type Tabs */}
        <div className="flex gap-12 mb-16 border-b border-white/10 pb-4">
           <button 
             onClick={() => setTab('INDIVIDUAL')}
             className={`text-sm font-black tracking-widest uppercase pb-2 transition-all ${
               tab === 'INDIVIDUAL' ? 'text-white border-b-2 border-white' : 'text-white/20 hover:text-white'
             }`}
           >
             개인 엔젤 (Individual)
           </button>
           <button 
             onClick={() => setTab('CORPORATE')}
             className={`text-sm font-black tracking-widest uppercase pb-2 transition-all ${
               tab === 'CORPORATE' ? 'text-white border-b-2 border-white' : 'text-white/20 hover:text-white'
             }`}
           >
             기업 파트너 (Partners)
           </button>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSponsors.map((sponsor) => (
            <div key={sponsor.id} className="bg-[#0f0f0f] border border-white/5 p-8 group hover:border-white/40 transition-all flex flex-col">
               <div className="flex items-start justify-between mb-8">
                  <div className="w-20 h-20 bg-neutral-800 border border-white/10 overflow-hidden">
                     <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  {sponsor.isPartner && (
                    <span className="text-[9px] font-black tracking-widest bg-white text-black px-2 py-0.5 uppercase">Official Partner</span>
                  )}
               </div>
               
               <h3 className="text-2xl font-black tracking-tighter uppercase mb-4">{sponsor.name}</h3>
               <p className="text-white/50 text-sm font-light leading-relaxed mb-6 flex-grow">
                 {sponsor.description}
               </p>

               <div className="space-y-4">
                  <div>
                    <div className="text-[10px] text-white/20 tracking-widest uppercase mb-2">관심 분야</div>
                    <div className="flex flex-wrap gap-2">
                       {sponsor.interest.map(i => (
                         <span key={i} className="text-[9px] font-bold border border-white/10 px-2 py-0.5 text-white/40">#{i}</span>
                       ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-white/20 tracking-widest uppercase">누적 후원액</span>
                    <span className="text-sm font-mono font-bold text-white/80">₩{sponsor.totalDonated.toLocaleString()}</span>
                  </div>
                  <button className="w-full mt-4 py-3 border border-white/10 text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                    프로젝트 제안하기
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
