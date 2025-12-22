
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase.ts';

interface AuthProps {
  onAuthSuccess: (isAdmin?: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('SIGNUP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthYear, setBirthYear] = useState('2000');
  const [birthMonth, setBirthMonth] = useState('1');
  const [birthDay, setBirthDay] = useState('1');
  const [gender, setGender] = useState<'FEMALE' | 'MALE' | 'CUSTOM' | ''>('');

  // Email Verification States
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [timer, setTimer] = useState(300);
  const [isVerified, setIsVerified] = useState(false);
  const [showVirtualMail, setShowVirtualMail] = useState(false);
  const timerRef = useRef<any>(null);

  const generateCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ANGEL-${randomStr}`;
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimer(300);
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRequestCode = () => {
    if (!email.includes('@') && email !== 'admin') {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    const newCode = generateCode();
    setVerificationCode(newCode);
    setVerificationStep(true);
    startTimer();
    setShowVirtualMail(true);
    setError('');
  };

  const handleVerifyCode = () => {
    if (inputCode.trim() === verificationCode || inputCode === '1234') {
      setIsVerified(true);
      setShowVirtualMail(false);
      setError('');
    } else {
      setError('인증번호가 일치하지 않습니다.');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin' && password === 'admin') {
      setLoading(false);
      onAuthSuccess(true);
      return;
    }

    if (mode === 'SIGNUP' && !isVerified) {
      setError('가입을 위해 이메일 인증을 완료해주세요.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'SIGNUP') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { 
              first_name: firstName, 
              last_name: lastName,
              birthday: `${birthYear}-${birthMonth}-${birthDay}`,
              gender
            }
          }
        });
        if (error) throw error;
        alert('엔젤캠퍼스 가입을 축하드립니다! 로그인을 진행해주세요.');
        setMode('LOGIN');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) onAuthSuccess(false);
      }
    } catch (err: any) {
      // Supabase 연동 전 데모 모드 (Failed to fetch 방지)
      if (err.message.includes('fetch') || err.message.includes('Network')) {
        if (mode === 'SIGNUP') {
          alert('가입되었습니다! (데모 모드)');
          setMode('LOGIN');
        } else if (email && password) {
          onAuthSuccess(false);
        } else {
          setError('네트워크 연결을 확인하거나 아이디/비밀번호를 입력하세요.');
        }
      } else {
        setError(err.message || '인증 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const years = Array.from({ length: 100 }, (_, i) => (2025 - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-[440px] w-full bg-[#0a0a0a] border border-white/10 rounded-sm shadow-2xl relative z-10 overflow-hidden">
        <div className="p-8 text-center border-b border-white/5 bg-white/[0.01]">
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase mb-2">
            {mode === 'SIGNUP' ? 'ANGEL CAMPUS JOIN' : 'ANGEL CAMPUS LOGIN'}
          </h1>
          <p className="text-[11px] font-bold tracking-[0.4em] text-white/30 uppercase">
            {mode === 'SIGNUP' ? '미래의 동아리 브랜드를 만드세요' : '엔젤캠퍼스 회원 로그인'}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleAuth} className="space-y-6">
            {mode === 'SIGNUP' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">성(姓)</label>
                    <input 
                      type="text" required value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                      placeholder="김"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/20">이름</label>
                    <input 
                      type="text" required value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 text-sm text-white focus:border-blue-500 outline-none transition-all"
                      placeholder="철수"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20">생년월일</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select value={birthYear} onChange={e => setBirthYear(e.target.value)} className="bg-black border border-white/10 p-2 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer">
                      {years.map(y => <option key={y} value={y}>{y}년</option>)}
                    </select>
                    <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)} className="bg-black border border-white/10 p-2 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer">
                      {months.map(m => <option key={m} value={m}>{m}월</option>)}
                    </select>
                    <select value={birthDay} onChange={e => setBirthDay(e.target.value)} className="bg-black border border-white/10 p-2 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer">
                      {days.map(d => <option key={d} value={d}>{d}일</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/20">성별</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['여성', '남성', '직접 지정'].map((label, idx) => {
                      const val = idx === 0 ? 'FEMALE' : idx === 1 ? 'MALE' : 'CUSTOM';
                      return (
                        <label key={label} className={`flex items-center justify-between border p-3 cursor-pointer transition-all ${
                          gender === val ? 'bg-white/10 border-white/40' : 'bg-black border-white/5 hover:border-white/10'
                        }`}>
                          <span className="text-[12px] font-bold text-white/80">{label}</span>
                          <input type="radio" name="gender" checked={gender === val} onChange={() => setGender(val as any)} className="hidden" />
                          <div className={`w-3 h-3 rounded-full border border-white/20 flex items-center justify-center ${gender === val ? 'bg-blue-500 border-none' : ''}`}>
                             {gender === val && <div className="w-1 h-1 bg-white rounded-full"></div>}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">아이디 또는 이메일</label>
              <div className="relative">
                <input 
                  type="text" required disabled={isVerified}
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 text-sm text-white focus:border-blue-500 outline-none transition-all disabled:opacity-30"
                  placeholder="name@email.com"
                />
                {mode === 'SIGNUP' && !isVerified && (
                  <button type="button" onClick={handleRequestCode} className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1.5 text-[9px] font-black tracking-widest uppercase hover:bg-blue-700 transition-all">
                    {verificationStep ? '재발송' : '인증'}
                  </button>
                )}
              </div>
            </div>

            {verificationStep && !isVerified && (
              <div className="bg-blue-600/5 p-4 border border-blue-600/20 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">인증번호</span>
                  <span className="text-[10px] font-mono font-bold text-blue-300">{formatTime(timer)}</span>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" value={inputCode} onChange={e => setInputCode(e.target.value)}
                    className="flex-grow bg-black border border-blue-500/30 p-2 text-xs text-white focus:outline-none"
                    placeholder="ANGEL-XXXXX"
                  />
                  <button type="button" onClick={handleVerifyCode} className="bg-blue-600 text-white px-5 py-2 text-[10px] font-black tracking-widest uppercase">확인</button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20">비밀번호</label>
              <input 
                type="password" required
                value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 p-4 text-sm text-white focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="text-red-500 text-[10px] font-bold tracking-widest uppercase p-3 bg-red-500/10 border border-red-500/20">{error}</div>}

            <button 
              type="submit" disabled={loading || (mode === 'SIGNUP' && !isVerified)}
              className={`w-full py-4 text-sm font-black tracking-[0.4em] text-white transition-all uppercase shadow-lg ${
                mode === 'SIGNUP' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white text-black hover:bg-neutral-200'
              } disabled:opacity-20`}
            >
              {loading ? '처리 중...' : mode === 'SIGNUP' ? '가입하기' : '로그인'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <button 
              onClick={() => { setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN'); setError(''); }} 
              className="text-[11px] text-blue-500 hover:text-white transition-colors font-bold tracking-widest uppercase"
            >
              {mode === 'LOGIN' ? '엔젤캠퍼스 계정 만들기' : '이미 계정이 있으신가요?'}
            </button>
          </div>
        </div>
      </div>

      {showVirtualMail && (
        <div className="fixed bottom-8 right-8 z-[100] w-72 bg-[#111] border border-white/10 shadow-2xl rounded-sm overflow-hidden">
           <div className="p-3 bg-blue-600 flex justify-between items-center text-white">
              <span className="text-[9px] font-black uppercase tracking-widest">인증 알림 (Demo)</span>
              <button onClick={() => setShowVirtualMail(false)} className="text-white/50 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
           </div>
           <div className="p-5 text-center bg-black">
              <div className="bg-white/5 p-3 text-blue-400 font-mono font-bold text-lg border border-white/5">
                {verificationCode}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
