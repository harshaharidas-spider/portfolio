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

const EASE = [0.21, 0.47, 0.32, 0.98];

// Light card style from Figma: radius 12, 1px --line border, --white background
const lightCardStyle = {
  borderRadius: "12px",
  border: "1px solid var(--line, #DAD5CC)",
  background: "var(--white, #FFF)",
};

function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={`transition-transform duration-200 group-hover:translate-x-0.5 ${className}`}
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
  );
}

function ManoramaLogo({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 195 26"
      fill="none"
      className={className}
    >
      <path d="M42.9319 18.4088V11.4599C42.9319 9.89558 41.9392 9.36481 41.034 9.36481C40.1288 9.36481 39.1162 9.89558 39.1162 11.3934V18.4077H36.2466V11.4587C36.2466 9.89441 35.2527 9.36365 34.3498 9.36365C33.447 9.36365 32.4321 9.89441 32.4321 11.4587V18.4077H29.5601V6.91746H32.3633V7.97782C33.1133 7.20326 34.1714 6.78564 35.2306 6.78564C36.5114 6.78564 37.5484 7.24409 38.2752 8.24146C39.2469 7.22426 40.2839 6.78564 41.7176 6.78564C42.8654 6.78564 43.9001 7.15893 44.5417 7.80285C45.4691 8.7244 45.798 9.80692 45.798 11.0633V18.4088H42.9307H42.9319Z" fill="#22363A" />
      <path d="M53.8964 18.4086V17.4159C53.1218 18.1905 52.3939 18.5194 51.0722 18.5194C49.7506 18.5194 48.8197 18.1917 48.1361 17.5069C47.5214 16.8653 47.1901 15.9391 47.1901 14.9289C47.1901 13.0916 48.4476 11.5962 51.1154 11.5962H53.8287V11.0211C53.8287 9.76007 53.214 9.21181 51.6882 9.21181C50.5858 9.21181 50.0772 9.47894 49.4823 10.1602L47.6508 8.37425C48.7777 7.14124 49.8801 6.78662 51.8013 6.78662C55.0197 6.78662 56.696 8.15145 56.696 10.8438V18.4086H53.8964ZM53.8287 13.5547H51.5563C50.5205 13.5547 49.9477 14.0435 49.9477 14.8566C49.9477 15.6696 50.4761 16.1841 51.5995 16.1841C52.3939 16.1841 52.9013 16.1153 53.4088 15.6335C53.7167 15.3454 53.8287 14.8799 53.8287 14.1742V13.5547Z" fill="#22363A" />
      <path d="M65.5858 18.4088V11.4599C65.5858 9.89558 64.5954 9.36481 63.6891 9.36481C62.7827 9.36481 61.7713 9.89558 61.7713 11.4599V18.4088H58.9017V6.91746H61.7036V7.97782C62.4561 7.17993 63.5152 6.78564 64.5721 6.78564C65.72 6.78564 66.6438 7.15893 67.2854 7.80285C68.2116 8.7244 68.4566 9.80692 68.4566 11.0633V18.4088H65.587H65.5858Z" fill="#22363A" />
      <path d="M78.1609 17.1325C77.4552 17.879 76.2863 18.5428 74.5902 18.5428C72.8941 18.5428 71.7428 17.879 71.0358 17.1325C69.9988 16.0523 69.734 14.7516 69.734 12.653C69.734 10.5545 69.9988 9.27947 71.0358 8.19577C71.7428 7.44804 72.8871 6.78662 74.5902 6.78662C76.2933 6.78662 77.4552 7.4492 78.1609 8.19577C79.1968 9.27947 79.4604 10.5825 79.4604 12.653C79.4604 14.7236 79.198 16.0534 78.1609 17.1325ZM75.9329 9.87322C75.6016 9.54193 75.1583 9.36462 74.5902 9.36462C74.0221 9.36462 73.5917 9.54193 73.2627 9.87322C72.6678 10.4716 72.6001 11.4597 72.6001 12.6519C72.6001 13.844 72.6666 14.8566 73.2627 15.4562C73.5917 15.7851 74.014 15.9613 74.5902 15.9613C75.1665 15.9613 75.6016 15.7863 75.9329 15.4562C76.5278 14.8566 76.5931 13.844 76.5931 12.6519C76.5931 11.4597 76.5278 10.4716 75.9329 9.87322Z" fill="#22363A" />
      <path d="M87.1151 10.0496C86.6765 9.60745 86.3009 9.36481 85.5952 9.36481C84.7145 9.36481 83.7416 10.0297 83.7416 11.4809V18.4077H80.8731V6.91746H83.6727V8.01865C84.2268 7.35607 85.328 6.78564 86.5669 6.78564C87.6902 6.78564 88.4846 7.07144 89.279 7.86701L87.1151 10.0496Z" fill="#22363A" />
      <path d="M96.3585 18.4086V17.4159C95.5874 18.1905 94.8607 18.5194 93.5367 18.5194C92.2127 18.5194 91.2853 18.1917 90.6006 17.5069C89.9835 16.8653 89.6534 15.9391 89.6534 14.9289C89.6534 13.0916 90.9109 11.5962 93.5799 11.5962H96.2955V11.0211C96.2955 9.76007 95.6749 9.21181 94.1526 9.21181C93.0503 9.21181 92.5452 9.47894 91.9467 10.1602L90.1177 8.37425C91.241 7.14124 92.3445 6.78662 94.2646 6.78662C97.4854 6.78662 99.1617 8.15145 99.1617 10.8438V18.4086H96.3585ZM96.2944 13.5547H94.0197C92.985 13.5547 92.4087 14.0435 92.4087 14.8566C92.4087 15.6696 92.9418 16.1841 94.064 16.1841C94.8595 16.1841 95.367 16.1153 95.8732 15.6335C96.18 15.3454 96.2932 14.8799 96.2932 14.1742V13.5547H96.2944Z" fill="#22363A" />
      <path d="M114.295 18.4088V11.4599C114.295 9.89558 113.301 9.36481 112.396 9.36481C111.49 9.36481 110.477 9.89558 110.477 11.3934V18.4077H107.607V11.4587C107.607 9.89441 106.617 9.36365 105.713 9.36365C104.809 9.36365 103.793 9.89441 103.793 11.4587V18.4077H100.925V6.91746H103.726V7.97782C104.477 7.20326 105.535 6.78564 106.592 6.78564C107.872 6.78564 108.91 7.24409 109.637 8.24146C110.609 7.22426 111.646 6.78564 113.078 6.78564C114.226 6.78564 115.262 7.15893 115.901 7.80285C116.83 8.7244 117.16 9.80692 117.16 11.0633V18.4088H114.294H114.295Z" fill="#22363A" />
      <path d="M125.256 18.4086V17.4159C124.483 18.1905 123.758 18.5194 122.431 18.5194C121.105 18.5194 120.179 18.1917 119.5 17.5069C118.881 16.8653 118.548 15.9391 118.548 14.9289C118.548 13.0916 119.807 11.5962 122.475 11.5962H125.189V11.0211C125.189 9.76007 124.57 9.21181 123.049 9.21181C121.945 9.21181 121.436 9.47894 120.843 10.1602L119.012 8.37425C120.137 7.14124 121.243 6.78662 123.161 6.78662C126.385 6.78662 128.056 8.15145 128.056 10.8438V18.4086H125.256ZM125.19 13.5547H122.918C121.882 13.5547 121.308 14.0435 121.308 14.8566C121.308 15.6696 121.839 16.1841 122.965 16.1841C123.759 16.1841 124.266 16.1153 124.773 15.6335C125.078 15.3454 125.191 14.8799 125.191 14.1742V13.5547H125.19Z" fill="#22363A" />
      <path d="M20.9436 0H4.55991C2.04154 0 0 2.04154 0 4.55991V20.9436C0 23.462 2.04154 25.5036 4.55991 25.5036H20.9436C23.462 25.5036 25.5036 23.462 25.5036 20.9436V4.55991C25.5036 2.04154 23.462 0 20.9436 0Z" fill="#E92429" />
      <path d="M18.9607 17.3452H6.54309V19.6677H18.9607V17.3452Z" fill="white" />
      <path opacity="0.7" d="M18.9602 5.58594L15.869 10.8248L18.9602 16.0624V5.58594Z" fill="white" />
      <path d="M18.9605 5.58594H14.8543L12.7686 9.12165L10.6829 5.58594H6.54291L9.66684 10.7839L12.7803 16.0589L15.8587 10.8423V10.8411L18.95 5.60344L18.9605 5.58594Z" fill="white" />
      <path opacity="0.7" d="M6.54309 5.58594V16.0776L9.66702 10.7839L6.54309 5.58594Z" fill="white" />
      <path d="M138.906 6.71191C135.395 6.71191 132.747 9.27242 132.747 12.667C132.747 16.0615 135.395 18.622 138.906 18.622C142.417 18.622 145.065 16.0615 145.065 12.667C145.065 9.27242 142.417 6.71191 138.906 6.71191ZM138.906 16.5083C136.726 16.5083 135.081 14.8565 135.081 12.667C135.081 10.4774 136.726 8.82564 138.906 8.82564C141.086 8.82564 142.731 10.4774 142.731 12.667C142.731 14.8565 141.086 16.5083 138.906 16.5083Z" fill="#22363A" />
      <path d="M153.847 14.3006L147.842 6.99116L147.78 6.9165H146.235V18.4172H148.502V11.0331L154.508 18.3425L154.57 18.4172H156.114V6.9165H153.847V14.3006Z" fill="#22363A" />
      <path d="M160.334 6.9165H158.032V18.4172H165.335V16.4061H160.334V6.9165Z" fill="#22363A" />
      <path d="M166.969 8.87742H168.762V16.4574H166.969V18.4172H172.872V16.4574H171.063V8.87742H172.872V6.9165H166.969V8.87742Z" fill="#22363A" />
      <path d="M182.212 14.3006L176.207 6.99116L176.145 6.9165H174.6V18.4172H176.867V11.0331L182.873 18.3425L182.934 18.4172H184.479V6.9165H182.212V14.3006Z" fill="#22363A" />
      <path d="M194.4 8.92758V6.9165H186.397V18.4172H194.4V16.4061H188.699V13.6041H193.154V11.6619H188.699V8.92758H194.4Z" fill="#22363A" />
    </svg>
  );
}

