"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import logo1 from "../../../../public/image/logo1.jpg";
import logo2 from "../../../../public/image/logo2_hires.png";
import logo3 from "../../../../public/image/logo3_hires.png";
import logo4 from "../../../../public/image/logo4_hires.png";
import logo5 from "../../../../public/image/logo5_hires.png";
import logo6 from "../../../../public/image/logo6_hires.png";

const caseStudies = [
  {
    id: 0,
    title: "Manorama Online",
    category: "DIGITAL MARKETING",
    description:
      "Digital marketing for Manorama Online, the digital home of the Malayala Manorama newspaper. Full write-up in progress.",
    status: "WRITE-UP IN PROGRESS",
    href: "#contact",
    logo: logo6,
  },
  {
    id: 1,
    title: "Home Depot",
    category: "SOFTWARE ARCHITECTURE",
    description:
      "Software architecture for North America's largest home-improvement retailer. Full write-up in progress.",
    status: "WRITE-UP IN PROGRESS",
    href: "#contact",
    logo: logo4,
  },
  {
    id: 2,
    title: "IndusGo",
    category: "E-COMMERCE",
    description:
      "End-to-end self-drive car rental e-commerce platform with real-time fleet synchronization and seamless mobile booking funnels.",
    status: "WRITE-UP SOON",
    href: "#contact",
    logo: logo2,
  },
  {
    id: 3,
    title: "Indus Motors",
    category: "DIGITAL MARKETING",
    description:
      "Full-funnel digital marketing and omnichannel lead generation systems for India's largest Maruti Suzuki automotive dealership network.",
    status: "WRITE-UP SOON",
    href: "#contact",
    logo: logo1,
  },
  {
    id: 4,
    title: "Aquaguard",
    category: "E-COMMERCE",
    description:
      "Direct-to-consumer e-commerce conversion optimization, landing page architecture, and subscription user experience for Eureka Forbes.",
    status: "WRITE-UP SOON",
    href: "#contact",
    logo: logo3,
  },
  {
    id: 5,
    title: "Kiltons",
    category: "DIGITAL MARKETING",
    description:
      "Comprehensive digital marketing, brand authority positioning, and corporate advisory lead capture for UAE business setup consultants.",
    status: "WRITE-UP SOON",
    href: "#contact",
    logo: logo5,
  },
];

