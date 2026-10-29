"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  {
    number: "1996",
    label: "In IT since",
  },
  {
    number: "24+",
    label: "Years of experience",
  },
  {
    number: "13",
    label: "Subject areas of deep expertise",
  },
  {
    number: "07",
    label: "Portals & companies built",
  },
];

export default function About() {
  return (
    <section id="about" className="w-full bg-[#f4f2ee] py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        {/* Section Tag */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-[11.5px] uppercase tracking-[0.14em] font-medium text-[#777a78] mb-8 sm:mb-10 lg:mb-12"
        >
          ABOUT
        </motion.p>

        <div className="flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-12 lg:gap-14 xl:gap-16">
          {/* Left Column: 5-Line Statement Headline & Button */}
          <div className="w-full lg:w-[540px] xl:w-[560px] flex-none flex flex-col justify-between min-h-full lg:h-[432px]">
            {/* Exact 5-Line Headline matching Figma specs: Roboto 500, 40px, 118% line-height, -3% tracking */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-[#1c1f1d] font-medium text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] leading-[118%] tracking-[-0.03em]"
            >
              <span className="block">I coordinate your office IT setup</span>
              <span className="block">by working with the right partners</span>
              <span className="block">for you and help you focus on</span>
              <span className="block">
                business. <span className="text-[#a5a8a4]">From office setup to</span>
              </span>
              <span className="block text-[#a5a8a4]">everything online.</span>
            </motion.h2>

            {/* Bottom: "More about Tony" Pill Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="my-8 sm:my-10 lg:my-0 lg:pt-2 flex items-end"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#about-tony"
                  className="group inline-flex items-center gap-2.5 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c2825] text-[13.5px] font-medium h-[40px] px-6 rounded-full transition-colors shadow-sm"
                >
                  <span>More about Tony</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: 4 Stat Tiles - 2 columns on mobile matching Figma */}
          <div className="w-full lg:w-[672px] lg:h-[432px] flex justify-center lg:justify-end">
            <div className="grid grid-cols-2 gap-3 sm:gap-[12px] w-full sm:w-[672px] h-auto lg:h-[432px]">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  whileHover={{ y: -4, borderColor: "#55806e", transition: { duration: 0.2 } }}
                  className="w-full sm:w-[330px] h-[140px] sm:h-[210px] border border-[#85A596] flex flex-col items-center justify-center p-3 sm:p-6 text-center bg-transparent transition-colors cursor-default"
                >
                  <span className="text-[#85A596] text-[34px] sm:text-[54px] lg:text-[60px] font-normal leading-none tracking-tight">
                    {stat.number}
                  </span>
                  <span className="text-[#505552] text-[11px] sm:text-[13.5px] font-normal mt-2 sm:mt-3.5 leading-snug max-w-[220px]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
