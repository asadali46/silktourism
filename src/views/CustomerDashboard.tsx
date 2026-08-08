import React, { useState } from 'react';
import { UserBooking, NotificationItem, TourPackage, PageView, RouteStop } from '../types';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Navigation, 
  Phone, 
  User, 
  FileText, 
  Printer, 
  X, 
  Heart, 
  Bell, 
  PlusCircle, 
  Compass, 
  ShieldCheck, 
  Share2, 
  MessageSquare,
  ChevronRight,
  CloudSun,
  Bed,
  Car
} from 'lucide-react';

interface CustomerDashboardProps {
  bookings: UserBooking[];
  notifications: NotificationItem[];
  wishlistTours: TourPackage[];
  onRemoveWishlist: (tourId: string) => void;
  onNavigate: (view: PageView) => void;
  onOpenBooking: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  bookings,
  notifications,
  wishlistTours,
  onRemoveWishlist,
  onNavigate,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'bookings' | 'custom-trip' | 'wishlist' | 'profile'>('tracker');
  const [selectedBookingTicket, setSelectedBookingTicket] = useState<UserBooking | null>(null);

  // Custom multi-city trip builder state
  const [customCities, setCustomCities] = useState<string[]>(['Islamabad', 'Skardu', 'Hunza']);
  const [customStartDate, setCustomStartDate] = useState<string>('2026-09-01');
  const [customGuests, setCustomGuests] = useState<number>(2);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [customSubmitted, setCustomSubmitted] = useState<boolean>(false);

  // Active multi-leg booking for live tracking
  const activeMultiLegBooking = bookings.find((b) => b.routeTracker) || bookings[0];

  const handlePrintTicket = () => {
    window.print();
  };

