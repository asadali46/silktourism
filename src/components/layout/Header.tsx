import React, { useState, useEffect } from 'react';
import { PageView } from '../../types';
import { SilkLogo } from '../common/SilkLogo';
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
  Award,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  LogIn
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
  onOpenAuthModal: () => void;
  onLogout: () => void;
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
  onOpenAuthModal,
  onLogout,
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
      <div className="bg-gradient-to-r from-[#0D5C56] via-[#0F766E] to-[#115E59] text-white text-[11px] font-semibold py-1.5 px-4 tracking-wider border-b border-teal-800/60 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 text-teal-100">
            <a href="tel:+923432126930" className="flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Phone className="w-3 h-3 text-amber-300" />
              <span className="font-bold tracking-tight">+92 343 2126930</span>
            </a>
            <span className="hidden sm:inline text-teal-500/80">|</span>
            <a href="mailto:concierge@silktourism.pk" className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors">
              <Mail className="w-3 h-3 text-amber-300" />
              <span className="font-semibold tracking-tight">concierge@silktourism.pk</span>
            </a>
          </div>

          {/* Center Announcement */}
          <div className="flex items-center gap-2 text-white font-bold tracking-wide uppercase text-[10px] sm:text-[11px]">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>20% OFF NORTHERN LUXURY EXPEDITIONS — CODE: <strong className="text-amber-300">SILKPAK20</strong></span>
          </div>

          {/* Right: Currency & Direct Portals */}
          <div className="flex items-center gap-4 text-teal-100">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-white hover:text-amber-300 font-bold py-0.5 px-2.5 rounded-full bg-teal-900/40 hover:bg-teal-900/70 border border-teal-600/40 transition-all text-[11px]"
                id="currency-selector-btn"
              >
                <Globe className="w-3 h-3 text-amber-300" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-teal-200" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-[#0F172A] border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 text-xs font-medium">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-800/80 transition-colors flex items-center justify-between ${
                        currency === curr.code ? 'text-[#0F766E] font-bold' : 'text-slate-300'
                      }`}
                    >
                      <span>{curr.label}</span>
                      {currency === curr.code && <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200/90' 
            : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-slate-200/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer group flex items-center py-0.5"
            id="brand-logo"
          >
            <SilkLogo variant="horizontal" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-bold text-slate-700 uppercase tracking-wider">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`relative py-1.5 transition-all ${
                    isActive 
                      ? 'text-[#0F766E] font-extrabold' 
                      : 'hover:text-[#0F766E]'
                  }`}
                  id={`nav-link-${item.view}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0F766E] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-[#0F766E] hover:bg-slate-100/80 rounded-full transition-colors relative"
              title="Search Destinations & Tours"
              id="header-search-btn"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => onNavigate('customer-dashboard')}
              className="p-2 text-slate-600 hover:text-[#0F766E] hover:bg-slate-100/80 rounded-full transition-colors relative"
              title="Saved Wishlist & Bookings"
              id="header-wishlist-btn"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#F59E0B] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Auth Section */}
            {!userRole ? (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-4 py-2 border border-teal-700/30 hover:border-[#0F766E] text-slate-800 hover:text-[#0F766E] hover:bg-teal-50/50 rounded-full text-xs font-bold transition-all bg-white shadow-sm"
                id="header-login-btn"
              >
                <User className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Sign In / Register</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-3 bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200/80 rounded-full text-[#0F766E] text-xs font-bold transition-colors shadow-sm"
                  id="header-profile-dropdown-btn"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    AK
                  </div>
                  <span>My Account</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#0F766E]" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">Asad Khan</p>
                      <p className="text-[11px] text-slate-500">asad2406f@aptechsite.net</p>
                      <span className="inline-block mt-1 px-2.5 py-0.5 bg-teal-50 text-[#0F766E] text-[10px] font-bold rounded-full border border-teal-200">
                        Traveler Account
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('customer-dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-bold"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0F766E]" />
                      <span>My Bookings & Trip Tracker</span>
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-bold"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
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
              className="p-2 text-slate-700 hover:text-[#0F766E] rounded-xl hover:bg-slate-100 transition-colors"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#0F766E]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => {
                    onNavigate(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
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
              {!userRole ? (
                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#0F766E] hover:bg-teal-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Register Account</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate('customer-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-teal-50 hover:bg-teal-100 text-[#0F766E] rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 border border-teal-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>My Bookings & Trip Tracker</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
