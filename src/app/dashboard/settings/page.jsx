"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toastContext";
import StatusModal from "@/components/statusModal";
import { usePasswordValidation } from "@/components/passwordValidation";
import PasswordRequirements from "@/components/passwordReqirement";

const CHANGE_PASSWORD_URL =
  `/api/users/change-password`;

export default function SettingsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { validatePassword } = usePasswordValidation();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [modal, setModal] = useState({
    open: false,
    type: "pending",
    title: "",
    message: "",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (key) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword) {
      showToast({ message: "Current password is required", type: "info" });
      return;
    }

    if (!validatePassword(newPassword, confirmPassword, showToast)) return;

    setLoading(true);
    setModal({
      open: true,
      type: "pending",
      title: "Updating password",
      message: "Please wait while we secure your account...",
    });

    try {
      const res = await fetch(CHANGE_PASSWORD_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Password update failed");
      } else {
        setModal({
          open: true,
          type: "success",
          title: "Password Updated",
          message: "Your password has been changed successfully.",
        });
      }
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setModal({
        open: true,
        type: "error",
        title: "Update Failed",
        message: err.message || "Unable to update password",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORGOT PASSWORD ================= */

  const handleForgotPassword = () => {
    setModal({
      open: true,
      type: "warning",
      title: "Leave Dashboard?",
      message:
        "Password recovery will move you out of the dashboard. Do you want to continue?",
      onConfirm: () => router.push("/password-reset/verify-email"),
    });
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-br from-grad-from to-grad-to p-6">
      <StatusModal
        {...modal}
        onClose={() => setModal({ ...modal, open: false })}
      />

      <div className="max-w-xl mx-auto mt-10 bg-card rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary">
            <ShieldCheck className="text-hover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text">Security Settings</h1>
            <p className="text-sm text-muted">
              Update your account password securely
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            visible={visibility.current}
            onToggle={() => toggleVisibility("current")}
            onChange={handleChange}
          />

          <PasswordInput
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            visible={visibility.new}
            onToggle={() => toggleVisibility("new")}
            onChange={handleChange}
          />

          <PasswordRequirements password={form.newPassword} />

          <PasswordInput
            label="Confirm New Password"
            name="confirmPassword"
            value={form.confirmPassword}
            visible={visibility.confirm}
            onToggle={() => toggleVisibility("confirm")}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-hover text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-muted hover:text-hover transition underline"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

const PasswordInput = ({ label, name, value, visible, onToggle, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-muted">{label}</label>
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-transparent border border-border-color rounded-lg px-4 py-2 pr-12 text-text focus:outline-none focus:ring-2 focus:ring-hover"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-3 flex items-center text-text hover:text-hover transition"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);
