import { Destination, TourPackage, ServiceItem, Testimonial, GalleryItem, BlogPost, UserBooking, NotificationItem } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Hunza Valley & Karimabad',
    country: 'Pakistan',
    region: 'gilgit-baltistan',
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Surrounded by 7,000m+ snow-capped peaks including Rakaposhi and Ladyfinger. Discover ancient Baltit Fort, turquoise Attabad Lake, apricot blossom orchards, and warm Mountain hospitality.',
    shortDescription: 'Turquoise lakes, ancient forts, and majestic Rakaposhi views.',
    rating: 4.98,
    reviewsCount: 432,
    startingPrice: 180000,
    popularFor: ['Rakaposhi Views', 'Attabad Boating', 'Baltit Fort', 'Eagle Nest Sunset'],
    featured: true
  },
  {
    id: 'dest-2',
    name: 'Skardu & Deosai Plains',
    country: 'Pakistan',
    region: 'gilgit-baltistan',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Gateway to K2 and the Karakoram giants. Explore the Land of Giants on Deosai Plateau, Katpana Cold Desert, and the iconic Shangrila Resort Lake.',
    shortDescription: 'The Land of Giants, Katpana Cold Desert, and Shangrila Lake.',
    rating: 4.96,
    reviewsCount: 388,
    startingPrice: 220000,
    popularFor: ['Deosai Plateau', 'Cold Desert Stargazing', 'Shangrila Resort', 'Sheosar Lake'],
    featured: true
  },
  {
    id: 'dest-3',
    name: 'Fairy Meadows & Nanga Parbat',
    country: 'Pakistan',
    region: 'gilgit-baltistan',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Enchanted alpine meadows nestled right under the towering face of Nanga Parbat (8,126m). Experience pine-scented mountain air, starry nights, and wilderness luxury.',
    shortDescription: 'Lush alpine glades with unmatched views of Killer Mountain.',
    rating: 4.95,
    reviewsCount: 310,
    startingPrice: 165000,
    popularFor: ['Nanga Parbat Base Trek', 'Pine Log Cabins', 'Stargazing', 'Raikot Glacier'],
    featured: true
  },
  {
    id: 'dest-4',
    name: 'Swat Valley & Kalam',
    country: 'Pakistan',
    region: 'khyber-pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1609839396417-6d6f2d244907?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609839396417-6d6f2d244907?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Known as the Switzerland of the East. Marvel at Mahodand Lake, dense Ushu cedar forests, Malam Jabba ski slopes, and ancient Gandhara Buddhist heritage.',
    shortDescription: 'Emerald glacial lakes, thick pine forests, and ski resorts.',
    rating: 4.92,
    reviewsCount: 290,
    startingPrice: 145000,
    popularFor: ['Mahodand Lake', 'Ushu Forest', 'Malam Jabba Skiing', 'Swat River Rafting'],
    featured: true
  },
  {
    id: 'dest-5',
    name: 'Lahore Mughal Heritage',
    country: 'Pakistan',
    region: 'punjab',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The cultural beating heart of Pakistan. Marvel at Badshahi Mosque, Lahore Fort, Shalimar Gardens, rooftop Haveli dining, and rich Sufi qawwali evenings.',
    shortDescription: 'Grand Mughal architecture, historic Walled City, and gastronomy.',
    rating: 4.97,
    reviewsCount: 512,
    startingPrice: 120000,
    popularFor: ['Badshahi Mosque', 'Lahore Fort', 'Food Street Dining', 'Sufi Qawwali'],
    featured: true
  },
  {
    id: 'dest-6',
    name: 'Neelum Valley & Ratti Gali',
    country: 'Pakistan',
    region: 'azad-kashmir',
    image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Pristine Kashmir river valleys, fairytale hilltop village of Arang Kel, crystal waterfalls, and high-altitude alpine Ratti Gali glacial lake.',
    shortDescription: 'Fairytale villages, river chalets, and glacial blue lakes.',
    rating: 4.94,
    reviewsCount: 245,
    startingPrice: 155000,
    popularFor: ['Ratti Gali Lake', 'Arang Kel Chairlift', 'River Chalets', 'Keran Resort'],
    featured: false
  },
  {
    id: 'dest-7',
    name: 'Chitral & Kalash Valleys',
    country: 'Pakistan',
    region: 'khyber-pakhtunkhwa',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Home to the ancient indigenous Kalasha people with unique culture, colorful festivals, Tirich Mir mountain views, and the world highest Shandur Polo ground.',
    shortDescription: 'Ancient Kalasha heritage, Tirich Mir, and Shandur Polo.',
    rating: 4.91,
    reviewsCount: 198,
    startingPrice: 175000,
    popularFor: ['Kalasha Festivals', 'Shandur Polo', 'Tirich Mir Views', 'Chitral Fort'],
    featured: false
  },
  {
    id: 'dest-8',
    name: 'Gwadar & Makran Coast',
    country: 'Pakistan',
    region: 'balochistan',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Dramatic coastal rock formations along Makran Coastal Highway, Princess of Hope, Hingol National Park mud volcanoes, and pristine Arabian Sea beaches.',
    shortDescription: 'Coastal drives, Princess of Hope, and Arabian Sea luxury.',
    rating: 4.89,
    reviewsCount: 160,
    startingPrice: 160000,
    popularFor: ['Makran Coastal Drive', 'Princess of Hope', 'Kund Malir Beach', 'Gwadar Bay'],
    featured: false
  }
];

