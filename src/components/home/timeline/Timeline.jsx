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
const GLOW_SRC = "/image/nwglow.png"; // glow just above the wheel
const POINTER_SRC = "/image/wheelpointer.png"; // pointer inside the wheel

/* Dotted ring around the pointer (fixed, does not rotate).
   By default it is drawn in code. To use your own image instead,
   set USE_RING_IMAGE = true and fix the file name below. */
const USE_RING_IMAGE = false;
const POINTER_RING_SRC = "/image/pointerrottate.png";

/* ───────── Dial dimensions & images (Figma 1520px x 1520px dial) ─────────
   The dial in Figma is 1520px x 1520px.
   nwwheel.png has a 1600x1600 canvas (1520px dial content + 40px outer margin).
   nwglow.png has a 1520x1520 canvas (matching the exact 1520px dial content).
*/
const WHEEL_CANVAS_SIZE = 1600; // nwwheel.png square canvas
const GLOW_SIZE = 1520; // nwglow.png square size (1520px in Figma)
const GLOW_OFFSET = { x: 0, y: 0 };
const GLOW_OPACITY = 1;
const GLOW_BLEND = "normal";

/* Pointer + dotted ring (both are centred on the exact same point at NODE_X, CY) */
const POINTER_VISIBLE = 88; // diameter of the cream pointer circle with dark border
const RING_SIZE = 104; // dotted ring diameter (leaves a uniform gap around the pointer)

/* Year labels drawn around the wheel. Set to false if your wheel image already has them. */
const SHOW_YEAR_LABELS = true;

/* ───────── Frame (Figma: W 1440 / H 812, fixed) ───────── */
const W = 1440;
const H = 812;

/* ───────── Dial geometry, in frame pixels ───────── */
const CX = -200; // dial centre x (so the 1520px dial's right edge reaches x = 560px)
const CY = H / 2; // dial centre y (406)
const R_LABEL = 782; // year labels sit outside the 759px wheel ticks along the curve
const STEP = 16; // degrees between two chapters
const BOX = WHEEL_CANVAS_SIZE; // 1600px square box holding the rotating wheel
const C = BOX / 2; // 800
const DEG_PER_PX = 0.12; // drag sensitivity

/* ───────── Layout positions ─────────
   Wheel ticks inner edge: CX + 600 = -200 + 600 = 400px.
   Wheel ticks outer edge: CX + 759 = -200 + 759 = 559px.
   Wheel width: 159px.
   Exact center of wheel width: (400 + 559) / 2 = 479.5 ~ 480px.
*/
const NODE_X = 480; // pointer centre x: exact center of wheel width
const TEXT_X = 773; // left edge of the chapter text column
const TEXT_Y = 316; // top of the chapter text column
const TL_X = 656; // timeline left (736px wide, right padding 48)
const TL_Y = 716; // timeline line y
const TL_W = 736;
const ITEM_W = TL_W / 5; // 147.2px per milestone

/* ───────── Tokens ───────── */
const EASE = [0.21, 0.47, 0.32, 0.98];
const font = { fontFamily: "Roboto, sans-serif", fontStyle: "normal" };
const LIGHT = "var(--on-dark, #EEF0EC)";
const MUTED = "var(--on-dark-muted, #A3B1AE)";
const SAGE = "var(--accent-sage, #D8E4C6)";

// 11px / 400 / 1.1px / uppercase
const smallCaps = {
  ...font,
  fontSize: "11px",
  fontWeight: 400,
  lineHeight: "normal",
  letterSpacing: "1.1px",
  textTransform: "uppercase",
};

// Chapters. Only chapter 03 comes from your Figma; the rest is placeholder copy.
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

