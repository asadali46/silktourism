import React, { useState, useEffect } from 'react';
import { UserBooking, TourPackage, PageView } from '../types';
import { 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  X, 
  Layers,
  BarChart3,
  CheckCircle2,
  Database,
  Radio,
  RefreshCw,
  Code,
  Copy,
  Check
} from 'lucide-react';
import { isSupabaseConfigured, checkSupabaseConnection } from '../lib/supabase';

interface AdminDashboardProps {
  bookings: UserBooking[];
  tours: TourPackage[];
  onAddTour: (newTour: any) => void;
  onNavigate: (view: PageView) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  tours,
  onAddTour,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'tours' | 'users'>('overview');
  const [isAddTourOpen, setIsAddTourOpen] = useState(false);

  // New Tour Form State
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState(3000);
  const [newDuration, setNewDuration] = useState('7 Days / 6 Nights');

  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const sqlQueries = `-- ====================================================================
-- SILK TOURISM - SUPABASE DATABASE INITIALIZATION SCHEMA
-- Paste these queries into the Supabase SQL Editor (https://app.supabase.com)
-- ====================================================================

-- 1. Create 'bookings' Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY,
    tour_id TEXT NOT NULL,
    tour_title TEXT NOT NULL,
    tour_image TEXT,
    travel_date DATE NOT NULL,
    travelers INTEGER DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'confirmed',
    payment_status TEXT DEFAULT 'paid',
    customer_name TEXT,
    customer_email TEXT,
    special_requests TEXT,
    booking_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create 'tours' Table
CREATE TABLE IF NOT EXISTS public.tours (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    country TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    duration TEXT,
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Enable Row Level Security (RLS) on tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Access Policies (Allows read & insert for anon users)
CREATE POLICY "Allow public read access on bookings" 
    ON public.bookings FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on bookings" 
    ON public.bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on tours" 
    ON public.tours FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on tours" 
    ON public.tours FOR INSERT WITH CHECK (true);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlQueries);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleCreateTour = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTour({
      id: `tour-${Date.now()}`,
      title: newTitle || 'New Custom Expedition',
      location: newLocation || 'Florence, Italy',
      country: 'Italy',
      destinationId: 'dest-1',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      gallery: ['https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'],
      price: newPrice,
      rating: 5.0,
      reviewsCount: 1,
      duration: newDuration,
      groupSize: 'Max 8 Guests',
      category: 'luxury',
      highlights: ['Private Helicopter', 'Michelin Dining'],
      description: 'Exclusive private expedition designed for VIP guests.',
      itinerary: [],
      inclusions: ['5-Star Lodging', 'Private Transfers'],
      exclusions: ['Airfare'],
      upcomingDates: ['Oct 20 - Oct 27'],
    });
    setIsAddTourOpen(false);
    setNewTitle('');
    setNewLocation('');
  };

  const [dbStatus, setDbStatus] = useState<{ connected: boolean; message: string }>({
    connected: false,
    message: 'Checking database connection...',
  });
  const [checkingDb, setCheckingDb] = useState(false);

  const runDbCheck = async () => {
    setCheckingDb(true);
    const res = await checkSupabaseConnection();
    setDbStatus(res);
    setCheckingDb(false);
  };

  useEffect(() => {
    runDbCheck();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0) + 1420000;

  return (
    <div className="pt-24 pb-20 bg-[#0F172A] text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Supabase Status Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${dbStatus.connected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">Supabase Integration</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${isSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                  {isSupabaseConfigured ? 'Client Ready' : 'Configuration Ready'}
                </span>
              </div>
              <p className="text-slate-400 mt-0.5">{dbStatus.message}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="px-3 py-1.5 bg-[#0F766E]/20 hover:bg-[#0F766E]/30 text-teal-300 border border-teal-500/30 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Code className="w-3.5 h-3.5" />
              <span>SQL Setup Queries</span>
            </button>
            <button
              onClick={runDbCheck}
              disabled={checkingDb}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checkingDb ? 'animate-spin' : ''}`} />
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif-heading text-2xl font-bold text-white">Silk Tourism Control Center</h1>
              <p className="text-xs text-slate-400">Executive Portal • Live Operations</p>
            </div>
          </div>

          <button
            onClick={() => setIsAddTourOpen(true)}
            className="px-4 py-2.5 bg-[#0F766E] hover:bg-[#0d645e] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Tour Package</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">YTD Gross Revenue</span>
            <span className="font-serif-heading text-2xl font-extrabold text-amber-400 block mt-1">
              ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs last quarter</span>
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Total Bookings</span>
            <span className="font-serif-heading text-2xl font-extrabold text-white block mt-1">
              1,248
            </span>
            <span className="text-[11px] text-slate-400">98.4% Confirmation Rate</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Active Packages</span>
            <span className="font-serif-heading text-2xl font-extrabold text-[#0F766E] block mt-1">
              {tours.length + 28}
            </span>
            <span className="text-[11px] text-slate-400">6 Continents</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Registered VIPs</span>
            <span className="font-serif-heading text-2xl font-extrabold text-blue-400 block mt-1">
              3,410
            </span>
            <span className="text-[11px] text-slate-400">Elite Travelers</span>
          </div>
        </div>

        {/* Analytics Chart & Recent Bookings Data Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Revenue Chart Visual */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-heading text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <span>Monthly Revenue Trend</span>
              </h3>
              <span className="text-xs text-slate-400">2026 Q3</span>
            </div>

            {/* Custom SVG Bar Visualizer */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-800 px-2">
              {[
                { month: 'Jan', val: 65 },
                { month: 'Feb', val: 78 },
                { month: 'Mar', val: 92 },
                { month: 'Apr', val: 85 },
                { month: 'May', val: 110 },
                { month: 'Jun', val: 135 },
                { month: 'Jul', val: 142 },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    style={{ height: `${item.val}%` }}
                    className="w-full bg-gradient-to-t from-[#0F766E] to-amber-400 rounded-t-lg transition-all hover:brightness-125 cursor-pointer"
                    title={`$${item.val * 10}k`}
                  />
                  <span className="text-[10px] text-slate-400 font-bold">{item.month}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400">Peak bookings registered for Mediterranean yacht charters and Japanese cherry blossom expeditions.</p>
          </div>

          {/* Bookings Data Table */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-heading text-lg font-bold text-white">Recent Guest Reservations</h3>
              <span className="text-xs text-[#0F766E] font-bold">Live Feed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Guest Name</th>
                    <th className="p-3">Expedition</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">{b.id}</td>
                      <td className="p-3 font-semibold text-white">{b.customerName}</td>
                      <td className="p-3 truncate max-w-[160px]">{b.tourTitle}</td>
                      <td className="p-3 font-bold text-emerald-400">${b.totalPrice.toLocaleString()}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-amber-400">BK-7712</td>
                    <td className="p-3 font-semibold text-white">Lady Eleanor Vance</td>
                    <td className="p-3">Kyoto Zen Heritage</td>
                    <td className="p-3 font-bold text-emerald-400">$8,400</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold">
                        confirmed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Add Tour Package Modal */}
      {isAddTourOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif-heading text-lg font-bold">Add New Luxury Tour Package</h3>
              <button onClick={() => setIsAddTourOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTour} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Expedition Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Tuscany Wine & Truffle Châteaux"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g., San Miniato, Italy"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Price / Guest ($)</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0F766E] hover:bg-[#0d645e] font-bold text-xs rounded-xl shadow mt-2"
              >
                Publish Expedition Package
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Supabase SQL Setup Queries Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative text-xs">
            <button
              onClick={() => setIsSqlModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-xl">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Supabase SQL Initialization Script</h3>
                <p className="text-slate-400">Copy & paste these queries into your Supabase SQL Editor</p>
              </div>
            </div>

            <div className="relative mb-4">
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-80 select-all">
                {sqlQueries}
              </pre>
              <button
                onClick={handleCopySql}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-lg"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-xl text-slate-300 space-y-1">
              <p className="font-bold text-teal-300">Quick Instructions:</p>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-400">
                <li>Log in to your <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-teal-400 underline">Supabase Dashboard</a>.</li>
                <li>Go to the <strong>SQL Editor</strong> tab on the left sidebar.</li>
                <li>Click <strong>New Query</strong>, paste the copied SQL above, and click <strong>Run</strong>.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
