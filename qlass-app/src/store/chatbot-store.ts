import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatbotStore {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

let msgCounter = 0;

export const useChatbotStore = create<ChatbotStore>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [],
      isTyping: false,
      setOpen: (open) => set({ isOpen: open }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: `msg-${++msgCounter}-${Date.now()}`,
              timestamp: new Date(),
            },
          ],
        })),
      setTyping: (typing) => set({ isTyping: typing }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "qlass-chat-history",
      // Only persist messages, not isOpen or isTyping
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
