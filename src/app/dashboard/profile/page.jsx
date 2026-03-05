"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, User, Wallet, Copy } from "lucide-react";
import { useToast } from "@/context/toastContext";
import { useUser } from "@/context/userContext";
import StatusModal from "@/components/statusModal";
import LoadingModal from "@/components/loadingModal";

const initialForm = {
  // fullName: "",
  // phoneNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
};

const formatMoney = (value) =>
  Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function UserProfile() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(initialForm);
  const { setUser } = useUser();
  const [modal, setModal] = useState({
    open: false,
    type: "pending",
    title: "",
    message: "",
  });

  // FETCH USER PROFILE
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(
          `/api/users/me`,
          {
            credentials: "include",
            cache: "no-store",
          },
        );

        const result = await res.json();
        if (!res.ok)
          throw new Error(result?.message || "Failed to load profile");

        const data = result.data;
        setUser(data);
        setProfile(data);
        setForm({
          // fullName: data.fullName || "",
          // phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
        });
      } catch (err) {
        showToast({ message: err.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [showToast]);

  // HANDLE FORM UPDATE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE PROFILE
  const handleSave = async () => {
    try {
      setSaving(true);
      setModal({
        open: true,
        type: "pending",
        title: "Updating Profile",
        message: "Please wait...",
      });
      const res = await fetch(
        `/api/users/me`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Update failed");
      setModal({
        open: true,
        type: "success",
        title: "Profile Updated",
        message: "Your profile was updated successfully.",
      });
    } catch {
      setModal({
        open: true,
        type: "error",
        title: "Update Failed",
        message: "Something went wrong. Try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <LoadingModal open={loading} message="Fetching your profile details..." />
    );
  }

  const handleCopy = () => {
    showToast({ message: "copied", type: "success" });
    navigator.clipboard.writeText(referralLink);
  };
  const referralLink = `https://growvia.com/register?ref=${profile.referralCode}`;
  return (
    <div className=" px-4 max-w-7xl mx-auto space-y-10">
      <StatusModal
        {...modal}
        onClose={() => setModal({ ...modal, open: false })}
      />
      {/* TOP PROFILE CARD */}
      <section className="bg-gradient-to-br from-grad-via to-grad-to rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-20 h-20 rounded-full bg-border-color flex items-center justify-center">
              <User className="text-icon w-10 h-10" />
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${profile.accountStatus === "active"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
                }`}
            >
              {profile.accountStatus === "active" ? "online" : ""}
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-text">{profile.fullName}</h1>
            <div className="flex items-center gap-2 text-sm">
              {profile.emailVerified ? (
                <CheckCircle className="text-green-500 w-4 h-4" />
              ) : (
                <XCircle className="text-red-500 w-4 h-4" />
              )}
              <span className="text-text">{profile.email}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center items-center">
          <Link href="/dashboard/withdraw">
            <button className="px-5 py-3 bg-primary hover:bg-hover active:scale-95 transition-all duration-300 shadow-md shadow-primary/20 text-white rounded-xl flex justify-center items-center gap-2">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
              <span>Withdraw</span>
            </button>
          </Link>
          <Link href="/dashboard/deposit">
            <button className="px-5 py-3 bg-primary hover:bg-hover active:scale-95 transition-all duration-300 shadow-md shadow-primary/20 text-white rounded-xl flex justify-center items-center gap-2">
              <i className="fa-solid fa-download"></i> <span>Fund</span>
            </button>
          </Link>
        </div>
      </section>

      {/* STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            label: "Account Balance",
            value: `${profile.accountBalance}`,
          },
          {
            label: "Available Earnings",
            value: `${profile.availableProfit}`,
          },
          {
            label: "Total Earnings",
            value: `${profile.totalProfit}`,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-grad-via to-grad-to rounded-2xl p-5 border border-border-color shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-text">{item.label}</p>
            <h2 className="text-2xl font-bold text-text">
              ${formatMoney(item.value)}
            </h2>
          </div>
        ))}
      </section>

      {/* EDITABLE PROFILE FORM */}
      <section className="bg-gradient-to-br from-grad-via to-grad-to rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-text mb-6">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.keys(form).map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-sm text-text capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl bg-surface border border-border-color focus:ring-2 focus:ring-primary/40 outline-none transition text-text"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-primary hover:bg-hover active:scale-95 transition-all duration-300 shadow-md shadow-primary/20 text-white rounded-xl"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>
      <section className="bg-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-3">
          Refer us and earn $10 per referral
        </h2>

        <div className="flex items-center justify-between bg-card px-4 py-3 rounded-xl border border-border-color">
          <span className="text-sm text-text">{referralLink}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-icon"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
        <div className="text-text">referrals: {profile.referralCount}</div>
      </section>
    </div>
  );
}
