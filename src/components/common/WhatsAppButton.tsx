import React, { useState } from 'react';
import { MessageCircle, X, ShieldCheck } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '923432126930',
  defaultMessage = 'Hello Silk Tourism, I would like to inquire about your travel packages and concierge services.',
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end group">
      {/* Tooltip / Speech Bubble */}
      {showTooltip && (
        <div className="mb-3 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 text-xs font-semibold flex items-center gap-2.5 max-w-xs animate-bounce-subtle relative">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <div>
            <div className="flex items-center gap-1 font-bold text-slate-900 text-[11px]">
              <span>Silk WhatsApp Concierge</span>
              <ShieldCheck className="w-3 h-3 text-[#0F766E]" />
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">Instant tour support & custom bookings</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors ml-1"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-100 transform rotate-45" />
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative bg-[#25D366] hover:bg-[#20be5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group-hover:shadow-[#25D366]/40"
        aria-label="Chat with Admin on WhatsApp"
        id="whatsapp-floating-btn"
      >
        {/* Pulse effect background */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:animate-none pointer-events-none" />

        {/* Official WhatsApp Vector Icon */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlSpace="preserve"
        >
          <path d="M12.012 2C6.5 2 2.012 6.488 2.012 12c0 2.112.65 4.075 1.763 5.7L2 22l4.425-1.725C8.013 21.363 9.938 22 12.012 22c5.513 0 10-4.488 10-10s-4.487-10-10-10zm5.663 14.188c-.238.675-1.375 1.312-1.925 1.362-.513.05-1.175.225-3.8-0.825-3.35-1.338-5.488-4.788-5.65-5.013-.163-.225-1.338-1.787-1.338-3.412 0-1.625.85-2.425 1.15-2.738.3-.312.65-.387.875-.387.225 0 .45 0 .638.013.2.013.475-.075.738.562.275.663.925 2.262 1.013 2.438.087.175.137.387.025.612-.113.225-.175.363-.35.563-.175.2-.363.45-.525.613-.175.175-.363.362-.15.725.213.363.95 1.562 2.038 2.525 1.4 1.238 2.575 1.625 2.938 1.8.362.175.575.15.787-.088.213-.238.913-1.063 1.15-1.425.238-.363.475-.3.8-.175.325.125 2.075.975 2.438 1.15.362.175.6.263.687.413.088.15.088.875-.15 1.55z" />
        </svg>

        {/* Hover Label */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Direct WhatsApp Chat
        </span>
      </a>
    </div>
  );
};
