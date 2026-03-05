"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import ThemeToggle from "@/components/themeToggle";
import { usePasswordValidation } from "@/components/passwordValidation";
import PasswordRequirements from "@/components/passwordReqirement";
import StatusModal from "@/components/statusModal";


export default function SignupPage() {


  const [modal, setModal] = useState({
    open: false,
    type: "pending",
    title: "",
    message: "",
  });
  // refferal code check


  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (ref) {
      localStorage.setItem("referralCode", ref);
    }
  }, []);


  const router = useRouter();
  const { showToast } = useToast();
  const { validatePassword } = usePasswordValidation();

  // Identity fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  // Password fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { fullName, email, phoneNumber } = formData;

    if (!fullName || !email || !phoneNumber) {
      showToast({ message: "All fields are required", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;
    if (!validatePassword(password, confirmPassword, showToast)) return;
    const referralCode = localStorage.getItem("referralCode");

    try {
      setLoading(true);
      setModal({
        open: true,
        type: "pending",
        title: "Processing...",
        message: "Please wait...",
      });

      const res = await fetch(
        `/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName.trim(),
            email: formData.email.toLowerCase().trim(),
            phoneNumber: formData.phoneNumber.trim(),
            password,
            referralCode,
          }),
        }
      );

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setModal({
        open: true,
        type: "success",
        title: "Account Created",
        message: "Check you email/spam folder to verify account",
      });


    } catch (error) {
      setModal({
        open: true,
        type: "error",
        title: "Try again",
        message: error.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-2 mb-2 justify-center bg-gradient-to-br from-grad-from via-grad-via to-grad-to px-4">
      <StatusModal
        {...modal}
        onClose={() => setModal({ ...modal, open: false })}
      />
      <div className="fixed top-2 right-3">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-card text-text mt-2 rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl flex justify-center items-center font-bold gap-2">
            <Image src="/logo.png" alt="Growvia" className="w-[50px]" width={50} height={50} />
            <span>Growvia</span>
          </h1>
          <p className="mt-2">Create your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              required
              placeholder="John Doe"
              className="w-full rounded-xl bg-surface border border-border-color px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="tel"
              required
              placeholder="+234 812 345 6789"
              className="w-full rounded-xl bg-surface border border-border-color px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl bg-surface border border-border-color px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-xl bg-surface border border-border-color px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-text hover:text-hover transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <PasswordRequirements password={password} />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full rounded-xl bg-surface border border-border-color px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-text hover:text-hover transition"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>



          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary hover:bg-hover transition py-3 font-semibold text-sm shadow-lg"
          >
            {loading ? "processing..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
