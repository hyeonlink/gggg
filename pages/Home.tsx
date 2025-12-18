
import React from 'react';
import { MOCK_FEED_POSTS, MOCK_CLUBS } from '../constants';

const Home: React.FC<{ onSelectClub: (id: string) => void }> = ({ onSelectClub }) => {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Profile Summary */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            <div className="bg-[#111] border border-white/10 overflow-hidden">
               <div className="h-20 bg-gradient-to-r from-neutral-800 to-neutral-900"></div>
               <div className="p-6 -mt-12 text-center">
                  <div className="w-20 h-20 rounded-sm border-2 border-[#111] bg-neutral-800 mx-auto overflow-hidden mb-4 shadow-xl">
                    <img src="https://picsum.photos/seed/me/100/100" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-black tracking-tighter text-xl uppercase">김양현</h3>
                  <p className="text-[10px] text-white/40 tracking-widest font-bold uppercase mt-1">Angel Investor</p>
               </div>
               <div className="border-t border-white/5 p-4 space-y-3">
                  <div className="flex justify-between text-[11px] font-bold tracking-widest text-white/40">
                    <span>관심 동아리</span>
                    <span className="text-white">12</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold tracking-widest text-white/40">
                    <span>총 후원 프로젝트</span>
                    <span className="text-white">5</span>
                  </div>
               </div>
               <div className="border-t border-white/5 p-4">
                  <button className="w-full py-2 text-[10px] font-black tracking-[0.2em] border border-white/10 hover:border-white transition-all uppercase">내 프로필 설정</button>
               </div>
            </div>

            <div className="bg-[#111] border border-white/10 p-6">
               <h4 className="text-[11px] font-black tracking-widest text-white uppercase mb-4">Quick Links</h4>
               <ul className="space-y-4 text-xs font-bold text-white/40 tracking-widest">
                 <li className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors"><i className="fa-solid fa-users w-4"></i> 내 그룹</li>
                 <li className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors"><i className="fa-solid fa-calendar-days w-4"></i> 캠퍼스 이벤트</li>
                 <li className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors"><i className="fa-solid fa-bookmark w-4"></i> 저장된 포스트</li>
                 <li className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors"><i className="fa-solid fa-gear w-4"></i> 광고 관리자</li>
               </ul>
            </div>
          </div>

          {/* Main Content: The Feed */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            
            {/* Post Input (Club Only Concept) */}
            <div className="bg-[#111] border border-white/10 p-4 flex gap-4">
               <div className="w-12 h-12 bg-neutral-800 shrink-0">
                  <img src="https://picsum.photos/seed/me/100/100" className="w-full h-full object-cover grayscale" />
               </div>
               <button className="flex-grow text-left px-6 border border-white/10 text-white/30 text-sm font-light hover:bg-white/5 transition-colors">
                  브랜드 업데이트를 공유하세요...
               </button>
            </div>

            {/* Posts Grid */}
            <div className="space-y-8">
              {MOCK_FEED_POSTS.map((post) => (
                <div key={post.id} className="bg-[#111] border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {/* Post Header */}
                  <div className="p-6 flex justify-between items-start">
                    <div className="flex gap-4 cursor-pointer" onClick={() => onSelectClub(post.clubId)}>
                       <div className="w-12 h-12 bg-neutral-800 border border-white/10">
                          <img src={post.clubLogo} alt={post.clubName} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <h4 className="font-black tracking-tighter text-lg uppercase leading-none mb-1 group-hover:underline">{post.clubName}</h4>
                          <div className="text-[10px] text-white/40 font-bold tracking-widest uppercase">
                            {post.university} • {post.createdAt}
                          </div>
                       </div>
                    </div>
                    <button className="text-white/20 hover:text-white transition-colors"><i className="fa-solid fa-ellipsis"></i></button>
                  </div>

                  {/* Post Content */}
                  <div className="px-6 pb-4">
                    <p className="text-white/80 font-light leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="w-full aspect-video border-y border-white/5 overflow-hidden">
                       <img src={post.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Update" />
                    </div>
                  )}

                  {/* Engagement Metrics */}
                  <div className="px-6 py-3 flex justify-between items-center text-[10px] text-white/40 font-bold tracking-widest uppercase">
                     <div className="flex gap-4">
                        <span>좋아요 {post.likes}</span>
                        <span>댓글 {post.comments}</span>
                     </div>
                     <span>조회 1.2K</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-2 py-1 border-t border-white/5 grid grid-cols-4">
                     <button className="flex items-center justify-center gap-2 py-3 hover:bg-white/5 text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase">
                        <i className="fa-regular fa-thumbs-up"></i> 좋아요
                     </button>
                     <button className="flex items-center justify-center gap-2 py-3 hover:bg-white/5 text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase">
                        <i className="fa-regular fa-comment"></i> 댓글
                     </button>
                     <button className="flex items-center justify-center gap-2 py-3 hover:bg-white/5 text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase">
                        <i className="fa-solid fa-share-nodes"></i> 공유
                     </button>
                     {post.projectId && (
                       <button 
                         onClick={() => onSelectClub(post.clubId)}
                         className="flex items-center justify-center gap-2 py-3 bg-white text-black text-[11px] font-black tracking-widest uppercase hover:bg-neutral-200 transition-all"
                       >
                          <i className="fa-solid fa-heart"></i> 후원하기
                       </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Recommendations */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            <div className="bg-[#111] border border-white/10 p-6">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-[11px] font-black tracking-widest text-white uppercase">추천 동아리</h4>
                 <button className="text-[9px] text-white/40 hover:text-white font-bold uppercase tracking-widest transition-colors">전체보기</button>
               </div>
               <div className="space-y-6">
                 {MOCK_CLUBS.slice(0, 3).map(club => (
                   <div key={club.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => onSelectClub(club.id)}>
                      <div className="w-10 h-10 bg-neutral-800 border border-white/10 shrink-0 overflow-hidden">
                         <img src={club.logo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="min-w-0">
                         <div className="text-xs font-black tracking-tight uppercase truncate">{club.name}</div>
                         <div className="text-[9px] text-white/30 tracking-widest uppercase truncate">{club.category}</div>
                      </div>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 text-[10px] font-black tracking-widest hover:border-white transition-all uppercase">AI 맞춤 추천 더보기</button>
            </div>

            <div className="bg-[#111] border border-white/10 p-6">
               <h4 className="text-[11px] font-black tracking-widest text-white uppercase mb-4">현재 인기 프로젝트</h4>
               <div className="space-y-4">
                 {[1, 2].map(i => (
                   <div key={i} className="border-l-2 border-white/10 pl-4 py-1 hover:border-white transition-all cursor-pointer">
                      <div className="text-[10px] text-white/30 tracking-widest uppercase font-bold mb-1">SNU Hackers</div>
                      <div className="text-xs font-bold leading-tight uppercase">2024 글로벌 보안 해커톤</div>
                      <div className="mt-2 text-[9px] font-mono text-white/60">달성률 72%</div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="text-[9px] text-white/20 tracking-widest uppercase font-bold leading-relaxed px-2">
              엔젤캠퍼스 서비스 정보 • 개인정보처리방침 • 약관 • 더 보기 • Angel Campus © 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
