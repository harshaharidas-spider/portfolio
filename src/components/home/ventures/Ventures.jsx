"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Ventures() {
  const bottomVentures = [
    { name: "SpiderWorks", meta: "Kochi · Nevada" },
    { name: "Brandaware", meta: "sister concern" },
    { name: "HatchingWeb", meta: "sister concern" },
    { name: "Digital Skill Master", meta: "sister concern" },
  ];

  return (
    <section
      id="ventures"
      className="relative w-full bg-[#22363A] overflow-hidden isolate py-10 sm:py-12 lg:py-[40px]"
    >
      <span id="spiderworks" className="-top-20 relative block" aria-hidden="true" />

      {/* Background Grain Texture Overlay */}
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

      {/* Outer frame (outer margin) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[40px]">
        <div className="border border-solid border-white/[0.12] rounded-[4px] overflow-hidden">

          {/* ===== Main frame: Figma padding top 70 / sides 48 / bottom 60 ===== */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-10 lg:gap-0 px-6 pt-10 pb-10 sm:px-8 lg:pt-[70px] lg:pb-[60px] lg:px-[48px]">

            {/* Left column: heading / 100px / paragraph / 100px / button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-full lg:w-[500px] xl:w-[540px] flex-none flex flex-col items-start gap-10 lg:gap-[100px]"
            >
              <h2
                className="text-[40px] sm:text-[48px] font-medium leading-[104%] tracking-[-1.92px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <span className="text-[#EEF0EC] block">One idea.</span>
                <span className="text-[#A3B1AE] block mt-1">
                  A world of possibilities.
                </span>
              </h2>

              <p
                className="text-[16px] font-normal text-[#A3B1AE] leading-[150%] max-w-[480px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                SpiderWorks grew out of years spent understanding how the web works.
                Today, it brings technology, creativity and marketing together to
                help businesses grow from Kochi, for clients across India, the UAE
                and the UK.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-[#D8E4C6] text-[#1C1F1D] font-medium text-[14px] leading-[145%] uppercase px-7 py-4 rounded-none shadow-sm hover:bg-[#c9d7b5] transition-colors"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  EXPLORE SPIDERWORKS
                </Link>
              </motion.div>
            </motion.div>

            {/* Right column: visual + mint card (pushed to the right edge = "Auto" gap) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex-none flex justify-center lg:justify-end items-center"
            >
              <div className="relative w-[587px] max-w-full h-[367px] flex items-center justify-center">
                <div
                  className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
                  aria-hidden="true"
                >
                  <Image
                    src="/image/Visual.png"
                    alt=""
                    width={587}
                    height={367}
                    className="w-full h-full object-contain select-none"
                    priority
                  />
                </div>

                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="relative z-10 w-[305px] max-w-[92%] h-[298px] bg-[#aecfbf] p-[28px] flex flex-col justify-between rounded-[4px] shadow-lg"
                >
                  <div>
                    <h3 className="font-bold text-[28px] text-[#1c2825] leading-none tracking-tight">
                      SpiderWorks
                    </h3>
                    <p className="uppercase text-[9.5px] tracking-[0.18em] font-semibold text-[#384e48] mt-2">
                      TECHNOLOGIES &middot; EST. 2005
                    </p>
                  </div>

                  <ul className="space-y-2.5">
                    {["Technology", "Creativity", "Growth"].map((item, i) => (
                      <li key={item} className="flex items-baseline">
                        <span className="text-[11.5px] font-normal text-[#48625b] w-6 flex-none select-none">
                          0{i + 1}
                        </span>
                        <span className="text-[15.5px] font-semibold text-[#1c2825] tracking-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>

   {/* ===== Bottom ventures row (outside the padded frame, full width) ===== */}
{/* ===== Bottom ventures row: 4 equal cells, dividers, centered content ===== */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
  className="border-t border-solid border-white/[0.12]"
>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
    {bottomVentures.map((v, idx) => (
      <motion.div
        key={v.name}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className={`flex flex-row items-center justify-center gap-[12px] px-[24px] py-[26px] border-white/[0.12] ${
          idx !== 0 ? "border-t sm:border-t-0 lg:border-l" : ""
        } ${idx === 2 ? "sm:border-t sm:max-lg:border-t" : ""} ${
          idx === 1 || idx === 3 ? "sm:border-l" : ""
        }`}
      >
        <span
          className="text-[#EEF0EC] text-[20px] font-medium not-italic leading-[normal] tracking-[-0.4px] whitespace-nowrap"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {v.name}
        </span>

        <span
          className="text-[#A3B1AE] text-[11px] font-normal not-italic leading-[normal] whitespace-nowrap"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {v.meta}
        </span>
      </motion.div>
    ))}
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
}