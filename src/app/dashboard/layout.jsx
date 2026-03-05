"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/headerBar";
import { useState } from "react";
import { BalanceVisibilityProvider } from "@/context/balanceVisibilityProvider";
import { InvProvider, KycProvider, useKyc } from "@/context/userContext";
import KycReminderCard from "@/components/kycWarning";
import DashFooter from "@/components/DashFooter";
import IdentifyTawkUser from "@/components/Tawk";

function DashboardContent({ children }) {
  const { kyc } = useKyc();
  if (kyc) {
    return (
      <>
        {kyc !== "approved" && kyc !== "pending" && <KycReminderCard />}
        {children}
      </>
    );
  }
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <KycProvider>
      <InvProvider>
        <BalanceVisibilityProvider>
          <div className="flex min-h-screen w-full overflow-x-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Header */}
            <Header
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              isOpen={sidebarOpen}
            />

            {/* Main content */}
            <main className="flex-1 w-full min-w-0 mb-20 md:ml-[15em] md:mb-0 md:px-2 md:py-8 bg-dash-bg mt-18 md:mt-12 text-text">
              <DashboardContent />
              {children}
              <DashFooter />
            </main>
          </div>
        </BalanceVisibilityProvider>
        {/* <IdentifyTawkUser user={currentUser} /> */}

      </InvProvider>
    </KycProvider>

    // <KycProvider>
    //    <InvProvider>
    //    <BalanceVisibilityProvider>
    //     <div className="flex min-h-screen">
    //     {/* Sidebar */}
    //     <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    //     <Header
    //       onMenuClick={() => setSidebarOpen(!sidebarOpen)}
    //       isOpen={sidebarOpen}
    //     />


    //     {/* Main content */}
    //     <main className="flex-1 md:ml-[15em] mb-20 md:mb-0 md:px-2  md:py-8 bg-gradient-to-br mt-18 md:mt-12 from-grad-from via-grad-via to-grad-to text-text">
    //   <DashboardContent/>
    //       {children}
    //       <DashFooter/>
    //     </main>
    //   </div>
    //   </BalanceVisibilityProvider>
    //  </InvProvider>
    // </KycProvider>
  );
}

