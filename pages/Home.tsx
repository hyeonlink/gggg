
import React from 'react';
import { MOCK_FEED_POSTS, MOCK_CLUBS } from '../constants.tsx';

const Home: React.FC<{ onSelectClub: (id: string) => void }> = ({ onSelectClub }) => {
  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Profile Summary (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            <div className="bg-[#111] border border-white/10 overflow-hidden rounded-sm">
               <div className="h-20 bg-gradient-to-r from-neutral-800 to-neutral-900"></div>
               <div className="p-6 -mt-12 text-center">
                  <div className="w-20 h-20 rounded-sm border-2 border-[#111] bg-neutral-800 mx-auto overflow-hidden mb-4 shadow-xl">
                    <img src="https://picsum.photos/seed/me/100/100" className="w-full h-full object-cover grayscale" alt="Profile" />
                  </div>
                  <h3 className="font-black tracking-tighter text-xl uppercase truncate">김양현</h3>
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
            </div>

            <div className="bg-[#111] border border-white/10 p-6 rounded-sm">
               <h4 className="text-[11px] font-black tracking-widest text-white uppercase mb-4">Quick Links</h4>
               <ul className="space-y-4 text-xs font-bold text-white/40 tracking-widest">
                 <li className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors"><i className="fa-solid fa-users w-4"></i> 내 그룹</li>
                 <li className="flex items-center gap-3 hover:text-white cursor-pointer transition-colors"><i className="fa-solid fa-calendar-days w-4"></i> 캠퍼스 이벤트</li>
               </ul>
            </div>
          </div>

          {/* Main Content: The Feed */}
          <div className="col-span-1 lg:col-span-6 space-y-6 min-w-0">
            
            {/* Post Input Field */}
            <div className="bg-[#111] border border-white/10 p-4 flex gap-4 rounded-sm shadow-lg overflow-hidden">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 shrink-0 border border-white/5 rounded-sm overflow-hidden">
                  <img src="https://picsum.photos/seed/me/100/100" className="w-full h-full object-cover grayscale" alt="Avatar" />
               </div>
               <button className="flex-grow text-left px-4 border border-white/10 text-white/30 text-xs font-light hover:bg-white/5 transition-colors truncate">
                  업데이트를 공유하세요...
               </button>
            </div>

            {/* Posts Feed */}
            <div className="space-y-8">
              {MOCK_FEED_POSTS.map((post) => (
                <div key={post.id} className="bg-[#111] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl">
                  {/* Post Header */}
                  <div className="p-4 md:p-6 flex justify-between items-start">
                    <div className="flex gap-3 md:gap-4 cursor-pointer group min-w-0" onClick={() => onSelectClub(post.clubId)}>
                       <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-800 border border-white/10 shrink-0">
                          <img src={post.clubLogo} alt={post.clubName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                       </div>
                       <div className="min-w-0 flex-grow">
                          <h4 className="font-black tracking-tighter text-sm md:text-lg uppercase leading-tight group-hover:text-white transition-colors truncate">{post.clubName}</h4>
                          <div className="text-[9px] md:text-[10px] text-white/40 font-bold tracking-widest uppercase mt-0.5 truncate">
                            {post.university} • {post.createdAt}
                          </div>
                       </div>
                    </div>
                    <button className="text-white/20 hover:text-white transition-colors p-1 shrink-0"><i className="fa-solid fa-ellipsis"></i></button>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 md:px-6 pb-4 md:pb-6">
                    <p className="text-white/80 font-light leading-relaxed break-words whitespace-pre-wrap text-sm md:text-base">{post.content}</p>
                  </div>

                  {/* Post Image Container */}
                  {post.image && (
                    <div className="w-full bg-neutral-900 border-y border-white/5 overflow-hidden flex items-center justify-center min-h-[180px] md:min-h-[250px]">
                       <img src={post.image} className="w-full h-auto max-h-[500px] object-contain grayscale hover:grayscale-0 transition-all duration-1000" alt="Post context" />
                    </div>
                  )}

                  {/* Engagement Metrics */}
                  <div className="px-4 md:px-6 py-3 flex justify-between items-center text-[9px] md:text-[10px] text-white/30 font-bold tracking-widest uppercase border-b border-white/5">
                     <div className="flex gap-4">
                        <span className="flex items-center gap-1"><i className="fa-solid fa-heart text-white/20"></i> {post.likes}</span>
                        <span className="flex items-center gap-1"><i className="fa-solid fa-comment text-white/20"></i> {post.comments}</span>
                     </div>
                     <span className="hidden xs:inline">조회 1.2K</span>
                  </div>

                  {/* Action Buttons: Redesigned to be unbreakable on narrow screens */}
                  <div className="grid grid-cols-4 bg-white/[0.01]">
                     <button className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 hover:bg-white/5 text-[10px] md:text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase border-r border-white/5 min-w-0">
                        <i className="fa-regular fa-thumbs-up text-base"></i>
                        <span className="hidden sm:inline-block truncate">좋아요</span>
                     </button>
                     <button className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 hover:bg-white/5 text-[10px] md:text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase border-r border-white/5 min-w-0">
                        <i className="fa-regular fa-comment text-base"></i>
                        <span className="hidden sm:inline-block truncate">댓글</span>
                     </button>
                     <button className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 hover:bg-white/5 text-[10px] md:text-[11px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase border-r border-white/5 min-w-0">
                        <i className="fa-solid fa-share-nodes text-base"></i>
                        <span className="hidden sm:inline-block truncate">공유</span>
                     </button>
                     {post.projectId ? (
                       <button 
                         onClick={() => onSelectClub(post.clubId)}
                         className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-3 bg-white text-black text-[10px] md:text-[11px] font-black tracking-widest uppercase hover:bg-neutral-200 transition-all min-w-0"
                       >
                          <i className="fa-solid fa-heart text-base"></i>
                          <span className="hidden sm:inline-block truncate">후원</span>
                       </button>
                     ) : (
                       <div className="flex items-center justify-center opacity-10 py-3">
                          <i className="fa-solid fa-lock text-xs"></i>
                       </div>
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Recommendations (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            <div className="bg-[#111] border border-white/10 p-6 rounded-sm">
               <div className="flex justify-between items-center mb-6">
                 <h4 className="text-[11px] font-black tracking-widest text-white uppercase">추천 동아리</h4>
                 <button className="text-[9px] text-white/40 hover:text-white font-bold uppercase tracking-widest transition-colors">전체</button>
               </div>
               <div className="space-y-6">
                 {MOCK_CLUBS.slice(0, 3).map(club => (
                   <div key={club.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => onSelectClub(club.id)}>
                      <div className="w-10 h-10 bg-neutral-800 border border-white/10 shrink-0 overflow-hidden">
                         <img src={club.logo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={club.name} />
                      </div>
                      <div className="min-w-0">
                         <div className="text-xs font-black tracking-tight uppercase truncate">{club.name}</div>
                         <div className="text-[9px] text-white/30 tracking-widest uppercase truncate">{club.category}</div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="text-[9px] text-white/20 tracking-widest uppercase font-bold leading-relaxed px-2">
              Angel Campus © 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
