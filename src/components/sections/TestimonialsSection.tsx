import React, { useState } from 'react';
import { Testimonial } from '../../types';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, CheckCircle } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx + 1) % testimonials.length);
  };

  const activeItem = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#0B132B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Verified Guest Reflections
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold tracking-tight">
            Loved By Discerning Travelers
          </h2>
          <p className="mt-3 text-slate-400 text-sm">
            Hear from corporate executives, art collectors, and luxury enthusiasts who entrust their global journeys to Silk Tourism.
          </p>
        </div>

        {/* Swiper Slider Display */}
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative">
          <Quote className="absolute top-8 right-8 w-16 h-16 text-slate-800 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar & Guest Details */}
            <div className="flex-shrink-0 text-center md:text-left space-y-3">
              <div className="relative inline-block">
                <img
                  src={activeItem.avatar}
                  alt={activeItem.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full object-cover border-2 border-amber-400 shadow-xl"
                />
                <div className="absolute bottom-0 right-0 bg-[#0F766E] text-white p-1 rounded-full border border-slate-900">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h4 className="font-serif-heading text-lg font-bold text-white">{activeItem.name}</h4>
                <p className="text-xs text-amber-300 font-medium">{activeItem.role}</p>
                <p className="text-[11px] text-slate-400 flex items-center justify-center md:justify-start gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#0F766E]" />
                  <span>{activeItem.location}</span>
                </p>
              </div>
            </div>

            {/* Testimonial Quote & Star Rating */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(activeItem.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <blockquote className="text-sm md:text-base text-slate-200 italic leading-relaxed font-serif">
                "{activeItem.comment}"
              </blockquote>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-[#0F766E]">Expedition: {activeItem.tourTaken}</span>
                <span>{activeItem.date}</span>
              </div>
            </div>
          </div>

          {/* Slider Nav Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'bg-amber-400 w-8' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="p-3 bg-slate-800 hover:bg-[#0F766E] text-white rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 bg-slate-800 hover:bg-[#0F766E] text-white rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
