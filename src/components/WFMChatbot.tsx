"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "What is scheduling inflex",
  "What is Erlang C?",
  "How to calcaulate Out of office shrinkage",
  "What is a good occupancy target?",
  "Explain service level vs ASA",
  "How to learn forecasting?",
];

const WELCOME = `👋 Hi! I'm your **WFM Clubs Assistant** Developed by Gurpreet Singh. Happy Learning 😊

I can help you with **any question** — WFM calculations, forecasting, scheduling, career advice, or anything else you'd like to know.

Try one of the quick questions below, or just type!`;

function parseMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Bold: **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i}>
        {rendered}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function WFMChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgCounter = useRef(0);

  const makeId = () => `msg-${++msgCounter.current}-${Date.now()}`;

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = { id: makeId(), role: "user", content: trimmed };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setIsLoading(true);

      try {
        // Build history for API (last 10 messages to stay within token limits)
        const history = nextMessages.slice(-10).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        const data = await res.json();
        const assistantMsg: Message = {
          id: makeId(),
          role: "assistant",
          content: data.text ?? "Sorry, I couldn't get a response. Please try again.",
        };

        setMessages((prev) => [...prev, assistantMsg]);
        if (!isOpen) setHasUnread(true);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: "assistant",
            content: "⚠️ Network error. Please check your connection and try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, isOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    msgCounter.current = 0;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[360px] sm:w-[420px] bg-[#0b1c2d] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
            style={{ height: "540px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0 bg-gradient-to-r from-[#0b1c2d] to-[#0f2540]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#00b4ff]/20 border border-[#00b4ff]/40 flex items-center justify-center text-lg">
                    🤖
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0b1c2d]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">WFM Clubs Assistant</p>
                  <p className="text-[#00b4ff] text-xs">AI Assistant · Free</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="w-7 h-7 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

              {/* Empty state / welcome */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#00b4ff]/20 border border-[#00b4ff]/30 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      🤖
                    </div>
                    <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-md px-3.5 py-2.5 text-sm text-gray-100 leading-relaxed max-w-[85%]">
                      {parseMarkdown(WELCOME)}
                    </div>
                  </div>

                  {/* Quick questions */}
                  <div className="ml-9">
                    <p className="text-gray-500 text-xs mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="px-2.5 py-1 text-xs text-[#00b4ff] border border-[#00b4ff]/30 rounded-full hover:bg-[#00b4ff]/10 transition-colors text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Conversation messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-[#00b4ff]/20 border border-[#00b4ff]/30 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#00b4ff] text-white rounded-tr-md"
                        : "bg-white/8 text-gray-100 rounded-tl-md border border-white/10"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Typing / loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#00b4ff]/20 border border-[#00b4ff]/30 flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-white/8 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-md flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-[#00b4ff] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="px-3 py-3 border-t border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/8 border border-white/15 rounded-xl px-3 py-2.5 focus-within:border-[#00b4ff]/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500 disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-7 h-7 rounded-lg bg-[#00b4ff] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#0095d8] transition-colors flex-shrink-0"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-600 text-[10px] mt-1.5">
                WFM Clubs Assistant · Ask me anything
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#00b4ff] to-[#0073c4] text-white shadow-lg shadow-[#00b4ff]/30 flex items-center justify-center"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open WFM Assistant"
      >
        <span className="absolute inset-0 rounded-full bg-[#00b4ff]/25 animate-ping" style={{ animationDuration: "2.5s" }} />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center z-10"
          >
            1
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
