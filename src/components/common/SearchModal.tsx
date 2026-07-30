import React, { useState } from 'react';
import { Search, X, MapPin, Compass, ArrowRight } from 'lucide-react';
import { TourPackage, Destination, PageView } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  tours: TourPackage[];
  onSelectTour: (tour: TourPackage) => void;
  onNavigate: (view: PageView) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  destinations,
  tours,
  onSelectTour,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredDestinations = query.trim()
    ? destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase())
      )
    : destinations.slice(0, 3);

  const filteredTours = query.trim()
    ? tours.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.location.toLowerCase().includes(query.toLowerCase()) ||
          t.country.toLowerCase().includes(query.toLowerCase())
      )
    : tours.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-slide-up border border-slate-100">
        
        {/* Input Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0F766E]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pakistan destinations (e.g., Hunza, Skardu, Lahore), tours, or activities..."
            className="w-full bg-transparent text-slate-900 text-sm font-medium focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Destinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Popular Destinations</span>
              <button
                onClick={() => {
                  onNavigate('destinations');
                  onClose();
                }}
                className="text-[#0F766E] hover:underline"
              >
                View All
              </button>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => {
                    onNavigate('destinations');
                    onClose();
                  }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer h-24 border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-end text-white">
                    <p className="text-xs font-bold">{dest.name}</p>
                    <p className="text-[10px] text-slate-300">{dest.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Featured Luxury Tours</span>
              <button
                onClick={() => {
                  onNavigate('tours');
                  onClose();
                }}
                className="text-[#0F766E] hover:underline"
              >
                View All
              </button>
            </h4>
            <div className="space-y-2">
              {filteredTours.map((tour) => (
                <div
                  key={tour.id}
                  onClick={() => {
                    onSelectTour(tour);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
                >
                  <img
                    src={tour.image}
                    alt={tour.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{tour.title}</p>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0F766E]" />
                      <span>{tour.location}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#0F766E] block">Price on Request</span>
                    <span className="text-[10px] text-slate-400 block">{tour.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-3 border-t border-slate-200 text-center text-xs text-slate-400">
          Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px]">ESC</kbd> to exit
        </div>
      </div>
    </div>
  );
};
