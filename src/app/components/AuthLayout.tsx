import type { ReactNode } from 'react';
import logoImage from '../../imports/aposta1-logo-new-gold-1.png';

interface Props {
  children: ReactNode;
  onGoHome?: () => void;
}

export function AuthLayout({ children, onGoHome }: Props) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 auth-page-bg"
    >
      <div className="relative w-full max-w-md">
        {/* Animated logo badge — same rotating ring / glow as the mobile bottom nav,
            overlapping the card 50% inside / 50% outside */}
        <button
          onClick={onGoHome}
          className="absolute left-1/2 -translate-x-1/2 -top-[39px] z-20 flex items-center justify-center w-[78px] h-[78px] rounded-full flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="mobile-nav-ring absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" />
          <span className="mobile-nav-glow absolute inset-0 rounded-full animate-pulse" />
          <span className="relative w-[67px] h-[67px] rounded-full bg-[#3d1f8f] border-2 border-[#0a0428] shadow-lg flex items-center justify-center overflow-hidden">
            <img src={logoImage} alt="APOSTA1" className="w-[52px] h-[52px] object-contain" style={{ transform: 'translate(-3px, 3px)' }} />
          </span>
        </button>

        <div
          className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 pt-9 auth-card-glow"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
