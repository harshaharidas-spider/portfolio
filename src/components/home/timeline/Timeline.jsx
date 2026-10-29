"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const chapters = [
  {
    id: 0,
    year: "1996",
    dialYear: "1996",
    dialLabel: "THE BEGINNING",
    chapterNum: "CHAPTER 01",
    title: "Starts out in IT",
    description:
      "First steps into software engineering, networking, and the dawn of commercial internet technologies.",
    bottomLabel: "Starts out in IT",
  },
  {
    id: 1,
    year: "LATE '90S",
    dialYear: "LATE '90S",
    dialLabel: "THE FIRST WORDS",
    chapterNum: "CHAPTER 02",
    title: "Starts blogging",
    description:
      "Sharing early tech insights, developer tutorials, and building an authoritative online community.",
    bottomLabel: "Starts blogging",
  },
  {
    id: 2,
    year: "2005",
    dialYear: "2005",
    dialLabel: "THE FOUNDING",
    chapterNum: "CHAPTER 03",
    title: "Founds\nSpiderWorks",
    description: "Technology, creativity and marketing, under one roof.",
    bottomLabel: "Founds SpiderWorks",
  },
  {
    id: 3,
    year: "2011",
    dialYear: "2011",
    dialLabel: "FULL COMMITMENT",
    chapterNum: "CHAPTER 04",
    title: "Leaves architecture",
    description:
      "Transitioning fully into digital entrepreneurship, enterprise IT consultancy, and scaling online ventures.",
    bottomLabel: "Leaves architecture",
  },
  {
    id: 4,
    year: "TODAY",
    dialYear: "TODAY",
    dialLabel: "PRESENT DAY",
    chapterNum: "CHAPTER 05",
    title: "Founder,\nmentor",
    description:
      "Advising enterprise leadership, mentoring tech founders, and shaping sustainable growth strategies.",
    bottomLabel: "Founder, mentor",
  },
];

// Milestone angles on the dial arc relative to 0deg (horizontal right pointer)
const MILESTONE_ANGLES = [-36, -18, 0, 18, 36];

