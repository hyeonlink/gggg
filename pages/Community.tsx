
import React from 'react';
import { MOCK_POSTS } from '../constants';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-6 md:p-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter uppercase mb-6">COMMUNITY</h1>
          <p className="text-white/40 tracking-[0.4em] font-light uppercase text-sm">엔젤들과 동아리 브랜드의 열린 네트워킹 공간</p>
        </header>

        {/* Board Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12 border-b border-white/20 pb-8">
          <div className="flex flex-wrap gap-10 text-xs font-black tracking-widest uppercase">
            <button className="text-white border-b-2 border-white pb-2">전체 게시글</button>
            <button className="text-white/30 hover:text-white transition-colors">브랜드 뉴스</button>
            <button className="text-white/30 hover:text-white transition-colors">엔젤 전용 라운지</button>
            <button className="text-white/30 hover:text-white transition-colors">캠퍼스 랭킹</button>
          </div>
          <button className="bg-white text-black px-12 py-4 text-xs font-black tracking-[0.3em] hover:bg-neutral-200 transition-all uppercase shadow-2xl">
            글쓰기
          </button>
        </div>

        {/* List Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-white/[0.03] border-y border-white/5 text-[10px] font-black tracking-widest text-white/40 uppercase mb-4">
           <div className="col-span-1 text-center">역할</div>
           <div className="col-span-7">제목</div>
           <div className="col-span-2 text-center">작성자</div>
           <div className="col-span-1 text-center">조회</div>
           <div className="col-span-1 text-center">추천</div>
        </div>

        {/* Post List */}
        <div className="space-y-[1px] bg-white/5 border border-white/5">
          {MOCK_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 bg-black group hover:bg-white/[0.03] transition-all px-8 cursor-pointer"
            >
              <div className="col-span-1 flex justify-center">
                <span className={`text-[9px] px-2 py-0.5 border tracking-tighter font-black uppercase ${
                  post.authorRole === 'ANGEL' ? 'border-yellow-500/50 text-yellow-500' : 'border-white/30 text-white/60'
                }`}>
                  {post.authorRole === 'ANGEL' ? '엔젤' : '클럽'}
                </span>
              </div>
              <div className="col-span-7">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold tracking-tight group-hover:underline leading-none">{post.title}</span>
                  {post.comments > 0 && (
                    <span className="text-xs text-white/30 font-mono">({post.comments})</span>
                  )}
                </div>
              </div>
              <div className="col-span-2 text-center text-[11px] text-white/50 tracking-widest uppercase font-bold">
                {post.author}
              </div>
              <div className="col-span-1 text-center text-sm font-mono text-white/20">
                {post.views}
              </div>
              <div className="col-span-1 text-center text-sm font-mono text-white/20">
                {post.likes}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center gap-8 text-sm font-black tracking-widest italic">
          <button className="text-white underline underline-offset-8">01</button>
          <button className="text-white/20 hover:text-white transition-colors">02</button>
          <button className="text-white/20 hover:text-white transition-colors">03</button>
          <button className="text-white/20 hover:text-white transition-colors">...</button>
          <button className="text-white/20 hover:text-white transition-colors">15</button>
        </div>
      </div>
    </div>
  );
};

export default Community;
