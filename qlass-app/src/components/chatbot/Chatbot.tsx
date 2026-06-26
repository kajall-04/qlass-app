"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, Trash2 } from "lucide-react";
import { useChatbotStore, ChatMessage } from "@/store/chatbot-store";
import type { Role } from "@/types/auth";

interface ChatbotProps {
  role: Role;
}

const SUGGESTIONS: Record<Role, string[]> = {
  admin: [
    "Show attendance summary",
    "Which students need attention?",
    "DPP completion status",
    "Upcoming tests this week",
  ],
  teacher: [
    "My class performance",
    "Students with low attendance",
    "Pending assignments",
    "Today's schedule",
  ],
  student: [
    "My pending DPPs",
    "Upcoming test dates",
    "My attendance status",
    "Help with syllabus",
  ],
};

const FALLBACK_RESPONSES = [
  "I'm your Qlass AI assistant! To connect me to a live AI, set the `NEXT_PUBLIC_CHATBOT_API_URL` environment variable to your API endpoint (e.g., OpenAI, Gemini, or your custom backend).",
  "This is a preview of the chatbot experience. Once connected to your backend API, I'll be able to answer questions about student performance, attendance, schedules, and more!",
  "I can help with things like attendance reports, student progress, test schedules, and more — once your API is connected. For now, I'm running in demo mode.",
  "Great question! In production, this would be answered by your AI backend. Set `NEXT_PUBLIC_CHATBOT_API_URL` in your `.env.local` to enable live responses.",
];

function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export function Chatbot({ role }: ChatbotProps) {
  const { isOpen, toggle, messages, addMessage, isTyping, setTyping, clearMessages } = useChatbotStore();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage = text.trim();
    setInput("");
    addMessage({ role: "user", content: userMessage });
    setTyping(true);

    const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;

    if (apiUrl) {
      // Real API call
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            role,
            history: messages.slice(-10).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        addMessage({
          role: "assistant",
          content: data.reply || data.message || data.content || "Sorry, I couldn't process that.",
        });
      } catch {
        addMessage({
          role: "assistant",
          content: "I'm having trouble connecting to the server. Please try again later.",
        });
      }
    } else {
      // Fallback demo response
      await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
      const fallback = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      addMessage({ role: "assistant", content: fallback });
    }

    setTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2F63FF] to-[#10265C] text-white shadow-[0_8px_30px_rgba(47,99,255,0.4)] flex items-center justify-center hover:shadow-[0_12px_40px_rgba(47,99,255,0.5)] transition-shadow"
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[540px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-[#2F63FF]/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2F63FF] to-[#10265C] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Qlass AI</h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => clearMessages()}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                    Hi! I&apos;m Qlass AI
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    Ask me anything about your {role === "admin" ? "institution" : role === "teacher" ? "classes" : "studies"}
                  </p>
                  {/* Suggestion chips */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {SUGGESTIONS[role].map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2F63FF] to-[#10265C] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-[#2F63FF] hover:bg-[#10265C] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2F63FF] to-[#10265C] flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
          isUser
            ? "bg-[#2F63FF] text-white rounded-tr-md"
            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-md"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        <p className={`text-[10px] mt-1 ${isUser ? "text-white/60" : "text-slate-400"}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}
