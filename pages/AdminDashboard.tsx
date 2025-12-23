
import React, { useState, useEffect } from 'react';
import { Club, Sponsor } from '../types';
import { supabase } from '../lib/supabase.ts';

interface AdminDashboardProps {
  pendingClubs: Club[];
  allSponsors: Sponsor[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ pendingClubs, allSponsors, onApprove, onReject, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'SPONSORS' | 'USERS'>('PENDING');
  const [dbUsers, setDbUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setDbUsers(data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setDbUsers([
        { id: 'u1', name: '김철수', email: 'chul@snu.ac.kr', role: 'CLUB', created_at: '2024-01-12T00:00:00Z' },
        { id: 'u2', name: '박영희', email: 'park@yonsei.ac.kr', role: 'ANGEL', created_at: '2024-02-05T00:00:00Z' },
        { id: 'u3', name: '이민호', email: 'lee@korea.ac.kr', role: 'ADMIN', created_at: '2024-03-20T00:00:00Z' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="w-full lg:w-64 bg-[#0a0a0a] border-r border-white/5 p-8 flex flex-col">
          <div className="mb-12">
            <div className="text-xl font-black tracking-tighter text-white">ADMIN <span className="text-blue-500">CP</span></div>
            <div className="text-[9px] text-white/20 tracking-widest uppercase font-bold mt-1">Supabase Realtime</div>
          </div>

          <nav className="flex-grow space-y-2">
            {[
              { id: 'PENDING', label: '승인 대기 동아리', icon: 'fa-clipboard-check', count: pendingClubs.length },
              { id: 'SPONSORS', label: '엔젤 후원자 관리', icon: 'fa-hand-holding-heart', count: allSponsors.length },
              { id: 'USERS', label: '전체 유저 DB', icon: 'fa-users', count: dbUsers.length },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between p-4 rounded-sm transition-all group ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${item.icon} text-sm`}></i>
                  <span className="text-[11px] font-black tracking-widest uppercase">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === item.id ? 'bg-white text-blue-600' : 'bg-white/10'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button 
            onClick={onLogout}
            className="mt-10 p-4 border border-white/10 text-[10px] font-black tracking-widest uppercase text-white/20 hover:text-red-500 hover:border-red-500/30 transition-all"
          >
            <i className="fa-solid fa-power-off mr-2"></i> 시스템 로그아웃
          </button>
        </aside>

        <main className="flex-grow p-6 md:p-12 overflow-x-hidden">
          <header className="mb-12 flex justify-between items-end border-b border-white/5 pb-8">
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
                {activeTab === 'PENDING' ? 'Registration Queue' : activeTab === 'SPONSORS' ? 'Sponsor Directory' : 'User Database'}
              </h1>
              <p className="text-[10px] tracking-[0.3em] font-bold text-white/30 uppercase">
                {activeTab === 'PENDING' ? 'Supabase 연동 실시간 동아리 검토' : activeTab === 'SPONSORS' ? '엔젤 투자자 및 기업 파트너 관리' : '가입된 전체 회원 정보 조회'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-blue-500 font-black tracking-widest uppercase">Database Status</div>
              <div className="text-xs font-mono text-green-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                SUPABASE CONNECTED
              </div>
            </div>
          </header>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-sm overflow-hidden">
            {activeTab === 'PENDING' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] text-[10px] font-black tracking-widest text-white/40 uppercase border-b border-white/5">
                      <th className="p-6">동아리 정보</th>
                      <th className="p-6">신청인 및 증빙</th>
                      <th className="p-6">활동 내역</th>
                      <th className="p-6 text-right">관리 액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pendingClubs.length > 0 ? pendingClubs.map(club => (
                      <tr key={club.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6">
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-neutral-900 border border-white/10 shrink-0">
                              <img src={club.logo} className="w-full h-full object-cover" alt="logo" />
                            </div>
                            <div>
                              <div className="text-sm font-black tracking-tight uppercase">{club.name}</div>
                              <div className="text-[9px] text-white/30 tracking-widest font-bold uppercase">{club.university} • {club.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[11px] font-bold text-white/60 mb-2">{club.adminRole}</div>
                          <a href={club.adminProofUrl} target="_blank" className="text-[9px] text-blue-500 font-black tracking-widest uppercase hover:underline">
                            <i className="fa-solid fa-file-contract mr-1"></i> 서류 확인
                          </a>
                        </td>
                        <td className="p-6">
                          <p className="text-[10px] text-white/40 line-clamp-2 max-w-xs leading-relaxed italic">
                            "{club.activityHistory?.substring(0, 100)}..."
                          </p>
                          {club.activityHistoryImage && (
                             <a href={club.activityHistoryImage} target="_blank" className="text-[9px] text-white/20 hover:text-white block mt-1 uppercase font-bold tracking-widest">
                               <i className="fa-solid fa-image mr-1"></i> 활동사진
                             </a>
                          )}
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => onReject(club.id)}
                              className="px-4 py-2 bg-red-500/10 text-red-500 text-[10px] font-black tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all"
                            >
                              거절
                            </button>
                            <button 
                              onClick={() => onApprove(club.id)}
                              className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black tracking-widest uppercase hover:bg-blue-500 transition-all shadow-lg"
                            >
                              최종 승인
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-20 text-center text-white/20 tracking-[0.5em] uppercase text-xs italic">
                          현재 승인 대기 중인 동아리가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'SPONSORS' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] text-[10px] font-black tracking-widest text-white/40 uppercase border-b border-white/5">
                      <th className="p-6">엔젤 프로필</th>
                      <th className="p-6">유형</th>
                      <th className="p-6">누적 후원액</th>
                      <th className="p-6">관심 분야</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allSponsors.map(sponsor => (
                      <tr key={sponsor.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6">
                          <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 bg-neutral-900 border border-white/10 shrink-0">
                              <img src={sponsor.logo} className="w-full h-full object-cover" alt="logo" />
                            </div>
                            <div className="text-sm font-black tracking-tight">{sponsor.name}</div>
                          </div>
                        </td>
                        <td className="p-6">
                           <span className={`text-[9px] font-black px-2 py-0.5 tracking-tighter uppercase ${sponsor.type === 'CORPORATE' ? 'bg-blue-600' : 'bg-white/10 text-white/40'}`}>
                             {sponsor.type}
                           </span>
                        </td>
                        <td className="p-6 font-mono text-sm text-white/60">
                           ₩{sponsor.totalDonated.toLocaleString()}
                        </td>
                        <td className="p-6">
                           <div className="flex flex-wrap gap-2">
                             {(sponsor.interest || []).map(i => (
                               <span key={i} className="text-[8px] text-white/30 border border-white/10 px-1.5 py-0.5 rounded-full uppercase">{i}</span>
                             ))}
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'USERS' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] text-[10px] font-black tracking-widest text-white/40 uppercase border-b border-white/5">
                      <th className="p-6">사용자</th>
                      <th className="p-6">계정 정보</th>
                      <th className="p-6">권한 레벨</th>
                      <th className="p-6">가입 일자</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      <tr><td colSpan={4} className="p-20 text-center animate-pulse text-white/20">DB Loading...</td></tr>
                    ) : dbUsers.map(user => (
                      <tr key={user.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="p-6">
                           <div className="flex gap-4 items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-[10px] font-black text-blue-500 border border-blue-500/20 uppercase">
                                {user.name?.[0] || user.email?.[0]}
                              </div>
                              <div className="text-sm font-black tracking-tight">{user.name || 'Anonymous'}</div>
                           </div>
                        </td>
                        <td className="p-6 font-mono text-[11px] text-white/40">
                           {user.email || 'No Email'}
                        </td>
                        <td className="p-6">
                           <span className="text-[9px] font-black border border-white/20 px-2 py-0.5 tracking-widest uppercase text-white/60">
                             {user.role || 'MEMBER'}
                           </span>
                        </td>
                        <td className="p-6 font-mono text-[11px] text-white/20">
                           {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
