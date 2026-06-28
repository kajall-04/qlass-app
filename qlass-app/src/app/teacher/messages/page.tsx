"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Send, Phone, Video, MoreVertical, Image, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/teacher/shared/PageHeader";
import { motion, AnimatePresence } from "framer-motion";

const contacts = [
  { id: "c1", name: "Aarav Sharma", class: "11-A", last: "Sir, I have a doubt in Ch4", time: "2m", unread: 2, online: true },
  { id: "c2", name: "Priya Patel", class: "11-B", last: "Submitted the DPP", time: "15m", unread: 0, online: true },
  { id: "c3", name: "Rahul Kumar", class: "12-A", last: "Thank you for the notes!", time: "1h", unread: 0, online: false },
  { id: "c4", name: "Sneha Gupta", class: "11-A", last: "Can I get extra time?", time: "2h", unread: 1, online: false },
  { id: "c5", name: "Vikram Singh", class: "11-B", last: "I'll attend the extra class", time: "3h", unread: 0, online: true },
  { id: "c6", name: "Ananya Verma", class: "12-A", last: "Lab experiment query", time: "1d", unread: 0, online: false },
];

const messages = [
  { id: "m1", sender: "student", text: "Sir, I have a doubt in Chapter 4 — Newton's Third Law. Can you explain with an example?", time: "10:12 AM" },
  { id: "m2", sender: "teacher", text: "Sure! Think of it this way: when you push a wall, the wall pushes you back with equal force. That's why your hand feels pressure.", time: "10:15 AM" },
  { id: "m3", sender: "student", text: "Oh, so when we walk, we push the ground backward and it pushes us forward?", time: "10:16 AM" },
  { id: "m4", sender: "teacher", text: "Exactly! Great understanding. The friction between your feet and the ground provides the reaction force that propels you forward.", time: "10:18 AM" },
  { id: "m5", sender: "student", text: "Thank you sir! This makes so much sense now. Can I also ask about the rocket propulsion example from the textbook?", time: "10:19 AM" },
];

export default function TeacherMessagesPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageInput, setMessageInput] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [showContacts, setShowContacts] = useState(true);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full h-[calc(100vh-120px)]">
      <PageHeader title="Messages" subtitle="Chat with students and parents" />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm flex h-[calc(100%-80px)]">
        {/* Contacts List */}
        <div className={cn(
          "w-full sm:w-80 lg:w-[320px] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0",
          !showContacts && "hidden sm:flex"
        )}>
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={contactSearch}
                onChange={e => setContactSearch(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredContacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  setShowContacts(false);
                }}
                className={cn(
                  "w-full p-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left border-b border-slate-50 dark:border-slate-800/50",
                  selectedContact.id === contact.id && "bg-blue-50 dark:bg-blue-900/10"
                )}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  {contact.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800 dark:text-white">{contact.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{contact.last}</p>
                    {contact.unread > 0 && (
                      <span className="bg-blue-600 text-white text-[9px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 shrink-0 ml-1">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={cn(
          "flex-1 flex flex-col",
          showContacts && "hidden sm:flex"
        )}>
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowContacts(true)}
                className="sm:hidden p-1.5 text-slate-500 hover:text-slate-700 rounded-lg"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{selectedContact.name}</h4>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">{selectedContact.class} · {selectedContact.online ? "Online" : "Offline"}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Phone size={16} /></button>
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Video size={16} /></button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"><MoreVertical size={16} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex", msg.sender === "teacher" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed",
                  msg.sender === "teacher"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-sm"
                )}>
                  <p>{msg.text}</p>
                  <span className={cn("text-[9px] mt-1 block text-right", msg.sender === "teacher" ? "text-blue-200" : "text-slate-400 dark:text-slate-500")}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors"><Paperclip size={16} /></button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors"><Image size={16} /></button>
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                onKeyDown={e => { if (e.key === "Enter") setMessageInput(""); }}
              />
              <button className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm active:scale-95"><Send size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
