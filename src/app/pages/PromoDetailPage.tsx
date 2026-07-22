import { ArrowLeft, ChevronRight, Share2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { promos } from '../data/promos';
import imgB1 from '../../imports/image-b1-1.png';
import imgB2 from '../../imports/image-b2-1.png';
import imgB3 from '../../imports/image-b3-1.png';

const BANNERS = { b1: imgB1, b2: imgB2, b3: imgB3 };

interface Props {
  promoId: string;
  onBack: () => void;
  onGoHome: () => void;
  onNavigateStatic?: (slug: string) => void;
}

export function PromoDetailPage({ promoId, onBack, onGoHome, onNavigateStatic }: Props) {
  const promo = promos.find(p => p.id === promoId);
  if (!promo) return null;

  const banner = BANNERS[promo.bannerKey];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <div className="pt-5 pb-5">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
              <button onClick={onGoHome} className="hover:text-white transition-colors">Início</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={onBack} className="hover:text-white transition-colors">Promoções</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-300 truncate">{promo.title}</span>
            </div>
            <button
              onClick={onBack}
              className="sm:hidden inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Promoções
            </button>
          </div>

          {/* Hero image */}
          <div className="overflow-hidden rounded-2xl mb-6 bg-[#0E092E]">
            <img
              src={banner}
              alt={promo.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start mb-10">
            <aside className="order-1 lg:order-2 lg:sticky lg:top-28 space-y-4">
              <button
                className="w-full py-4 rounded-xl text-black text-sm font-extrabold uppercase tracking-wide transition-opacity hover:opacity-90 shadow-[0_0_24px_rgba(0,196,77,0.25)]"
                style={{ backgroundColor: '#00C44D' }}
              >
                {promo.cta}
              </button>

              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Share2 className="w-4 h-4 text-[#ef4444]" />
                  <h3 className="text-white font-bold text-sm">Compartilhar</h3>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-white/10 text-gray-200 text-sm hover:bg-white/15 transition-colors">
                  Copiar Link
                </button>
              </div>
            </aside>

            <article className="order-2 lg:order-1">
              <span
                className="inline-flex text-black text-[10px] font-extrabold px-3 py-1.5 rounded-lg mb-4 uppercase tracking-wide"
                style={{ backgroundColor: promo.tagColor }}
              >
                {promo.tag}
              </span>
              <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-3">{promo.title}</h1>
              <p className="text-gray-400 text-sm sm:text-base mb-8">{promo.subtitle}</p>

              <h2 className="text-white text-xl font-bold mb-6">Como Funciona</h2>

              <div className="space-y-7 mb-8">
                {promo.howItWorks.map((section, i) => (
                  <section key={i} className={i > 0 ? 'pt-7 border-t border-white/15' : ''}>
                    <h3 className="text-white font-bold text-base mb-3">{section.heading}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">{section.body}</p>
                    {section.bullets && (
                      <ul className="space-y-3">
                        {section.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                            <span className="mt-0.5 text-[#00C44D] font-bold">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <div className="pt-6 border-t border-white/15">
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  <span className="text-gray-400 font-semibold">Termos e Condições: </span>
                  {promo.terms}
                </p>
              </div>
            </article>
          </div>

        </div>
      </div>

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
