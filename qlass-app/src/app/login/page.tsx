"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authenticateUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!identifier.trim()) {
      setError("Email or mobile number is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    const result = await authenticateUser(identifier, password);
    setIsLoading(false);

    if (result.success && result.user) {
      setSuccess("Login successful! Redirecting...");
      login(result.user);
      setTimeout(() => {
        router.push(result.redirectPath || "/admin/dashboard");
      }, 800);
    } else {
      setError(result.error || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT: Illustration */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-gradient-to-br from-[#081C45] via-[#0F2D6E] to-[#1A3F8F] flex-col items-center justify-center p-12">
        {/* Floating shapes */}
        <div className="absolute top-[10%] left-[5%] w-48 h-48 bg-white/[0.06] rounded-3xl rotate-12 animate-[float1_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[15%] right-[8%] w-64 h-64 bg-white/[0.04] rounded-full animate-[float2_8s_ease-in-out_infinite]" />
        <div className="absolute top-[45%] left-[60%] w-32 h-32 bg-[#2563EB]/20 rounded-2xl -rotate-12 animate-[float3_7s_ease-in-out_infinite]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center max-w-lg"
        >
          {/* SVG Illustration */}
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none" className="mx-auto mb-8 opacity-90">
            <rect x="60" y="20" width="200" height="110" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
            <rect x="80" y="40" width="70" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
            <rect x="80" y="56" width="50" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
            <rect x="80" y="70" width="60" height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
            <rect x="170" y="38" width="72" height="52" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            <rect x="182" y="72" width="8" height="14" rx="2" fill="rgba(37,99,235,0.5)"/>
            <rect x="196" y="62" width="8" height="24" rx="2" fill="rgba(34,197,94,0.5)"/>
            <rect x="210" y="55" width="8" height="31" rx="2" fill="rgba(139,92,246,0.5)"/>
            <rect x="224" y="65" width="8" height="21" rx="2" fill="rgba(245,158,11,0.5)"/>
            <circle cx="40" cy="160" r="16" fill="rgba(139,92,246,0.3)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <circle cx="40" cy="155" r="6" fill="rgba(255,255,255,0.3)"/>
            <circle cx="120" cy="170" r="12" fill="rgba(37,99,235,0.25)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <circle cx="160" cy="175" r="12" fill="rgba(34,197,94,0.25)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <circle cx="200" cy="168" r="12" fill="rgba(245,158,11,0.25)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
            <circle cx="240" cy="172" r="12" fill="rgba(239,68,68,0.2)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          </svg>

          <h2 className="text-3xl font-bold text-white mb-4 leading-tight tracking-tight">
            Empowering Education<br />with Smart Analytics
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10">
            Manage classes, track student performance, and drive academic excellence with data-driven insights.
          </p>

          {/* Stats */}
          <div className="flex gap-4 justify-center">
            {[
              { value: "12K+", label: "Students" },
              { value: "450+", label: "Teachers" },
              { value: "98%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <style jsx>{`
          @keyframes float1 { 0%, 100% { transform: rotate(12deg) translateY(0); } 50% { transform: rotate(12deg) translateY(-20px); } }
          @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
          @keyframes float3 { 0%, 100% { transform: rotate(-12deg) translateY(0); } 50% { transform: rotate(-12deg) translateY(-15px); } }
        `}</style>
      </div>

      {/* RIGHT: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-white dark:bg-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-[#2563EB] flex items-center justify-center">
              <span className="text-white font-extrabold text-lg">Q</span>
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Qlass</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Sign in to your account to continue</p>

          {/* Alerts */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Mobile */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email or Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
                  placeholder="admin@qlass.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Demo Credentials</span>
            </div>
            <div className="space-y-2">
              {[
                { role: "Admin", email: "admin@qlass.com", pass: "Admin@123" },
                { role: "Teacher", email: "priya.sharma@qlass.com", pass: "Teacher@123" },
                { role: "Student", email: "aarav.sharma@student.qlass.com", pass: "Student@123" },
              ].map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => { setIdentifier(cred.email); setPassword(cred.pass); setError(""); }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors text-left group"
                >
                  <div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-white">{cred.role}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">{cred.email}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don&apos;t have an account? <button className="text-blue-600 hover:text-blue-700 font-semibold">Create account</button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
