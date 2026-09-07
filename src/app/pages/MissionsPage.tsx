import { useState, useEffect } from 'react';
import {
  Star, Target, CheckSquare, Clock, Gift, Trophy, FileText, Gamepad2,
  ChevronDown, ChevronRight, Check, X,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import imgFuryOfAnubis from '../../imports/Zeus-lightning-featured.png';
import imgDailyOne from '../../imports/Gates-of-Olympus-featured.png';
import imgDailyTwo from '../../imports/Buffalo-King-featured.png';
import imgDailyThree from '../../imports/SweetBonanza-featured.png';

// ─── Types ────────────────────────────────────────────────────────────────────

type MissionKind = 'indeterminate' | 'daily';
type MissionStatus = 'not-started' | 'in-progress' | 'ready-to-claim' | 'claimed' | 'expired';

interface Mission {
  id: string;
  kind: MissionKind;
  title: string;
  image: string;
  rewardLabel: string;
  description: string;
  status: MissionStatus;
  countdownEndsAt?: number;
}

const initialMissions: Mission[] = [
  {
    id: 'm1', kind: 'indeterminate', title: 'Missão Fury Of Anubis', image: imgFuryOfAnubis,
    rewardLabel: '5 Rodadas Grátis', description: 'Acumule R$50 em apostas nos jogos selecionados',
    status: 'not-started',
  },
  {
    id: 'm2', kind: 'daily', title: 'Missão Diária 01', image: imgDailyOne,
    rewardLabel: '5 Rodadas Grátis', description: 'Acumule R$50 em apostas nos jogos selecionados',
    status: 'not-started',
  },
  {
    id: 'm3', kind: 'daily', title: 'Missão Diária 02', image: imgDailyTwo,
    rewardLabel: '15 Rodadas Grátis', description: 'Acumule R$50 em apostas nos jogos selecionados',
    status: 'in-progress', countdownEndsAt: Date.now() + (22 * 3600 + 52 * 60 + 43) * 1000,
  },
  {
    id: 'm4', kind: 'daily', title: 'Missão Diária 03', image: imgDailyThree,
    rewardLabel: '15 Rodadas Grátis', description: 'Acumule R$50 em apostas nos jogos selecionados',
    status: 'ready-to-claim', countdownEndsAt: Date.now() + (12 * 3600 + 52 * 60 + 43) * 1000,
  },
];

// ─── Countdown ────────────────────────────────────────────────────────────────

function useCountdown(endsAt?: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!endsAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endsAt]);
  if (!endsAt) return null;
  const secs = Math.max(0, Math.floor((endsAt - now) / 1000));
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ─── Shared tokens ────────────────────────────────────────────────────────────

const CARD_BG = '#3B1F88';
const CARD_BORDER = '#7F4AD2';
const PANEL_BG = '#1C183E';
const ROW_BG = '#282448';
const ACCENT_PURPLE = '#8C21F1';
const ICON_PURPLE = '#B583F5';
const GREEN = '#00C44D';
const AMBER = '#FFB800';

// ─── Mission Started modal ────────────────────────────────────────────────────

function MissionStartedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="relative w-full max-w-sm rounded-3xl border p-6 text-center dyn-bg dyn-border"
        style={{ '--dyn-bg': CARD_BG, '--dyn-border': CARD_BORDER } as React.CSSProperties}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 w-7 h-7 rounded-full bg-black/25 flex items-center justify-center text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center dyn-bg" style={{ '--dyn-bg': GREEN } as React.CSSProperties}>
          <Check className="w-9 h-9 text-white" strokeWidth={3} />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Missão Iniciada!</h3>
        <p className="text-gray-300 text-sm leading-snug mb-5">
          Jogue os jogos dessa missão <span className="dyn-text font-semibold" style={{ '--dyn-text': '#C9A6FF' } as React.CSSProperties}>para continuar.</span>
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-full border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

// ─── Detail row ────────────────────────────────────────────────────────────────