  const toggleCitySelection = (city: string) => {
    setCustomCities((prev) => 
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleCustomTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Traveler Welcome Header */}
        <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#0F766E]/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#0F766E] flex items-center justify-center text-white font-serif-heading text-2xl font-bold shadow-lg border border-teal-400/30">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold">Welcome, Asad Khan</h1>
                <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold rounded-full uppercase">
                  Verified Traveler
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span>Email: asad2406f@aptechsite.net</span>
                <span>•</span>
                <span>Phone: 0343 2126930</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-[#0F766E] hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>Book New Package</span>
            </button>
            <a
              href="https://wa.me/923432126930"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm mb-8 no-scrollbar">
          {[
            { id: 'tracker', label: '📍 Live Trip & Route Tracker', icon: Navigation },
            { id: 'bookings', label: '📅 My Bookings & Tickets', icon: FileText, badge: bookings.length },
            { id: 'custom-trip', label: '🧭 Custom Multi-City Plan', icon: PlusCircle },
            { id: 'wishlist', label: '❤️ Saved Favorites', icon: Heart, badge: wishlistTours.length },
            { id: 'profile', label: '👤 Traveler Details', icon: User },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0F766E] text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE MULTI-DESTINATION ROUTE TRACKER */}
        {activeTab === 'tracker' && (
          <div className="space-y-8">
            {activeMultiLegBooking && activeMultiLegBooking.routeTracker ? (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-8">
                
                {/* Tracker Top Banner */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        {activeMultiLegBooking.routeTracker.overallStatus}
                      </span>
                      <span className="text-xs font-bold text-slate-400">Booking Ref: {activeMultiLegBooking.id}</span>
                    </div>
                    <h2 className="font-serif-heading text-2xl font-bold text-slate-900">
                      {activeMultiLegBooking.tourTitle}
                    </h2>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
                      <span>Current Location: <strong className="text-slate-800">{activeMultiLegBooking.routeTracker.currentLocationName}</strong></span>
                      <span>•</span>
                      <span>Next Stop: <strong className="text-[#0F766E]">{activeMultiLegBooking.routeTracker.nextLocationName}</strong></span>
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBookingTicket(activeMultiLegBooking)}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-bold shadow flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>View / Print Tour Voucher</span>
                  </button>
                </div>

                {/* Multi-Destination Route Timeline Pipeline */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#0F766E]" />
                    <span>Multi-Destination Route Timeline (Islamabad ➡️ Skardu ➡️ Hunza)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {activeMultiLegBooking.routeTracker.stops.map((stop, idx) => {
                      const isCompleted = stop.status === 'completed';
                      const isActive = stop.status === 'active';
                      return (
                        <div 
                          key={stop.id}
                          className={`p-4 rounded-2xl border transition-all relative ${
                            isActive
                              ? 'bg-teal-50/70 border-teal-500 shadow-md ring-2 ring-teal-500/20'
                              : isCompleted
                              ? 'bg-slate-50 border-slate-200 opacity-90'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                              isActive
                                ? 'bg-[#0F766E] text-white'
                                : isCompleted
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}>
                              {isCompleted ? '✓' : idx + 1}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-teal-600 text-white'
                                : isCompleted
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {isActive ? 'CURRENT STOP' : isCompleted ? 'FINISHED' : 'UPCOMING'}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-slate-900 leading-snug">{stop.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 font-medium">{stop.date}</p>
                          {stop.stayHotel && (
                            <p className="text-[10px] text-[#0F766E] font-semibold mt-1 flex items-center gap-1">
                              <Bed className="w-3 h-3" />
                              <span className="truncate">{stop.stayHotel}</span>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Current Active Location Deep-Dive & Logistics Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                  
                  {/* Active Location Card */}
                  <div className="lg:col-span-2 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                        <h4 className="font-bold text-sm text-slate-900">Active Stop Details: Skardu & Shangrila Lake</h4>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                        <CloudSun className="w-3.5 h-3.5" />
                        <span>21°C Clear Skies</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Currently stationed at <strong>Shangrila Resort Skardu</strong>. All 4x4 Jeep transfers to Deosai Plains and Upper Kachura Lake are operating smoothly.
                    </p>

                    <div className="space-y-2 pt-1">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Scheduled Activities Today:</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {['Upper Kachura Lake Wooden Boat Ride', 'Deosai Plains Wildlife Safari', 'Cold Desert Katpana Sunset View', 'Local Trout Dinner at Resort'].map((act, i) => (
                          <li key={i} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Driver & Logistics Card */}
                  <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-amber-300 mb-3">
                        <Car className="w-5 h-5" />
                        <h4 className="font-bold text-sm">Tour Driver & Vehicle Info</h4>
                      </div>
                      
                      <div className="space-y-2.5 text-xs text-slate-300">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Assigned Guide & Driver</span>
                          <span className="font-bold text-white text-sm">{activeMultiLegBooking.routeTracker.driverName}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Vehicle Details</span>
                          <span className="font-semibold text-teal-300">{activeMultiLegBooking.routeTracker.vehicleNumber}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Direct WhatsApp Contact</span>
                          <span className="font-bold text-amber-300">{activeMultiLegBooking.routeTracker.driverPhone}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/923432126930?text=Hello%20Captain%20Tariq,%20I%20am%20inquiring%20about%20my%20Skardu%20tour%20status%20(Booking%20Ref:%20${activeMultiLegBooking.id})`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-2 shadow"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Contact Driver on WhatsApp</span>
                    </a>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4">
                <Compass className="w-12 h-12 text-[#0F766E] mx-auto" />
                <h3 className="font-serif-heading text-xl font-bold text-slate-900">No Active Multi-Destination Trip Trackers</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  You currently have no active multi-city trips en route. Book a tour or plan a custom multi-destination itinerary across Islamabad, Skardu, and Hunza to enable live tracking!
                </p>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow"
                >
                  Book Multi-City Tour Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MY BOOKINGS & PRINTABLE VOUCHERS */}
        {activeTab === 'bookings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-slate-900">My Travel Bookings</h3>
                <p className="text-xs text-slate-500">View confirmed reservations and download your official travel vouchers.</p>
              </div>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow"
              >
                + New Booking
              </button>
            </div>

            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={b.tourImage} alt={b.tourTitle} referrerPolicy="no-referrer" className="w-24 h-24 rounded-xl object-cover" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0F766E]">{b.id}</span>
                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase">
                          {b.status}
                        </span>
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full uppercase">
                          {b.paymentStatus}
                        </span>
                      </div>
                      <h4 className="font-serif-heading text-base font-bold text-slate-900">{b.tourTitle}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-3">
                        <span>📅 Departure: {b.travelDate}</span>
                        <span>👥 {b.travelers} Guests</span>
                        <span>PKR {b.totalPrice.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                    <button
                      onClick={() => setSelectedBookingTicket(b)}
                      className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-300" />
                      <span>E-Ticket Voucher</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM MULTI-CITY TRIP PLANNER */}
        {activeTab === 'custom-trip' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold mb-2">
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Custom Travel Architecture</span>
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">Plan a Custom Multi-Destination Circuit</h3>
              <p className="text-xs text-slate-500 max-w-2xl mt-1">
                Select your desired destinations (e.g. Islamabad ➡️ Skardu ➡️ Hunza ➡️ Naran) and customize your departure dates and transport preferences.
              </p>
            </div>

            {customSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif-heading text-xl font-bold text-slate-900">Custom Multi-Leg Itinerary Received!</h4>
                <p className="text-xs text-slate-600 max-w-lg mx-auto">
                  Your custom route request for <strong>{customCities.join(' ➡️ ')}</strong> starting on <strong>{customStartDate}</strong> has been submitted. Our concierge team will send you a tailored 4x4 Jeep itinerary & luxury hotel package on WhatsApp (0343 2126930).
                </p>
                <button
                  onClick={() => setCustomSubmitted(false)}
                  className="px-6 py-2.5 bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow"
                >
                  Create Another Plan
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomTripSubmit} className="space-y-6">
                
                {/* Select Multi-City Destinations */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Circuit Destinations (Choose Multiple)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Islamabad', 'Skardu', 'Hunza', 'Naran Valley', 'Swat Valley', 'Fairy Meadows', 'Gilgit', 'Neelum Kashmir'].map((city) => {
                      const isSelected = customCities.includes(city);
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => toggleCitySelection(city)}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{city}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Date & Guest Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Target Travel Date
                    </label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Number of Passengers / Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={customGuests}
                      onChange={(e) => setCustomGuests(parseInt(e.target.value) || 1)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Special Preferences (Hotels, Prado 4x4 Jeep, Helicopter transfer)
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Need 5-star hotel in Skardu, 4x4 Prado for Deosai Plains, and photographer."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0F766E] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-amber-300" />
                  <span>Submit Custom Multi-Leg Circuit Request</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: SAVED WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
            <h3 className="font-serif-heading text-xl font-bold text-slate-900">Saved Wishlist Tours</h3>
            {wishlistTours.length === 0 ? (
              <p className="text-xs text-slate-500">Your wishlist is currently empty. Explore tours to save your favorites!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistTours.map((tour) => (
                  <div key={tour.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative space-y-2">
                    <button
                      onClick={() => onRemoveWishlist(tour.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white rounded-full text-slate-400 hover:text-rose-500 shadow"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img src={tour.image} alt={tour.title} referrerPolicy="no-referrer" className="w-full h-36 rounded-xl object-cover" />
                    <h4 className="font-serif-heading text-sm font-bold text-slate-900">{tour.title}</h4>
                    <p className="text-xs text-slate-500">{tour.duration} • {tour.location}</p>
                    <div className="flex justify-between items-center text-xs pt-2">
                      <span className="font-bold text-[#0F766E]">PKR {tour.price.toLocaleString()}</span>
                      <button
                        onClick={() => onNavigate('tours')}
                        className="px-3 py-1.5 bg-[#0F766E] text-white text-xs font-bold rounded-lg"
                      >
                        View Package
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: TRAVELER PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <h3 className="font-serif-heading text-xl font-bold text-slate-900">Traveler Profile Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input type="text" defaultValue="Asad Khan" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" defaultValue="asad2406f@aptechsite.net" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                <input type="tel" defaultValue="0343 2126930" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Emergency Contact Number</label>
                <input type="tel" defaultValue="+92 343 2126930" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Your traveler details are secured and used exclusively for hotel check-ins and travel permits in Gilgit-Baltistan and Khyber Pakhtunkhwa.
            </p>
          </div>
        )}

      </div>

      {/* PRINTABLE E-TICKET VOUCHER MODAL */}
      {selectedBookingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedBookingTicket(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Ticket Card */}
            <div id="printable-ticket" className="border border-slate-300 rounded-2xl p-6 bg-slate-50 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xl font-extrabold text-[#0F766E] font-serif-heading">SILK<span className="text-[#F59E0B]">TOURISM</span></span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Official E-Ticket & Tour Pass</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
                    {selectedBookingTicket.status}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{selectedBookingTicket.id}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Expedition Package</span>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedBookingTicket.tourTitle}</h4>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Traveler Name</span>
                    <span className="font-bold text-slate-800">{selectedBookingTicket.customerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Contact Phone</span>
                    <span className="font-bold text-slate-800">{selectedBookingTicket.customerPhone || '0343 2126930'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Departure Date</span>
                    <span className="font-bold text-[#0F766E]">{selectedBookingTicket.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Guest Count</span>
                    <span className="font-bold text-slate-800">{selectedBookingTicket.travelers} Guests</span>
                  </div>
                </div>

                {selectedBookingTicket.routeTracker && (
                  <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 space-y-1">
                    <span className="text-[10px] font-bold text-[#0F766E] uppercase block">Circuit Route Stops</span>
                    <p className="text-xs font-semibold text-slate-800">
                      {selectedBookingTicket.routeTracker.stops.map(s => s.name).join(' ➡️ ')}
                    </p>
                    <p className="text-[10px] text-slate-600">Assigned 4x4 Jeep: {selectedBookingTicket.routeTracker.vehicleNumber}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">24/7 Concierge Hotline</span>
                  <span className="text-xs font-bold text-slate-800">+92 343 2126930</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 block">PAID IN FULL</span>
                  <span className="text-xs font-extrabold text-slate-900">PKR {selectedBookingTicket.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrintTicket}
                className="flex-1 py-3 bg-[#0F766E] hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Ticket PDF</span>
              </button>
              <button
                onClick={() => setSelectedBookingTicket(null)}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
