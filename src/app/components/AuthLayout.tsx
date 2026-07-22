import type { ReactNode } from 'react';
import logoImage from '../../imports/aposta1-logo-new-gold-1.png';

interface Props {
  children: ReactNode;
  onGoHome?: () => void;
}

export function AuthLayout({ children, onGoHome }: Props) {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'radial-gradient(circle at 50% -10%, #3d1f8f 0%, #1a1147 45%, #16103D 100%)' }}
    >
      <div className="relative w-full max-w-md">
        {/* Animated logo badge — same rotating ring / glow as the mobile bottom nav,
            sized ~25% larger, overlapping the card 50% inside / 50% outside */}
        <button
          onClick={onGoHome}
          className="absolute left-1/2 -translate-x-1/2 -top-[35px] z-20 flex items-center justify-center w-[70px] h-[70px] rounded-full flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="mobile-nav-ring absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" />
          <span className="mobile-nav-glow absolute inset-0 rounded-full animate-pulse" />
          <span className="relative w-[60px] h-[60px] rounded-full bg-[#3d1f8f] border-2 border-[#0a0428] shadow-lg flex items-center justify-center overflow-hidden">
            <img src={logoImage} alt="APOSTA1" className="w-10 h-10 object-contain" />
          </span>
        </button>

        <div
          className="w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 pt-9"
          style={{ background: 'radial-gradient(circle 260px at center 120%, #3d1f8f, #110936)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
