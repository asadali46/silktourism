import React, { useState } from 'react';
import { X, User, ShieldCheck, Mail, Lock, LogIn, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'customer' | 'admin') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab);
    onClose();
  };

  const handleQuickLogin = (role: 'customer' | 'admin') => {
    onLogin(role);
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
            <span>Silk Tourism Portal</span>
          </div>

          <h2 className="text-2xl font-bold font-serif-heading">Sign In to Your Portal</h2>
          <p className="text-xs text-teal-100 mt-1">
            Access your bookings, itineraries, and Silk concierge services.
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab('customer')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'customer'
                  ? 'bg-white text-[#0F766E] shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Client Portal</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-amber-300 shadow-md'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={activeTab === 'customer' ? 'asad@example.com' : 'admin@silktourism.pk'}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:bg-white text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:bg-white text-slate-900 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 ${
                activeTab === 'customer'
                  ? 'bg-[#0F766E] hover:bg-teal-700 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-300'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In as {activeTab === 'customer' ? 'Client' : 'Admin'}</span>
            </button>
          </form>

          {/* Quick Demo Logins & Guest Mode */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              Fast Testing & Guest Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="py-2 px-3 bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Client Demo</span>
                <ArrowRight className="w-3 h-3 ml-auto" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Demo</span>
                <ArrowRight className="w-3 h-3 ml-auto" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center transition-colors"
            >
              Continue in Guest Mode (Explore Site)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
