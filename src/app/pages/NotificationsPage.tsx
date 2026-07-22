import { useState } from 'react';
import { Bell, Gift, Wallet, ShieldCheck, Trophy, CheckCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Footer } from '../components/Footer';

type NotificationType = 'deposit' | 'bonus' | 'promo' | 'tournament' | 'security';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const ICONS: Record<NotificationType, LucideIcon> = {
  deposit: Wallet,
  bonus: Gift,
  promo: Gift,
  tournament: Trophy,
  security: ShieldCheck,
};

const COLORS: Record<NotificationType, string> = {
  deposit: '#00C44D',
  bonus: '#D4AF37',
  promo: '#D4AF37',
  tournament: '#D4AF37',
  security: '#60a5fa',
};

const initialNotifications: Notification[] = [
  { id: '1', type: 'deposit', title: 'Depósito confirmado', description: 'Seu depósito de R$ 100,00 via PIX foi aprovado com sucesso.', time: 'há 5 min', read: false },
  { id: '2', type: 'bonus', title: 'Bônus liberado', description: 'Você recebeu R$ 50,00 de bônus no seu primeiro depósito.', time: 'há 2 horas', read: false },
  { id: '3', type: 'tournament', title: 'Torneio começando', description: 'O torneio "Batalha de Slots" começa em 1 hora. Não perca!', time: 'há 4 horas', read: false },
  { id: '4', type: 'promo', title: 'Nova promoção disponível', description: 'Cashback de 10% em todas as apostas esportivas neste fim de semana.', time: 'ontem', read: true },
  { id: '5', type: 'security', title: 'Novo acesso detectado', description: 'Detectamos um login na sua conta a partir de um novo dispositivo.', time: 'há 2 dias', read: true },
  { id: '6', type: 'deposit', title: 'Saque processado', description: 'Seu saque de R$ 200,00 foi processado e enviado para sua conta.', time: 'há 3 dias', read: true },
];

interface Props {
  onNavigateStatic?: (slug: string) => void;
}

export function NotificationsPage({ onNavigateStatic }: Props) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter(n => !n.read);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h1 className="text-white font-extrabold text-2xl">Notificações</h1>
                <p className="text-gray-400 text-sm">
                  {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Tudo em dia'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl px-4 py-2 transition-colors"
              >
                <CheckCheck className="w-4 h-4" />
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' ? 'text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              style={filter === 'all' ? { backgroundColor: '#00C44D' } : {}}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'unread' ? 'text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              style={filter === 'unread' ? { backgroundColor: '#00C44D' } : {}}
            >
              Não lidas
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Bell className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Nenhuma notificação por aqui.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filtered.map(n => {
                const Icon = ICONS[n.type];
                return (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-colors ${
                      n.read ? 'bg-white/[0.03] border-white/10' : 'bg-white/5 border-white/15 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${COLORS[n.type]}1A`, border: `1px solid ${COLORS[n.type]}4D` }}
                    >
                      <Icon className="w-[18px] h-[18px]" style={{ color: COLORS[n.type] }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-white text-sm font-semibold">{n.title}</p>
                        <span className="text-gray-500 text-xs flex-shrink-0">{n.time}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{n.description}</p>
                    </div>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 mt-1.5" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <Footer onNavigate={onNavigateStatic} />
      </div>
    </div>
  );
}
