import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Star, Award, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Destination, PageView } from '../../types';

interface HeroSectionProps {
  destinations: Destination[];
  onSearchSubmit: (params: { destination: string; date: string; guests: number }) => void;
  onNavigate: (view: PageView) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  destinations,
  onSearchSubmit,
  onNavigate,
}) => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-10-01');
  const [guests, setGuests] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      destination: selectedDestination,
      date: selectedDate,
      guests,
    });
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0F172A]">
      {/* Hero Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Resort Horizon"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0F172A]/70 to-[#0F172A]/40" />
      </div>

      {/* Decorative Subtle Glowing Elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#0F766E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 flex-1 flex flex-col justify-center">
        
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 w-fit shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Curated Bespoke Expeditions & Luxury Pakistan Travel Architecture</span>
        </div>

        {/* Heading */}
        <h1 className="font-serif-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05] max-w-5xl">
          Discover Majestic Pakistan, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-amber-200 to-amber-400">
            One Journey
          </span> at a Time.
        </h1>

        <p className="mt-6 text-slate-200 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
          Embark on extraordinary private expeditions across Hunza, Skardu, Swat, and Mughal Lahore. Unrivaled luxury, handpicked 5-star mountain sanctuaries, and privileged access across Pakistan.
        </p>

        {/* Glassmorphism Luxury Search Bar */}
        <div className="mt-10 max-w-5xl w-full">
          <form
            onSubmit={handleSearch}
            className="glass-dark rounded-3xl p-3 md:p-4 shadow-2xl border border-white/20 grid grid-cols-1 md:grid-cols-4 gap-3 items-center"
          >
            {/* Field 1: Destination */}
            <div className="p-3 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/10 transition-colors flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#0F766E] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Where To?
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer [&>option]:text-slate-900"
                >
                  <option value="">All Luxury Destinations</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}, {d.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 2: Date */}
            <div className="p-3 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/10 transition-colors flex items-center gap-3">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Field 3: Guests */}
            <div className="p-3 bg-white/10 hover:bg-white/15 rounded-2xl border border-white/10 transition-colors flex items-center gap-3">
              <Users className="w-5 h-5 text-teal-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Travelers
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer [&>option]:text-slate-900"
                >
                  <option value={1}>1 Solo VIP</option>
                  <option value={2}>2 Couple / Guests</option>
                  <option value={4}>4 Small Group</option>
                  <option value={8}>8 Family Charter</option>
                </select>
              </div>
            </div>

            {/* Search CTA */}
            <button
              type="submit"
              className="w-full h-full py-4 bg-[#F59E0B] hover:bg-amber-500 text-white rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Search Voyages</span>
            </button>
          </form>
        </div>

      </div>

      {/* Hero Bottom Key Statistics Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 w-full">
        <div className="glass-dark border border-white/10 rounded-2xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-white divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          
          <div className="flex items-center gap-4 pt-4 lg:pt-0 pl-0 lg:pl-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif-heading text-2xl font-extrabold text-white">25,000+</p>
              <p className="text-xs text-slate-300 font-medium">Happy Explorers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 pl-0 lg:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif-heading text-2xl font-extrabold text-white">30+ Regions</p>
              <p className="text-xs text-slate-300 font-medium">Across Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 pl-0 lg:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="font-serif-heading text-2xl font-extrabold text-white">100+ Tours</p>
              <p className="text-xs text-slate-300 font-medium">Curated Expeditions</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 lg:pt-0 pl-0 lg:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Star className="w-6 h-6 fill-emerald-300" />
            </div>
            <div>
              <p className="font-serif-heading text-2xl font-extrabold text-white">4.9 / 5.0</p>
              <p className="text-xs text-slate-300 font-medium">Verified Guest Rating</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
