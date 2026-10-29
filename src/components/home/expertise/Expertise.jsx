"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const expertiseData = [
  {
    id: 1,
    name: "Domain Names",
    title: "Your domain name is your digital identity.",
    description:
      "Follow the best practices to reserve and hold your brand domain names to protect your business interests now and in future. You may end up paying a huge price if you lose your brand domain.",
  },
  {
    id: 2,
    name: "Web Hosting",
    title: "Choose the right hosting for your website.",
    description:
      "Choose the right hosting provider to ensure smooth running of your website and ensure disaster recovery. Cheap plans may work for some time but only until something goes wrong.",
  },
  {
    id: 3,
    name: "Website Development",
    title: "Choose the right website development solution.",
    description:
      "Don't get carried away with the cheap offers from freelancers and don't fall into the trap of very expensive website proposals. Choose the right option that suits your requirements.",
  },
  {
    id: 4,
    name: "Search Engine Optimisation",
    title: "Build your website for better search visibility.",
    description:
      "I started building and promoting websites even before Google was incorporated. Making sure your website adheres to the webmaster guidelines to ensure best results from search engines.",
  },
  {
    id: 5,
    name: "Ecommerce Solutions",
    title: "Choose the right solution for online selling.",
    description:
      "Whether it is a simple e-commerce website or an ERP integrated sophisticated e-commerce platform, I can help you choose the right solutions and setup your online selling platform.",
  },
  {
    id: 6,
    name: "Software Development",
    title: "Experience backed by technical expertise.",
    description:
      "I hold a Masters Degree in Computer Applications, achieved with a University Rank in 1997. I have been a software engineer by profession. I quit my primary job in the USA as a software architect in 2011 but I still love to get my hands dirty on writing code myself.",
  },
  {
    id: 7,
    name: "CRM Solutions",
    title: "Find the right CRM for your business.",
    description:
      "Are you confused which CRM to choose from? Do you get too many calls from the vendors? Leave it to me to choose the right option that perfectly meets your requirements.",
  },
  {
    id: 8,
    name: "Copyright Issues",
    title: "Protect your content and online assets.",
    description:
      "I am not a lawyer by profession or education but I do have sound knowledge on online copyright issues, gained from my past 20 years of online experience and also from my lawsuit with Microsoft on domain disputes with them.",
  },
  {
    id: 9,
    name: "Lead Generation",
    title: "Generate qualified leads for your business.",
    description:
      "Generating qualified Leads is the key to any business. My decade long expertise in generating leads for our clients will be useful in implementing the right strategies without having to go for the trial and error method.",
  },
  {
    id: 10,
    name: "Digital Marketing Agencies",
    title: "Choose the right digital marketing agency.",
    description:
      "I'm quite familiar with the digital marketing agencies and will be able to ask the right questions before partnering with any agency for you. I can help you choose the right agency for you after verifying their track record and claims at the best cost.",
  },
  {
    id: 11,
    name: "Content Generation",
    title: "Content is the King.",
    description:
      "Content is the King. That has been the motto of webmasters for more than 2 decades now and it has never changed. Building the right content on your website can help you generate natural leads as well as protect you from copyright infringement and other legal issues.",
  },
  {
    id: 12,
    name: "Branding Collaterals",
    title: "Build a strong and consistent brand identity.",
    description:
      "Your brand is your identity. Showcase it to the world through the perfect logo and other branding collaterals. I have been working with brands and helping them build their brand identity by choosing the right brand collaterals.",
  },
  {
    id: 13,
    name: "Trademark Protection",
    title: "Protect your brand identity for the long run.",
    description:
      "Don't lose your identity to someone who accidentally or intentionally choose your brand assets. I can help you protect your brand identity by giving you the right recommendations to ensure your identity is protected for the long run.",
  },
];

