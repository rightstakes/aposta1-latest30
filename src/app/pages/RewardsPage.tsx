import { useState, useEffect } from 'react';
import {
  Gift, Zap, Star, TrendingUp, Clock, CheckCircle2,
  XCircle, RefreshCw, ChevronRight, Coins, Gamepad2, AlertCircle
} from 'lucide-react';
import { Footer } from '../components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

type RewardType = 'cashback' | 'free-spins' | 'free-bonus' | 'leverage';
type RewardStatus = 'available' | 'active' | 'finished';

interface BaseReward {
  id: string;
  type: RewardType;
  status: RewardStatus;
  name: string;
  expiry: string;
  finishedReason?: 'claimed' | 'completed' | 'expired' | 'cancelled';
}
interface CashbackReward extends BaseReward {
  type: 'cashback';
  amount: number;
  tier: string;
  percentage: number;
  availableSince: string;
}
interface FreeSpinsReward extends BaseReward {
  type: 'free-spins';
  game: string;
  totalSpins: number;
  usedSpins?: number;
}
interface FreeBonusReward extends BaseReward {
  type: 'free-bonus';
  bonusAmount: number;
  wagering: number;
  wageringRequired: number;
  currentBalance?: number;
}
interface LeverageReward extends BaseReward {
  type: 'leverage';
  percentage: number;
  minBalance: number;
  maxBonus: number;
  bonusReceived?: number;
  wagering?: number;
  wageringRequired?: number;
}

type Reward = CashbackReward | FreeSpinsReward | FreeBonusReward | LeverageReward;

// ─── Mock Data ────────────────────────────────────────────────────────────────

const rewards: Reward[] = [
  // Available
  {
    id: 'cb1', type: 'cashback', status: 'available',
    name: 'Cashback Diário', expiry: '23:14:32',
    amount: 57.40, tier: 'Level 2', percentage: 4,
    availableSince: '04/07 às 11h',
  },
  {
    id: 'fs1', type: 'free-spins', status: 'available',
    name: 'Rodadas Grátis', expiry: '2 dias',
    game: 'Gates of Olympus', totalSpins: 50,
  },
  {
    id: 'fb1', type: 'free-bonus', status: 'available',
    name: 'Bônus Grátis', expiry: '5 dias',
    bonusAmount: 30, wagering: 0, wageringRequired: 10,
  },
  {
    id: 'lv1', type: 'leverage', status: 'available',
    name: 'Bônus Alavancagem', expiry: '3 dias',
    percentage: 50, minBalance: 10, maxBonus: 150,
  },
  // Active
  {
    id: 'fs2', type: 'free-spins', status: 'active',
    name: 'Rodadas Grátis', expiry: '1 dia',
    game: 'Sweet Bonanza', totalSpins: 30, usedSpins: 18,
  },
  {
    id: 'fb2', type: 'free-bonus', status: 'active',
    name: 'Bônus de Boas-Vindas', expiry: '12 dias',
    bonusAmount: 100, currentBalance: 64.20,
    wagering: 1800, wageringRequired: 3000,
  },
  {
    id: 'lv2', type: 'leverage', status: 'active',
    name: 'Bônus Alavancagem 50%', expiry: '6 dias',
    percentage: 50, minBalance: 10, maxBonus: 200,
    bonusReceived: 80, wagering: 1200, wageringRequired: 2400,
  },
  // Finished
  {
    id: 'cb2', type: 'cashback', status: 'finished', finishedReason: 'claimed',
    name: 'Cashback Diário', expiry: '03/07',
    amount: 23.10, tier: 'Level 1', percentage: 2,
    availableSince: '03/07 às 11h',
  },
  {
    id: 'fs3', type: 'free-spins', status: 'finished', finishedReason: 'completed',
    name: 'Rodadas Grátis', expiry: '01/07',
    game: 'Fortune Tiger', totalSpins: 20, usedSpins: 20,
  },
  {
    id: 'fb3', type: 'free-bonus', status: 'finished', finishedReason: 'expired',
    name: 'Bônus Grátis', expiry: '28/06',
    bonusAmount: 50, wagering: 200, wageringRequired: 1500,
  },
];

