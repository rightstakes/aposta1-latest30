import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PromoCards } from './components/PromoCards';
// import { Categories } from './components/Categories'; // hidden on home page per request
import { BigGameRow } from './components/BigGameRow';
import { SmallGameRow } from './components/SmallGameRow';
import { TopGamesRow } from './components/TopGamesRow';
import top10Aviator from '../imports/top10-1-aviator.webp';
import top10FortuneTiger from '../imports/top10-2-fortune-tiger.webp';
import top10GatesOfOlympus from '../imports/top10-3-gates-of-olympus.webp';
import top10BigBassBonanza from '../imports/top10-4-big-bass-bonanza.webp';
import top10SugarRush from '../imports/top10-5-sugar-rush.webp';
import top10FortuneRabbit from '../imports/top10-6-fortune-rabbit.webp';
import top10FortuneDragon from '../imports/top10-7-fortune-dragon.webp';
import top10FortuneHorse from '../imports/top10-8-fortune-horse.webp';
import top10Mines from '../imports/top10-9-mines.webp';
import top10BaraoVermelho from '../imports/top10-10-barao-vermelho.webp';
import { PromotionsSection } from './components/PromotionsSection';
import { SEOContent } from './components/SEOContent';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { GameCategoryPage } from './pages/GameCategoryPage';
import type { PageType } from './pages/GameCategoryPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { PromoDetailPage } from './pages/PromoDetailPage';
import { StaticPage } from './pages/StaticPage';
import { staticPages } from './data/staticPages';
import { MyAccountPage } from './pages/MyAccountPage';
import { DepositModal } from './components/DepositModal';
import { WithdrawModal } from './components/WithdrawModal';
import { BonusPage } from './pages/BonusPage';
import { ReferPage } from './pages/ReferPage';
import { TournamentsPage } from './pages/TournamentsPage';
import { TournamentDetailPage } from './pages/TournamentDetailPage';
import { RewardsPage } from './pages/RewardsPage';
import { MissionsPage } from './pages/MissionsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProvidersSection } from './components/ProvidersSection';
import { Star, Flame, Clock, Sparkles, Search } from 'lucide-react';

type Page = PageType | 'home' | 'promocoes' | 'minha-conta' | 'bonus' | 'refer' | 'torneios' | 'recompensas' | 'missoes' | 'login' | 'cadastro' | 'esqueci-senha' | 'notificacoes';

import imgMrTreasure from '../imports/mr-treasures-fortune-featured.png';
import imgKnockout from '../imports/Knockout-riches-featured.png';
import imgFortuneMouse from '../imports/fortune-mouse-featured.png';
import imgDoomsday from '../imports/doomsday-rampage-featured.png';
import imgSweetBonanza from '../imports/SweetBonanza-featured.png';
import imgBuffaloKing from '../imports/Buffalo-King-featured.png';
import imgGatesOlympus from '../imports/Gates-of-Olympus-featured.png';
import imgPenaltyShoot from '../imports/penalty-shoot-out-featured.png';
import imgOx from '../imports/ox-featured.png';
import imgZeus from '../imports/Zeus-lightning-featured.png';

