import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";
import DashFooter from "@/components/DashFooter";
import Script from "next/script";
import TawkWidget from "@/components/Tawk";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Growvia",
  description: "Invest smarter with secure crypto and asset management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://code.iconify.design/2/2.2.1/iconify.min.js"></script>
        <meta name="color-scheme" content="light dark" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-grad-via to-grad-to`}
      >
        <ClientProviders>{children}</ClientProviders>
        {/* <DashFooter/> */}
               <TawkWidget />
      </body>
    </html>
  );
}