// ─── Cashback countdown hook (parses "HH:MM:SS" string) ──────────────────────
function useCashbackCountdown(timeStr: string) {
  const toSeconds = (s: string) => {
    const [h, m, sec] = s.split(':').map(Number);
    return (h || 0) * 3600 + (m || 0) * 60 + (sec || 0);
  };
  const [secs, setSecs] = useState(() => toSeconds(timeStr));
  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ─── Shared Design Tokens ─────────────────────────────────────────────────────

const CARD = 'bg-[radial-gradient(circle_200px_at_center_120%,_#3d1f8f,_#110936)] border border-white/15 rounded-2xl overflow-hidden';
const BADGE_MAP: Record<RewardType, { label: string; color: string; bg: string; icon: typeof Gift }> = {
  cashback:    { label: 'Cashback',      color: '#00C44D', bg: '#00C44D18', icon: Coins },
  'free-spins': { label: 'Free Spins',  color: '#a855f7', bg: '#a855f718', icon: Zap },
  'free-bonus': { label: 'Free Bonus',  color: '#D4AF37', bg: '#D4AF3718', icon: Gift },
  leverage:    { label: 'Alavancagem',   color: '#3b82f6', bg: '#3b82f618', icon: TrendingUp },
};
const FINISH_CONFIG = {
  claimed:   { label: 'Resgatado',  icon: CheckCircle2, color: '#00C44D' },
  completed: { label: 'Concluído',  icon: CheckCircle2, color: '#00C44D' },
  expired:   { label: 'Expirado',   icon: AlertCircle,  color: '#6b7280' },
  cancelled: { label: 'Cancelado',  icon: XCircle,      color: '#ef4444' },
};

function ProgressBar({ value, max, color = '#00C44D' }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="w-full bg-white/8 rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

function TypeBadge({ type }: { type: RewardType }) {
  const cfg = BADGE_MAP[type];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      <Icon className="w-2.5 h-2.5" /> {cfg.label}
    </span>
  );
}

function ExpiryChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 border border-white/[0.08] rounded-full px-2 py-0.5">
      <Clock className="w-2.5 h-2.5" /> {label}
    </span>
  );
}

// ─── Card: Cashback ───────────────────────────────────────────────────────────

function CashbackCard({ r }: { r: CashbackReward }) {
  const [claimed, setClaimed] = useState(false);
  const countdown = useCashbackCountdown(r.expiry);
  const finished = r.status === 'finished';
  const finCfg = r.finishedReason ? FINISH_CONFIG[r.finishedReason] : null;

  return (
    <div className={CARD}>
      {/* Accent stripe */}
      <div className="h-1 w-full" style={{ backgroundColor: '#00C44D' }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <TypeBadge type="cashback" />
              {finished && finCfg && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: finCfg.color + '18', color: finCfg.color }}>
                  <finCfg.icon className="w-2.5 h-2.5" /> {finCfg.label}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs">{r.name}</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00C44D18' }}>
            <Coins className="w-5 h-5" style={{ color: '#00C44D' }} />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">Valor disponível</p>
          <p className="font-extrabold text-3xl leading-none" style={{ color: claimed ? '#6b7280' : '#00C44D' }}>
            R$ {r.amount.toFixed(2).replace('.', ',')}
          </p>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { label: 'Nível alcançado',   value: r.tier },
            { label: 'Cashback aplicado', value: `${r.percentage}%` },
            { label: 'Disponível desde',  value: r.availableSince },
          ].map(m => (
            <div key={m.label} className="bg-white/4 rounded-xl px-3 py-2 border border-white/15">
              <p className="text-gray-500 text-[9px] uppercase tracking-wide">{m.label}</p>
              <p className="text-white text-xs font-semibold mt-0.5">{m.value}</p>
            </div>
          ))}

          {/* Countdown cell — spans full width */}
          {r.status === 'available' && (
            <div className="col-span-2 rounded-xl px-3 py-2 border flex items-center justify-between" style={{ backgroundColor: '#00C44D0e', borderColor: '#00C44D30' }}>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#00C44D' }} />
                <p className="text-[9px] uppercase tracking-wide" style={{ color: '#00C44D' }}>Expira em</p>
              </div>
              <p className="font-bold text-sm font-mono" style={{ color: '#00C44D' }}>{countdown}</p>
            </div>
          )}
          {r.status === 'finished' && (
            <div className="bg-white/4 rounded-xl px-3 py-2 border border-white/15">
              <p className="text-gray-500 text-[9px] uppercase tracking-wide">Data</p>
              <p className="text-white text-xs font-semibold mt-0.5">{r.expiry}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        {r.status === 'available' && !claimed && (
          <button onClick={() => setClaimed(true)}
            className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#00C44D' }}>
            Resgatar Cashback
          </button>
        )}
        {(claimed || r.finishedReason === 'claimed') && (
          <div className="flex items-center gap-2 justify-center py-2.5 text-sm" style={{ color: '#00C44D' }}>
            <CheckCircle2 className="w-4 h-4" /> Creditado ao saldo real
          </div>
        )}
        {r.finishedReason === 'expired' && (
          <p className="text-gray-600 text-xs text-center py-2">Cashback expirado sem resgate.</p>
        )}
      </div>
    </div>
  );
}

