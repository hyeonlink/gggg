
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
  
  // 일정 통합 등록용 스테이트
  const [isEvent, setIsEvent] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const universityNames: Record<string, string> = {
    'SNU': '서울대학교',
    'YONSEI': '연세대학교',
    'KOREA': '고려대학교',
    'OTHER': '기타'
  };

  const clubSpecificPosts = allPosts
    .filter(p => p.clubId === club.id)
    .sort((a, b) => b.id.localeCompare(a.id));

  // 활동 보고서 데이터 추출 (프로젝트 내 리포트 합산)
  const clubReports = club.projects?.flatMap(p => p.reports.map(r => ({ ...r, projectTitle: p.title }))) || [];

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
        type: isEvent ? 'REPORT' : 'UPDATE' 
      });
      
      setNewPostContent('');
      setNewPostImage('');
      setIsEvent(false);
      setEventDate('');
      setEventTitle('');
      setShowEditor(false);
    } finally {
      setIsPosting(false);
    }
  };

  const calculateDDay = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    if (days === 0) return 'D-Day';
    return days > 0 ? `D-${days}` : `종료`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* 커버 이미지 영역 */}
      <div className="h-[25vh] md:h-[35vh] w-full overflow-hidden relative">
        <img src={club.coverImage} className="w-full h-full object-cover opacity-30" alt="cover" />
        {/* 그라데이션 제거: bg-gradient-to-t from-[#050505] via-transparent to-transparent -> bg-black/40 */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-10 pb-40">
        
        {/* [동아리 관리자 칸] */}
        <div className="mb-6 flex justify-end">
           <div className="bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-3 rounded-sm backdrop-blur-sm">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[8px]">
                <i className="fa-solid fa-user-tie"></i>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-white/50">Admin:</span>
              <span className="text-[10px] font-bold text-white uppercase">{club.adminRole || 'President'} Verified</span>
           </div>
        </div>

        {/* 프로필 요약 헤더 */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-sm p-6 md:p-10 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-sm border border-white/10 bg-neutral-900 overflow-hidden shrink-0">
              <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap justify-between items-start gap-6">
                <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">{club.name}</h1>
                  <p className="text-base md:text-lg text-white/50 font-light mb-6 leading-tight">{club.description}</p>
                  <div className="flex gap-6 text-[10px] font-black text-white/30 uppercase tracking-widest">
                    <span>{universityNames[club.university]}</span>
                    <span><i className="fa-solid fa-circle-check text-blue-500 mr-1"></i> 인증 파트너</span>
                    <span>멤버 {club.memberCount}명</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-blue-600 px-8 py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20">팔로우</button>
                  <button className="border border-white/10 px-8 py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-white/5 transition-all">메시지</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 메인 콘텐츠 영역 (스토리, 피드) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. 동아리 소개 */}
            <div className="bg-[#0f0f0f] border border-white/10 p-10 rounded-sm shadow-xl relative overflow-hidden">
              <h2 className="text-xl font-black tracking-widest uppercase mb-8 pb-4 border-b border-white/10 text-blue-500">Brand Story</h2>
              <p className="text-white/80 leading-relaxed font-light text-base md:text-lg whitespace-pre-wrap mb-10">
                {club.longDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {club.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black border border-white/5 px-4 py-2 uppercase text-white/30 bg-white/[0.01] tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. 활동 피드 */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-xl">
              <div className="p-10 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-black tracking-widest uppercase text-blue-500">Live Feed</h2>
                <button 
                  onClick={() => setShowEditor(!showEditor)}
                  className="bg-white/5 border border-white/10 text-white/50 px-6 py-2 text-[10px] font-black tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all"
                >
                  {showEditor ? '작성 취소' : '새 소식 전하기'}
                </button>
              </div>

              {showEditor && (
                <div className="p-10 bg-white/[0.02] border-b border-white/5 animate-in slide-in-from-top-4 duration-300">
                  <form onSubmit={handlePostSubmit} className="space-y-6">
                    <textarea 
                      className="w-full bg-black border border-white/10 p-6 text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-light leading-relaxed rounded-sm"
                      placeholder="무슨 일이 일어나고 있나요? 후원자들에게 공유해보세요."
                      rows={4}
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                    />
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <input 
                        className="flex-grow bg-black border border-white/10 p-4 text-[11px] text-white focus:border-blue-500 rounded-sm font-mono"
                        placeholder="이미지 URL (선택 사항)"
                        value={newPostImage}
                        onChange={e => setNewPostImage(e.target.value)}
                      />
                    </div>

                    {/* 일정 등록 체크박스 */}
                    <div className="p-4 border border-white/5 bg-black/40 rounded-sm">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={isEvent}
                          onChange={e => setIsEvent(e.target.checked)}
                          className="w-4 h-4 bg-black border-white/20 text-blue-600 rounded-sm focus:ring-0 focus:ring-offset-0" 
                        />
                        <span className="text-[10px] font-black tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors">
                          <i className="fa-solid fa-calendar-day mr-2"></i> 이 소식을 일정으로 등록하기
                        </span>
                      </label>
                      
                      {isEvent && (
                        <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">일정명</label>
                            <input 
                              value={eventTitle}
                              onChange={e => setEventTitle(e.target.value)}
                              placeholder="예: 정기 발표회" 
                              className="w-full bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-blue-500" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">날짜</label>
                            <input 
                              type="date"
                              value={eventDate}
                              onChange={e => setEventDate(e.target.value)}
                              className="w-full bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-blue-500" 
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button 
                        disabled={isPosting || !newPostContent.trim() || (isEvent && (!eventDate || !eventTitle))}
                        className="bg-blue-600 px-12 py-4 text-[10px] font-black tracking-widest uppercase hover:bg-blue-500 disabled:opacity-20 transition-all rounded-sm shadow-xl"
                      >
                        {isPosting ? 'Publishing...' : 'Publish'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="p-10 space-y-10">
                {clubSpecificPosts.length > 0 ? clubSpecificPosts.map((post) => (
                  <div key={post.id} className="bg-black/40 border border-white/5 p-6 flex flex-col group hover:border-white/20 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-neutral-900 border border-white/5 shrink-0 overflow-hidden">
                           <img src={post.clubLogo} className="w-full h-full object-cover" alt="logo" />
                        </div>
                        <div>
                          <div className="text-[13px] font-black tracking-tight">{post.clubName}</div>
                          <div className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-1">
                            {post.createdAt}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[14px] text-white/70 font-light leading-relaxed mb-6">{post.content}</p>
                    {post.image && (
                      <div className="w-full aspect-[16/9] bg-neutral-900 mb-6 overflow-hidden border border-white/5">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" alt="post" />
                      </div>
                    )}
                    <div className="pt-6 border-t border-white/5 flex gap-10 text-white/20">
                       <button className="hover:text-blue-500 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"><i className="fa-regular fa-thumbs-up"></i> Like</button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center text-white/10 italic text-[10px] uppercase tracking-widest border border-dashed border-white/5">
                    No Feed Updates Yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 우측 사이드바 */}
          <div className="lg:col-span-4 space-y-6 sticky top-32">
             
             {/* 1. 동아리 기본 정보 */}
             <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-sm shadow-xl">
                <h3 className="text-[11px] font-black tracking-widest uppercase mb-8 text-blue-500">Club Metadata</h3>
                <div className="space-y-5">
                   <div className="flex justify-between items-center text-[11px] pb-3 border-b border-white/5">
                      <span className="text-white/20 uppercase font-black tracking-widest">Location</span>
                      <span className="font-light">{club.location}</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] pb-3 border-b border-white/5">
                      <span className="text-white/20 uppercase font-black tracking-widest">Founded</span>
                      <span className="font-light">2014년</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px]">
                      <span className="text-white/20 uppercase font-black tracking-widest">Social</span>
                      <div className="flex gap-3 text-white/40">
                        <i className="fa-brands fa-instagram hover:text-white transition-colors cursor-pointer"></i>
                        <i className="fa-solid fa-link hover:text-white transition-colors cursor-pointer"></i>
                      </div>
                   </div>
                </div>
             </div>

             {/* 2. 진행중인 펀딩 */}
             <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-sm shadow-xl">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-[11px] font-black tracking-widest uppercase text-blue-500">Current Funding</h3>
                   <span className="text-[9px] font-black bg-blue-600 px-2 py-0.5 uppercase tracking-tighter">Live</span>
                </div>
                {club.projects && club.projects.length > 0 ? club.projects.map(proj => {
                   const progressPercent = Math.min(Math.round((proj.currentAmount / proj.goalAmount) * 100), 100);
                   return (
                     <div key={proj.id} className="space-y-6">
                        <div>
                           <h4 className="text-sm font-black tracking-tight mb-2 truncate">{proj.title}</h4>
                           <div className="flex justify-between items-end mb-2">
                             <span className="text-[16px] font-black italic text-white">{progressPercent}%</span>
                             <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Progress</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-1000" 
                                style={{ width: `${progressPercent}%` }}
                              ></div>
                           </div>
                           <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest">
                              <div>
                                 <div className="text-white/20 mb-1">Current</div>
                                 <div className="text-blue-400 font-mono">₩{proj.currentAmount.toLocaleString()}</div>
                              </div>
                              <div className="text-right">
                                 <div className="text-white/20 mb-1">Goal</div>
                                 <div className="font-mono">₩{proj.goalAmount.toLocaleString()}</div>
                              </div>
                           </div>
                        </div>
                        <button className="w-full bg-white text-black py-4 text-[10px] font-black tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                           Support
                        </button>
                     </div>
                   );
                }) : (
                  <div className="text-center py-6 text-white/20 italic text-[10px] uppercase tracking-widest border border-dashed border-white/5">
                    No active funding.
                  </div>
                )}
             </div>

             {/* 3. 미니 타임라인 */}
             <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-sm shadow-xl">
                <h3 className="text-[11px] font-black tracking-widest uppercase mb-6 text-blue-500">Upcoming</h3>
                <div className="space-y-4">
                   {club.schedules && club.schedules.length > 0 ? club.schedules.slice(0, 3).map(item => (
                     <div key={item.id} className="flex gap-4 items-center group">
                        <div className="text-lg font-black italic text-blue-500/60 min-w-[40px] group-hover:text-blue-500 transition-colors">
                           {calculateDDay(item.date)}
                        </div>
                        <div className="min-w-0">
                           <div className="text-[11px] font-bold truncate uppercase">{item.title}</div>
                           <div className="text-[9px] text-white/20 font-black tracking-tighter uppercase">{item.date}</div>
                        </div>
                     </div>
                   )) : (
                    <div className="text-center py-4 text-white/10 italic text-[9px] uppercase tracking-widest">
                       No Events.
                    </div>
                   )}
                </div>
             </div>

             {/* 4. 활동 보고서 (신규 추가) */}
             <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-sm shadow-xl">
                <h3 className="text-[11px] font-black tracking-widest uppercase mb-6 text-blue-500">활동 보고서</h3>
                <div className="space-y-3">
                   {clubReports.length > 0 ? clubReports.slice(0, 4).map((report, idx) => (
                     <div key={idx} className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer">
                        <div className="text-blue-500/40 group-hover:text-blue-500 transition-colors">
                           <i className="fa-solid fa-file-invoice"></i>
                        </div>
                        <div className="min-w-0 flex-grow">
                           <div className="text-[10px] font-bold text-white/70 truncate uppercase tracking-tight">{report.projectTitle || '활동 내역'}</div>
                           <div className="text-[8px] text-white/20 font-black uppercase">{report.date} ARCHIVED</div>
                        </div>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[8px] text-white/10 group-hover:text-white"></i>
                     </div>
                   )) : (
                    <div className="text-center py-6 border border-dashed border-white/5">
                       <p className="text-[9px] text-white/20 uppercase font-black tracking-widest">No Formal Reports</p>
                       <p className="text-[8px] text-white/10 mt-1">프로젝트 종료 후 자동 생성됩니다.</p>
                    </div>
                   )}
                </div>
             </div>

             {/* 5. 엔젤 스코어 */}
             <div className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-sm shadow-2xl relative overflow-hidden">
                <div className="text-4xl font-black italic text-blue-500 mb-1">#{club.angelScore}</div>
                <div className="text-[10px] font-black tracking-widest uppercase text-blue-400">Angel Trust Score</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
