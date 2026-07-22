import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Footer } from '../components/Footer';

import imgMrTreasure from '../../imports/mr-treasures-fortune-featured.png';
import imgKnockout from '../../imports/Knockout-riches-featured.png';
import imgFortuneMouse from '../../imports/fortune-mouse-featured.png';
import imgDoomsday from '../../imports/doomsday-rampage-featured.png';
import imgSweetBonanza from '../../imports/SweetBonanza-featured.png';
import imgBuffaloKing from '../../imports/Buffalo-King-featured.png';
import imgGatesOlympus from '../../imports/Gates-of-Olympus-featured.png';
import imgPenaltyShoot from '../../imports/penalty-shoot-out-featured.png';
import imgOx from '../../imports/ox-featured.png';
import imgZeus from '../../imports/Zeus-lightning-featured.png';

export type PageType = 'jogos' | 'slots' | 'cassino';

interface Game { title: string; provider: string; image: string }

const ALL: Game[] = [
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
];

const rotate = (arr: Game[], n: number) => [...arr.slice(n), ...arr.slice(0, n)];

const PAGE_CONFIG: Record<PageType, {
  heading: string;
  tabs: string[];
  sections: { title: string; games: Game[] }[];
}> = {
  jogos: {
    heading: 'Jogos',
    tabs: ['Todos os Jogos', 'Mais Populares', 'Novidades'],
    sections: [
      { title: 'Mais Populares', games: rotate(ALL, 0) },
      { title: 'Novidades', games: rotate(ALL, 3) },
      { title: 'Recomendados', games: rotate(ALL, 6) },
      { title: 'Clássicos', games: rotate(ALL, 2) },
    ],
  },
  slots: {
    heading: 'Slots',
    tabs: ['Todos os Slots', 'Jackpots', 'Megaways'],
    sections: [
      { title: 'Slots em Alta', games: rotate(ALL, 1) },
      { title: 'Jackpots', games: rotate(ALL, 4) },
      { title: 'Megaways', games: rotate(ALL, 7) },
      { title: 'Novos Slots', games: rotate(ALL, 2) },
    ],
  },
  cassino: {
    heading: 'Cassino',
    tabs: ['Casino', 'Lobby Ao Vivo', 'Todos os Jogos'],
    sections: [
      { title: 'Cassino em Português', games: rotate(ALL, 0) },
      { title: 'Game Shows', games: rotate(ALL, 3) },
      { title: 'Roleta ao Vivo', games: rotate(ALL, 6) },
      { title: 'Blackjack', games: rotate(ALL, 2) },
    ],
  },
};

function GameRow({ title, games }: { title: string; games: Game[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold text-base sm:text-lg">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="text-white p-1.5 rounded transition-colors border border-[#00C44D]/40 hover:border-[#00C44D]"
            style={{ backgroundColor: '#00C44D22' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00C44D')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00C44D22')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="text-white p-1.5 rounded transition-colors border border-[#00C44D]/40 hover:border-[#00C44D]"
            style={{ backgroundColor: '#00C44D22' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00C44D')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00C44D22')}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {games.map((game, i) => (
          <button
            key={i}
            className="flex-shrink-0 rounded-xl overflow-hidden group hover:scale-105 transition-all hover:shadow-xl hover:shadow-purple-500/30 w-[30vw] sm:w-40 md:w-44 relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 hidden sm:block">
                <p className="text-white text-xs font-medium truncate">{game.title}</p>
                <p className="text-gray-300 text-[10px] truncate">{game.provider}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

interface Props {
  page: PageType;
  onNavigateStatic?: (slug: string) => void;
}

export function GameCategoryPage({ page, onNavigateStatic }: Props) {
  const config = PAGE_CONFIG[page];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky filter bar — top-0 because <main> is the scroll container */}
      <div className="sticky top-0 z-30 bg-[#16103D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile-only search bar above tabs */}
          <div className="sm:hidden pt-3 pb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar jogos, categorias..."
                className="w-full bg-white/5 text-white placeholder-gray-400 pl-4 pr-10 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border border-white/15"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Tab pills */}
          <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3 sm:pt-5 sm:pb-3">
            {config.tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === i
                    ? 'text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                style={activeTab === i ? { backgroundColor: '#00C44D' } : {}}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-4">
          {config.sections.map((section, i) => (
            <GameRow key={i} title={section.title} games={section.games} />
          ))}
        </div>

        <Footer onNavigate={onNavigateStatic} />
      </div>
    </div>
  );
}
