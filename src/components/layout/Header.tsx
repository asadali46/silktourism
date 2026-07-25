import React, { useState, useEffect } from 'react';
import { PageView } from '../../types';
import { 
  Compass, 
  Search, 
  Heart, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  wishlistCount: number;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
  userRole: 'customer' | 'admin' | null;
  onSelectRole: (role: 'customer' | 'admin' | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenSearch,
  onOpenBooking,
  userRole,
  onSelectRole,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = [
    { code: 'PKR', symbol: 'Rs.', label: 'PKR (Rs.)' },
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'AED', symbol: 'AED', label: 'AED (د.إ)' },
  ];

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Destinations', view: 'destinations' },
    { label: 'Tours', view: 'tours' },
    { label: 'Services', view: 'services' },
    { label: 'Gallery', view: 'gallery' },
    { label: 'Blog', view: 'blog' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#0F766E] text-white text-xs font-medium py-2 px-4 uppercase tracking-widest border-b border-teal-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 text-teal-100">
            <a href="tel:+928008887455" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span className="tracking-normal font-semibold">+92 (800) 888-SILK</span>
            </a>
            <span className="hidden sm:inline text-teal-500">|</span>
            <a href="mailto:concierge@silktourism.pk" className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span className="tracking-normal font-semibold">concierge@silktourism.pk</span>
            </a>
          </div>

          {/* Center Announcement */}
          <div className="flex items-center gap-2 text-white font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>EXPLORE PAKISTAN: 20% OFF ALL NORTHERN LUXURY EXPEDITIONS — CODE: SILKPAK20</span>
          </div>

          {/* Right: Currency & Direct Portals */}
          <div className="flex items-center gap-4 text-teal-100">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-amber-300 text-xs font-medium py-0.5 px-2 rounded hover:bg-teal-800 transition-colors"
                id="currency-selector-btn"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-[#0F172A] border border-slate-800 rounded-lg shadow-xl py-1 z-50 text-xs normal-case">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-800 transition-colors flex items-center justify-between ${
                        currency === curr.code ? 'text-[#0F766E] font-semibold' : 'text-slate-300'
                      }`}
                    >
                      <span>{curr.label}</span>
                      {currency === curr.code && <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-teal-500">|</span>

            {/* Role Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('customer-dashboard')}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  currentView === 'customer-dashboard' 
                    ? 'bg-amber-500 text-white font-bold' 
                    : 'text-teal-100 hover:text-white'
                }`}
              >
                Client
              </button>
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  currentView === 'admin-dashboard' 
                    ? 'bg-slate-900 text-amber-300 font-bold' 
                    : 'text-teal-100 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg py-3 border-b border-slate-200/80' 
            : 'bg-white/90 backdrop-blur-md py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-10 h-10 bg-[#0F766E] rounded-xl flex items-center justify-center text-white shadow-md shadow-teal-900/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-[#0F766E]">
                SILK<span className="text-[#F59E0B]">TOURISM</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`relative py-1 transition-colors ${
                    isActive 
                      ? 'text-[#0F766E] font-bold' 
                      : 'hover:text-[#0F766E]'
                  }`}
                  id={`nav-link-${item.view}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0F766E] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-[#0F766E] hover:bg-slate-100 rounded-full transition-colors relative"
              title="Search Destinations & Tours"
              id="header-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('customer-dashboard')}
              className="p-2 text-slate-500 hover:text-[#0F766E] hover:bg-slate-100 rounded-full transition-colors relative"
              title="Saved Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#F59E0B] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 pr-3 bg-slate-100 hover:bg-slate-200/80 rounded-full text-slate-700 text-xs font-semibold transition-colors"
                id="header-profile-dropdown-btn"
              >
                <div className="w-7 h-7 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
                <span>Account</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Asad Khan</p>
                    <p className="text-[11px] text-slate-500">asad@example.com</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-teal-50 text-[#0F766E] text-[10px] font-bold rounded-full border border-teal-200">
                      VIP Elite Traveler
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onNavigate('customer-dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#0F766E]" />
                    <span>Customer Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('admin-dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Admin Dashboard</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Book Now Primary Button */}
            <button
              onClick={onOpenBooking}
              className="bg-[#0F766E] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-teal-900/20 hover:bg-teal-700 active:scale-95 transition-all flex items-center gap-1.5"
              id="header-book-now-btn"
            >
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-[#0F766E] rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0F766E] rounded-lg focus:outline-none"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    currentView === item.view 
                      ? 'bg-teal-50 text-[#0F766E]' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onNavigate('customer-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center"
                >
                  Client Portal
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold text-center"
                >
                  Admin Portal
                </button>
              </div>

              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#0F766E] text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-teal-900/10 text-center"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
