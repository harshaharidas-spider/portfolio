"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#2b3d3f] overflow-hidden min-h-[calc(100vh-50px)] lg:min-h-[720px] flex items-center">
      {/* Background Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/nw%20graints.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
          opacity: 0.8,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[60px] xl:px-[75px] py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full relative">
          {/* Left Column: Heading, Subtitle & Buttons */}
          <div className="w-full lg:w-[680px] xl:w-[720px] flex-none flex flex-col justify-center z-10">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-[#eef0ec] font-bold text-[38px] sm:text-[60px] md:text-[76px] lg:text-[84px] xl:text-[96px] leading-[100%] tracking-[-0.04em] lg:whitespace-nowrap"
            >
              <span className="block lg:inline">Hi, I am </span>
              <span className="block lg:inline">Tony John</span>
            </motion.h1>

            {/* Subtitle description with increased top margin for more gap from heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-8 sm:mt-10 lg:mt-12 text-[15px] sm:text-[16px] text-[#c1ccc9] leading-[150%] tracking-[-0.02em] font-normal max-w-[620px]"
            >
              Twenty-four years in IT - engineer, e-commerce consultant, digital marketer.{" "}
              <span className="block sm:inline">
                I bring an engineer&apos;s way of thinking to business, digital marketing and the people I mentor.
              </span>
            </motion.p>

            {/* Action Buttons with increased top margin for more gap from description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-10 sm:mt-12 lg:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 sm:gap-8 w-full sm:w-auto"
            >
              {/* Primary Consultation Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d8e4c6] hover:bg-[#c9d7b5] text-[#1c2825] font-semibold text-[13px] tracking-[0.06em] uppercase px-7 py-4 transition-colors rounded-none shadow-sm text-center"
                >
                  BOOK A CONSULTATION
                </Link>
              </motion.div>

              {/* Secondary Explore Spiderworks Button with Arrow Box */}
              <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#spiderworks"
                  className="w-full sm:w-auto group inline-flex items-center justify-center sm:justify-start gap-3 text-[#dce6e3] hover:text-white font-medium text-[13px] tracking-[0.06em] uppercase transition-colors py-2 sm:py-0"
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
          </div>

          {/* Right Column: Hero Image Alignment & Scaling */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:flex-1 flex justify-center lg:justify-end items-center relative"
          >
            <div className="relative w-full max-w-[440px] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] flex-none select-none">
              <div className="relative z-10 w-full select-none block leading-none">
                <Image
                  src="/Portraitnw.png"
                  alt="Tony John working at laptop on phone call"
                  width={760}
                  height={600}
                  priority
                  className="w-full h-auto object-contain block select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}