function DetailRow({
  icon: Icon, label, expandable, expanded, onToggle, description,
}: {
  icon: React.ElementType; label: string; expandable?: boolean; expanded?: boolean; onToggle?: () => void; description?: string;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl dyn-bg cursor-pointer"
        style={{ '--dyn-bg': ROW_BG } as React.CSSProperties}
      >
        <span className="flex items-center gap-2.5 text-white text-sm font-medium">
          <Icon className="w-4 h-4 flex-shrink-0 dyn-text" style={{ '--dyn-text': ICON_PURPLE } as React.CSSProperties} />
          {label}
        </span>
        {expandable
          ? <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        }
      </button>
      {expandable && expanded && description && (
        <p className="text-gray-400 text-xs px-4 pt-2 pb-1 leading-snug">{description}</p>
      )}
    </div>
  );
}

// ─── Mission card ─────────────────────────────────────────────────────────────

function MissionCard({ mission, onStart, onClaim }: { mission: Mission; onStart: (id: string) => void; onClaim: (id: string) => void }) {
  const [missionRowOpen, setMissionRowOpen] = useState(true);
  const countdown = useCountdown(mission.countdownEndsAt);

  const isDaily = mission.kind === 'daily';
  const showTimer = !!countdown && (mission.status === 'in-progress' || mission.status === 'ready-to-claim');

  return (
    <div className="rounded-3xl border overflow-hidden flex flex-col dyn-bg dyn-border" style={{ '--dyn-bg': CARD_BG, '--dyn-border': CARD_BORDER } as React.CSSProperties}>
      {/* Image */}
      <div className="relative aspect-[4/3]">
        <img src={mission.image} alt={mission.title} className="w-full h-full object-cover" />
        {showTimer && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-black/45 rounded-full px-2.5 py-1 font-mono">
            <Clock className="w-3 h-3" /> {countdown}
          </span>
        )}
        {isDaily && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase text-white rounded-full px-2.5 py-1 dyn-bg" style={{ '--dyn-bg': GREEN } as React.CSSProperties}>
            Diária
          </span>
        )}
      </div>

      {/* Lower panel */}
      <div className="flex-1 flex flex-col px-4 pb-4 pt-0 dyn-bg" style={{ '--dyn-bg': PANEL_BG } as React.CSSProperties}>
        {/* Reward badge — floats over the image/panel seam */}
        <div className="flex justify-center -mt-4 mb-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white rounded-full px-3.5 py-1.5 shadow-lg dyn-bg whitespace-nowrap" style={{ '--dyn-bg': ACCENT_PURPLE } as React.CSSProperties}>
            <Gift className="w-3.5 h-3.5" /> {mission.rewardLabel.toUpperCase()}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg text-center mb-3 leading-snug">{mission.title}</h3>

        {/* CTA button */}
        <div className="mb-4">
          {mission.status === 'not-started' && mission.kind === 'indeterminate' && (
            <button
              onClick={() => onStart(mission.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white text-sm font-bold hover:opacity-90 transition-opacity dyn-bg"
              style={{ '--dyn-bg': ACCENT_PURPLE } as React.CSSProperties}
            >
              <Target className="w-4 h-4" /> PARTICIPAR
            </button>
          )}
          {mission.status === 'not-started' && mission.kind === 'daily' && (
            <button
              onClick={() => onStart(mission.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white text-sm font-bold hover:opacity-90 transition-opacity dyn-bg"
              style={{ '--dyn-bg': GREEN } as React.CSSProperties}
            >
              <CheckSquare className="w-4 h-4" /> ACEITAR MISSÃO
            </button>
          )}
          {mission.status === 'in-progress' && (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white/90 text-sm font-bold border cursor-default dyn-bg dyn-border"
              style={{ '--dyn-bg': '#5A159C', '--dyn-border': '#8C21F1' } as React.CSSProperties}
            >
              <Clock className="w-4 h-4" /> PARTICIPANDO
            </button>
          )}
          {mission.status === 'ready-to-claim' && (
            <button
              onClick={() => onClaim(mission.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[#3D2600] text-sm font-bold hover:opacity-90 transition-opacity dyn-bg"
              style={{ '--dyn-bg': AMBER } as React.CSSProperties}
            >
              <Gift className="w-4 h-4" /> RESGATAR
            </button>
          )}
          {mission.status === 'claimed' && (
            <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold dyn-bg dyn-text" style={{ '--dyn-bg': '#00C44D22', '--dyn-text': GREEN } as React.CSSProperties}>
              <Check className="w-4 h-4" /> RESGATADO
            </div>
          )}
          {mission.status === 'expired' && (
            <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold bg-white/5 text-gray-500">
              MISSÃO EXPIRADA
            </div>
          )}
        </div>

        {/* Detail rows */}
        <div className="flex flex-col gap-2 mt-auto">
          <DetailRow
            icon={Star}
            label="Missão"
            expandable
            expanded={missionRowOpen}
            onToggle={() => setMissionRowOpen(o => !o)}
            description={mission.description}
          />
          <DetailRow icon={Trophy} label="Prêmio da missão" />
          <DetailRow icon={FileText} label="Tarefas" />
          <DetailRow icon={Gamepad2} label="Jogos participantes" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: Tab }) {
  const copy: Record<Tab, string> = {
    todas: 'Nenhuma missão no momento',
    ativas: 'Nenhuma missão ativa',
    completas: 'Nenhuma missão concluída ainda',
    expiradas: 'Nenhuma missão expirada',
  };
  return (
    <div className="col-span-full text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white/5 border border-white/[0.08]">
        <Trophy className="w-8 h-8 text-gray-600" />
      </div>
      <p className="text-white font-semibold text-base mb-1">{copy[tab]}</p>
      <p className="text-gray-500 text-sm">Volte em breve para conferir novas missões.</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type Tab = 'todas' | 'ativas' | 'completas' | 'expiradas';

const TABS: { key: Tab; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'ativas', label: 'Ativas' },
  { key: 'completas', label: 'Completas' },
  { key: 'expiradas', label: 'Expiradas' },
];

interface Props {
  onNavigateStatic?: (slug: string) => void;
}

export function MissionsPage({ onNavigateStatic }: Props) {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [tab, setTab] = useState<Tab>('todas');
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const requestStart = (id: string) => {
    setPendingId(id);
    setModalOpen(true);
  };

  const confirmStart = () => {
    if (pendingId) {
      setMissions(prev => prev.map(m => {
        if (m.id !== pendingId) return m;
        const isDaily = m.kind === 'daily';
        return {
          ...m,
          status: 'in-progress',
          countdownEndsAt: isDaily ? Date.now() + 24 * 3600 * 1000 : undefined,
        };
      }));
    }
    setModalOpen(false);
    setPendingId(null);
  };

  const claimMission = (id: string) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, status: 'claimed' } : m));
  };

  const filtered = missions.filter(m => {
    if (tab === 'todas') return true;
    if (tab === 'ativas') return m.status === 'not-started' || m.status === 'in-progress';
    if (tab === 'completas') return m.status === 'ready-to-claim' || m.status === 'claimed';
    if (tab === 'expiradas') return m.status === 'expired';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero strip */}
      <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#D4AF3722]">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">Missões</h1>
              <p className="text-gray-400 text-xs mt-0.5">Complete missões e desbloqueie rodadas grátis e prêmios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-30 border-b border-white/15 bg-[#16103D]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {TABS.map(t => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  active ? 'text-white border-transparent dyn-bg' : 'text-gray-400 bg-white/5 border-white/[0.08] hover:text-white hover:bg-white/10'
                }`}
                style={{ '--dyn-bg': ACCENT_PURPLE } as React.CSSProperties}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.length === 0
              ? <EmptyState tab={tab} />
              : filtered.map(m => (
                <MissionCard key={m.id} mission={m} onStart={requestStart} onClaim={claimMission} />
              ))
            }
          </div>
        </div>
      </div>

      {modalOpen && <MissionStartedModal onClose={confirmStart} />}

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
