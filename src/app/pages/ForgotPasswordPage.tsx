import { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

interface Props {
  onNavigate: (page: string) => void;
}

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function ForgotPasswordPage({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) setError('Informe seu e-mail.');
    else if (!isValidEmail(email)) setError('Informe um e-mail válido.');
    else {
      setError(undefined);
      setSent(true);
    }
  };

  return (
    <AuthLayout onGoHome={() => onNavigate('home')}>
      <div className="px-6 sm:px-8 py-8">
        <h1 className="text-white font-extrabold text-2xl mb-6">Esqueceu sua senha?</h1>

        {sent ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#00C44D]/10 border border-[#00C44D]/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-[#00C44D]" />
            </div>
            <p className="text-white text-sm mb-1">Link enviado!</p>
            <p className="text-gray-400 text-xs mb-6">
              Verifique sua caixa de entrada em <span className="text-white">{email}</span> para redefinir sua senha.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="text-[#D4AF37] text-xs hover:text-[#FFD700] transition-colors"
            >
              « Voltar ao Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 block">E-mail</label>
              <input
                type="email"
                placeholder="seuemail@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError(undefined); }}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder-white/30 ${
                  error ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00C44D]'
                }`}
              />
              {error && (
                <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[#D4AF37] text-xs hover:text-[#FFD700] transition-colors"
            >
              « Voltar ao Login
            </button>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#00C44D' }}
            >
              Continuar
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
