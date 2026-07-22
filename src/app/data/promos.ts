export interface PromoSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Promo {
  id: string;
  tag: string;
  tagColor: string;
  bannerKey: 'b1' | 'b2' | 'b3';
  bannerGradient: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  category: string;
  heroLabel: string;
  howItWorks: PromoSection[];
  terms: string;
}

export const promos: Promo[] = [
  {
    id: 'bonus-boas-vindas',
    tag: 'BÔNUS DE BOAS-VINDAS',
    tagColor: '#00C44D',
    bannerKey: 'b1',
    bannerGradient: 'from-[#0a3d1f] to-[#16103D]',
    title: 'Bônus de 100% até R$500',
    subtitle: 'Faça seu primeiro depósito e dobre seu saldo!',
    description: 'Faça seu primeiro depósito e ganhe 100% de bônus até R$500 para jogar nos melhores jogos.',
    cta: 'Aproveitar',
    category: 'cassino',
    heroLabel: '100% até R$500',
    howItWorks: [
      {
        heading: 'Como Resgatar o Bônus 🎁',
        body: 'Para resgatar o bônus de boas-vindas, basta criar sua conta, realizar o primeiro depósito mínimo de R$20 e o bônus será creditado automaticamente na sua conta.',
        bullets: [
          'Depósito mínimo: R$20',
          'Bônus máximo: R$500',
          'Crédito automático em até 5 minutos',
          'Válido apenas para o primeiro depósito',
        ],
      },
      {
        heading: 'Rollover e Requisitos 📋',
        body: 'O bônus possui requisito de rollover de 30x sobre o valor do bônus recebido. O bônus deve ser apostado antes de qualquer saque.',
        bullets: [
          'Rollover: 30x o valor do bônus',
          'Prazo: 30 dias para completar',
          'Válido em todos os jogos de cassino',
          'Jogos de mesa contribuem 10%',
        ],
      },
      {
        heading: 'Dicas para Aproveitar ao Máximo 🚀',
        body: 'Escolha jogos de slot para completar o rollover mais rapidamente, pois contribuem 100% para o requisito.',
      },
    ],
    terms: 'Promoção válida apenas para novos jogadores. Depósito mínimo de R$20. Rollover de 30x. Prazo de 30 dias. A Aposta1 reserva o direito de cancelar promoções a qualquer momento.',
  },
  {
    id: 'cashback-semanal',
    tag: 'CASHBACK SEMANAL',
    tagColor: '#D4AF37',
    bannerKey: 'b2',
    bannerGradient: 'from-[#3d2a00] to-[#16103D]',
    title: 'Cashback de 10% Todo Sábado',
    subtitle: 'Receba de volta uma parte do que perdeu!',
    description: 'Receba 10% de volta em todas as suas perdas toda semana, sem rollover.',
    cta: 'Aproveitar',
    category: 'cassino',
    heroLabel: '10% Cashback Semanal',
    howItWorks: [
      {
        heading: 'Como Funciona o Cashback 💰',
        body: 'Todo sábado calculamos suas perdas líquidas da semana (segunda a sexta) e creditamos 10% de volta diretamente na sua conta, sem nenhum requisito de rollover.',
        bullets: [
          'Calculado de segunda a sexta',
          'Creditado todo sábado até as 12h',
          'Sem rollover — saque quando quiser',
          'Mínimo de perda: R$50 na semana',
        ],
      },
      {
        heading: 'Limites e Elegibilidade ✅',
        body: 'O cashback máximo por semana é de R$1.000. Todos os jogadores com conta verificada são elegíveis automaticamente.',
        bullets: [
          'Cashback máximo: R$1.000/semana',
          'Conta verificada obrigatória',
          'Válido em cassino e slots',
          'Não acumulável com outros bônus',
        ],
      },
    ],
    terms: 'Cashback calculado com base nas perdas líquidas semanais. Máximo de R$1.000 por semana. Sem rollover. Conta verificada necessária.',
  },
  {
    id: 'torneios-exclusivos',
    tag: 'TORNEIO',
    tagColor: '#a855f7',
    bannerKey: 'b3',
    bannerGradient: 'from-[#2d0a6b] to-[#16103D]',
    title: 'Torneios Exclusivos',
    subtitle: 'Concorra a prêmios incríveis todos os dias!',
    description: 'Participe dos nossos torneios diários e concorra a prêmios incríveis todos os dias.',
    cta: 'Participar',
    category: 'torneios',
    heroLabel: 'Prêmios Diários',
    howItWorks: [
      {
        heading: 'Como Participar dos Torneios 🏆',
        body: 'Os torneios acontecem diariamente com início às 00h e encerramento às 23h59. Para participar, basta jogar os jogos elegíveis durante o período do torneio.',
        bullets: [
          'Torneios diários e semanais',
          'Sem taxa de inscrição',
          'Pontos por cada aposta realizada',
          'Placar ao vivo atualizado em tempo real',
        ],
      },
      {
        heading: 'Premiação e Ranking 🥇',
        body: 'Os prêmios são distribuídos ao final do torneio conforme a posição no ranking.',
        bullets: [
          '1º lugar: até R$5.000',
          '2º ao 5º: até R$1.000',
          '6º ao 20º: até R$200',
        ],
      },
    ],
    terms: 'Torneios sujeitos a alterações sem aviso prévio. Prêmios pagos em bônus com rollover de 10x.',
  },
  {
    id: 'recarga-segunda',
    tag: 'BÔNUS DE RECARGA',
    tagColor: '#00C44D',
    bannerKey: 'b1',
    bannerGradient: 'from-[#0a3d2a] to-[#16103D]',
    title: 'Recarga de 50% às Segundas',
    subtitle: 'Comece a semana com o dobro de saldo!',
    description: 'Toda segunda-feira, recarregue sua conta e ganhe 50% de bônus extra.',
    cta: 'Aproveitar',
    category: 'cassino',
    heroLabel: '50% toda Segunda',
    howItWorks: [
      {
        heading: 'Resgate da Recarga Semanal 📅',
        body: 'Todo domingo à noite, ative o bônus na seção de promoções e faça seu depósito na segunda-feira para garantir o bônus de 50%.',
        bullets: [
          'Ativo somente às segundas-feiras',
          'Depósito mínimo: R$30',
          'Bônus máximo: R$300',
          'Ativação manual necessária',
        ],
      },
    ],
    terms: 'Bônus válido apenas às segundas-feiras. Ativação manual obrigatória. Depósito mínimo R$30. Rollover 20x. Prazo de 7 dias.',
  },
  {
    id: 'seguro-esportes',
    tag: 'ESPORTES',
    tagColor: '#3b82f6',
    bannerKey: 'b2',
    bannerGradient: 'from-[#0a1e3d] to-[#16103D]',
    title: 'Seguro de Apostas Esportivas',
    subtitle: 'Aposte com segurança no seu time!',
    description: 'Aposte em esportes com segurança — se perder, devolvemos até R$200 na sua primeira aposta.',
    cta: 'Apostar Agora',
    category: 'esportes',
    heroLabel: 'Até R$200 de Seguro',
    howItWorks: [
      {
        heading: 'Como Funciona o Seguro 🛡️',
        body: 'Sua primeira aposta esportiva está protegida. Se perder, devolvemos o valor apostado em crédito de aposta, até R$200.',
        bullets: [
          'Válido para a primeira aposta esportiva',
          'Mínimo: R$20 | Máximo: R$200',
          'Odd mínima de 1.5 para qualificar',
        ],
      },
    ],
    terms: 'Seguro válido apenas para a primeira aposta esportiva. Odd mínima 1.5. Devolução máxima R$200 em crédito com rollover 3x.',
  },
  {
    id: 'jogo-responsavel',
    tag: 'JOGO RESPONSÁVEL',
    tagColor: '#ef4444',
    bannerKey: 'b3',
    bannerGradient: 'from-[#3d0a0a] to-[#16103D]',
    title: 'Jogue com Responsabilidade',
    subtitle: 'Sua saúde vem em primeiro lugar!',
    description: 'Defina limites de depósito e tempo de jogo para manter o controle da sua diversão.',
    cta: 'Saiba Mais',
    category: 'outros',
    heroLabel: 'Jogo Responsável',
    howItWorks: [
      {
        heading: 'Ferramentas de Controle 🔒',
        body: 'A Aposta1 disponibiliza diversas ferramentas para que você mantenha o controle do seu jogo.',
        bullets: [
          'Limite de depósito diário, semanal e mensal',
          'Limite de tempo de sessão',
          'Auto-exclusão temporária ou permanente',
        ],
      },
    ],
    terms: 'A Aposta1 promove o jogo responsável. Jogo proibido para menores de 18 anos.',
  },
];
