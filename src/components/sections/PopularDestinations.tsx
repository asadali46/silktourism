import React, { useState } from 'react';
import { Destination, PageView } from '../../types';
import { Star, MapPin, ArrowRight, Compass } from 'lucide-react';

interface PopularDestinationsProps {
  destinations: Destination[];
  onNavigate: (view: PageView) => void;
  onSelectDestination: (dest: Destination) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  destinations,
  onNavigate,
  onSelectDestination,
}) => {
  const [activeRegion, setActiveRegion] = useState<string>('all');

  const filteredDestinations = activeRegion === 'all'
    ? destinations
    : destinations.filter((d) => d.region === activeRegion);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-widest block mb-2">
              Pakistan's Finest Sanctuaries
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Popular Destinations
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl">
              Handpicked iconic locations, Karakoram valleys, alpine lakes, ancient Mughal forts, and coastal highways offering unmatched natural beauty.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-200/60 p-1.5 rounded-2xl w-fit">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'gilgit-baltistan', label: 'Gilgit-Baltistan' },
              { id: 'khyber-pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
              { id: 'punjab', label: 'Punjab' },
              { id: 'azad-kashmir', label: 'Azad Kashmir' },
              { id: 'balochistan', label: 'Balochistan' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeRegion === tab.id
                    ? 'bg-white text-[#0F766E] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => {
                onSelectDestination(dest);
                onNavigate('destinations');
              }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container with Badges */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Country Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-slate-900 text-xs font-bold shadow-md flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{dest.country}</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                </div>

                {/* Starting Price Tag */}
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-teal-200 block">Packages</span>
                  <span className="font-serif-heading text-lg font-bold">Price on Request</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="mt-2 text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    {dest.shortDescription}
                  </p>
                </div>

                {/* Popular For Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {dest.popularFor.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-lg border border-slate-200/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {dest.reviewsCount} Guest Reviews
                  </span>
                  <button className="text-xs font-bold text-[#0F766E] group-hover:text-[#0d645e] flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-300 hover:border-[#0F766E] text-slate-800 hover:text-[#0F766E] rounded-full font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
          >
            <span>Browse All Pakistan Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