export const mockTours: TourPackage[] = [
  {
    id: 'tour-1',
    title: 'Hunza & Attabad Lake Luxury VIP Expedition',
    location: 'Karimabad, Attabad Lake & Khunjerab Pass',
    country: 'Pakistan',
    destinationId: 'dest-1',
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    ],
    price: 195000,
    originalPrice: 230000,
    discountPercentage: 15,
    rating: 4.98,
    reviewsCount: 214,
    duration: '7 Days / 6 Nights',
    groupSize: 'Max 6 Guests',
    category: 'luxury',
    highlights: [
      'Private luxury 4x4 Prado with expert mountain chauffeur',
      'Stay at luxury Serena Hunza & Mulberry Hotel with Rakaposhi view',
      'Private VIP boat charter & jet ski experience on turquoise Attabad Lake',
      'Sunset high-tea over Rakaposhi viewpoint at Eagle\'s Nest'
    ],
    description: 'Immerse yourself in the magical valley of Hunza. Experience 5-star mountain hospitality, private dining overlooking ancient Baltit Fort, and an excursion to the high-altitude Khunjerab Pass at China border.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Gilgit & VIP Prado Transfer to Hunza',
        description: 'Airport reception with traditional Hunza flower garlands. Private Prado transfer along Karakoram Highway with stop at Rakaposhi View Point.',
        meals: 'Welcome Organic Hunza Dinner',
        accommodation: 'Serena Hunza Hotel (5-Star)'
      },
      {
        day: 2,
        title: 'Baltit & Altit Forts Heritage Tour & Eagle\'s Nest',
        description: 'Private guided tour of 800-year-old Baltit Fort, followed by royal gardens walk in Altit and sunset high-tea at Eagle\'s Nest viewpoint.',
        meals: 'Breakfast & Traditional Local Lunch',
        accommodation: 'Serena Hunza Hotel (5-Star)'
      },
      {
        day: 3,
        title: 'Attabad Lake Yacht Cruise & Hussaini Suspension Bridge',
        description: 'Private boat charter across crystal blue Attabad Lake. Thrilling walk over Hussaini Suspension Bridge and Passu Cones photo stops.',
        meals: 'Breakfast & Lakefront Fish Lunch',
        accommodation: 'Mulberry Hotel Hunza'
      },
      {
        day: 4,
        title: 'Khunjerab Pass Expedition (World\'s Highest Border)',
        description: 'Drive through pristine National Park up to Khunjerab Pass (4,693m). Spot Himalayan ibex and enjoy hot chai at the highest ATM.',
        meals: 'Breakfast & High Altitude Picnic',
        accommodation: 'Mulberry Hotel Hunza'
      }
    ],
    inclusions: [
      '5-Star Mountain Resort Accommodations (6 nights)',
      'Private 4x4 Luxury Prado with Fuel & Chauffeur',
      'Attabad Lake Private Yacht Charter',
      'Daily Gourmet Breakfast & Select Specialty Dinners',
      'All Heritage Fort Fees & National Park Passes'
    ],
    exclusions: [
      'Airfare to Gilgit/Islamabad',
      'Personal Souvenir Shopping',
      'Driver Gratuities'
    ],
    featured: true,
    upcomingDates: ['Oct 10 - Oct 17', 'Nov 01 - Nov 08', 'Apr 12 - Apr 19']
  },
  {
    id: 'tour-2',
    title: 'Skardu & Deosai Land of Giants Safari',
    location: 'Skardu, Deosai Plains & Shangrila',
    country: 'Pakistan',
    destinationId: 'dest-2',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80'
    ],
    price: 245000,
    originalPrice: 280000,
    discountPercentage: 12,
    rating: 4.97,
    reviewsCount: 178,
    duration: '8 Days / 7 Nights',
    groupSize: 'Max 8 Guests',
    category: 'adventure',
    highlights: [
      'Executive Lake View Villa stay at iconic Shangrila Resort Skardu',
      '4x4 Jeep expedition into Deosai National Park to Sheosar Lake',
      'Sunset glamping & stargazing in Katpana Cold Desert',
      'Helicopter flight options over K2 Base Camp'
    ],
    description: 'Traverse the legendary landscapes of Baltistan. From the tranquil Shangrila Lake to the high-altitude wilderness of Deosai Plateau where Himalayan brown bears roam.',
    itinerary: [
      {
        day: 1,
        title: 'Scenic Flight into Skardu & Shangrila Resort Check-in',
        description: 'Fly past Nanga Parbat and K2 peaks into Skardu airport. Check in to your private lakefront chalet at Shangrila Resort.',
        meals: 'Welcome Lakefront Dinner',
        accommodation: 'Shangrila Resort Skardu (Luxury Villa)'
      },
      {
        day: 2,
        title: 'Deosai Plains Safari & Sheosar Glacial Lake',
        description: 'Ascend into the Land of Giants. Explore wildflower-covered plateaus, search for wildlife, and picnic at Sheosar Lake.',
        meals: 'Breakfast & High Plateau Picnic',
        accommodation: 'Shangrila Resort Skardu'
      }
    ],
    inclusions: [
      'Shangrila Luxury Lakeview Villa Accommodations',
      'Private 4x4 Jeeps with Skilled Mountain Drivers',
      'Deosai National Park Permits & Guide',
      'All Meals & Cold Desert Stargazing Experience'
    ],
    exclusions: ['Domestic Air Tickets', 'Personal Gear'],
    featured: true,
    upcomingDates: ['Sep 25 - Oct 02', 'Oct 15 - Oct 22', 'May 10 - May 17']
  },
  {
    id: 'tour-3',
    title: 'Royal Lahore Mughal Cultural & Culinary Odyssey',
    location: 'Lahore, Walled City & Badshahi Mosque',
    country: 'Pakistan',
    destinationId: 'dest-5',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
    ],
    price: 135000,
    originalPrice: 160000,
    discountPercentage: 15,
    rating: 4.96,
    reviewsCount: 310,
    duration: '4 Days / 3 Nights',
    groupSize: 'Max 10 Guests',
    category: 'cultural',
    highlights: [
      'Private VIP after-hours tour of Badshahi Mosque & Sheesh Mahal',
      'Exclusive rooftop Haveli dinner overlooking illuminated mosque domes',
      'Private Sufi Qawwali night featuring traditional Ustad musicians',
      'Stay at 5-Star Pearl Continental or Luxury Heritage Haveli'
    ],
    description: 'Step back into Mughal glory in the cultural capital of Pakistan. Experience royal palaces, secret bazaars, mouth-watering Lahori cuisine, and soulful music.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Lahore & Fort Road Haveli Feast',
        description: 'VIP airport escort. Evening rooftop dinner overlooking illuminated Badshahi Mosque with live sitar music.',
        meals: 'Royal Mughal Welcome Dinner',
        accommodation: 'Pearl Continental Lahore (5-Star)'
      }
    ],
    inclusions: [
      '5-Star Luxury Hotel Suite',
      'Chauffeur Mercedes / Fortuner Transfers',
      'Private Heritage Historian Guide',
      'All Fine Dining & Gourmet Street Food Tastings'
    ],
    exclusions: ['Airfare', 'Personal Shopping'],
    featured: true,
    upcomingDates: ['Oct 05 - Oct 09', 'Nov 12 - Nov 16', 'Dec 01 - Dec 05']
  },
  {
    id: 'tour-4',
    title: 'Fairy Meadows & Nanga Parbat VIP Trek',
    location: 'Raikot Bridge, Fairy Meadows & Nanga Parbat',
    country: 'Pakistan',
    destinationId: 'dest-3',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    price: 175000,
    originalPrice: 200000,
    discountPercentage: 12,
    rating: 4.95,
    reviewsCount: 142,
    duration: '5 Days / 4 Nights',
    groupSize: 'Max 6 Guests',
    category: 'wildlife',
    highlights: [
      'Private pine log cabin with fireplace facing Nanga Parbat 8,126m peak',
      'Dedicated pony & porter escort service up Raikot Glacier trail',
      'Special campfire lamb Sajji dinner under dark sky Milky Way galaxy',
      'Guided trek to Beyal Camp & Nanga Parbat View Point'
    ],
    description: 'Experience pure, unadulterated alpine majesty. Trek through enchanted pine woods to Fairy Meadows, where the ice-covered wall of Nanga Parbat dominates the sky.',
    itinerary: [
      {
        day: 1,
        title: '4x4 Mountain Jeep Ride & Hike to Fairy Meadows',
        description: 'Thrilling jeep ride up Raikot Gorge followed by pony/hiking escort to your private wooden cabin.',
        meals: 'Bonfire BBQ Dinner',
        accommodation: 'Fairy Meadows VIP Log Cabins'
      }
    ],
    inclusions: [
      'Private VIP Cabin Accommodation',
      'Mountain Jeeps & Pony Escort Services',
      'All Meals & Mountain Chef Services',
      'First Aid & Trekking Guide'
    ],
    exclusions: ['Trekking Equipment', 'Gratuities'],
    featured: true,
    upcomingDates: ['Oct 01 - Oct 05', 'Nov 10 - Nov 14']
  }
];

