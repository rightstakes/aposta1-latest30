import { Home, Plane, Grid3x3, TrendingUp, Dice5, Flame, Trophy, Crown, Headphones, ChevronLeft, ChevronRight, Gamepad2, Gift, Medal, Tag, Users, Star, LogIn } from 'lucide-react';
import { EsportsIcon, JogosIcon, CassinoIcon, SlotsIcon } from './icons';
import type { PageType } from '../pages/GameCategoryPage';

type Page = PageType | 'home' | 'promocoes' | 'bonus' | 'refer' | 'torneios' | 'recompensas' | 'login';

const menuItems: { icon: React.ElementType; label: string; page?: Page; liveLabel?: boolean }[] = [
  // TODO: temporary link for testing the Login page — remove once real auth entry points exist
  { icon: LogIn, label: 'Login', page: 'login' as Page },
  { icon: Home, label: 'Início', page: 'home' },
  { icon: JogosIcon, label: 'Jogos', page: 'jogos' },
  { icon: SlotsIcon, label: 'Slots', page: 'slots' },
  { icon: CassinoIcon, label: 'Cassino', page: 'cassino' },
  { icon: Plane, label: 'Aviator' },
  { icon: Grid3x3, label: 'Mines' },
  { icon: Flame, label: 'Crash' },
  { icon: Dice5, label: 'Cassino Ao Vivo' },
  { icon: EsportsIcon, label: 'Esportes' },
  { icon: TrendingUp, label: 'Ao Vivo', liveLabel: true },
  { icon: Gamepad2, label: 'eSports' },
  { icon: Medal, label: 'Torneios', page: 'torneios' as Page },
  { icon: Gift, label: 'Promoções', page: 'promocoes' as Page },
  { icon: Star,  label: 'Recompensas',    page: 'recompensas' as Page },
  { icon: Tag,   label: 'Bônus',          page: 'bonus' as Page },
  { icon: Users, label: 'Refer a Friend', page: 'refer' as Page },
];

const bottomItems = [
  { icon: Headphones, label: 'Suporte 24/7' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showToggleButton?: boolean;
  activePage?: Page;
  onNavigate?: (page: Page) => void;
  onOpenDeposit?: () => void;
}

export function Sidebar({ isCollapsed, onToggleCollapse, showToggleButton = true, activePage = 'home', onNavigate, onOpenDeposit }: SidebarProps) {
  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} h-full bg-gradient-to-b from-[#16103D] via-[#1a1147] to-[#16103D] border-r border-white/[0.08] flex flex-col transition-all duration-300 relative`}>
      {showToggleButton && (
        <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-[60]">
          <button
            onClick={onToggleCollapse}
            className="bg-white hover:bg-gray-100 text-black rounded-full p-1.5 shadow-lg transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className="py-4">
          {menuItems.map((item, index) => {
            const isActive = item.page && item.page === activePage;
            return (
              <button
                key={index}
                onClick={() => item.page && onNavigate?.(item.page)}
                className={`flex items-center gap-3 ${
                  isCollapsed
                    ? 'w-full px-4 justify-center py-3'
                    : 'mx-[15px] w-[calc(100%-30px)] my-1.5 px-4 py-3 rounded-lg'
                } text-sm transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2C1569] to-[#411E92] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {item.liveLabel ? (
                  <span className="flex-shrink-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">LIVE</span>
                ) : (
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                )}
                {!isCollapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
              </button>
            );
          })}

          <div className="my-4 px-6">
            <div className="h-px bg-white/5"></div>
          </div>

          {bottomItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 ${isCollapsed ? 'px-4 justify-center' : 'px-6'} py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span className="flex-1 text-left">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-white/15 flex-shrink-0">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 rounded-lg text-center">
            <div className="w-12 h-12 bg-yellow-400 rounded-full mx-auto mb-2 flex items-center justify-center">
              <Crown className="w-6 h-6 text-yellow-700" />
            </div>
            <p className="text-white text-sm mb-2">Deposite e jogue<br/>com segurança!</p>
            <button onClick={onOpenDeposit} className="bg-white text-yellow-700 px-4 py-2 rounded-xl text-xs w-full hover:bg-yellow-50">
              Depositar agora
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
