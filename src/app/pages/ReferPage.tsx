import { useState } from 'react';
import { Copy, CheckCheck, Users, Gift, TrendingUp, Share2, Twitter, Facebook, MessageCircle, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Footer } from '../components/Footer';

const REFERRAL_LINK = 'https://aposta1.bet.br/?referral=GA84341';

const referrals = [
  { name: 'João Silva',   initial: 'J', color: '#00C44D', status: 'Em andamento', earnings: null,    date: '28/06/2026' },
  { name: 'Maria Souza',  initial: 'M', color: '#3b82f6', status: 'Concluído',    earnings: '+R$50', date: '22/06/2026' },
  { name: 'Carlos Lima',  initial: 'C', color: '#a855f7', status: 'Aguardando',   earnings: null,    date: '15/06/2026' },
  { name: 'Ana Costa',    initial: 'A', color: '#D4AF37', status: 'Concluído',    earnings: '+R$50', date: '01/06/2026' },
  { name: 'Lucas Pinto',  initial: 'L', color: '#ef4444', status: 'Aguardando',   earnings: null,    date: '25/05/2026' },
];

const steps = [
  { icon: Share2,     label: 'Compartilhe seu link', desc: 'Copie seu link exclusivo e envie para seus amigos.' },
  { icon: Users,      label: 'Seu amigo se cadastra', desc: 'Ele cria a conta usando seu link de indicação.' },
  { icon: TrendingUp, label: 'Ele aposta R$50',        desc: 'Seu amigo realiza pelo menos R$50 em apostas.' },
  { icon: Gift,       label: 'Você ganha R$50',         desc: 'O bônus é creditado automaticamente na sua conta.' },
];

const rules = [
  'Seu amigo tem até 30 dias para apostar R$50.',
  'Você recebe R$50 em bônus por indicação válida.',
  'O bônus deve ser utilizado em apostas (1x).',
  'O bônus expira em 30 dias após o crédito.',
  'Não há limite de amigos que você pode indicar.',
  'Promoção não cumulável com outros bônus de indicação.',
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  'Concluído':    { color: '#00C44D', icon: CheckCircle2 },
  'Em andamento': { color: '#D4AF37', icon: Clock },
  'Aguardando':   { color: '#6b7280', icon: XCircle },
};

const card = 'bg-[#110936] rounded-xl border border-white/15';
const sectionHeader = 'px-5 py-4 border-b border-white/15 flex items-center gap-2';

interface Props {
  onNavigateStatic?: (slug: string) => void;
}

export function ReferPage({ onNavigateStatic }: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(REFERRAL_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalEarned = referrals.filter(r => r.status === 'Concluído').length * 50;
  const totalReferred = referrals.length;
  const concluded = referrals.filter(r => r.status === 'Concluído').length;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Page header strip — same style as MyAccountPage hero */}
        <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00C44D22' }}>
                <Users className="w-5 h-5" style={{ color: '#00C44D' }} />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl leading-tight">Refer a Friend</h1>
                <p className="text-gray-400 text-xs mt-0.5">Indique amigos e ganhe R$50 por cada um que apostar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">

          {/* Referral link */}
          <div className={card}>
            <div className={sectionHeader}>
              <Share2 className="w-4 h-4" style={{ color: '#00C44D' }} />
              <h3 className="text-white font-semibold text-sm">Seu link de indicação</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-500 text-xs mb-4">Compartilhe este link exclusivo — cada amigo que se cadastrar e apostar conta para você.</p>
              <div className="flex gap-2 mb-4">
                <div className="flex-1 bg-[#0e092e] border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 text-sm font-mono truncate">
                  {REFERRAL_LINK}
                </div>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 flex-shrink-0"
                  style={{ backgroundColor: '#00C44D' }}
                >
                  {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">Compartilhar:</span>
                {[
                  { icon: MessageCircle, label: 'WhatsApp', color: '#25d366', bg: '#25d36615' },
                  { icon: Twitter,       label: 'Twitter',  color: '#1da1f2', bg: '#1da1f215' },
                  { icon: Facebook,      label: 'Facebook', color: '#1877f2', bg: '#1877f215' },
                ].map(s => (
                  <button key={s.label} title={s.label}
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors"
                    style={{ backgroundColor: s.bg }}>
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Ganho',     value: `R$ ${totalEarned},00`, color: '#00C44D' },
              { label: 'Amigos Indicados', value: String(totalReferred),  color: '#D4AF37' },
              { label: 'Concluídos',      value: String(concluded),       color: '#a855f7' },
            ].map(s => (
              <div key={s.label} className={`${card} p-5`}>
                <p className="text-gray-500 text-xs mb-1">{s.label}</p>
                <p className="font-extrabold text-2xl" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Referrals list */}
          <div className={`${card} overflow-hidden`}>
            <div className={sectionHeader}>
              <Users className="w-4 h-4" style={{ color: '#00C44D' }} />
              <h3 className="text-white font-semibold text-sm">Seus Indicados</h3>
              <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#00C44D22', color: '#00C44D' }}>
                {totalReferred}
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {referrals.map((r, i) => {
                const cfg = statusConfig[r.status] ?? statusConfig['Aguardando'];
                const StatusIcon = cfg.icon;
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: r.color + '25', border: `1.5px solid ${r.color}40` }}>
                      {r.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{r.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <StatusIcon className="w-3 h-3 flex-shrink-0" style={{ color: cfg.color }} />
                        <span className="text-xs" style={{ color: cfg.color }}>{r.status}</span>
                        <span className="text-gray-600 text-xs">· {r.date}</span>
                      </div>
                    </div>
                    {r.earnings && (
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: '#00C44D' }}>{r.earnings}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* How it works */}
            <div className={`${card} overflow-hidden`}>
              <div className={sectionHeader}>
                <Gift className="w-4 h-4" style={{ color: '#00C44D' }} />
                <h3 className="text-white font-semibold text-sm">Como Funciona</h3>
              </div>
              <div className="p-5 space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#00C44D15' }}>
                      <step.icon className="w-4 h-4" style={{ color: '#00C44D' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#00C44D' }}>{i + 1}</span>
                        <p className="text-white text-sm font-semibold">{step.label}</p>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className={`${card} overflow-hidden`}>
              <div className={sectionHeader}>
                <TrendingUp className="w-4 h-4" style={{ color: '#D4AF37' }} />
                <h3 className="text-white font-semibold text-sm">Regras</h3>
              </div>
              <div className="p-5 space-y-3">
                {rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
                    <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white mt-0.5" style={{ backgroundColor: '#00C44D' }}>
                      {i + 1}
                    </span>
                    {rule}
                  </div>
                ))}
                <button className="mt-2 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all pt-1" style={{ color: '#00C44D' }}>
                  Ver detalhes <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
