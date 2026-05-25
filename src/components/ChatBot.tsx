import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHATBOT_RESPONSES, getWhatsAppLink } from '../lib/constants';

interface Props { darkMode: boolean; lang: 'en' | 'es'; }

interface Message {
  from: 'bot' | 'user';
  text: string;
}

const quickReplies = {
  en: [
    { label: '⚙️ How it works', key: 'process' },
    { label: '🏔️ Our Resorts', key: 'resorts' },
    { label: '🎿 My Level', key: 'level' },
    { label: '💰 Pricing', key: 'price' },
    { label: '📅 Book a Class', key: 'book' },
  ],
  es: [
    { label: '⚙️ Cómo funciona', key: 'process' },
    { label: '🏔️ Nuestros Resorts', key: 'resorts' },
    { label: '🎿 Mi Nivel', key: 'level' },
    { label: '💰 Precios', key: 'price' },
    { label: '📅 Reservar Clase', key: 'book' },
  ],
};

const greetings = {
  en: "Hi! I'm Powder 🤖 — the Ski Match virtual assistant. How can I help you today? Choose a topic below or type your question!",
  es: "¡Hola! Soy Powder 🤖 — el asistente virtual de Ski Match. ¿En qué puedo ayudarte hoy? ¡Elige un tema o escribe tu pregunta!",
};

export default function ChatBot({ darkMode, lang }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: 'bot', text: greetings[lang] }]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userText: string): string => {
    const lower = userText.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto')) {
      return CHATBOT_RESPONSES.price[lang];
    }
    if (lower.includes('resort') || lower.includes('where') || lower.includes('donde') || lower.includes('lugar')) {
      return CHATBOT_RESPONSES.resorts[lang];
    }
    if (lower.includes('level') || lower.includes('beginner') || lower.includes('nivel') || lower.includes('principiante') || lower.includes('intermediate')) {
      return CHATBOT_RESPONSES.level[lang];
    }
    if (lower.includes('book') || lower.includes('reserv') || lower.includes('how') || lower.includes('como') || lower.includes('process') || lower.includes('proceso')) {
      return CHATBOT_RESPONSES.process[lang];
    }
    return CHATBOT_RESPONSES.default[lang];
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { from: 'user', text: text.trim() };
    const botReply: Message = { from: 'bot', text: getBotResponse(text) };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInput('');
  };

  const handleQuick = (key: string) => {
    const quick = quickReplies[lang].find(q => q.key === key);
    if (!quick) return;
    const botReply: Message = { from: 'bot', text: CHATBOT_RESPONSES[key]?.[lang] || CHATBOT_RESPONSES.default[lang] };
    setMessages(prev => [...prev, { from: 'user', text: quick.label }, botReply]);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={lang === 'en' ? 'Open chat assistant' : 'Abrir asistente de chat'}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors ${
          isOpen ? 'hidden' : 'flex'
        } ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-700 hover:bg-blue-800'}`}
      >
        <span className="text-2xl">💬</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" aria-hidden="true" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden flex flex-col ${
              darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
            }`}
            style={{ maxHeight: '520px' }}
            role="dialog"
            aria-label="Ski Match Chat"
          >
            {/* Header */}
            <div className="bg-winter-gradient p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">🤖</div>
                <div>
                  <div className="text-white font-bold text-sm">Powder</div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                    <span className="text-blue-200 text-xs">{lang === 'en' ? 'Online · Ski Match AI' : 'En línea · Ski Match IA'}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : darkMode ? 'bg-slate-700 text-slate-100 rounded-bl-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className={`px-4 pb-2 flex flex-wrap gap-1.5`}>
                {quickReplies[lang].map(q => (
                  <button
                    key={q.key}
                    onClick={() => handleQuick(q.key)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all hover:scale-105 ${
                      darkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className={`p-3 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder={lang === 'en' ? 'Type your question...' : 'Escribe tu pregunta...'}
                  aria-label={lang === 'en' ? 'Chat input' : 'Entrada de chat'}
                  className={`flex-1 text-sm px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
                  }`}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  →
                </button>
              </div>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs mt-2 text-green-600 hover:text-green-700 font-semibold"
              >
                💬 {lang === 'en' ? 'Chat with a human via WhatsApp' : 'Chatear con humano por WhatsApp'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
