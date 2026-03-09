"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { setGoogleTranslateLang } from "@/lib/api/googleTranslate";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "pt", label: "Portuguese", flag: "🇵🇹" },
  { code: "it", label: "Italian", flag: "🇮🇹" },
  { code: "nl", label: "Dutch", flag: "🇳🇱" },

  // Africa
  // { code: "ar", label: "Arabic", flag: "🇸🇦" },
  // { code: "sw", label: "Swahili", flag: "🇰🇪" },
  // { code: "ha", label: "Hausa", flag: "🇳🇬" },
  // { code: "yo", label: "Yoruba", flag: "🇳🇬" },
  // { code: "ig", label: "Igbo", flag: "🇳🇬" },

  // Europe
  { code: "ru", label: "Russian", flag: "🇷🇺" },
  { code: "pl", label: "Polish", flag: "🇵🇱" },
  { code: "uk", label: "Ukrainian", flag: "🇺🇦" },

  // Asia
  { code: "zh", label: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "ko", label: "Korean", flag: "🇰🇷" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },

  // Americas
  { code: "pt-BR", label: "Portuguese (Brazil)", flag: "🇧🇷" },
  { code: "es-MX", label: "Spanish (Mexico)", flag: "🇲🇽" },
  { code: "fr-CA", label: "French (Canada)", flag: "🇨🇦" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  /* ------------------------------
     AUTO-DETECT BROWSER LANGUAGE
  ------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("lang-set");
    if (saved) return;

    const browserLang = navigator.language; // e.g. en-US
    const baseLang = browserLang.split("-")[0];

    const match =
      LANGUAGES.find((l) => l.code === browserLang) ||
      LANGUAGES.find((l) => l.code === baseLang);

    if (match) {
      setGoogleTranslateLang(match.code);
      localStorage.setItem("lang-set", "true");
    }
  }, []);

  /* ------------------------------
     CLOSE ON OUTSIDE CLICK
  ------------------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ------------------------------
     SEARCH FILTER
  ------------------------------- */
  const filteredLanguages = useMemo(() => {
    return LANGUAGES.filter(
      (l) =>
        l.label.toLowerCase().includes(search.toLowerCase()) ||
        l.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div
      ref={ref}
      className="fixed bottom-5 left-5 z-[9999] max-w-[90vw]"
    >
      {/* Dropdown */}
      {open && (
        <div className="mb-3 w-64 max-h-[60vh] overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl backdrop-blur animate-fadeIn">
          {/* Search */}
          <div className="p-2 border-b border-white/10">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language..."
              className="w-full rounded-md bg-black/10 px-3 py-2 text-sm text-text outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>

          {/* Scrollable list */}
          <div className="max-h-[45vh] overflow-y-auto overscroll-contain">
            {filteredLanguages.length === 0 && (
              <p className="px-4 py-3 text-sm text-muted">
                No language found
              </p>
            )}

            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setGoogleTranslateLang(lang.code);
                  localStorage.setItem("lang-set", "true");
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-text hover:bg-white/10 transition"
              >
                <span>{lang.flag}</span>
                <span className="truncate">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-lg hover:scale-105 transition"
      >
        🌍 Language
        <span className={`transition ${open ? "rotate-180" : ""}`}><i className="fa-solid fa-chevron-down"></i> </span>
      </button>
    </div>
  );
}
