"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, User, Phone, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerSchema, RegisterFormData } from "@/schemas/auth.schema";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "./Logo";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerAction, isLoading, error, success } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      institutionName: "",
      password: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerAction(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[500px] bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="flex justify-between items-start mb-8">
        <Logo />
        <Link href="/login" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors mt-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m15 18-6-6 6-6"/></svg>
          Back to login
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create your account</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Join Qlass to manage your institution.</p>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register("firstName")}
                type="text"
                placeholder="John"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.firstName ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-[#2F63FF]/20 focus:border-[#2F63FF]"
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                {...register("lastName")}
                type="text"
                placeholder="Doe"
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.lastName ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-[#2F63FF]/20 focus:border-[#2F63FF]"
                } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.lastName && <p className="mt-1.5 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
            <input
              {...register("email")}
              type="email"
              placeholder="kajal@gmail.com"
              className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                errors.email ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-[#2F63FF]/20 focus:border-[#2F63FF]"
              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
            <input
              {...register("mobile")}
              type="tel"
              placeholder="+91 98765 43210"
              className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                errors.mobile ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-[#2F63FF]/20 focus:border-[#2F63FF]"
              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.mobile && <p className="mt-1.5 text-xs text-red-500">{errors.mobile.message}</p>}
        </div>

        {/* Institution Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Institution Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
            <input
              {...register("institutionName")}
              type="text"
              placeholder="Delhi Public School"
              className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                errors.institutionName ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-[#2F63FF]/20 focus:border-[#2F63FF]"
              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.institutionName && <p className="mt-1.5 text-xs text-red-500">{errors.institutionName.message}</p>}
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
                errors.password ? "border-red-300 focus:ring-red-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-[#2F63FF]/20 focus:border-[#2F63FF]"
              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer mt-2">
            <input
              {...register("agreeTerms")}
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#2F63FF] focus:ring-[#2F63FF]"
            />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              I agree to the <Link href="#" className="text-[#2F63FF] hover:underline font-medium">Terms of Service</Link> and <Link href="#" className="text-[#2F63FF] hover:underline font-medium">Privacy Policy</Link>
            </span>
          </label>
          {errors.agreeTerms && <p className="mt-1.5 text-xs text-red-500">{errors.agreeTerms.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 mt-4 rounded-xl bg-[#2F63FF] hover:bg-[#10265C] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(47,99,255,0.39)] hover:shadow-[0_6px_20px_rgba(47,99,255,0.23)]"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-[#2F63FF] hover:text-[#10265C] font-semibold transition-colors">
          Sign In
        </Link>
      </p>
    </motion.div>
  );
}
