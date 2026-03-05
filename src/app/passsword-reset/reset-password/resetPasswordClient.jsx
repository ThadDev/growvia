"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/context/toastContext";
import { usePasswordValidation } from "@/components/passwordValidation";
import PasswordRequirements from "@/components/passwordReqirement";
import AuthHeader from "@/components/AuthHeader";

export default function ResetPasswordClient() {
  const email = useSearchParams().get("email");
  const router = useRouter();
  const { showToast } = useToast();
  const { validatePassword } = usePasswordValidation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!validatePassword(password, confirmPassword, showToast)) return;

    try {
      setLoading(true);

      const res = await fetch(
        `/api/auth/reset-password`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
        },
      );

      if (!res.ok) {
        showToast({ message: "Reset failed", type: "error" });
        return;
      }

      showToast({ message: "Password reset successful", type: "success" });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grad-from via-grad-via to-grad-to px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <AuthHeader />
      <div className="w-full max-w-md bg-card text-text rounded-3xl shadow-2xl shadow-primary/5 border border-border-color/50 p-8 sm:p-10 relative z-10 backdrop-blur-sm">
        <form
          onSubmit={handleReset}
          className="bg-card text-text space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-text">Establish New Key</h1>
            <p className="text-sm text-text/60 leading-relaxed">Update your cryptographic credentials for continued secure access.</p>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text/50 uppercase tracking-widest ml-1">
              New Security Key
            </label>
            <div className="relative group">
              <input
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl bg-surface/50 border border-border-color px-5 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-text/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-text/40 hover:text-primary transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <PasswordRequirements password={password} />
          </div>

          {/* comfirm password */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-text/50 uppercase tracking-widest ml-1">
              Confirm Security Key
            </label>
            <div className="relative group">
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirm(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full rounded-2xl bg-surface/50 border border-border-color px-5 py-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-text/30"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-text/40 hover:text-primary transition-colors duration-200"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-primary text-white py-4 font-bold text-sm shadow-xl shadow-primary/20 hover:bg-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:translate-y-0 disabled:shadow-none"
          >
            {loading ? "Synchronizing Credentials..." : "Reset Security Key"}
          </button>
        </form>
      </div>
    </div>
  );
}
