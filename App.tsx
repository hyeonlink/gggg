
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Clubs from './pages/Clubs';
import ClubProfile from './pages/ClubProfile';
import Community from './pages/Community';
import AIAssistant from './pages/AIAssistant';
import Ranking from './pages/Ranking';
import Sponsors from './pages/Sponsors';
import { MOCK_CLUBS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('HOME');
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setSelectedClubId(null);
    window.scrollTo(0, 0);
  };

  const selectClub = (id: string) => {
    setSelectedClubId(id);
    setCurrentPage('CLUB_PROFILE');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (selectedClubId && currentPage === 'CLUB_PROFILE') {
      const club = MOCK_CLUBS.find(c => c.id === selectedClubId);
      if (club) return <ClubProfile club={club} />;
    }

    switch (currentPage) {
      case 'HOME':
        return <Home onSelectClub={selectClub} />;
      case 'CLUBS':
        return <Clubs onSelectClub={selectClub} />;
      case 'RANKING':
        return <Ranking onSelectClub={selectClub} />;
      case 'SPONSORS':
        return <Sponsors />;
      case 'COMMUNITY':
        return <Community />;
      case 'AI_LAB':
        return <AIAssistant />;
      default:
        return <Home onSelectClub={selectClub} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-white selection:text-black bg-black">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => navigateTo('CLUBS')}
          className="bg-white text-black px-12 py-4 rounded-sm font-black tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(255,255,255,0.3)] active:scale-95 transition-all uppercase"
        >
          EXPLORE CAMPUS
        </button>
      </div>

      <footer className="bg-black py-24 px-6 md:px-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-20">
            <div className="space-y-6 max-w-sm">
              <div className="text-3xl font-black tracking-tighter">ANGEL CAMPUS</div>
              <p className="text-sm text-white/40 leading-relaxed font-light">
                대한민국 엘리트 대학 동아리를 위한 전문 브랜딩 및 엔젤 투자 매칭 플랫폼. 
                우리는 캠퍼스의 열정이 세상을 바꾸는 유산이 될 수 있도록 돕습니다.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="space-y-4">
                <div className="text-[10px] font-black tracking-widest text-white uppercase">Platform</div>
                <div className="flex flex-col gap-2 text-xs text-white/40 font-bold">
                  <button onClick={() => navigateTo('CLUBS')} className="text-left hover:text-white transition-colors">동아리 탐색</button>
                  <button onClick={() => navigateTo('RANKING')} className="text-left hover:text-white transition-colors">랭킹</button>
                  <button onClick={() => navigateTo('COMMUNITY')} className="text-left hover:text-white transition-colors">커뮤니티</button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] font-black tracking-widest text-white uppercase">Network</div>
                <div className="flex flex-col gap-2 text-xs text-white/40 font-bold">
                  <button onClick={() => navigateTo('SPONSORS')} className="text-left hover:text-white transition-colors">엔젤(후원자)</button>
                  <button className="text-left hover:text-white transition-colors">기업 파트너십</button>
                  <button onClick={() => navigateTo('AI_LAB')} className="text-left hover:text-white transition-colors">AI 홍보실</button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-[10px] font-black tracking-widest text-white uppercase">Follow Us</div>
                <div className="flex gap-6 text-xl">
                  <i className="fa-brands fa-instagram text-white/40 hover:text-white cursor-pointer transition-colors"></i>
                  <i className="fa-brands fa-linkedin text-white/40 hover:text-white cursor-pointer transition-colors"></i>
                  <i className="fa-brands fa-x-twitter text-white/40 hover:text-white cursor-pointer transition-colors"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] tracking-[0.3em] uppercase text-white/20 font-black">
            <span>© 2024 ANGEL CAMPUS. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
