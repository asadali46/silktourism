import React, { useState } from 'react';
import { TourPackage, PageView } from '../types';
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  Heart, 
  Share2 
} from 'lucide-react';

interface TourDetailViewProps {
  tour: TourPackage | null;
  wishlist: string[];
  onToggleWishlist: (tourId: string) => void;
  onNavigate: (view: PageView) => void;
  onOpenBooking: (tour: TourPackage) => void;
}

export const TourDetailView: React.FC<TourDetailViewProps> = ({
  tour,
  wishlist,
  onToggleWishlist,
  onNavigate,
  onOpenBooking,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  if (!tour) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-slate-600">No tour selected.</p>
        <button onClick={() => onNavigate('tours')} className="mt-4 px-4 py-2 bg-[#0F766E] text-white rounded-xl text-xs font-bold">
          Back to Tours
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(tour.id);

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      
      {/* Top Media Gallery Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-3xl overflow-hidden h-[480px]">
          <div className="lg:col-span-2 relative h-full">
            <img
              src={tour.image}
              alt={tour.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => onToggleWishlist(tour.id)}
                className={`p-3 rounded-full backdrop-blur-md transition-all ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-slate-800'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 text-white max-w-xl">
              <span className="bg-[#0F766E] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                {tour.category} Expedition
              </span>
              <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold leading-tight">
                {tour.title}
              </h1>
            </div>
          </div>

          <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
            {tour.gallery.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative h-full overflow-hidden rounded-2xl">
                <img src={img} alt="Gallery item" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Specs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-slate-700">
              <div className="p-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Clock className="w-4 h-4 text-[#0F766E]" />
                  <span>{tour.duration}</span>
                </span>
              </div>

              <div className="p-2 pt-4 sm:pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Group Size</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>{tour.groupSize}</span>
                </span>
              </div>

              <div className="p-2 pt-4 sm:pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{tour.location}</span>
                </span>
              </div>

              <div className="p-2 pt-4 sm:pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Rating</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{tour.rating} ({tour.reviewsCount} reviews)</span>
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">Expedition Overview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tour.description}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Key Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-teal-50/50 p-3 rounded-2xl border border-teal-100">
                      <CheckCircle2 className="w-4 h-4 text-[#0F766E] flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day by Day Itinerary */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">Day-By-Day Itinerary</h3>

              <div className="space-y-4">
                {tour.itinerary.map((item) => {
                  const isOpen = activeDay === item.day;
                  return (
                    <div
                      key={item.day}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setActiveDay(isOpen ? 0 : item.day)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-[#0F766E] text-white flex items-center justify-center text-xs">
                            Day {item.day}
                          </span>
                          <span>{item.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-5 space-y-3 bg-white text-xs text-slate-600 border-t border-slate-200">
                          <p className="leading-relaxed">{item.description}</p>
                          <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-semibold text-slate-500">
                            <span>🍽️ Meals: {item.meals}</span>
                            <span>🏨 Stay: {item.accommodation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-serif-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>What's Included</span>
                </h4>
                <ul className="space-y-2.5">
                  {tour.inclusions.map((inc, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-serif-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>What's Excluded</span>
                </h4>
                <ul className="space-y-2.5">
                  {tour.exclusions.map((exc, idx) => (
                    <li key={idx} className="text-xs text-slate-500 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0"></span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl space-y-6 sticky top-28">
              
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Investment Per Guest</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif-heading text-3xl font-extrabold text-[#0F766E]">
                    ${tour.price.toLocaleString()}
                  </span>
                  {tour.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ${tour.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Includes luxury transfers, 5-star lodging & concierge</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Guaranteed Departure
                </label>
                <div className="space-y-2">
                  {tour.upcomingDates.map((d, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-semibold flex items-center justify-between text-slate-800">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#0F766E]" />
                        <span>{d}</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                        Available
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(tour)}
                className="w-full py-4 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-900/10 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Reserve VIP Expedition</span>
              </button>

              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#0F766E]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Virtuoso Risk-Free Policy</span>
                </div>
                <p className="text-[11px]">Complimentary date adjustments up to 30 days before departure.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
