import { useEffect, useState } from 'react';
import logoImage from '../../imports/aposta1-logo-new-gold-1.png';
import { EsportsIcon, JogosIcon, CassinoIcon, SlotsIcon } from './icons';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home';

interface Props {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const items: { icon: React.ElementType; label: string; page: Page }[] = [
  { icon: EsportsIcon, label: 'Esportes', page: 'home' },
  { icon: JogosIcon, label: 'Jogos', page: 'jogos' },
  { icon: CassinoIcon, label: 'Cassino', page: 'cassino' },
  { icon: SlotsIcon, label: 'Slots', page: 'slots' },
];

function NavItem({ item, isActive, onClick }: { item: (typeof items)[number]; isActive: boolean; onClick: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-xl transition-colors"
        style={isActive ? { background: 'radial-gradient(circle 50px at center 120%, #810fff, #11093600)' } : undefined}
      >
        <item.icon className="w-7 h-7" />
        <span className={`text-[11px] font-semibold leading-none whitespace-nowrap ${isActive ? 'text-white' : 'text-white/60'}`}>
          {item.label}
        </span>
      </button>
    </div>
  );
}

// Shrinks the bar while the player scrolls down and restores it on scroll up.
// Always full size near the top of the page.
function useShrinkOnScroll() {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y <= 80) {
          setShrunk(false);
          lastY = y;
        } else if (Math.abs(delta) > 6) {
          setShrunk(delta > 0);
          lastY = y;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return shrunk;
}

export function MobileBottomBar({ activePage, onNavigate }: Props) {
  const shrunk = useShrinkOnScroll();
  // 'home' is a placeholder page for Esportes (no dedicated sports page yet) — don't show it
  // as selected just because the app happens to default to the home page on load.
  const isItemActive = (page: Page) => page !== 'home' && activePage === page;

  return (
    <div
      className="lg:hidden fixed bottom-3 left-3 right-3 z-50 origin-bottom transition-transform duration-300 ease-out dyn-transform"
      style={{ '--dyn-transform': shrunk ? 'scale(0.7)' : 'scale(1)' } as React.CSSProperties}
    >
      <div
        className="mobile-nav-shadow relative rounded-full border border-[#9B2CF1] backdrop-blur-xl px-3 bg-[#3D1F8FE6]"
      >
        <div className="flex items-center h-20">
          {/* First 2 items */}
          {items.slice(0, 2).map((item) => (
            <NavItem key={item.page} item={item} isActive={isItemActive(item.page)} onClick={() => onNavigate(item.page)} />
          ))}

          {/* Centre logo — same rotating ring / glow badge as the login page, scaled up to fit this taller bar */}
          <button
            onClick={() => onNavigate('home')}
            className="relative flex items-center justify-center w-[78px] h-[78px] rounded-full flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="mobile-nav-ring absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" />
            <span className="mobile-nav-glow absolute inset-0 rounded-full animate-pulse" />
            <span className="relative w-[67px] h-[67px] rounded-full bg-[#3d1f8f] border border-[#0a0428] shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logoImage} alt="Home" className="w-[52px] h-[52px] object-contain" style={{ transform: 'translate(-3px, 3px)' }} />
            </span>
          </button>

          {/* Last 2 items */}
          {items.slice(2).map((item) => (
            <NavItem key={item.page} item={item} isActive={isItemActive(item.page)} onClick={() => onNavigate(item.page)} />
          ))}
        </div>
      </div>
    </div>
  );
}
