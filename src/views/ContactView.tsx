import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, ChevronDown, CheckCircle2, Facebook } from 'lucide-react';

interface ContactViewProps {
  onShowToast: (title: string, message?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destinationInterest: '',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Inquiry Received', 'Your personal travel architect will contact you within 2 hours.');
    setFormData({ name: '', email: '', phone: '', destinationInterest: '', message: '' });
  };

  const faqs = [
    {
      q: 'How far in advance should I book my luxury tour?',
      a: 'We recommend booking 3 to 6 months in advance for peak season voyages (such as Kyoto cherry blossom or European summer). However, our concierge team can organize last-minute private jet trips within 48 hours.'
    },
    {
      q: 'Are all Silk Tourism tours customizable?',
      a: 'Yes, 100% of our itineraries can be adjusted. You can modify hotel suites, add helicopter transfers, or adjust daily paces around your preferences.'
    },
    {
      q: 'What is your cancellation & refund policy?',
      a: 'We provide Virtuoso-level cancellation protection. Most bookings allow complimentary date modifications up to 30 days prior to departure.'
    },
    {
      q: 'Do you arrange private jet charters & airport tarmac escorts?',
      a: 'Yes, our aviation desk manages commercial First Class routing and private aircraft charters globally with tarmac fast-track clearance.'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-[#0F172A] text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            24/7 VIP Concierge
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold">
            Contact Our Architects
          </h1>
          <p className="mt-4 text-slate-300 text-sm">
            Whether planning a honeymoon, private family charter, or corporate retreat, our global concierge desk is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Contact Info & Direct WhatsApp */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">
                Pakistan Headquarters
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#0F766E] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Islamabad Flagship Office</p>
                    <p>Blue Area, Sector G-7/2, Islamabad, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Telephone Concierge & Business Account</p>
                    <p>+92 343 2126930 (0343-2126930)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Direct Email</p>
                    <p>concierge@silktourism.pk</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Instant WhatsApp Desk</span>
                    </p>
                    <p className="text-[11px] text-slate-500">Business WhatsApp: 0343 2126930 (24/7 Support)</p>
                  </div>
                  <a
                    href="https://wa.me/923432126930"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                  >
                    Chat
                  </a>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span>Official Facebook Page</span>
                    </p>
                    <p className="text-[11px] text-slate-500">Follow us for travel updates & live dispatches</p>
                  </div>
                  <a
                    href="https://www.facebook.com/share/18yQxjLYec/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors whitespace-nowrap"
                  >
                    Visit Page
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-xl space-y-6">
              <h3 className="font-serif-heading text-2xl font-bold text-slate-900">
                Send A VIP Travel Request
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asad Khan"
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. asad@example.com"
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Desired Destination</label>
                    <select
                      value={formData.destinationInterest}
                      onChange={(e) => setFormData({ ...formData, destinationInterest: e.target.value })}
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none bg-white cursor-pointer"
                    >
                      <option value="">Select Destination</option>
                      <option value="hunza">Hunza Valley, Gilgit-Baltistan</option>
                      <option value="skardu">Skardu & Deosai Plains</option>
                      <option value="swat">Swat Valley & Malam Jabba</option>
                      <option value="lahore">Royal Mughal Lahore</option>
                      <option value="kumrat">Kumrat Valley, KP</option>
                      <option value="gwadar">Gwadar Coastal Highway & Ormara</option>
                      <option value="custom">Custom Multi-Region Pakistan Expedition</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Travel Intent & Expectations</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about dates, guest count, preferred style of travel, or specific interests..."
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#0F766E] focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0F766E] hover:bg-[#0d645e] text-white rounded-2xl text-xs font-bold tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-6 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="font-serif-heading text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 mt-1">Everything you need to know about our luxury booking process.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-900"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
