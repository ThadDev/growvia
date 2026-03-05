"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import { useToast } from "@/context/toastContext";

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();



  /* ================= PROFESSIONAL STATUS MACHINE ================= */
  const STATUS = {
    VERIFYING: "verifying",
    SUCCESS: "success",
    FAILED: "failed",
    RESENDING: "resending",
    SENT: "sent",
  };

  const [status, setStatus] = useState(STATUS.VERIFYING);
  const [email, setEmail] = useState("");

  /* ================= VERIFY TOKEN ================= */
  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus(STATUS.FAILED);
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();

        if (data?.error || data?.status === "error") {
          throw new Error(data.message);
        }

        setStatus(STATUS.SUCCESS);

        showToast({
          message: "Email verified successfully!",
          type: "success",
        });

        setTimeout(() => router.push("/login"), 3000);
      } catch {
        setStatus(STATUS.FAILED);
      }
    };

    verify();
  }, [searchParams, router, showToast]);

  /* ================= REQUEST NEW VERIFICATION ================= */
  const handleRequestOtp = async () => {
    if (!email) {
      return showToast({
        message: "Enter your email",
        type: "warning",
      });
    }

    try {
      setStatus(STATUS.RESENDING);

      const res = await fetch(`/api/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus(STATUS.SENT);

      showToast({
        message: "Verification email sent!",
        type: "success",
      });
    } catch (err) {
      setStatus(STATUS.FAILED);

      showToast({
        message: err.message || "Failed to send verification",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grad-from to-grad-via p-4">
      <div className="bg-card text-text w-full max-w-md rounded-2xl shadow-xl p-8 text-center">

        {/* ================= VERIFYING ================= */}
        {status === STATUS.VERIFYING && (
          <>
            <Icon icon="line-md:loading-loop" className="text-primary text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
          </>
        )}

        {/* ================= SUCCESS ================= */}
        {status === STATUS.SUCCESS && (
          <>
            <Icon icon="mdi:check-circle" className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Email Verified </h2>
            <p className="text-sm text-gray-500 mb-6">
              Redirecting to login...
            </p>

            <button
              onClick={() => router.push("/login")}
              className="w-full bg-primary text-white py-3 rounded-xl"
            >
              Go to Login
            </button>
          </>
        )}

        {/* ================= FAILED ================= */}
        {status === STATUS.FAILED && (
          <>
            <Icon icon="mdi:email-alert" className="text-red-500 text-6xl mx-auto mb-4" />

            <h2 className="text-2xl font-semibold mb-2">
              Verification Failed
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              The link expired. Enter your email to receive a new verification link.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-4"
            />

            <button
              onClick={handleRequestOtp}
              className="w-full bg-primary text-white py-3 rounded-xl"
            >
              Resend Verification
            </button>
          </>
        )}

        {/* ================= RESENDING ================= */}
        {status === STATUS.RESENDING && (
          <>
            <Icon icon="line-md:loading-loop" className="text-primary text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold">
              Sending verification email...
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait...
            </p>
          </>
        )}

        {/* ================= SENT ================= */}
        {status === STATUS.SENT && (
          <>
            <Icon icon="mdi:email-check" className="text-green-500 text-6xl mx-auto mb-4" />

            <h2 className="text-2xl font-semibold mb-2">
              Verification Link Sent
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Check your inbox or spam folder and click the verification link.
            </p>

            <button
              onClick={() => router.push("/login")}
              className="w-full bg-primary text-white py-3 rounded-xl"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

