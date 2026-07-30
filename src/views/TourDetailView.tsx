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
  Share2,
  ArrowLeft,
  Check
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!tour) {
    return (
      <div className="pt-32 pb-20 text-center max-w-md mx-auto px-4">
        <p className="text-slate-600 font-semibold text-sm">No tour package selected.</p>
        <button
          onClick={() => onNavigate('tours')}
          className="mt-4 px-6 py-2.5 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          Explore All Tour Packages
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(tour.id);

  // Fallbacks for arrays
  const galleryImages = (tour.gallery && tour.gallery.length > 0)
    ? tour.gallery
    : [
        tour.image,
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80'
      ];

  const mainImage = selectedImage || tour.image || galleryImages[0];

  const highlightsList = (tour.highlights && tour.highlights.length > 0)
    ? tour.highlights
    : ['5-Star Luxury Accommodations', 'Private Dedicated Transfers', '24/7 VIP Concierge Support'];

  const itineraryList = (tour.itinerary && tour.itinerary.length > 0)
    ? tour.itinerary
    : [
        {
          day: 1,
          title: 'Arrival & VIP Airport Welcome',
          description: 'Met by your private concierge upon landing. Executive transfer to luxury resort and welcome dinner.',
          meals: 'Breakfast & Dinner',
          accommodation: '5-Star Luxury Resort'
        },
        {
          day: 2,
          title: 'Guided Scenic Exploration',
          description: 'Full day private guided tour with helicopter transfers, local artisan visits, and high tea.',
          meals: 'All Meals Included',
          accommodation: '5-Star Luxury Resort'
        },
        {
          day: 3,
          title: 'Heritage & Departure',
          description: 'Morning private spa session followed by executive departure transfer.',
          meals: 'Breakfast',
          accommodation: 'Check-out'
        }
      ];

  const inclusionsList = (tour.inclusions && tour.inclusions.length > 0)
    ? tour.inclusions
    : ['5-Star Luxury Hotel Lodging', 'Private Chauffeur & Transfers', 'All Breakfasts & Gourmet Dinners', 'Dedicated Local Tour Guide'];

  const exclusionsList = (tour.exclusions && tour.exclusions.length > 0)
    ? tour.exclusions
    : ['International Airfare', 'Personal Expenses & Souvenirs', 'Travel & Medical Insurance'];

  const upcomingDatesList = (tour.upcomingDates && tour.upcomingDates.length > 0)
    ? tour.upcomingDates
    : ['Aug 15 - Aug 25, 2026', 'Sep 01 - Sep 10, 2026', 'Oct 05 - Oct 15, 2026'];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC]">
      
      {/* Top Navigation & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <button
          onClick={() => onNavigate('tours')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0F766E] transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Expeditions</span>
        </button>
      </div>

      {/* Media Gallery Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-3xl overflow-hidden h-auto lg:h-[480px]">
          <div className="lg:col-span-2 relative h-[320px] sm:h-[400px] lg:h-full rounded-3xl overflow-hidden">
            <img
              src={mainImage}
              alt={tour.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-3 rounded-full backdrop-blur-md bg-white/80 hover:bg-white text-slate-800 transition-all shadow-md"
                title="Share Expedition"
              >
                {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => onToggleWishlist(tour.id)}
                className={`p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 hover:bg-white text-slate-800'
                }`}
                title="Toggle Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white max-w-xl">
              <span className="bg-[#0F766E] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                {tour.category || 'Luxury'} Expedition
              </span>
              <h1 className="font-serif-heading text-2xl sm:text-4xl font-bold leading-tight">
                {tour.title}
              </h1>
            </div>
          </div>

          <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
            {galleryImages.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative h-full overflow-hidden rounded-2xl cursor-pointer group border-2 transition-all ${
                  mainImage === img ? 'border-[#0F766E]' : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Specs */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-slate-700">
              <div className="p-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Clock className="w-4 h-4 text-[#0F766E]" />
                  <span>{tour.duration || '7 Days'}</span>
                </span>
              </div>

              <div className="p-2 pt-4 sm:pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Group Size</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>{tour.groupSize || 'Private Group'}</span>
                </span>
              </div>

              <div className="p-2 pt-4 sm:pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{tour.location || 'Northern Pakistan'}</span>
                </span>
              </div>

              <div className="p-2 pt-4 sm:pt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Rating</span>
                <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{tour.rating || 5.0} ({tour.reviewsCount || 12} reviews)</span>
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">Expedition Overview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tour.description || 'Experience an unmatched luxury expedition crafted specifically for discerning travelers. Enjoy private chauffeur services, five-star accommodations, and bespoke local cultural immersion.'}
              </p>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Key Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlightsList.map((hl, idx) => (
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
                {itineraryList.map((item, index) => {
                  const dayNum = item.day || (index + 1);
                  const isOpen = activeDay === dayNum;
                  return (
                    <div
                      key={dayNum}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setActiveDay(isOpen ? 0 : dayNum)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-[#0F766E] text-white flex items-center justify-center text-xs">
                            Day {dayNum}
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
                  {inclusionsList.map((inc, idx) => (
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
                  {exclusionsList.map((exc, idx) => (
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
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Pricing Policy</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif-heading text-2xl font-extrabold text-[#0F766E]">
                    Price on Request
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Includes luxury transfers, 5-star lodging & concierge</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Departure Date
                </label>
                <div className="space-y-2">
                  {upcomingDatesList.map((d, idx) => {
                    const isSelected = selectedDate === d || (!selectedDate && idx === 0);
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedDate(d)}
                        className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-teal-50/80 border-[#0F766E] text-[#0F766E]'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#0F766E]" />
                          <span>{d}</span>
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected ? 'bg-[#0F766E] text-white' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                          {isSelected ? 'Selected' : 'Available'}
                        </span>
                      </div>
                    );
                  })}
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
