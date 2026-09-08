import { Bell, ChevronDown, Menu, X, LayoutDashboard, Wallet, Clock, Landmark, ShieldCheck, PauseCircle, Lock, LogOut, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  mobileSidebarOpen?: boolean;
  onNavigate?: (page: string) => void;
  onOpenDeposit?: () => void;
}

const profileMenuItems = [
  { icon: LayoutDashboard, label: 'Minha Conta',               action: 'minha-conta' },
  { icon: Wallet,          label: 'Carteira',                  action: 'carteira' },
  { icon: Clock,           label: 'Apostas',                   action: 'apostas' },
  { icon: ShieldCheck,     label: 'Limites',                   action: 'limites' },
  { icon: PauseCircle,     label: 'Pausas',                    action: 'pausas-suspensoes' },
  { icon: Lock,            label: 'Segurança',                 action: 'seguranca' },
  { icon: Landmark,        label: 'Gerenciar Contas Bancárias', action: 'contas-bancarias' },
];

function ProfileDropdown({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: (page: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItem = (action: string | null) => {
    setOpen(false);
    if (action && onNavigate) onNavigate(action);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-1.5 sm:gap-2 bg-white/5 px-1.5 sm:px-3 py-1.5 sm:py-2.5 rounded-xl hover:bg-white/10 border border-white/15 h-full"
      >
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
          GA
        </div>
        {!compact && (
          <div className="text-left hidden lg:block">
            <div className="text-white text-sm">GA, Apostador</div>
            <div className="text-gray-400 text-xs">Anônimo</div>
          </div>
        )}
        {/* Arrow is dropped on the compact (mobile) dropdown to save width */}
        {!compact && (
          <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-[#110936] rounded-xl shadow-2xl overflow-hidden z-[80] border border-white/15">
          {profileMenuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleItem(item.action)}
              className="w-full flex items-center gap-4 px-5 py-4 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              <item.icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
          <div className="h-px bg-white/10 mx-4" />
          <button className="w-full flex items-center gap-4 px-5 py-4 text-red-500 hover:text-red-400 hover:bg-white/5 transition-colors text-sm">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function Header({ onToggleSidebar, mobileSidebarOpen, onNavigate, onOpenDeposit }: HeaderProps) {
  return (
    <header className="bg-[#0b062e] px-4 sm:px-6 flex items-center justify-between fixed top-0 left-0 lg:left-32 right-0 z-50 h-[82px]">
      {/* Left side */}
      <div className="flex items-center gap-1 sm:gap-4 lg:gap-6 h-full">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden -ml-2 p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          {mobileSidebarOpen
            ? <X className="w-6 h-6 text-white" />
            : <Menu className="w-6 h-6 text-white" />
          }
        </button>

        {/* Mobile notification bell — next to hamburger */}
        <button
          onClick={() => onNavigate?.('notificacoes')}
          className="lg:hidden relative p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-200" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        <button
          onClick={() => onNavigate?.('notificacoes')}
          className="relative bg-white/5 p-2 rounded-xl hover:bg-white/10 border border-white/15 hidden md:block"
        >
          <Bell className="w-5 h-5 text-gray-200" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
        </button>

        {/* Depositar box */}
        <div className="bg-white/5 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2.5 rounded-xl flex items-center gap-1.5 sm:gap-3 border border-white/15">
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-[#D4AF37]" />
          <div className="flex flex-col gap-0.5 flex-shrink-0">
            <span className="text-[#D4AF37] text-xs sm:text-sm md:text-base font-semibold leading-none whitespace-nowrap">
              R$ 1,200.00
            </span>
            <span className="text-white text-[9px] sm:text-[10px] md:text-[11px] font-normal leading-none whitespace-nowrap">
              Bônus: R$3000
            </span>
          </div>
          <button onClick={onOpenDeposit} className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold flex-shrink-0 whitespace-nowrap">
            Depositar
          </button>
        </div>

        {/* Mobile profile — shown only up to md */}
        <div className="md:hidden">
          <ProfileDropdown compact onNavigate={onNavigate} />
        </div>

        {/* Desktop profile — hidden on mobile */}
        <div className="hidden md:block">
          <ProfileDropdown onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}
