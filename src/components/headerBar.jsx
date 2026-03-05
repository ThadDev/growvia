"use client";

import Link from "next/link";
import { useEffect } from "react";
import ThemeToggle from "./themeToggle";
import { useUser, useKyc } from "@/context/userContext";
import { useToast } from "@/context/toastContext";

const Header = ({ onMenuClick, isOpen }) => {
  const { user, setUser } = useUser();
  const { showToast } = useToast();
  const { setKyc } = useKyc();

  const loadKyc = async () => {
    try {
      const res = await fetch(
        `/api/users/kyc`,
        {
          credentials: "include",
          cache: "no-store",
        },
      );

      const result = await res.json();

      // if (!res.ok)
      //   throw new Error(result?.message || "Failed to load investments");

      const data = result.data;
      const status = data.status;
      setKyc(status);
      console.log(data.status);
    } catch (err) {
      showToast({ message: err.message, type: "error" });
    }
  };

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
        if (!res.ok) throw new Error(result?.message);

        setUser(result.data);
      } catch (err) {
        showToast({ message: err.message, type: "error" });
      }
    };
    loadKyc();
    loadProfile();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 w-full h-16 bg-gradient-to-br from-grad-via to-grad-to px-4 md:px-6 shadow-sm">
      <div className="flex h-full items-center justify-between">
        {/* ================= LEFT ================= */}
        {/* Desktop Logo */}
        <div className="hidden md:flex items-center gap-2">
          <img src="/logo.png" alt="Growvia" className="w-10" />
          <span className="font-bold text-text">Growvia</span>
        </div>

        {/* Mobile Profile */}
        <Link
          href="/dashboard/profile"
          className="flex md:hidden items-center gap-3"
        >
          <div className="relative">
            <i className="fa-solid fa-circle-user text-3xl text-icon"></i>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          {user?.fullName && (
            <span className="text-sm font-semibold text-text truncate max-w-[120px]">
              {user.fullName}
            </span>
          )}
        </Link>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-6">
          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard/kyc" className="flex flex-col items-center">
              <i className="fa-solid fa-id-card-clip text-2xl text-icon"></i>
              <span className="text-[10px] font-bold text-text">KYC</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex flex-col items-center"
            >
              <i className="fa-solid fa-sliders text-2xl text-icon"></i>
              <span className="text-[10px] font-bold text-text">Settings</span>
            </Link>

            <div className="flex flex-col items-center">
              <ThemeToggle />
              <span className="text-[10px] font-bold text-text">Theme</span>
            </div>

            <Link href="/dashboard/profile" className="flex items-center gap-3">
              <div className="relative">
                <i className="fa-solid fa-circle-user text-3xl text-icon"></i>
                {user?.fullName && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>}
              </div>

              {user?.fullName && (
                <span className="text-lg font-semibold text-text">
                  {user.fullName}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE ONLY */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          <button
            onClick={onMenuClick}
            className="md:hidden text-2xl text-text transition-transform"
            aria-label="Toggle menu"
          >
            <i
              className={`fa-solid ${
                isOpen ? "fa-xmark rotate-90" : "fa-bars-staggered"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
