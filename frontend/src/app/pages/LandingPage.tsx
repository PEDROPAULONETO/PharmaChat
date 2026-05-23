import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Layout } from '../components/Layout';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const LandingPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Eu sou o Pharma, seu assistente virtual. Como posso ajudar você hoje?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const currentInput = input.trim();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/ajuda/perguntar', {
        pergunta: currentInput,
      });

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        text: typeof response.data === 'string' ? response.data : (response.data.resposta || 'Desculpe, não entendi.'),
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: 'Desculpe, tive um problema para processar sua mensagem. Pode tentar de novo?',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading]);

  return (
    <Layout>
      <div className="w-full max-w-4xl h-[80vh] md:h-[85vh] bg-white rounded-3xl shadow-xl flex flex-col border border-gray-100 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Assistente Pharma</h2>
            <p className="text-sm opacity-80 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              Online agora
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}>
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
              )}
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] mt-2 block opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.sender === 'user' ? 'Você' : 'Assistente'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-center gap-3">
              <div className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center"><Bot size={16} /></div>
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none flex items-center gap-3 shadow-sm">
                <Loader2 size={18} className="animate-spin text-red-600" />
                <span className="text-sm text-gray-500 italic">Pharma está digitando...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex gap-4">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Como posso ajudar você hoje?"
              disabled={isLoading}
              autoFocus
              className="flex-1 py-6 px-6 text-base rounded-2xl border-gray-200 focus:ring-red-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-2xl h-auto"
            >
              <Send size={24} />
            </Button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Pharma Assistente Virtual • Inteligência Artificial aplicada ao seu negócio
          </p>
        </div>
      </div>
    </Layout>
  );
};
