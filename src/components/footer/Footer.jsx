"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98];

// Shared Roboto base
const font = { fontFamily: "Roboto, sans-serif", fontStyle: "normal" };

// 11px / 400 / 1.1px / uppercase (eyebrow, column titles, copyright, back to top)
const smallCaps = {
  ...font,
  fontSize: "11px",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "1.1px",
  textTransform: "uppercase",
};

// 11px / 400 / 160% / 1.1px (email + address)
const contactLine = {
  ...font,
  fontSize: "11px",
  fontWeight: 400,
  lineHeight: "160%",
  letterSpacing: "1.1px",
};

// 14px / 500 / 145% / uppercase (both CTA labels)
const ctaLabel = {
  ...font,
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "145%",
  textTransform: "uppercase",
};

// 15px / 400 / normal (footer links)
const navLink = {
  ...font,
  fontSize: "15px",
  fontWeight: 400,
  lineHeight: "normal",
};

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

  const linkClass =
    "text-[color:var(--on-dark,#EEF0EC)] hover:text-white transition-colors";

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#22363A] overflow-hidden isolate flex flex-col justify-between pt-20 sm:pt-24 lg:pt-[112px] pb-0"
    >
      {/* Background grain texture overlay (14%) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/image/nw%20graints.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
          opacity: 0.14,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex flex-col">
        {/* ───────── Call to action ───────── */}
        <div className="flex flex-col items-center text-center">
          {/* CONTACT */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6 text-center text-[color:var(--on-dark-muted,#A3B1AE)]"
            style={smallCaps}
          >
            CONTACT
          </motion.p>

          {/* Big heading: 96px / 500 / 100% / -3.84px */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto"
            style={{
              ...font,
              fontSize: "clamp(38px, 6.67vw, 96px)", // 96px at 1440px
              fontWeight: 500,
              lineHeight: "100%",
              letterSpacing: "-0.04em", // = -3.84px at 96px
              textAlign: "center",
            }}
          >
            <span className="block" style={{ color: "var(--on-dark, #EEF0EC)" }}>
              Don&rsquo;t let IT become
            </span>
            <span className="block" style={{ color: "var(--jade, #AECFBF)" }}>
              the problem.
            </span>
          </motion.h2>

          {/* Description: 19px / 400 / 145%, 40px below heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-10 max-w-[590px] text-[16px] sm:text-[19px] leading-[145%] text-center text-[color:var(--on-dark-muted,#A3B1AE)]"
            style={{ ...font, fontWeight: 400 }}
          >
            Leave your IT-related headaches to me from office setup to everything
            online and focus on your business.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full sm:w-auto"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              {/* Padding 34 left/right, 19 top, 18 bottom (hugs to 222px) */}
              <Link
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#D8E4C6] hover:bg-[#c9d7b5] px-[34px] pt-[19px] pb-[18px] transition-colors rounded-none shadow-sm"
                style={{ ...ctaLabel, color: "var(--ink, #1C1F1D)" }}
              >
                BOOK A CONSULTATION
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#spiderworks"
                className="group inline-flex items-center gap-3 text-[color:var(--on-dark,#EEF0EC)] hover:text-white transition-colors"
                style={ctaLabel}
              >
                <span>EXPLORE SPIDERWORKS</span>
                <span className="w-[22px] h-[22px] border border-white/60 flex items-center justify-center text-white/80 group-hover:border-white group-hover:text-white transition-colors">
                  <svg
                    className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5"
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

          {/* Email + address: 11px / 160% / 1.1px */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            className="mt-8 text-center w-full text-[color:var(--on-dark-muted,#A3B1AE)]"
          >
            <p style={contactLine}>
              Email:{" "}
              <a
                href="mailto:tony@spiderworks.in"
                className="hover:text-white transition-colors"
              >
                tony@spiderworks.in
              </a>
            </p>
            <p style={{ ...contactLine, textTransform: "uppercase" }}>
              SPIDERWORKS TECHNOLOGIES, KOCHI, KERALA
            </p>
          </motion.div>
        </div>

        {/* Division line */}
        <div className="w-full h-[1px] bg-[#3A4E52] mt-16 sm:mt-20" />

        {/* ───────── Navigation ───────── */}
        <div className="pt-10">
          {/* Brand column 557 + link columns 787 (at 1344px content width) */}
          <div className="grid grid-cols-1 lg:grid-cols-[557fr_787fr] gap-10 lg:gap-0">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-start"
            >
              <h3
                className="text-[color:var(--on-dark,#EEF0EC)]"
                style={{
                  ...font,
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Tony John
              </h3>
              {/* 14px / 400 / 150% (21px) */}
              <p
                className="mt-2.5 max-w-[300px] text-[color:var(--on-dark-muted,#A3B1AE)]"
                style={{
                  ...font,
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "150%",
                }}
              >
                Technology consultant from Kerala, India.
                <br />
                Founder &amp; CEO, SpiderWorks.
              </p>
            </motion.div>

            {/* 4 link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10 lg:gap-0">
              {linkColumns.map((col, idx) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + idx * 0.08,
                    ease: EASE,
                  }}
                >
                  {/* Column title: 11px / 1.1px / uppercase / on-dark-muted */}
                  <p
                    className="mb-5 text-[color:var(--on-dark-muted,#A3B1AE)]"
                    style={smallCaps}
                  >
                    {col.title}
                  </p>
                  <ul className="space-y-[11px]">
                    {col.links.map((item) => (
                      <li key={item.label}>
                        {col.isExternal ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                            style={navLink}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={linkClass}
                            style={navLink}
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

        {/* ───────── Copyright & back to top ───────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 lg:mt-[44px] pb-1 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p
            className="text-[color:var(--on-dark-muted,#A3B1AE)]"
            style={smallCaps}
          >
            &copy; 2026 TONY JOHN. ALL RIGHTS RESERVED.
          </p>
          <a
            href="#hero"
            className="text-[color:var(--on-dark-muted,#A3B1AE)] hover:text-white transition-colors"
            style={smallCaps}
          >
            BACK TO TOP &uarr;
          </a>
        </motion.div>
      </div>

      {/* Giant watermark: your exact CSS, scaled with the screen width.
          The wrapper's font-size is 290px at 1440px (20.139vw), and everything
          inside is in em so it stays edge to edge at every width. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
        className="relative z-10 w-full overflow-hidden select-none pointer-events-none"
        style={{
          fontSize: "20.139vw", // = 290px at 1440px
          height: "0.89em", // ≈ 258px at 1440px; crops the bottom of the letters like Figma
        }}
        aria-hidden="true"
      >
        <span
          className="block whitespace-nowrap"
          style={{
            marginTop: "0.083em", // ≈ 24px at 1440px
            color: "var(--petrol-line, #3A4E52)",
            fontFamily: "Roboto, sans-serif",
            fontSize: "1em", // 290px at 1440px
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "100%", // 290px at 1440px
            letterSpacing: "-0.06em", // = -17.4px at 290px
            textTransform: "uppercase",
          }}
        >
          TONY JOHN
        </span>
      </motion.div>
    </footer>
  );
}