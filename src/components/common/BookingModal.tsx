import React, { useState } from 'react';
import { X, Calendar, Users, Shield, CheckCircle, Sparkles, CreditCard, ChevronRight } from 'lucide-react';
import { TourPackage } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTour: TourPackage | null;
  tours: TourPackage[];
  currency: string;
  onCompleteBooking: (bookingDetails: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedTour,
  tours,
  currency,
  onCompleteBooking,
}) => {
  const activeTour = selectedTour || tours[0];
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [travelDate, setTravelDate] = useState(activeTour?.upcomingDates[0] || '2026-10-12');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('Asad Khan');
  const [email, setEmail] = useState('asad@example.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Addons
  const [addons, setAddons] = useState({
    helicopter: false,
    insurance: true,
    photographer: false,
    fineDining: true,
  });

  if (!isOpen || !activeTour) return null;

  const addonPrices = {
    helicopter: 750,
    insurance: 180,
    photographer: 350,
    fineDining: 240,
  };

  const calculateAddonsTotal = () => {
    let sum = 0;
    if (addons.helicopter) sum += addonPrices.helicopter;
    if (addons.insurance) sum += addonPrices.insurance;
    if (addons.photographer) sum += addonPrices.photographer;
    if (addons.fineDining) sum += addonPrices.fineDining;
    return sum;
  };

  const tourSubtotal = activeTour.price * guests;
  const addonsTotal = calculateAddonsTotal();
  const grandTotal = tourSubtotal + addonsTotal;

  const handleNextStep = () => {
    if (step < 3) setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteBooking({
      tourId: activeTour.id,
      tourTitle: activeTour.title,
      tourImage: activeTour.image,
      travelDate,
      guests,
      grandTotal,
      fullName,
      email,
      phone,
      specialRequests,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 animate-slide-up border border-slate-100">
        
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white p-6 relative flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              VIP Reservation Concierge
            </span>
            <h2 className="font-serif-heading text-xl font-bold">{activeTour.title}</h2>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{activeTour.location}</span> • <span>{activeTour.duration}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-semibold">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#0F766E]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#0F766E] text-white' : 'bg-slate-200'}`}>1</span>
            <span>Dates & Guests</span>
          </div>
          <div className="w-8 h-px bg-slate-200"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#0F766E]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#0F766E] text-white' : 'bg-slate-200'}`}>2</span>
            <span>Luxury Upgrades</span>
          </div>
          <div className="w-8 h-px bg-slate-200"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#0F766E]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#0F766E] text-white' : 'bg-slate-200'}`}>3</span>
            <span>Guest Information</span>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Departure Date
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeTour.upcomingDates.map((dateStr) => (
                    <button
                      key={dateStr}
                      type="button"
                      onClick={() => setTravelDate(dateStr)}
                      className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        travelDate === dateStr
                          ? 'border-[#0F766E] bg-teal-50/50 text-[#0F766E] shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-[#0F766E] mb-1" />
                      <span>{dateStr}</span>
                      <span className="block text-[10px] text-slate-400 font-normal mt-0.5">Guaranteed Departure</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Number of Travelers
                </label>
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200 w-fit">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 font-bold hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-900 w-12 text-center">{guests} Guests</span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 font-bold hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Reservation Policy Note */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <div className="flex justify-between text-xs text-slate-700 font-bold">
                  <span>Selected Package:</span>
                  <span className="text-[#0F766E]">{activeTour.title}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Party Size:</span>
                  <span className="font-semibold text-slate-900">{guests} Guests</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between text-xs font-bold text-slate-900">
                  <span>Quotation:</span>
                  <span className="text-[#0F766E]">Custom Quote Provided On Confirmation</span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Bespoke VIP Add-ons
              </h3>

              <div className="space-y-3">
                {[
                  {
                    key: 'helicopter',
                    title: 'Private Airport Helicopter Transfer',
                    price: 750,
                    desc: 'Direct tarmac transfer to your resort suite via luxury twin-engine helicopter.'
                  },
                  {
                    key: 'insurance',
                    title: 'Comprehensive Platinum Travel & Medical Evacuation',
                    price: 180,
                    desc: '100% Cancel-For-Any-Reason coverage + emergency airlift.'
                  },
                  {
                    key: 'photographer',
                    title: 'Private Personal Vacation Photographer',
                    price: 350,
                    desc: 'Half-day photo session with professional high-resolution edited gallery.'
                  },
                  {
                    key: 'fineDining',
                    title: 'Michelin-Starred Sommelier Wine Pairing',
                    price: 240,
                    desc: 'Exclusive rare vintage wine selections during multi-course dinners.'
                  }
                ].map((addon) => {
                  const isChecked = addons[addon.key as keyof typeof addons];
                  return (
                    <label
                      key={addon.key}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#0F766E] bg-teal-50/40 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setAddons({ ...addons, [addon.key]: e.target.checked })
                        }
                        className="mt-1 accent-[#0F766E] rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{addon.title}</span>
                          <span className="text-xs font-bold text-[#0F766E]">VIP Service</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{addon.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleFinish} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone (WhatsApp enabled)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Preferences or Dietary Notes</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Anniversary celebration, dietary restrictions, quiet suite..."
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                ></textarea>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Custom Rate Quote</p>
                  <p className="text-[11px] text-slate-500">Includes all taxes, fees & VIP concierge service</p>
                </div>
                <span className="font-serif-heading text-sm font-bold text-[#0F766E]">
                  Price on Request
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0F766E] hover:bg-[#0d645e] text-white py-3.5 rounded-2xl text-xs font-bold tracking-wide shadow-xl shadow-teal-900/10 flex items-center justify-center gap-2 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Confirm VIP Reservation Request</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 3 && (
          <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1) as 1 | 2)}
              disabled={step === 1}
              className={`px-4 py-2 text-xs font-bold rounded-xl ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-[#0F766E] hover:bg-[#0d645e] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
