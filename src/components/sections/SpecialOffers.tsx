import React, { useState, useEffect } from 'react';
import { ArrowRight, Timer, Tag, ShieldCheck } from 'lucide-react';
import { PageView } from '../../types';

interface SpecialOffersProps {
  onNavigate: (view: PageView) => void;
  onOpenBooking: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onNavigate, onOpenBooking }) => {
  // Realtime Countdown Timer State (e.g. 48 hours remaining)
  const [timeLeft, setTimeLeft] = useState({
    hours: 36,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#0F766E] to-[#0B132B] text-white p-8 md:p-12 shadow-2xl border border-slate-800">
          
          {/* Background Decorative Image */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1600&q=80"
              alt="Background pattern"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Offer Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Limited Seats Remaining • VIP Northern Pakistan Promotion</span>
              </div>

              <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold leading-tight">
                Hunza & Skardu Shangrila <br />
                <span className="text-amber-300">Exclusive Luxury Expedition</span>
              </h2>

              <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed">
                Reserve your private 4x4 Prado luxury expedition across Hunza Valley, Shangrila Resort Skardu, and Attabad Lake before the timer expires. Includes complimentary VIP airport pickup & organic mountain chef dining.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-teal-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Free Date Change Flexibility</span>
                </span>
                <span>•</span>
                <span>Includes 4x4 Prado Escort & Private Chef</span>
              </div>
            </div>

            {/* Right Countdown & Booking Box */}
            <div className="lg:col-span-5 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center space-y-5">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300">
                <Timer className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Offer Expires In</span>
              </div>

              {/* Countdown Digits */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-serif-heading text-3xl font-extrabold text-amber-400 block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Hours</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-serif-heading text-3xl font-extrabold text-amber-400 block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Minutes</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-serif-heading text-3xl font-extrabold text-amber-400 block">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Seconds</span>
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>Claim Offer & Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
