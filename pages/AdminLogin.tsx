
import React, { useState } from 'react';
import { supabase } from '../lib/supabase.ts';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<'EMAIL' | 'PHONE'>('EMAIL');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo/Admin Bypass for 'admin/admin' as requested, otherwise use Supabase
    if (identifier === 'admin' && password === 'admin') {
      onLogin(true);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password: password,
      });

      if (error) throw error;
      if (data.user) onLogin(true);
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isOtpSent) {
      // Send OTP logic
      try {
        const { error } = await supabase.auth.signInWithOtp({
          phone: identifier,
        });
        if (error) throw error;
        setIsOtpSent(true);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      // Verify OTP logic
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          phone: identifier,
          token: otp,
          type: 'sms',
        });
        if (error) throw error;
        if (data.user) onLogin(true);
      } catch (err: any) {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md w-full bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative z-10">
        <div className="text-center mb-12">
          <div className="text-3xl font-black tracking-tighter mb-2">ANGEL <span className="text-blue-500">CAMPUS</span></div>
          <div className="text-[10px] font-bold tracking-[0.5em] text-white/30 uppercase">Secure Admin Access</div>
        </div>

        {/* Tab Switching */}
        <div className="flex border-b border-white/10 mb-8">
          <button 
            onClick={() => { setLoginMethod('EMAIL'); setError(''); }}
            className={`flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-all ${loginMethod === 'EMAIL' ? 'text-white border-b-2 border-white' : 'text-white/20 hover:text-white/40'}`}
          >
            Email Access
          </button>
          <button 
            onClick={() => { setLoginMethod('PHONE'); setError(''); }}
            className={`flex-1 py-3 text-[10px] font-black tracking-widest uppercase transition-all ${loginMethod === 'PHONE' ? 'text-white border-b-2 border-white' : 'text-white/20 hover:text-white/40'}`}
          >
            Phone Access
          </button>
        </div>

        {loginMethod === 'EMAIL' ? (
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Email Address</label>
              <input 
                type="text"
                required
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full bg-black border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-mono text-sm"
                placeholder="admin@angelcampus.co"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Password</label>
                <button type="button" className="text-[8px] text-blue-500/50 hover:text-blue-500 font-bold uppercase tracking-widest">Forgot?</button>
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-mono text-sm"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 font-black tracking-[0.3em] uppercase hover:bg-blue-600 hover:text-white transition-all shadow-xl disabled:opacity-20"
            >
              {loading ? 'Authorizing...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePhoneAuth} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Phone Number</label>
              <input 
                type="tel"
                required
                value={identifier}
                disabled={isOtpSent}
                onChange={e => setIdentifier(e.target.value)}
                className="w-full bg-black border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-mono text-sm disabled:opacity-30"
                placeholder="+82 10 1234 5678"
              />
            </div>
            {isOtpSent && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">OTP Code</label>
                <input 
                  type="text"
                  required
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 text-white focus:border-blue-500 outline-none transition-all font-mono text-sm"
                  placeholder="Enter 6-digit code"
                />
              </div>
            )}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 font-black tracking-[0.3em] uppercase hover:bg-blue-600 hover:text-white transition-all shadow-xl disabled:opacity-20"
            >
              {loading ? 'Processing...' : (isOtpSent ? 'Verify & Enter' : 'Send Authentication Code')}
            </button>
            {isOtpSent && (
              <button 
                type="button" 
                onClick={() => setIsOtpSent(false)}
                className="w-full text-[9px] text-white/20 uppercase font-black tracking-widest hover:text-white transition-colors"
              >
                Change Phone Number
              </button>
            )}
          </form>
        )}

        {error && (
          <div className="mt-6 text-red-500 text-[10px] font-bold tracking-widest uppercase text-center bg-red-500/10 p-3 border border-red-500/20">
            {error}
          </div>
        )}

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em] text-white/20"><span className="bg-[#0a0a0a] px-4">OR SOCIAL ACCESS</span></div>
        </div>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-white/10 bg-black py-4 flex items-center justify-center gap-4 hover:bg-white/5 transition-all group"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
          <span className="text-[10px] font-black tracking-widest uppercase">Sign in with Google</span>
        </button>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-white/10 uppercase tracking-widest leading-relaxed">
            Unauthorized access prohibited.<br/>System managed by Angel Campus Tech.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
