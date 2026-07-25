import React from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, items, onClose, onNavigate }) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const prevItem = items[(currentIndex - 1 + items.length) % items.length];
  const nextItem = items[(currentIndex + 1) % items.length];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-300 hover:text-white p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation */}
      <button
        onClick={() => onNavigate(prevItem)}
        className="absolute left-4 md:left-8 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation */}
      <button
        onClick={() => onNavigate(nextItem)}
        className="absolute right-4 md:right-8 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Lightbox Content Container */}
      <div className="max-w-5xl w-full flex flex-col items-center max-h-[90vh]">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[75vh] bg-black border border-white/10">
          <img
            src={item.imageUrl}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[75vh]"
          />
        </div>

        {/* Caption Card */}
        <div className="mt-4 text-center max-w-xl text-white space-y-1">
          <h3 className="font-serif-heading text-2xl font-bold">{item.title}</h3>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
              {item.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              Photo by {item.photographer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
