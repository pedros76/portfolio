import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  Terminal,
  RefreshCw,
  Download,
  FileText,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { generateAiResponse, type ChatMessage } from '../services/aiAssistantService';
import { useResume } from '../hooks/useResume';
import { PERSONAL_INFO } from '../data/portfolioData';

const SUGGESTED_PROMPTS = [
  "What projects has Peter built?",
  "What technologies & languages does Peter use?",
  "Tell me about Peter's attachment at EmgTTI",
  "Is Peter available for attachment or software jobs?",
  "How can I reach Peter on WhatsApp?",
  "What Cisco network simulations has Peter designed?",
  "Can I download Peter's CV?"
];

export const AiAssistant: React.FC = () => {
  const navigate = useNavigate();
  const { openResumeModal } = useResume();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello! I am Peter Kiplagat Misik's AI Representative. You can ask me anything about Peter's BSc in Information Technology at Taita Taveta University, his software development projects (TSafari, Agrovet POS), Cisco networking designs, his attachment at EmgTTI under Madam Elizabeth Tum, or his availability!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: {
        type: 'open_resume',
        label: 'Preview Peter\'s Resume'
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await generateAiResponse(query, messages);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: response.action
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `I encountered an unexpected issue while retrieving that information. Please feel free to reach out to Peter directly on WhatsApp at ${PERSONAL_INFO.phone}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: {
            type: 'whatsapp',
            label: 'Chat on WhatsApp (0743329366)',
            target: PERSONAL_INFO.whatsappUrl
          }
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action?: ChatMessage['action']) => {
    if (!action) return;

    if (action.type === 'download_cv') {
      const link = document.createElement('a');
      link.href = PERSONAL_INFO.cvPath;
      link.download = 'Peter_Kiplagat_Misik_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action.type === 'open_resume') {
      openResumeModal();
    } else if (action.type === 'whatsapp' && action.target) {
      window.open(action.target, '_blank');
    } else if (action.type === 'navigate_section' && action.target) {
      const targetElement = document.querySelector(action.target);
      if (targetElement) {
        const navHeight = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    } else if (action.type === 'navigate_project' && action.target) {
      navigate(action.target);
    }
  };

  // Helper to render basic markdown formatting cleanly
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const bulletMatch = line.match(/^(\s*)[*•-]\s+(.*)$/);
      if (bulletMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-emerald-500 font-bold shrink-0">•</span>
            <span>{renderInlineFormatting(bulletMatch[2])}</span>
          </div>
        );
      }
      const numberMatch = line.match(/^(\s*)(\d+\.)\s+(.*)$/);
      if (numberMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-emerald-500 font-mono font-semibold shrink-0">{numberMatch[2]}</span>
            <span>{renderInlineFormatting(numberMatch[3])}</span>
          </div>
        );
      }
      const headerMatch = line.match(/^#{1,4}\s+(.*)$/);
      if (headerMatch) {
        return (
          <div key={idx} className="font-bold text-neutral-900 dark:text-emerald-400 mt-2 mb-1">
            {renderInlineFormatting(headerMatch[1])}
          </div>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <div key={idx} className="my-0.5">
          {renderInlineFormatting(line)}
        </div>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-neutral-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-init-reset',
        sender: 'assistant',
        text: `Conversation refreshed! What else would you like to know about Peter's background, skills, or projects?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <section id="ai-assistant" className="py-24 relative overflow-hidden bg-neutral-900/40 dark:bg-black/40">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-700/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-POWERED VIRTUAL ASSISTANT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Ask Peter's AI Representative
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Powered by Retrieval-Augmented Generation (RAG) referencing Peter's verified academic degree, projects, Cisco network designs, attachment at EmgTTI, and direct contacts.
          </p>
        </div>

        {/* Chat Widget Container */}
        <div className="rounded-3xl bg-neutral-100/90 dark:bg-neutral-950 border border-neutral-200 dark:border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
          
          {/* Chat Header Bar */}
          <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-200/50 dark:bg-neutral-900/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 text-black font-bold flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>Peter's AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Google Gemini AI • Multi-Key Load Balanced • RAG Enabled
                </p>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-xs font-mono flex items-center gap-1.5"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 matrix-dots">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar Icon */}
                    <div
                      className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-mono font-bold ${
                        isUser
                          ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                          : 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                      }`}
                    >
                      {isUser ? 'You' : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                      <div
                        className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isUser
                            ? 'bg-emerald-500 text-black font-medium shadow-md shadow-emerald-500/10'
                            : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 shadow-sm'
                        }`}
                      >
                        {isUser ? (
                          <div className="whitespace-pre-line">{msg.text}</div>
                        ) : (
                          <div>{renderFormattedText(msg.text)}</div>
                        )}
                      </div>

                      {/* Interactive Action Button in Assistant Message */}
                      {!isUser && msg.action && (
                        <motion.button
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleActionClick(msg.action)}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 hover:text-black dark:hover:text-black text-xs font-semibold font-mono transition-all shadow-sm"
                        >
                          {msg.action.type === 'download_cv' && <Download className="w-3.5 h-3.5" />}
                          {msg.action.type === 'open_resume' && <FileText className="w-3.5 h-3.5" />}
                          {msg.action.type === 'whatsapp' && <WhatsAppIcon className="w-3.5 h-3.5" />}
                          {msg.action.type === 'navigate_section' && <ArrowRight className="w-3.5 h-3.5" />}
                          {msg.action.type === 'navigate_project' && <ExternalLink className="w-3.5 h-3.5" />}
                          <span>{msg.action.label}</span>
                        </motion.button>
                      )}

                      <div
                        className={`text-[10px] font-mono text-neutral-400 px-1 ${
                          isUser ? 'text-right' : 'text-left'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-black flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-xs font-mono text-neutral-400 ml-2">Consulting Peter's knowledge base...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="px-4 py-2 bg-neutral-200/40 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800/80 overflow-x-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 min-w-max pb-1">
              <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-emerald-500 font-semibold mr-1">
                <MessageSquare className="w-3.5 h-3.5" /> Suggestions:
              </span>
              {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isTyping}
                  className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/40 border border-neutral-300 dark:border-neutral-700 transition-colors whitespace-nowrap text-xs disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Terminal className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about Peter's background, projects, skills, or EmgTTI..."
                  disabled={isTyping}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
