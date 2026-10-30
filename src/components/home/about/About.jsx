"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

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

// Helper to split a stat string like "24+", "07", or "1996" into parts
function parseStatNumber(str) {
  const match = String(str).match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", value: 0, suffix: str, padZero: false };
  const [, prefix, numStr, suffix] = match;
  const padZero = numStr.length > 1 && numStr.startsWith("0");
  return {
    prefix,
    value: parseInt(numStr, 10),
    suffix,
    padZero,
  };
}

// Framer Motion Animated Counter exported correctly for other components
export function Counter({ value, duration = 2, delay = 0 }) {
  const { prefix, value: targetValue, suffix, padZero } = parseStatNumber(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const count = useMotionValue(0);

  // Format the animated number with leading zeros (e.g., "07") and prefix/suffix
  const rounded = useTransform(count, (latest) => {
    const num = Math.round(latest);
    const formatted = padZero && num < 10 ? `0${num}` : `${num}`;
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, targetValue, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // Smooth deceleration curve
    });

    return () => controls.stop();
  }, [isInView, count, targetValue, duration, delay]);

  return (
    <span ref={ref} className="inline-flex items-baseline tabular-nums">
      <motion.span>{rounded}</motion.span>
    </span>
  );
}

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
          className="text-[11.5px] uppercase tracking-[0.14em] font-medium text-[#5e6360] mb-8 sm:mb-10 lg:mb-12"
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
                business. <span className="text-[#696e6b]">From office setup to</span>
              </span>
              <span className="block text-[#696e6b]">everything online.</span>
            </motion.h2>

            {/* Bottom: "More about Tony" Pill Button with SVG Arrow */}
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
                  className="group inline-flex items-center gap-2 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c1f1d] text-[13.5px] font-medium px-5 py-2.5 rounded-full transition-colors shadow-sm"
                >
                  <span>More about Tony</span>
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
            </motion.div>
          </div>

          {/* Right Column: 4 Stat Tiles with Animated Counters */}
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
                  whileHover={{
                    y: -4,
                    borderColor: "#55806e",
                    backgroundColor: "rgba(133, 165, 150, 0.05)",
                    transition: { duration: 0.2 },
                  }}
                  className="w-full sm:w-[330px] h-[140px] sm:h-[210px] border border-[#85A596] flex flex-col items-center justify-center p-3 sm:p-6 text-center bg-transparent transition-colors cursor-default"
                >
                  <span
                    className="text-[#8EB9A4] text-[40px] sm:text-[48px] lg:text-[56px] font-medium leading-[100%] tracking-[-0.04em]"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    <Counter
                      value={stat.number}
                      duration={stat.number === "1996" ? 2.2 : 1.8}
                      delay={0.15 + idx * 0.1}
                    />
                  </span>
                  <span className="text-[#333835] text-[11px] sm:text-[13.5px] font-normal mt-2 sm:mt-3.5 leading-snug max-w-[220px]">
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