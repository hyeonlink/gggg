
import React from 'react';
import { Club } from '../types';

interface ClubProfileProps {
  club: Club;
}

const ClubProfile: React.FC<ClubProfileProps> = ({ club }) => {
  const universityNames: Record<string, string> = {
    'SNU': '서울대학교',
    'YONSEI': '연세대학교',
    'KOREA': '고려대학교',
    'OTHER': '기타'
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header Image */}
      <div className="h-[40vh] md:h-[50vh] w-full overflow-hidden relative">
        <img 
          src={club.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-0 -mt-32 relative z-10 pb-40">
        {/* Main Branding Card */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-sm p-10 mb-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-sm border-4 border-[#0f0f0f] bg-neutral-900 overflow-hidden shrink-0 shadow-2xl relative">
              <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-blue-600 text-white text-[9px] font-black text-center py-1 uppercase tracking-widest">VERIFIED BRAND</div>
            </div>
            <div className="flex-grow pt-4">
              <div className="flex flex-wrap justify-between items-start gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-5xl font-black tracking-tighter uppercase">{club.name}</h1>
                    <span className="text-[10px] font-bold border border-blue-500 text-blue-400 px-3 py-1 tracking-widest uppercase">{club.category}</span>
                  </div>
                  <p className="text-2xl text-white/70 font-light mb-8 leading-snug">{club.description}</p>
                  <div className="flex flex-wrap items-center gap-8 text-[11px] text-white/40 tracking-[0.2em] font-bold uppercase">
                    <span><i className="fa-solid fa-building-columns mr-2 text-blue-500"></i>{universityNames[club.university]}</span>
                    <span><i className="fa-solid fa-location-dot mr-2 text-red-500"></i>{club.location}</span>
                    <span><i className="fa-solid fa-users mr-2 text-green-500"></i>활동 멤버 {club.memberCount}명</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-10 py-3 font-black text-sm tracking-widest hover:bg-blue-500 transition-all uppercase">
                    팔로우
                  </button>
                  <button className="border border-white/30 px-10 py-3 font-black text-sm tracking-widest hover:border-white transition-all uppercase">
                    브랜드 문의
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Branding Story */}
            <div className="bg-[#0f0f0f] border border-white/10 p-10">
              <h2 className="text-2xl font-black tracking-widest uppercase mb-10 pb-4 border-b border-white/10 text-blue-400">브랜드 정보</h2>
              <div className="text-white/60 leading-loose font-light text-lg whitespace-pre-wrap">
                {club.longDescription}
              </div>
              <div className="flex flex-wrap gap-3 mt-12">
                {club.tags.map(tag => (
                  <span key={tag} className="text-[11px] tracking-widest uppercase bg-blue-900/10 border border-blue-500/20 text-blue-300 px-4 py-1.5 font-bold hover:bg-blue-600 hover:text-white transition-all cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Funding Projects */}
            <div className="bg-[#0f0f0f] border border-white/10 p-10">
              <h2 className="text-2xl font-black tracking-widest uppercase mb-10 pb-4 border-b border-white/10 text-blue-400">진행 중인 펀딩 프로젝트</h2>
              {club.projects.length > 0 ? (
                <div className="space-y-16">
                  {club.projects.map(proj => (
                    <div key={proj.id} className="group">
                      <div className="flex flex-col gap-10">
                        <div className="w-full aspect-video overflow-hidden border border-white/5 relative">
                          <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                          <div className="absolute bottom-8 left-8">
                             <h3 className="text-3xl font-black tracking-tighter uppercase mb-2 group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                             <p className="text-white/60 font-light max-w-xl">{proj.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            <div className="flex justify-between items-end">
                               <div className="text-sm font-black tracking-widest text-white/40 uppercase">펀딩 달성률</div>
                               <div className="text-4xl font-black italic text-blue-500">{Math.round((proj.currentAmount / proj.goalAmount) * 100)}%</div>
                            </div>
                            <div className="h-2 bg-white/10 w-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-1000 ease-out" 
                                style={{ width: `${Math.min(100, (proj.currentAmount / proj.goalAmount) * 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold tracking-widest">
                              <span className="text-white">모금액: ₩{proj.currentAmount.toLocaleString()}</span>
                              <span className="text-white/40">목표액: ₩{proj.goalAmount.toLocaleString()}</span>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-5 font-black tracking-[0.3em] uppercase hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20">
                              엔젤(후원자) 되기
                            </button>
                          </div>

                          <div className="space-y-4">
                             <h4 className="text-sm font-black tracking-widest text-white/40 uppercase mb-4">후원 리워드</h4>
                             {proj.rewards.map(reward => (
                               <div key={reward.id} className="p-5 border border-white/10 bg-white/[0.02] hover:border-blue-500/40 transition-all cursor-pointer group/reward">
                                 <div className="flex justify-between items-start mb-2">
                                   <div className="font-black text-sm tracking-tight group-hover/reward:text-blue-400">{reward.title}</div>
                                   <div className="text-[10px] font-black tracking-tighter bg-blue-600 text-white px-2 py-0.5">₩{reward.minAmount.toLocaleString()}+</div>
                                 </div>
                                 <div className="text-[11px] text-white/40 font-light leading-relaxed group-hover/reward:text-white/70">{reward.description}</div>
                               </div>
                             ))}
                          </div>
                        </div>

                        {/* Project Reports */}
                        {proj.reports.length > 0 && (
                          <div className="mt-6 pt-10 border-t border-white/5">
                            <h4 className="text-sm font-black tracking-widest text-white/40 uppercase mb-8">프로젝트 활동 보고 (히스토리)</h4>
                            <div className="relative pl-8 space-y-10 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-blue-500/30">
                               {proj.reports.map(report => (
                                 <div key={report.id} className="relative">
                                    <div className="absolute -left-[27px] top-1 w-5 h-5 bg-black border-2 border-blue-500 z-10"></div>
                                    <div className="text-[10px] font-black text-blue-400/60 tracking-widest mb-2">{report.date}</div>
                                    <div className="text-sm font-bold mb-2">{report.content}</div>
                                    <div className="text-xs text-white/30 italic">활동 사진 증빙 완료 <i className="fa-solid fa-circle-check ml-1 text-green-500"></i></div>
                                 </div>
                               ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white/20 text-center py-24 tracking-[0.5em] italic uppercase border border-dashed border-white/10">
                   현재 진행 중인 프로젝트가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-10">
            {/* Recent Feeds */}
            <div className="bg-[#0f0f0f] border border-white/10 p-10">
              <h2 className="text-xl font-black tracking-widest uppercase mb-8 pb-4 border-b border-white/10 text-blue-400">최근 활동 피드</h2>
              <div className="space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-video w-full bg-neutral-900 border border-white/10 mb-4 overflow-hidden">
                       <img src={`https://picsum.photos/seed/feed-${i}/400/225`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="text-xs font-bold tracking-tight mb-1 group-hover:text-blue-400">활동 공유: {i}주차 연구 일지</div>
                    <div className="text-[9px] text-white/20 tracking-widest uppercase">2024.05.{20-i}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-3 text-[10px] tracking-widest font-black border border-white/10 hover:border-blue-500 hover:text-blue-400 transition-all uppercase">
                모든 활동 보기
              </button>
            </div>

            {/* Admin Info */}
            <div className="bg-[#0f0f0f] border border-white/10 p-10">
              <h2 className="text-xl font-black tracking-widest uppercase mb-8 pb-4 border-b border-white/10">브랜드 관리자</h2>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-800 border border-white/10">
                  <img src="https://picsum.photos/seed/admin1/100/100" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-lg font-black tracking-tighter">이상혁</div>
                  <div className="text-[10px] text-white/40 tracking-widest uppercase font-bold">총괄 회장 (President)</div>
                </div>
              </div>
            </div>

            {/* Verification Tag */}
            <div className="p-8 border-2 border-blue-500/20 text-center bg-blue-500/5">
               <div className="text-4xl mb-4 text-blue-500/50"><i className="fa-solid fa-shield-halved"></i></div>
               <div className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-400/80 leading-relaxed">
                  본 동아리는 엔젤캠퍼스 관리자의 엄격한 승인 절차를 거친 공식 인증 브랜드입니다.
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
