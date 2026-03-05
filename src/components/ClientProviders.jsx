"use client";

import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/context/toastContext";
import { UserProvider } from "@/context/userContext";
import LayoutShell from "@/components/layoutShell";
import Script from "next/script";

export default function ClientProviders({ children }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <ToastProvider>
          <UserProvider>
            <LayoutShell>{children}</LayoutShell>
          </UserProvider>
        </ToastProvider>
      </ThemeProvider>

      {/* Google Translate Mount */}
      <div id="google_translate_element" />

      {/* Google Translate Script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Init Script */}
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            if (window.google && window.google.translate) {
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,fr,es,de,pt,ar,zh',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
          }
        `}
      </Script>
    </>
  );
}
