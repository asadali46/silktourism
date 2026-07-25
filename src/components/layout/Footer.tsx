import React from 'react';
import { PageView } from '../../types';
import { 
  Compass, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Globe 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: PageView) => void;
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSubscribeNewsletter }) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribeNewsletter(email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F766E] to-amber-500 flex items-center justify-center text-white shadow-lg">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-serif-heading text-2xl font-bold tracking-tight text-white block leading-none">
                  Silk <span className="text-[#0F766E]">Tourism</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block mt-0.5">
                  Luxury Travel Architecture
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover Pakistan, One Journey at a Time. Silk Tourism crafts bespoke luxury expeditions, ultra-private mountain retreats, and culturally rich heritage journeys across Pakistan.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0F766E]" />
                <span>Blue Area, Sector G-7/2, Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0F766E]" />
                <span>+92 (800) 888-SILK / +92 (51) 555-7455</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0F766E]" />
                <span>concierge@silktourism.pk</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all transform hover:-translate-y-0.5"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-serif">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', view: 'home' },
                { label: 'All Destinations', view: 'destinations' },
                { label: 'Featured Tour Packages', view: 'tours' },
                { label: 'Bespoke Services', view: 'services' },
                { label: 'Travel Photography Gallery', view: 'gallery' },
                { label: 'Journal & Stories', view: 'blog' },
                { label: 'Our Story & Vision', view: 'about' },
                { label: 'Contact Concierge', view: 'contact' },
              ].map((item) => (
                <li key={item.view}>
                  <button
                    onClick={() => onNavigate(item.view as PageView)}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#0F766E] text-xs">›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-serif">Destinations</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Hunza Valley, Gilgit', 'Skardu & Deosai Plains', 'Swat & Kalam Valley', 'Royal Mughal Lahore', 'Fairy Meadows & Nanga Parbat', 'Kumrat Valley, KP', 'Naran & Kaghan Valley', 'Gwadar Coastal Highway'].map((dest, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate('destinations')}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#0F766E]"></span>
                    <span>{dest}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider font-serif">Support & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customer-dashboard')} className="hover:text-amber-400 transition-colors">
                  VIP Guest Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-amber-400 transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#0F766E] flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-white">Virtuoso Partner</p>
                  <p className="text-[10px] text-slate-400">Verified Luxury Guarantee</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Box */}
        <div className="py-8 border-b border-slate-800/80 my-2">
          <div className="bg-gradient-to-r from-slate-900 via-[#0F766E]/20 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-white flex items-center gap-2">
                <span>Join Silk Travel Circle</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 font-sans font-semibold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Exclusive Invitations
                </span>
              </h3>
              <p className="text-slate-400 text-xs mt-1 max-w-xl">
                Receive private invitations to non-public luxury tours, last-minute yacht openings, and seasonal travel dispatches.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your VIP email address..."
                required
                className="bg-slate-950 border border-slate-700 text-white text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#0F766E] w-full md:w-64 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="bg-[#0F766E] hover:bg-[#0d645e] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shadow-md"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Silk Tourism Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => onNavigate('faq')} className="hover:text-slate-300">Security & Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
