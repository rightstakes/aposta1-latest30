import { useState, useEffect, useRef } from 'react';
import {
  User, Wallet, ClipboardList, ShieldCheck, Lock, Landmark,
  LogOut, ArrowUpRight, ArrowDownToLine, History, ChevronRight,
  Clock, TrendingUp, Gift, BadgeCheck, Trash2, Plus, Eye, EyeOff,
  ToggleLeft, ToggleRight, AlertCircle, CheckCircle2, CalendarDays,
  ChevronDown, ChevronUp, ArrowLeft, X, ExternalLink, UserX, Receipt, Download
} from 'lucide-react';
import { Footer } from '../components/Footer';

type AccountSection = 'minha-conta' | 'carteira' | 'apostas' | 'limites' | 'seguranca' | 'contas-bancarias' | 'pausas-suspensoes' | 'imposto-renda';

interface Props {
  onGoHome: () => void;
  onNavigateStatic?: (slug: string) => void;
  initialSection?: string;
  onOpenDeposit?: () => void;
  onOpenWithdraw?: () => void;
}

const navItems: { id: AccountSection; icon: React.ElementType; label: string }[] = [
  { id: 'minha-conta', icon: User, label: 'Minha Conta' },
  { id: 'carteira', icon: Wallet, label: 'Carteira' },
  { id: 'apostas', icon: ClipboardList, label: 'Minhas Apostas' },
  { id: 'limites', icon: ShieldCheck, label: 'Limites' },
  { id: 'seguranca', icon: Lock, label: 'Segurança' },
  { id: 'contas-bancarias', icon: Landmark, label: 'Contas Bancárias' },
  { id: 'pausas-suspensoes', icon: UserX, label: 'Pausas e Suspensões' },
  { id: 'imposto-renda', icon: Receipt, label: 'Imposto de Renda' },
];

const stats = [
  { label: 'Total Depositado', value: 'R$ 3.500,00', icon: ArrowDownToLine, color: '#00C44D' },
  { label: 'Total Sacado', value: 'R$ 2.100,00', icon: ArrowUpRight, color: '#D4AF37' },
  { label: 'Apostas Realizadas', value: '142', icon: TrendingUp, color: '#a855f7' },
  { label: 'Bônus Recebidos', value: 'R$ 250,00', icon: Gift, color: '#3b82f6' },
];

const recentLogins = [
  { date: '01/07/2026 — 01:27', device: 'Chrome · Windows' },
  { date: '30/06/2026 — 22:14', device: 'Safari · iPhone' },
  { date: '29/06/2026 — 18:33', device: 'Chrome · Windows' },
];

const inputCls = 'w-full bg-[#0e092e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00C44D] transition-colors placeholder-gray-600';
const labelCls = 'text-gray-500 text-xs mb-1 block';

