import { Send, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const messages = [
  { user: 'Lucas21', avatar: '🎮', message: 'Alguém sabe quando sai o próximo torneio?', time: 'Agora' },
  { user: 'Camila91', avatar: '💎', message: 'Acabei de ganhar no Aviator! 🔥', time: '2 min' },
  { user: 'João83', avatar: '🎯', message: 'Esse jogo tá pagando bem hoje', time: '5 min' },
  { user: 'Mariana', avatar: '⭐', message: 'Qual o melhor horário para jogar?', time: '8 min' },
  { user: 'Pedro42', avatar: '🎰', message: 'Suporte muito rápido, parabéns!', time: '12 min' },
];

export function ChatSidebar() {
  const [message, setMessage] = useState('');

  return (
    <aside className="w-80 bg-[#1a1a2e] border-l border-purple-900/30 flex flex-col">
      <div className="px-4 py-3 border-b border-purple-900/30 flex items-center justify-between">
        <h3 className="text-white">Chat ao vivo</h3>
        <span className="text-green-400 text-sm flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Online: 147
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white text-sm">{msg.user}</span>
                <span className="text-gray-500 text-xs">{msg.time}</span>
              </div>
              <p className="text-gray-300 text-sm break-words">{msg.message}</p>
            </div>
            <button className="text-gray-500 hover:text-gray-300 flex-shrink-0">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-purple-900/30">
        <p className="text-gray-400 text-xs mb-2">Participe do bate-papo ao vivo para conversar com outros apostadores!</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-[#252540] text-white placeholder-gray-500 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
