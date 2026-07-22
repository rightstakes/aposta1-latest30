import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

interface Props {
  onNavigate: (page: string) => void;
}

interface Errors {
  email?: string;
  password?: string;
}

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function LoginPage({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (field: keyof Errors) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    if (!email.trim()) newErrors.email = 'Informe seu e-mail.';
    else if (!isValidEmail(email)) newErrors.email = 'Informe um e-mail válido.';

    if (!password) newErrors.password = 'Informe sua senha.';
    else if (password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onNavigate('home');
  };

  const inputBase =
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder-white/30';
  const borderCls = (hasError?: string) =>
    hasError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00C44D]';

  return (
    <AuthLayout onGoHome={() => onNavigate('home')}>
      <div className="px-6 sm:px-8 py-8">
        <h1 className="text-white font-extrabold text-2xl mb-6">Entrar na Sua Conta</h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 block">E-mail</label>
            <input
              type="email"
              placeholder="seuemail@example.com"
              value={email}
              onChange={e => { setEmail(e.target.value); clearError('email'); }}
              className={`${inputBase} ${borderCls(errors.email)}`}
            />
            {errors.email && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 block">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={password}
                onChange={e => { setPassword(e.target.value); clearError('password'); }}
                className={`${inputBase} pr-12 ${borderCls(errors.password)}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="flex items-center gap-2 text-gray-400 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#00C44D]"
              />
              Continuar logado
            </label>
            <button
              type="button"
              onClick={() => onNavigate('esqueci-senha')}
              className="text-[#D4AF37] text-xs hover:text-[#FFD700] transition-colors"
            >
              Esqueceu sua senha?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00C44D' }}
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          Não tem conta?{' '}
          <button
            onClick={() => onNavigate('cadastro')}
            className="text-[#D4AF37] font-semibold hover:text-[#FFD700] transition-colors"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
