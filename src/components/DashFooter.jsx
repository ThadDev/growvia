"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartPie,
  faArrowDownWideShort,
  faListUl,
  faGear,
  faBriefcaseClock,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: faHouse,
  },
  {
    label: "Invest",
    href: "/dashboard/investments",
    icon: faChartPie,
  },
  {
    label: "Contracts",
    href: "/dashboard/active-plans",
    icon: faBriefcaseClock,
    primary: true, // standout action
  },
  {
    label: "History",
    href: "/dashboard/history",
    icon: faArrowDownWideShort,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: faGear,
  },
];

export default function DashFooter() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glass / premium container */}
      <div className=" roundel border border-border-color bg-card/90 backdrop-blur-xl shadow-2xl">
        <ul className="flex items-center justify-between px-2 py-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.label} className="flex-1">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center  transition-all ${
                    isActive
                      ? "text-hover"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all
                      ${
                        item.primary
                          ? " "
                          : isActive
                          ? "bg-hover/10"
                          : "bg-transparent"
                      }
                    `}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      size="lg"
                    />
                  </div>

                  {/* Label */}
                  <span className="text-[9px] font-medium">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
