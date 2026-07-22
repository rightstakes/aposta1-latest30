import { useState } from 'react';
import { Footer } from '../components/Footer';
import { promos } from '../data/promos';
import type { Promo } from '../data/promos';
import imgB1 from '../../imports/image-b1-1.png';
import imgB2 from '../../imports/image-b2-1.png';
import imgB3 from '../../imports/image-b3-1.png';

const BANNERS = { b1: imgB1, b2: imgB2, b3: imgB3 };

const tabs = [
  { label: 'Todos', value: 'all' },
  { label: 'Cassino', value: 'cassino' },
  { label: 'Esportes', value: 'esportes' },
  { label: 'Torneios', value: 'torneios' },
  { label: 'Outros', value: 'outros' },
];

interface Props {
  onOpenPromo: (id: string) => void;
  onNavigateStatic?: (slug: string) => void;
}

function PromoCard({ promo, onOpen }: { promo: Promo; onOpen: () => void }) {
  const banner = BANNERS[promo.bannerKey];
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1147] flex flex-col hover:border-white/20 transition-colors">
      <div className="h-44 overflow-hidden bg-[#0E092E]">
        <img src={banner} alt={promo.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span
          className="self-start text-black text-[10px] font-extrabold px-2.5 py-1 rounded-lg mb-3 uppercase tracking-wide"
          style={{ backgroundColor: promo.tagColor }}
        >
          {promo.tag}
        </span>
        <h3 className="text-white font-bold text-base mb-1 leading-snug">{promo.title}</h3>
        <p className="text-gray-400 text-xs mb-1">{promo.subtitle}</p>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{promo.description}</p>
        <button
          onClick={onOpen}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#00C44D' }}
        >
          {promo.cta}
        </button>
      </div>
    </div>
  );
}

export function PromotionsPage({ onOpenPromo, onNavigateStatic }: Props) {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? promos : promos.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-30 bg-[#16103D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3 sm:pt-5 sm:pb-3">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.value ? 'text-white' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                style={activeTab === tab.value ? { backgroundColor: '#00C44D' } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">Promoções</h1>
            <p className="text-gray-400 text-sm sm:text-base">Confira nossas promoções exclusivas e aproveite os melhores bônus!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(promo => (
              <PromoCard key={promo.id} promo={promo} onOpen={() => onOpenPromo(promo.id)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500 text-sm">Nenhuma promoção encontrada.</div>
          )}
        </div>
        <Footer onNavigate={onNavigateStatic} />
      </div>
    </div>
  );
}
