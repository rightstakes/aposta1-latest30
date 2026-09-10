import { useState, useEffect } from 'react';
import {
  Star, Clock, Gift, Trophy, FileText, Gamepad2, Info, RotateCcw,
  ChevronDown, Check, X, AlertCircle, Loader2,
} from 'lucide-react';
import { Footer } from '../components/Footer';
import missionIcon from '../../imports/mission-fury-of-anubis-icon.png';

// ─── Types ────────────────────────────────────────────────────────────────────
// NOTE: This is the player-facing Missions UI. All mission data, progress,
// eligibility and expiration below is placeholder/mock — in production every
// field is supplied by the Missions API and the backend remains the single
// source of truth for progress and completion. The frontend never computes
// qualifying rounds, wins, multipliers or eligibility on its own.

type MissionType = 'target-multiplier' | 'target-cumulative-multiplier' | 'target-rounds' | 'target-wins';
type MissionStatus = 'available' | 'in-progress' | 'completed' | 'expired';

const TYPE_LABEL: Record<MissionType, string> = {
  'target-multiplier': 'Multiplicador alvo',
  'target-cumulative-multiplier': 'Multiplicador acumulado alvo',
  'target-rounds': 'Rodadas alvo',
  'target-wins': 'Vitórias alvo',
};

interface Mission {
  id: string;
  type: MissionType;
  title: string;
  image: string;
  rewardLabel: string;
  rewardDescription: string;
  objective: string;
  targetValue: number;
  targetUnit: string;
  progressValue: number;
  minQualifyingStake: number;
  eligibleGames: string[];
  terms: string;
  status: MissionStatus;
  availableUntil?: string;
  countdownEndsAt?: number;
  eligible: boolean;
}

const TERMS = 'Válida apenas para apostas com dinheiro real. Consulte os termos completos da promoção.';

