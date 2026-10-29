"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const exploreLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Expertise", href: "#expertise" },
    { label: "Case studies", href: "#case-studies" },
    { label: "Clients", href: "#clients" },
  ];

  const moreLinks = [
    { label: "Gallery", href: "#gallery" },
    { label: "Interviews", href: "#interviews" },
    { label: "Contact", href: "#contact" },
  ];

  const ventureLinks = [
    { label: "SpiderWorks", href: "#spiderworks" },
    { label: "IndiaStudyChannel", href: "#indiastudychannel" },
    { label: "dotnetspider", href: "#dotnetspider" },
    { label: "India Travel Blog", href: "#indiatravelblog" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ];

  const linkColumns = [
    { title: "EXPLORE", links: exploreLinks, isExternal: false },
    { title: "MORE", links: moreLinks, isExternal: false },
    { title: "VENTURES", links: ventureLinks, isExternal: false },
    { title: "ELSEWHERE", links: socialLinks, isExternal: true },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#22363A] overflow-hidden isolate min-h-0 lg:min-h-[1226px] lg:h-[1226px] flex flex-col justify-between pt-16 sm:pt-20 pb-0"
    >
      {/* Background Grain Texture Overlay set to 14% opacity */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/nw%20graints.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
          opacity: 0.14,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] flex-1 flex flex-col justify-between">
        {/* Top Call To Action Area */}
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[12px] uppercase tracking-[0.1em] font-medium text-[#8a9b97] mb-5"
          >
            CONTACT
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-medium text-[36px] sm:text-[54px] md:text-[72px] lg:text-[96px] leading-[100%] tracking-[-0.04em] max-w-[1200px] mx-auto"
          >
            <span className="text-white block">Don&apos;t let IT become</span>
            <span className="text-[#aecfbf] block mt-1">the problem.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-[14.5px] sm:text-[16px] text-[#c2d2ce] leading-[1.6] max-w-[580px] mt-5"
          >
            Leave your IT-related headaches to me from office setup to everything
            online and focus on your business.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#D8E4C6] hover:bg-[#c9d7b5] text-[#1c2825] font-semibold text-[13px] tracking-[0.06em] uppercase px-7 py-4 transition-colors rounded-none shadow-sm"
              >
                BOOK A CONSULTATION
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#spiderworks"
                className="group inline-flex items-center gap-3 text-[#dce6e3] hover:text-white font-medium text-[13px] tracking-[0.06em] uppercase transition-colors"
              >
                <span>EXPLORE SPIDERWORKS</span>
                <span className="w-7 h-7 border border-white/40 flex items-center justify-center text-white/80 group-hover:border-white group-hover:text-white transition-colors">
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-6 space-y-1 text-center"
          >
            <p className="text-[#b3c7c2] text-[13px]">
              Email:{" "}
              <a
                href="mailto:tony@spiderworks.in"
                className="hover:text-white transition-colors underline"
              >
                tony@spiderworks.in
              </a>
            </p>
            <p className="text-[#91a8a3] text-[11px] uppercase tracking-[0.12em]">
              SPIDERWORKS TECHNOLOGIES, KOCHI, KERALA
            </p>
          </motion.div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="pt-12 border-t border-white/10 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Brand Intro Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-4 flex flex-col items-start"
            >
              <h3 className="text-white font-bold text-[19px] tracking-tight">
                Tony John
              </h3>
              <p className="text-[#b3c5c1] text-[13.5px] leading-relaxed mt-2.5 max-w-[280px]">
                Technology consultant from Kerala, India.
                <br />
                Founder &amp; CEO, SpiderWorks.
              </p>
            </motion.div>

            {/* 4 Navigation Link Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {linkColumns.map((col, idx) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + idx * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <p className="text-[11.5px] uppercase tracking-[0.1em] font-medium text-[#b3c5c1] mb-3">
                    {col.title}
                  </p>
                  <ul className="space-y-2">
                    {col.links.map((item) => (
                      <li key={item.label}>
                        {col.isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13.5px] text-[#d1dbd8] hover:text-white transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-[13.5px] text-[#d1dbd8] hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top Bar (Divider line removed) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 mt-10"
        >
          <p className="text-[#91a6a2] text-[11px] uppercase tracking-[0.08em]">
            &copy; 2026 TONY JOHN. ALL RIGHTS RESERVED.
          </p>
          <a
            href="#hero"
            className="text-[#91a6a2] hover:text-white text-[11px] uppercase tracking-[0.08em] transition-colors"
          >
            BACK TO TOP &uarr;
          </a>
        </motion.div>
      </div>

      {/* Giant Watermark Signature (Touching Bottom - Full Width, Edge-to-Edge with No Gap to Screen) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full overflow-hidden select-none pointer-events-none leading-none mt-auto -mb-1 sm:-mb-2 lg:-mb-4"
      >
        <div className="w-full flex justify-center items-end">
          <span className="text-white/[0.05] font-black tracking-[-0.04em] leading-[0.78] uppercase whitespace-nowrap block select-none text-[18.8vw] w-full text-center">
            TONY JOHN
          </span>
        </div>
      </motion.div>
    </footer>
  );
}