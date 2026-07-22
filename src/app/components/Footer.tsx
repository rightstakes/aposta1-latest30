import { Instagram, Youtube, Shield, Clock, Lock, Headphones, Zap, CheckCircle } from 'lucide-react';
import paymentImg from '../../imports/payment-method__2_-1.svg';
import logoImage from '../../imports/aposta1-logo-new-gold-1.png';
import pixIcon from '../../imports/pix.svg';

interface FooterProps {
  onNavigate?: (slug: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const go = (slug: string) => onNavigate?.(slug);

  return (
    <footer className="bg-[#0E092E] border-t border-white/15 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImage} alt="APOSTA1" className="h-12 w-auto" />
              <span className="text-white font-bold text-xl">APOSTA1</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A melhor plataforma de cassino online e apostas esportivas do Brasil.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D4AF37] transition-colors border border-white/15">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#D4AF37] transition-colors border border-white/15">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">AJUDA</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => go('central-de-ajuda')} className="hover:text-white transition-colors text-left text-xs">Central de Ajuda</button></li>
              <li><button onClick={() => go('fale-conosco')} className="hover:text-white transition-colors text-left text-xs">Fale Conosco</button></li>
              <li><button onClick={() => go('metodos-de-pagamento')} className="hover:text-white transition-colors text-left text-xs">Métodos de Pagamento</button></li>
              <li><button onClick={() => go('apostas-esportivas')} className="hover:text-white transition-colors text-left text-xs">Apostas Esportivas</button></li>
              <li><button onClick={() => go('caca-niqueis-online')} className="hover:text-white transition-colors text-left text-xs">Caça-Níqueis Online</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">REGRAS</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => go('termos-condicoes')} className="hover:text-white transition-colors text-left text-xs">Termos e Condições</button></li>
              <li><button onClick={() => go('regras-apostas-esportivas')} className="hover:text-white transition-colors text-left text-xs">Regras de Apostas Esportivas</button></li>
              <li><button onClick={() => go('politica-privacidade')} className="hover:text-white transition-colors text-left text-xs">Política de Privacidade</button></li>
              <li><button onClick={() => go('politica-menores')} className="hover:text-white transition-colors text-left text-xs">Proteção de Menores</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">PAGAMENTOS</h4>
            <div className="flex items-center gap-2 mb-4 bg-white/5 p-2 rounded border border-white/15">
              <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0 flex flex-col">
                <div className="flex-1 bg-[#009c3b]" />
                <div className="flex-1 bg-[#ffdf00]" />
                <div className="flex-1 bg-[#009c3b]" />
              </div>
              <span className="text-white text-sm font-bold">AUTORIZADO</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>PIX - Instantâneo</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 mb-6">
          <p className="text-gray-500 text-xs leading-relaxed mb-4">
            APOSTA1.COM é operado pela APOSTA1 N.V., uma empresa constituída sob as leis de Curaçao,
            com o número de registro 123456 e endereço registrado em Heelsumstraat 51, Curaçao.
            A APOSTA1 N.V. é licenciada e regulamentada pela Autoridade de Jogos de Curaçao sob a
            licença GLH-OCCHKTW0123456789. É ilegal para menores de 18 anos abrir uma conta ou jogar
            na APOSTA1. Jogue com responsabilidade.
          </p>
        </div>

        <div className="mb-6">
          <h5 className="text-gray-400 text-xs mb-3">MÉTODOS DE PAGAMENTO</h5>
          <div className="flex gap-3 flex-wrap">
            <img src={pixIcon} alt="PIX" className="h-10 w-auto" />
          </div>
        </div>

        <div className="mb-6">
          <h5 className="text-gray-400 text-xs mb-3">NOSSOS DIFERENCIAIS</h5>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Shield, label: 'Jogo Responsável' },
              { icon: CheckCircle, label: '+18 Anos' },
              { icon: Lock, label: 'Proteção de Dados' },
              { icon: Headphones, label: 'Suporte 24/7' },
              { icon: Zap, label: 'Saque Rápido' },
              { icon: Clock, label: 'SSL Seguro' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="bg-white/5 p-3 rounded text-center border border-white/15">
                <Icon className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                <p className="text-gray-400 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2026 APOSTA1. Todos os direitos reservados.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[#D4AF37] text-xs hover:text-[#FFD700]"
          >
            VOLTAR AO TOPO ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
