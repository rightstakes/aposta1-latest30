import { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';

interface Props { onClose: () => void; }

const PRESETS = [
  { label: 'R$ 50',   value: 50,   tag: null },
  { label: 'R$ 100',  value: 100,  tag: null },
  { label: 'R$ 200',  value: 200,  tag: 'HOT' },
  { label: 'R$ 500',  value: 500,  tag: null },
  { label: 'R$ 1.000', value: 1000, tag: null },
  { label: 'TUDO',    value: 1200, tag: 'MAX' },
];

const KEY_TYPES = ['CPF', 'Telefone', 'E-mail', 'Chave Aleatória'];
const BALANCE = 1200;

export function WithdrawModal({ onClose }: Props) {
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [keyType, setKeyType] = useState('CPF');
  const [keyValue, setKeyValue] = useState('');
  const [dropOpen, setDropOpen] = useState(false);
  const [agreedWarning, setAgreedWarning] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const numeric = parseFloat(amount) || 0;
  const canSubmit = numeric >= 50 && keyValue.trim().length > 3 && agreedWarning && agreedTerms && !submitted;

  const pickPreset = (v: number) => { setSelected(v); setAmount(v.toString()); };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const keyPlaceholder: Record<string, string> = {
    'CPF': '000.000.000-00',
    'Telefone': '(11) 99999-9999',
    'E-mail': 'seu@email.com',
    'Chave Aleatória': 'Cole sua chave aleatória',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: 'radial-gradient(circle 200px at center 120%, #3d1f8f, #110936)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            <h2 className="text-white font-bold text-lg">Solicitar Saque</h2>
            <p className="text-gray-400 text-xs mt-0.5">Transfira seu saldo via PIX</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {submitted ? (
            /* Success state */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00C44D]/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#00C44D]" />
              </div>
              <div>
                <p className="text-white font-bold text-xl mb-1">Saque Solicitado!</p>
                <p className="text-gray-400 text-sm">Seu saque de <span className="text-white font-semibold">R$ {parseFloat(amount).toFixed(2).replace('.',',')}</span> foi enviado para processamento.</p>
              </div>
              <p className="text-gray-500 text-xs">Processamento em até 10 minutos · via PIX</p>
              <button onClick={onClose} className="w-full py-3 rounded-xl text-white font-semibold hover:opacity-90" style={{ backgroundColor: '#00C44D' }}>
                Fechar
              </button>
            </div>
          ) : (
            <>
              {/* Balance */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Saldo disponível para saque</span>
                <span className="text-[#D4AF37] font-bold text-sm">R$ {BALANCE.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>

              {/* Amount input */}
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Valor a sacar (mínimo R$ 50)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">R$</span>
                  <input
                    type="number"
                    min={50}
                    max={BALANCE}
                    placeholder="0,00"
                    value={amount}
                    onChange={e => { setAmount(e.target.value); setSelected(null); }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-xl font-bold focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-white/20 text-center"
                  />
                </div>
                {numeric > BALANCE && (
                  <p className="text-red-400 text-xs mt-1">Valor superior ao saldo disponível</p>
                )}
              </div>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map(p => (
                  <button key={p.value} onClick={() => pickPreset(p.value)}
                    className="relative py-2.5 rounded-xl text-sm font-bold border transition-all"
                    style={{
                      backgroundColor: selected === p.value ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
                      borderColor: selected === p.value ? '#D4AF37' : 'rgba(255,255,255,0.08)',
                      color: selected === p.value ? '#D4AF37' : '#9ca3af',
                    }}>
                    {p.tag && (
                      <span className="absolute -top-2 -right-1 text-[9px] font-bold px-1 py-0.5 rounded text-black"
                        style={{ backgroundColor: p.tag === 'HOT' ? '#ef4444' : '#00C44D' }}>
                        {p.tag}
                      </span>
                    )}
                    {p.label}
                  </button>
                ))}
              </div>

              {/* PIX key */}
              <div>
                <label className="text-gray-400 text-xs mb-2 block">Chave PIX para recebimento</label>
                <div className="flex gap-2">
                  {/* Key type dropdown */}
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={() => setDropOpen(p => !p)}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm min-w-[130px] justify-between hover:border-white/20 transition-colors"
                    >
                      <span>{keyType}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropOpen && (
                      <div className="absolute top-full mt-1 left-0 w-full bg-[#1a1147] border border-white/10 rounded-xl overflow-hidden z-10 shadow-xl">
                        {KEY_TYPES.map(t => (
                          <button key={t} onClick={() => { setKeyType(t); setDropOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${keyType === t ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    value={keyValue}
                    onChange={e => setKeyValue(e.target.value)}
                    placeholder={keyPlaceholder[keyType]}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Warning box */}
              <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 space-y-2">
                <div className="flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p>Saques para contas bancárias de terceiros serão <strong className="text-white">rejeitados</strong>.</p>
                    <p>O saque será processado para sua conta em até <strong className="text-white">10 minutos</strong>.</p>
                    <p>Qualquer bônus ainda não convertido será <strong className="text-white">perdido</strong> ao sacar.</p>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input type="checkbox" checked={agreedWarning} onChange={e => setAgreedWarning(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#D4AF37]" />
                  <span className="text-gray-400 text-xs">Entendi e concordo</span>
                </label>
              </div>

              {/* Terms */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={agreedTerms} onChange={e => setAgreedTerms(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#D4AF37]" />
                <span className="text-gray-400 text-xs">Aceito os termos de transferência</span>
              </label>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full py-4 rounded-xl font-bold text-white text-base transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                style={{ backgroundColor: canSubmit ? '#D4AF37' : '#374151' }}
              >
                SACAR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