function MinhaConta({ onOpenDeposit, onOpenWithdraw }: { onOpenDeposit?: () => void; onOpenWithdraw?: () => void }) {
  const [form, setForm] = useState({
    email: 'ga.apostador@exemplo.com.br',
    telefone: '(11) 98765-4321',
    cpf: '***.***.***-**',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    nascimento: '01/01/1990',
    pix: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="bg-[#1a1147] rounded-xl p-4 border border-white/15 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 dyn-bg" style={{ '--dyn-bg': s.color + '22' } as React.CSSProperties}>
              <s.icon className="w-4 h-4 dyn-text" style={{ '--dyn-text': s.color } as React.CSSProperties} />
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-xs mb-0.5 truncate">{s.label}</p>
              <p className="text-white font-bold text-sm">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Balance card — full width above form */}
      <div className="rounded-xl p-5 border border-white/15 account-gradient-a">
        <p className="text-gray-400 text-xs mb-1">Saldo Disponível</p>
        <p className="text-white text-3xl font-extrabold tracking-tight mb-4">R$ 1.200,00</p>
        <div className="flex gap-3">
          <button onClick={onOpenDeposit} className="flex-1 sm:flex-none sm:px-8 py-2.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 bg-[#00C44D]">
            Depositar
          </button>
          <button onClick={onOpenWithdraw} className="flex-1 sm:flex-none sm:px-8 py-2.5 rounded-xl text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
            Sacar
          </button>
        </div>
      </div>

      {/* Main two-column section */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Form — 3/5 */}
        <div className="xl:col-span-3 bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/15 flex items-center gap-2">
            <User className="w-4 h-4 text-[#00C44D]" />
            <h3 className="text-white font-semibold text-sm">Informações Pessoais</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>E-mail</label>
                <input className={inputCls} value={form.email} onChange={set('email')} />
              </div>
              <div>
                <label className={labelCls}>Telefone</label>
                <input className={inputCls} value={form.telefone} onChange={set('telefone')} />
              </div>
            </div>
            <div>
              <label className={labelCls}>CPF (não editável)</label>
              <input className={`${inputCls} opacity-50 cursor-not-allowed`} value={form.cpf} disabled />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className={labelCls}>Logradouro</label>
                <input className={inputCls} placeholder="Rua / Avenida" value={form.logradouro} onChange={set('logradouro')} />
              </div>
              <div>
                <label className={labelCls}>Número</label>
                <input className={inputCls} placeholder="Nº" value={form.numero} onChange={set('numero')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Complemento</label>
                <input className={inputCls} placeholder="Apto, Bloco..." value={form.complemento} onChange={set('complemento')} />
              </div>
              <div>
                <label className={labelCls}>Bairro</label>
                <input className={inputCls} placeholder="Bairro" value={form.bairro} onChange={set('bairro')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Cidade</label>
                <input className={inputCls} placeholder="Cidade" value={form.cidade} onChange={set('cidade')} />
              </div>
              <div>
                <label className={labelCls}>Estado</label>
                <select className={inputCls} value={form.estado} onChange={set('estado')}>
                  <option value="">Selecione</option>
                  {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Data de Nascimento</label>
                <input className={`${inputCls} opacity-50 cursor-not-allowed`} value={form.nascimento} disabled />
              </div>
              <div>
                <label className={labelCls}>Chave PIX</label>
                <input className={inputCls} placeholder="CPF, e-mail ou celular" value={form.pix} onChange={set('pix')} />
              </div>
            </div>
            <button className="mt-2 px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 bg-[#00C44D]">
              Salvar Alterações
            </button>
          </div>
        </div>

        {/* Right column — 2/5 */}
        <div className="xl:col-span-2 space-y-4">
          {/* Verification */}
          <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/15 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#D4AF37]" />
              <h4 className="text-white font-semibold text-sm">Verificação de Conta</h4>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: 'Documento de Identidade', done: false },
                { label: 'Comprovante de Residência', done: false },
                { label: 'Selfie com Documento', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border ${item.done ? 'border-[#00C44D] bg-[#00C44D]' : 'border-white/20 bg-white/5'}`}>
                    {item.done && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className="text-gray-400 text-xs">{item.label}</span>
                </div>
              ))}
              <button className="mt-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 bg-[#D4AF37]">
                Verificar Agora
              </button>
            </div>
          </div>

          {/* Recent logins */}
          <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/15 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <h4 className="text-white font-semibold text-sm">Últimos Acessos</h4>
            </div>
            <div className="divide-y divide-white/5">
              {recentLogins.map((l, i) => (
                <div key={i} className="px-5 py-3 flex items-center justify-between">
                  <span className="text-gray-300 text-xs">{l.date}</span>
                  <span className="text-gray-500 text-xs">{l.device}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Carteira ───────────────────────────────────────────────────────────────
const PER_PAGE = 5;

function Pager({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  return (
    <div className="flex items-center justify-between pt-4 border-t border-white/15 mt-2 text-xs text-gray-400">
      <span>{total} registros · pág. {page}/{pages}</span>
      <div className="flex gap-1">
        <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
          className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30">‹</button>
        {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => onChange(p)}
            className="px-2.5 py-1.5 rounded transition-colors dyn-bg dyn-text" style={{ '--dyn-bg': p === page ? '#00C44D' : 'rgba(255,255,255,0.05)', '--dyn-text': 'white' } as React.CSSProperties}>
            {p}
          </button>
        ))}
        <button onClick={() => onChange(Math.min(pages, page + 1))} disabled={page === pages}
          className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30">›</button>
      </div>
    </div>
  );
}

function DateFilter({ from, to, onFrom, onTo }: { from: string; to: string; onFrom: (v: string) => void; onTo: (v: string) => void }) {
  const dateInputCls = 'flex-1 min-w-0 sm:flex-none bg-[#0e092e] border border-white/10 rounded-lg px-2 py-1.5 text-white text-xs focus:outline-none focus:border-[#00C44D] [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:cursor-pointer';

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 mb-4 pb-4 border-b border-white/15">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0 hidden sm:block" />
        <label className="text-gray-500 text-xs flex-shrink-0">De</label>
        <input type="date" value={from} onChange={e => onFrom(e.target.value)} className={dateInputCls} />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-gray-500 text-xs flex-shrink-0">Até</label>
        <input type="date" value={to} onChange={e => onTo(e.target.value)} className={dateInputCls} />
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 flex-shrink-0 bg-[#00C44D]">
          Filtrar
        </button>
      </div>
    </div>
  );
}


function Carteira({ onOpenWithdraw }: { onOpenWithdraw?: () => void }) {
  const [tab, setTab] = useState<'depositos' | 'saques'>('depositos');
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState('2026-05-01');
  const [to, setTo] = useState('2026-07-01');

  const depositos = [
    { id: '#DEP001', data: '23/05/2026', valor: 'R$ 10,00',  status: 'Aprovado' },
    { id: '#DEP002', data: '17/05/2026', valor: 'R$ 5,00',   status: 'Aprovado' },
    { id: '#DEP003', data: '12/05/2026', valor: 'R$ 50,00',  status: 'Aprovado' },
    { id: '#DEP004', data: '05/05/2026', valor: 'R$ 30,00',  status: 'Aprovado' },
    { id: '#DEP005', data: '01/05/2026', valor: 'R$ 100,00', status: 'Aprovado' },
    { id: '#DEP006', data: '28/04/2026', valor: 'R$ 20,00',  status: 'Aprovado' },
  ];
  const saques = [
    { id: '#SAQ001', data: '28/06/2026', valor: 'R$ 100,00', status: 'Processado' },
    { id: '#SAQ002', data: '10/06/2026', valor: 'R$ 50,00',  status: 'Processado' },
    { id: '#SAQ003', data: '01/06/2026', valor: 'R$ 200,00', status: 'Processado' },
  ];
  const all = tab === 'depositos' ? depositos : saques;
  const rows = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Saldo Atual',      value: 'R$ 1.200,00', color: '#00C44D' },
          { label: 'Total Depositado', value: 'R$ 3.500,00', color: '#D4AF37' },
          { label: 'Total Sacado',     value: 'R$ 2.100,00', color: '#a855f7' },
        ].map(c => (
          <div key={c.label} className="bg-[#1a1147] rounded-xl p-4 border border-white/15">
            <p className="text-gray-500 text-xs mb-1">{c.label}</p>
            <p className="font-extrabold text-lg dyn-text" style={{ '--dyn-text': c.color } as React.CSSProperties}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 bg-[#00C44D]">
          Depositar
        </button>
        <button onClick={onOpenWithdraw} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold bg-white/10 hover:bg-white/20 border border-white/10 transition-colors">
          Sacar
        </button>
      </div>
      <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
        <div className="flex border-b border-white/15">
          {(['depositos', 'saques'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${tab === t ? 'text-white border-b-2 border-[#00C44D]' : 'text-gray-400 hover:text-white'}`}>
              {t === 'depositos' ? 'Depósitos' : 'Saques'}
            </button>
          ))}
        </div>
        <div className="p-4">
          <DateFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase">
                <th className="text-left pb-3">ID</th>
                <th className="text-left pb-3">Data</th>
                <th className="text-left pb-3">Valor</th>
                <th className="text-left pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map(r => (
                <tr key={r.id}>
                  <td className="py-3 text-gray-400 text-xs">{r.id}</td>
                  <td className="py-3 text-gray-300">{r.data}</td>
                  <td className="py-3 text-white font-semibold">{r.valor}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 text-[#00C44D] text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />{r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pager page={page} total={all.length} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

// ─── Apostas ────────────────────────────────────────────────────────────────
function Apostas() {
  const [tab, setTab] = useState('todos');
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState('2026-05-01');
  const [to, setTo] = useState('2026-07-01');

  const allBets = [
    { game: 'Fortune Tiger',    tipo: 'Slots',    aposta: 'R$ 5,00',  ganho: 'R$ 12,50', data: '30/06/2026', status: 'Ganhou' },
    { game: 'Gates of Olympus', tipo: 'Slots',    aposta: 'R$ 10,00', ganho: 'R$ 0,00',  data: '29/06/2026', status: 'Perdeu' },
    { game: 'Flamengo × Boca',  tipo: 'Esportes', aposta: 'R$ 20,00', ganho: 'R$ 0,00',  data: '28/06/2026', status: 'Perdeu' },
    { game: 'Sweet Bonanza',    tipo: 'Slots',    aposta: 'R$ 3,70',  ganho: 'R$ 8,00',  data: '27/06/2026', status: 'Ganhou' },
    { game: 'Aviator',          tipo: 'Crash',    aposta: 'R$ 15,00', ganho: 'R$ 30,00', data: '26/06/2026', status: 'Ganhou' },
    { game: 'Fortune Mouse',    tipo: 'Slots',    aposta: 'R$ 8,00',  ganho: 'R$ 0,00',  data: '25/06/2026', status: 'Perdeu' },
    { game: 'Buffalo King',     tipo: 'Slots',    aposta: 'R$ 12,00', ganho: 'R$ 24,00', data: '24/06/2026', status: 'Ganhou' },
  ];
  const tabs = ['todos', 'slots', 'esportes', 'crash'];
  const filtered = tab === 'todos' ? allBets : allBets.filter(b => b.tipo.toLowerCase() === tab);
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Apostado', value: 'R$ 73,70', color: '#3b82f6' },
          { label: 'Total Ganho',    value: 'R$ 74,50', color: '#00C44D' },
          { label: 'Lucro/Perda',    value: '+R$ 0,80', color: '#00C44D' },
        ].map(c => (
          <div key={c.label} className="bg-[#1a1147] rounded-xl p-4 border border-white/15">
            <p className="text-gray-500 text-xs mb-1">{c.label}</p>
            <p className="font-extrabold text-base sm:text-lg dyn-text" style={{ '--dyn-text': c.color } as React.CSSProperties}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
        <div className="flex border-b border-white/15 overflow-x-auto [scrollbar-width:none]">
          {tabs.map(t => (
            <button key={t} onClick={() => { setTab(t); setPage(1); }}
              className={`flex-shrink-0 px-5 py-3 text-sm font-medium capitalize transition-colors ${tab === t ? 'text-white border-b-2 border-[#00C44D]' : 'text-gray-400 hover:text-white'}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="p-4">
          <DateFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="text-gray-500 text-xs uppercase">
                  <th className="text-left pb-3">Jogo</th>
                  <th className="text-left pb-3">Tipo</th>
                  <th className="text-left pb-3">Aposta</th>
                  <th className="text-left pb-3">Ganho</th>
                  <th className="text-left pb-3">Data</th>
                  <th className="text-left pb-3">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((b, i) => (
                  <tr key={i}>
                    <td className="py-3 text-white font-medium">{b.game}</td>
                    <td className="py-3 text-gray-400 text-xs">{b.tipo}</td>
                    <td className="py-3 text-gray-300">{b.aposta}</td>
                    <td className="py-3 text-white">{b.ganho}</td>
                    <td className="py-3 text-gray-400 text-xs">{b.data}</td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold ${b.status === 'Ganhou' ? 'text-[#00C44D]' : 'text-red-400'}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pager page={page} total={filtered.length} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}

// ─── Limites ─────────────────────────────────────────────────────────────────
function Limites() {
  const [open, setOpen] = useState<string | null>('deposito');
  const [limits, setLimits] = useState({ deposito: '', aposta: '', perda: '' });
  const [enabled, setEnabled] = useState({ deposito: false, aposta: false, perda: false });

  const sections = [
    { id: 'deposito', label: 'Limite de Depósito',  desc: 'Defina um valor máximo que pode depositar em um período.' },
    { id: 'aposta',   label: 'Limite de Aposta',    desc: 'Controle o valor máximo por aposta individual.' },
    { id: 'perda',    label: 'Limite de Perda',     desc: 'Estabeleça o máximo que pode perder em um período.' },
  ] as const;

  return (
    <div className="space-y-3">
      <div className="bg-[#1a1147] rounded-xl p-4 border border-[#D4AF37]/30 flex gap-3">
        <AlertCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
        <p className="text-gray-300 text-xs leading-relaxed">
          Limites de jogo responsável entram em vigor imediatamente. Reduções são aplicadas na hora; aumentos entram em vigor após 7 dias.
        </p>
      </div>

      {sections.map(s => (
        <div key={s.id} className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4"
            onClick={() => setOpen(open === s.id ? null : s.id)}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={e => { e.stopPropagation(); setEnabled(p => ({ ...p, [s.id]: !p[s.id] })); }}
                className="transition-colors"
              >
                {enabled[s.id]
                  ? <ToggleRight className="w-5 h-5 text-[#00C44D]" />
                  : <ToggleLeft className="w-5 h-5 text-gray-500" />}
              </button>
              <span className="text-white text-sm font-medium">{s.label}</span>
            </div>
            {open === s.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {open === s.id && (
            <div className="px-5 pb-5 border-t border-white/15 pt-4">
              <p className="text-gray-400 text-xs mb-3">{s.desc}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 text-xs mb-1 block">Mínimo (R$)</label>
                  <input
                    className="w-full bg-[#0e092e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00C44D]"
                    placeholder="Ex: 10"
                  />
                </div>
                <div>
                  <label className="text-gray-500 text-xs mb-1 block">Máximo (R$)</label>
                  <input
                    className="w-full bg-[#0e092e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00C44D]"
                    placeholder="Ex: 500"
                    value={limits[s.id]}
                    onChange={e => setLimits(p => ({ ...p, [s.id]: e.target.value }))}
                  />
                </div>
              </div>
              <button className="mt-4 px-5 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 bg-[#00C44D]">
                Salvar Limite
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Segurança ───────────────────────────────────────────────────────────────
function Seguranca() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  return (
    <div className="space-y-5 max-w-lg">
      <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/15 flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="text-white font-semibold text-sm">Alterar Senha</h3>
        </div>
        <div className="p-5 space-y-4">
          {[
            { label: 'Senha Atual',      show: showOld, toggle: () => setShowOld(p => !p) },
            { label: 'Nova Senha',       show: showNew, toggle: () => setShowNew(p => !p) },
            { label: 'Confirmar Senha',  show: showConf, toggle: () => setShowConf(p => !p) },
          ].map(f => (
            <div key={f.label}>
              <label className="text-gray-500 text-xs mb-1 block">{f.label}</label>
              <div className="relative">
                <input
                  type={f.show ? 'text' : 'password'}
                  className="w-full bg-[#0e092e] border border-white/10 rounded-lg px-3 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-[#00C44D]"
                  placeholder="••••••••"
                />
                <button onClick={f.toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                  {f.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 bg-[#D4AF37]">
            Atualizar Senha
          </button>
        </div>
      </div>

      <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/15 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <h3 className="text-white font-semibold text-sm">Histórico de Acessos</h3>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { date: '01/07/2026 — 01:27', device: 'Chrome · Windows', ip: '177.x.x.x' },
            { date: '30/06/2026 — 22:14', device: 'Safari · iPhone',  ip: '189.x.x.x' },
            { date: '29/06/2026 — 18:33', device: 'Chrome · Windows', ip: '177.x.x.x' },
          ].map((l, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-gray-300 text-xs">{l.date}</p>
                <p className="text-gray-500 text-[11px]">{l.device} · {l.ip}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#00C44D] flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Pausas e Suspensões ────────────────────────────────────────────────────
const PRESET_DAYS: Record<string, number> = {
  '24 Horas': 1,
  '1 Semana': 7,
  '2 Semanas': 14,
  '3 Semanas': 21,
  '4 Semanas': 28,
  '5 Semanas': 35,
  '6 Semanas': 42,
};

const dayLabel = (d: number) => {
  const found = Object.entries(PRESET_DAYS).find(([, v]) => v === d);
  if (found) return found[0];
  return `${d} ${d === 1 ? 'Dia' : 'Dias'}`;
};

const REASONS = [
  'Decisão voluntária',
  'Dificuldades financeiras',
  'Perda de controle sobre o jogo (saúde mental)',
  'Recomendação profissional de um profissional de saúde',
  'Impedir que meus dados sejam usados em plataformas de apostas',
  'Não desejo informar',
];

function ConfirmModal({
  open, title, description, reasons, onCancel, onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  reasons: string[];
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState(reasons[0]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onCancel}>
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/15 account-gradient-b"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15">
          <h3 className="text-white font-bold text-base">{title}</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>
          <div className="space-y-2.5">
            {reasons.map(r => (
              <label key={r} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="reason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="w-4 h-4 accent-[#00C44D] flex-shrink-0"
                />
                <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{r}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-white/15">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity bg-[#00C44D]"
          >
            Sim, continuar
          </button>
        </div>
      </div>
    </div>
  );
}

function PausasSuspensoes({ onBack }: { onBack?: () => void }) {
  const [tab, setTab] = useState<'pausa' | 'suspensao'>('pausa');
  const [days, setDays] = useState(1);
  const [suspensaoPeriodo, setSuspensaoPeriodo] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<{ pausa?: string; suspensao?: string }>({});

  const suspensaoOptions = ['24 Horas', '1 Semana', '2 Semanas', '3 Semanas', '4 Semanas', '5 Semanas', '6 Semanas', 'Permanentemente'];

  const handleConfirm = () => {
    if (tab === 'pausa') setConfirmed(p => ({ ...p, pausa: dayLabel(days) }));
    else if (suspensaoPeriodo) setConfirmed(p => ({ ...p, suspensao: suspensaoPeriodo }));
    setModalOpen(false);
  };

  const activeConfirmed = tab === 'pausa' ? confirmed.pausa : confirmed.suspensao;

  return (
    <div className="space-y-5 max-w-5xl">
      <button onClick={onBack} className="flex items-center gap-2 text-[#D4AF37] font-bold text-lg hover:text-[#FFD700] transition-colors">
        <ArrowLeft className="w-5 h-5" /> Pausas e Suspensões
      </button>

      {/* Inner tabs */}
      <div className="flex gap-6 border-b border-white/15">
        <button
          onClick={() => setTab('pausa')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            tab === 'pausa' ? 'text-white border-[#00C44D]' : 'text-gray-500 border-transparent hover:text-gray-300'
          }`}
        >
          Pausa nas Apostas
        </button>
        <button
          onClick={() => setTab('suspensao')}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            tab === 'suspensao' ? 'text-white border-[#00C44D]' : 'text-gray-500 border-transparent hover:text-gray-300'
          }`}
        >
          Suspensão da Conta
        </button>
      </div>

      <div className="rounded-xl border border-white/15 overflow-hidden account-gradient-b">
        <div className="px-6 py-4 border-b border-white/15">
          <h3 className="text-white font-bold text-base">{tab === 'pausa' ? 'Coloque sua conta em pausa' : 'Suspender sua conta'}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main controls */}
          <div className="lg:col-span-2 space-y-5">
            {activeConfirmed && (
              <div className="rounded-xl p-4 border border-[#00C44D]/30 flex items-start gap-3 bg-[#00C44D15]">
                <CheckCircle2 className="w-4 h-4 text-[#00C44D] flex-shrink-0 mt-0.5" />
                <p className="text-gray-200 text-xs leading-relaxed">
                  {tab === 'pausa' ? 'Sua conta está pausada — ' : 'Sua conta está suspensa — '}
                  <strong className="text-white">{activeConfirmed}</strong>.
                </p>
              </div>
            )}

            {tab === 'pausa' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(PRESET_DAYS).map(label => (
                    <button
                      key={label}
                      onClick={() => setDays(PRESET_DAYS[label])}
                      className={`text-left py-3 px-4 rounded-xl text-sm border transition-all ${
                        days === PRESET_DAYS[label] ? 'border-[#00C44D] bg-[#00C44D]/10' : 'border-white/15 hover:border-white/30 bg-[#0e092e]/60'
                      }`}
                    >
                      <span className="block text-white font-medium">Pausar apostas por</span>
                      <span className={`block text-xs mt-0.5 ${days === PRESET_DAYS[label] ? 'text-[#00C44D]' : 'text-gray-500'}`}>{label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>1 Dia</span>
                    <span>45 Dias</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={45}
                    value={days}
                    onChange={e => setDays(Number(e.target.value))}
                    className="w-full accent-[#00C44D]"
                  />
                  <div className="mt-3 inline-flex flex-col items-start">
                    <span className="text-gray-500 text-[11px] mb-1">Mínimo</span>
                    <span className="bg-[#0e092e] border border-white/15 rounded-lg px-3 py-1 text-white text-sm font-semibold">{days}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {suspensaoOptions.map(label => (
                    <button
                      key={label}
                      onClick={() => setSuspensaoPeriodo(label)}
                      className={`text-left py-3 px-4 rounded-xl text-sm border transition-all ${
                        suspensaoPeriodo === label ? 'border-[#00C44D] bg-[#00C44D]/10' : 'border-white/15 hover:border-white/30 bg-[#0e092e]/60'
                      }`}
                    >
                      <span className="block text-white font-medium">Suspender</span>
                      <span className={`block text-xs mt-0.5 ${suspensaoPeriodo === label ? 'text-[#00C44D]' : 'text-gray-500'}`}>{label}</span>
                    </button>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-gray-300 border border-white/15 hover:border-white/30 bg-[#0e092e]/60 transition-colors">
                  Autoexclusão Nacional <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <button
              onClick={() => setModalOpen(true)}
              disabled={tab === 'suspensao' && !suspensaoPeriodo}
              className="w-full py-3 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition-opacity hover:opacity-90 bg-[#00C44D]"
            >
              Continuar
            </button>
          </div>

          {/* Explanatory text */}
          <div className="lg:col-span-1 lg:border-l lg:border-white/15 lg:pl-6 space-y-3">
            {(tab === 'pausa'
              ? [
                  'Aqui você pode dar uma pausa nas apostas sem perder o acesso à conta.',
                  'Durante esse período, você não poderá apostar nem depositar, mas ainda poderá realizar saques.',
                  'A pausa termina automaticamente no fim do prazo escolhido.',
                  'A pausa só poderá ser modificada depois de 24 horas.',
                ]
              : [
                  'Aqui você pode suspender o acesso completo à sua conta.',
                  'Durante o período definido, não será possível acessar, apostar, gerenciar saldo ou sacar.',
                  'Assim que o prazo terminar, o acesso será reativado automaticamente.',
                  'Para reativar suspensões permanentes, será necessário falar com o suporte.',
                ]
            ).map((t, i) => (
              <p key={i} className="text-gray-400 text-xs leading-relaxed">{t}</p>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal
        open={modalOpen}
        title={tab === 'pausa' ? 'Pausa nas Apostas' : 'Suspensão da Conta'}
        description={
          tab === 'pausa'
            ? 'Durante este período, você não poderá realizar apostas nem depósitos, mas ainda poderá fazer saques. Selecione o motivo da pausa abaixo (opcional).'
            : 'Durante o período definido, não será possível acessar, apostar, gerenciar saldo ou sacar. Selecione o motivo abaixo (opcional).'
        }
        reasons={REASONS}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

// ─── Imposto de Renda ────────────────────────────────────────────────────────
function ImpostoRenda({ onBack }: { onBack?: () => void }) {
  const [year, setYear] = useState('2025');
  const [downloading, setDownloading] = useState(false);
  const years = ['2026', '2025', '2024', '2023', '2022'];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-2 text-[#D4AF37] font-bold text-lg hover:text-[#FFD700] transition-colors">
        <ArrowLeft className="w-5 h-5" /> Imposto de Renda
      </button>

      <div className="rounded-xl p-6 border border-white/15 account-gradient-b">
        <h3 className="text-white font-bold text-lg mb-5">Baixe aqui o seu informe para declaração do Imposto de Renda.</h3>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="w-full bg-[#0e092e] border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#00C44D] appearance-none pr-10"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <CalendarDays className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-8 py-3.5 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 flex-shrink-0 bg-[#00C44D]"
          >
            {downloading ? 'Gerando...' : (<><Download className="w-4 h-4" /> Baixar PDF</>)}
          </button>
        </div>

        <p className="text-gray-400 text-xs mt-4">Caso tenha dúvidas, entre em contato com o suporte.</p>
      </div>
    </div>
  );
}

// ─── Contas Bancárias ────────────────────────────────────────────────────────
function ContasBancarias() {
  const [accounts, setAccounts] = useState([
    { id: 1, conta: '79115039587', chave: '791.150.395-87', tipo: 'CPF' },
    { id: 2, conta: '11987654321', chave: '(11) 98765-4321', tipo: 'Telefone' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newChave, setNewChave] = useState('');
  const [newTipo, setNewTipo] = useState('CPF');

  const remove = (id: number) => setAccounts(a => a.filter(x => x.id !== id));
  const add = () => {
    if (!newChave) return;
    setAccounts(a => [...a, { id: Date.now(), conta: Date.now().toString().slice(-11), chave: newChave, tipo: newTipo }]);
    setNewChave('');
    setShowForm(false);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-[#1a1147] rounded-xl border border-white/15 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="text-white font-semibold text-sm">Suas Contas PIX</h3>
          </div>
          <button
            onClick={() => setShowForm(p => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity bg-[#00C44D]"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar
          </button>
        </div>

        {showForm && (
          <div className="px-5 py-4 border-b border-white/15 bg-[#0e092e] flex gap-3 flex-wrap">
            <div className="flex-1 min-w-[160px]">
              <label className="text-gray-500 text-xs mb-1 block">Chave PIX</label>
              <input
                className="w-full bg-[#1a1147] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00C44D]"
                placeholder="CPF, e-mail ou celular"
                value={newChave}
                onChange={e => setNewChave(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-500 text-xs mb-1 block">Tipo</label>
              <select
                className="bg-[#1a1147] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00C44D]"
                value={newTipo}
                onChange={e => setNewTipo(e.target.value)}
              >
                {['CPF', 'E-mail', 'Telefone', 'Aleatória'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={add} className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 bg-[#00C44D]">Salvar</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-gray-400 text-sm bg-white/5 hover:bg-white/10">Cancelar</button>
            </div>
          </div>
        )}

        {accounts.length === 0 ? (
          <div className="px-5 py-10 text-center text-gray-500 text-sm">Nenhuma conta cadastrada.</div>
        ) : (
          <div className="divide-y divide-white/5">
            <div className="grid grid-cols-3 px-5 py-2 text-gray-500 text-xs uppercase">
              <span>Número</span><span>Chave PIX</span><span>Tipo</span>
            </div>
            {accounts.map(a => (
              <div key={a.id} className="grid grid-cols-3 px-5 py-4 items-center group">
                <span className="text-gray-300 text-sm font-mono">{a.conta}</span>
                <span className="text-gray-400 text-sm">{a.chave}</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">{a.tipo}</span>
                  <button onClick={() => remove(a.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MyAccountPage({ onGoHome, onNavigateStatic, initialSection, onOpenDeposit, onOpenWithdraw }: Props) {
  const [activeSection, setActiveSection] = useState<AccountSection>((initialSection as AccountSection) ?? 'minha-conta');
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSection) setActiveSection(initialSection as AccountSection);
  }, [initialSection]);

  useEffect(() => {
    const container = navScrollRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(`[data-nav-id="${activeSection}"]`);
    activeBtn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeSection]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero strip */}
        <div className="bg-gradient-to-r from-[#1a1147] via-[#2d1569] to-[#1a1147] border-b border-white/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
              <button onClick={onGoHome} className="hover:text-white transition-colors">Início</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-300">Minha Conta</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  GA
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg leading-tight">GA, Apostador</h1>
                  <p className="text-gray-400 text-xs">ga.apostador@exemplo.com.br</p>
                </div>
              </div>
              <button
                onClick={onGoHome}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-white/5 border border-red-500/20 transition-colors flex-shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Horizontal nav — scrollable */}
          <div className="mb-6 bg-[#1a1147] rounded-xl border border-white/15 p-1">
            <div
              ref={navScrollRef}
              className="flex gap-1 momentum-scroll-x"
            >
              {navItems.map(item => (
                <button
                  key={item.id}
                  data-nav-id={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-white bg-[#00C44D]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeSection === 'minha-conta'       && <MinhaConta onOpenDeposit={onOpenDeposit} onOpenWithdraw={onOpenWithdraw} />}
          {activeSection === 'carteira'           && <Carteira onOpenWithdraw={onOpenWithdraw} />}
          {activeSection === 'apostas'            && <Apostas />}
          {activeSection === 'limites'            && <Limites />}
          {activeSection === 'seguranca'          && <Seguranca />}
          {activeSection === 'contas-bancarias'   && <ContasBancarias />}
          {activeSection === 'pausas-suspensoes'  && <PausasSuspensoes onBack={() => setActiveSection('minha-conta')} />}
          {activeSection === 'imposto-renda'      && <ImpostoRenda onBack={() => setActiveSection('minha-conta')} />}
        </div>
      </div>

      <Footer onNavigate={onNavigateStatic} />
    </div>
  );
}