export default function Expertise() {
  // Default to Item 3 (Website Development) as shown in reference image
  const [selectedId, setSelectedId] = useState(3);
  const [hoveredId, setHoveredId] = useState(null);

  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  const [thumbTop, setThumbTop] = useState(0);
  const thumbHeight = 58;
  const trackHeight = 288;

  const activeId = hoveredId ?? selectedId;
  const activeItem =
    expertiseData.find((item) => item.id === activeId) || expertiseData[2];

  const updateThumbPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) {
      setThumbTop(0);
      return;
    }
    const maxThumbTop = trackHeight - thumbHeight;
    const currentTop = (scrollTop / maxScroll) * maxThumbTop;
    setThumbTop(Math.max(0, Math.min(maxThumbTop, currentTop)));
  }, [thumbHeight, trackHeight]);

  const handleScroll = () => {
    updateThumbPosition();
  };

  useEffect(() => {
    updateThumbPosition();
  }, [updateThumbPosition]);

  const handleTrackClick = (e) => {
    if (!scrollContainerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const maxThumbTop = trackHeight - thumbHeight;
    const targetThumbTop = Math.max(0, Math.min(maxThumbTop, clickY - thumbHeight / 2));
    const { scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    scrollContainerRef.current.scrollTo({
      top: (targetThumbTop / maxThumbTop) * maxScroll,
      behavior: "smooth",
    });
  };

  const handleThumbMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    if (scrollContainerRef.current) {
      startScrollTopRef.current = scrollContainerRef.current.scrollTop;
    }

    const onMouseMove = (moveEvent) => {
      if (!isDraggingRef.current || !scrollContainerRef.current) return;
      const deltaY = moveEvent.clientY - startYRef.current;
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;
      const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
      scrollContainerRef.current.scrollTop = startScrollTopRef.current + scrollDelta;
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <section
      id="expertise"
      onMouseLeave={() => setHoveredId(null)}
      className="relative w-full bg-[#22363A] overflow-hidden py-16 sm:py-20 lg:py-28"
    >
      <span id="services" className="-top-20 relative block" aria-hidden="true" />
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

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px]">
        {/* Mobile View (< 1024px) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:hidden flex flex-col"
        >
          <div className="flex items-center justify-between w-full mb-6">
            <span className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-[#b3ccc0]">
              AREAS OF EXPERTISE
            </span>
            <span className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-[#b3ccc0]">
              13 SERVICES
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.h3
              key={activeItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="text-[#aecfbf] font-normal text-[30px] sm:text-[36px] leading-[1.18] tracking-tight"
            >
              {activeItem.title}
            </motion.h3>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={activeItem.id + "-desc"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-4 text-[14.5px] text-[#8ea29e] leading-[1.65]"
            >
              {activeItem.description}
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-wrap gap-2 sm:gap-2.5 my-8">
            {expertiseData.map((item) => {
              const isSelected = item.id === selectedId;
              const formattedNum = String(item.id).padStart(2, "0");

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setHoveredId(item.id);
                  }}
                  className={`inline-flex items-center px-3.5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer select-none ${
                    isSelected
                      ? "bg-[#aecfbf] text-[#1c2825] shadow-sm scale-[1.02]"
                      : "border border-[#384d49] bg-[#1d2d2a]/50 text-[#a3b1ae] hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono mr-2 ${
                      isSelected ? "text-[#38534b] font-medium" : "text-[#5d736f]"
                    }`}
                  >
                    {formattedNum}
                  </span>
                  <span
                    className={`text-[13px] ${
                      isSelected ? "font-semibold text-[#1c2825]" : "font-normal"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full pt-1">
            <Link
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c2825] text-[14.5px] font-medium h-[52px] px-6 rounded-full transition-colors shadow-sm"
            >
              <span>Book a consultation</span>
              <svg
                className="w-4 h-4 text-[#1c2825]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Desktop View (>= 1024px) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="hidden lg:flex flex-row items-stretch justify-between gap-12 lg:gap-14 xl:gap-20"
        >
          {/* Left Column: Areas of Expertise with scrollable 6-row viewport */}
          <div className="w-full lg:w-[560px] xl:w-[580px] flex-none flex flex-col justify-between">
            <p className="text-[11.5px] uppercase tracking-[0.14em] font-semibold text-[#b3ccc0] mb-8 lg:mb-10">
              AREAS OF EXPERTISE
            </p>

            <div className="relative flex items-stretch gap-4 sm:gap-6">
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full h-[288px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-2 select-none"
              >
                <ul className="w-full flex flex-col">
                  {expertiseData.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                      <li key={item.id} className="w-full h-[48px] flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedId(item.id);
                            setHoveredId(item.id);
                          }}
                          onMouseEnter={() => setHoveredId(item.id)}
                          className="group flex items-center text-left w-full h-[48px] focus:outline-none cursor-pointer"
                        >
                          <span
                            className={`text-[13px] sm:text-[14px] w-[36px] sm:w-[44px] flex-none text-left select-none transition-colors duration-150 ${
                              isActive
                                ? "text-white/80 font-medium"
                                : "text-[#5e7470] group-hover:text-[#a3b1ae]"
                            }`}
                          >
                            {item.id}
                          </span>

                          <span
                            className={`text-[20px] sm:text-[28px] md:text-[34px] lg:text-[40px] leading-[120%] tracking-[-0.02em] whitespace-nowrap transition-all duration-150 ${
                              isActive
                                ? "text-white font-medium translate-x-1"
                                : "text-[#A3B1AE] font-normal group-hover:text-white"
                            }`}
                          >
                            {item.name}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Custom Figma Scrollbar */}
              <div
                ref={trackRef}
                onClick={handleTrackClick}
                className="relative w-[14px] h-[288px] flex items-center justify-center flex-none cursor-pointer select-none group"
                aria-label="Scroll services"
              >
                <div className="w-[1px] h-full bg-white/15" />
                <div
                  onMouseDown={handleThumbMouseDown}
                  className="absolute w-[2.5px] bg-[#aecfbf] rounded-full cursor-grab active:cursor-grabbing hover:bg-white transition-colors duration-150"
                  style={{
                    height: `${thumbHeight}px`,
                    top: `${thumbTop}px`,
                  }}
                />
              </div>
            </div>

            {/* Bottom Scroll Notice - Updated with darker, bolder text */}
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#c5ddd3] mt-8 lg:mt-10 select-none">
              SCROLL FOR ALL 13 SERVICES
            </p>
          </div>

          {/* Center Vertical Divider Line */}
          <div
            className="hidden lg:block w-[1px] bg-white/10 self-stretch my-0 flex-none"
            aria-hidden="true"
          />

          {/* Right Column: Dynamic Preview & Consultation Button */}
          <div className="w-full lg:flex-1 flex flex-col justify-between self-stretch pl-0 lg:pl-10 xl:pl-16 min-h-[360px] lg:min-h-[440px]">
            <div className="my-auto py-6 lg:py-0">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeItem.id + "-desktop-title"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-[#aecfbf] font-normal text-[28px] sm:text-[34px] md:text-[38px] lg:text-[42px] leading-[1.2] max-w-[500px]"
                >
                  {activeItem.title}
                </motion.h3>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeItem.id + "-desktop-desc"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 sm:mt-6 text-[14.5px] sm:text-[15.5px] text-[#93a7a3] leading-[1.7] max-w-[460px]"
                >
                  {activeItem.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex justify-start lg:justify-end items-end pt-8 lg:pt-0">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 bg-[#aecfbf] hover:bg-[#9ec4b3] text-[#1c2825] text-[13.5px] font-medium h-[44px] px-7 rounded-full transition-colors shadow-sm"
                >
                  <span>Book a consultation</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}