// Dynamic font sizing for inner dial text so long labels never overflow onto the wheel
const getDesktopDialYearClass = (text) => {
  const len = (text || "").length;
  if (len <= 4) return "text-[82px] xl:text-[98px]";
  if (len <= 5) return "text-[64px] xl:text-[76px]";
  if (len <= 7) return "text-[46px] xl:text-[54px]";
  return "text-[36px] xl:text-[44px]";
};

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(2); // Default to 2005
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const currentDragDelta = useRef(0);

  const isMobileDragging = useRef(false);
  const mobileDragStartX = useRef(0);
  const mobileDragDeltaX = useRef(0);

  const currentChapter = chapters[activeIndex];
  // Rotation angle for desktop wheel: rotates active milestone to 0deg (3 o'clock position)
  const dialRotation = (2 - activeIndex) * 18;
  const mobileDialRotation = 90 + (2 - activeIndex) * 18;

  // Button navigation
  const handleNavigate = (direction) => {
    setActiveIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next >= chapters.length) return chapters.length - 1;
      return next;
    });
  };

  // Jump to specific milestone
  const handleSelectMilestone = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  // Desktop drag interaction on dial
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragStartY.current = e.clientY;
    currentDragDelta.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    currentDragDelta.current = e.clientY - dragStartY.current;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = 30;
    if (currentDragDelta.current > threshold && activeIndex > 0) {
      handleSelectMilestone(activeIndex - 1);
    } else if (currentDragDelta.current < -threshold && activeIndex < chapters.length - 1) {
      handleSelectMilestone(activeIndex + 1);
    }
    currentDragDelta.current = 0;
  };

  // Mobile horizontal drag interaction
  const handleMobilePointerDown = (e) => {
    isMobileDragging.current = true;
    mobileDragStartX.current = e.clientX;
    mobileDragDeltaX.current = 0;
  };

  const handleMobilePointerMove = (e) => {
    if (!isMobileDragging.current) return;
    mobileDragDeltaX.current = e.clientX - mobileDragStartX.current;
  };

  const handleMobilePointerUp = () => {
    if (!isMobileDragging.current) return;
    isMobileDragging.current = false;
    const threshold = 25;
    if (mobileDragDeltaX.current > threshold && activeIndex > 0) {
      handleSelectMilestone(activeIndex - 1);
    } else if (mobileDragDeltaX.current < -threshold && activeIndex < chapters.length - 1) {
      handleSelectMilestone(activeIndex + 1);
    }
    mobileDragDeltaX.current = 0;
  };

  return (
    <motion.section
      id="story"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full bg-[#22363A] overflow-hidden isolate min-h-[680px] lg:min-h-[760px] py-10 lg:py-14 flex flex-col justify-between select-none"
    >
      <span id="about-tony" className="-top-20 relative block" aria-hidden="true" />

      {/* Background Grain Texture Overlay set to 14% opacity */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/nw%20graints.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
          opacity: 0.14,
        }}
        aria-hidden="true"
      />

      {/* Top Header Row */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] pt-2 lg:pt-4 items-start justify-end"
      >
        <div className="text-right flex flex-col items-end">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#7e938f] mb-1">
            DRAG THE DIAL &rarr;
          </span>
          <h2 className="text-[#e2ece9] text-[17px] sm:text-[19px] lg:text-[21px] font-normal leading-snug tracking-tight">
            From a late &apos;90s blog to a company of its own.
          </h2>
        </div>
      </motion.div>

      {/* Center Interactive Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] my-auto py-4 sm:py-6 lg:py-8 w-full">
        {/* Mobile Interactive Flow (< 1024px) */}
        <div className="lg:hidden flex flex-col w-full">
          <div className="text-left w-full mb-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#7e938f] block mb-1">
              DRAG THE DIAL &rarr;
            </span>
            <h2 className="text-[#e2ece9] text-[18px] sm:text-[20px] font-normal leading-snug tracking-tight">
              From a late &apos;90s blog to a company of its own.
            </h2>
          </div>

          <div
            className="relative -mx-6 sm:-mx-10 w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] h-[195px] sm:h-[215px] overflow-hidden select-none cursor-grab active:cursor-grabbing my-4"
            onPointerDown={handleMobilePointerDown}
            onPointerMove={handleMobilePointerMove}
            onPointerUp={handleMobilePointerUp}
          >
            {/* Glow Background Layer on Mobile - concentric behind wheel rim at 12 o'clock */}
            <div
              className="absolute pointer-events-none z-[3]"
              style={{
                width: "684px",
                height: "684px",
                left: "calc(50% - 342px)",
                top: "6px",
                transform: "rotate(-90deg)",
                transformOrigin: "342px 342px",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/nwglow.png"
                  alt="Wheel Glow Background"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Rotatable Wheel Layer on Mobile - 100% concentric with glow */}
            <div
              className="absolute pointer-events-none z-[4]"
              style={{
                width: "720px",
                height: "720px",
                left: "calc(50% - 360px)",
                top: "-12px",
                transform: `rotate(${mobileDialRotation}deg)`,
                transformOrigin: "360px 360px",
                transition: "transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/nwwheel.png"
                  alt="Rotatable Wheel"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Mobile Pointer Badge */}
            <div
              className="absolute z-[10] pointer-events-none select-none flex items-center justify-center"
              style={{
                top: "6px",
                left: "calc(50% - 28px)",
                width: "56px",
                height: "56px",
              }}
            >
              <div className="absolute -inset-1 rounded-full border border-dashed border-[#d8e4c6]/40 pointer-events-none" />
              <div className="w-full h-full rounded-full bg-[#d8e4c6] border-[2.5px] border-[#1d2d30] shadow-[0_4px_14px_rgba(0,0,0,0.35)] flex items-center justify-center" />
            </div>

            <div
              className="absolute z-[10] flex flex-col items-center justify-center text-center pointer-events-none"
              style={{
                top: "84px",
                left: "0",
                right: "0",
              }}
            >
              <span
                className={`font-extralight text-[#93b7b1] transition-all duration-150 leading-none select-none tracking-tight ${
                  currentChapter.dialYear.length <= 4
                    ? "text-[58px] sm:text-[68px]"
                    : "text-[38px] sm:text-[48px]"
                }`}
              >
                {currentChapter.dialYear}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-[#aecbc6] mt-1.5 transition-all duration-150 select-none">
                {currentChapter.dialLabel}
              </span>
            </div>
          </div>

          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full mt-4 flex flex-col text-left"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#a8c4be] mb-2">
              {currentChapter.chapterNum}
            </p>
            <h3 className="text-white font-semibold text-[32px] sm:text-[38px] leading-[1.1] tracking-tight whitespace-pre-line">
              {currentChapter.title}
            </h3>
            <p className="text-[#c2d4cf] text-[14.5px] sm:text-[15.5px] leading-[1.6] mt-3 max-w-[420px]">
              {currentChapter.description}
            </p>

            <div className="mt-6 flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => handleNavigate(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous milestone"
                className={`w-11 h-11 rounded-full border border-white/40 bg-[#1e2f32]/60 flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? "opacity-30 cursor-not-allowed text-white/40 border-white/20"
                    : "text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 cursor-pointer shadow-sm"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6-6m-6 6l6 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate(1)}
                disabled={activeIndex === chapters.length - 1}
                aria-label="Next milestone"
                className={`w-11 h-11 rounded-full bg-[#d8e4c6] text-[#1c2825] flex items-center justify-center transition-all ${
                  activeIndex === chapters.length - 1
                    ? "opacity-35 cursor-not-allowed bg-[#a4b293]"
                    : "hover:bg-[#c9d7b5] active:scale-95 cursor-pointer shadow-md"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
                </svg>
              </button>

              <span className="text-[#7e938f] text-[13px] font-normal tracking-wide ml-2 select-none">
                Move the wheel
              </span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Interactive Area (>= 1024px) */}
        <div className="hidden lg:flex flex-row items-center justify-between w-full relative min-h-[460px] lg:min-h-[520px]">
          <div
            className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              width: "1520px",
              height: "1520px",
              left: "-920px",
              top: "calc(50% - 760px)",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
          >
            <div
              className="absolute z-[3] flex flex-col justify-center pointer-events-none select-none max-w-[320px] px-2"
              style={{
                left: "910px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <span
                className={`font-extralight leading-none tracking-tight text-[#93b7b1] transition-all duration-150 truncate ${getDesktopDialYearClass(
                  currentChapter.dialYear
                )}`}
              >
                {currentChapter.dialYear}
              </span>
              <span className="text-[10px] xl:text-[11px] uppercase tracking-[0.2em] font-medium text-[#aecbc6] mt-2.5 transition-all duration-150 truncate max-w-[280px]">
                {currentChapter.dialLabel}
              </span>
            </div>

            {/* Fixed Glow Background Layer on Desktop - perfectly concentric behind wheel rim */}
            <div className="absolute inset-0 w-[1520px] h-[1520px] pointer-events-none z-[4]">
              <div className="relative w-[1520px] h-[1520px]">
                <Image
                  src="/nwglow.png"
                  alt="Wheel Glow Background"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Rotatable Wheel Layer on Desktop - 100% concentric with glow */}
            <div
              className="absolute pointer-events-none z-[5]"
              style={{
                width: "1600px",
                height: "1600px",
                left: "-40px",
                top: "-40px",
                transform: `rotate(${dialRotation}deg)`,
                transformOrigin: "800px 800px",
                transition: "transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              <div className="relative w-[1600px] h-[1600px]">
                <Image
                  src="/nwwheel.png"
                  alt="Rotatable Timeline Dial"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Rotatable SVG Milestone Markers and Dashed Arc on Desktop */}
            <div
              className="absolute inset-0 w-[1520px] h-[1520px] pointer-events-none z-[6]"
              style={{
                transform: `rotate(${dialRotation}deg)`,
                transformOrigin: "760px 760px",
                transition: "transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              <svg
                viewBox="0 0 1520 1520"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ overflow: "visible" }}
              >
                <circle
                  cx="760"
                  cy="760"
                  r="760"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />

                {chapters.map((chap, idx) => {
                  const angle = MILESTONE_ANGLES[idx];
                  const rad = (angle * Math.PI) / 180;
                  const cx = 760;
                  const cy = 760;
                  const rTickInner = 746;
                  const rTickOuter = 774;
                  const x1 = cx + rTickInner * Math.cos(rad);
                  const y1 = cy + rTickInner * Math.sin(rad);
                  const x2 = cx + rTickOuter * Math.cos(rad);
                  const y2 = cy + rTickOuter * Math.sin(rad);

                  const rLabel = 798;
                  const lx = cx + rLabel * Math.cos(rad);
                  const ly = cy + rLabel * Math.sin(rad);
                  const isCurrent = activeIndex === idx;

                  return (
                    <g
                      key={chap.id}
                      className="cursor-pointer pointer-events-auto"
                      onClick={() => handleSelectMilestone(idx)}
                    >
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isCurrent ? "#d8e4c6" : "rgba(255, 255, 255, 0.35)"}
                        strokeWidth={isCurrent ? "2.5" : "1.2"}
                      />
                      {!isCurrent && (
                        <text
                          x={lx}
                          y={ly}
                          fill="#98b3ad"
                          fontSize="12"
                          fontWeight="400"
                          letterSpacing="0.08em"
                          dominantBaseline="central"
                          textAnchor="start"
                          transform={`rotate(${angle + 90}, ${lx}, ${ly})`}
                          className="select-none transition-colors duration-150 hover:fill-white"
                        >
                          {chap.year}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Pointer Badge dashed outer ring at 3 o'clock position */}
            <div
              className="absolute z-[9] rounded-full border border-dashed border-[#d8e4c6]/40 pointer-events-none select-none"
              style={{
                left: "1388px",
                top: "708px",
                width: "104px",
                height: "104px",
              }}
              aria-hidden="true"
            />

            {/* Desktop Pointer Badge without icon */}
            <div
              className="absolute z-[10] pointer-events-none select-none w-[84px] h-[84px] rounded-full bg-[#d8e4c6] border-[3px] border-[#18272a] shadow-[0_6px_24px_rgba(0,0,0,0.5)] flex items-center justify-center"
              style={{
                left: "1398px",
                top: "718px",
              }}
              title="Active Milestone Pointer"
            />

            {/* Horizontal Guideline to Chapter title */}
            <div
              className="absolute z-[8] h-[1px] bg-white/40 pointer-events-none select-none"
              style={{
                left: "1482px",
                top: "760px",
                width: "220px",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Chapter Milestone Content Area (Right) */}
          <motion.div 
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full lg:w-[480px] xl:w-[540px] pl-2 sm:pl-6 lg:pl-0 mt-4 lg:mt-0 flex flex-col justify-center ml-auto relative z-10"
          >
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#a8c4be] mb-3">
              {currentChapter.chapterNum}
            </p>

            <h3 className="text-white font-semibold text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08] tracking-tight whitespace-pre-line transition-all duration-150">
              {currentChapter.title}
            </h3>

            <p className="text-[#c2d4cf] text-[15px] sm:text-[16.5px] leading-[1.65] mt-4 max-w-[420px] transition-all duration-150">
              {currentChapter.description}
            </p>

            <div className="mt-8 flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => handleNavigate(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous milestone"
                className={`w-11 h-11 rounded-full border border-white/40 bg-[#1e2f32]/60 flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? "opacity-30 cursor-not-allowed text-white/40 border-white/20"
                    : "text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 cursor-pointer shadow-sm"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5V4.5m0 0l-6 6m6-6l6 6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate(1)}
                disabled={activeIndex === chapters.length - 1}
                aria-label="Next milestone"
                className={`w-11 h-11 rounded-full bg-[#d8e4c6] text-[#1c2825] flex items-center justify-center transition-all ${
                  activeIndex === chapters.length - 1
                    ? "opacity-35 cursor-not-allowed bg-[#a4b293]"
                    : "hover:bg-[#c9d7b5] active:scale-95 cursor-pointer shadow-md"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6-6m6 6l-6-6" />
                </svg>
              </button>

              <span className="text-[#7e938f] text-[13px] sm:text-[14px] font-normal tracking-wide ml-2 select-none">
                Move the wheel
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Milestone Bar */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[75px] pt-4 pb-2 lg:pb-4 flex justify-end">
        <div className="w-full lg:w-[720px] xl:w-[780px] grid grid-cols-5 gap-1.5 sm:gap-4 lg:gap-6">
          {chapters.map((chap, idx) => {
            const isActive = activeIndex === idx;

            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => handleSelectMilestone(idx)}
                className="group relative flex flex-col text-left focus:outline-none pt-2 cursor-pointer transition-colors"
              >
                <span
                  className={`absolute -top-1 left-0 right-0 transition-all duration-200 ${
                    isActive
                      ? "h-[2px] sm:h-[2.5px] bg-[#d8e4c6] shadow-[0_0_8px_rgba(216,228,198,0.4)]"
                      : "h-[1px] bg-white/15 group-hover:bg-white/30"
                  }`}
                  aria-hidden="true"
                />

                <span
                  className={`text-[9.5px] sm:text-[13px] font-semibold tracking-wider uppercase transition-colors duration-150 truncate ${
                    isActive ? "text-white" : "text-[#8ea8a2] group-hover:text-white"
                  }`}
                >
                  {chap.year}
                </span>

                <span
                  className={`hidden sm:block text-[12px] sm:text-[13px] leading-snug mt-1 transition-colors duration-150 ${
                    isActive ? "text-[#d8e4c6] font-medium" : "text-[#a8c2bc] group-hover:text-white"
                  }`}
                >
                  {chap.bottomLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}