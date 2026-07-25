import React from 'react';
import { 
  BadgePercent, 
  UserCheck, 
  Headphones, 
  ShieldCheck, 
  Building2, 
  CreditCard 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: BadgePercent,
      title: 'Best Price Guarantee',
      description: 'Transparent luxury pricing with no hidden charges and direct resort contracts guaranteed.',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    },
    {
      icon: UserCheck,
      title: 'Trusted Luxury Guides',
      description: 'Accompanied by certified local historians, naturalists, and multi-lingual private concierges.',
      color: 'bg-teal-500/10 text-[#0F766E] border-teal-500/20'
    },
    {
      icon: Headphones,
      title: '24/7 Concierge Support',
      description: 'Dedicated travel architect on standby round-the-clock for instant itinerary adjustments.',
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/20'
    },
    {
      icon: ShieldCheck,
      title: 'Ultra-Secure Booking',
      description: 'Encrypted payment gateways, CFAR travel insurance protection, and full deposit security.',
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20'
    },
    {
      icon: Building2,
      title: 'Handpicked 5-Star Hotels',
      description: 'Serena Hotels & Shangrila Resort partnerships, Mughal heritage havelis, and luxury mountain lodges.',
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20'
    },
    {
      icon: CreditCard,
      title: 'Flexible & Easy Payments',
      description: 'Split-deposit options, multi-currency support, and cryptocurrency payments accepted.',
      color: 'bg-rose-500/10 text-rose-600 border-rose-500/20'
    }
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Decorative Blur Effect */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0F766E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            The Silk Standard
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Why Choose Silk Tourism
          </h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            We redefine Pakistan travel by fusing luxury 4x4 Prado expeditions, 5-star mountain sanctuaries, and deeply personalized human concierge service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800 hover:border-slate-700 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feat.color}`}>
                <feat.icon className="w-7 h-7" />
              </div>

              <h3 className="font-serif-heading text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                {feat.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
