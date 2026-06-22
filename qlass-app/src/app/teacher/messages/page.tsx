"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Send, Paperclip } from "lucide-react";

const contacts = [
  { id: "1", name: "Admin Office", initials: "AO", color: "bg-blue-500", lastMsg: "Please submit the monthly report", time: "2h ago", unread: 1 },
  { id: "2", name: "Prof. Rajesh Sharma", initials: "RS", color: "bg-violet-500", lastMsg: "Can you cover my 9A class tomorrow?", time: "4h ago", unread: 0 },
  { id: "3", name: "Dr. Kavita Singh", initials: "KS", color: "bg-emerald-500", lastMsg: "Chemistry lab schedule updated", time: "1d ago", unread: 0 },
  { id: "4", name: "Parent - Mr. Sharma", initials: "PS", color: "bg-amber-500", lastMsg: "Thank you for the update on Aarav", time: "2d ago", unread: 0 },
];

const messages = [
  { id: "1", from: "them", text: "Hi, can you share the syllabus progress for Class 10A?", time: "10:30 AM" },
  { id: "2", from: "me", text: "Sure! We've covered 78% of the Physics syllabus. Chapters 1-8 are done.", time: "10:35 AM" },
  { id: "3", from: "them", text: "Great. Please submit the monthly report by June 25.", time: "10:38 AM" },
  { id: "4", from: "me", text: "Will do. I'll have it ready by tomorrow.", time: "10:40 AM" },
  { id: "5", from: "them", text: "Also, please prepare the mid-term question paper for Physics.", time: "11:00 AM" },
];

export default function TeacherMessagesPage() {
  const [selected, setSelected] = useState("1");
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden h-[calc(100vh-120px)] flex">
      {/* Contacts */}
      <div className="w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Messages</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id)}
              className={cn("w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-slate-50 dark:border-slate-800",
                selected === c.id ? "bg-violet-50 dark:bg-violet-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0", c.color)}>{c.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-white truncate">{c.name}</span>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{c.lastMsg}</p>
              </div>
              {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{contacts.find(c => c.id === selected)?.name}</h4>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => (
            <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[70%] p-3 rounded-2xl text-sm",
                m.from === "me" ? "bg-violet-600 text-white rounded-br-md" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
              )}>
                <p>{m.text}</p>
                <span className={cn("text-[10px] mt-1 block", m.from === "me" ? "text-violet-200" : "text-slate-400")}>{m.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"><Paperclip className="w-4 h-4" /></button>
            <input type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..."
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20" />
            <button className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
