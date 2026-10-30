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
      "First steps into software engineering, networking,\nand the dawn of commercial internet technologies.",
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
      "Sharing early tech insights, developer tutorials,\nand building an authoritative online community.",
    bottomLabel: "Starts blogging",
  },
  {
    id: 2,
    year: "2005",
    dialYear: "2005",
    dialLabel: "THE FOUNDING",
    chapterNum: "CHAPTER 03",
    title: "Founds\nSpiderWorks",
    description: "Technology, creativity and marketing\nunder one roof.",
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
      "Transitioning fully into digital entrepreneurship,\nenterprise IT consultancy, and scaling online ventures.",
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
      "Advising enterprise leadership, mentoring tech founders,\nand shaping sustainable growth strategies.",
    bottomLabel: "Founder, mentor",
  },
];

// Milestone angles on the dial arc relative to 0deg (horizontal right pointer)
const MILESTONE_ANGLES = [-36, -18, 0, 18, 36];

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
      className="relative w-full bg-[#22363A] overflow-hidden isolate h-auto lg:h-[812px] lg:min-h-[812px] lg:max-h-[812px] py-8 lg:py-0 select-none"
    >
      <span id="about-tony" className="-top-20 relative block" aria-hidden="true" />

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

      {/* Main Container: Fixed 1440px Width, 812px Height matching Figma frame */}
      <div className="relative z-10 w-full max-w-[1440px] h-full mx-auto px-6 sm:px-10 lg:px-[48px] flex flex-col justify-between lg:block">
        {/* Top Header Row (Desktop: Absolute at top: 38px, right: 48px) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex absolute top-[38px] right-[48px] z-10 text-right flex-col items-end"
        >
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#7e938f] mb-1 select-none">
            DRAG THE DIAL &rarr;
          </span>
          <h2 className="text-[#e2ece9] text-[17px] sm:text-[19px] lg:text-[20px] font-normal leading-snug tracking-tight">
            From a late &apos;90s blog to a company of its own.
          </h2>
        </motion.div>

        {/* Mobile Interactive View (< 1024px) */}
        <div className="lg:hidden flex flex-col w-full my-auto py-4">
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
            {/* Glow Background Layer on Mobile */}
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
                  src="/image/nwglow.png"
                  alt="Wheel Glow Background"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Rotatable Wheel Layer on Mobile */}
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
                  src="/image/nwwheel.png"
                  alt="Rotatable Wheel"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Clean Mobile Pointer Badge (arrow removed) */}
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
              <div className="w-full h-full rounded-full bg-[#d8e4c6] border-[2.5px] border-[#1d2d30] shadow-[0_4px_14px_rgba(0,0,0,0.35)]" />
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
                className="font-light text-[#576C6F] transition-all duration-150 leading-[100%] tracking-[-0.04em] select-none text-[52px] sm:text-[64px]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {currentChapter.dialYear}
              </span>
              <span
                className="select-none mt-1.5 transition-all duration-150"
                style={{
                  color: "#A3B1AE",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "1.1px",
                  textTransform: "uppercase",
                }}
              >
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
            <p
              className="uppercase mb-2 select-none"
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "1.2px",
              }}
            >
              {currentChapter.chapterNum}
            </p>

            <h3
              className="whitespace-pre-line"
              style={{
                color: "#EEF0EC",
                fontFamily: "Roboto, sans-serif",
                fontSize: "34px",
                fontWeight: 500,
                lineHeight: "110%",
                letterSpacing: "-0.8px",
              }}
            >
              {currentChapter.title}
            </h3>
            <p
              className="mt-3 max-w-[420px] whitespace-pre-line"
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
              }}
            >
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-5 5m5-5l5 5" />
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                </svg>
              </button>

              <span
                className="ml-2 select-none"
                style={{
                  color: "#A3B1AE",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                }}
              >
                Move the wheel
              </span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Interactive Layout (Fixed 1440x812 Exact Figma Canvas) */}
        <div className="hidden lg:block">
          {/* Big Year on Left: Exact Figma Specs (342px top/bottom center line, left 48px within container) */}
          <div className="absolute left-[48px] top-1/2 -translate-y-1/2 z-[3] flex flex-col justify-center select-none pointer-events-none max-w-[340px]">
            <motion.span
              key={currentChapter.dialYear}
              initial={{ opacity: 0.6, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block select-none truncate"
              style={{
                color: "#576C6F",
                fontFamily: "Roboto, sans-serif",
                fontSize: currentChapter.dialYear.length > 5 ? "88px" : "128px",
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "100%",
                letterSpacing: currentChapter.dialYear.length > 5 ? "-3.5px" : "-5.12px",
              }}
            >
              {currentChapter.dialYear}
            </motion.span>
            <motion.span
              key={currentChapter.dialLabel}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="block select-none mt-2.5 truncate w-fit"
              style={{
                color: "#A3B1AE",
                textAlign: "right",
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                letterSpacing: "1.1px",
                textTransform: "uppercase",
              }}
            >
              {currentChapter.dialLabel}
            </motion.span>
          </div>

          {/* Rotatable Wheel & Center Interactive Dial */}
          <div
            className="absolute cursor-grab active:cursor-grabbing pointer-events-auto"
            style={{
              width: "1520px",
              height: "1520px",
              left: "-1000px",
              top: "calc(50% - 760px)",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
          >
            {/* Fixed Glow Background Layer on Desktop */}
            <div className="absolute inset-0 w-[1520px] h-[1520px] pointer-events-none z-[4]">
              <div className="relative w-[1520px] h-[1520px]">
                <Image
                  src="/image/nwglow.png"
                  alt="Wheel Glow Background"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Rotatable Wheel Layer on Desktop */}
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
                  src="/image/nwwheel.png"
                  alt="Rotatable Timeline Dial"
                  fill
                  className="object-contain select-none"
                  draggable={false}
                  priority
                />
              </div>
            </div>

            {/* Rotatable Curved/Bended Year Labels on Wheel Arc matching Figma Specs */}
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
                {chapters.map((chap, idx) => {
                  const angle = MILESTONE_ANGLES[idx];
                  const rad = (angle * Math.PI) / 180;
                  const cx = 760;
                  const cy = 760;

                  const rLabel = 820;
                  const lx = cx + rLabel * Math.cos(rad);
                  const ly = cy + rLabel * Math.sin(rad);
                  const isCurrent = activeIndex === idx;

                  if (isCurrent) return null;

                  return (
                    <g
                      key={chap.id}
                      className="cursor-pointer pointer-events-auto"
                      onClick={() => handleSelectMilestone(idx)}
                    >
                      <text
                        x={lx}
                        y={ly}
                        fill="#A3B1AE"
                        fontSize="12"
                        fontWeight="500"
                        letterSpacing="0.96px"
                        dominantBaseline="central"
                        textAnchor="start"
                        transform={`rotate(${angle}, ${lx}, ${ly})`}
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          textTransform: "uppercase",
                        }}
                        className="select-none transition-colors duration-150 hover:fill-white"
                      >
                        {chap.year}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Pointer Badge dashed outer ring at 3 o'clock position */}
            <div
              className="absolute z-[9] rounded-full border border-dashed border-[#d8e4c6]/45 pointer-events-none select-none"
              style={{
                left: "1390px",
                top: "710px",
                width: "100px",
                height: "100px",
              }}
              aria-hidden="true"
            />

            {/* Clean Pointer Badge Circle (pointer arrow removed as requested) */}
            <div
              className="absolute z-[10] pointer-events-none select-none w-[80px] h-[80px] rounded-full bg-[#d8e4c6] border-[3px] border-[#18272a] shadow-[0_6px_24px_rgba(0,0,0,0.5)]"
              style={{
                left: "1400px",
                top: "720px",
              }}
              title="Active Milestone Pointer"
            />
          </div>

          {/* Horizontal Connecting Line: Exact reduced length ending at 640px (before text at 656px) */}
          <div
            className="absolute z-[8] h-[1px] bg-white/70 pointer-events-none select-none"
            style={{
              left: "490px",
              top: "50%",
              width: "150px",
            }}
            aria-hidden="true"
          />

          {/* Chapter Milestone Content Area (Right): Starts flush with blue vertical line at left: 656px */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute top-1/2 -translate-y-1/2 z-10 flex flex-col justify-center"
            style={{
              left: "656px",
              maxWidth: "460px",
            }}
          >
            {/* CHAPTER NUMBER */}
            <p
              className="uppercase mb-3.5 select-none"
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "1.2px",
              }}
            >
              {currentChapter.chapterNum}
            </p>

            {/* HEAD SIZE: Exactly 40px, Roboto 500, 110% line-height, -0.8px letter-spacing */}
            <h3
              className="whitespace-pre-line transition-all duration-150"
              style={{
                color: "#EEF0EC",
                fontFamily: "Roboto, sans-serif",
                fontSize: "40px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "110%", // 44px
                letterSpacing: "-0.8px",
              }}
            >
              {currentChapter.title}
            </h3>

            {/* HEAD DESCRIPTION: Exactly 2 lines, 17px, Roboto 400, 150% line-height, #A3B1AE */}
            <p
              className="mt-4 max-w-[440px] whitespace-pre-line transition-all duration-150"
              style={{
                color: "#A3B1AE",
                fontFamily: "Roboto, sans-serif",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "150%", // 25.5px
              }}
            >
              {currentChapter.description}
            </p>

            {/* Navigation Buttons and Label */}
            <div className="mt-8 flex items-center gap-3.5">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handleNavigate(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous milestone"
                className={`w-11 h-11 rounded-full border border-white/40 bg-[#1e2f32]/60 flex items-center justify-center transition-all ${
                  activeIndex === 0
                    ? "opacity-30 cursor-not-allowed text-white/30 border-white/20"
                    : "text-white/80 hover:text-white hover:border-white hover:bg-white/10 active:scale-95 cursor-pointer shadow-sm"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-5 5m5-5l5 5" />
                </svg>
              </button>

              {/* Next Button */}
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
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-5-5m5 5l5-5" />
                </svg>
              </button>

              {/* MOVE THE WHEEL: 13px, Roboto 400, #A3B1AE */}
              <span
                className="ml-3 select-none"
                style={{
                  color: "#A3B1AE",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "normal",
                }}
              >
                Move the wheel
              </span>
            </div>
          </motion.div>

          {/* Bottom Milestone Bar (Rail Rule): Exactly 736px, starts at 656px flush with blue vertical line */}
          <div className="absolute left-[656px] bottom-[52px] w-[736px] z-10">
            {/* Continuous subtle baseline across all 5 milestones */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#EEF0EC]/25" aria-hidden="true" />

            {/* Bright active scroll highlight segment positioned directly above the active milestone */}
            <div
              className="absolute top-0 h-[2px] bg-[#D8E4C6] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(216,228,198,0.4)] z-10"
              style={{
                left: `${activeIndex * 20}%`,
                width: "20%",
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-5 w-full pt-3.5 gap-4">
              {chapters.map((chap, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => handleSelectMilestone(idx)}
                    className="group relative flex flex-col text-left focus:outline-none cursor-pointer transition-colors"
                  >
                    {/* Top year text */}
                    <span
                      className={`text-[12px] uppercase tracking-[0.96px] transition-colors duration-150 truncate ${
                        isActive
                          ? "text-[#EEF0EC] font-medium"
                          : "text-[#A3B1AE] font-normal group-hover:text-white"
                      }`}
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {chap.year}
                    </span>

                    {/* Bottom description text */}
                    <span
                      className={`text-[13px] leading-[140%] mt-1.5 transition-colors duration-150 ${
                        isActive
                          ? "text-[#EEF0EC] font-normal"
                          : "text-[#A3B1AE] font-normal group-hover:text-white"
                      }`}
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      {chap.bottomLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
