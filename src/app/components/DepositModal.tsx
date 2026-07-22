import { useState, useEffect, useRef } from 'react';
import { X, Copy, CheckCheck, QrCode, ChevronRight } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const PRESETS = [20, 50, 100, 200, 500, 1000];

const FAKE_PIX_KEY = 'aposta1@pagamentos.pix.br';
const FAKE_QR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" shape-rendering="crispEdges">
    ${Array.from({length:100},(_,i)=>{const x=i%10,y=Math.floor(i/10),on=Math.random()>.45;return on?`<rect x="${x}" y="${y}" width="1" height="1" fill="#fff"/>`:''}).join('')}
    <rect x="0" y="0" width="3" height="3" fill="#fff"/><rect x="1" y="1" width="1" height="1" fill="#00C44D"/>
    <rect x="7" y="0" width="3" height="3" fill="#fff"/><rect x="8" y="1" width="1" height="1" fill="#00C44D"/>
    <rect x="0" y="7" width="3" height="3" fill="#fff"/><rect x="1" y="8" width="1" height="1" fill="#00C44D"/>
  </svg>`);

export function DepositModal({ onClose }: Props) {
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState<'input' | 'qr'>('input');
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const selectPreset = (v: number) => {
    setSelected(v);
    setAmount(v.toString());
  };

  const numericAmount = parseFloat(amount) || 0;
  const canProceed = numericAmount >= 20;

  const handleGenerate = () => { if (canProceed) setStep('qr'); };

  const copyKey = () => {
    navigator.clipboard.writeText(FAKE_PIX_KEY).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{ background: 'radial-gradient(circle 200px at center 120%, #3d1f8f, #110936)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div>
            <h2 className="text-white font-bold text-lg">Depositar via PIX</h2>
            <p className="text-gray-400 text-xs mt-0.5">Aprovação instantânea · sem taxas</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {step === 'input' ? (
            <>
              {/* Amount input */}
              <div className="mb-5">
                <label className="text-gray-400 text-xs mb-2 block">Digite o valor (mínimo R$ 20)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">R$</span>
                  <input
                    ref={inputRef}
                    type="number"
                    min={20}
                    step={1}
                    placeholder="0,00"
                    value={amount}
                    onChange={e => { setAmount(e.target.value); setSelected(null); }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-4 text-white text-2xl font-bold focus:outline-none focus:border-[#00C44D] transition-colors placeholder-white/20 text-center"
                  />
                </div>
              </div>

              {/* Preset amounts */}
              <p className="text-gray-500 text-xs text-center mb-3">ou selecione um valor rápido</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {PRESETS.map(v => (
                  <button
                    key={v}
                    onClick={() => selectPreset(v)}
                    className="py-3 rounded-xl text-sm font-bold border transition-all"
                    style={{
                      backgroundColor: selected === v ? 'rgba(0,196,77,0.15)' : 'rgba(255,255,255,0.04)',
                      borderColor: selected === v ? '#00C44D' : 'rgba(255,255,255,0.08)',
                      color: selected === v ? '#00C44D' : '#9ca3af',
                    }}
                  >
                    R$ {v}
                  </button>
                ))}
              </div>

              {/* Bonus hint */}
              {numericAmount >= 20 && (
                <div className="mb-5 rounded-xl p-3 flex items-center gap-3 border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                  <span className="text-[#D4AF37] text-lg">🎁</span>
                  <p className="text-[#D4AF37] text-xs">
                    Primeiro depósito? Ganhe <strong>100% de bônus</strong> até R$500!
                  </p>
                </div>
              )}

              {/* Generate */}
              <button
                onClick={handleGenerate}
                disabled={!canProceed}
                className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: canProceed ? '#00C44D' : '#374151' }}
              >
                <QrCode className="w-5 h-5" />
                Gerar QR Code PIX
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-gray-600 text-[11px] text-center mt-4">
                Pagamentos processados com segurança · SSL 256-bit
              </p>
            </>
          ) : (
            <>
              {/* QR step */}
              <div className="text-center mb-5">
                <p className="text-white text-sm font-semibold mb-1">Escaneie o QR Code</p>
                <p className="text-gray-400 text-xs">Abra seu banco e aponte a câmera</p>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-5">
                <div className="rounded-2xl p-4 border border-white/10 bg-white">
                  <img src={FAKE_QR} alt="QR PIX" className="w-44 h-44" style={{ imageRendering: 'pixelated' }} />
                </div>
              </div>

              {/* Amount badge */}
              <div className="flex justify-center mb-5">
                <div className="bg-[#00C44D]/10 border border-[#00C44D]/30 rounded-full px-5 py-1.5">
                  <span className="text-[#00C44D] font-bold text-lg">R$ {parseFloat(amount).toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              {/* Copy key */}
              <div className="mb-5">
                <p className="text-gray-500 text-xs mb-2 text-center">ou copie a chave PIX</p>
                <button
                  onClick={copyKey}
                  className="w-full flex items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors group"
                >
                  <span className="text-gray-300 text-sm truncate font-mono">{FAKE_PIX_KEY}</span>
                  {copied
                    ? <CheckCheck className="w-4 h-4 text-[#00C44D] flex-shrink-0" />
                    : <Copy className="w-4 h-4 text-gray-500 group-hover:text-white flex-shrink-0 transition-colors" />}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('input')}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Alterar valor
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#00C44D' }}
                >
                  Já paguei ✓
                </button>
              </div>

              <p className="text-gray-600 text-[11px] text-center mt-4">
                QR Code válido por 30 minutos · crédito em segundos
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
