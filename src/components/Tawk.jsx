"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TawkWidget() {
  const pathname = usePathname();

  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin");

  useEffect(() => {
    // ❌ do not load on dashboard
    if (isDashboard) return;

    // ✅ prevent double-loading
    if (window.Tawk_API || window.__TAWK_LOADED__) return;

    window.__TAWK_LOADED__ = true;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    // script.src = "https://embed.tawk.to/6986e1f644bf221c35ba8bed/1jgre5atf";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
  }, [isDashboard]);

  return null;
}

