import React from 'react';
import { PageView } from '../types';
import { Compass, ShieldCheck, Award, Globe, Users, Target, Eye, Calendar, Sparkles } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Established in 2019</span>
          </div>
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold">
            About Silk Tourism
          </h1>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Delivering high standards of quality, reliability, and excellence in travel services across Pakistan and worldwide destinations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Main About Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="space-y-6">
            <div className="inline-block bg-teal-50 border border-teal-200 text-[#0F766E] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              About Us
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-slate-900 leading-tight">
              Established in 2019 with a Commitment to Quality & Excellence
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Silk Tourism was established in 2019 with a commitment to quality and excellence. Since then, we have consistently maintained high standards and delivered premium travel services to our valued clients. Our focus is on providing safe, comfortable, and memorable travel experiences through professional planning and reliable support.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" /> Safe & Secure Journeys
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl">
                <Award className="w-4 h-4 text-amber-500" /> Professional Planning
              </span>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl h-96">
            <img
              src="https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80"
              alt="Silk Tourism Hunza Valley"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-[#0F766E] to-[#0d645e] text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-amber-300 flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block mb-2">
                Our Purpose
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold mb-4">
                MISSION
              </h3>
              <p className="text-sm sm:text-base text-teal-50 leading-relaxed">
                Our mission is to provide high-quality, reliable, and affordable travel services while ensuring complete customer satisfaction. We aim to deliver safe, comfortable, and well-organized journeys through professional planning and dedicated support.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 text-xs text-teal-100 font-semibold flex items-center justify-between">
              <span>Customer Satisfaction Priority</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800 flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
                Our Future
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold mb-4">
                VISION
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our vision is to become one of Pakistan's leading tourism companies by setting new standards in service excellence, innovation, and customer trust. We strive to create memorable travel experiences and build long-term relationships with our clients.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400 font-semibold flex items-center justify-between">
              <span>Leading Pakistan Tourism Standard</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
          </div>

        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: 'Reliable Planning',
              desc: 'Professional itinerary management and expert coordination ensuring smooth, stress-free travel.'
            },
            {
              icon: ShieldCheck,
              title: 'Safety & Comfort',
              desc: 'High-standard vehicles, certified mountain drivers, and 24/7 dedicated support team.'
            },
            {
              icon: Award,
              title: 'Service Excellence',
              desc: 'Building long-term client trust through transparent pricing, high quality, and unforgettable memories.'
            }
          ].map((pillar, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#0F766E] flex items-center justify-center">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif-heading text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Leadership */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif-heading text-3xl font-bold text-slate-900">Our Dedicated Team</h2>
            <p className="mt-2 text-xs text-slate-600">Travel professionals committed to delivering unforgettable journeys since 2019.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Saima Ahsan',
                role: 'CEO / Founder',
                image: '/src/assets/images/saima_ahsan_ceo_1785581905007.jpg'
              },
              {
                name: 'Waqar Zameer',
                role: 'Director Finance',
                image: '/src/assets/images/waqar_zameer_finance_1785581923931.jpg'
              },
              {
                name: 'Zain Hanif',
                role: 'Director Marketing',
                image: '/src/assets/images/zain_hanif_marketing_1785581943014.jpg'
              },
              {
                name: 'Fatima Khan',
                role: 'Tours Manager',
                image: '/src/assets/images/fatima_khan_tours_1785581959694.jpg'
              },
              {
                name: 'Maham Siddique',
                role: 'Relations Manager',
                image: '/src/assets/images/maham_siddique_rel_1785581977794.jpg'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 p-4 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <h4 className="font-serif-heading text-lg font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs text-[#0F766E] font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
