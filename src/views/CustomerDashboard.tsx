import React, { useState } from 'react';
import { UserBooking, NotificationItem, TourPackage, PageView } from '../types';
import { 
  LayoutDashboard, 
  Bookmark, 
  Heart, 
  Bell, 
  User, 
  Settings, 
  Calendar, 
  CreditCard, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  X, 
  Sparkles,
  LogOut
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
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'wishlist' | 'notifications' | 'profile' | 'settings'>('overview');

  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;
  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Guest Welcome Header */}
        <div className="bg-[#0F172A] text-white p-8 rounded-3xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0F766E] to-amber-500 flex items-center justify-center text-white font-serif-heading text-2xl font-bold shadow-lg">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-heading text-2xl sm:text-3xl font-bold">Welcome, Asad Khan</h1>
                <span className="px-2.5 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold rounded-full uppercase">
                  VIP Elite Member
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                asad@example.com • Member since 2024
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#0d645e] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book New Voyage</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white p-3 rounded-3xl border border-slate-200/80 shadow-sm space-y-1">
              {[
                { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
                { id: 'bookings', label: 'My Bookings', icon: Calendar, badge: bookings.length },
                { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, badge: wishlistTours.length },
                { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter((n) => !n.read).length },
                { id: 'profile', label: 'Guest Profile', icon: User },
                { id: 'settings', label: 'Account Settings', icon: Settings },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0F766E] text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{tab.label}</span>
                    </div>
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
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-9 space-y-6">
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Upcoming Expeditions</span>
                    <span className="font-serif-heading text-3xl font-extrabold text-[#0F766E] block mt-1">
                      {confirmedCount}
                    </span>
                    <span className="text-[11px] text-slate-500">Guaranteed departures</span>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Completed Voyages</span>
                    <span className="font-serif-heading text-3xl font-extrabold text-amber-500 block mt-1">
                      {completedCount}
                    </span>
                    <span className="text-[11px] text-slate-500">Memories created</span>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">VIP Tier</span>
                    <span className="font-serif-heading text-2xl font-extrabold text-slate-900 block mt-1">
                      Elite Concierge
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold">VIP Perks Active</span>
                  </div>
                </div>

                {/* Recent Booking Activity */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-serif-heading text-lg font-bold text-slate-900">Recent Booking</h3>
                  {bookings.length > 0 ? (
                    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                      <img
                        src={bookings[0].tourImage}
                        alt={bookings[0].tourTitle}
                        referrerPolicy="no-referrer"
                        className="w-full md:w-32 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded-full uppercase">
                            {bookings[0].status}
                          </span>
                          <span className="text-xs text-slate-400">ID: {bookings[0].id}</span>
                        </div>
                        <h4 className="font-serif-heading text-sm font-bold text-slate-900">{bookings[0].tourTitle}</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-3">
                          <span>📅 Date: {bookings[0].travelDate}</span>
                          <span>👥 {bookings[0].travelers} Guests</span>
                        </p>
                      </div>
                      <div className="text-right font-serif-heading text-sm font-bold text-[#0F766E]">
                        Confirmed Reservation
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No active bookings.</p>
                  )}
                </div>

              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-serif-heading text-xl font-bold text-slate-900">My Travel Bookings</h3>
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={b.tourImage} alt={b.tourTitle} referrerPolicy="no-referrer" className="w-20 h-20 rounded-xl object-cover" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#0F766E]">{b.id}</span>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                              {b.status}
                            </span>
                          </div>
                          <h4 className="font-serif-heading text-sm font-bold text-slate-900 mt-1">{b.tourTitle}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Travel Date: {b.travelDate} • {b.travelers} Guests</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-serif-heading text-sm font-bold text-slate-900 block">Confirmed Reservation</span>
                        <span className="text-[10px] text-emerald-600 font-bold block">Status Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-serif-heading text-xl font-bold text-slate-900">Saved Wishlist Expeditions</h3>
                {wishlistTours.length === 0 ? (
                  <p className="text-xs text-slate-500">Your wishlist is empty. Explore our tours to save your favorites!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistTours.map((tour) => (
                      <div key={tour.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative space-y-2">
                        <button
                          onClick={() => onRemoveWishlist(tour.id)}
                          className="absolute top-3 right-3 p-1.5 bg-white rounded-full text-slate-400 hover:text-rose-500 shadow"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img src={tour.image} alt={tour.title} referrerPolicy="no-referrer" className="w-full h-32 rounded-xl object-cover" />
                        <h4 className="font-serif-heading text-sm font-bold text-slate-900">{tour.title}</h4>
                        <div className="flex justify-between items-center text-xs pt-1">
                          <span className="font-bold text-[#0F766E]">Inquire Rate</span>
                          <button
                            onClick={() => onNavigate('tours')}
                            className="px-3 py-1 bg-[#0F766E] text-white text-[10px] font-bold rounded-lg"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-serif-heading text-xl font-bold text-slate-900">Notifications</h3>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3 text-xs">
                      <Bell className="w-4 h-4 text-[#0F766E] mt-0.5" />
                      <div>
                        <h5 className="font-bold text-slate-900">{n.title}</h5>
                        <p className="text-slate-600 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'profile' || activeTab === 'settings') && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-xs text-slate-700">
                <h3 className="font-serif-heading text-xl font-bold text-slate-900">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-500">Name</label>
                    <input type="text" defaultValue="Asad Khan" className="w-full p-2 bg-slate-50 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-500">Email</label>
                    <input type="email" defaultValue="asad@example.com" className="w-full p-2 bg-slate-50 border rounded-xl" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">All information is protected by Virtuoso strict privacy standards.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
