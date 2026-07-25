import React, { useState } from 'react';
import { PageView, TourPackage, Destination, GalleryItem, UserBooking, NotificationItem } from './types';
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
import { Lightbox } from './components/common/Lightbox';

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
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

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

  const handleCompleteBooking = (details: any) => {
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

  const handleAddTour = (newTourPackage: TourPackage) => {
    setTours((prev) => [newTourPackage, ...prev]);
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
        onOpenBooking={() => {
          setSelectedTour(tours[0]);
          setIsBookingOpen(true);
        }}
        userRole={userRole}
        onSelectRole={setUserRole}
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
              onOpenBooking={(t) => {
                setSelectedTour(t);
                setIsBookingOpen(true);
              }}
            />

            <WhyChooseUs />

            <SpecialOffers
              onNavigate={handleNavigate}
              onOpenBooking={() => {
                setSelectedTour(tours[0]);
                setIsBookingOpen(true);
              }}
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
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentView === 'tours' && (
          <ToursView
            tours={tours}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectTour={(t) => setSelectedTour(t)}
            onNavigate={handleNavigate}
            onOpenBooking={(t) => {
              setSelectedTour(t);
              setIsBookingOpen(true);
            }}
          />
        )}

        {currentView === 'tour-detail' && (
          <TourDetailView
            tour={selectedTour}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
            onOpenBooking={(t) => {
              setSelectedTour(t);
              setIsBookingOpen(true);
            }}
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
          <CustomerDashboard
            bookings={userBookings}
            notifications={notifications}
            wishlistTours={wishlistTours}
            onRemoveWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            bookings={userBookings}
            tours={tours}
            onAddTour={handleAddTour}
            onNavigate={handleNavigate}
          />
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

      {/* Global Lightbox */}
      <Lightbox
        item={lightboxItem}
        items={mockGallery}
        onClose={() => setLightboxItem(null)}
        onNavigate={(item) => setLightboxItem(item)}
      />

    </div>
  );
}
