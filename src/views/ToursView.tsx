import React, { useState } from 'react';
import { TourPackage, PageView } from '../types';
import { Search, Filter, Star, Clock, Users, MapPin, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ToursViewProps {
  tours: TourPackage[];
  wishlist: string[];
  onToggleWishlist: (tourId: string) => void;
  onSelectTour: (tour: TourPackage) => void;
  onNavigate: (view: PageView) => void;
  onOpenBooking: (tour: TourPackage) => void;
}

export const ToursView: React.FC<ToursViewProps> = ({
  tours,
  wishlist,
  onToggleWishlist,
  onSelectTour,
  onNavigate,
  onOpenBooking,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filtered = tours.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#0F172A] text-white py-16 mb-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Curated Journeys
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold">
            Luxury Tour Packages
          </h1>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            All-inclusive private expeditions engineered around complete comfort, privacy, and authentic cultural immersion.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-serif-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#0F766E]" />
                  <span>Filter Expeditions</span>
                </h3>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-[#0F766E] hover:underline font-semibold"
                >
                  Reset
                </button>
              </div>

              {/* Search Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Search Keywords
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title, city..."
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              {/* Category Radio/Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Category
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'luxury', label: 'Luxury & Yacht' },
                    { id: 'cultural', label: 'Cultural Heritage' },
                    { id: 'honeymoon', label: 'Honeymoon & Romantic' },
                    { id: 'wildlife', label: 'Wildlife Safaris' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-teal-50 text-[#0F766E] font-bold border border-teal-200'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Tour Cards Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Showing {filtered.length} Curated Expeditions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((tour) => {
                const isWishlisted = wishlist.includes(tour.id);

                return (
                  <div
                    key={tour.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                      <button
                        onClick={() => onToggleWishlist(tour.id)}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                          isWishlisted
                            ? 'bg-rose-500 text-white shadow-lg'
                            : 'bg-white/80 text-slate-700 hover:bg-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                          <span>{tour.location}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-amber-950/70 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 font-bold border border-amber-500/30">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{tour.rating}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
                            <span>{tour.duration}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-amber-500" />
                            <span>{tour.groupSize}</span>
                          </span>
                        </div>

                        <h3
                          onClick={() => {
                            onSelectTour(tour);
                            onNavigate('tour-detail');
                          }}
                          className="font-serif-heading text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors cursor-pointer line-clamp-2"
                        >
                          {tour.title}
                        </h3>

                        <p className="mt-2 text-slate-600 text-xs line-clamp-2 leading-relaxed">
                          {tour.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">Pricing</span>
                          <span className="font-serif-heading text-base font-bold text-[#0F766E]">
                            Price on Request
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              onSelectTour(tour);
                              onNavigate('tour-detail');
                            }}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onOpenBooking(tour)}
                            className="px-4 py-2 bg-[#0F766E] text-white rounded-xl text-xs font-bold shadow-md"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
