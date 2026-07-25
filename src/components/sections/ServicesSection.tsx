import React, { useState } from 'react';
import { ServiceItem, PageView } from '../../types';
import { 
  Compass, 
  Building2, 
  FileCheck, 
  Plane, 
  Car, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle, 
  X 
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onNavigate: (view: PageView) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onNavigate }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return Compass;
      case 'Building2': return Building2;
      case 'FileCheck': return FileCheck;
      case 'Plane': return Plane;
      case 'Car': return Car;
      case 'ShieldCheck': return ShieldCheck;
      default: return Compass;
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-widest block mb-2">
            White-Glove Hospitality
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Our Concierge Services
          </h2>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            From private jet charters and diplomatic visa facilitation to luxury hotel upgrades and 24/7 security escorts, we fulfill every travel requirement with discretion.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const IconComponent = getIcon(srv.iconName);

            return (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className="group bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-[#0F766E] flex items-center justify-center mb-6 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif-heading text-xl font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#0F766E]">
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden animate-slide-up border border-slate-100">
            <div className="relative h-48 overflow-hidden">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white hover:bg-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="absolute bottom-4 left-6 font-serif-heading text-2xl font-bold text-white">
                {selectedService.title}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedService.fullDesc}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Key Service Standards
                </h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0F766E]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onNavigate('contact');
                  }}
                  className="px-5 py-2 bg-[#0F766E] text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
