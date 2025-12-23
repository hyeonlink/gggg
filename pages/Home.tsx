
import React from 'react';
import { MOCK_FEED_POSTS, MOCK_CLUBS } from '../constants.tsx';
import { FeedPost } from '../types.ts';

interface HomeProps {
  onSelectClub: (id: string) => void;
  onLikePost: (id: string) => void;
  likedPostIds: Set<string>;
  customPosts?: FeedPost[];
}

const Home: React.FC<HomeProps> = ({ onSelectClub, onLikePost, likedPostIds, customPosts }) => {
  const displayPosts = customPosts || MOCK_FEED_POSTS;

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            {/* User Profile Card */}
            <div className="bg-[#111] border border-white/10 overflow-hidden rounded-sm shadow-xl">
               <div className="h-20 bg-gradient-to-r from-blue-900 to-blue-600"></div>
               <div className="p-6 -mt-12 text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-[#111] bg-neutral-800 mx-auto overflow-hidden mb-4 shadow-xl">
                    <img src="https://picsum.photos/seed/me/100/100" className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <h3 className="font-black tracking-tighter text-xl uppercase truncate px-2">게스트 유저</h3>
                  <p className="text-[10px] text-blue-400 tracking-widest font-bold uppercase mt-1">Club Member</p>
               </div>
               <div className="border-t border-white/5 p-4 space-y-3">
                  <div className="flex justify-between text-[11px] font-bold tracking-widest text-white/40">
                    <span>팔로잉 동아리</span>
                    <span className="text-white">4</span>
                  </div>
               </div>
            </div>

            {/* Weekly Popular Clubs */}
            <div className="bg-[#111] border border-white/10 p-6 rounded-sm shadow-xl">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-3 bg-blue-600"></div>
                  <h4 className="text-[11px] font-black tracking-widest text-white uppercase">주간 인기 동아리</h4>
               </div>
               <div className="space-y-6">
                 {MOCK_CLUBS.slice(0, 3).map(club => (
                   <div key={club.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => onSelectClub(club.id)}>
                      <div className="w-10 h-10 bg-neutral-800 border border-white/10 shrink-0 overflow-hidden">
                        <img src={club.logo} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt={club.name} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-black truncate group-hover:text-blue-400 transition-colors uppercase">{club.name}</div>
                        <div className="text-[9px] text-white/20 font-bold tracking-widest uppercase">{club.university}</div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Recommended Clubs */}
            <div className="bg-[#111] border border-white/10 p-6 rounded-sm shadow-xl">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-3 bg-blue-400/50"></div>
                  <h4 className="text-[11px] font-black tracking-widest text-white/60 uppercase">추천 동아리</h4>
               </div>
               <div className="space-y-6">
                 {[...MOCK_CLUBS].reverse().slice(0, 2).map(club => (
                   <div key={club.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => onSelectClub(club.id)}>
                      <div className="w-10 h-10 bg-neutral-800 border border-white/10 shrink-0 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                        <img src={club.logo} className="w-full h-full object-cover group-hover:scale-110 transition-all" alt={club.name} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-black truncate group-hover:text-blue-400 transition-colors uppercase text-white/80">{club.name}</div>
                        <div className="text-[8px] text-white/20 font-bold tracking-widest uppercase">{club.category}</div>
                      </div>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-6 py-2 border border-white/5 text-[9px] font-black tracking-widest uppercase text-white/30 hover:text-white hover:border-white/20 transition-all">
                 더 보기
               </button>
            </div>
          </div>

          {/* Main Feed (9 cols) */}
          <div className="col-span-1 lg:col-span-9 space-y-6 min-w-0">
            {/* Further reduced width from max-w-2xl to max-w-xl for a more compact look */}
            <div className="max-w-xl lg:mx-0 space-y-5">
              {displayPosts.map((post) => {
                const isLiked = likedPostIds.has(post.id);
                return (
                  <div key={post.id} className="bg-[#111] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl transition-all hover:border-white/20">
                    <div className="p-3 md:p-4 flex justify-between items-start">
                      <div className="flex gap-3 cursor-pointer group min-w-0 flex-grow" onClick={() => onSelectClub(post.clubId)}>
                         <div className="w-10 h-10 bg-neutral-800 border border-white/10 shrink-0">
                            <img src={post.clubLogo} alt={post.clubName} className="w-full h-full object-cover" />
                         </div>
                         <div className="min-w-0 flex-grow">
                            <h4 className="font-black tracking-tighter text-sm uppercase leading-tight group-hover:text-blue-400 transition-colors truncate">{post.clubName}</h4>
                            <div className="text-[8px] md:text-[9px] text-white/40 font-bold tracking-widest uppercase mt-0.5 truncate">
                              {post.university} • {post.createdAt}
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="px-3 md:px-4 pb-3 md:pb-4">
                      <p className="text-white/80 font-light leading-relaxed break-words whitespace-pre-wrap text-xs">{post.content}</p>
                    </div>

                    {post.image && (
                      <div className="w-full bg-neutral-900 border-y border-white/5 overflow-hidden flex items-center justify-center min-h-[120px] md:min-h-[180px]">
                         <img src={post.image} className="w-full h-auto max-h-[300px] object-contain" alt="Post context" />
                      </div>
                    )}

                    <div className="px-3 md:px-4 py-2 flex justify-between items-center text-[8px] text-white/30 font-bold tracking-widest uppercase border-b border-white/5">
                       <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <i className={`fa-solid fa-heart ${isLiked ? 'text-red-500' : 'text-red-500/20'} transition-colors`}></i> 
                            {post.likes}
                          </span>
                       </div>
                       <span className="hidden xs:inline italic tracking-tighter uppercase">Live Feed</span>
                    </div>

                    <div className="grid grid-cols-3 bg-white/[0.01]">
                       <button 
                         onClick={() => onLikePost(post.id)}
                         className={`flex items-center justify-center gap-2 py-2.5 hover:bg-white/5 text-[9px] font-black tracking-widest transition-all uppercase border-r border-white/5 ${isLiked ? 'text-blue-500' : 'text-white/40'}`}
                       >
                          <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-thumbs-up`}></i>
                          <span className="hidden sm:inline">좋아요</span>
                       </button>
                       <button className="flex items-center justify-center gap-2 py-2.5 hover:bg-white/5 text-[9px] font-black tracking-widest text-white/40 hover:text-white transition-all uppercase border-r border-white/5">
                          <i className="fa-solid fa-share-nodes"></i>
                          <span className="hidden sm:inline">공유</span>
                       </button>
                       <button 
                         onClick={() => onSelectClub(post.clubId)}
                         className="flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-[9px] font-black tracking-widest uppercase hover:bg-blue-500 transition-all"
                       >
                          <i className="fa-solid fa-calendar-check"></i>
                          <span className="hidden sm:inline">일정</span>
                       </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
