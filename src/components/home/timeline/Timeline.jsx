"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";

/* ───────── YOUR IMAGES (files in /public/image) ───────── */
const WHEEL_SRC = "/image/nwwheel.png"; // the wheel

const USE_RING_IMAGE = false;
const POINTER_RING_SRC = "/image/pointerrottate.png";

/* ───────── Dial dimensions ───────── */
const WHEEL_CANVAS_SIZE = 1600; // nwwheel.png square canvas

const POINTER_VISIBLE = 88;
const RING_SIZE = 104;

const SHOW_YEAR_LABELS = true;
const SHOW_GLOW = false;

/* ───────── Desktop frame ───────── */
const W = 1440;
const H = 812;

/* ───────── Dial geometry ───────── */
const CX = -200;
const CY = H / 2;
const WHEEL_TICK_OUTER = 759; // outer edge of the wheel (radius)
const LABEL_GAP = 13.75;
const LABEL_EXTRA = 26;
const R_LABEL = WHEEL_TICK_OUTER + LABEL_GAP + LABEL_EXTRA;
const LABEL_TILT = -11;
const STEP = 16;
const BOX = WHEEL_CANVAS_SIZE;
const C = BOX / 2;
const DEG_PER_PX = 0.12;

/* ───────── Desktop layout positions ───────── */
const NODE_X = 480;
const TEXT_X = 773;
const TEXT_Y = 316;
const TL_X = 656;
const TL_Y = 716;
const TL_W = 736;
const ITEM_W = TL_W / 5;

/* ───────── Mobile dial (design frame 390 wide, scaled to full width) ───────── */
const MW = 390; // mobile design width
const MH = 290; // mobile dial height
const MS = 0.75; // CHANGED: bigger wheel so the ring runs past both screen edges (full width)
const MCX = MW / 2; // wheel centre x
const MPY = 84; // pointer centre y
const MCY = MPY + 680 * MS; // wheel centre y (below the frame, only the top arc shows)
const M_POINTER = 60;
const M_RING = 78;
const M_DEG_PER_PX = 0.16;
const M_LABEL_R = R_LABEL * MS;

/* ───────── Diagonal glow ───────── */
const GLOW_INNER_R = 606;
const GLOW_OUTER_R = 745;
const GLOW_HALF = 4; // half width in degrees
const GLOW_CORE = 1.5; // bright centre in degrees
const GLOW_PEAK = 0.14; // CHANGED: desktop glow reduced (was 0.30)
const GLOW_PEAK_MOBILE = 0.1; // CHANGED: mobile glow, even softer

const glowBg = (cx, cy, at, peak) =>
  `conic-gradient(from ${at - GLOW_HALF}deg at ${cx}px ${cy}px,
    rgba(216,228,198,0) 0deg,
    rgba(216,228,198,${peak}) ${GLOW_HALF - GLOW_CORE}deg,
    rgba(216,228,198,${peak}) ${GLOW_HALF + GLOW_CORE}deg,
    rgba(216,228,198,0) ${GLOW_HALF * 2}deg,
    rgba(216,228,198,0) 360deg)`;
const glowMask = (cx, cy, k) =>
  `radial-gradient(circle at ${cx}px ${cy}px,
    transparent ${GLOW_INNER_R * k}px,
    #000 ${GLOW_INNER_R * k}px,
    #000 ${GLOW_OUTER_R * k}px,
    transparent ${GLOW_OUTER_R * k}px)`;

/* ───────── Tokens ───────── */
const EASE = [0.21, 0.47, 0.32, 0.98];
const font = { fontFamily: "Roboto, sans-serif", fontStyle: "normal" };
const LIGHT = "var(--on-dark, #EEF0EC)";
const MUTED = "var(--on-dark-muted, #A3B1AE)";
const SAGE = "var(--accent-sage, #D8E4C6)";

const smallCaps = {
  ...font,
  fontSize: "11px",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "1.1px",
  textTransform: "uppercase",
};

const chapters = [
  {
    no: "01",
    label: "1996",
    hub: "1996",
    tag: "IT beginnings",
    title: "Starts out in IT",
    text: "A first job in IT, learning how real businesses run on technology.",
  },
  {
    no: "02",
    label: "Late ’90s",
    hub: "1998",
    tag: "Early blogger",
    title: "Starts blogging",
    text: "A personal blog about technology that slowly grows into a community.",
  },
  {
    no: "03",
    label: "2005",
    hub: "2005",
    tag: "IT integrator",
    title: "Founds SpiderWorks",
    text: "Technology, creativity and marketing under one roof.",
  },
  {
    no: "04",
    label: "2011",
    hub: "2011",
    tag: "New direction",
    title: "Leaves architecture",
    text: "Steps away from architecture work to focus fully on building SpiderWorks.",
  },
  {
    no: "05",
    label: "Today",
    hub: "2026",
    tag: "Founder, mentor",
    title: "Founder, mentor",
    text: "Runs SpiderWorks from Kochi and mentors the next generation of founders.",
  },
];

