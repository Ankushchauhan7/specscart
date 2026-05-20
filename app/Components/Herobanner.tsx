"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface Props {
  brandName?: string;
  tagline?: string;
  collectionTitle?: string;
  collectionDesc?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export default function HeroBanner({
  brandName       = "TOM ARCHER",
  tagline         = "Premium, The Inexpensive Way",
  collectionTitle = "LATEST COLLECTION",
  collectionDesc  = "With an aura of mystique and a visage that hints at the depths of space itself, Icarus is more than a mere mortal. He is a guardian of the celestial realm.",
  videoSrc        = "",
  posterSrc       = "/herotom.png",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Raw scroll progress 0→1 over the section height ──────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Apple-style spring: silky, heavy, no bounce ───────────
  // Low stiffness = slow to accelerate (cinematic lag)
  // High damping  = no oscillation at all
  const sp = useSpring(scrollYProgress, {
    stiffness: 38,
    damping:   28,
    restDelta: 0.0004,
  });

  // ── ALL animation values derived from scroll ──────────────

  // Black screen dissolves away
  const blackOpacity   = useTransform(sp, [0, 0.36], [1, 0]);

  // Background image zooms in from 82% → 100% (Apple's signature move)
  const imgScale       = useTransform(sp, [0, 0.60], [0.82, 1]);
  const imgOpacity     = useTransform(sp, [0, 0.36], [0, 1]);
  // Parallax drift — image slides up as you scroll past
  const imgY           = useTransform(sp, [0, 1], ["0%", "16%"]);

  // Logo: punches from circle → fills screen
  const logoScale      = useTransform(sp, [0.03, 0.44], [1, 22]);
  const logoOpacity    = useTransform(sp, [0.03, 0.28], [1, 0]);

  // Intro text fades + lifts out
  const textOpacity    = useTransform(sp, [0, 0.20], [1, 0]);
  const textY          = useTransform(sp, [0, 0.20], [0, -14]);

  // Scroll hint vanishes on first movement
  const hintOpacity    = useTransform(sp, [0, 0.07], [1, 0]);

  // Collection info slides up + fades in after image fully revealed
  const infoOpacity    = useTransform(sp, [0.58, 0.82], [0, 1]);
  const infoY          = useTransform(sp, [0.58, 0.82], [28, 0]);

  return (
    /*
      Outer div is 250svh tall — gives the scroll runway
      Inner div is sticky so it stays fixed while parent scrolls
    */
    <div ref={containerRef} className="relative" style={{ height: "250svh" }}>
      <div className="sticky top-0 overflow-hidden bg-black" style={{ height: "100svh", minHeight: 500 }}>

        {/* ══ BACKGROUND IMAGE / VIDEO ════════════════════════ */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imgScale, opacity: imgOpacity, y: imgY }}
        >
          {videoSrc ? (
            <video
              src={videoSrc} poster={posterSrc}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={posterSrc} alt={brandName}
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
          )}
          {/* Readability gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/[0.08] to-transparent" />
        </motion.div>

        {/* ══ BLACK VEIL: fades out as image appears ══════════ */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none z-10"
          style={{ opacity: blackOpacity }}
        />

        {/* ══ INTRO LAYER ═════════════════════════════════════ */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">

          {/* ── LOGO: perfectly centered circle, Next Image, no border ── */}
          <motion.div
            style={{ scale: logoScale, opacity: logoOpacity }}
            className="flex items-center justify-center"
          >
            {/*
              Outer ring (subtle) + inner circle crop of posterSrc.
              Matches Image 2 style: dark circle, centered icon, thin ring.
              At scale 22 this fills the entire viewport seamlessly.
            */}
            <div className="relative flex items-center justify-center">
              {/* Outer thin ring — matches image 2 */}
              <div className="absolute w-[120px] h-[120px] rounded-full border border-white/20" />

              {/* Inner dark circle with image crop */}
              <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-black/60 flex items-center justify-center">
                <Image
                  src={posterSrc}
                  alt={brandName}
                  fill
                  className="object-cover object-center"
                  sizes="100px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* ── BRAND NAME + TAGLINE ─────────────────────────── */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-5"
            style={{ opacity: textOpacity, y: textY }}
          >
            <h1
              className="text-white font-extrabold tracking-[0.3em] uppercase text-center m-0"
              style={{ fontSize: "clamp(2rem,7vw,5rem)", fontFamily: "'Trebuchet MS',sans-serif" }}
            >
              {brandName}
            </h1>
            <p
              className="text-white/40 text-sm tracking-widest italic m-0"
              style={{ fontFamily: "Georgia,serif" }}
            >
              {tagline}
            </p>
          </motion.div>

          {/* ── SCROLL HINT ──────────────────────────────────── */}
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-2"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-white/30 text-[10px] tracking-[0.28em] uppercase">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.28)" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* ══ COLLECTION INFO: appears after reveal ═══════════ */}
        <motion.div
          className="absolute bottom-14 left-6 max-w-lg z-30 pointer-events-none"
          style={{ opacity: infoOpacity, y: infoY }}
        >
          <h2
            className="text-white font-extrabold tracking-[0.2em] uppercase mb-3"
            style={{ fontSize: "clamp(1.4rem,3.5vw,2.4rem)", fontFamily: "'Trebuchet MS',sans-serif" }}
          >
            {collectionTitle}
          </h2>
          <p
            className="text-white/60 leading-relaxed uppercase tracking-wide"
            style={{ fontSize: "clamp(0.72rem,1.2vw,0.85rem)" }}
          >
            {collectionDesc}
          </p>
        </motion.div>

      </div>
    </div>
  );
}