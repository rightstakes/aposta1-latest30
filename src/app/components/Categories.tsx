import imgAviator from '../../imports/category-aviator.webp';
import imgMissoes from '../../imports/category-missoes.webp';
import imgCashback from '../../imports/category-cashback.webp';
import imgPromocoes from '../../imports/category-promocoes.webp';
import imgNovosJogos from '../../imports/category-novos-jogos.webp';
import imgSlots from '../../imports/category-slots.webp';
import imgBingo from '../../imports/category-bingo.webp';
import imgCassino from '../../imports/category-cassino.webp';
import imgRoletas from '../../imports/category-roletas.webp';
import imgEsports from '../../imports/category-esports.webp';
import imgMines from '../../imports/category-mines.webp';
import imgSuporte from '../../imports/category-suporte.webp';

const categories = [
  { img: imgAviator, label: 'Aviator' },
  { img: imgMissoes, label: 'Missões' },
  { img: imgCashback, label: 'Cashback' },
  { img: imgPromocoes, label: 'Promoções' },
  { img: imgNovosJogos, label: 'Novos Jogos' },
  { img: imgSlots, label: 'Slots' },
  { img: imgBingo, label: 'Bingo' },
  { img: imgCassino, label: 'Cassino' },
  { img: imgRoletas, label: 'Roletas' },
  { img: imgEsports, label: 'E-Sports' },
  { img: imgMines, label: 'Mines' },
  { img: imgSuporte, label: 'Suporte' },
];

export function Categories() {
  return (
    <div className="mb-5">
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2.5">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group flex-shrink-0 w-16 lg:w-[72px] flex flex-col items-center gap-1.5 text-center transition-colors"
            >
              <span className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden border border-[#6335C9]">
                <img src={category.img} alt={category.label} className="w-full h-full object-cover" />
              </span>
              <span className="text-white text-[11px] leading-tight text-center font-medium whitespace-normal group-hover:text-[#D4AF37]">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
