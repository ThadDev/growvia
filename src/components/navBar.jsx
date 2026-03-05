
"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import { Menu, X } from "lucide-react"; // Lucide icons for toggle
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };


  return (
    <header className="fixed  top-0 z-50 w-full bg-gradient-to-br from-grad-via to-grad-to shadow-md shadow-border-color">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Growvia" className="w-[40px]" />
          <h1 className="text-text text-md font-bold">Growvia</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-text">
          <Link href="/" className="hover:text-hover transition">Home</Link>
          <Link href="/about" className="hover:text-hover transition">About</Link>

          {/* Investors Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary transition">
              For Investors <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-card shadow-lg border border-border-color opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <DropdownLink href="/register" label="Real Estate" />
              <DropdownLink href="/register" label="Crypto" />
              <DropdownLink href="/register" label="Trust Bond" />
              <DropdownLink href="/register" label="Loan" />
            </div>
          </div>

          {/* Legals Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-primary transition">
              Legals <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
            <div className="absolute top-full left-0 mt-2 w-52 rounded-xl bg-card shadow-lg border border-border-color opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

              <DropdownLink href="/privacy-policy" label="Privacy Policy" />
              <DropdownLink href="/kyc-policy" label="KYC Policy" />
            </div>
          </div>

          <Link href="/" className="hover:text-primary transition">Home</Link>
          <Link href="/about" className="hover:text-primary transition">About</Link>
          <Link href="/contact" className="hover:text-primary transition">Contact Us</Link>
          <Link href="/celebrity-programme" className="hover:text-primary transition">Programmes</Link>
          <Link href="/articles" className="hover:text-primary transition">Articles</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Register Button */}
          <Link
            href="/register"
            className="hidden sm:inline-flex px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20 hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            Register
          </Link>

          {/* Login Icon */}
          <Link
            href="/login"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border-color bg-surface hover:border-primary hover:text-primary shadow-sm transition-all"
            aria-label="Login"
          >
            <i className="fa-solid fa-user text-text group-hover:text-primary text-sm"></i>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md  hover:bg-primary transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6 text-text" /> : <i className="fa-solid fa-bars-staggered text-text text-2xl"></i>}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-16  inset-0 z-50 bg-card md:hidden"
          >
            <motion.ul
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full flex flex-col justify-center items-center gap-8 px-6 text-center text-text"
            >
              {/* Primary */}
              <li>
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="text-2xl font-semibold hover:text-hover transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="text-2xl font-semibold hover:text-hover transition"
                >
                  About
                </Link>
              </li>

              {/* Investors Dropdown */}
              <li className="w-full max-w-xs">
                <button
                  onClick={() => toggleDropdown("investors")}
                  className="flex w-full items-center justify-center gap-2 text-2xl font-semibold hover:text-hover transition"
                >
                  Investors
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${openDropdown === "investors" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === "investors" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 flex flex-col gap-3 overflow-hidden"
                    >
                      {[
                        ["Real Estate", "/register"],
                        ["Crypto", "/register"],
                        ["Trust Bond", "/register"],
                        ["Loan", "/register"],
                      ].map(([label, href]) => (
                        <Link
                          key={label}
                          href={href}
                          onClick={toggleMenu}
                          className="text-base text-muted hover:text-hover transition"
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Legals Dropdown */}
              <li className="w-full max-w-xs">
                <button
                  onClick={() => toggleDropdown("legals")}
                  className="flex w-full items-center justify-center gap-2 text-2xl font-semibold hover:text-hover transition"
                >
                  Legals
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${openDropdown === "legals" ? "rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {openDropdown === "legals" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 flex flex-col gap-3 overflow-hidden"
                    >
                      {[
                        ["Terms & Conditions", "/legal/terms"],
                        ["Privacy Policy", "/privacy-policy"],
                        ["KYC Policy", "/kyc-policy"],
                      ].map(([label, href]) => (
                        <Link
                          key={label}
                          href={href}
                          onClick={toggleMenu}
                          className="text-base text-muted hover:text-hover transition"
                        >
                          {label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Contact */}
              <li>
                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className="text-2xl font-semibold hover:text-hover transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/celebrity-programme"
                  onClick={toggleMenu}
                  className="text-2xl font-semibold hover:text-hover transition"
                >
                  Programmes
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  onClick={toggleMenu}
                  className="text-2xl font-semibold hover:text-hover transition"
                >
                  Articles
                </Link>
              </li>
              {/* CTA */}
              <li className="pt-6">
                <Link
                  href="/register"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-hover text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
                >
                  Register
                </Link>
              </li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

const DropdownLink = ({ href, label }) => (
  <Link
    href={href}
    className="block px-4 py-2 text-sm text-text hover:bg-primary hover:text-white transition"
  >
    {label}
  </Link>
);

export default MainNavBar;
