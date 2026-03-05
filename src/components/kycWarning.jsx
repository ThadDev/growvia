import { Icon } from "@iconify/react";
import Link from "next/link";

export default function KycReminderCard() {
  return (
<div className="w-full  rounded-xl border px-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 px-3 md:px-6 h-10 md:h-14 flex items-center justify-between shadow-sm">
  
  {/* Left content */}
  <div className="flex items-center gap-2 min-w-0">
    <div className="flex h-6 w-6 md:h-10 md:w-10 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-600 flex-shrink-0">
      <Icon icon="mdi:shield-alert-outline" width={14} className="md:hidden" />
      <Icon icon="mdi:shield-alert-outline" width={20} className="hidden md:block" />
    </div>

    <span className="truncate text-[11px] md:text-sm font-medium text-yellow-900">
      Complete KYC to access secure features
    </span>
  </div>

  {/* CTA */}
  <Link href="/dashboard/kyc" className="flex-shrink-0">
    <button className="rounded-lg bg-yellow-500 px-2.5 py-1 md:px-5 md:py-2 text-[11px] md:text-sm font-semibold text-yellow-950 shadow hover:bg-yellow-400 transition">
      Verify
    </button>
  </Link>
</div>

  );
}