/* Desktop: year label on the wheel, fades out when it reaches the pointer */
function DialLabel({ rot, angle, children }) {
  const opacity = useTransform(rot, (v) =>
    Math.min(1, Math.abs(angle + v) / 12)
  );
  const x = C + R_LABEL;
  return (
    <motion.text
      x={x}
      y={C}
      transform={`rotate(${angle} ${C} ${C}) rotate(${LABEL_TILT} ${x} ${C})`}
      dominantBaseline="middle"
      style={{
        opacity,
        fill: MUTED,
        fontFamily: "Roboto, sans-serif",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: 500,
        letterSpacing: "0.96px",
        textTransform: "uppercase",
      }}
    >
      {String(children).toUpperCase()}
    </motion.text>
  );
}

/* Mobile: year label placed on the top arc, tilted along the rim, fades at the pointer */
function MobileLabel({ rot, index, children }) {
  const base = index * STEP;
  const x = useTransform(
    rot,
    (v) => MCX + M_LABEL_R * Math.cos(((base + v - 90) * Math.PI) / 180)
  );
  const y = useTransform(
    rot,
    (v) => MCY + M_LABEL_R * Math.sin(((base + v - 90) * Math.PI) / 180)
  );
  const rotate = useTransform(rot, (v) => base + v);
  const opacity = useTransform(rot, (v) =>
    Math.min(1, Math.abs(base + v) / 12)
  );
  return (
    <motion.div
      className="absolute left-0 top-0 pointer-events-none"
      style={{ x, y, rotate, opacity }}
    >
      <span
        className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
        style={{
          ...font,
          color: MUTED,
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {String(children).toUpperCase()}
      </span>
    </motion.div>
  );
}

function ArrowUp({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19.5V4.5m0 0-7 7m7-7 7 7" />
    </svg>
  );
}

function ArrowDown({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4.5v15m0 0 7-7m-7 7-7-7" />
    </svg>
  );
}

function Buttons({ active, last, goTo }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label="Previous chapter"
        onClick={() => goTo(active - 1)}
        disabled={active === 0}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed"
        style={{ border: "1px solid rgba(238,240,236,0.5)", color: LIGHT }}
      >
        <ArrowUp />
      </button>
      <button
        type="button"
        aria-label="Next chapter"
        onClick={() => goTo(active + 1)}
        disabled={active === last}
        className="ml-3 w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:brightness-95 disabled:opacity-35 disabled:cursor-not-allowed"
        style={{ background: SAGE, color: "#22363A" }}
      >
        <ArrowDown />
      </button>
      <span className="ml-4" style={{ ...font, fontSize: "13px", fontWeight: 400, lineHeight: "normal", color: MUTED }}>
        Move the wheel
      </span>
    </div>
  );
}

export default function DialSegments() {
  const [active, setActive] = useState(2);
  const [scale, setScale] = useState(null);
  const [mScale, setMScale] = useState(null);

  const rot = useMotionValue(-2 * STEP);
  const mobileRot = useTransform(rot, (v) => v - 90); // pointer at the top on mobile

  const frameRef = useRef(null);
  const mFrameRef = useRef(null);
  const activeRef = useRef(2);
  const scaleRef = useRef(1);
  const mScaleRef = useRef(1);
  const anim = useRef(null);
  const drag = useRef(null);

  const chapter = chapters[active];
  const last = chapters.length - 1;

  /* Move to a chapter and turn the wheel to it */
  const goTo = useCallback(
    (i) => {
      const idx = Math.max(0, Math.min(last, i));
      activeRef.current = idx;
      setActive(idx);
      anim.current?.stop();
      anim.current = animate(rot, -idx * STEP, {
        type: "spring",
        stiffness: 90,
        damping: 18,
        mass: 0.9,
      });
    },
    [rot, last]
  );

  /* Scale the fixed desktop frame to the available width */
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const s = Math.max(0.01, Math.min(1, entry.contentRect.width / W));
      scaleRef.current = s;
      setScale(s);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Scale the fixed mobile dial frame to the full available width */
  useEffect(() => {
    const el = mFrameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const s = Math.max(0.01, entry.contentRect.width / MW);
      mScaleRef.current = s;
      setMScale(s);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Drag the wheel (desktop = vertical, mobile = horizontal) */
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    anim.current?.stop();
    drag.current = { x: e.clientX, y: e.clientY, rot: rot.get() };
  };
  const applyDrag = (delta, k) => {
    const next = Math.max(-last * STEP, Math.min(0, drag.current.rot + delta * k));
    rot.set(next);
    const nearest = Math.round(-next / STEP);
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
    }
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    applyDrag((e.clientY - drag.current.y) / scaleRef.current, DEG_PER_PX);
  };
  const onPointerMoveMobile = (e) => {
    if (!drag.current) return;
    applyDrag((e.clientX - drag.current.x) / mScaleRef.current, M_DEG_PER_PX);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    goTo(Math.round(-rot.get() / STEP));
  };

  const chapterLabel = (
    <p style={{ ...smallCaps, fontWeight: 500, color: SAGE }}>CHAPTER {chapter.no}</p>
  );

  return (
    <section
      id="about"
      className="relative w-full bg-[#22363A] overflow-hidden isolate lg:h-[812px] lg:min-h-[812px] lg:max-h-[812px]"
    >
      {/* Grain texture overlay (14%) */}
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

      {/* ═════════ Desktop frame: 1440 x 812, scaled to fit ═════════ */}
      <div
        ref={frameRef}
        className="hidden lg:block relative mx-auto w-full max-w-[1440px] h-[812px] overflow-hidden z-10"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width: W,
            height: H,
            transform: `scale(${scale ?? 1})`,
            transformOrigin: "top left",
            visibility: scale === null ? "hidden" : "visible",
          }}
        >
          {/* Rotating wheel (nwwheel) */}
          <motion.div
            className="absolute pointer-events-none z-[1]"
            style={{
              left: CX - C,
              top: CY - C,
              width: BOX,
              height: BOX,
              rotate: rot,
              overflow: "visible",
            }}
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WHEEL_SRC}
              alt=""
              draggable={false}
              className="absolute select-none"
              style={{ left: 0, top: 0, width: BOX, height: BOX, objectFit: "contain" }}
            />
            {SHOW_YEAR_LABELS && (
              <svg
                className="absolute left-0 top-0"
                width={BOX}
                height={BOX}
                viewBox={`0 0 ${BOX} ${BOX}`}
                style={{ overflow: "visible" }}
              >
                {chapters.map((c, i) => (
                  <DialLabel key={c.no} rot={rot} angle={i * STEP}>
                    {c.label}
                  </DialLabel>
                ))}
              </svg>
            )}
          </motion.div>

          {/* Diagonal glow (fixed, does not rotate) */}
          {SHOW_GLOW && (
            <div
              aria-hidden="true"
              className="absolute z-[1] pointer-events-none"
              style={{
                left: 0,
                top: 0,
                width: W,
                height: H,
                background: glowBg(CX, CY, 90, GLOW_PEAK),
                mixBlendMode: "screen",
                WebkitMaskImage: glowMask(CX, CY, 1),
                maskImage: glowMask(CX, CY, 1),
              }}
            />
          )}

          {/* Big year in the hub */}
          <div className="absolute z-[2] pointer-events-none" style={{ left: 37, top: CY - 62.5 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.no}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative"
              >
                <p
                  style={{
                    ...font,
                    color: "#576C6F",
                    fontSize: "125px",
                    fontWeight: 300,
                    lineHeight: "100%",
                    letterSpacing: "-5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chapter.hub}
                </p>
                <p
                  style={{
                    ...font,
                    marginLeft: 4,
                    marginTop: 10,
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: "normal",
                    color: MUTED,
                    opacity: 0.7,
                  }}
                >
                  {chapter.tag}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Drag zone over the wheel */}
          <div
            className="absolute left-0 top-0 h-full z-[3] cursor-grab active:cursor-grabbing touch-none select-none"
            style={{ width: 580 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          />

          {/* Connector line */}
          <div
            className="absolute z-[4] pointer-events-none"
            style={{
              left: NODE_X + POINTER_VISIBLE / 2,
              top: CY,
              width: TEXT_X - 21 - (NODE_X + POINTER_VISIBLE / 2),
              height: 1,
              background: LIGHT,
            }}
          />

          {/* Dotted ring around the pointer */}
          {USE_RING_IMAGE ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={POINTER_RING_SRC}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute z-[4] pointer-events-none select-none"
              style={{
                left: NODE_X - RING_SIZE / 2,
                top: CY - RING_SIZE / 2,
                width: RING_SIZE,
                height: RING_SIZE,
                objectFit: "contain",
              }}
            />
          ) : (
            <svg
              aria-hidden="true"
              className="absolute z-[4] pointer-events-none"
              width={RING_SIZE}
              height={RING_SIZE}
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              style={{ left: NODE_X - RING_SIZE / 2, top: CY - RING_SIZE / 2 }}
            >
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_SIZE / 2 - 1}
                fill="none"
                stroke="rgba(216,228,198,0.85)"
                strokeWidth="1.2"
                strokeDasharray="3 3.5"
                strokeLinecap="round"
              />
            </svg>
          )}

          {/* Pointer inside the wheel */}
          <div
            className="absolute z-[5] pointer-events-none select-none rounded-full"
            style={{
              left: NODE_X - POINTER_VISIBLE / 2,
              top: CY - POINTER_VISIBLE / 2,
              width: POINTER_VISIBLE,
              height: POINTER_VISIBLE,
              background: SAGE,
              border: "6px solid #21363B",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.45)",
            }}
          />

          {/* Top right: DRAG THE DIAL + tagline */}
          <p
            className="absolute z-[6] flex items-center gap-1.5"
            style={{ ...smallCaps, right: 48, top: 48, color: MUTED }}
          >
            DRAG THE DIAL
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18m0 0-7-7m7 7-7 7" />
            </svg>
          </p>
          <p
            className="absolute z-[6] text-right"
            style={{
              ...font,
              right: 48,
              top: 110,
              width: 563,
              color: LIGHT,
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "112%",
              letterSpacing: "-0.4px",
            }}
          >
            From a late ’90s blog to a company of its own.
          </p>

          {/* Chapter text column */}
          <div className="absolute z-[6]" style={{ left: TEXT_X, top: TEXT_Y, width: 302 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter.no}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {chapterLabel}
                <h3
                  className="mt-[15px] min-h-[88px]"
                  style={{
                    ...font,
                    color: LIGHT,
                    fontSize: "40px",
                    fontWeight: 500,
                    lineHeight: "110%",
                    letterSpacing: "-0.8px",
                  }}
                >
                  {chapter.title}
                </h3>
                <p
                  className="mt-[18px] min-h-[51px] max-w-[300px]"
                  style={{
                    ...font,
                    color: MUTED,
                    fontSize: "17px",
                    fontWeight: 400,
                    lineHeight: "150%",
                  }}
                >
                  {chapter.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-[41px]">
              <Buttons active={active} last={last} goTo={goTo} />
            </div>
          </div>

          {/* Timeline */}
          <div className="absolute z-[6]" style={{ left: TL_X, top: TL_Y, width: TL_W }}>
            <div className="w-full" style={{ height: 1, background: LIGHT }} />
            <div className="relative flex">
              <motion.span
                className="absolute left-0 block"
                style={{ top: -2, width: ITEM_W - 10, height: 3, background: SAGE }}
                animate={{ x: active * ITEM_W }}
                transition={{ type: "spring", stiffness: 140, damping: 22 }}
              />
              {chapters.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.no}
                    type="button"
                    onClick={() => goTo(i)}
                    className="text-left pt-[18px] pr-[10px] transition-colors"
                    style={{ width: ITEM_W, color: on ? LIGHT : MUTED }}
                  >
                    <span className="block" style={smallCaps}>{c.label}</span>
                    <span
                      className="block mt-2"
                      style={{ ...font, fontSize: "13px", fontWeight: 400, lineHeight: "140%" }}
                    >
                      {c.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ═════════ Mobile / tablet: dial arc + text + timeline ═════════ */}
      <div className="lg:hidden relative z-10 px-6 sm:px-10 pt-14 pb-12">
        <p style={{ ...smallCaps, color: MUTED }}>Drag the dial</p>
        <p
          className="mt-3 max-w-[480px]"
          style={{ ...font, color: LIGHT, fontSize: "20px", fontWeight: 400, lineHeight: "112%", letterSpacing: "-0.4px" }}
        >
          From a late ’90s blog to a company of its own.
        </p>

        {/* Dial arc: CHANGED, breaks out of the page padding so it is full width */}
        <div
          ref={mFrameRef}
          className="relative -mx-6 sm:-mx-10 mt-6 overflow-hidden"
          style={{ height: MH * (mScale ?? 1) }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: MW,
              height: MH,
              transform: `scale(${mScale ?? 1})`,
              transformOrigin: "top left",
              visibility: mScale === null ? "hidden" : "visible",
            }}
          >
            {/* Wheel, rotated so the pointer sits at the top */}
            <motion.div
              className="absolute pointer-events-none z-[1]"
              style={{
                left: MCX - C,
                top: MCY - C,
                width: BOX,
                height: BOX,
                rotate: mobileRot,
                scale: MS,
              }}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={WHEEL_SRC}
                alt=""
                draggable={false}
                className="absolute select-none"
                style={{ left: 0, top: 0, width: BOX, height: BOX, objectFit: "contain" }}
              />
            </motion.div>

            {/* Diagonal glow, fixed at the top of the arc (softer) */}
            {SHOW_GLOW && (
              <div
                aria-hidden="true"
                className="absolute z-[1] pointer-events-none"
                style={{
                  left: 0,
                  top: 0,
                  width: MW,
                  height: MH,
                  background: glowBg(MCX, MCY, 0, GLOW_PEAK_MOBILE),
                  mixBlendMode: "screen",
                  WebkitMaskImage: glowMask(MCX, MCY, MS),
                  maskImage: glowMask(MCX, MCY, MS),
                }}
              />
            )}

            {/* Year labels on the rim */}
            {SHOW_YEAR_LABELS &&
              chapters.map((c, i) => (
                <MobileLabel key={c.no} rot={rot} index={i}>
                  {c.label}
                </MobileLabel>
              ))}

            {/* Big year in the hub */}
            <div
              className="absolute z-[2] pointer-events-none text-center"
              style={{ left: 0, width: MW, top: 160 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={chapter.no}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p
                    style={{
                      ...font,
                      color: "#576C6F",
                      fontSize: "84px",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "-3px",
                    }}
                  >
                    {chapter.hub}
                  </p>
                  <p
                    style={{
                      ...font,
                      marginTop: 8,
                      fontSize: "12px",
                      fontWeight: 400,
                      color: MUTED,
                      opacity: 0.7,
                    }}
                  >
                    {chapter.tag}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Drag zone (horizontal drag, vertical scroll still works) */}
            <div
              className="absolute left-0 top-0 z-[3] cursor-grab active:cursor-grabbing select-none"
              style={{ width: MW, height: MH, touchAction: "pan-y" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMoveMobile}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />

            {/* Dotted ring around the pointer */}
            <svg
              aria-hidden="true"
              className="absolute z-[4] pointer-events-none"
              width={M_RING}
              height={M_RING}
              viewBox={`0 0 ${M_RING} ${M_RING}`}
              style={{ left: MCX - M_RING / 2, top: MPY - M_RING / 2 }}
            >
              <circle
                cx={M_RING / 2}
                cy={M_RING / 2}
                r={M_RING / 2 - 1}
                fill="none"
                stroke="rgba(216,228,198,0.85)"
                strokeWidth="1.2"
                strokeDasharray="3 3.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Pointer */}
            <div
              className="absolute z-[5] pointer-events-none rounded-full"
              style={{
                left: MCX - M_POINTER / 2,
                top: MPY - M_POINTER / 2,
                width: M_POINTER,
                height: M_POINTER,
                background: SAGE,
                border: "4px solid #21363B",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.45)",
              }}
            />
          </div>
        </div>

        {/* Chapter text */}
        <div className="mt-8 max-w-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.no}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {chapterLabel}
              <h3
                className="mt-[12px] min-h-[70px]"
                style={{ ...font, color: LIGHT, fontSize: "32px", fontWeight: 500, lineHeight: "110%", letterSpacing: "-0.64px" }}
              >
                {chapter.title}
              </h3>
              <p
                className="mt-[14px] min-h-[51px] max-w-[360px]"
                style={{ ...font, color: MUTED, fontSize: "16px", fontWeight: 400, lineHeight: "150%" }}
              >
                {chapter.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6">
            <Buttons active={active} last={last} goTo={goTo} />
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <div className="w-full" style={{ height: 1, background: LIGHT }} />
          <div className="relative flex">
            <motion.span
              className="absolute left-0 block"
              style={{ top: -2, width: "calc(20% - 6px)", height: 3, background: SAGE }}
              animate={{ x: `${active * 100}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 22 }}
            />
            {chapters.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.no}
                  type="button"
                  onClick={() => goTo(i)}
                  className="w-1/5 text-left pt-[14px] pr-[6px] transition-colors"
                  style={{ color: on ? LIGHT : MUTED }}
                >
                  <span
                    className="block"
                    style={{ ...smallCaps, fontSize: "10px", letterSpacing: "0.8px" }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="hidden sm:block mt-2"
                    style={{ ...font, fontSize: "12px", lineHeight: "140%" }}
                  >
                    {c.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}