export default function CaseStudies() {
  const featured = caseStudies[0];
  const secondary = caseStudies[1];
  const bottomRow = caseStudies.slice(2);

  return (
    <section
      id="case-studies"
      className="w-full bg-[#f4f2ee] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* ───────── Header ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Left: eyebrow + heading */}
          <div className="flex flex-col items-start max-w-[820px]">
            <p
              className="mb-6"
              style={{
                color: "var(--ink-muted, #6F726E)",
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                letterSpacing: "1.1px",
                textTransform: "uppercase",
              }}
            >
              CASE STUDIES
            </p>
            <h2
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "clamp(34px, 6vw, 48px)", // 48px from 800px up
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "104%",
                letterSpacing: "-0.04em", // = -1.92px at 48px
              }}
            >
              <span style={{ color: "var(--ink, #1C1F1D)" }}>Selected work, </span>
              <span style={{ color: "var(--ink-faint, #A9AAA4)" }}>from Home</span>
              <br />
              <span style={{ color: "var(--ink-faint, #A9AAA4)" }}>
                Depot to Manorama Online.
              </span>
            </h2>
          </div>

          {/* Right: description + CTA */}
          <div className="flex flex-col items-start max-w-[400px] lg:pt-[37px]">
            <p
              style={{
                color: "var(--ink-muted, #6F726E)",
                fontFamily: "Roboto, sans-serif",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%",
              }}
            >
              Six engagements across architecture, marketing and e-commerce. Full
              write-ups are being prepared.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2.5 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c2825] text-[13.5px] font-medium h-[40px] px-6 rounded-full transition-colors shadow-sm mt-8"
              >
                <span>Discuss your project</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* ───────── Cards (12px gaps everywhere) ───────── */}
        <div className="flex flex-col gap-[12px]">
          {/* Top row: featured (888 x 460) + Home Depot */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[12px] lg:h-[460px]">
            {/* Featured: Manorama Online */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="flex"
            >
              <Link
                href={featured.href}
                className="group relative w-full h-full min-h-[460px] lg:min-h-0 overflow-hidden isolate flex flex-col justify-between gap-6 p-6 sm:p-10 shadow-sm transition-shadow duration-300 hover:shadow-xl"
                style={{
                  background: "#22363a",
                  border: "1px solid #22363a",
                  borderRadius: "12px",
                }}
              >
                {/* Grain overlay */}
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

                {/* Top tag */}
                <div className="relative z-10">
                  <span
                    style={{
                      color: "var(--on-dark-muted, #A3B1AE)",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "11px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      letterSpacing: "1.1px",
                      textTransform: "uppercase",
                    }}
                  >
                    FEATURED &middot; {featured.category}
                  </span>
                </div>

                {/* Circles: 356px ring (top 20 / right 26) + 272px inner circle on desktop */}
                <div
                  className="relative z-10 mx-auto w-[220px] h-[220px] sm:w-[272px] sm:h-[272px] lg:absolute lg:mx-0 lg:top-[20px] lg:right-[26px] lg:w-[356px] lg:h-[356px] flex items-center justify-center pointer-events-none"
                >
                  {/* Outer ring: 356px, 1px jade border, 30% opacity */}
                  <div
                    className="hidden lg:block absolute inset-0"
                    style={{
                      borderRadius: "356px",
                      border: "1px solid var(--jade, #AECFBF)",
                      opacity: 0.3,
                    }}
                  />
                  {/* Inner circle: 272px, #AECFBF */}
                  <div
                    className="relative w-full h-full lg:w-[272px] lg:h-[272px] flex items-center justify-center"
                    style={{ borderRadius: "272px", background: "#AECFBF" }}
                  >
                    {/* Logo 194.4 x 25.5 -> 38.8px side / 123.25px top & bottom spacing */}
                    <ManoramaLogo className="w-[150px] sm:w-[195px] h-auto transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </div>

                {/* Title + description */}
                <div className="relative z-10 flex flex-col max-w-[420px] pb-14 lg:pb-0">
                  <h3
                    style={{
                      color: "var(--on-dark, #EEF0EC)",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "clamp(40px, 8vw, 64px)", // 64px from 800px up
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      letterSpacing: "-0.04em", // = -2.56px at 64px
                    }}
                  >
                    {featured.title}
                  </h3>
                  <p
                    className="mt-4"
                    style={{
                      color: "var(--on-dark-muted, #A3B1AE)",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "150%",
                    }}
                  >
                    {featured.description}
                  </p>
                </div>

                {/* Arrow button */}
                <span className="absolute z-20 bottom-6 right-6 sm:bottom-10 sm:right-10 w-[48px] h-[48px] rounded-full bg-[#AECFBF] group-hover:bg-white text-[#1c2825] flex items-center justify-center shadow-sm transition-colors duration-200">
                  <ArrowIcon className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>

            {/* Home Depot */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="flex"
            >
              <Link
                href={secondary.href}
                className="group w-full h-full min-h-[280px] lg:min-h-0 p-5 sm:p-6 flex flex-col text-left shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                style={lightCardStyle}
              >
                <div className="flex-1 flex items-center justify-center py-6">
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={secondary.logo}
                      alt={secondary.title}
                      className="object-contain max-h-[105px] max-w-[135px] w-auto h-auto"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-between w-full pt-4 border-t border-[color:var(--line,#DAD5CC)]">
                  <div className="flex flex-col items-start">
                    <h4 className="text-[16px] sm:text-[17px] font-semibold text-[#1c1f1d] leading-tight">
                      {secondary.title}
                    </h4>
                    <p className="text-[10px] uppercase tracking-[0.14em] font-medium text-[#6F726E] mt-1">
                      {secondary.category}
                    </p>
                  </div>
                  <span className="w-[36px] h-[36px] rounded-full border border-[#dedcd7] group-hover:border-[#1c1f1d] group-hover:bg-[#1c1f1d] group-hover:text-white flex items-center justify-center text-[#555] transition-all shrink-0">
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom row: 4 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[12px]">
            {bottomRow.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="flex"
              >
                <Link
                  href={item.href}
                  className="group w-full h-[231px] sm:h-[280px] lg:h-[320px] p-4 sm:p-6 flex flex-col text-left shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  style={lightCardStyle}
                >
                  <div className="flex-1 flex items-center justify-center py-2">
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
                  </div>

                  <div className="flex items-end justify-between w-full pt-3 sm:pt-4 border-t border-[color:var(--line,#DAD5CC)]">
                    <div className="flex flex-col items-start min-w-0 pr-1">
                      <h4 className="text-[13.5px] sm:text-[16px] font-semibold text-[#1c1f1d] leading-tight truncate w-full">
                        {item.title}
                      </h4>
                      <p className="text-[8.5px] sm:text-[10px] uppercase tracking-[0.12em] font-medium text-[#6F726E] mt-0.5 truncate w-full">
                        {item.category}
                      </p>
                    </div>
                    <span className="w-[26px] h-[26px] sm:w-[36px] sm:h-[36px] rounded-full border border-[#dedcd7] group-hover:border-[#1c1f1d] group-hover:bg-[#1c1f1d] group-hover:text-white flex items-center justify-center text-[#555] transition-all shrink-0">
                      <ArrowIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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