"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface Props {
  brandName?: string;
  tagline?: string;
  collectionTitle?: string;
  collectionDesc?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export default function HeroBanner({
  brandName = "TOM ARCHER",
  tagline = "Premium, The Inexpensive Way",
  collectionTitle = "LATEST COLLECTION",
  collectionDesc = "With an aura of mystique and a visage that hints at the depths of space itself, Icarus is more than a mere mortal. He is a guardian of the celestial realm.",
  videoSrc = "",
  posterSrc = "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1600&q=85",
}: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="relative w-full bg-black overflow-hidden select-none cursor-pointer"
      style={{ height: "100svh", minHeight: 500 }}
      onClick={() => !clicked && setClicked(true)}
    >

      {/* ── VIDEO: zooms in from 0.8 → 1 simultaneously ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={clicked ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 2.2, ease: [0.15, 0, 0.4, 1] }}
      >
        {videoSrc ? (
          <video src={videoSrc} autoPlay muted loop playsInline poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <img src={posterSrc} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      </motion.div>

      {/* ── BLACK BG: fades out immediately on click ── */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={clicked ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ pointerEvents: "none" }}
      />

      {/* ── INTRO LAYER: logo + text, centered ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ pointerEvents: clicked ? "none" : "auto" }}
      >

        {/* LOGO ONLY — zooms in (scale 1 → 16) */}
        <motion.svg
          width="110" height="110" viewBox="0 0 110 110" fill="none"
          animate={clicked ? { scale: 16, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={clicked
            ? { duration: 2.2, ease: [0.15, 0, 0.4, 1] }
            : { duration: 0 }
          }
        >
          <circle cx="55" cy="55" r="52" stroke="white" strokeWidth="1.5" opacity="0.75"/>
          <circle cx="55" cy="55" r="44" stroke="white" strokeWidth="0.6" opacity="0.3"/>
          <path d="M28 76 L42 30 L55 66 L68 30 L82 76"
            stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <line x1="33" y1="44" x2="51" y2="44" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="60" y1="53" x2="76" y2="53" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
        </motion.svg>

        {/* TEXT — fades out quickly, stays in position */}
        <motion.div
          className="flex flex-col items-center gap-2 mt-4"
          animate={clicked ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeIn" }}
        >
          <h1
            className="text-white font-extrabold tracking-[0.3em] uppercase text-center"
            style={{ fontSize: "clamp(2rem,7vw,5rem)", fontFamily: "'Trebuchet MS',sans-serif" }}
          >
            {brandName}
          </h1>
          <p className="text-white/45 text-sm tracking-widest italic"
            style={{ fontFamily: "Georgia,serif" }}>
            {tagline}
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none"
          animate={clicked ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white/35 text-[10px] tracking-[0.25em] uppercase">Scroll Down</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ── COLLECTION INFO ── */}
      <motion.div
        className="absolute bottom-14 left-6 max-w-lg"
        animate={clicked ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: clicked ? 2.0 : 0, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: "none" }}
      >
        <h2
          className="text-white font-extrabold tracking-[0.2em] uppercase mb-3"
          style={{ fontSize: "clamp(1.4rem,3.5vw,2.4rem)", fontFamily: "'Trebuchet MS',sans-serif" }}
        >
          {collectionTitle}
        </h2>
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed uppercase tracking-wide">
          {collectionDesc}
        </p>
      </motion.div>

      {/* ── RESET ── */}
      <motion.button
        className="absolute top-5 left-5 text-white/55 hover:text-white text-[11px] tracking-[0.2em] uppercase border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-sm transition-colors"
        animate={clicked ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: clicked ? 2.2 : 0 }}
        onClick={(e) => { e.stopPropagation(); setClicked(false); }}
        style={{ pointerEvents: clicked ? "auto" : "none" }}
      >
        [Reset]
      </motion.button>

    </div>
  );
}