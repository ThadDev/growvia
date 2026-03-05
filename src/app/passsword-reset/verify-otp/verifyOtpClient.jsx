"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/context/toastContext";
import AuthHeader from "@/components/AuthHeader";

const OTP_LENGTH = 4;

/* ================= OTP INPUT ================= */
function OTPInput({ value, onChange, success = false, loading = false }) {
  const inputsRef = useRef([]);

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, "");
    const newValue = value.split("");

    newValue[i] = val;
    onChange(newValue.join(""));

    if (val && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key !== "Backspace") return;

    e.preventDefault();
    const newValue = value.split("");

    if (newValue[i]) {
      newValue[i] = "";
    } else if (i > 0) {
      newValue[i - 1] = "";
      inputsRef.current[i - 1]?.focus();
    }

    onChange(newValue.join(""));
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="flex gap-4 justify-center">
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          maxLength={1}
          value={value[i] || ""}
          disabled={loading}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`w-14 h-15 text-center text-2xl font-bold rounded-2xl border transition-all duration-300
            ${success
              ? "border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              : "border-border-color bg-surface/50 text-text active:scale-95"}
            ${loading ? "animate-pulse border-primary/50" : ""}
            focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary focus:bg-surface`}
        />
      ))}
    </div>
  );
}

/* ================= PAGE ================= */
export default function VerifyOtpClient() {
  const params = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();

  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    if (otp.length === OTP_LENGTH && !loading && !success) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );

      if (!res.ok) throw new Error();

      setSuccess(true);
      setTimeout(() => {
        router.push(
          `/passsword-reset/reset-password?email=${encodeURIComponent(email)}`,
        );
      }, 800);
    } catch {
      showToast({ message: "Invalid OTP", type: "error" });
      setShowResend(true);
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    await fetch(`/api/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    showToast({ message: "OTP resent", type: "success" });
    setOtp("");
    setShowResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grad-from via-grad-via to-grad-to px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-hover/5 rounded-full blur-[120px] pointer-events-none" />

      <AuthHeader />

      <div className="w-full max-w-md bg-card text-text rounded-3xl shadow-2xl shadow-primary/5 border border-border-color/50 p-8 sm:p-10 relative z-10 backdrop-blur-sm text-center">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Security Check</h1>
            <p className="text-sm text-text/60 leading-relaxed px-4">
              A {OTP_LENGTH}-digit operational code was dispatched to <span className="text-text font-bold block mt-1">{email}</span>
            </p>
          </div>

          <div className="py-4">
            <OTPInput
              value={otp}
              onChange={setOtp}
              success={success}
              loading={loading}
            />
          </div>

          <div className="pt-4 space-y-4">
            {showResend ? (
              <button
                onClick={resendOtp}
                className="w-full py-4 rounded-2xl bg-surface border border-border-color text-sm font-bold hover:bg-card hover:border-primary/30 transition-all duration-300"
              >
                Request Fresh Code
              </button>
            ) : (
              <p className="text-xs text-text/40 font-medium uppercase tracking-[0.2em]">
                {success ? "Identity Confirmed" : "Awaiting Credentials"}
              </p>
            )}

            <button
              onClick={() => router.push("/login")}
              className="text-text/40 text-xs font-bold hover:text-primary transition-colors block mx-auto pt-2"
            >
              Cancel and return to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
