import React, { useState } from 'react';
import { Destination, PageView, TourPackage } from '../types';
import { Search, MapPin, Star, Filter, ArrowRight, Sparkles, X, Check } from 'lucide-react';

interface DestinationsViewProps {
  destinations: Destination[];
  tours: TourPackage[];
  onSelectDestination: (dest: Destination) => void;
  onNavigate: (view: PageView) => void;
  onOpenBooking: () => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  destinations,
  tours,
  onSelectDestination,
  onNavigate,
  onOpenBooking,
}) => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [modalDest, setModalDest] = useState<Destination | null>(null);

  const filtered = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || d.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC] min-h-screen">
      {/* Hero Banner */}
      <div className="bg-[#0F172A] text-white py-16 mb-12 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80"
            alt="Destinations Header"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            The Silk Pakistan Portfolio
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold">
            Pakistan's Finest Destinations
          </h1>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            From the turquoise waters of Attabad Lake in Hunza to the royal Mughal architecture of Lahore, discover handpicked Pakistani sanctuaries engineered for ultimate luxury.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter & Search Controls */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#0F766E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by region or city (e.g. Hunza, Skardu, Lahore)..."
              className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 pl-10 pr-4 py-2.5 rounded-2xl focus:outline-none focus:border-[#0F766E]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'gilgit-baltistan', label: 'Gilgit-Baltistan' },
              { id: 'khyber-pakhtunkhwa', label: 'Khyber Pakhtunkhwa' },
              { id: 'punjab', label: 'Punjab' },
              { id: 'azad-kashmir', label: 'Azad Kashmir' },
              { id: 'balochistan', label: 'Balochistan' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedRegion === reg.id
                    ? 'bg-[#0F766E] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              onClick={() => setModalDest(dest)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{dest.country}</span>
                </div>

                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-teal-200 block">Packages</span>
                  <span className="font-serif-heading text-lg font-bold">Custom Quote</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="mt-2 text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F766E]">
                  <span>View Destination Details</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Destination Modal */}
      {modalDest && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 animate-slide-up border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="relative h-72 overflow-hidden flex-shrink-0">
              <img
                src={modalDest.image}
                alt={modalDest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <button
                onClick={() => setModalDest(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 text-white hover:bg-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-[#0F766E] text-white text-[10px] font-bold uppercase rounded-full mb-2 inline-block">
                  {modalDest.country}
                </span>
                <h2 className="font-serif-heading text-3xl font-bold">{modalDest.name}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Destination Overview
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {modalDest.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Highlights & Popular Activities
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {modalDest.popularFor.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <Check className="w-4 h-4 text-[#0F766E]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Pricing</span>
                  <span className="font-serif-heading text-xl font-bold text-[#0F766E]">
                    Price on Request
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setModalDest(null);
                      onNavigate('tours');
                    }}
                    className="px-5 py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200"
                  >
                    View Related Tours
                  </button>
                  <button
                    onClick={() => {
                      setModalDest(null);
                      onOpenBooking();
                    }}
                    className="px-6 py-2.5 bg-[#0F766E] text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Book Custom Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