/* Year label on the wheel, fades out when it reaches the pointer */
function DialLabel({ rot, angle, children }) {
  const opacity = useTransform(rot, (v) =>
    Math.min(1, Math.abs(angle + v) / 10)
  );
  return (
    <motion.text
      x={C + R_LABEL}
      y={C}
      transform={`rotate(${angle} ${C} ${C})`}
      dominantBaseline="middle"
      fill="#A3B1AE"
      style={{
        opacity,
        fontFamily: "Roboto, sans-serif",
        fontSize: 11,
        letterSpacing: "1.1px",
      }}
    >
      {String(children).toUpperCase()}
    </motion.text>
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
  const [active, setActive] = useState(2); // chapter 03 (2005), as in Figma
  const [scale, setScale] = useState(null);

  const rot = useMotionValue(-2 * STEP);
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const activeRef = useRef(2);
  const scaleRef = useRef(1);
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

  /* Scale the fixed 1440 x 812 frame to the available width */
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

  /* Mouse wheel changes chapter (page scrolls normally at the first / last chapter) */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let locked = false;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 8) return;
      const next = activeRef.current + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next > last) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      goTo(next);
      setTimeout(() => (locked = false), 650);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goTo, last]);

  /* Drag the wheel */
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    anim.current?.stop();
    drag.current = { y: e.clientY, rot: rot.get() };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dy = (e.clientY - drag.current.y) / scaleRef.current;
    const next = Math.max(-last * STEP, Math.min(0, drag.current.rot + dy * DEG_PER_PX));
    rot.set(next);
    const nearest = Math.round(-next / STEP);
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
    }
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
      ref={sectionRef}
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
            className="absolute pointer-events-none"
            style={{ left: CX - C, top: CY - C, width: BOX, height: BOX, rotate: rot }}
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WHEEL_SRC}
              alt=""
              draggable={false}
              className="absolute select-none"
              style={{
                left: 0,
                top: 0,
                width: BOX,
                height: BOX,
                objectFit: "contain",
              }}
            />
            {SHOW_YEAR_LABELS && (
              <svg
                className="absolute left-0 top-0"
                width={BOX}
                height={BOX}
                viewBox={`0 0 ${BOX} ${BOX}`}
              >
                {chapters.map((c, i) => (
                  <DialLabel key={c.no} rot={rot} angle={i * STEP}>
                    {c.label}
                  </DialLabel>
                ))}
              </svg>
            )}
          </motion.div>

          {/* Glow just above the wheel (nwglow): same square as the wheel, fixed, never rotates */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GLOW_SRC}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute z-[1] pointer-events-none select-none"
            style={{
              left: CX - GLOW_SIZE / 2 + GLOW_OFFSET.x,
              top: CY - GLOW_SIZE / 2 + GLOW_OFFSET.y,
              width: GLOW_SIZE,
              height: GLOW_SIZE,
              objectFit: "contain",
              opacity: GLOW_OPACITY,
              mixBlendMode: GLOW_BLEND,
            }}
          />

          {/* Big year in the hub: 125px height, centered at CY, with 10px gap to tag */}
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

          {/* Connector line: starts at the pointer's edge and runs to the text */}
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

          {/* Dotted ring around the pointer: fixed, same centre as the pointer */}
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
              style={{
                left: NODE_X - RING_SIZE / 2,
                top: CY - RING_SIZE / 2,
              }}
            >
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_SIZE / 2 - 1}
                fill="none"
                stroke="rgba(238,240,236,0.9)"
                strokeWidth="1"
                strokeDasharray="3 3.5"
              />
            </svg>
          )}

          {/* Pointer inside the wheel: accurately centered on (NODE_X, CY), clean circle with arrow removed */}
          <div
            className="absolute z-[5] pointer-events-none select-none rounded-full"
            style={{
              left: NODE_X - POINTER_VISIBLE / 2,
              top: CY - POINTER_VISIBLE / 2,
              width: POINTER_VISIBLE,
              height: POINTER_VISIBLE,
              background: SAGE,
              border: "6px solid #21363B",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
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

          {/* Timeline: 736 x 1px line + 5 milestones */}
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

      {/* ═════════ Mobile / tablet: simple stacked version ═════════ */}
      <div className="lg:hidden relative z-10 px-6 sm:px-10 py-16">
        <p
          className="max-w-[420px]"
          style={{ ...font, color: LIGHT, fontSize: "20px", fontWeight: 400, lineHeight: "112%", letterSpacing: "-0.4px" }}
        >
          From a late ’90s blog to a company of its own.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={chapter.no}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-10"
          >
            <p
              style={{
                ...font,
                color: "#576C6F",
                fontSize: "clamp(72px, 22vw, 128px)",
                fontWeight: 300,
                lineHeight: "100%",
                letterSpacing: "-0.04em",
              }}
            >
              {chapter.hub}
            </p>
            <div className="mt-6">{chapterLabel}</div>
            <h3
              className="mt-[15px]"
              style={{ ...font, color: LIGHT, fontSize: "40px", fontWeight: 500, lineHeight: "110%", letterSpacing: "-0.8px" }}
            >
              {chapter.title}
            </h3>
            <p
              className="mt-[18px] max-w-[360px]"
              style={{ ...font, color: MUTED, fontSize: "17px", fontWeight: 400, lineHeight: "150%" }}
            >
              {chapter.text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8">
          <Buttons active={active} last={last} goTo={goTo} />
        </div>

        <div className="mt-12 border-t" style={{ borderColor: "rgba(238,240,236,0.9)" }}>
          {chapters.map((c, i) => {
            const on = i === active;
            return (
              <button
                key={c.no}
                type="button"
                onClick={() => goTo(i)}
                className="w-full text-left py-4 border-b flex items-baseline gap-4"
                style={{
                  borderColor: "rgba(238,240,236,0.15)",
                  color: on ? LIGHT : MUTED,
                }}
              >
                <span className="w-[84px] shrink-0" style={smallCaps}>{c.label}</span>
                <span style={{ ...font, fontSize: "13px", lineHeight: "140%" }}>{c.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}