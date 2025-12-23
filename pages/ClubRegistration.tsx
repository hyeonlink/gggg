
import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';

interface ClubRegistrationProps {
  onRegister: (clubData: any) => void;
}

const ClubRegistration: React.FC<ClubRegistrationProps> = ({ onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    university: 'SNU',
    category: 'IT/코딩',
    description: '',
    longDescription: '',
    logo: 'https://picsum.photos/seed/new-club/200/200',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop',
    location: '',
    tags: '',
    activityHistory: '',
    activityHistoryImage: '',
    adminRole: 'President',
    adminProofUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      const newClub = {
        owner_id: user.id,
        name: formData.name,
        university: formData.university,
        category: formData.category,
        description: formData.description,
        long_description: formData.longDescription,
        logo_url: formData.logo,
        cover_url: formData.coverImage,
        location: formData.location,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        verification_status: 'PENDING',
        angel_score: 100,
        total_funding: 0,
        member_count: 1
      };

      const { error } = await supabase
        .from('clubs')
        .insert([newClub]);
      
      if (error) throw error;
      
      alert('동아리 등록 신청이 완료되었습니다. 관리자 승인 후 피드에 노출됩니다.');
      onRegister(newClub);
    } catch (err: any) {
      console.error("Registration Error:", err);
      alert(err.message || "등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">JOIN THE<br/><span className="text-blue-600">CAMPUS</span></h1>
          <p className="text-white/40 tracking-[0.4em] font-light uppercase text-sm">대한민국 엘리트 동아리의 일원이 되십시오.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Section 1: Basic Info */}
          <section className="space-y-10">
            <h2 className="text-xl font-black tracking-widest uppercase border-b border-white/10 pb-4 flex items-center gap-4">
              <span className="text-blue-600">01</span> 기본 동아리 정보
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest uppercase text-white/40">동아리 명칭</label>
                <input 
                  required
                  placeholder="예: 스누 해커스"
                  className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-light"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest uppercase text-white/40">소속 대학교</label>
                <select 
                  className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-light appearance-none"
                  value={formData.university}
                  onChange={e => setFormData({...formData, university: e.target.value as any})}
                >
                  <option value="SNU">서울대학교 (SNU)</option>
                  <option value="YONSEI">연세대학교 (YONSEI)</option>
                  <option value="KOREA">고려대학교 (KOREA)</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest uppercase text-white/40">카테고리</label>
                <input 
                  required
                  placeholder="예: IT/코딩, 음악, 스포츠"
                  className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-light"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest uppercase text-white/40">태그 (쉼표로 구분)</label>
                <input 
                  placeholder="예: 보안, 해킹, 개발"
                  className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-light"
                  value={formData.tags}
                  onChange={e => setFormData({...formData, tags: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Storytelling */}
          <section className="space-y-10">
            <h2 className="text-xl font-black tracking-widest uppercase border-b border-white/10 pb-4 flex items-center gap-4">
              <span className="text-blue-600">02</span> 동아리 스토리텔링
            </h2>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest uppercase text-white/40">핵심 슬로건 (한 줄 요약)</label>
                <input 
                  required
                  placeholder="잠재적 후원자들에게 어필할 강렬한 한 줄"
                  className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-light"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black tracking-widest uppercase text-white/40">상세 동아리 소개</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="동아리의 역사, 목표, 그리고 왜 엔젤 투자자들이 여러분을 지지해야 하는지 설명해주세요."
                  className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-light leading-relaxed"
                  value={formData.longDescription}
                  onChange={e => setFormData({...formData, longDescription: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Section 3: Visual Identity */}
          <section className="space-y-10">
            <h2 className="text-xl font-black tracking-widest uppercase border-b border-white/10 pb-4 flex items-center gap-4">
              <span className="text-blue-600">03</span> 비주얼 아이덴티티
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-widest uppercase text-white/40">동아리 로고 이미지 URL</label>
                  <input 
                    className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all text-xs font-mono"
                    value={formData.logo}
                    onChange={e => setFormData({...formData, logo: e.target.value})}
                  />
                </div>
                <div className="w-32 h-32 bg-neutral-900 border border-white/10 overflow-hidden rounded-sm">
                  <img src={formData.logo} className="w-full h-full object-cover" alt="Logo Preview" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-widest uppercase text-white/40">커버 이미지 URL</label>
                  <input 
                    className="w-full bg-neutral-900 border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all text-xs font-mono"
                    value={formData.coverImage}
                    onChange={e => setFormData({...formData, coverImage: e.target.value})}
                  />
                </div>
                <div className="w-full aspect-video bg-neutral-900 border border-white/10 overflow-hidden rounded-sm">
                  <img src={formData.coverImage} className="w-full h-full object-cover" alt="Cover Preview" />
                </div>
              </div>
            </div>
          </section>

          <div className="pt-10">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-6 text-sm font-black tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.2)] disabled:opacity-30"
            >
              {loading ? '인증 요청 중...' : '인증 요청 및 등록 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistration;
