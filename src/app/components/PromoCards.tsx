import { useState, useEffect, useRef } from 'react';
import banner1 from '@/imports/banner-nova-aposta1.webp';
import banner2 from '@/imports/banner-odds-brasileirao.webp';
import banner3 from '@/imports/banner-popok.webp';
import banner4 from '@/imports/banner-barao-vermelho.webp';
import banner5 from '@/imports/banner-cashback-slots.webp';
import banner6 from '@/imports/banner-jetx.webp';

const banners = [
  { id: 1, image: banner1, alt: 'A Nova Aposta1! Mais moderna, segura e feita pra você' },
  { id: 2, image: banner2, alt: 'Aproveite as odds do Brasileirão - acesse e monte seu bilhete' },
  { id: 3, image: banner3, alt: 'A Popok chegou com tudo - descubra os melhores slots da nova provedora' },
  { id: 4, image: banner4, alt: 'Multiplicador 20.000x - Barão Vermelho está na Aposta1' },
  { id: 5, image: banner5, alt: 'Cashback nos slots até 20% de retorno' },
  { id: 6, image: banner6, alt: 'O jato vai decolar - escolha seu assento e busque os maiores níveis no JetX' },
];

const DESKTOP_VISIBLE = 2;

export function PromoCards() {
  // Mobile: 1 banner visible at a time, native finger-scrollable with snap
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobilePaused, setMobilePaused] = useState(false);

  // Desktop: 2 banners visible at a time, sliding one position per tick
  const desktopMaxIndex = Math.max(0, banners.length - DESKTOP_VISIBLE);
  const desktopSlideCount = desktopMaxIndex + 1;
  const showDesktopSlider = banners.length > DESKTOP_VISIBLE;
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [desktopPaused, setDesktopPaused] = useState(false);

  useEffect(() => {
    if (mobilePaused || banners.length <= 1) return;

    const interval = setInterval(() => {
      setMobileIndex((prev) => {
        const next = (prev + 1) % banners.length;
        const el = mobileScrollRef.current;
        if (el) el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [mobilePaused]);

  useEffect(() => {
    if (desktopPaused || !showDesktopSlider) return;

    const interval = setInterval(() => {
      setDesktopIndex((prev) => (prev + 1) % desktopSlideCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [desktopPaused, showDesktopSlider, desktopSlideCount]);

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setMobileIndex(index);
  };

  const goToMobileSlide = (index: number) => {
    setMobileIndex(index);
    const el = mobileScrollRef.current;
    if (el) el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="mt-2 mb-2 lg:mt-6 lg:mb-6">
      {/* Mobile: 1 banner at a time, finger-scrollable with snap */}
      <div className="lg:hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          onTouchStart={() => setMobilePaused(true)}
          onTouchEnd={() => setMobilePaused(false)}
          onMouseEnter={() => setMobilePaused(true)}
          onMouseLeave={() => setMobilePaused(false)}
          className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0 snap-center">
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-auto rounded-xl cursor-pointer"
              />
            </div>
          ))}
        </div>

        {banners.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToMobileSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === mobileIndex
                    ? 'w-8 bg-[#D4AF37]'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: 2 banners visible at a time, sliding */}
      <div className="hidden lg:block">
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setDesktopPaused(true)}
          onMouseLeave={() => setDesktopPaused(false)}
        >
          <div
            className="flex -mx-2 transition-transform duration-500 ease-out dyn-transform"
            style={{
              '--dyn-transform': `translateX(-${desktopIndex * (100 / DESKTOP_VISIBLE)}%)`,
            } as React.CSSProperties}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="w-1/2 flex-shrink-0 px-2">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  className="w-full h-auto rounded-xl cursor-pointer hover:scale-[1.02] transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {showDesktopSlider && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: desktopSlideCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setDesktopIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === desktopIndex
                    ? 'w-8 bg-[#D4AF37]'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
