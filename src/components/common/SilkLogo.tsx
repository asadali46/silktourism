import React from 'react';
import logoImg from '../../assets/images/logo.png';

interface SilkLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightText?: boolean;
}

export const SilkLogo: React.FC<SilkLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  lightText = false
}) => {
  const sizeMap = {
    sm: { icon: 'h-8 w-auto', text: 'text-xl', badge: 'h-16' },
    md: { icon: 'h-11 w-auto', text: 'text-2xl', badge: 'h-24' },
    lg: { icon: 'h-16 w-auto', text: 'text-3xl', badge: 'h-32' },
    xl: { icon: 'h-24 w-auto', text: 'text-5xl', badge: 'h-44' },
  };

  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="Silk Tourism Logo"
          className={`${sizeMap[size].badge} w-auto object-contain rounded-xl shadow-sm`}
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <img
        src={logoImg}
        alt="Silk Tourism Icon"
        className={`${sizeMap[size].icon} object-contain rounded-lg ${className}`}
      />
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logoImg}
        alt="Silk Tourism Emblem"
        className={`${sizeMap[size].icon} max-h-12 object-contain rounded-lg transition-transform group-hover:scale-105`}
      />
      <span className={`font-extrabold tracking-tight font-serif-heading leading-none ${lightText ? 'text-white' : 'text-[#0F766E]'}`} style={{ fontSize: size === 'sm' ? '1.1rem' : size === 'lg' ? '1.75rem' : '1.35rem' }}>
        SILK<span className="text-[#F59E0B]">TOURISM</span>
      </span>
    </div>
  );
};
