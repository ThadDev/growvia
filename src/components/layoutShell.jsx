"use client";

import { usePathname } from "next/navigation";
import MainNavBar from "@/components/navBar";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

//   const hideNavbarRoutes = ["/login", "/register","/dashboard"];
  const shouldHideNavbar = /^\/(login|register|dashboard|passsword-reset|verify-email)/.test(pathname);


//   const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <MainNavBar />}
      {children}
    </>
  );
}
