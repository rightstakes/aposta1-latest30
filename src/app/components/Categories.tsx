import imgAllGames from '../../imports/all-games.png';
import imgAviator from '../../imports/aviator.png';
import imgCassino from '../../imports/cassino.png';
import imgCrash from '../../imports/crash.png';
import imgLiveGames from '../../imports/live-games.png';
import imgSlotGames from '../../imports/slot-games.png';
import imgPromotions from '../../imports/promotions.png';
import imgMore from '../../imports/more.png';

const categories = [
  { img: imgAllGames, label: 'Jogos' },
  { img: imgAviator, label: 'Aviator' },
  { img: imgCassino, label: 'Cassino' },
  { img: imgCrash, label: 'Crash' },
  { img: imgLiveGames, label: 'Ao Vivo' },
  { img: imgSlotGames, label: 'Slots' },
  { img: imgPromotions, label: 'Promoções' },
  { img: imgMore, label: 'Mais' },
];

export function Categories() {
  return (
    <div className="mb-5">
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 lg:grid lg:grid-cols-8">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group flex-shrink-0 w-[75px] lg:w-auto flex flex-col items-center gap-1.5 text-center transition-colors"
            >
              <span className="w-[75px] h-[75px] lg:w-[100px] lg:h-[100px] rounded-full bg-gradient-to-b from-[#411E92] to-[#2C1569] flex items-center justify-center border border-[#6335C9] group-hover:from-[#160F34] group-hover:to-[#160F34] transition-colors">
                <img src={category.img} alt="" className="w-[74%] h-[74%] object-contain" />
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