const featuredGames = [
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

const popularGames = [
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

const top10Games = [
  { title: 'Aviator', image: top10Aviator },
  { title: 'Fortune Tiger', image: top10FortuneTiger },
  { title: 'Gates of Olympus', image: top10GatesOfOlympus },
  { title: 'Big Bass Bonanza', image: top10BigBassBonanza },
  { title: 'Sugar Rush', image: top10SugarRush },
  { title: 'Fortune Rabbit', image: top10FortuneRabbit },
  { title: 'Fortune Dragon', image: top10FortuneDragon },
  { title: 'Fortune Horse', image: top10FortuneHorse },
  { title: 'Mines', image: top10Mines },
  { title: 'Barão Vermelho', image: top10BaraoVermelho },
];

const slotsGames = [
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
];

const liveGames = [
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

const tableGames = [
  { title: 'Penalty Shoot-Out', provider: 'Evolution Gaming', image: imgPenaltyShoot },
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', image: imgGatesOlympus },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: imgSweetBonanza },
  { title: 'Buffalo King', provider: 'Pragmatic Play', image: imgBuffaloKing },
  { title: 'Zeus Lightning', provider: 'Pragmatic Play', image: imgZeus },
  { title: 'Fortune Ox', provider: 'PG Soft', image: imgOx },
  { title: 'Fortune Mouse', provider: 'PG Soft', image: imgFortuneMouse },
  { title: 'Knockout Riches', provider: 'PG Soft', image: imgKnockout },
  { title: "Mr. Treasure's Fortune", provider: 'PG Soft', image: imgMrTreasure },
  { title: 'Doomsday Rampage', provider: 'PG Soft', image: imgDoomsday },
];

export default function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('home');
  const [activePromoId, setActivePromoId] = useState<string | null>(null);
  const [activeStaticSlug, setActiveStaticSlug] = useState<string | null>(null);
  const [accountSection, setAccountSection] = useState('minha-conta');
  const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const ACCOUNT_SECTIONS = ['minha-conta','carteira','apostas','limites','pausas-suspensoes','seguranca','contas-bancarias'];
  const BONUS_SLUGS = ['bonus'];

  const navigate = (page: string) => {
    if (ACCOUNT_SECTIONS.includes(page)) {
      setActivePage('minha-conta');
      setAccountSection(page);
    } else {
      setActivePage(page as Page);
    }
    setActivePromoId(null);
    setActiveStaticSlug(null);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPromo = (id: string) => {
    setActivePromoId(id);
    setActiveStaticSlug(null);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStaticPage = (slug: string) => {
    setActiveStaticSlug(slug);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activePage === 'login' || activePage === 'cadastro' || activePage === 'esqueci-senha') {
    return (
      <>
        {activePage === 'login' && <LoginPage onNavigate={navigate} />}
        {activePage === 'cadastro' && <RegisterPage onNavigate={navigate} />}
        {activePage === 'esqueci-senha' && <ForgotPasswordPage onNavigate={navigate} />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#16103D] flex flex-col">
      <Header
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onNavigate={navigate}
        mobileSidebarOpen={mobileSidebarOpen}
        onOpenDeposit={() => setDepositOpen(true)}
      />

      <div className="flex-1 pt-[82px]">
        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`lg:hidden fixed top-[82px] left-0 h-[calc(100vh-82px)] z-[70] transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full">
            <Sidebar
              activePage={activePage}
              onNavigate={navigate}
            />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block fixed top-0 left-0 h-full z-40">
          <Sidebar
            activePage={activePage}
            onNavigate={navigate}
          />
        </div>

        {/* Rounded-corner effect where sidebar, header, and main content meet */}
        <div
          className="hidden lg:block fixed pointer-events-none z-[55] top-[82px] left-[128px] w-5 h-5 corner-notch"
        />

        <main
          className="page-glow-bg lg:ml-32 overflow-y-auto min-h-screen transition-all duration-300 pb-24 lg:pb-0"
        >
          {activePage === 'notificacoes' ? (
            <NotificationsPage onNavigateStatic={openStaticPage} />
          ) : activePage === 'recompensas' ? (
            <RewardsPage onNavigateStatic={openStaticPage} />
          ) : activePage === 'missoes' ? (
            <MissionsPage onNavigateStatic={openStaticPage} onNavigate={navigate} />
          ) : activePage === 'torneios' && selectedTournamentId ? (
            <TournamentDetailPage
              tournamentId={selectedTournamentId}
              onBack={() => { setSelectedTournamentId(null); window.scrollTo({ top: 0 }); }}
              onSelectTournament={(id) => { setSelectedTournamentId(id); window.scrollTo({ top: 0 }); }}
              onNavigateStatic={openStaticPage}
            />
          ) : activePage === 'torneios' ? (
            <TournamentsPage
              onGoHome={() => navigate('home')}
              onNavigateStatic={openStaticPage}
              onSelectTournament={(id) => { setSelectedTournamentId(id); window.scrollTo({ top: 0 }); }}
            />
          ) : activePage === 'refer' ? (
            <ReferPage onNavigateStatic={openStaticPage} />
          ) : activePage === 'bonus' ? (
            <BonusPage onNavigateStatic={openStaticPage} onOpenDeposit={() => setDepositOpen(true)} />
          ) : activePage === 'minha-conta' ? (
            <MyAccountPage
              onGoHome={() => navigate('home')}
              onNavigateStatic={openStaticPage}
              initialSection={accountSection}
              onOpenDeposit={() => setDepositOpen(true)}
              onOpenWithdraw={() => setWithdrawOpen(true)}
            />
          ) : activeStaticSlug ? (
            <StaticPage
              page={staticPages.find(p => p.slug === activeStaticSlug)!}
              onGoHome={() => navigate('home')}
              onNavigate={openStaticPage}
            />
          ) : activePage === 'promocoes' && activePromoId ? (
            <PromoDetailPage
              promoId={activePromoId}
              onBack={() => { setActivePromoId(null); window.scrollTo({ top: 0 }); }}
              onGoHome={() => navigate('home')}
              onNavigateStatic={openStaticPage}
            />
          ) : activePage === 'promocoes' ? (
            <PromotionsPage onOpenPromo={openPromo} onNavigateStatic={openStaticPage} />
          ) : activePage === 'home' ? (
            <>
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4">
                {/* <Categories /> — hidden per request */}

                <PromoCards />

                {/* Search bar — full width of container */}
                <div className="relative mt-3 mb-5">
                  <input
                    type="text"
                    placeholder="Buscar jogos, categorias..."
                    className="w-full bg-white/5 text-white placeholder-gray-400 pl-4 pr-10 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] border border-white/15"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <TopGamesRow title="Top 10 Jogos" games={top10Games} />

                <BigGameRow
                  title="Jogos em Destaque"
                  icon={<Star className="w-4 h-4 text-white fill-white" />}
                  games={featuredGames}
                />
                <SmallGameRow
                  title="Mais Populares"
                  icon={<Flame className="w-4 h-4 text-white fill-white" />}
                  games={popularGames}
                />
                <SmallGameRow
                  title="Slots em Alta"
                  icon={<Sparkles className="w-4 h-4 text-white fill-white" />}
                  games={slotsGames}
                />
                <BigGameRow
                  title="Cassino Ao Vivo"
                  icon={<Star className="w-4 h-4 text-white fill-white" />}
                  games={liveGames}
                  liveTag
                />
                <SmallGameRow
                  title="Jogos de Mesa"
                  icon={<Clock className="w-4 h-4 text-white fill-white" />}
                  games={tableGames}
                />
                <ProvidersSection />
                <PromotionsSection onOpenPromo={(id) => { navigate('promocoes'); openPromo(id); }} onSeeAll={() => navigate('promocoes')} />
                <SEOContent />
              </div>
              <Footer onNavigate={openStaticPage} />
            </>
          ) : (
            <GameCategoryPage page={activePage as PageType} onNavigateStatic={openStaticPage} />
          )}
        </main>

      </div>

      <MobileBottomBar activePage={activePage} onNavigate={navigate} />

      {depositOpen && <DepositModal onClose={() => setDepositOpen(false)} />}
      {withdrawOpen && <WithdrawModal onClose={() => setWithdrawOpen(false)} />}
    </div>
  );
}
