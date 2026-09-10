import { useRef } from 'react';
import { Headphones, LogIn, ChevronDown } from 'lucide-react';
import { EsportsIcon, JogosIcon, CassinoIcon, SlotsIcon, AviatorIcon, BonusIcon, HomeIcon, PromocoesIcon, MissoesIcon, RecompensasIcon, ReferIcon } from './icons';
import logoImage from '../../imports/aposta1-logo-new-gold-1.png';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home' | 'promocoes' | 'missoes' | 'bonus' | 'refer' | 'torneios' | 'recompensas' | 'login';

const menuItems: { icon: React.ElementType; label: string; page?: Page }[] = [
  { icon: HomeIcon, label: 'Início', page: 'home' },
  { icon: JogosIcon, label: 'Jogos', page: 'jogos' },
  { icon: SlotsIcon, label: 'Slots', page: 'slots' },
  { icon: CassinoIcon, label: 'Cassino', page: 'cassino' },
  { icon: AviatorIcon, label: 'Aviator' },
  { icon: EsportsIcon, label: 'Esportes' },
  { icon: PromocoesIcon, label: 'Promoções', page: 'promocoes' as Page },
  { icon: MissoesIcon, label: 'Missões', page: 'missoes' as Page },
  { icon: RecompensasIcon,  label: 'Recompensas',    page: 'recompensas' as Page },
  { icon: BonusIcon,   label: 'Bônus',          page: 'bonus' as Page },
  { icon: ReferIcon, label: 'Refer',          page: 'refer' as Page },
  // TODO: temporary link for testing the Login page — remove once real auth entry points exist
  { icon: LogIn, label: 'Login', page: 'login' as Page },
];

interface SidebarProps {
  activePage?: Page;
  onNavigate?: (page: Page) => void;
}

export function Sidebar({ activePage = 'home', onNavigate }: SidebarProps) {
  const navScrollRef = useRef<HTMLDivElement>(null);

  const scrollNavDown = () => {
    navScrollRef.current?.scrollBy({ top: 160, behavior: 'smooth' });
  };

  return (
    <aside className="w-32 h-full bg-[#0b062e] flex flex-col">
      {/* Logo — fixed at top, clickable to go home. Hidden on mobile. */}
      <button
        onClick={() => onNavigate?.('home')}
        className="hidden lg:flex flex-col items-center justify-center gap-1 pt-5 px-[15px] shrink-0"
      >
        <img src={logoImage} alt="Aposta1" className="w-[70%] h-auto object-contain" />
      </button>

      {/* Middle section — rounded container, scrollable */}
      <div className="flex-1 min-h-0 p-[15px]">
        <div className="relative h-full rounded-2xl bg-[#1a144c]">
          <div ref={navScrollRef} className="h-full overflow-y-auto scrollbar-hide rounded-2xl p-3 pb-9">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const isActive = item.page && item.page === activePage;
                return (
                  <button
                    key={index}
                    onClick={() => item.page && onNavigate?.(item.page)}
                    title={item.label}
                    className="flex flex-col items-center gap-1 py-2 px-1 w-full rounded-xl transition-colors hover:bg-white/5"
                    style={isActive ? { background: 'linear-gradient(0deg, #411E92, #2C1569)' } : undefined}
                  >
                    <span
                      className={`flex items-center justify-center w-12 h-12 rounded-full border transition-colors ${
                        isActive
                          ? 'bg-gradient-to-br from-[#411E92] to-[#2C1569] border-[#9B2CF1] shadow-[0_0_10px_rgba(155,44,241,0.6)]'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <item.icon className={`${item.label === 'Jogos' || item.label === 'Slots' ? 'w-7 h-7' : 'w-5 h-5'} ${isActive ? 'text-white' : 'text-gray-300'}`} />
                    </span>
                    <span className={`text-[11px] leading-tight text-center ${isActive ? 'text-white font-semibold' : 'text-gray-400'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Scroll indicator — blends with the box, click to scroll for more items */}
          <button
            onClick={scrollNavDown}
            title="Ver mais itens"
            className="absolute bottom-0 left-0 right-0 h-9 flex items-end justify-center pb-1.5 rounded-b-2xl cursor-pointer sidebar-scroll-fade"
          >
            <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* Support — fixed at bottom, styled like the old gold deposit card */}
      <div className="p-[15px] pt-0 shrink-0">
        <div className="rounded-2xl py-4 flex flex-col items-center bg-gradient-to-br from-[#F0C550] to-[#C6902A]">
          <button
            title="Suporte 24/7"
            className="flex flex-col items-center gap-2 py-1 px-1 w-[90%]"
          >
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#e8ba3f] icon-shadow-soft">
              <Headphones className="w-5 h-5 text-[#0B062E]" />
            </span>
            <span className="text-[11px] leading-tight text-center font-bold text-[#0B062E]">Suporte 24/7</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
