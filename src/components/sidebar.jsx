"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/context/toastContext";
import { useUser } from "@/context/userContext";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const [investOpen, setInvestOpen] = useState(false);
  const { showToast } = useToast();
  const [loggingOut, setloggingOut] = useState(null);
  const { setUser } = useUser();

  const handleLogout = async () => {
    setloggingOut(true);
    try {
      const res = await fetch(
        `/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Logout failed");
      }

      showToast({ message: "Logged out successfully", type: "success" });

      setUser(null);

      window.location.href = "/login";
    } catch (err) {
      showToast({
        message: err.message || "Failed to logout",
        type: "error",
      });
    }
    setloggingOut(false);
  };

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      data: "mdi:view-dashboard",
    },
    {
      name: "Investments",
      icon: "fa-solid fa-layer-group",
      href: "/dashboard/investments",
      // subLinks: [
      //   { name: "Crypto", href: "/dashboard/investments/crypto" },
      //   { name: "Trust Bond", href: "/dashboard/investments/trust-bond" },
      //   { name: "Real Estate", href: "/dashboard/investments/real-estate" },
      //   { name: "Loan", href: "/dashboard/investments/loan" },
      // ],
    },
    {
      name: "Fund account",
      href: "/dashboard/deposit",
      icon: "fa-solid fa-download",
    },
    {
      name: "Withdraw",
      href: "/dashboard/withdraw",
      icon: "fa-solid fa-arrow-up-from-bracket",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: "fa-solid fa-gear",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: "fa-solid fa-circle-user",
    },
    {
      name: "KYC",
      href: "/dashboard/kyc",
      icon: "fa-solid fa-id-card",
    },
    {
      name: "History",
      href: "/dashboard/history",
      icon: "fa-solid fa-clock-rotate-left",
    },
    {
      name: "Active Contracts",
      href: "/dashboard/active-plans",
      icon: "fa-solid fa-briefcase",
    },
  ];

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[15em]
          bg-gradient-to-br from-grad-via to-grad-to
          text-[var(--text-primary)] shadow-lg 
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 top-[4em]
          md:flex md:flex-col
        `}
      >
        {/* Mobile header */}
        <div className="flex hidden items-center justify-between px-4 py-4 md:hidden">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col w-full gap-2 px-3 mt-2 mb-[7em] overflow-y-auto sidebar-scroll">
          {links.map((link) => (
            <div key={link.name}>
              {link.subLinks ? (
                <button
                  onClick={() => setInvestOpen(!investOpen)}
                  className={`flex w-full items-center justify-between px-4 py-2 rounded-xl transition ${pathname.startsWith("/dashboard/investments")
                      ? "bg-surface shadow-sm border border-border-color"
                      : "hover:bg-surface hover:text-primary"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <i className={`${link.icon}`}></i>
                    {link.name}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-${investOpen ? "up" : "down"
                      } text-sm`}
                  ></i>
                </button>
              ) : (
                <Link href={link.href} onClick={onClose}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${pathname === link.href
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "hover:bg-surface hover:text-primary"
                      }`}
                  >
                    {link.data && <Icon icon={link.data} className="text-xl" />}
                    {link.icon && <i className={link.icon}></i>}
                    {link.name}
                  </div>
                </Link>
              )}

              {/* Sub-links */}
              {link.subLinks && investOpen && (
                <div className="ml-8 mt-1 flex flex-col gap-1">
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onClose}
                      className={`px-3 py-2 rounded-lg text-sm ${pathname === sub.href
                          ? "bg-primary text-white shadow-sm"
                          : "hover:bg-surface hover:text-primary"
                        }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}

        <button
          className="mt-auto px-4 py-3 w-full bg-surface border-t border-border-color hover:bg-hover hover:text-white font-semibold transition fixed md:bottom-16 bottom-35 text-text flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          {loggingOut ? (
            <div className="flex justify-center">
              <Icon
                icon="svg-spinners:3-dots-scale"
                className="text-3xl text-primary"
              />
            </div>
          ) : (
            "Log out"
          )}
        </button>
        {/* <i className="fa-solid fa-arrow-right"></i> */}
      </aside>
    </>
  );
}
