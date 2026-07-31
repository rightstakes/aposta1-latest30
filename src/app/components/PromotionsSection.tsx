import { promos } from '../data/promos';
import type { Promo } from '../data/promos';
import imgB1 from '../../imports/promo-ganhou-ta-na-conta.webp';
import imgB2 from '../../imports/promo-comece-a-diversao.webp';
import imgB3 from '../../imports/promo-aposta-combinada.webp';
import imgB4 from '../../imports/promo-3-ferramentas.webp';
import imgB5 from '../../imports/promo-cashback-slots.webp';
import imgB6 from '../../imports/promo-aposte-alto.webp';

const BANNERS = { b1: imgB1, b2: imgB2, b3: imgB3, b4: imgB4, b5: imgB5, b6: imgB6 };

function PromoCard({ promo, onOpen }: { promo: Promo; onOpen: () => void }) {
  const banner = BANNERS[promo.bannerKey];
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1a1147] flex flex-col hover:border-white/20 transition-colors">
      <div className="h-44 overflow-hidden bg-[#0E092E]">
        <img src={banner} alt={promo.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span
          className="self-start text-black text-[10px] font-extrabold px-2.5 py-1 rounded-lg mb-3 uppercase tracking-wide dyn-bg" style={{ '--dyn-bg': promo.tagColor } as React.CSSProperties}
        >
          {promo.tag}
        </span>
        <h3 className="text-white font-bold text-base mb-1 leading-snug">{promo.title}</h3>
        <p className="text-gray-400 text-xs mb-1">{promo.subtitle}</p>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{promo.description}</p>
        <button
          onClick={onOpen}
          className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 bg-[#00C44D]"
        >
          {promo.cta}
        </button>
      </div>
    </div>
  );
}

interface Props {
  onOpenPromo: (id: string) => void;
  onSeeAll: () => void;
}

export function PromotionsSection({ onOpenPromo, onSeeAll }: Props) {
  const preview = promos.slice(0, 3);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold">Promoções Ativas</h2>
        <button onClick={onSeeAll} className="text-purple-400 text-sm hover:text-purple-300">
          Ver Todas →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {preview.map(promo => (
          <PromoCard key={promo.id} promo={promo} onOpen={() => onOpenPromo(promo.id)} />
        ))}
      </div>
    </div>
  );
}
