
import React from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const navItems = [
    { id: 'HOME', label: '홈' },
    { id: 'CLUBS', label: '동아리 탐색' },
    { id: 'RANKING', label: '랭킹' },
    { id: 'SPONSORS', label: '엔젤(후원자)' },
    { id: 'COMMUNITY', label: '커뮤니티' },
    { id: 'AI_LAB', label: 'AI 홍보실' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div 
        className="text-2xl font-extrabold tracking-tighter cursor-pointer flex items-center gap-2"
        onClick={() => onNavigate('HOME')}
      >
        <span className="text-white">ANGEL</span>
        <span className="text-white/50 font-light italic">CAMPUS</span>
      </div>
      
      <div className="hidden lg:flex gap-10 items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`text-sm font-bold tracking-widest transition-all ${
              currentPage === item.id ? 'text-white border-b border-white' : 'text-white/40 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <button className="text-sm font-bold border border-white px-5 py-1.5 hover:bg-white hover:text-black transition-all">
          로그인
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