export default function CaseStudies() {
  const featured = caseStudies[0];
  const secondary = caseStudies[1];
  const bottomRow = caseStudies.slice(2);

  return (
    <section
      id="case-studies"
      className="w-full bg-[#f4f2ee] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        {/* Top Header Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-12 sm:mb-14 lg:mb-16"
        >
          {/* Left: Tag & Heading */}
          <div className="flex flex-col items-start max-w-[620px]">
            <p className="text-[11.5px] uppercase tracking-[0.14em] font-medium text-[#5e6360] mb-4 sm:mb-6">
              CASE STUDIES
            </p>
            <h2 className="text-[32px] sm:text-[40px] md:text-[46px] lg:text-[50px] font-bold leading-[1.12] tracking-[-0.03em]">
              <span className="text-[#1c1f1d]">Selected work, </span>
              <span className="text-[#676d69]">
                from Home <br className="hidden sm:inline" />
                Depot to Manorama Online.
              </span>
            </h2>
          </div>

          {/* Right: Subtitle & CTA Button */}
          <div className="flex flex-col items-start lg:items-start lg:pt-8 max-w-[380px]">
            <p className="text-[14.5px] sm:text-[15px] text-[#505754] leading-[1.6]">
              Six engagements across architecture, marketing and e-commerce. Full
              write-ups are being prepared.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2.5 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c2825] text-[13.5px] font-medium h-[40px] px-6 rounded-full transition-colors shadow-sm mt-5"
              >
                <span>Discuss your project</span>
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

        {/* Case Studies Cards Grid matching Figma Specs */}
        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Top Row: Left Featured Card (Spans 8 cols) + Right Card (Spans 4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Featured Manorama Online Card */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="lg:col-span-8 flex"
            >
              <Link
                href={featured.href}
                className="w-full group relative bg-[#22363a] rounded-[12px] p-6 sm:p-10 lg:p-12 overflow-hidden isolate flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-xl border border-[#22363a]"
              >
                {/* Background Grain Texture Overlay set to 14% opacity */}
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

                {/* Top Tag */}
                <div className="relative z-10">
                  <span className="text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] font-medium text-[#a8c4be]">
                    FEATURED &middot; {featured.category}
                  </span>
                </div>

                {/* Mobile Layout (< lg) */}
                <div className="flex flex-col lg:hidden relative z-10 my-4">
                  {/* Centered Mint Circle */}
                  <div className="relative w-[190px] sm:w-[220px] h-[190px] sm:h-[220px] rounded-full bg-[#aecfbf] mx-auto flex items-center justify-center shadow-inner my-4">
                    {featured.logo && (
                      <div className="relative z-10 w-[150px] h-[55px] flex items-center justify-center">
                        <Image
                          src={featured.logo}
                          alt={featured.title}
                          className="object-contain max-h-[46px] max-w-[140px] w-auto h-auto"
                          priority
                        />
                      </div>
                    )}
                  </div>

                  {/* Heading & Description */}
                  <div className="flex flex-col text-left mt-2">
                    <h3 className="text-white font-bold text-[30px] sm:text-[36px] leading-[1.1] tracking-tight">
                      {featured.title}
                    </h3>
                    <p className="text-[#c2d4cf] text-[13.5px] sm:text-[14.5px] leading-[1.6] mt-2.5">
                      {featured.description}
                    </p>
                  </div>

                  {/* Arrow Button */}
                  <div className="flex justify-end mt-4">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#cce3d6] text-[#1c2825] flex items-center justify-center shadow-sm">
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
                    </div>
                  </div>
                </div>

                {/* Desktop Layout (>= lg) */}
                <div className="hidden lg:flex flex-col justify-between h-full relative z-10 min-h-[300px]">
                  <div className="flex flex-col max-w-[360px] my-auto pt-6">
                    <h3 className="text-white font-bold text-[40px] lg:text-[44px] leading-[1.1] tracking-tight">
                      {featured.title}
                    </h3>
                    <p className="text-[#c2d4cf] text-[14.5px] leading-[1.65] mt-3.5">
                      {featured.description}
                    </p>
                  </div>

                  {/* Bleeding mint circle on right */}
                  <div className="absolute -right-12 lg:-right-6 top-1/2 -translate-y-1/2 w-[350px] lg:w-[380px] h-[350px] lg:h-[380px] pointer-events-none flex items-center justify-center">
                    <div className="absolute w-[440px] lg:w-[480px] h-[440px] lg:h-[480px] rounded-full border border-white/10" />
                    <div className="relative w-full h-full rounded-full bg-[#aecfbf] flex items-center justify-center shadow-inner">
                      {featured.logo && (
                        <div className="relative z-10 w-[260px] max-w-[90%] h-[96px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={featured.logo}
                            alt={featured.title}
                            className="object-contain max-h-[64px] max-w-[260px] w-auto h-auto"
                            priority
                          />
                        </div>
                      )}
                      <div className="absolute bottom-8 right-12 w-[36px] h-[36px] rounded-full bg-[#cce3d6] group-hover:bg-white text-[#1c2825] flex items-center justify-center border-2 border-[#22363a] shadow-sm transition-transform duration-200 group-hover:scale-105 z-20">
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
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Top-Right Card: Home Depot */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="lg:col-span-4 flex"
            >
              <Link
                href={secondary.href}
                className="w-full group relative bg-white rounded-[12px] p-5 sm:p-8 flex flex-col justify-between min-h-[250px] sm:min-h-[350px] lg:min-h-[390px] text-left transition-all duration-300 shadow-sm hover:shadow-lg border border-[#DAD5CC] overflow-hidden"
              >
                {/* Center Logo Area */}
                <div className="my-auto py-4 sm:py-7 flex items-center justify-center w-full min-h-[110px] sm:min-h-[130px]">
                  {secondary.logo && (
                    <div className="w-[120px] sm:w-[150px] h-[85px] sm:h-[110px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={secondary.logo}
                        alt={secondary.title}
                        className="object-contain max-h-[80px] sm:max-h-[105px] max-w-[110px] sm:max-w-[135px] w-auto h-auto"
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Footer Row */}
                <div className="flex items-end justify-between w-full pt-3 sm:pt-4 border-t border-[#f0ede8] transition-colors">
                  <div className="flex flex-col items-start">
                    <h4 className="text-[16px] sm:text-[18px] font-bold text-[#1c1f1d] leading-tight">
                      {secondary.title}
                    </h4>
                    <p className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.14em] font-medium text-[#5a615e] mt-1">
                      {secondary.category}
                    </p>
                  </div>
                  <span className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full border border-[#dedcd7] group-hover:border-[#1c1f1d] group-hover:bg-[#1c1f1d] group-hover:text-white flex items-center justify-center text-[#555] transition-all shrink-0">
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
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Row: 4 Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bottomRow.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="flex"
              >
                <Link
                  href={item.href}
                  className="w-full group relative bg-white rounded-[12px] p-4 sm:p-7 flex flex-col justify-between h-[231px] lg:h-auto lg:min-h-[310px] text-left transition-all duration-300 shadow-sm hover:shadow-lg border border-[#DAD5CC] overflow-hidden"
                >
                  {/* Center Logo Slot */}
                  <div className="my-auto py-2 flex items-center justify-center w-full min-h-[90px] sm:min-h-[130px]">
                    {item.logo ? (
                      <div className="w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={item.logo}
                          alt={item.title}
                          className={`object-contain w-auto h-auto ${
                            item.id === 3
                              ? "max-h-[44px] sm:max-h-[70px] max-w-[70px] sm:max-w-[120px] rounded-[3px]"
                              : item.id === 2
                              ? "max-h-[44px] sm:max-h-[72px] max-w-[105px] sm:max-w-[185px]"
                              : item.id === 4
                              ? "max-h-[32px] sm:max-h-[56px] max-w-[110px] sm:max-w-[190px]"
                              : "max-h-[34px] sm:max-h-[58px] max-w-[110px] sm:max-w-[195px]"
                          }`}
                        />
                      </div>
                    ) : (
                      <h4 className="text-[16px] sm:text-[23px] font-bold text-[#1c1f1d] tracking-tight">
                        {item.title}
                      </h4>
                    )}
                  </div>

                  {/* Bottom Footer Row */}
                  <div className="flex items-end justify-between w-full pt-3 sm:pt-4 border-t border-[#f0ede8] transition-colors">
                    <div className="flex flex-col items-start min-w-0 pr-1">
                      <h4 className="text-[13.5px] sm:text-[17px] font-bold text-[#1c1f1d] leading-tight truncate w-full">
                        {item.title}
                      </h4>
                      <p className="text-[8.5px] sm:text-[10px] uppercase tracking-[0.12em] font-medium text-[#5a615e] mt-0.5 truncate w-full">
                        {item.category}
                      </p>
                    </div>
                    <span className="w-[26px] h-[26px] sm:w-[34px] sm:h-[34px] rounded-full border border-[#dedcd7] group-hover:border-[#1c1f1d] group-hover:bg-[#1c1f1d] group-hover:text-white flex items-center justify-center text-[#555] transition-all shrink-0">
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}