export const mockServices: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Domestic Tours',
    shortDesc: 'Premium guided tours across Northern Pakistan, Hunza, Skardu, Swat, Kashmir, and Mughal Heritage cities.',
    fullDesc: 'Explore the breathtaking landscapes of Pakistan with our meticulously planned domestic tour packages. Enjoy luxury Prado transportation, handpicked 5-star mountain resort stays, and experienced local guides across Hunza, Skardu, Fairy Meadows, Swat Valley, and historic Lahore.',
    iconName: 'Compass',
    features: ['Luxury 4x4 Prado Transport', '5-Star Resort Accommodations', 'Local Professional Guides', '24/7 Concierge Support'],
    image: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-2',
    title: 'International Tours',
    shortDesc: 'Seamless worldwide holiday packages with full flight, hotel, and visa facilitation.',
    fullDesc: 'Embark on unforgettable international adventures with Silk Tourism. We curate tailor-made international travel itineraries across Turkey, UAE, Malaysia, Thailand, Azerbaijan, Europe, and beyond with flight bookings, luxury stays, and guided sightseeing.',
    iconName: 'Globe',
    features: ['Worldwide Flight Bookings', 'Curated Sightseeing Tours', 'International Visa Support', 'Luxury Airport Transfers'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-3',
    title: 'Umrah Packages',
    shortDesc: 'Spiritual Umrah journeys with VIP Makkah & Madinah hotel options, visa support, and transport.',
    fullDesc: 'Perform your spiritual pilgrimage with comfort and peace of mind. Silk Tourism offers customized Economy, Executive, and VIP Umrah packages featuring direct flight reservations, closest Haram hotel stays in Makkah and Madinah, private Ziyarat tours, and full ground transport.',
    iconName: 'Heart',
    features: ['Close-to-Haram Hotel Stays', 'Fast-Track Umrah Visa', 'Private Ziyarat Transportation', '24/7 Dedicated Muallim Assistance'],
    image: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-4',
    title: 'Group Tours',
    shortDesc: 'Fun, well-organized fixed-departure group trips for adventure enthusiasts, students, and travelers.',
    fullDesc: 'Join our friendly and vibrant fixed-departure group tours to Pakistan’s top tourist destinations. Perfect for solo travelers, friends, and adventure groups looking for budget-friendly yet highly comfortable, organized, and safe group travel.',
    iconName: 'Users',
    features: ['Fixed Weekly Departures', 'Experienced Tour Leaders', 'Group Bonfire & Musical Nights', 'Budget-Friendly Rates'],
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-5',
    title: 'Family Trips',
    shortDesc: 'Safe, stress-free, and memorable vacation packages specially tailored for families of all sizes.',
    fullDesc: 'Create cherished family memories with our family-first vacation planning. We prioritize child-friendly activities, comfortable family suites, safe transportation, and flexible travel paces to ensure every family member feels relaxed and cared for.',
    iconName: 'Heart',
    features: ['Family Suite Reservations', 'Child-Friendly Activities & Meals', 'Private Chauffeur Security', 'Flexible Itinerary Pacing'],
    image: 'https://images.unsplash.com/photo-1476514525535-ce74f45814ce?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-6',
    title: 'Corporate Tours',
    shortDesc: 'Bespoke corporate retreats, team-building trips, executive conferences, and incentive travel.',
    fullDesc: 'Elevate your company retreats with Silk Tourism corporate solutions. We organize high-impact corporate retreats, team-building mountain expeditions, annual executive getaways, and conference logistical support tailored to your organization.',
    iconName: 'Briefcase',
    features: ['Executive Conference Facilities', 'Team-Building Mountain Activities', 'Corporate Billing & GST Invoicing', 'Dedicated Event Coordinator'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-7',
    title: 'Honeymoon Packages',
    shortDesc: 'Romantic luxury getaways with romantic decor, private candlelit dinners, and serene resorts.',
    fullDesc: 'Begin your journey together with magical romantic itineraries in Pakistan or abroad. Enjoy flower-adorned resort suites, private lake cruises in Hunza & Shangrila, candlelit dinners under starry mountain skies, and VIP privacy.',
    iconName: 'Sparkles',
    features: ['Romantic Room Setup & Flowers', 'Private Candlelit Dinners', 'Luxury Resort Suite Upgrades', 'Complimentary Honeymoon Cake'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-8',
    title: 'Hotel Bookings',
    shortDesc: 'Exclusive corporate & luxury rates at Serena Hotels, Shangrila Resort, PC Hotels, and boutique stays.',
    fullDesc: 'Access discounted rates and room guarantees at Pakistan’s finest luxury resorts and boutique hotels. Benefit from complimentary breakfast, VIP room upgrades, and priority check-in through our direct hotel partnerships.',
    iconName: 'Hotel',
    features: ['Direct Hotel Contracting Rates', 'Serena & Shangrila Preferred Partner', 'Complimentary Room Upgrades', 'Instant Confirmation'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-9',
    title: 'Transport Services',
    shortDesc: 'Late-model fleet of Toyota Land Cruiser Prados, Fortuners, Coasters, and Hi-Ace vans with drivers.',
    fullDesc: 'Reliable, comfortable, and safe ground transportation services. Rent late-model Toyota Land Cruiser Prados, Fortuners, Grand Cabins, Coasters, and sedans driven by certified professional high-altitude mountain drivers.',
    iconName: 'Car',
    features: ['Experienced Mountain Chauffeurs', 'Clean & Sanitized Fleet', 'Fuel & All Toll Taxes Included', '24/7 GPS Tracking & Support'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-10',
    title: 'Customized Packages',
    shortDesc: '100% tailor-made travel plans built according to your schedule, budget, and specific preferences.',
    fullDesc: 'Have a unique travel dream in mind? Our travel experts work one-on-one with you to design custom trip itineraries according to your exact dates, desired activities, accommodation preferences, and budget.',
    iconName: 'Sliders',
    features: ['100% Flexible Day-by-Day Plan', 'Custom Budget Optimization', 'Personal Travel Architect', 'Instant Quotation Support'],
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sardar Hamza Alvi',
    role: 'Corporate Director & Explorer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment: 'Silk Tourism organized our luxury Hunza & Skardu expedition with immaculate detail. From private Prado chauffeurs to executive lake suites at Shangrila, everything was 5-star perfection.',
    tourTaken: 'Hunza & Attabad Lake Luxury Expedition',
    date: 'June 2026',
    location: 'Karachi, Pakistan'
  },
  {
    id: 'test-2',
    name: 'Amina & Zain Malik',
    role: 'Architectural Historians',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment: 'Our cultural retreat in Lahore surpassed all expectations. The after-hours private tour of Badshahi Mosque and rooftop Haveli dinner were moments we will cherish forever.',
    tourTaken: 'Royal Lahore Cultural Odyssey',
    date: 'May 2026',
    location: 'Islamabad, Pakistan'
  },
  {
    id: 'test-3',
    name: 'Dr. Tariq Chaudhry',
    role: 'Physician & Mountain Photographer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    comment: 'The Fairy Meadows log cabin trek facing Nanga Parbat was breathtaking. Silk Tourism\'s concierge team took care of all mountain safety, ponies, and chef services effortlessly.',
    tourTaken: 'Fairy Meadows VIP Wilderness Trek',
    date: 'April 2026',
    location: 'Lahore, Pakistan'
  }
];

export const mockGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Turquoise Waters of Attabad Lake',
    category: 'luxury',
    location: 'Hunza Valley, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Ali Raza Khan'
  },
  {
    id: 'gal-2',
    title: 'Sunset over Katpana Cold Desert',
    category: 'mountain',
    location: 'Skardu, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Shahid Hussain'
  },
  {
    id: 'gal-3',
    title: 'Majestic Face of Nanga Parbat',
    category: 'mountain',
    location: 'Fairy Meadows, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Usman Ghani'
  },
  {
    id: 'gal-4',
    title: 'Illuminated Badshahi Mosque Domes',
    category: 'culture',
    location: 'Lahore, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Fatima Zafar'
  },
  {
    id: 'gal-5',
    title: 'Emerald Waters of Mahodand Lake',
    category: 'mountain',
    location: 'Swat Valley, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1609839396417-6d6f2d244907?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Bilal Ahmad'
  },
  {
    id: 'gal-6',
    title: 'Glacial Beauty of Ratti Gali Lake',
    category: 'mountain',
    location: 'Neelum Valley, Pakistan',
    imageUrl: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80',
    photographer: 'Kashif Mahmood'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Golden Autumn of Hunza: A Guide to Pakistan\'s Most Magical Season',
    slug: 'golden-autumn-hunza-guide',
    excerpt: 'Discover why autumn turns Hunza Valley into a shimmering golden paradise of apricot trees, snowy peaks, and crystal waters.',
    content: `Autumn in Hunza Valley is widely acclaimed as one of the most magnificent natural spectacles on earth. From late October to mid-November, poplar and apricot trees transform the valley floor into a fiery canvas of crimson, amber, and gold, set against the stark white peak of Rakaposhi (7,788m).

### 1. The Apricot Orchard Trails
Stroll through centuries-old stone villages like Altit and Karimabad, where locals dry golden apricots on flat rooftops. Enjoy fresh walnut cakes and local herbal teas at quaint cliffside cafes.

### 2. Boating on Attabad Lake Under Golden Skies
Contrast the fiery autumn foliage with the vivid turquoise waters of Attabad Lake. Renting a private boat at sunset offers unrivaled mirror reflections of Passu Cones.

### 3. Starry Nights at Eagle's Nest
Perched at 2,800m above Karimabad, Eagle's Nest provides a 360-degree panorama of five 7,000m+ peaks illuminated by sunset rays and crisp starlit skies.`,
    coverImage: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. Shahzad Qureshi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      role: 'Senior Travel Writer'
    },
    category: 'Pakistan Insights',
    readTime: '6 min read',
    publishedAt: 'July 20, 2026',
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Crossing the Land of Giants: What to Expect in Deosai National Park',
    slug: 'crossing-land-of-giants-deosai',
    excerpt: 'At an average elevation of 4,114m, Deosai is the second-highest alpine plateau on Earth. Here is how to experience it in total luxury.',
    content: 'Spanning over 3,000 square kilometers between Skardu and Astore, Deosai Plains offers vast rolling green carpeted hills dotted with golden marmots and the elusive Himalayan brown bear.',
    coverImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Mariam Farooq',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'Northern Wilderness Specialist'
    },
    category: 'Adventure',
    readTime: '5 min read',
    publishedAt: 'July 12, 2026',
    featured: false
  },
  {
    id: 'blog-3',
    title: 'Royal Mughal Gastronomy & Night Walks in Old Lahore',
    slug: 'lahore-mughal-gastronomy-guide',
    excerpt: 'Explore ancient Haveli rooftops, aromatic spice markets, and secret culinary spots inside the historic Walled City of Lahore.',
    content: 'Lahore’s culinary heritage spans Mughal emperors, Sikh royalty, and British colonial traditions. Experience slow-cooked Nihari, charcoal-grilled Seekh Kebabs, and authentic Kheer.',
    coverImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Chef Bilal Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      role: 'Culinary Consultant'
    },
    category: 'Culture & Food',
    readTime: '7 min read',
    publishedAt: 'June 30, 2026',
    featured: false
  }
];

