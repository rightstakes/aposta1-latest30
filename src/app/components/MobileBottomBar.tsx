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

export function MobileBottomBar({ activePage, onNavigate }: Props) {
  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
      <div className="mobile-nav-shadow relative bg-[#3d1f8f] rounded-full border border-white/10 px-2">
        <div className="flex items-center justify-around h-16">
          {/* First 2 items */}
          {items.slice(0, 2).map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center gap-1 py-2 px-3 transition-colors ${
                activePage === item.page ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}

          {/* Centre logo — inline, same row */}
          <button
            onClick={() => onNavigate('home')}
            className="relative flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0"
          >
            {/* Rotating gradient ring — thin */}
            <span className="mobile-nav-ring absolute inset-0 rounded-full animate-[spin_4s_linear_infinite]" />
            {/* Soft pulsing glow */}
            <span className="mobile-nav-glow absolute inset-0 rounded-full animate-pulse" />
            {/* Logo circle */}
            <span className="relative w-12 h-12 rounded-full bg-[#3d1f8f] border-2 border-[#0a0428] shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logoImage} alt="Home" className="w-8 h-8 object-contain" />
            </span>
          </button>

          {/* Last 2 items */}
          {items.slice(2).map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center gap-1 py-2 px-3 transition-colors ${
                activePage === item.page ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