// ─── Card: Free Spins ─────────────────────────────────────────────────────────

function FreeSpinsCard({ r }: { r: FreeSpinsReward }) {
  const cfg = BADGE_MAP['free-spins'];
  const usedSpins = r.usedSpins ?? 0;
  const remaining = r.totalSpins - usedSpins;
  const finCfg = r.finishedReason ? FINISH_CONFIG[r.finishedReason] : null;

  return (
    <div className={CARD}>
      <div className="h-1 w-full" style={{ backgroundColor: cfg.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <TypeBadge type="free-spins" />
              {finCfg && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: finCfg.color + '18', color: finCfg.color }}>
                  <finCfg.icon className="w-2.5 h-2.5" /> {finCfg.label}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs">{r.name}</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
            <Zap className="w-5 h-5" style={{ color: cfg.color }} />
          </div>
        </div>

        {/* Spin count */}
        <div className="flex items-end gap-3 mb-4">
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">
              {r.status === 'active' ? 'Restantes' : 'Rodadas'}
            </p>
            <div className="flex items-baseline gap-1.5">
              <p className="font-extrabold text-4xl leading-none" style={{ color: cfg.color }}>
                {r.status === 'active' ? remaining : r.totalSpins}
              </p>
              {r.status === 'active' && (
                <p className="text-gray-500 text-sm">/ {r.totalSpins}</p>
              )}
            </div>
          </div>
          <div className="flex-1 mb-1.5 flex flex-col justify-end">
            <p className="text-gray-500 text-[9px] uppercase tracking-wide mb-0.5">Jogo</p>
            <p className="text-white text-xs font-semibold truncate">{r.game}</p>
          </div>
        </div>

        {/* Progress (active) */}
        {r.status === 'active' && (
          <div className="mb-4">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
              <span>{usedSpins} usadas</span>
              <span>{remaining} restantes</span>
            </div>
            <ProgressBar value={usedSpins} max={r.totalSpins} color={cfg.color} />
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <ExpiryChip label={`Expira em ${r.expiry}`} />
        </div>

        {r.status === 'available' && (
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              Rejeitar
            </button>
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: cfg.color }}>
              Ativar
            </button>
          </div>
        )}
        {r.status === 'active' && (
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              Cancelar
            </button>
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: cfg.color }}>
              Continuar Jogando
            </button>
          </div>
        )}
        {r.status === 'finished' && finCfg && (
          <div className="flex items-center justify-center gap-2 py-2 text-xs" style={{ color: finCfg.color }}>
            <finCfg.icon className="w-4 h-4" /> {finCfg.label} em {r.expiry}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card: Free Bonus ─────────────────────────────────────────────────────────

function FreeBonusCard({ r }: { r: FreeBonusReward }) {
  const cfg = BADGE_MAP['free-bonus'];
  const pct = r.status === 'active' ? Math.min(100, (r.wagering / r.wageringRequired) * 100) : 0;
  const remaining = r.wageringRequired - r.wagering;
  const finCfg = r.finishedReason ? FINISH_CONFIG[r.finishedReason] : null;

  return (
    <div className={CARD}>
      <div className="h-1 w-full" style={{ backgroundColor: cfg.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <TypeBadge type="free-bonus" />
              {finCfg && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: finCfg.color + '18', color: finCfg.color }}>
                  <finCfg.icon className="w-2.5 h-2.5" /> {finCfg.label}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs">{r.name}</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
            <Gift className="w-5 h-5" style={{ color: cfg.color }} />
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">
            {r.status === 'active' ? 'Saldo de bônus' : 'Valor do bônus'}
          </p>
          <p className="font-extrabold text-3xl leading-none" style={{ color: cfg.color }}>
            R$ {(r.status === 'active' && r.currentBalance != null ? r.currentBalance : r.bonusAmount).toFixed(2).replace('.', ',')}
          </p>
        </div>

        {/* Wagering info */}
        {r.status !== 'finished' && (
          <div className="mb-4 bg-white/4 rounded-xl p-3 border border-white/15">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500">Rollover {r.wageringRequired}x</span>
              {r.status === 'active' && <span style={{ color: cfg.color }}>{pct.toFixed(0)}%</span>}
            </div>
            {r.status === 'active' && (
              <>
                <ProgressBar value={r.wagering} max={r.wageringRequired} color={cfg.color} />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1.5">
                  <span>Apostado: R$ {r.wagering.toLocaleString('pt-BR')}</span>
                  <span>Falta: R$ {remaining.toLocaleString('pt-BR')}</span>
                </div>
              </>
            )}
            {r.status === 'available' && (
              <p className="text-gray-400 text-xs">Aposte {r.wageringRequired}x o valor do bônus para liberar</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <ExpiryChip label={`Expira em ${r.expiry}`} />
        </div>

        {r.status === 'available' && (
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10">Rejeitar</button>
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90" style={{ backgroundColor: cfg.color }}>Ativar</button>
          </div>
        )}
        {r.status === 'active' && (
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10">Cancelar</button>
            <button className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90" style={{ backgroundColor: cfg.color }}>Continuar</button>
          </div>
        )}
        {r.status === 'finished' && finCfg && (
          <div className="flex items-center justify-center gap-2 py-2 text-xs" style={{ color: finCfg.color }}>
            <finCfg.icon className="w-4 h-4" /> {finCfg.label}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card: Leverage ───────────────────────────────────────────────────────────

function LeverageCard({ r }: { r: LeverageReward }) {
  const cfg = BADGE_MAP.leverage;
  const pct = r.status === 'active' && r.wagering != null && r.wageringRequired != null
    ? Math.min(100, (r.wagering / r.wageringRequired) * 100)
    : 0;
  const finCfg = r.finishedReason ? FINISH_CONFIG[r.finishedReason] : null;

  return (
    <div className={CARD}>
      <div className="h-1 w-full" style={{ backgroundColor: cfg.color }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <TypeBadge type="leverage" />
              {finCfg && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: finCfg.color + '18', color: finCfg.color }}>
                  <finCfg.icon className="w-2.5 h-2.5" /> {finCfg.label}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs">{r.name}</p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
            <TrendingUp className="w-5 h-5" style={{ color: cfg.color }} />
          </div>
        </div>

        {/* Main value */}
        <div className="mb-4">
          {r.status === 'active' && r.bonusReceived != null ? (
            <>
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">Bônus recebido</p>
              <p className="font-extrabold text-3xl leading-none" style={{ color: cfg.color }}>
                R$ {r.bonusReceived.toFixed(2).replace('.', ',')}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-[10px] uppercase tracking-wide mb-0.5">Bônus de</p>
              <p className="font-extrabold text-4xl leading-none" style={{ color: cfg.color }}>
                {r.percentage}%
              </p>
            </>
          )}
        </div>

        {/* Meta grid */}
        {r.status === 'available' && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: 'Saldo mínimo', value: `R$ ${r.minBalance},00` },
              { label: 'Bônus máximo', value: `R$ ${r.maxBonus},00` },
            ].map(m => (
              <div key={m.label} className="bg-white/4 rounded-xl px-3 py-2 border border-white/15">
                <p className="text-gray-500 text-[9px] uppercase tracking-wide">{m.label}</p>
                <p className="text-white text-xs font-semibold mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Wagering (active) */}
        {r.status === 'active' && r.wagering != null && r.wageringRequired != null && (
          <div className="mb-4 bg-white/4 rounded-xl p-3 border border-white/15">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500">Progresso do rollover</span>
              <span style={{ color: cfg.color }}>{pct.toFixed(0)}%</span>
            </div>
            <ProgressBar value={r.wagering} max={r.wageringRequired} color={cfg.color} />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1.5">
              <span>R$ {r.wagering.toLocaleString('pt-BR')}</span>
              <span>R$ {r.wageringRequired.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <ExpiryChip label={`Expira em ${r.expiry}`} />
        </div>

        {r.status === 'available' && (
          <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: cfg.color }}>
            Ativar Bônus
          </button>
        )}
        {r.status === 'active' && (
          <button className="w-full py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: cfg.color }}>
            Continuar
          </button>
        )}
        {r.status === 'finished' && finCfg && (
          <div className="flex items-center justify-center gap-2 py-2 text-xs" style={{ color: finCfg.color }}>
            <finCfg.icon className="w-4 h-4" /> {finCfg.label}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ tab, filter }: { tab: string; filter: string }) {
  const isCashback = filter === 'cashback';
  return (
    <div className="col-span-full text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white/5 border border-white/[0.08]">
        {isCashback ? <Coins className="w-8 h-8 text-gray-600" /> : <Gift className="w-8 h-8 text-gray-600" />}
      </div>
      <p className="text-white font-semibold text-base mb-2">
        {tab === 'available' ? 'Nenhuma recompensa disponível' : tab === 'active' ? 'Nenhuma recompensa em uso' : 'Nenhum histórico encontrado'}
      </p>
      <p className="text-gray-500 text-sm max-w-xs mx-auto mb-4">
        {isCashback && tab === 'available'
          ? 'Jogue os slots participantes e receba até 15% de cashback sobre sua perda líquida.'
          : 'No momento você não possui recompensas nesta categoria.'}
      </p>
      {isCashback && tab === 'available' && (
        <button className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ backgroundColor: '#00C44D' }}>
          Ver Promoção <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// ─── Reward Card Router ───────────────────────────────────────────────────────

function RewardCard({ r }: { r: Reward }) {
  if (r.type === 'cashback')    return <CashbackCard    r={r as CashbackReward}  />;
  if (r.type === 'free-spins')  return <FreeSpinsCard   r={r as FreeSpinsReward} />;
  if (r.type === 'free-bonus')  return <FreeBonusCard   r={r as FreeBonusReward} />;
  if (r.type === 'leverage')    return <LeverageCard    r={r as LeverageReward}  />;
  return null;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = 'available' | 'active' | 'finished';
type Filter = 'all' | RewardType;

const TABS: { key: Tab; label: string; count: (r: Reward[]) => number }[] = [
  { key: 'available', label: 'Disponíveis', count: r => r.filter(x => x.status === 'available').length },
  { key: 'active',    label: 'Em Uso',       count: r => r.filter(x => x.status === 'active').length },
  { key: 'finished',  label: 'Finalizados',  count: r => r.filter(x => x.status === 'finished').length },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all',         label: 'Todos' },
  { key: 'cashback',    label: 'Cashback' },
  { key: 'free-spins',  label: 'Free Spins' },
  { key: 'free-bonus',  label: 'Free Bonus' },
  { key: 'leverage',    label: 'Alavancagem' },
];

interface Props {
  onNavigateStatic?: (slug: string) => void;
}

export function RewardsPage({ onNavigateStatic }: Props) {
  const [tab, setTab] = useState<Tab>('available');
  const [filter, setFilter] = useState<Filter>('all');

  const tabStatus: Record<Tab, RewardStatus> = {
    available: 'available',
    active: 'active',
    finished: 'finished',
  };

  const filtered = rewards.filter(r => {
    if (r.status !== tabStatus[tab]) return false;
    if (filter !== 'all' && r.type !== filter) return false;
    return true;
  });

  const totalActive = rewards.filter(r => r.status === 'active').length;

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero strip */}
      <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#D4AF3722' }}>
                <Star className="w-5 h-5" style={{ color: '#D4AF37' }} />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl leading-tight">Recompensas</h1>
                <p className="text-gray-400 text-xs mt-0.5">Gerencie todos os seus bônus e benefícios em um só lugar</p>
              </div>
            </div>
            {totalActive > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 bg-[#00C44D]/10 border border-[#00C44D]/20 rounded-full px-3 py-1.5">
                <RefreshCw className="w-3 h-3" style={{ color: '#00C44D' }} />
                <span className="text-xs font-semibold" style={{ color: '#00C44D' }}>{totalActive} em uso</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky tabs + filters */}
      <div className="sticky top-0 z-30 bg-[#16103D] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Tabs */}
          <div className="flex border-b border-white/15">
            {TABS.map(t => {
              const cnt = t.count(rewards);
              const active = tab === t.key;
              return (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 hover:text-white border-transparent'}`}
                  style={{ borderColor: active ? '#D4AF37' : 'transparent' }}>
                  {t.label}
                  {cnt > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                      style={{ backgroundColor: active ? '#D4AF37' : '#ffffff18', color: active ? '#000' : '#9ca3af' }}>
                      {cnt}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 py-2.5 overflow-x-auto [scrollbar-width:none]">
            {FILTERS.map(f => {
              const active = filter === f.key;
              const typeCfg = f.key !== 'all' ? BADGE_MAP[f.key as RewardType] : null;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    active ? 'text-black border-transparent' : 'text-gray-400 bg-white/5 border-white/[0.08] hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    flexShrink: 0,
                    ...(active ? { backgroundColor: typeCfg?.color ?? '#D4AF37' } : {}),
                  }}
                >
                  {typeCfg && <typeCfg.icon className="w-3 h-3" />}
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.length === 0
              ? <EmptyState tab={tab} filter={filter} />
              : filtered.map(r => <RewardCard key={r.id} r={r} />)
            }
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
