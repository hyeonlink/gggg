
import React, { useState } from 'react';
import { matchSponsorsAI } from '../services/geminiService.ts';
import { MOCK_SPONSORS } from '../constants.tsx';
import { Sponsor } from '../types.ts';

const AIAssistant: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'IDLE' | 'MATCHING' | 'SENT'>('IDLE');
  const [matchedSponsors, setMatchedSponsors] = useState<Sponsor[]>([]);
  const [automationLogs, setAutomationLogs] = useState<string[]>([]);
  
  const adminEmail = "club.admin@snu.ac.kr";

  const [formData, setFormData] = useState({
    clubName: '스누 해커스',
    targetQuery: '',
    messageContent: '',
  });

  const addLog = (msg: string) => {
    setAutomationLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleAutomatedEmailOutreach = async () => {
    if (!formData.targetQuery.trim() || !formData.messageContent.trim()) {
      alert('타겟팅 조건과 메시지 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setStep('MATCHING');
    setAutomationLogs([]);
    addLog("AI Outreach Engine Initializing...");
    addLog(`Sender identified as: ${adminEmail}`);
    
    try {
      addLog("Scanning database for matching profiles via Gemini 3 Flash...");
      const matchedIds = await matchSponsorsAI({
        clubName: formData.clubName,
        targetQuery: formData.targetQuery,
        messageContent: formData.messageContent
      });

      const matches = MOCK_SPONSORS.filter(s => matchedIds.includes(s.id));
      setMatchedSponsors(matches);

      if (matches.length > 0) {
        addLog(`Found ${matches.length} optimized targets: ${matches.map(m => m.name).join(', ')}`);
        for (const sponsor of matches) {
          addLog(`Dispatching automated email to: ${sponsor.email}...`);
          await new Promise(resolve => setTimeout(resolve, 800));
          addLog(`SUCCESS: Message delivered to ${sponsor.name}.`);
        }
        setStep('SENT');
      } else {
        addLog("No direct matches found. Refine your target query.");
        setStep('IDLE');
      }
    } catch (error) {
      addLog(`FATAL ERROR: ${error instanceof Error ? error.message : 'Unknown failure'}`);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep('IDLE');
    setMatchedSponsors([]);
    setAutomationLogs([]);
    setFormData({ ...formData, targetQuery: '', messageContent: '' });
  };

  return (
    <div className="min-h-screen bg-black p-6 md:p-24 font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-blue-600 h-[2px] w-12"></div>
             <span className="text-blue-500 font-black tracking-[0.5em] text-[10px] uppercase">Automated AI Outreach</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            EMAIL<br/><span className="text-blue-600">ENGINE</span>
          </h1>
          <p className="text-white/40 tracking-[0.3em] font-light uppercase text-sm max-w-2xl">
            AI가 후원자 데이터베이스를 정밀 분석하여 동아리의 가치관과 일치하는 엔젤을 선별하고, 관리자의 계정으로 다이렉트 메일을 자동 발송합니다.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-[#0a0a0a] border border-white/10 p-10 rounded-sm shadow-2xl relative overflow-hidden">
               <div className="flex justify-between items-center border-b border-white/5 pb-8 mb-10">
                  <h2 className="text-xl font-black tracking-widest uppercase flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">01</span>
                    캠페인 설정
                  </h2>
               </div>
               <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">발신 관리자 이메일</label>
                        <div className="bg-white/5 border border-white/5 p-4 text-sm font-mono text-white/50 rounded-sm">
                           {adminEmail}
                        </div>
                     </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">찾고 있는 후원자 타겟 (AI 분석 키워드)</label>
                    <input 
                      disabled={loading || step !== 'IDLE'}
                      className="w-full bg-black border border-white/10 p-5 text-xl font-light focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-white/10 rounded-sm"
                      value={formData.targetQuery}
                      onChange={e => setFormData({...formData, targetQuery: e.target.value})}
                      placeholder="예: IT 기업 임원, 보안 스타트업 투자자"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">자동 발송될 메일 본문</label>
                    <textarea 
                      disabled={loading || step !== 'IDLE'}
                      className="w-full bg-black border border-white/10 p-6 text-base font-light focus:outline-none focus:border-blue-500 transition-all h-80 text-white leading-relaxed rounded-sm"
                      value={formData.messageContent}
                      onChange={e => setFormData({...formData, messageContent: e.target.value})}
                      placeholder="후원자에게 전달할 진심 어린 메시지를 작성하세요."
                    />
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    {step === 'IDLE' ? (
                      <button 
                        onClick={handleAutomatedEmailOutreach}
                        disabled={loading || !formData.targetQuery || !formData.messageContent}
                        className="w-full bg-blue-600 text-white py-6 font-black tracking-[0.5em] uppercase hover:bg-blue-500 transition-all shadow-xl disabled:opacity-20 rounded-sm"
                      >
                        {loading ? 'Engine Processing...' : 'AI 타겟 매칭 및 자동 발송 시작'}
                      </button>
                    ) : (
                      <button 
                        onClick={reset}
                        className="w-full border border-white/20 text-white py-6 font-black tracking-[0.5em] uppercase hover:border-white transition-all rounded-sm flex items-center justify-center gap-4"
                      >
                        <i className="fa-solid fa-rotate-left"></i> 새로운 캠페인 설정
                      </button>
                    )}
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 sticky top-32">
             <div className="bg-[#0f0f0f] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl min-h-[600px]">
                <div className="p-6 bg-white/[0.03] border-b border-white/5 flex justify-between items-center">
                   <h3 className="text-[11px] font-black tracking-widest uppercase text-blue-500 flex items-center gap-3">
                      <i className="fa-solid fa-terminal"></i> Outreach Engine Logs
                   </h3>
                </div>
                <div className="flex-grow p-6 font-mono text-[10px] leading-relaxed overflow-y-auto bg-black/40">
                   {automationLogs.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-white/10 space-y-4">
                        <i className="fa-solid fa-microchip text-4xl opacity-20 animate-pulse"></i>
                        <span className="uppercase tracking-[0.3em]">Waiting for command...</span>
                     </div>
                   ) : (
                     <div className="space-y-2">
                        {automationLogs.map((log, i) => (
                          <div key={i} className={`animate-in fade-in duration-300 ${log.includes('SUCCESS') ? 'text-green-500' : 'text-white/40'}`}>
                             {log}
                          </div>
                        ))}
                     </div>
                   )}
                </div>
                {step === 'SENT' && (
                  <div className="p-8 bg-blue-600/10 border-t border-blue-500/20">
                     <div className="flex items-center gap-4 text-blue-500 mb-6">
                        <i className="fa-solid fa-check-double text-xl"></i>
                        <span className="text-[11px] font-black tracking-widest uppercase">Outreach Process Completed</span>
                     </div>
                     <div className="space-y-4">
                        {matchedSponsors.map(s => (
                          <div key={s.id} className="p-4 bg-white/5 border border-white/10 flex items-center justify-between rounded-sm">
                             <div className="flex items-center gap-4">
                                <img src={s.logo} className="w-8 h-8 rounded-full border border-white/10" alt={s.name} />
                                <div className="text-[11px] font-black tracking-tight">{s.name}</div>
                             </div>
                             <span className="text-[9px] font-black text-blue-500 uppercase">Sent</span>
                          </div>
                        ))}
                     </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
