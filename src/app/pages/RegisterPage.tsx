import { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

interface Props {
  onNavigate: (page: string) => void;
}

interface Errors {
  cpf?: string;
  phone?: string;
  email?: string;
  password?: string;
  agreed?: string;
}

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const formatCPF = (v: string) => {
  const digits = v.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatPhone = (v: string) => {
  const digits = v.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
};

export function RegisterPage({ onNavigate }: Props) {
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (field: keyof Errors) => {
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Errors = {};
    const cpfDigits = cpf.replace(/\D/g, '');
    const phoneDigits = phone.replace(/\D/g, '');

    if (!cpfDigits) newErrors.cpf = 'Informe seu CPF.';
    else if (cpfDigits.length !== 11) newErrors.cpf = 'CPF deve conter 11 dígitos.';

    if (!phoneDigits) newErrors.phone = 'Informe seu celular.';
    else if (phoneDigits.length < 10) newErrors.phone = 'Informe um número de celular válido.';

    if (!email.trim()) newErrors.email = 'Informe seu e-mail.';
    else if (!isValidEmail(email)) newErrors.email = 'Informe um e-mail válido.';

    if (!password) newErrors.password = 'Crie uma senha.';
    else if (password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';

    if (!agreed) newErrors.agreed = 'Você precisa aceitar os termos para continuar.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) onNavigate('home');
  };

  const labelCls = 'text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2 block';
  const inputBase =
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-colors placeholder-white/30';
  const borderCls = (hasError?: string) =>
    hasError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00C44D]';
  const fieldError = (msg?: string) =>
    msg ? (
      <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {msg}
      </p>
    ) : null;

  return (
    <AuthLayout onGoHome={() => onNavigate('home')}>
      <div className="px-6 sm:px-8 py-8">
        <h1 className="text-white font-extrabold text-2xl mb-6">Cadastre-se</h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className={labelCls}>CPF *</label>
            <input
              placeholder="000.000.000-00"
              value={cpf}
              onChange={e => { setCpf(formatCPF(e.target.value)); clearError('cpf'); }}
              className={`${inputBase} ${borderCls(errors.cpf)}`}
            />
            {fieldError(errors.cpf)}
          </div>

          <div>
            <label className={labelCls}>Celular *</label>
            <input
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={e => { setPhone(formatPhone(e.target.value)); clearError('phone'); }}
              className={`${inputBase} ${borderCls(errors.phone)}`}
            />
            {fieldError(errors.phone)}
          </div>

          <div>
            <label className={labelCls}>E-mail *</label>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={e => { setEmail(e.target.value); clearError('email'); }}
              className={`${inputBase} ${borderCls(errors.email)}`}
            />
            {fieldError(errors.email)}
          </div>

          <div>
            <label className={labelCls}>Senha *</label>
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
            {fieldError(errors.password)}
          </div>

          <div>
            <label className="flex items-start gap-2.5 text-gray-400 text-xs cursor-pointer leading-relaxed">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => { setAgreed(e.target.checked); clearError('agreed'); }}
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-[#00C44D] flex-shrink-0"
              />
              <span>
                Confirmo que tenho mais de 18 anos e aceito os{' '}
                <span className="text-[#D4AF37] underline">Termos e Condições</span> e a{' '}
                <span className="text-[#D4AF37] underline">Política de Privacidade</span>
              </span>
            </label>
            {fieldError(errors.agreed)}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00C44D' }}
          >
            Continuar
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          <button onClick={() => onNavigate('login')} className="hover:text-white transition-colors">
            « Voltar ao Login
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}
