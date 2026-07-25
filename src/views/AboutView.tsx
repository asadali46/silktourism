import React from 'react';
import { PageView } from '../types';
import { Compass, ShieldCheck, Award, Globe, Users, HeartHandshake, Leaf } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Our Legacy
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold">
            The Silk Tourism Story
          </h1>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            Founded with a vision to redefine bespoke global travel. We build private bridges to the world’s most pristine sanctuaries with discretion, elegance, and soul.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider block">
              Architects of Rare Moments
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-slate-900">
              Crafting Unforgettable Journeys Across Pakistan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Silk Tourism, we believe true luxury is not merely five-star amenities—it is the luxury of time, privacy, and profound connection with Pakistan’s majestic northern landscapes and centuries-old cultural heritage.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether arranging a private 4x4 Prado expedition across Deosai Plains, a helicopter safari to Nanga Parbat base camp, or an exclusive after-hours evening inside Badshahi Mosque in Lahore, our travel architects handle every detail with white-glove precision.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
            <img
              src="https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80"
              alt="Silk Luxury Story Pakistan"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: 'Privileged Access',
              desc: 'Unlocking doors closed to the general public—from private museum viewings to high-altitude helicopter landings.'
            },
            {
              icon: HeartHandshake,
              title: 'Human Discretion',
              desc: 'Dedicated 24/7 travel architects who anticipate your preferences before you even request them.'
            },
            {
              icon: Leaf,
              title: 'Conscious Luxury',
              desc: 'Pioneering carbon-offset flights and supporting hyper-local indigenous cultural preservation initiatives.'
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
            <h2 className="font-serif-heading text-3xl font-bold text-slate-900">Our Leadership Team</h2>
            <p className="mt-2 text-xs text-slate-600">Seasoned diplomats, luxury hotel veterans, and explorer architects.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: 'Tariq Alvi Khan',
                role: 'Founder & Chief Executive',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
              },
              {
                name: 'Dr. Shahzad Qureshi',
                role: 'Head of Northern Mountain Expeditions',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
              },
              {
                name: 'Fatima Zafar',
                role: 'Director of Cultural & Mughal Heritage',
                image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
              }
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 p-4 text-center space-y-3 shadow-sm">
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
