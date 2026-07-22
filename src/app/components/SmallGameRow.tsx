import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface Game {
  title: string;
  provider: string;
  image: string;
}

interface SmallGameRowProps {
  title: string;
  icon?: React.ReactNode;
  games: Game[];
}

export function SmallGameRow({ title, icon, games }: SmallGameRowProps) {
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
          <h2 className="text-white text-lg">{title}</h2>
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
        className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {games.map((game, index) => (
          <button
            key={index}
            className="rounded-lg overflow-hidden group hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all flex-shrink-0 w-[30vw] sm:w-[calc(14.28%-10.3px)] sm:min-w-[140px] relative"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  console.error('Failed to load image:', game.image);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black sm:via-black/40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 hidden sm:block">
                <h3 className="text-white text-xs font-medium mb-0.5 truncate drop-shadow-lg">{game.title}</h3>
                <span className="text-gray-200 text-[10px] truncate block drop-shadow-md">{game.provider}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
