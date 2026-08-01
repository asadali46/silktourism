export type PageView = 
  | 'home'
  | 'destinations'
  | 'tours'
  | 'tour-detail'
  | 'services'
  | 'gallery'
  | 'blog'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'customer-dashboard'
  | 'admin-dashboard';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'gilgit-baltistan' | 'khyber-pakhtunkhwa' | 'punjab' | 'sindh' | 'balochistan' | 'azad-kashmir' | string;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  popularFor: string[];
  featured?: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  location: string;
  country: string;
  destinationId: string;
  image: string;
  gallery: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  duration: string; // e.g., "7 Days / 6 Nights"
  groupSize: string; // e.g., "Max 12 People"
  category: 'luxury' | 'adventure' | 'cultural' | 'honeymoon' | 'wildlife' | 'cruise';
  highlights: string[];
  description: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    meals: string;
    accommodation: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  featured?: boolean;
  upcomingDates: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  tourTaken: string;
  date: string;
  location: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'beach' | 'mountain' | 'culture' | 'luxury' | 'wildlife';
  location: string;
  imageUrl: string;
  photographer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
}

export interface RouteStop {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'upcoming';
  date: string;
  stayHotel?: string;
  activities?: string[];
  notes?: string;
  weather?: string;
}

export interface RouteTrackerInfo {
  currentStopIndex: number;
  currentLocationName: string;
  nextLocationName: string;
  overallStatus: 'En Route' | 'Preparing Departure' | 'Tour Completed' | 'On Schedule';
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  stops: RouteStop[];
}

export interface UserBooking {
  id: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  bookingDate: string;
  travelDate: string;
  travelers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'refunded';
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  specialRequests?: string;
  routeTracker?: RouteTrackerInfo;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'booking' | 'offer' | 'system';
}

export interface FilterOptions {
  searchQuery: string;
  destination: string;
  category: string;
  priceRange: [number, number];
  duration: string;
  sortBy: 'recommended' | 'price-low' | 'price-high' | 'rating';
}
