"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/context/toastContext";
import ThemeToggle from "@/components/themeToggle";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();

  // input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form validation
  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      showToast({ message: "All fields are required", type: "error" });
      return false;
    }

    if (password.length < 8) {
      showToast({
        message: "Password must be at least 8 characters",
        type: "error",
      });
      return false;
    }

    // if (!recaptchaValue) {
    //   showToast({
    //     message: "Please complete the CAPTCHA verification",
    //     type: "error",
    //   });
    //   return false;
    // }

    return true;
  };

  // form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `api/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
            keepMeLoggedIn: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showToast({
          message: data.message || "Login failed",
          type: "error",
        });
        return;
      }

      showToast({
        message: "Welcome Back",
        type: "success",
      });
      window.location.href = "/dashboard"


      // window.location.href = "/dashboard";
    } catch (error) {
      showToast({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grad-from via-grad-via to-grad-to px-4">
      <div className="fixed top-2 right-2">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md bg-card text-text rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center flex flex-col justify-center items-center mb-8">
          <h1 className="text-3xl flex justify-center items-center font-bold tracking-tight">
            <span>
              <img src="./logo.png" className="w-[60px] mb-2" alt="" />
            </span>
            <span>Growvia</span>
          </h1>
          <p className="text-text mt-2">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Email address
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
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                required
                className="w-full rounded-xl bg-surface border border-border-color px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-text hover:text-hover cursor-pointer transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* forgotten password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-text ">
              <input
                type="checkbox"
                className="accent-primary text-text cursor-pointer"
              />
              Remember me
            </label>
            <Link
              href="/passsword-reset/request-otp"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary hover:bg-hover transition py-3 cursor-pointer font-semibold text-sm shadow-lg"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-text-muted mt-8">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
