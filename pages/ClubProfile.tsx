
// @ts-nocheck
import React, { useState } from 'react';
import { Club, FeedPost } from '../types';

interface ClubProfileProps {
  club: Club;
  onAddPost: (post: Omit<FeedPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  allPosts: FeedPost[];
}

const ClubProfile: React.FC<ClubProfileProps> = ({ club, onAddPost, allPosts }) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const universityNames: Record<string, string> = {
    'SNU': '서울대학교',
    'YONSEI': '연세대학교',
    'KOREA': '고려대학교',
    'OTHER': '기타'
  };

  // 현재 동아리의 게시글만 필터링하여 최신순 정렬
  const clubSpecificPosts = allPosts
    .filter(p => p.clubId === club.id)
    .sort((a, b) => b.id.localeCompare(a.id));

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    setIsPosting(true);
    try {
      await onAddPost({
        clubId: club.id,
        clubName: club.name,
        clubLogo: club.logo,
        university: universityNames[club.university] || '기타',
        content: newPostContent,
        image: newPostImage || undefined,
        type: 'UPDATE'
      });
      setNewPostContent('');
      setNewPostImage('');
      setShowEditor(false);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* 커버 이미지 영역 */}
      <div className="h-[30vh] md:h-[40vh] w-full overflow-hidden relative">
        <img src={club.coverImage} className="w-full h-full object-cover opacity-40" alt="cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-20 relative z-10 pb-40">
        
