export function SEOContent() {
  return (
    <div className="mb-8 bg-[#0E092E] rounded-xl p-8 max-w-[1000px] mx-auto border border-white/15">
      <h2 className="text-white text-2xl font-bold mb-4">
        APOSTA1 - A Melhor Casa de Apostas e Cassino Online do Brasil
      </h2>

      <div className="text-gray-300 text-sm leading-relaxed space-y-4">
        <div>
          <h3 className="text-white font-bold mb-2">Jogos de Cassino Online</h3>
          <p>
            Descubra uma seleção incomparável de jogos de cassino online na APOSTA1.
            Oferecemos milhares de slots dos melhores provedores como Pragmatic Play,
            PG Soft, Evolution Gaming e muito mais. Desde clássicos como roleta e
            blackjack até os mais modernos crash games e slots com jackpots progressivos.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">Apostas Esportivas</h3>
          <p>
            Aposte nos seus esportes favoritos com as melhores odds do mercado. Futebol,
            basquete, tênis, MMA e dezenas de outras modalidades disponíveis 24/7.
            Apostas ao vivo com cash out instantâneo e streaming de jogos em tempo real.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">Segurança e Licenciamento</h3>
          <p>
            A APOSTA1 opera com licença internacional e utiliza tecnologia de criptografia
            SSL de última geração para garantir a segurança dos seus dados e transações.
            Jogo responsável e proteção ao jogador são nossas prioridades.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-2">Métodos de Pagamento</h3>
          <p>
            Depósitos e saques instantâneos via PIX, transferência bancária, cartões de
            crédito e débito, carteiras digitais e criptomoedas. Processo 100% seguro
            com saques processados em até 24 horas.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/15">
        <div className="flex flex-wrap gap-2">
          {['Cassino Online', 'Slots', 'Apostas Esportivas', 'Cassino Ao Vivo', 'Aviator',
            'Fortune Tiger', 'Bônus', 'PIX', 'Crash Games', 'Roleta'].map((tag) => (
            <span
              key={tag}
              className="bg-white/5 text-gray-300 px-3 py-1 rounded-full text-xs border border-white/15 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
