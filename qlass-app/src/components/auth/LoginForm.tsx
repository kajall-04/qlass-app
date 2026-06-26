"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loginSchema, LoginFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "./Logo";
import { OtpModal } from "./OtpModal";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [otpMode, setOtpMode] = useState<"email" | "sms" | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, isLoading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <Logo />

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email or Mobile */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email or Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input
                {...register("identifier")}
                type="text"
                placeholder="admin@qlass.com"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                  errors.identifier ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
                autoComplete="email"
              />
            </div>
            {errors.identifier && (
              <p className="mt-1.5 text-xs text-red-500">{errors.identifier.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                  errors.password ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500"
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register("rememberMe")}
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-[#2F63FF] focus:ring-[#2F63FF]"
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-[#2F63FF] hover:text-[#10265C] font-medium transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 mt-2 rounded-xl bg-[#2F63FF] hover:bg-[#10265C] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(47,99,255,0.39)] hover:shadow-[0_6px_20px_rgba(47,99,255,0.23)]"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </form>

        {/* Social / Alternative Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => setOtpMode("email")}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Sign in using Email OTP
            </button>
            <button
              type="button"
              onClick={() => setOtpMode("sms")}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Sign in using SMS OTP
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#2F63FF] hover:text-[#10265C] font-semibold transition-colors">
            Create account
          </Link>
        </p>
      </motion.div>

      {/* Modals */}
      <OtpModal
        isOpen={otpMode !== null}
        onClose={() => setOtpMode(null)}
        mode={otpMode || "email"}
      />
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}
