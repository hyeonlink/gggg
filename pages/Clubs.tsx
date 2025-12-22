
import React, { useState, useEffect } from 'react';
import { MOCK_CLUBS } from '../constants.tsx';
import { searchClubsAI } from '../services/geminiService.ts';
import { Club } from '../types.ts';

interface ClubsProps {
  onSelectClub: (id: string) => void;
  customClubs?: Club[];
}

const Clubs: React.FC<ClubsProps> = ({ onSelectClub, customClubs }) => {
  const displayClubs = customClubs || MOCK_CLUBS;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState<Club[]>(displayClubs);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFilteredClubs(displayClubs);
  }, [displayClubs]);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredClubs(displayClubs);
      return;
    }
    setIsSearching(true);
    const resultIds = await searchClubsAI(searchQuery, displayClubs);
    if (resultIds.length > 0) {
      setFilteredClubs(displayClubs.filter(c => resultIds.includes(c.id)));
    } else {
      setFilteredClubs([]);
    }
    setIsSearching(false);
  };

  const universityNames: Record<string, string> = {
    'SNU': '서울대학교',
    'YONSEI': '연세대학교',
    'KOREA': '고려대학교',
    'OTHER': '기타'
  };

  return (
    <div className="min-h-screen p-6 md:p-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter mb-8 uppercase">DIRECTORY</h1>
          <p className="text-white/40 tracking-widest font-light mb-12">대한민국 최상위권 캠퍼스 동아리 브랜드 디렉토리</p>
          
          {/* AI Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-16 group">
            <div className="flex-grow relative">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="AI에게 물어보세요 (예: 보안에 관심 있는 서울대 동아리 알려줘)"
                className="w-full bg-neutral-900 border border-white/20 p-5 pl-8 text-white focus:outline-none focus:border-blue-500 transition-all text-xl font-light placeholder:text-white/20"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-400/50 italic text-sm pointer-events-none group-focus-within:hidden">
                Powered by Gemini AI
              </div>
            </div>
            <button 
              onClick={handleAISearch}
              disabled={isSearching}
              className="bg-blue-600 text-white px-12 py-5 font-black tracking-widest hover:bg-blue-500 transition-all disabled:opacity-50 min-w-[200px]"
            >
              {isSearching ? '검색 중...' : 'AI 스마트 검색'}
            </button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-4 text-xs tracking-[0.3em] font-black uppercase mb-16">
            {['전체', 'IT/코딩', '음악/공연', '스포츠', '예술/디자인', '문화/봉사'].map((cat) => (
              <button key={cat} className="px-8 py-3 border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
          {filteredClubs.map((club) => (
            <div 
              key={club.id} 
              className="group cursor-pointer flex flex-col"
              onClick={() => onSelectClub(club.id)}
            >
              <div className="aspect-square bg-neutral-900 mb-8 overflow-hidden border border-white/10 relative">
                <img 
                  src={club.logo} 
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-black tracking-widest border border-white px-4 py-2 text-xs backdrop-blur-sm">VIEW BRAND</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight group-hover:text-blue-400 transition-colors truncate pr-2">{club.name}</h3>
                  <span className="text-[10px] border border-blue-500/40 text-blue-400 px-2 py-0.5 tracking-tighter font-bold uppercase shrink-0 mt-1">
                    {club.category}
                  </span>
                </div>
                <p className="text-xs text-white/40 tracking-widest font-bold">{universityNames[club.university]}</p>
                <p className="text-sm text-white/60 font-light mt-4 line-clamp-2 leading-relaxed">{club.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {filteredClubs.length === 0 && !isSearching && (
          <div className="text-center py-40">
            <div className="text-6xl mb-6 opacity-20">NO RESULT</div>
            <p className="text-white/40 tracking-[0.5em] uppercase text-sm">검색 결과가 없습니다. 다른 키워드로 시도해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clubs;
