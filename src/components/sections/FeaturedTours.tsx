import React from 'react';
import { TourPackage, PageView } from '../../types';
import { Star, Clock, Users, MapPin, Heart, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

interface FeaturedToursProps {
  tours: TourPackage[];
  wishlist: string[];
  onToggleWishlist: (tourId: string) => void;
  onSelectTour: (tour: TourPackage) => void;
  onNavigate: (view: PageView) => void;
  onOpenBooking: (tour: TourPackage) => void;
}

export const FeaturedTours: React.FC<FeaturedToursProps> = ({
  tours,
  wishlist,
  onToggleWishlist,
  onSelectTour,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <section className="py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Handpicked Masterpiece Itineraries</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Featured Tour Packages
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl">
              All-inclusive private journeys featuring 4x4 Prado transport, local organic mountain chef dining, and 5-star Serena & Shangrila resort accommodations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tours')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-full font-bold text-xs tracking-wider shadow-md transition-all self-start md:self-auto"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => {
            const isWishlisted = wishlist.includes(tour.id);

            return (
              <div
                key={tour.id}
                className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image & Header Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* VIP Badge */}
                  <div className="absolute top-4 left-4 bg-[#0F766E] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <span>VIP Expedition</span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(tour.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted
                        ? 'bg-rose-500 text-white shadow-lg'
                        : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                  </button>

                  {/* Location & Rating */}
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

                {/* Tour Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Meta Specs */}
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

                    {/* Title */}
                    <h3
                      onClick={() => {
                        onSelectTour(tour);
                        onNavigate('tour-detail');
                      }}
                      className="font-serif-heading text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {tour.title}
                    </h3>

                    {/* Highlights */}
                    <ul className="mt-3 space-y-1.5">
                      {tour.highlights.slice(0, 2).map((hl, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Booking Actions */}
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Pricing</span>
                      <span className="font-serif-heading text-lg font-bold text-[#0F766E]">
                        Price on Request
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onSelectTour(tour);
                          onNavigate('tour-detail');
                        }}
                        className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onOpenBooking(tour)}
                        className="px-4 py-2 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-xl text-xs font-bold shadow-md transition-all"
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
    </section>
  );
};
