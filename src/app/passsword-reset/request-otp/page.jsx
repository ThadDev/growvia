"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import AuthHeader from "@/components/AuthHeader";
import StatusModal from "@/components/statusModal";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();
  const [modal, setModal] = useState({
    open: false,
    type: "pending",
    title: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast({ message: "Email is required", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setModal({
        open: true,
        type: "pending",
        title: "requesting OTP",
        message: "sending OTP to email",
      });

      const res = await fetch(
        `/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) {
        setModal({
          open: true,
          type: "error",
          title: "OTP not sent",
          message: "enter email again to send",
        });
        return;
      }
      setModal({
        open: true,
        type: "success",
        title: "OTP sent",
        message: "check email for OTP",
      });
      router.push(`/passsword-reset/verify-otp?email=${encodeURIComponent(email)}`);
    } catch {
      showToast({ message: "Network error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grad-from via-grad-via to-grad-to px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <StatusModal
        {...modal}
        onClose={() => setModal({ ...modal, open: false })}
      />
      <AuthHeader />

      <div className="w-full max-w-md bg-card text-text rounded-3xl shadow-2xl shadow-primary/5 border border-border-color/50 p-8 sm:p-10 relative z-10 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-text">Account Recovery</h1>
            <p className="text-sm text-text/60">Enter your credentials to receive a security code.</p>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-text/50 uppercase tracking-widest ml-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-2xl bg-surface/50 border border-border-color px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all duration-300 placeholder:text-text/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-primary text-white py-4 font-bold text-sm shadow-xl shadow-primary/20 hover:bg-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Generating Code..." : "Request Recovery Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
