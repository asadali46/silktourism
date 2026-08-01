import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Lock } from 'lucide-react';
import { PageView, TourPackage, Destination, GalleryItem, UserBooking, NotificationItem } from './types';
import { 
  saveBookingToSupabase, 
  fetchBookingsFromSupabase, 
  saveTourToSupabase, 
  isSupabaseConfigured 
} from './lib/supabase';
import { 
  mockDestinations, 
  mockTours, 
  mockServices, 
  mockTestimonials, 
  mockGallery, 
  mockBlogPosts, 
  mockUserBookings, 
  mockNotifications 
} from './data/mockData';

// Layout & Common
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Toast, ToastMessage } from './components/common/Toast';
import { BookingModal } from './components/common/BookingModal';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';
import { Lightbox } from './components/common/Lightbox';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Sections (Homepage)
import { HeroSection } from './components/sections/HeroSection';
import { PopularDestinations } from './components/sections/PopularDestinations';
import { FeaturedTours } from './components/sections/FeaturedTours';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { SpecialOffers } from './components/sections/SpecialOffers';
import { ServicesSection } from './components/sections/ServicesSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { TravelGallery } from './components/sections/TravelGallery';
import { BlogSection } from './components/sections/BlogSection';

// Page Views
import { DestinationsView } from './views/DestinationsView';
import { ToursView } from './views/ToursView';
import { TourDetailView } from './views/TourDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CustomerDashboard } from './views/CustomerDashboard';
import { AdminDashboard } from './views/AdminDashboard';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<PageView>('home');

  // Currency & Role State
  const [currency, setCurrency] = useState<string>('PKR');
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>('customer');

  // Data Collections State
  const [destinations] = useState<Destination[]>(mockDestinations);
  const [tours, setTours] = useState<TourPackage[]>(mockTours);
  const [userBookings, setUserBookings] = useState<UserBooking[]>(mockUserBookings);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [wishlist, setWishlist] = useState<string[]>(['tour-1']);

  // Selected State
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(tours[0]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(destinations[0]);

  // Modal Controls
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const handleLogin = (userData: { name: string; email: string; phone: string }) => {
    setUserRole('customer');
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${userData.name}!`, 'Accessing your bookings & live trip tracker.');
    handleNavigate('customer-dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    addToast('Signed out successfully', undefined, 'info');
    handleNavigate('home');
  };

  const handleBookNowAction = (tour?: TourPackage) => {
    if (tour) {
      setSelectedTour(tour);
    }
    setIsBookingOpen(false);
    handleNavigate('destinations');
    if (!userRole) {
      setIsAuthModalOpen(true);
    }
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load initial remote bookings if Supabase is connected
  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchBookingsFromSupabase().then((remoteBookings) => {
        if (remoteBookings && remoteBookings.length > 0) {
          setUserBookings((prev) => {
            const combined = [...remoteBookings, ...prev];
            // Deduplicate by ID
            const uniqueMap = new Map();
            combined.forEach((item) => uniqueMap.set(item.id, item));
            return Array.from(uniqueMap.values());
          });
        }
      });
    }
  }, []);

  // Handlers
  const handleToggleWishlist = (tourId: string) => {
    setWishlist((prev) => {
      if (prev.includes(tourId)) {
        addToast('Removed from Wishlist', undefined, 'info');
        return prev.filter((id) => id !== tourId);
      } else {
        addToast('Saved to Wishlist!', 'You can review saved tours in your Guest Portal.');
        return [...prev, tourId];
      }
    });
  };

  const handleCompleteBooking = async (details: any) => {
    const newBooking: UserBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      tourId: details.tourId,
      tourTitle: details.tourTitle,
      tourImage: details.tourImage,
      bookingDate: new Date().toISOString().split('T')[0],
      travelDate: details.travelDate,
      travelers: details.guests,
      totalPrice: details.grandTotal,
      status: 'confirmed',
      paymentStatus: 'paid',
      customerName: details.fullName,
      customerEmail: details.email,
      specialRequests: details.specialRequests,
    };

    setUserBookings((prev) => [newBooking, ...prev]);

    // Save to Supabase
    if (isSupabaseConfigured) {
      await saveBookingToSupabase(newBooking);
    }

    // Add Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'VIP Reservation Confirmed!',
        message: `Your booking for ${details.tourTitle} has been recorded. Reference: ${newBooking.id}`,
        timestamp: 'Just now',
        read: false,
        type: 'booking',
      },
      ...prev,
    ]);

    addToast('VIP Reservation Confirmed!', `Booking ${newBooking.id} created successfully.`);
  };

  const handleAddTour = async (newTourPackage: TourPackage) => {
    setTours((prev) => [newTourPackage, ...prev]);
    if (isSupabaseConfigured) {
      await saveTourToSupabase(newTourPackage);
    }
    addToast('New Tour Package Created!', `"${newTourPackage.title}" is now published.`);
  };

  const handleNewsletterSubscribe = (email: string) => {
    addToast('Welcome to Silk Travel Circle!', `Invitations will be sent to ${email}`);
  };

  // Helper to scroll to top on navigation
  const handleNavigate = (view: PageView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistTours = tours.filter((t) => wishlist.includes(t.id));

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] flex flex-col font-sans selection:bg-[#0F766E] selection:text-white">
      
      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        wishlistCount={wishlist.length}
        currency={currency}
        onCurrencyChange={(c) => {
          setCurrency(c);
          addToast(`Currency updated to ${c}`);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => handleBookNowAction()}
        userRole={userRole}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection
              destinations={destinations}
              onSearchSubmit={(params) => {
                handleNavigate('tours');
                addToast('Search Applied', `Showing results for ${params.destination || 'all locations'}`);
              }}
              onNavigate={handleNavigate}
            />

            <PopularDestinations
              destinations={destinations}
              onNavigate={handleNavigate}
              onSelectDestination={(d) => setSelectedDestination(d)}
            />

            <FeaturedTours
              tours={tours.filter((t) => t.featured)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectTour={(t) => setSelectedTour(t)}
              onNavigate={handleNavigate}
              onOpenBooking={(t) => handleBookNowAction(t)}
            />

            <WhyChooseUs />

            <SpecialOffers
              onNavigate={handleNavigate}
              onOpenBooking={() => handleBookNowAction()}
            />

            <ServicesSection
              services={mockServices}
              onNavigate={handleNavigate}
            />

            <TestimonialsSection testimonials={mockTestimonials} />

            <TravelGallery
              galleryItems={mockGallery}
              onOpenLightbox={(item) => setLightboxItem(item)}
            />

            <BlogSection
              posts={mockBlogPosts}
              onNavigate={handleNavigate}
            />
          </>
        )}

        {currentView === 'destinations' && (
          <DestinationsView
            destinations={destinations}
            tours={tours}
            onSelectDestination={(d) => setSelectedDestination(d)}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleBookNowAction()}
          />
        )}

        {currentView === 'tours' && (
          <ToursView
            tours={tours}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectTour={(t) => setSelectedTour(t)}
            onNavigate={handleNavigate}
            onOpenBooking={(t) => handleBookNowAction(t)}
          />
        )}

        {currentView === 'tour-detail' && (
          <TourDetailView
            tour={selectedTour}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
            onOpenBooking={(t) => handleBookNowAction(t)}
          />
        )}

        {currentView === 'services' && (
          <div className="pt-24">
            <ServicesSection services={mockServices} onNavigate={handleNavigate} />
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="pt-24">
            <TravelGallery galleryItems={mockGallery} onOpenLightbox={(item) => setLightboxItem(item)} />
          </div>
        )}

        {currentView === 'blog' && (
          <div className="pt-24">
            <BlogSection posts={mockBlogPosts} onNavigate={handleNavigate} />
          </div>
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactView onShowToast={addToast} />
        )}

        {currentView === 'customer-dashboard' && (
          userRole === 'customer' ? (
            <CustomerDashboard
              bookings={userBookings}
              notifications={notifications}
              wishlistTours={wishlistTours}
              onRemoveWishlist={handleToggleWishlist}
              onNavigate={handleNavigate}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          ) : (
            <div className="pt-32 pb-20 px-4 max-w-xl mx-auto text-center">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
                <div className="w-16 h-16 bg-teal-50 border border-teal-200 rounded-full flex items-center justify-center mx-auto text-[#0F766E]">
                  <User className="w-8 h-8" />
                </div>
                <h2 className="font-serif-heading text-2xl font-bold text-slate-900">Traveler Account Required</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sign in or create a traveler account to view your confirmed bookings, printable e-ticket vouchers, and live multi-destination route tracking (Islamabad ➡️ Skardu ➡️ Hunza).
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex-1 py-3 bg-[#0F766E] hover:bg-teal-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                  >
                    Sign In / Register Account
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('customer');
                    }}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider"
                  >
                    Demo Traveler View
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {currentView === 'admin-dashboard' && (
          userRole === 'admin' ? (
            <AdminDashboard
              bookings={userBookings}
              tours={tours}
              onAddTour={handleAddTour}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="pt-32 pb-20 px-4 max-w-xl mx-auto text-center">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
                <div className="w-16 h-16 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mx-auto text-amber-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="font-serif-heading text-2xl font-bold text-slate-900">Admin Portal Authorization Required</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Administrator credentials are required to manage tour packages, client bookings, and travel analytics. Sign in with admin privileges or continue exploring in guest mode.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl font-bold text-xs uppercase tracking-wider shadow"
                  >
                    Sign In as Admin
                  </button>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs uppercase tracking-wider"
                  >
                    Guest Mode (Explore Site)
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {(currentView === 'faq' || currentView === 'privacy' || currentView === 'terms') && (
          <ContactView onShowToast={addToast} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSubscribeNewsletter={handleNewsletterSubscribe}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        destinations={destinations}
        tours={tours}
        onSelectTour={(t) => {
          setSelectedTour(t);
          handleNavigate('tour-detail');
        }}
        onNavigate={handleNavigate}
      />

      {/* Global Multi-Step Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTour={selectedTour}
        tours={tours}
        currency={currency}
        onCompleteBooking={handleCompleteBooking}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Global Lightbox */}
      <Lightbox
        item={lightboxItem}
        items={mockGallery}
        onClose={() => setLightboxItem(null)}
        onNavigate={(item) => setLightboxItem(item)}
      />

      {/* Floating Direct WhatsApp Chat Button */}
      <WhatsAppButton />

    </div>
  );
}
