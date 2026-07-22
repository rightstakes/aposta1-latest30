import { Star } from 'lucide-react';

const games = [
  {
    title: 'AVIATOR',
    provider: 'Spribe',
    rtp: '93.13%',
    gradient: 'from-red-600 to-orange-500',
    emoji: '✈️'
  },
  {
    title: 'FORTUNE',
    provider: 'PG Soft',
    rtp: '94.54%',
    gradient: 'from-orange-500 to-yellow-500',
    emoji: '🎰'
  },
  {
    title: 'GATES OF OLYMPUS',
    provider: 'Pragmatic',
    rtp: '97.01%',
    gradient: 'from-purple-700 to-purple-900',
    emoji: '⚡'
  },
  {
    title: 'BIG BASS BONANZA',
    provider: 'Reel Kingdom',
    rtp: '96.71%',
    gradient: 'from-blue-500 to-blue-700',
    emoji: '🎣'
  },
  {
    title: 'ROULETTE',
    provider: 'Evolution',
    gradient: 'from-red-700 to-red-900',
    emoji: '🎡'
  },
  {
    title: 'BLACKJACK',
    provider: 'Evolution',
    gradient: 'from-purple-600 to-purple-800',
    emoji: '🃏'
  },
];

export function FeaturedGames() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded">
          <Star className="w-4 h-4 text-white fill-white" />
        </div>
        <h2 className="text-white text-lg">Jogos em Destaque</h2>
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
              <h3 className="text-white text-sm font-bold mb-1">{game.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-xs">{game.provider}</span>
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
