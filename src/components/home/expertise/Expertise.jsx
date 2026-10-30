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
    title: "Build what your business actually needs.",
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
    name: "E-commerce Solutions",
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
  const [selectedId, setSelectedId] = useState(3);
  const [hoveredId, setHoveredId] = useState(null);

  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollTopRef = useRef(0);

  const [thumbTop, setThumbTop] = useState(0);
  const thumbHeight = 64;
  const trackHeight = 324; // Exact Figma: 540px - 108px top - 108px bottom
  const itemHeight = 54; // Each item height in px

  const activeId = hoveredId ?? selectedId;
  const activeItem =
    expertiseData.find((item) => item.id === activeId) || expertiseData[2];

  const updateThumbPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

    const currentIndex = Math.min(
      Math.round(scrollTop / itemHeight),
      expertiseData.length - 1
    );
    const currentItem = expertiseData[currentIndex];
    if (currentItem && currentItem.id !== selectedId && !isDraggingRef.current) {
      setSelectedId(currentItem.id);
    }

    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) {
      setThumbTop(0);
      return;
    }
    const maxThumbTop = trackHeight - thumbHeight;
    const currentTop = (scrollTop / maxScroll) * maxThumbTop;
    setThumbTop(Math.max(0, Math.min(maxThumbTop, currentTop)));
  }, [thumbHeight, trackHeight, selectedId]);

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

  const scrollToItem = (id) => {
    setSelectedId(id);
    setHoveredId(id);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: (id - 1) * itemHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="expertise"
      onMouseLeave={() => setHoveredId(null)}
      className="relative w-full bg-[#22363A] overflow-hidden isolate h-auto lg:h-[540px] lg:min-h-[540px] lg:max-h-[540px] py-12 lg:py-0 select-none"
    >
      <span id="services" className="-top-20 relative block" aria-hidden="true" />
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

      {/* Full-height vertical divider line running through the exact 50% middle */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#385157] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Container: Fixed 1440px Width x 540px Height Canvas */}
      <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto px-6 sm:px-10 lg:px-[60px] flex flex-col justify-between lg:block">
        {/* Mobile View (< 1024px) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:hidden flex flex-col my-auto py-4"
        >
          <div className="flex items-center justify-between w-full mb-6">
            <span
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1.1px",
                textTransform: "uppercase",
              }}
            >
              AREAS OF EXPERTISE
            </span>
            <span
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1.1px",
                textTransform: "uppercase",
              }}
            >
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
              style={{
                color: "#AECFBF",
                fontFamily: "Roboto, sans-serif",
                fontSize: "32px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "110%",
                letterSpacing: "-1.2px",
              }}
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
              className="mt-4"
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%",
              }}
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
                  onClick={() => scrollToItem(item.id)}
                  className={`inline-flex items-center px-3.5 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer select-none ${
                    isSelected
                      ? "bg-[#aecfbf] text-[#1c2825] shadow-sm scale-[1.02]"
                      : "border border-[#384d49] bg-[#1d2d2a]/50 text-[#b4c3bf] hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono mr-2 ${
                      isSelected ? "text-[#38534b] font-medium" : "text-[#8fa6a1]"
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
              className="group w-full inline-flex items-center justify-center gap-[12px] bg-[#AECFBF] hover:bg-[#9ec4b3] text-[#1C1F1D] rounded-[100px] transition-colors shadow-sm"
              style={{
                padding: "12px 16px 12px 20px",
                borderRadius: "100px",
                background: "#AECFBF",
              }}
            >
              <span
                style={{
                  color: "#1C1F1D",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Book a consultation
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="#1C1F1D"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Desktop View (Fixed 1440px x 540px Frame matching Figma) */}
        <div className="hidden lg:block h-full relative">
          {/* Top Tag: AREAS OF EXPERTISE (left: 60px, top: 52px) */}
          <p
            className="absolute select-none"
            style={{
              left: "60px",
              top: "52px",
              color: "#A3B1AE",
              fontFamily: "Roboto, sans-serif",
              fontSize: "11px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "1.1px",
              textTransform: "uppercase",
            }}
          >
            AREAS OF EXPERTISE
          </p>

          {/* Left Column Scrollable Services List (left: 60px, top: 108px, height: 324px, width: calc(50% - 100px)) */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="absolute overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
            style={{
              left: "60px",
              top: "108px",
              height: "324px",
              width: "calc(50% - 110px)",
            }}
          >
            <ul className="w-full flex flex-col py-1">
              {expertiseData.map((item) => {
                const isActive = activeId === item.id;

                return (
                  <li key={item.id} className="w-full h-[54px] flex items-center">
                    <button
                      type="button"
                      onClick={() => scrollToItem(item.id)}
                      onMouseEnter={() => {
                        setHoveredId(item.id);
                        scrollToItem(item.id);
                      }}
                      className="group flex items-center text-left w-full h-full focus:outline-none cursor-pointer"
                    >
                      {/* Number */}
                      <span
                        className={`text-[13px] w-[20px] flex-none text-left select-none transition-colors duration-150 ${
                          isActive
                            ? "text-[#EEF0EC] font-medium"
                            : "text-[#7E938F] group-hover:text-white"
                        }`}
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        {item.id}
                      </span>

                      {/* Exact 40px Spacing between Number and Text from Figma Redline */}
                      <div className="w-[40px] flex-none" aria-hidden="true" />

                      {/* Service Name: 40px Roboto 500, 120% (48px) line-height, -0.8px letter-spacing, #EEF0EC when active */}
                      <span
                        className="whitespace-nowrap transition-all duration-150"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: isActive ? "40px" : "32px",
                          lineHeight: "120%", // 48px when 40px
                          letterSpacing: isActive ? "-0.8px" : "-0.6px",
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#EEF0EC" : "#7E938F",
                        }}
                      >
                        {item.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Custom Scrollbar: Exactly 30px gap to middle vertical divider, top 108px, bottom 108px, height 324px */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            className="absolute flex items-center justify-center cursor-pointer select-none group"
            style={{
              left: "calc(50% - 30px)",
              top: "108px",
              height: "324px",
              width: "14px",
            }}
            aria-label="Scroll services"
          >
            {/* Track Line: 1px background #385157 */}
            <div className="w-[1px] h-full bg-[#385157]" />
            {/* Thumb: 3px wide with smooth drag & hover */}
            <div
              onMouseDown={handleThumbMouseDown}
              className="absolute w-[3px] bg-[#5A7A80] hover:bg-[#AECFBF] rounded-full cursor-grab active:cursor-grabbing transition-colors duration-150"
              style={{
                height: `${thumbHeight}px`,
                top: `${thumbTop}px`,
              }}
            />
          </div>

          {/* Bottom Notice: SCROLL FOR ALL 13 SERVICES (left: 120px aligned under service title column, top: 448px) */}
          <p
            className="absolute select-none"
            style={{
              left: "120px",
              bottom: "48px",
              color: "#A3B1AE",
              fontFamily: "Roboto, sans-serif",
              fontSize: "11px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "1.1px",
              textTransform: "uppercase",
            }}
          >
            SCROLL FOR ALL 13 SERVICES
          </p>

          {/* Right Column: Starts exactly at left: calc(50% + 74px), matching Figma 74px gap from middle line */}
          <div
            className="absolute top-0 bottom-0 right-[60px]"
            style={{
              left: "calc(50% + 74px)",
              maxWidth: "540px",
            }}
          >
            {/* Heading: Positioned above description box */}
            <div
              className="absolute w-full"
              style={{
                top: "165px",
                maxWidth: "500px",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeItem.id + "-desktop-title"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    color: "#AECFBF",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    lineHeight: "100%", // 40px
                    letterSpacing: "-1.6px",
                  }}
                >
                  {activeItem.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Description Box: Exact Figma Specs (top: 279px, bottom distance: 131px to bottom of 540px frame) */}
            <div
              className="absolute w-full"
              style={{
                top: "279px",
                maxWidth: "500px",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeItem.id + "-desktop-desc"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    color: "#A3B1AE",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "17px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "150%", // 25.5px
                  }}
                >
                  {activeItem.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Right: Consultation Button (display: inline-flex, padding: 12px 16px 12px 20px, gap: 12px, border-radius: 100px, background: #AECFBF) */}
            <div
              className="absolute right-0 flex justify-end items-center"
              style={{
                bottom: "48px",
              }}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="group inline-flex items-center transition-all shadow-sm"
                  style={{
                    display: "inline-flex",
                    padding: "12px 16px 12px 20px",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "100px",
                    background: "#AECFBF",
                  }}
                >
                  <span
                    style={{
                      color: "#1C1F1D",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                    }}
                  >
                    Book a consultation
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="#1C1F1D"
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
          </div>
        </div>
      </div>
    </section>
  );
}
