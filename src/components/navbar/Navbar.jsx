"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { num: "01", label: "About", href: "#about", desktopLabel: "ABOUT" },
    { num: "02", label: "Services", href: "#services", desktopLabel: "SERVICES" },
    { num: "03", label: "Expertise", href: "#expertise", desktopLabel: "EXPERTISE" },
    { num: "04", label: "Case studies", href: "#case-studies", desktopLabel: "CASE STUDIES" },
    { num: "05", label: "Interviews", href: "#interviews", desktopLabel: "INTERVIEWS" },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full bg-[#f3f1ed] border-b border-[#e5e2db] sticky top-0 z-50"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] h-[49px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[18px] sm:text-[20px] font-bold tracking-tight text-[#1c1f1d] hover:opacity-90 transition-opacity leading-none"
        >
          Tony John
        </Link>

        {/* Desktop Navigation Links (Figma: Hug 449px, Hug 13px, Top 18px, Gap 32px) */}
        <nav className="hidden md:flex items-center gap-[32px] h-[13px]">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12px] leading-[13px] font-medium tracking-[0.08em] text-[#333735] hover:text-[#000000] transition-colors uppercase whitespace-nowrap"
            >
              {item.desktopLabel}
            </Link>
          ))}
        </nav>

        {/* Right Action Button with exact Figma dimensions (172px x 35px) */}
        <div className="hidden sm:flex items-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center bg-[#1c1f1d] hover:bg-black text-white text-[12px] font-medium tracking-[0.02em] w-[172px] h-[35px] px-[22px] py-[16px] rounded-[2px] transition-colors leading-none"
            >
              Book a consultation
            </Link>
          </motion.div>
        </div>

        {/* Mobile 2-Bar Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 -mr-1 text-[#1c1f1d] hover:bg-black/5 rounded-full transition-colors focus:outline-none cursor-pointer"
          aria-label="Open navigation menu"
        >
          <svg
            className="w-6 h-6 text-[#1c1f1d]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 8.75h16.5M3.75 15.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Fullscreen Mobile Drawer (Exact Figma Mobile Reference) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 sm:p-8 md:hidden"
          >
            {/* Top Header Row with Close Button */}
            <div className="flex items-center justify-between pb-5 border-b border-[#ece9e3]">
              <span className="text-[20px] font-bold tracking-tight text-[#1c1f1d]">
                Tony John
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center text-[#1c1f1d] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links List */}
            <div className="flex flex-col divide-y divide-[#ece9e3] my-auto py-4">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 py-4 text-[19px] font-medium text-[#1c1f1d] hover:text-[#436156] transition-colors"
                  >
                    <span className="text-[12px] font-mono text-[#85a596] tracking-wider">
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Action Button & Footer Info */}
            <div className="pt-6 border-t border-[#ece9e3]">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-[#1c1f1d] hover:bg-black text-white text-[13.5px] font-medium py-3.5 rounded-none transition-colors"
              >
                Book a consultation
              </Link>
              <p className="text-center text-[11px] text-[#7a807d] mt-3 tracking-wide">
                tony@spiderworks.in &middot; Kochi, Kerala
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}