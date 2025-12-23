
import React, { useState } from 'react';
import { Club } from '../types.ts';

interface RankingProps {
  onSelectClub: (id: string) => void;
  customClubs?: Club[];
}

const Ranking: React.FC<RankingProps> = ({ onSelectClub, customClubs }) => {
  const sortedClubs = [...(customClubs || [])].sort((a, b) => b.angelScore - a.angelScore);
  const [filter, setFilter] = useState('ALL');

  const filteredClubs = filter === 'ALL' 
    ? sortedClubs 
    : sortedClubs.filter(c => c.university === filter);

  return (
    <div className="min-h-screen bg-black p-6 md:p-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter uppercase mb-6">RANKING</h1>
          <p className="text-white/40 tracking-[0.4em] font-light uppercase text-sm">엔젤들이 선택한 이달의 TOP 캠퍼스 브랜드</p>
        </header>

        <div className="flex gap-6 mb-12 border-b border-white/10 pb-4 overflow-x-auto">
          {['ALL', 'SNU', 'YONSEI', 'KOREA'].map((univ) => (
            <button
              key={univ}
              onClick={() => setFilter(univ)}
              className={`text-xs font-black tracking-widest px-4 py-2 transition-all ${
                filter === univ ? 'text-blue-500 border-b-2 border-blue-500' : 'text-white/30 hover:text-white'
              }`}
            >
              {univ === 'ALL' ? '전체 학교' : univ}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredClubs.map((club, index) => (
            <div 
              key={club.id}
              onClick={() => onSelectClub(club.id)}
              className="group flex flex-col md:flex-row items-center bg-[#0f0f0f] border border-white/5 p-6 hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-10 flex-grow w-full">
                <div className={`text-4xl font-black italic w-12 text-center transition-colors ${index < 3 ? 'text-blue-500' : 'text-white/20'}`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="w-16 h-16 bg-neutral-800 border border-white/10 shrink-0 overflow-hidden">
                   <img src={club.logo} alt={club.name} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                </div>
                <div className="flex-grow">
                   <div className="text-xl font-black tracking-tighter uppercase group-hover:text-blue-400 transition-colors">{club.name}</div>
                   <div className="text-[10px] text-white/40 tracking-widest font-bold uppercase">{club.university} • {club.category}</div>
                </div>
              </div>

              <div className="flex items-center gap-16 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end px-4 md:px-0">
                <div className="text-right">
                   <div className="text-[10px] text-white/20 tracking-widest uppercase mb-1">총 후원금액</div>
                   <div className="text-lg font-mono text-white/80">₩{club.totalFunding.toLocaleString()}</div>
                </div>
                <div className="text-right min-w-[100px]">
                   <div className="text-[10px] text-blue-500/50 tracking-widest uppercase mb-1 font-black">엔젤 스코어</div>
                   <div className="text-3xl font-black italic text-white group-hover:text-blue-400 transition-colors">{club.angelScore}</div>
                </div>
                <div className="hidden md:block">
                   <i className="fa-solid fa-chevron-right text-white/20 group-hover:translate-x-2 group-hover:text-blue-500 transition-all"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
