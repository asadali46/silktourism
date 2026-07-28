/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { UserBooking, TourPackage } from '../types';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseUrl.startsWith('http')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Utility function to test Supabase connection status
 */
export async function checkSupabaseConnection() {
  if (!isSupabaseConfigured || !supabase) {
    return {
      connected: false,
      message: 'Supabase integration ready. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in project secrets to connect your database.',
    };
  }

  try {
    const { error } = await supabase.from('bookings').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { connected: true, message: `Connected to Supabase project (${error.message})` };
    }
    return { connected: true, message: 'Successfully connected to Supabase database!' };
  } catch (err: any) {
    return { connected: false, message: err.message || 'Failed to connect to Supabase' };
  }
}

/**
 * Sync / Save booking to Supabase
 */
export async function saveBookingToSupabase(booking: UserBooking) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('bookings').insert([{
      id: booking.id,
      tour_id: booking.tourId,
      tour_title: booking.tourTitle,
      tour_image: booking.tourImage,
      travel_date: booking.travelDate,
      travelers: booking.travelers,
      total_price: booking.totalPrice,
      status: booking.status,
      payment_status: booking.paymentStatus,
      customer_name: booking.customerName,
      customer_email: booking.customerEmail,
      special_requests: booking.specialRequests,
      booking_date: booking.bookingDate,
      created_at: new Date().toISOString()
    }]).select();

    if (error) {
      console.warn('Supabase booking insert notice:', error.message);
    }
    return data;
  } catch (err) {
    console.error('Error saving to Supabase:', err);
    return null;
  }
}

/**
 * Fetch bookings from Supabase
 */
export async function fetchBookingsFromSupabase(): Promise<UserBooking[] | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;

    return data.map((item: any) => ({
      id: item.id || `sup-${Math.random()}`,
      tourId: item.tour_id || 'tour-1',
      tourTitle: item.tour_title || 'Custom Expedition',
      tourImage: item.tour_image || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      travelDate: item.travel_date || new Date().toISOString().split('T')[0],
      travelers: item.travelers || 2,
      totalPrice: item.total_price || 3500,
      status: item.status || 'confirmed',
      paymentStatus: item.payment_status || 'paid',
      customerName: item.customer_name || 'Guest VIP',
      customerEmail: item.customer_email || 'vip@example.com',
      specialRequests: item.special_requests || '',
      bookingDate: item.booking_date || new Date().toISOString().split('T')[0],
    }));
  } catch (err) {
    console.error('Error fetching bookings from Supabase:', err);
    return null;
  }
}

/**
 * Save new tour package to Supabase
 */
export async function saveTourToSupabase(tour: TourPackage) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.from('tours').insert([{
      id: tour.id,
      title: tour.title,
      location: tour.location,
      country: tour.country,
      price: tour.price,
      duration: tour.duration,
      category: tour.category,
      created_at: new Date().toISOString()
    }]).select();

    if (error) {
      console.warn('Supabase tour insert notice:', error.message);
    }
    return data;
  } catch (err) {
    console.error('Error saving tour to Supabase:', err);
    return null;
  }
}
