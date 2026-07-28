-- ====================================================================
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
    ON public.bookings FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on bookings" 
    ON public.bookings FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public read access on tours" 
    ON public.tours FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on tours" 
    ON public.tours FOR INSERT 
    WITH CHECK (true);

-- 5. Insert Sample Seed Data for Bookings
INSERT INTO public.bookings (
    id, tour_id, tour_title, tour_image, travel_date, travelers, total_price, status, payment_status, customer_name, customer_email, special_requests, booking_date
) VALUES 
('BK-8821', 'tour-1', 'Hunza Valley Luxury Silk Road Expedition', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80', '2026-08-15', 2, 4900.00, 'confirmed', 'paid', 'Amina Khan', 'amina.k@example.com', 'Honeymoon arrangement requested.', CURRENT_DATE),
('BK-9042', 'tour-2', 'Skardu & Shangrila Resort Helitrip', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', '2026-09-01', 4, 13800.00, 'confirmed', 'paid', 'David Miller', 'david.m@example.com', 'Dietary preferences: Vegetarian.', CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Sample Seed Data for Tours
INSERT INTO public.tours (
    id, title, location, country, price, duration, category
) VALUES 
('tour-1', 'Hunza Valley Luxury Silk Road Expedition', 'Gilgit-Baltistan', 'Pakistan', 2450.00, '10 Days', 'Cultural Heritage'),
('tour-2', 'Skardu & Shangrila Resort Helitrip', 'Skardu Valley', 'Pakistan', 3450.00, '7 Days', 'Helicopter Tour'),
('tour-3', 'Fairy Meadows & Nanga Parbat Base Camp', 'Diamer District', 'Pakistan', 1850.00, '8 Days', 'Trekking Expedition')
ON CONFLICT (id) DO NOTHING;