        {/* 프로필 요약 헤더 */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-sm p-6 md:p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-sm border-2 border-white/10 bg-neutral-900 overflow-hidden shrink-0">
              <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-black tracking-tight mb-1 uppercase">{club.name}</h1>
                  <p className="text-base md:text-lg text-white/50 font-light mb-4">{club.description}</p>
                  <div className="flex gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                    <span>{universityNames[club.university]}</span>
                    <span>인증 파트너</span>
                    <span>멤버 {club.memberCount}명</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-600 px-6 py-2 text-[11px] font-black tracking-widest uppercase hover:bg-blue-500 transition-all">팔로우</button>
                  <button className="border border-white/20 px-6 py-2 text-[11px] font-black tracking-widest uppercase hover:border-white transition-all">메시지</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. 동아리 소개 (최상단) */}
            <div className="bg-[#0f0f0f] border border-white/10 p-6 md:p-10 rounded-sm shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                <i className="fa-solid fa-quote-right text-9xl"></i>
              </div>
              <h2 className="text-xl font-black tracking-widest uppercase mb-8 pb-4 border-b border-white/10 text-blue-500 flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                동아리 브랜드 스토리
              </h2>
              <p className="text-white/80 leading-relaxed font-light text-base md:text-lg whitespace-pre-wrap mb-10">
                {club.longDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {club.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black border border-white/10 px-4 py-2 uppercase text-white/40 bg-white/[0.02] tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. 활동(Activity) 피드 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-lg">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-black tracking-tight mb-1 uppercase">활동 피드</h2>
                  <div className="text-[10px] font-bold text-blue-500 tracking-widest uppercase flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    실시간 캠퍼스 업데이트
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditor(!showEditor)}
                  className="flex items-center gap-2 border border-blue-600 text-blue-500 px-6 py-2 rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-blue-600/10 transition-all"
                >
                  {showEditor ? '작성 취소' : '새 소식 전하기'}
                </button>
              </div>

              {showEditor && (
                <div className="p-6 bg-white/[0.02] border-b border-white/5 animate-in slide-in-from-top-2 duration-300">
                  <form onSubmit={handlePostSubmit} className="space-y-4">
                    <textarea 
                      className="w-full bg-black border border-white/10 p-5 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-light leading-relaxed rounded-sm"
                      placeholder="무슨 일이 일어나고 있나요? 후원자들에게 공유해보세요."
                      rows={3}
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                    />
                    <div className="flex flex-col md:flex-row gap-4">
                      <input 
                        className="flex-grow bg-black border border-white/10 p-3 px-4 text-[10px] text-white focus:outline-none focus:border-blue-500 rounded-sm font-mono"
                        placeholder="이미지 URL (선택 사항)"
                        value={newPostImage}
                        onChange={e => setNewPostImage(e.target.value)}
                      />
                      <button 
                        disabled={isPosting || !newPostContent.trim()}
                        className="bg-blue-600 px-10 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-blue-500 disabled:opacity-20 transition-all rounded-sm shadow-xl shadow-blue-900/20"
                      >
                        {isPosting ? '발행 중' : '발행'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {clubSpecificPosts.length > 0 ? clubSpecificPosts.map((post) => (
                  <div key={post.id} className="bg-black border border-white/5 rounded-sm p-5 flex flex-col hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-neutral-800 border border-white/5 shrink-0 overflow-hidden">
                           <img src={post.clubLogo} className="w-full h-full object-cover" alt="logo" />
                        </div>
                        <div>
                          <div className="text-[12px] font-black tracking-tight">{post.clubName}</div>
                          <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest flex items-center gap-1">
                            {post.createdAt} • <i className="fa-solid fa-earth-americas text-[8px]"></i>
                          </div>
                        </div>
                      </div>
                      <button className="text-white/20 hover:text-white"><i className="fa-solid fa-ellipsis text-xs"></i></button>
                    </div>
                    <p className="text-[13px] text-white/70 font-light leading-relaxed mb-5 line-clamp-4">{post.content}</p>
                    {post.image && (
                      <div className="w-full aspect-video bg-neutral-900 mb-5 overflow-hidden border border-white/5">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="post" />
                      </div>
                    )}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center text-white/20">
                       <div className="flex gap-6">
                         <button className="hover:text-blue-500 transition-all flex items-center gap-2"><i className="fa-regular fa-thumbs-up text-xs"></i> <span className="text-[9px] font-bold">좋아요</span></button>
                         <button className="hover:text-blue-500 transition-all flex items-center gap-2"><i className="fa-regular fa-comment text-xs"></i> <span className="text-[9px] font-bold">댓글</span></button>
                       </div>
                       <button className="hover:text-blue-500 transition-all"><i className="fa-solid fa-paper-plane text-xs"></i></button>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center text-white/10 italic text-xs uppercase tracking-widest border border-dashed border-white/5">
                    업로드된 소식이 없습니다.
                  </div>
                )}
              </div>
            </div>

            {/* 3. 펀딩 섹션 (UI 안정화 버전) */}
            <div className="bg-[#0f0f0f] border border-white/10 p-6 md:p-10 rounded-sm">
              <h2 className="text-xl font-black tracking-widest uppercase mb-10 pb-4 border-b border-white/10 text-blue-500">진행 중인 펀딩</h2>
              {club.projects.length > 0 ? club.projects.map(proj => {
                const progressPercent = Math.min(Math.round((proj.currentAmount / proj.goalAmount) * 100), 100);
                return (
                  <div key={proj.id} className="flex flex-col md:flex-row gap-8 items-stretch mb-10 last:mb-0">
                    {/* 이미지 영역 */}
                    <div className="w-full md:w-[40%] aspect-video bg-neutral-900 border border-white/5 overflow-hidden rounded-sm shrink-0">
                      <img src={proj.imageUrl} className="w-full h-full object-cover" alt="project" />
                    </div>
                    
                    {/* 텍스트 및 상세 영역 */}
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div>
                        <div className="text-[10px] font-black tracking-widest text-blue-500 uppercase mb-3">Active Project</div>
                        <h3 className="text-2xl font-black tracking-tight mb-4">{proj.title}</h3>
                        <p className="text-sm text-white/50 font-light leading-relaxed mb-6 line-clamp-3">
                          {proj.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                           <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Progress</span>
                           <span className="text-2xl font-black italic text-blue-500">{progressPercent}%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all duration-1000" 
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                           <div className="flex flex-col">
                              <span className="text-white/20 mb-1">모인 금액</span>
                              <span>₩{proj.currentAmount.toLocaleString()}</span>
                           </div>
                           <div className="flex flex-col text-right">
                              <span className="text-white/20 mb-1">목표 금액</span>
                              <span>₩{proj.goalAmount.toLocaleString()}</span>
                           </div>
                        </div>
                        <button className="w-full bg-white text-black py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-blue-600 hover:text-white transition-all">
                           지금 후원하기
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }) : (
                <div className="py-20 text-center text-white/20 italic text-xs uppercase tracking-widest border border-dashed border-white/5">
                  진행 중인 프로젝트가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
             <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-sm">
                <h3 className="text-xs font-black tracking-widest uppercase mb-6 text-white/40">동아리 정보</h3>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs">
                      <span className="text-white/20 uppercase font-bold tracking-widest">위치</span>
                      <span className="font-light">{club.location}</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="text-white/20 uppercase font-bold tracking-widest">창립연도</span>
                      <span className="font-light">2014년</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="text-white/20 uppercase font-bold tracking-widest">누적 펀딩</span>
                      <span className="font-mono text-blue-400">₩{club.totalFunding.toLocaleString()}</span>
                   </div>
                </div>
             </div>

             <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-sm">
                <div className="text-4xl font-black italic text-blue-500 mb-2">#{club.angelScore}</div>
                <div className="text-[10px] font-black tracking-widest uppercase text-blue-400">Angel Score</div>
                <p className="mt-4 text-[11px] text-white/40 leading-relaxed font-light">
                   엔젤 스코어는 후원 만족도, 프로젝트 투명성, 소통 지수를 종합하여 산출된 신뢰 지표입니다.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