const initialMissions: Mission[] = [
  // ── Available — one card per MVP mission type ──
  {
    id: 'm1', type: 'target-multiplier', title: 'Missão Multiplicador 50x', image: missionIcon,
    rewardLabel: '5 Rodadas Grátis', rewardDescription: '5 rodadas grátis em Fury Of Anubis, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Alcance um multiplicador de 50x em uma única rodada.',
    targetValue: 50, targetUnit: 'x', progressValue: 0,
    minQualifyingStake: 5, eligibleGames: ['Fury Of Anubis'], terms: TERMS,
    status: 'available', availableUntil: '30/09/2026', eligible: true,
  },
  {
    id: 'm2', type: 'target-cumulative-multiplier', title: 'Missão Multiplicador Acumulado', image: missionIcon,
    rewardLabel: '15 Rodadas Grátis', rewardDescription: '15 rodadas grátis em jogos selecionados, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Acumule 200x de multiplicador somando o resultado de várias rodadas.',
    targetValue: 200, targetUnit: 'x', progressValue: 0,
    minQualifyingStake: 5, eligibleGames: ['Gates of Olympus', 'Sweet Bonanza', 'Zeus Lightning'], terms: TERMS,
    status: 'available', availableUntil: '30/09/2026', eligible: true,
  },
  {
    id: 'm3', type: 'target-rounds', title: 'Missão 30 Rodadas', image: missionIcon,
    rewardLabel: 'R$20 em Bônus', rewardDescription: 'R$20 em bônus creditados diretamente na sua conta de Bônus.',
    objective: 'Jogue 30 rodadas qualificadas nos jogos participantes.',
    targetValue: 30, targetUnit: 'rodadas', progressValue: 0,
    minQualifyingStake: 5, eligibleGames: ['Buffalo King', 'Fortune Ox'], terms: TERMS,
    status: 'available', availableUntil: '28/09/2026', eligible: true,
  },
  {
    id: 'm4', type: 'target-wins', title: 'Missão 10 Vitórias', image: missionIcon,
    rewardLabel: '10 Rodadas Grátis', rewardDescription: '10 rodadas grátis em jogos selecionados, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Vença 10 rodadas qualificadas nos jogos participantes.',
    targetValue: 10, targetUnit: 'vitórias', progressValue: 0,
    minQualifyingStake: 5, eligibleGames: ['Knockout Riches', 'Doomsday Rampage'], terms: TERMS,
    status: 'available', availableUntil: '28/09/2026', eligible: true,
  },

  // No mission starts in progress: the player must accept one explicitly.
  // Accepting any card below moves it to the in-progress state and, per the
  // one-active-mission rule, disables acceptance on the remaining cards.
  {
    id: 'm5', type: 'target-cumulative-multiplier', title: 'Missão Fury Of Anubis', image: missionIcon,
    rewardLabel: '15 Rodadas Grátis', rewardDescription: '15 rodadas grátis em Fury Of Anubis, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Acumule 200x de multiplicador somando o resultado de várias rodadas.',
    targetValue: 200, targetUnit: 'x', progressValue: 0,
    minQualifyingStake: 5, eligibleGames: ['Fury Of Anubis', 'Gates of Olympus'], terms: TERMS,
    status: 'available', availableUntil: '30/09/2026', eligible: true,
  },

  // ── Completed — reward is created in the Bonus system ──
  {
    id: 'm6', type: 'target-rounds', title: 'Missão 25 Rodadas', image: missionIcon,
    rewardLabel: 'R$20 em Bônus', rewardDescription: 'R$20 em bônus creditados diretamente na sua conta de Bônus.',
    objective: 'Jogue 25 rodadas qualificadas nos jogos participantes.',
    targetValue: 25, targetUnit: 'rodadas', progressValue: 25,
    minQualifyingStake: 5, eligibleGames: ['Buffalo King', 'Sweet Bonanza'], terms: TERMS,
    status: 'completed', eligible: true,
  },
  {
    id: 'm7', type: 'target-multiplier', title: 'Missão Multiplicador 20x', image: missionIcon,
    rewardLabel: '5 Rodadas Grátis', rewardDescription: '5 rodadas grátis em jogos selecionados, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Alcance um multiplicador de 20x em uma única rodada.',
    targetValue: 20, targetUnit: 'x', progressValue: 20,
    minQualifyingStake: 5, eligibleGames: ['Zeus Lightning'], terms: TERMS,
    status: 'completed', eligible: true,
  },

  // ── Expired ──
  {
    id: 'm8', type: 'target-wins', title: 'Missão 15 Vitórias', image: missionIcon,
    rewardLabel: '10 Rodadas Grátis', rewardDescription: '10 rodadas grátis em jogos selecionados, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Vença 15 rodadas qualificadas nos jogos participantes.',
    targetValue: 15, targetUnit: 'vitórias', progressValue: 4,
    minQualifyingStake: 5, eligibleGames: ['Knockout Riches'], terms: TERMS,
    status: 'expired', eligible: true,
  },
  {
    id: 'm9', type: 'target-rounds', title: 'Missão 40 Rodadas', image: missionIcon,
    rewardLabel: '15 Rodadas Grátis', rewardDescription: '15 rodadas grátis em jogos selecionados, creditadas na sua conta de Bônus após a conclusão.',
    objective: 'Jogue 40 rodadas qualificadas nos jogos participantes.',
    targetValue: 40, targetUnit: 'rodadas', progressValue: 12,
    minQualifyingStake: 5, eligibleGames: ['Fortune Ox', 'Doomsday Rampage'], terms: TERMS,
    status: 'expired', eligible: true,
  },
];

// ─── Mock API layer ─────────────────────────────────────────────────────────
// Stand-ins for the real Missions API calls. Replace the body of these two
// functions with actual fetch calls once the backend endpoints are available.
// The UI already waits for the promise to resolve before updating any state,
// and handles rejection with an error + retry path.

function acceptMissionRequest(_missionId: string): Promise<{ countdownEndsAt?: number }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ countdownEndsAt: Date.now() + 24 * 3600 * 1000 }), 700);
  });
}

function abandonMissionRequest(_missionId: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}

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

// ─── Mission Started confirmation (only shown after backend confirms) ────────

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
        <h3 className="text-white font-bold text-xl mb-2">Missão iniciada!</h3>
        <p className="text-gray-300 text-sm leading-snug mb-5">
          Sua jogada nos jogos participantes <span className="dyn-text font-semibold" style={{ '--dyn-text': '#C9A6FF' } as React.CSSProperties}>contará para o progresso desta missão.</span>
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

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = GREEN }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all dyn-bg dyn-width" style={{ '--dyn-bg': color, '--dyn-width': `${pct}%` } as React.CSSProperties} />
    </div>
  );
}