export const mockUserBookings: UserBooking[] = [
  {
    id: 'BK-9281',
    tourId: 'tour-1',
    tourTitle: 'Islamabad - Skardu - Hunza Grand Circuit Expedition',
    tourImage: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1200&q=80',
    bookingDate: '2026-07-15',
    travelDate: '2026-08-01',
    travelers: 2,
    totalPrice: 390000,
    status: 'confirmed',
    paymentStatus: 'paid',
    customerName: 'Asad Khan',
    customerEmail: 'asad2406f@aptechsite.net',
    customerPhone: '03432126930',
    specialRequests: 'Halal organic food preference; VIP 4x4 Prado transfer confirmed.',
    routeTracker: {
      currentStopIndex: 1,
      currentLocationName: 'Skardu Valley',
      nextLocationName: 'Hunza & Attabad Lake',
      overallStatus: 'En Route',
      driverName: 'Captain Tariq Shah',
      driverPhone: '0343 2126930',
      vehicleNumber: 'LEB-4921 (Toyota Prado 4x4)',
      stops: [
        {
          id: 'stop-1',
          name: 'Islamabad (Departure)',
          status: 'completed',
          date: 'Aug 01, 2026',
          stayHotel: 'Serena Hotel Islamabad',
          activities: ['Airport Meet & Greet', 'Briefing Session', 'Private Flight to Skardu'],
          notes: 'Departed Islamabad airport on schedule at 08:30 AM.',
          weather: '32°C Sunny'
        },
        {
          id: 'stop-2',
          name: 'Skardu & Shangrila Lake',
          status: 'active',
          date: 'Aug 02 - Aug 04, 2026',
          stayHotel: 'Shangrila Resort Skardu',
          activities: ['Upper Kachura Lake Boating', 'Deosai Plains Safari', 'Cold Desert Sunset'],
          notes: 'Currently checked into Shangrila Resort. Deosai Jeep tour completed.',
          weather: '21°C Clear Skies'
        },
        {
          id: 'stop-3',
          name: 'Hunza Valley & Attabad Lake',
          status: 'upcoming',
          date: 'Aug 05 - Aug 07, 2026',
          stayHotel: 'Luxus Grand Hunza',
          activities: ['Altit & Baltit Forts', 'Attabad Turquoise Lake Cruise', 'Hussaini Suspension Bridge Walk'],
          notes: 'Transfer scheduled via Karakoram Highway at 09:00 AM.',
          weather: '19°C Pleasant'
        },
        {
          id: 'stop-4',
          name: 'Khunjerab Pass (Pak-China Border)',
          status: 'upcoming',
          date: 'Aug 08, 2026',
          stayHotel: 'Passu Cones Lodge',
          activities: ['World highest ATM visit', 'Passu Cones view point', 'Glacier trek'],
          notes: 'Passu Jeep excursion arranged.',
          weather: '8°C Chilly'
        },
        {
          id: 'stop-5',
          name: 'Return to Islamabad',
          status: 'upcoming',
          date: 'Aug 09, 2026',
          stayHotel: 'N/A (Flight Return)',
          activities: ['Gilgit Airport transfer', 'Flight back to Islamabad', 'Drop-off at residence'],
          notes: 'Final drop-off scheduled.',
          weather: '31°C Sunny'
        }
      ]
    }
  },
  {
    id: 'BK-8842',
    tourId: 'tour-3',
    tourTitle: 'Royal Lahore & Swat Valley Cultural Explorer',
    tourImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    bookingDate: '2026-06-01',
    travelDate: '2026-06-15',
    travelers: 2,
    totalPrice: 270000,
    status: 'completed',
    paymentStatus: 'paid',
    customerName: 'Asad Khan',
    customerEmail: 'asad2406f@aptechsite.net',
    customerPhone: '03432126930',
    routeTracker: {
      currentStopIndex: 3,
      currentLocationName: 'Islamabad (Tour Finished)',
      nextLocationName: 'Completed',
      overallStatus: 'Tour Completed',
      driverName: 'Farhan Ali',
      driverPhone: '0343 2126930',
      vehicleNumber: 'ICT-1082',
      stops: [
        {
          id: 'stop-101',
          name: 'Lahore Walled City',
          status: 'completed',
          date: 'Jun 15, 2026',
          stayHotel: 'Pearl Continental Lahore',
          weather: '35°C Sunny'
        },
        {
          id: 'stop-102',
          name: 'Swat Valley & Malam Jabba',
          status: 'completed',
          date: 'Jun 18, 2026',
          stayHotel: 'Swat Serena Hotel',
          weather: '24°C Breezy'
        },
        {
          id: 'stop-103',
          name: 'Islamabad Return',
          status: 'completed',
          date: 'Jun 21, 2026',
          stayHotel: 'Home',
          weather: '33°C Sunny'
        }
      ]
    }
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Booking Confirmed!',
    message: 'Your Hunza & Attabad Lake Luxury VIP Expedition (#BK-9281) has been confirmed by your concierge.',
    timestamp: '2 hours ago',
    read: false,
    type: 'booking'
  },
  {
    id: 'notif-2',
    title: 'Special Autumn Offer Unlocked',
    message: 'Enjoy 20% off on all Northern Pakistan luxury tours with code SILKPAK20.',
    timestamp: '1 day ago',
    read: false,
    type: 'offer'
  },
  {
    id: 'notif-3',
    title: 'Flight Schedule Confirmed',
    message: 'Your Skardu direct flight tickets and 4x4 Prado transfer schedule have been finalized.',
    timestamp: '3 days ago',
    read: true,
    type: 'system'
  }
];
