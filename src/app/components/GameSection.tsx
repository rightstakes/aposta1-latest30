import { Star, Flame, Clock, Sparkles } from 'lucide-react';

interface Game {
  title: string;
  provider: string;
  rtp?: string;
  gradient: string;
  emoji: string;
}

interface GameSectionProps {
  title: string;
  icon?: 'star' | 'flame' | 'clock' | 'sparkles';
  games: Game[];
}

const iconMap = {
  star: Star,
  flame: Flame,
  clock: Clock,
  sparkles: Sparkles,
};

export function GameSection({ title, icon = 'star', games }: GameSectionProps) {
  const Icon = iconMap[icon];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded">
          <Icon className="w-4 h-4 text-white fill-white" />
        </div>
        <h2 className="text-white text-lg">{title}</h2>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {games.map((game, index) => (
          <button
            key={index}
            className={`bg-gradient-to-b ${game.gradient} rounded-lg overflow-hidden group hover:scale-105 transition-transform`}
          >
            <div className="aspect-[3/4] flex items-center justify-center text-6xl">
              {game.emoji}
            </div>
            <div className="bg-black/40 p-3 text-left">
              <h3 className="text-white text-sm font-bold mb-1 truncate">{game.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-xs truncate">{game.provider}</span>
                {game.rtp && (
                  <span className="text-green-400 text-xs">{game.rtp}</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
