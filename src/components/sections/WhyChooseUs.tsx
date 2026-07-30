import React from 'react';
import { 
  Users, 
  DollarSign, 
  Headphones, 
  Car, 
  Building2, 
  ThumbsUp 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Professional travel architects, certified high-altitude drivers, and tour managers delivering excellence since 2019.',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      icon: DollarSign,
      title: 'Affordable Prices',
      description: 'Transparent and competitive rates ensuring premium travel experiences without hidden costs.',
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      description: 'Round-the-clock dedicated assistance and real-time support throughout your entire journey.',
      color: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
    },
    {
      icon: Car,
      title: 'Comfortable Transport',
      description: 'Late-model fleet of Toyota Land Cruiser Prados, Fortuners, Grand Cabins, and executive Coasters.',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      icon: Building2,
      title: 'Luxury Hotels',
      description: 'Handpicked stay reservations at Serena Hotels, Shangrila Resort, PC Hotels, and boutique mountain lodges.',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      icon: ThumbsUp,
      title: 'Customer Satisfaction',
      description: 'Committed to complete customer satisfaction, building long-term trust and creating unforgettable memories.',
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    }
  ];

  return (
    <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Decorative Blur Effect */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0F766E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-amber-500 text-slate-950 font-extrabold px-4 py-1.5 rounded-lg text-xs uppercase tracking-widest mb-3">
            Why Silk Tourism?
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            WHY <span className="text-emerald-400">SILK TOURISM?</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Delivering safe, comfortable, and memorable travel experiences backed by professional planning, transparent value, and dedicated service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 backdrop-blur-md border border-slate-800 hover:border-amber-500/50 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-amber-500/10 w-24 h-24 rounded-bl-full pointer-events-none" />
              
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feat.color}`}>
                <feat.icon className="w-7 h-7" />
              </div>

              <h3 className="font-serif-heading text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                {feat.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

