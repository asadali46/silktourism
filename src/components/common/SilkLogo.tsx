import React from 'react';

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
    sm: { icon: 'w-7 h-7', text: 'text-xl', badge: 'h-10' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', badge: 'h-14' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', badge: 'h-20' },
    xl: { icon: 'w-20 h-20', text: 'text-5xl', badge: 'h-32' },
  };

  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <img
          src="/src/assets/images/silk_logo.svg"
          alt="Silk Tourism Logo"
          className={`${sizeMap[size].badge} w-auto object-contain drop-shadow-md`}
        />
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <img
        src="/src/assets/images/silk_logo.svg"
        alt="Silk Tourism Icon"
        className={`${sizeMap[size].icon} object-contain ${className}`}
      />
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/src/assets/images/silk_logo.svg"
        alt="Silk Tourism Emblem"
        className={`${sizeMap[size].icon} object-contain transition-transform group-hover:scale-105`}
      />
      <span className="font-extrabold tracking-tight text-[#0F766E] font-serif-heading leading-none" style={{ fontSize: size === 'sm' ? '1.1rem' : size === 'lg' ? '1.75rem' : '1.35rem' }}>
        SILK<span className="text-[#F59E0B]">TOURISM</span>
      </span>
    </div>
  );
};