// ─── Expandable detail section (card back) ───────────────────────────────────

function DetailSection({
  icon: Icon, label, expanded, onToggle, children,
}: {
  icon: React.ElementType; label: string; expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="shrink-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl dyn-bg"
        style={{ '--dyn-bg': ROW_BG } as React.CSSProperties}
      >
        <span className="flex items-center gap-2.5 text-white text-[13px] font-medium">
          <Icon className="w-4 h-4 shrink-0 dyn-text" style={{ '--dyn-text': ICON_PURPLE } as React.CSSProperties} />
          {label}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="px-3.5 pt-2 pb-1 text-gray-400 text-xs leading-snug space-y-1.5">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main CTA — shown on both the front and the details (flipped) side ───────

function MissionCta({
  mission, accepting, error, blocked, onAccept, onAbandon, onGoToBonus,
}: {
  mission: Mission;
  accepting: boolean;
  error: string | null;
  blocked: boolean;
  onAccept: () => void;
  onAbandon: () => void;
  onGoToBonus: () => void;
}) {
  if (mission.status === 'available') {
    return (
      <>
        <button
          onClick={onAccept}
          disabled={accepting || blocked}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white text-sm font-bold transition-opacity dyn-bg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          style={{ '--dyn-bg': ACCENT_PURPLE } as React.CSSProperties}
        >
          {accepting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          {accepting ? 'ACEITANDO...' : 'ACEITAR MISSÃO'}
        </button>
        {blocked && !accepting && (
          <p className="text-gray-500 text-[11px] text-center mt-2">Conclua a missão em andamento para aceitar outra.</p>
        )}
        {error && (
          <p className="text-red-400 text-[11px] text-center mt-2 flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {error}
          </p>
        )}
      </>
    );
  }

  if (mission.status === 'in-progress') {
    return (
      <>
        <button
          disabled
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white/90 text-sm font-bold border cursor-default dyn-bg dyn-border"
          style={{ '--dyn-bg': '#5A159C', '--dyn-border': '#8C21F1' } as React.CSSProperties}
        >
          <Clock className="w-4 h-4" /> PARTICIPANDO
        </button>
        <button
          onClick={onAbandon}
          className="w-full text-center text-gray-500 hover:text-gray-300 text-[11px] mt-2 underline underline-offset-2"
        >
          Abandonar missão
        </button>
      </>
    );
  }

  if (mission.status === 'completed') {
    return (
      <button
        onClick={onGoToBonus}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white text-sm font-bold hover:opacity-90 transition-opacity dyn-bg"
        style={{ '--dyn-bg': GREEN } as React.CSSProperties}
      >
        <Gift className="w-4 h-4" /> VER RECOMPENSA NO BÔNUS
      </button>
    );
  }

  return (
    <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold bg-white/5 text-gray-500">
      MISSÃO EXPIRADA
    </div>
  );
}

// ─── Mission card (flips to reveal details) ──────────────────────────────────

type SectionKey = 'missao' | 'premio' | 'tarefas' | 'jogos';

function MissionCard({
  mission, hasActiveMission, onAccept, onAbandon, onGoToBonus,
}: {
  mission: Mission;
  hasActiveMission: boolean;
  onAccept: (id: string) => Promise<void>;
  onAbandon: (id: string) => Promise<void>;
  onGoToBonus: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [openSection, setOpenSection] = useState<SectionKey | null>('missao');
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const countdown = useCountdown(mission.countdownEndsAt);

  const toggleSection = (key: SectionKey) => setOpenSection(prev => prev === key ? null : key);

  const handleAccept = async () => {
    setAccepting(true);
    setError(null);
    try {
      await onAccept(mission.id);
    } catch {
      setError('Não foi possível aceitar a missão. Tente novamente.');
    } finally {
      setAccepting(false);
    }
  };

  const blockedByActiveMission = mission.status === 'available' && hasActiveMission;
  const showProgress = mission.status !== 'available';
  const dimmed = mission.status === 'expired';

  return (
    <div className="h-full card-3d-perspective">
      <div
        className="relative w-full h-full transition-transform duration-500 card-3d-flip dyn-transform"
        style={{ '--dyn-transform': flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' } as React.CSSProperties}
      >
        {/* ── FRONT ── */}
        <div
          className={`relative w-full h-full min-h-[470px] rounded-3xl border flex flex-col mission-card-face dyn-bg dyn-border ${dimmed ? 'opacity-60' : ''}`}
          style={{ '--dyn-bg': CARD_BG, '--dyn-border': CARD_BORDER } as React.CSSProperties}
        >
          {/* Artwork */}
          <div className="relative p-6 flex items-center justify-center">
            <img src={mission.image} alt={mission.title} className="w-full max-w-[200px] h-auto object-contain" />
            {countdown && mission.status === 'in-progress' && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-black/45 rounded-full px-2.5 py-1 font-mono">
                <Clock className="w-3 h-3" /> {countdown}
              </span>
            )}
            {mission.status === 'completed' && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-white rounded-full px-2.5 py-1 dyn-bg" style={{ '--dyn-bg': GREEN } as React.CSSProperties}>
                <Check className="w-3 h-3" /> Concluída
              </span>
            )}
            {mission.status === 'expired' && (
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase text-gray-300 bg-black/40 rounded-full px-2.5 py-1">
                Expirada
              </span>
            )}
          </div>

          {/* Panel */}
          <div className="flex-1 flex flex-col px-4 pb-4 pt-0 rounded-b-3xl dyn-bg" style={{ '--dyn-bg': PANEL_BG } as React.CSSProperties}>
            <div className="flex justify-center -mt-4 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white rounded-full px-3.5 py-1.5 shadow-lg dyn-bg whitespace-nowrap" style={{ '--dyn-bg': ACCENT_PURPLE } as React.CSSProperties}>
                <Gift className="w-3.5 h-3.5" /> {mission.rewardLabel.toUpperCase()}
              </span>
            </div>

            <h3 className="text-white font-bold text-lg text-center mb-1 leading-snug">{mission.title}</h3>
            <p className="text-gray-500 text-[11px] text-center">{TYPE_LABEL[mission.type]}</p>

            {/* Target / progress — values come from the backend only */}
            {showProgress ? (
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
                  <span>Progresso</span>
                  <span className="text-white font-semibold">{mission.progressValue}/{mission.targetValue} {mission.targetUnit}</span>
                </div>
                <ProgressBar value={mission.progressValue} max={mission.targetValue} color={mission.status === 'expired' ? '#6b7280' : GREEN} />
              </div>
            ) : (
              <div className="mt-3 text-center">
                <p className="text-gray-400 text-[11px]">Alvo: <span className="text-white font-semibold">{mission.targetValue} {mission.targetUnit}</span></p>
                {mission.availableUntil && (
                  <p className="text-gray-500 text-[11px] mt-0.5">Disponível até {mission.availableUntil}</p>
                )}
              </div>
            )}

            {/* CTA + details */}
            <div className="mt-auto pt-4">
              <MissionCta
                mission={mission}
                accepting={accepting}
                error={error}
                blocked={blockedByActiveMission}
                onAccept={handleAccept}
                onAbandon={() => onAbandon(mission.id)}
                onGoToBonus={onGoToBonus}
              />

              <button
                onClick={() => setFlipped(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2 mt-2 rounded-full text-gray-300 text-xs font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Info className="w-3.5 h-3.5" /> Detalhes
              </button>
            </div>
          </div>
        </div>

        {/* ── BACK — mission details ── */}
        <div
          className="absolute inset-0 rounded-3xl border flex flex-col mission-card-back dyn-bg dyn-border"
          style={{ '--dyn-bg': PANEL_BG, '--dyn-border': CARD_BORDER } as React.CSSProperties}
        >
          <div className="p-4 flex flex-col flex-1 min-h-0 gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h4 className="text-white font-bold text-sm truncate">{mission.title}</h4>
                <p className="text-gray-500 text-[11px]">{TYPE_LABEL[mission.type]}</p>
              </div>
              <button
                onClick={() => setFlipped(false)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors shrink-0"
              >
                <RotateCcw className="w-3 h-3" /> Voltar
              </button>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-y-auto [scrollbar-width:none]">
              <DetailSection icon={Star} label="Missão" expanded={openSection === 'missao'} onToggle={() => toggleSection('missao')}>
                <p>{mission.objective}</p>
                <p>Alvo: {mission.targetValue} {mission.targetUnit}</p>
                <p>Aposta mínima qualificável: R$ {mission.minQualifyingStake.toFixed(2).replace('.', ',')}</p>
              </DetailSection>

              <DetailSection icon={Trophy} label="Prêmio da missão" expanded={openSection === 'premio'} onToggle={() => toggleSection('premio')}>
                <p>{mission.rewardLabel}</p>
                <p>{mission.rewardDescription}</p>
              </DetailSection>

              <DetailSection icon={FileText} label="Tarefas" expanded={openSection === 'tarefas'} onToggle={() => toggleSection('tarefas')}>
                <p>{mission.objective}</p>
                {mission.status !== 'available' && (
                  <p>Progresso atual: {mission.progressValue}/{mission.targetValue} {mission.targetUnit}</p>
                )}
                <p className="text-gray-500">{mission.terms}</p>
              </DetailSection>

              <DetailSection icon={Gamepad2} label="Jogos participantes" expanded={openSection === 'jogos'} onToggle={() => toggleSection('jogos')}>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {mission.eligibleGames.map(game => (
                    <span key={game} className="bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[11px] text-gray-300">
                      {game}
                    </span>
                  ))}
                </div>
              </DetailSection>
            </div>

            {/* Same main CTA as the front, reflecting the current state */}
            <div className="shrink-0 pt-1">
              <MissionCta
                mission={mission}
                accepting={accepting}
                error={error}
                blocked={blockedByActiveMission}
                onAccept={handleAccept}
                onAbandon={() => onAbandon(mission.id)}
                onGoToBonus={onGoToBonus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: Tab }) {
  const copy: Record<Tab, string> = {
    todas: 'Nenhuma missão disponível no momento.',
    ativas: 'Nenhuma missão em andamento.',
    completas: 'Nenhuma missão concluída ainda.',
    expiradas: 'Nenhuma missão expirada.',
  };
  return (
    <div className="col-span-full text-center py-16 px-6">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-white/5 border border-white/[0.08]">
        <Trophy className="w-8 h-8 text-gray-600" />
      </div>
      <p className="text-white font-semibold text-base mb-1">{copy[tab]}</p>
      <p className="text-gray-500 text-sm">Novas missões aparecerão aqui quando estiverem disponíveis.</p>
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
  onNavigate?: (page: string) => void;
}

export function MissionsPage({ onNavigateStatic, onNavigate }: Props) {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [tab, setTab] = useState<Tab>('todas');
  const [modalOpen, setModalOpen] = useState(false);

  // Only eligible missions are ever shown — the backend is the source of
  // truth for eligibility; this filter simply respects whatever it returns.
  const visibleMissions = missions.filter(m => m.eligible);

  const hasActiveMission = visibleMissions.some(m => m.status === 'in-progress');

  const acceptMission = async (id: string) => {
    const result = await acceptMissionRequest(id);
    // State only updates after the backend confirms acceptance.
    setMissions(prev => prev.map(m => m.id === id
      ? { ...m, status: 'in-progress', countdownEndsAt: result.countdownEndsAt }
      : m));
    setModalOpen(true);
  };

  const abandonMission = async (id: string) => {
    await abandonMissionRequest(id);
    setMissions(prev => prev.map(m => m.id === id
      ? { ...m, status: 'available', progressValue: 0, countdownEndsAt: undefined }
      : m));
  };

  const filtered = visibleMissions.filter(m => {
    if (tab === 'todas') return true;
    if (tab === 'ativas') return m.status === 'in-progress';
    if (tab === 'completas') return m.status === 'completed';
    if (tab === 'expiradas') return m.status === 'expired';
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero strip */}
      <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-[#D4AF3722]">
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
      <div className="sticky top-[82px] z-30 mt-[10px]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
            {filtered.length === 0
              ? <EmptyState tab={tab} />
              : filtered.map(m => (
                <MissionCard
                  key={m.id}
                  mission={m}
                  hasActiveMission={hasActiveMission}
                  onAccept={acceptMission}
                  onAbandon={abandonMission}
                  onGoToBonus={() => onNavigate?.('bonus')}
                />
              ))
            }
          </div>
        </div>
      </div>

      {modalOpen && <MissionStartedModal onClose={() => setModalOpen(false)} />}

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
