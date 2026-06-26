"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatCard } from "./StatCard";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* LEFT: Illustration */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[60%] relative overflow-hidden bg-gradient-to-br from-[#10265C] to-[#2F63FF] flex-col items-center justify-center p-12">
        {/* Floating shapes */}
        <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-white/[0.06] rounded-3xl rotate-12 animate-[float1_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[15%] right-[8%] w-64 h-64 bg-white/[0.04] rounded-full animate-[float2_8s_ease-in-out_infinite]" />
        <div className="absolute top-[45%] left-[60%] w-32 h-32 bg-white/[0.08] rounded-2xl -rotate-12 animate-[float3_7s_ease-in-out_infinite]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center max-w-lg"
        >
          {/* SVG Illustration - Minimal SaaS Style */}
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none" className="mx-auto mb-8 opacity-90">
            <rect x="60" y="20" width="200" height="110" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
            <rect x="80" y="40" width="70" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
            <rect x="80" y="56" width="50" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
            <rect x="80" y="70" width="60" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
            <rect x="170" y="38" width="72" height="52" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            <rect x="182" y="72" width="8" height="14" rx="2" fill="rgba(255,255,255,0.8)"/>
            <rect x="196" y="62" width="8" height="24" rx="2" fill="rgba(255,255,255,0.6)"/>
            <rect x="210" y="55" width="8" height="31" rx="2" fill="rgba(255,255,255,0.4)"/>
            <rect x="224" y="65" width="8" height="21" rx="2" fill="rgba(255,255,255,0.7)"/>
            <circle cx="40" cy="160" r="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <circle cx="40" cy="155" r="6" fill="rgba(255,255,255,0.3)"/>
            <circle cx="120" cy="170" r="12" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <circle cx="160" cy="175" r="12" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <circle cx="200" cy="168" r="12" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <circle cx="240" cy="172" r="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          </svg>

          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
            Empowering Education<br />with Smart Analytics
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            Manage classes, track student performance, and drive academic excellence with data-driven insights.
          </p>

          {/* Stats */}
          <div className="flex gap-4 justify-center">
            <StatCard value="12K+" label="Students" />
            <StatCard value="450+" label="Teachers" />
            <StatCard value="98%" label="Uptime" />
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes float1 { 0%, 100% { transform: rotate(12deg) translateY(0); } 50% { transform: rotate(12deg) translateY(-20px); } }
          @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
          @keyframes float3 { 0%, 100% { transform: rotate(-12deg) translateY(0); } 50% { transform: rotate(-12deg) translateY(-15px); } }
        `}</style>
      </div>

      {/* RIGHT: Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-gray-50 dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}
