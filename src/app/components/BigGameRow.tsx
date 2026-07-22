import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface Game {
  title: string;
  provider: string;
  image: string;
}

interface BigGameRowProps {
  title: string;
  icon?: React.ReactNode;
  games: Game[];
  liveTag?: boolean;
}

export function BigGameRow({ title, icon, games, liveTag }: BigGameRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded">
              {icon}
            </div>
          )}
          <div className="flex items-center gap-2">
            <h2 className="text-white text-lg">{title}</h2>
            {liveTag && (
              <span className="hidden sm:inline-flex bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">LIVE</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="text-white p-2 rounded transition-colors border border-[#00C44D]/40 hover:border-[#00C44D]"
            style={{ backgroundColor: '#00C44D22' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00C44D')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00C44D22')}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="text-white p-2 rounded transition-colors border border-[#00C44D]/40 hover:border-[#00C44D]"
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
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {games.map((game, index) => (
          <button
            key={index}
            className="rounded-lg overflow-hidden group hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 transition-all flex-shrink-0 w-[23vw] sm:w-[calc(20%-12.8px)] relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black sm:via-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 hidden sm:block">
                <h3 className="text-white text-sm font-medium mb-0.5 truncate drop-shadow-lg">{game.title}</h3>
                <span className="text-gray-200 text-xs truncate block drop-shadow-md">{game.provider}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
