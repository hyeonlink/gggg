
import React, { useState } from 'react';
import { matchSponsorsAI } from '../services/geminiService';
import { MOCK_SPONSORS } from '../constants';
import { Sponsor } from '../types';

const AIAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'IDLE' | 'MATCHING' | 'SENT'>('IDLE');
  const [matchedSponsors, setMatchedSponsors] = useState<Sponsor[]>([]);
  
  const [formData, setFormData] = useState({
    clubName: '스누 해커스',
    projectTitle: '2024 글로벌 보안 해커톤',
    messageContent: '안녕하세요 엔젤님, 저희 스누 해커스에서 이번에 대규모 컨퍼런스를 개최하게 되었습니다. 엔젤님의 커리어와 저희의 비전이 맞닿아 있다고 생각하여 정중히 후원 제안을 드립니다.',
    goal: '10,000,000원',
    targetPlatform: 'Email' as 'Email' | 'Instagram' | 'LinkedIn'
  });

  const handleAutomatedOutreach = async () => {
    if (!formData.messageContent.trim()) {
      alert('보낼 내용을 입력해주세요.');
      return;
    }

    setLoading(true);
    setStep('MATCHING');
    
    // 1. AI Matching
    const matchedIds = await matchSponsorsAI({
      clubName: formData.clubName,
      projectTitle: formData.projectTitle,
      description: formData.messageContent
    }, MOCK_SPONSORS);

    const matches = MOCK_SPONSORS.filter(s => matchedIds.includes(s.id));
    setMatchedSponsors(matches);

    // 2. Simulated Delay for "Sending"
    setTimeout(() => {
      setStep('SENT');
      setLoading(false);
    }, 3000);
  };

  const reset = () => {
    setStep('IDLE');
    setMatchedSponsors([]);
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20">
          <h1 className="text-7xl font-black tracking-tighter uppercase mb-6 underline decoration-white/20 underline-offset-8">AI OUTREACH</h1>
          <p className="text-white/40 tracking-[0.4em] font-light uppercase text-sm">최적의 후원자 매칭 및 전송 자동화 엔진</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Input Section */}
          <div className="space-y-10 bg-neutral-900/30 p-10 border border-white/5">
            <h2 className="text-xl font-black tracking-widest uppercase border-b border-white/10 pb-4">홍보 캠페인 설정</h2>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[11px] font-black tracking-widest uppercase text-white/40 mb-3">자동 발송 플랫폼</label>
                <div className="flex gap-3">
                  {['Email', 'Instagram', 'LinkedIn'].map(p => (
                    <button 
                      key={p}
                      onClick={() => setFormData({...formData, targetPlatform: p as any})}
                      className={`flex-grow py-4 text-[10px] font-black tracking-widest border transition-all uppercase ${
                        formData.targetPlatform === p ? 'bg-white text-black border-white shadow-xl' : 'border-white/10 text-white/40 hover:border-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black tracking-widest uppercase text-white/40 mb-3">프로젝트 제목</label>
                <input 
                  className="w-full bg-neutral-900 border border-white/10 p-5 text-lg font-light focus:outline-none focus:border-white transition-all text-white"
                  value={formData.projectTitle}
                  onChange={e => setFormData({...formData, projectTitle: e.target.value})}
                  placeholder="프로젝트 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black tracking-widest uppercase text-white/40 mb-3">후원 요청 메시지 (직접 작성)</label>
                <textarea 
                  className="w-full bg-neutral-900 border border-white/10 p-5 text-base font-light focus:outline-none focus:border-white transition-all h-64 text-white leading-relaxed"
                  value={formData.messageContent}
                  onChange={e => setFormData({...formData, messageContent: e.target.value})}
                  placeholder="엔젤에게 보낼 진심 어린 메시지를 입력하세요. AI가 이 내용을 분석하여 가장 관심이 있을만한 후원자들을 찾아 자동으로 전송합니다."
                />
              </div>

              <div className="p-6 border border-dashed border-white/10 bg-white/[0.02]">
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest italic">
                  * [AI 기술 활용] 버튼 클릭 시, AI가 현재 등록된 수만 명의 잠재적 엔젤 중 귀하의 프로젝트와 가장 유사한 관심사를 가진 1~3명을 즉시 매칭하여 선택하신 플랫폼으로 자동 발송을 예약합니다.
                </p>
              </div>

              {step === 'IDLE' ? (
                <button 
                  onClick={handleAutomatedOutreach}
                  disabled={loading}
                  className="w-full bg-white text-black py-6 font-black tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)]"
                >
                  AI 타겟 매칭 및 자동 발송
                </button>
              ) : (
                <button 
                  onClick={reset}
                  className="w-full border border-white/20 text-white py-6 font-black tracking-[0.5em] uppercase hover:border-white transition-all"
                >
                  새 캠페인 만들기
                </button>
              )}
            </div>
          </div>

          {/* AI Result & Status Section */}
          <div className="flex flex-col h-full sticky top-32">
            <h2 className="text-xl font-black tracking-widest uppercase border-b border-white/10 pb-4 mb-10">자동화 처리 현황</h2>
            <div className="flex-grow bg-[#0a0a0a] border border-white/5 p-10 relative min-h-[500px] flex flex-col">
              
              {step === 'IDLE' && (
                <div className="flex-grow flex flex-col items-center justify-center text-white/20 space-y-6 text-center">
                  <i className="fa-solid fa-satellite-dish text-6xl opacity-10 animate-pulse"></i>
                  <div className="space-y-2">
                    <div className="tracking-[0.3em] uppercase text-xs font-black italic">캠페인 시작 대기 중</div>
                    <p className="text-[10px] lowercase max-w-xs leading-relaxed opacity-50">
                      내용을 작성하고 발송 버튼을 누르면 AI 엔진이 가동됩니다.
                    </p>
                  </div>
                </div>
              )}

              {step === 'MATCHING' && (
                <div className="space-y-12">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div>
                      <span className="text-xs font-black tracking-widest uppercase animate-pulse">AI 엔진이 최적의 엔젤을 필터링 중입니다...</span>
                   </div>
                   <div className="space-y-6">
                      <div className="h-1 w-full bg-white/5 relative">
                         <div className="absolute top-0 left-0 h-full bg-white w-2/3 animate-[shimmer_2s_infinite]"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-20 bg-white/5 border border-white/5 animate-pulse"></div>
                         <div className="h-20 bg-white/5 border border-white/5 animate-pulse"></div>
                      </div>
                   </div>
                </div>
              )}

              {step === 'SENT' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                   <div className="flex items-center gap-4 text-green-500">
                      <i className="fa-solid fa-circle-check text-2xl"></i>
                      <span className="text-xs font-black tracking-widest uppercase">캠페인 자동 발송이 완료되었습니다</span>
                   </div>

                   <div className="space-y-6">
                      <h3 className="text-[10px] font-black tracking-widest text-white/40 uppercase">매칭된 타겟 리스트 ({matchedSponsors.length}명)</h3>
                      <div className="space-y-4">
                        {matchedSponsors.map((sponsor) => (
                          <div key={sponsor.id} className="p-6 bg-white/[0.03] border border-white/10 flex items-center justify-between group hover:border-white/30 transition-all">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-neutral-800 border border-white/5 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                   <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                   <div className="text-sm font-black tracking-tight">{sponsor.name}</div>
                                   <div className="text-[9px] text-white/30 tracking-widest uppercase mt-1">
                                      {sponsor.interest.slice(0, 2).join(' #')}
                                   </div>
                                </div>
                             </div>
                             <div className="flex flex-col items-end gap-2">
                                <span className="text-[8px] font-black bg-white/10 text-white/60 px-2 py-0.5 tracking-tighter uppercase">
                                   {formData.targetPlatform} SENT
                                </span>
                                <div className="text-[10px] text-green-500/80 font-mono">100% Match</div>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div className="p-8 bg-green-500/5 border border-green-500/10 rounded-sm">
                      <h4 className="text-[11px] font-black tracking-widest uppercase mb-4 text-green-500/60">다음 단계 안내</h4>
                      <p className="text-xs text-white/50 leading-relaxed font-light">
                        매칭된 엔젤들이 메시지를 확인하면 알림이 전송됩니다. 
                        엔젤들의 활동 시간대를 분석하여 가장 가독성이 높은 시점에 발송되었습니다. 
                        평균 응답 대기 시간: 24시간 이내
                      </p>
                   </div>
                </div>
              )}
            </div>
            
            {/* Guide box */}
            <div className="mt-10 p-8 border border-white/5 bg-white/[0.01]">
               <h3 className="text-sm font-black tracking-widest uppercase mb-4 text-white/60">OUTREACH GUIDE</h3>
               <ul className="text-xs text-white/40 space-y-2 font-light leading-relaxed">
                  <li>• AI는 작성된 메시지의 톤앤매너와 핵심 키워드를 실시간으로 분석합니다.</li>
                  <li>• 관심 분야가 일치하는 후원자에게는 해당 플랫폼의 공식 계정 혹은 브랜드 담당자 명의로 자동 발송됩니다.</li>
                  <li>• 과도한 발송 시 스팸으로 분류될 수 있으니 프로젝트당 1회의 타겟팅을 권장합니다.</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
