import React, { useState } from 'react';
import { X, User, Mail, Lock, LogIn, ArrowRight, Sparkles, Phone, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: { name: string; email: string; phone: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      name: fullName || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Traveler'),
      email: email || 'asad2406f@aptechsite.net',
      phone: phone || '03432126930',
    };
    onLogin(user);
    onClose();
  };

  const handleQuickLogin = (demoName: string, demoEmail: string, demoPhone: string) => {
    onLogin({
      name: demoName,
      email: demoEmail,
      phone: demoPhone,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 relative">
        {/* Header Bar */}
        <div className="bg-[#0F766E] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Silk Tourism Traveler Account</span>
          </div>

          <h2 className="text-2xl font-bold font-serif-heading">
            {mode === 'signin' ? 'Sign In to Your Account' : 'Create Traveler Account'}
          </h2>
          <p className="text-xs text-teal-100 mt-1">
            {mode === 'signin'
              ? 'Access your tour bookings, multi-destination route tracking, and travel tickets.'
              : 'Join Silk Tourism to book customized trips across Islamabad, Skardu, Hunza & Swat.'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                mode === 'signin'
                  ? 'bg-white text-[#0F766E] shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-white text-[#0F766E] shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required={mode === 'signup'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asad Khan"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:bg-white text-slate-900 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="asad2406f@aptechsite.net"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:bg-white text-slate-900 font-medium"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp / Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required={mode === 'signup'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0343 2126930"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:bg-white text-slate-900 font-medium"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:bg-white text-slate-900 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0F766E] hover:bg-teal-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              {mode === 'signin' ? <LogIn className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{mode === 'signin' ? 'Sign In Now' : 'Create Account'}</span>
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Quick Test Sign-In
            </p>
            <button
              type="button"
              onClick={() => handleQuickLogin('Asad Khan', 'asad2406f@aptechsite.net', '03432126930')}
              className="w-full py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Log In as Demo Traveler (Asad Khan)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center transition-colors"
            >
              Continue Browsing as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
