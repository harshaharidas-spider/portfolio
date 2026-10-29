"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HowIWork() {
  const steps = [
    {
      number: "01.",
      title: "Understand the business",
      description:
        "What you actually need not what vendors pitch. Which computer to buy, which networks to use, what to implement and what to skip.",
      isActive: true,
    },
    {
      number: "02.",
      title: "Research, neutrally",
      description:
        "Options, costs and track records compared through extensive, neutral research so you don't pay for expensive solutions where cheaper alternatives exist.",
      isActive: false,
    },
    {
      number: "03.",
      title: "Choose & coordinate",
      description:
        "The right partners, chosen on track record rather than pitch, and coordinated end-to-end while you focus on business.",
      isActive: false,
    },
    {
      number: "04.",
      title: "Stay hands-on",
      description:
        "I quit my primary job as a software architect in 2011 but I still love to get my hands dirty writing code myself.",
      isActive: false,
    },
  ];

  return (
    <section id="how-i-work" className="w-full bg-[#f4f2ee] py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start justify-between">
          {/* Left: Section Label & Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <p className="text-[12px] uppercase tracking-[0.1em] font-medium text-[#5e6360] mb-6 sm:mb-8">
              HOW I WORK
            </p>
            <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] font-bold leading-[1.12] tracking-[-0.03em] max-w-[560px]">
              <span className="text-[#1c1f1d] block">
                From first brief to hands-on,
              </span>
              <span className="text-[#616663] block mt-1">step by step.</span>
            </h2>
          </motion.div>

          {/* Right: Description & CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex flex-col items-start lg:items-start lg:pt-12"
          >
            <p className="text-[14.5px] sm:text-[15.5px] text-[#555a57] leading-[1.65] max-w-[420px]">
              Every engagement follows the same four steps — so you always know
              what happens next.
            </p>
            <div className="mt-6">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c1f1d] text-[13.5px] font-medium px-5 py-2.5 rounded-full transition-colors"
                >
                  <span>Book a consultation</span>
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
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 4 Steps Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mt-16 sm:mt-20 lg:mt-24">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`pt-8 border-t-[2px] transition-colors ${
                step.isActive ? "border-[#85A596]" : "border-[#85A596]"
              }`}
            >
              <span className="text-[#8EB9A4] text-[56px] font-medium leading-none tracking-[-0.04em] block">
                {step.number}
              </span>
              <h3 className="text-[#1c1f1d] text-[18px] sm:text-[19px] font-semibold mt-4 sm:mt-5 tracking-tight">
                {step.title}
              </h3>
              <p className="text-[#3b423f] text-[13.5px] leading-[1.65] mt-3">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}