import { Flame, Star, Trophy, ExternalLink, DollarSign } from 'lucide-react';

const bettingData = [
  {
    game: 'AVIATOR',
    icon: Flame,
    badge: 'Ao vivo agora',
    badgeColor: 'bg-green-500',
    odds: [
      { team: 'Flamingo', value: '1.45' },
      { team: 'Empate', value: '3.80' },
      { team: 'Corinthians', value: '3.50' }
    ],
    markets: '+198'
  },
  {
    game: 'AVIATOR',
    icon: Star,
    badge: 'Popular',
    badgeColor: 'bg-purple-500',
    odds: [
      { team: 'Liverpool', value: '2.10' },
      { team: 'Empate', value: '3.20' },
      { team: 'Chelsea', value: '4.00' }
    ],
    markets: '+184'
  },
  {
    game: 'AVIATOR',
    icon: Trophy,
    badge: 'Torneio',
    badgeColor: 'bg-yellow-500',
    odds: [
      { team: 'PSG', value: '1.83' },
      { team: 'Empate', value: '3.60' },
      { team: 'Olympique', value: '4.50' }
    ],
    markets: '+176'
  },
];

export function BettingTable() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg">Apostas Ao Vivo</h2>
        <button className="text-purple-400 text-sm hover:text-purple-300">
          Ver todas as partidas ao vivo →
        </button>
      </div>

      <div className="bg-[#1f1f35] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-900/30">
              <th className="text-left text-gray-400 text-xs px-4 py-3">JOGO</th>
              <th className="text-center text-gray-400 text-xs px-4 py-3">1</th>
              <th className="text-center text-gray-400 text-xs px-4 py-3">X</th>
              <th className="text-center text-gray-400 text-xs px-4 py-3">2</th>
              <th className="text-center text-gray-400 text-xs px-4 py-3">+</th>
            </tr>
          </thead>
          <tbody>
            {bettingData.map((row, index) => (
              <tr key={index} className="border-b border-purple-900/20 hover:bg-purple-900/10">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <row.icon className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-white text-sm">{row.game}</div>
                      <span className={`${row.badgeColor} text-white text-xs px-2 py-0.5 rounded`}>
                        {row.badge}
                      </span>
                    </div>
                  </div>
                </td>
                {row.odds.map((odd, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    <button className="bg-purple-700/50 hover:bg-purple-600 text-white px-4 py-2 rounded text-sm min-w-[60px]">
                      {odd.value}
                    </button>
                  </td>
                ))}
                <td className="px-4 py-3 text-center">
                  <button className="text-purple-400 hover:text-purple-300 text-sm">
                    {row.markets}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
