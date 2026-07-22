import { useState } from 'react';
import { ChevronLeft, Trophy, Users, Medal, Clock, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { tournaments } from '../data/tournaments';
import type { Tournament } from '../data/tournaments';

type TFilter = 'todos' | 'disponiveis' | 'finalizados';

const placeLabels = ['🥇', '🥈', '🥉'];

function TournamentCard({ t, onDetail }: { t: Tournament; onDetail: () => void }) {
  const finished = t.status === 'finished';

  return (
    <div
      className={`rounded-2xl overflow-hidden border flex flex-col transition-all ${
        finished ? 'border-white/15 opacity-65' : 'border-white/10 hover:border-[#D4AF37]/30 hover:shadow-lg hover:shadow-[#D4AF37]/10'
      }`}
      style={{ background: 'linear-gradient(160deg,#131a27 0%,#0b0c14 100%)' }}
    >
      {/* Wide landscape banner — matches reference aspect ratio */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/7' }}>
        <img
          src={t.image}
          alt={t.name}
          className="w-full h-full object-cover"
          style={finished
            ? { filter: 'grayscale(80%) brightness(0.5)' }
            : { filter: 'brightness(0.8) saturate(1.1)' }}
        />
        {/* Dark gradient — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

        {/* Badge — top left */}
        <span
          className="absolute top-2.5 left-3 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full"
          style={{ backgroundColor: t.badgeColor }}
        >
          {t.badge}
        </span>

        {/* Participants — top right */}
        <div className="absolute top-2.5 right-3 flex items-center gap-1 bg-black/55 backdrop-blur-sm rounded-full px-2 py-0.5">
          <Users className="w-3 h-3 text-gray-300" />
          <span className="text-white text-[10px] font-semibold">{t.participants.toLocaleString('pt-BR')}</span>
        </div>

        {/* Name + provider overlaid at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2.5">
          <p className="text-gray-400 text-[9px] uppercase tracking-widest leading-none mb-0.5">{t.provider}</p>
          <h3 className="text-white font-bold text-sm leading-snug">{t.name}</h3>
        </div>
      </div>

      {/* Content below banner */}
      <div className="px-3 pt-3 pb-3 flex flex-col gap-2.5">

        {/* Total prize */}
        <div>
          <p className="text-gray-500 text-[9px] uppercase tracking-wider leading-none mb-0.5">Prêmio Total</p>
          <p className="font-extrabold text-base leading-none" style={{ color: '#D4AF37' }}>{t.totalPrize}</p>
        </div>

        {/* Prize chips row */}
        <div className="flex gap-1.5">
          {t.prizes.map((p, i) => (
            <div key={i} className="flex-1 flex items-center gap-1 bg-white/4 border border-white/6 rounded-xl px-2 py-1.5">
              <span className="text-sm leading-none">{placeLabels[i]}</span>
              <span className="text-white text-[10px] font-bold truncate">{p.amount}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        {finished ? (
          <button
            onClick={onDetail}
            className="w-full py-2 rounded-xl text-xs font-bold text-gray-400 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Ver Resultado
          </button>
        ) : (
          <button
            onClick={onDetail}
            className="w-full py-2 rounded-xl text-xs font-bold text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#D4AF37' }}
          >
            Saiba mais
          </button>
        )}
      </div>
    </div>
  );
}

interface Props {
  onGoHome: () => void;
  onNavigateStatic?: (slug: string) => void;
  onSelectTournament: (id: string) => void;
}

const FILTERS: { key: TFilter; label: string }[] = [
  { key: 'todos',        label: 'Todos' },
  { key: 'disponiveis',  label: 'Disponíveis' },
  { key: 'finalizados',  label: 'Finalizados' },
];

export function TournamentsPage({ onGoHome, onNavigateStatic, onSelectTournament }: Props) {
  const [filter, setFilter] = useState<TFilter>('todos');

  const available = tournaments.filter(t => t.status === 'available');
  const finished   = tournaments.filter(t => t.status === 'finished');

  const showAvailable = filter === 'todos' || filter === 'disponiveis';
  const showFinished  = filter === 'todos' || filter === 'finalizados';

  return (
    <div className="min-h-screen flex flex-col">

      {/* Page hero strip — matches MyAccountPage / ReferPage */}
      <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs mb-4 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Início
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF3722' }}>
              <Trophy className="w-5 h-5" style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">Torneios</h1>
              <p className="text-gray-400 text-xs mt-0.5">
                Participe de torneios diários, semanais e especiais e concorra a milhares de reais em prêmios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky filter tabs */}
      <div className="sticky top-0 z-30 bg-[#16103D] border-b border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 py-3 sm:pt-4 sm:pb-3 overflow-x-auto [scrollbar-width:none]">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{ flexShrink: 0, backgroundColor: filter === f.key ? '#D4AF37' : undefined }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  filter === f.key
                    ? 'text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/[0.08]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

          {/* Available section */}
          {showAvailable && available.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5" style={{ color: '#D4AF37' }} />
                  <h2 className="text-white font-bold text-lg">Disponíveis</h2>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: '#D4AF3722', color: '#D4AF37' }}>
                  {available.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {available.map(t => (
                  <TournamentCard key={t.id} t={t} onDetail={() => onSelectTournament(t.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Finished section */}
          {showFinished && finished.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" />
                  <h2 className="text-white font-bold text-lg">Finalizados</h2>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                  {finished.length}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {finished.map(t => (
                  <TournamentCard key={t.id} t={t} onDetail={() => onSelectTournament(t.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Empty state */}
          {((filter === 'disponiveis' && available.length === 0) || (filter === 'finalizados' && finished.length === 0)) && (
            <div className="text-center py-20">
              <Trophy className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Nenhum torneio encontrado nesta categoria.</p>
            </div>
          )}

        </div>
      </div>

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
