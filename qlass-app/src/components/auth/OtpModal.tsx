"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Loader2 } from "lucide-react";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "email" | "sms";
}

export function OtpModal({ isOpen, onClose, mode }: OtpModalProps) {
  const [step, setStep] = useState<"input" | "verify">("input");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const label = mode === "email" ? "Email Address" : "Mobile Number";
  const placeholder = mode === "email" ? "admin@qlass.com" : "+91 98765 43210";
  const Icon = mode === "email" ? Mail : Phone;

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep("input");
      setContact("");
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setCountdown(0);
    }
  }, [isOpen]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!contact.trim()) {
      setError(`Please enter your ${mode === "email" ? "email address" : "mobile number"}`);
      return;
    }
    setIsLoading(true);
    setError("");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setStep("verify");
    setCountdown(60);
    // Auto-focus first OTP input
    setTimeout(() => inputRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }, [otp]);

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }
    setIsLoading(true);
    setError("");
    // Simulate API verification
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    // In production, call your verify-otp API here
    // For now, simulate success
    setError("OTP verification is not connected to a backend yet. Please use email/password login.");
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setCountdown(60);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 relative">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {mode === "email" ? "Email OTP" : "SMS OTP"}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {step === "input"
                      ? `Enter your ${mode === "email" ? "email" : "mobile number"} to receive a code`
                      : `We sent a 6-digit code to ${contact}`}
                  </p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                {step === "input" ? (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                      <input
                        type={mode === "email" ? "email" : "tel"}
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                          setError("");
                        }}
                        placeholder={placeholder}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        autoFocus
                        onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      />
                    </div>
                    <button
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="w-full mt-4 py-3 rounded-xl bg-[#2F63FF] hover:bg-[#10265C] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(47,99,255,0.39)]"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send OTP"}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="verify"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {/* OTP Inputs */}
                    <div className="flex gap-3 justify-center mb-6" onPaste={handleOtpPaste}>
                      {otp.map((digit, i) => (
                        <input
                          key={i}
                          ref={(el) => { inputRefs.current[i] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleVerify}
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-[#2F63FF] hover:bg-[#10265C] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(47,99,255,0.39)]"
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify OTP"}
                    </button>

                    {/* Resend */}
                    <div className="mt-4 text-center">
                      {countdown > 0 ? (
                        <p className="text-sm text-slate-500">
                          Resend code in <span className="font-semibold text-blue-600">{countdown}s</span>
                        </p>
                      ) : (
                        <button
                          onClick={handleResend}
                          disabled={isLoading}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          Resend code
                        </button>
                      )}
                    </div>

                    {/* Back */}
                    <button
                      onClick={() => setStep("input")}
                      className="w-full mt-3 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                    >
                      ← Change {mode === "email" ? "email" : "number"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
