import { Gift, Percent, Trophy, Zap } from 'lucide-react';

const promotions = [
  {
    icon: Gift,
    title: 'Bônus de Boas-Vindas',
    description: '100% até R$500 no primeiro depósito',
    color: 'from-purple-600 to-purple-700',
    badge: 'NOVO',
  },
  {
    icon: Percent,
    title: 'Cashback Semanal',
    description: '10% de volta em todas as perdas',
    color: 'from-blue-600 to-blue-700',
    badge: 'POPULAR',
  },
  {
    icon: Trophy,
    title: 'Torneio do Mês',
    description: 'Prêmios de até R$50.000',
    color: 'from-yellow-600 to-orange-600',
    badge: 'LIMITADO',
  },
  {
    icon: Zap,
    title: 'Giros Grátis',
    description: '50 rodadas em slots selecionados',
    color: 'from-pink-600 to-pink-700',
    badge: 'ATIVO',
  },
];

export function PromotionsSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold">Promoções Ativas</h2>
        <button className="text-purple-400 text-sm hover:text-purple-300">
          Ver Todas →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${promo.color} rounded-xl p-6 relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer border border-purple-600/20 hover:border-purple-500/40`}
          >
            <div className="absolute top-3 right-3">
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {promo.badge}
              </span>
            </div>

            <div className="mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <promo.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{promo.title}</h3>
              <p className="text-white/90 text-sm">{promo.description}</p>
            </div>

            <button className="bg-white text-gray-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full">
              Participar
            </button>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
