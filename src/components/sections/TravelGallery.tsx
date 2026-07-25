import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { Maximize2, MapPin, Camera } from 'lucide-react';

interface TravelGalleryProps {
  galleryItems: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
}

export const TravelGallery: React.FC<TravelGalleryProps> = ({ galleryItems, onOpenLightbox }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredItems = filterCategory === 'all'
    ? galleryItems
    : galleryItems.filter((i) => i.category === filterCategory);

  return (
    <section className="py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-widest block mb-2">
              Visual Chronicles
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Travel Gallery
            </h2>
            <p className="mt-3 text-slate-600 text-sm max-w-xl">
              Captured moments of serene beauty, architectural marvels, and breathtaking horizons from our guests' private expeditions.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'luxury', label: 'Luxury Resorts' },
              { id: 'beach', label: 'Beaches & Islands' },
              { id: 'culture', label: 'Cultural' },
              { id: 'mountain', label: 'Mountains' },
              { id: 'wildlife', label: 'Wildlife' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterCategory === tab.id
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-80 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                
                <div className="flex justify-end">
                  <span className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                  <h3 className="font-serif-heading text-lg font-bold">{item.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      {item.photographer}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
