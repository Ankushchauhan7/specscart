"use client";

/**
 * BrandIntroSection — 6 frames, scroll-driven
 *
 * F1  White logo centred on black
 * F2  "Introducing" + teal [logo ACTICS] lockup centred
 * F3  Lockup + "Introducing" rise to top, video plays behind
 * F4  Lockup fades out, video continues, durability text rises from bottom
 * F5  Video gone → glasses-grid bg + "THE ACTICS DIFFERENCE"
 * F6  Glasses gone → "DESIGNED FOR ACTIVE LIFESTYLES" rises to centre
 *     ↓ STAYS AS BANNER — never fades. Next section scrolls below it.
 *
 * Install:  npm install motion
 * Font:     add Cormorant Garamond 700 via next/font/google
 */

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const LOGO_PATH =
  "M370.073 201.614C361.974 200.199 353.615 199.146 345.3 198.488C337.845 198.446 330.262 198.13 322.937 197.451C272.414 193.135 225.173 175.373 185.648 145.832C146.124 116.292 115.614 75.9425 96.9819 28.5723C93.9727 20.9491 91.2215 13.8753 87.2212 6.2729L84.0599 0L56.7714 14.0423L58.7041 20.8955C61.1315 28.6497 63.8605 36.4372 66.8698 44.0603C85.8325 92.1461 91.9126 145.868 84.5219 200.029C77.32 252.317 57.9304 303.344 28.0673 348.595C23.3213 355.232 18.5754 361.869 13.9158 368.385C10.4642 373.211 6.92628 378.159 4.14197 383.645L0 389.437L20.3225 406.523L25.0684 399.886C28.6926 394.818 33.2429 390.048 37.061 384.936C41.7207 378.42 46.5529 371.663 51.2125 365.147C83.5876 322.919 124.627 288.475 170.755 264.817C216.882 241.159 266.699 229.005 315.863 229.414C323.231 229.576 330.814 229.893 338.333 230.528C346.584 230.593 354.793 230.262 363.002 229.932L369.617 229.555L374.79 202.981L370.073 201.614ZM160.627 236.944C137.857 248.63 116.133 262.757 95.8462 279.07C113.518 230.19 121.008 179.021 117.788 129.166C148.292 165.024 186.813 192.57 230.607 209.845C206.569 216.398 183.014 225.607 160.368 237.307L160.627 236.944Z";

const GAP = 60;

function LogoMark({ variant }: { variant: "white" | "teal" }) {
  return (
    <svg viewBox="0 0 375 407" fill="none" className="block h-auto w-[clamp(44px,4vw,64px)]" aria-hidden>
      {variant === "teal" && (
        <defs>
          <linearGradient id="lg" x1="375" y1="0" x2="0" y2="407" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#6DD4B0" />
            <stop offset="55%"  stopColor="#1A8A64" />
            <stop offset="100%" stopColor="#083D25" />
          </linearGradient>
        </defs>
      )}
      <path d={LOGO_PATH} fill={variant === "white" ? "white" : "url(#lg)"} />
    </svg>
  );
}

function r(sv: MotionValue<number>, i: [number, number], o: [number, number]) {
  return useTransform(sv, i, o, { clamp: true });
}

/* ── Shared F6 content — rendered twice (animation + persistent banner) ── */
function F6Content() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <p className="mb-6 select-none text-[11px] font-light uppercase tracking-[0.42em] text-white/40">
        The Actics Edge
      </p>
      <h2 className="mb-8 select-none text-[clamp(28px,4.5vw,64px)] font-black uppercase leading-[1.05] tracking-[0.02em] text-white/25">
        Designed for
        <br />
        <span className="text-white/35">Active Lifestyles</span>
      </h2>
      <p className="mx-auto max-w-xl select-none text-[clamp(13px,1.2vw,16px)] font-light leading-relaxed text-white/50">
        Actics combines{" "}
        <span className="text-[#5AC4A0]">innovation</span> and style, offering advanced
        protection and{" "}
        <span className="text-[#5AC4A0]">enhanced vision</span> for athletes pushing their limits.
      </p>
    </div>
  );
}

export default function BrandIntroSection({ videoSrc = "/videos/tactics-brand.mp4" }: { videoSrc?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const acticsRef    = useRef<HTMLSpanElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const [aw, setAw]  = useState(380);
  const [vh, setVh]  = useState(900);

  useEffect(() => {
    const el = acticsRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAw(el.offsetWidth));
    ro.observe(el);
    setAw(el.offsetWidth);
    setVh(window.innerHeight);
    const onR = () => setVh(window.innerHeight);
    window.addEventListener("resize", onR);
    return () => { ro.disconnect(); window.removeEventListener("resize", onR); };
  }, []);

  const { scrollYProgress: p } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return p.on("change", (v) => {
      const vid = videoRef.current;
      if (!vid) return;
      if (v >= 0.35 && vid.paused)  vid.play().catch(() => {});
      if (v <  0.28)               { vid.pause(); vid.currentTime = 0; }
    });
  }, [p]);

  /* ── Scroll map  (700vh) ─────────────────────────────────────
     0.00-0.07  F1 hold
     0.07-0.22  F1 → F2
     0.22-0.32  F2 hold
     0.32-0.44  F2 → F3   (lockup rises, video in)
     0.44-0.54  F3 hold
     0.54-0.64  F3 → F4   (lockup out, durability text up)
     0.64-0.72  F4 hold
     0.72-0.80  F4 → F5   (video out, glasses in)
     0.80-0.88  F5 hold
     0.88-0.96  F5 → F6   (glasses out, F6 rises to centre)
     0.96-1.00  F6 hold   → sticky ends
  ──────────────────────────────────────────────────────────── */

  // F1 → F2
  const groupShift = useTransform(p, [0.07, 0.22], [(aw + GAP) / 2, 0], { clamp: true });
  const logoRot    = r(p, [0.07, 0.22], [0, -12]);
  const whiteOp    = r(p, [0.07, 0.20], [1, 0]);
  const tealOp     = r(p, [0.07, 0.20], [0, 1]);
  const acticsX    = useTransform(p, [0.12, 0.24], [aw + 140, 0], { clamp: true });
  const acticsOp   = r(p, [0.12, 0.22], [0, 1]);
  const introOp    = r(p, [0.07, 0.20], [0, 1]);
  const introY     = r(p, [0.07, 0.20], [12, 0]);

  // F2 → F3: lockup rises to top
  const lockupRise = useTransform(p, [0.32, 0.44], [0, -(vh / 2 - 56)], { clamp: true });
  const videoOp    = useTransform(p, [0.34, 0.46, 0.72, 0.80], [0, 1, 1, 0], { clamp: true });

  // F3 → F4: lockup fades out
  const lockupOp   = r(p, [0.54, 0.62], [1, 0]);

  // F4: durability text
  const durOp      = useTransform(p, [0.56, 0.65, 0.72, 0.78], [0, 1, 1, 0], { clamp: true });
  const durY       = r(p, [0.56, 0.65], [60, 0]);

  // F5: glasses grid
  const f5Op       = useTransform(p, [0.74, 0.82, 0.88, 0.94], [0, 1, 1, 0], { clamp: true });

  // F6: rises from bottom to centre — NO fade out, stays at 1
  const f6Op       = r(p, [0.88, 0.95], [0, 1]);
  const f6Y        = r(p, [0.88, 0.95], [80, 0]);

  return (
    <>
      {/* ══════════════════════════════════════════════
          PART A — 700vh scroll animation (F1 → F6)
      ══════════════════════════════════════════════ */}
      <div ref={containerRef} className="h-[700vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

          {/* VIDEO */}
          <motion.div style={{ opacity: videoOp }} className="absolute inset-0 -z-10">
            <video ref={videoRef} src={videoSrc} muted loop playsInline className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black/10" />
          </motion.div>

          {/* LOCKUP (F1 F2 F3) */}
          <motion.div
            style={{ opacity: lockupOp, y: lockupRise }}
            className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2"
          >
            <motion.p
              style={{ opacity: introOp, y: introY }}
              className="mb-3 select-none text-center text-[13px] font-light uppercase tracking-[0.42em] text-white/60 pointer-events-none"
            >
              Introducing
            </motion.p>
            <motion.div style={{ x: groupShift }} className="flex items-center justify-center">
              <motion.div style={{ rotate: logoRot }} className="relative shrink-0">
                <motion.div style={{ opacity: whiteOp }} className="absolute inset-0 flex">
                  <LogoMark variant="white" />
                </motion.div>
                <motion.div style={{ opacity: tealOp }} className="flex">
                  <LogoMark variant="teal" />
                </motion.div>
              </motion.div>
              <div className="w-[20px] shrink-0" />
              <motion.span
                ref={acticsRef}
                style={{ x: acticsX, opacity: acticsOp }}
                className="block select-none whitespace-nowrap bg-[linear-gradient(180deg,#5AC4A0_0%,#16785A_45%,#083A24_100%)] bg-clip-text text-transparent font-bold leading-none tracking-[0.01em] text-[clamp(44px,5.5vw,72px)] [font-family:'Cormorant_Garamond',Georgia,serif] pointer-events-none"
              >
                ACTICS
              </motion.span>
            </motion.div>
          </motion.div>

          {/* F4 — DURABILITY TEXT */}
          <motion.div
            style={{ opacity: durOp, y: durY }}
            className="absolute inset-x-0 bottom-[12%] z-20 px-8 text-center"
          >
            <p className="text-[clamp(11px,1.1vw,14px)] font-light uppercase tracking-[0.28em] text-white/70">
              With Actics, experience unmatched{" "}
              <strong className="font-semibold text-white">DURABILITY</strong> and{" "}
              <strong className="font-semibold text-white">PERFORMANCE,</strong>
              <br />
              <strong className="font-semibold text-white">DESIGNED</strong> to meet the demands of high-intensity sports.
            </p>
          </motion.div>

          {/* F5 — GLASSES GRID */}
          <motion.div style={{ opacity: f5Op }} className="absolute inset-0 z-30">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0 opacity-60">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center bg-[#1a1a1a]">
                  <svg viewBox="0 0 120 45" fill="none" className="w-3/4">
                    <rect x="3" y="9" width="50" height="27" rx="13" stroke="rgba(0,0,0,0.95)" strokeWidth="3" fill="rgba(0,0,0,0.7)" />
                    <rect x="67" y="9" width="50" height="27" rx="13" stroke="rgba(0,0,0,0.95)" strokeWidth="3" fill="rgba(0,0,0,0.7)" />
                    <line x1="53" y1="22" x2="67" y2="22" stroke="rgba(0,0,0,0.8)" strokeWidth="2.5" />
                    <line x1="3" y1="12" x2="0" y2="4" stroke="rgba(0,0,0,0.7)" strokeWidth="2" />
                    <line x1="117" y1="12" x2="120" y2="4" stroke="rgba(0,0,0,0.7)" strokeWidth="2" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="select-none text-[clamp(20px,3vw,40px)] font-light uppercase tracking-[0.25em] text-white">
                The Actics Difference
              </h2>
            </div>
          </motion.div>

          {/* F6 — inside animation (rises to centre, stays at opacity 1) */}
          <motion.div
            style={{ opacity: f6Op, y: f6Y }}
            className="absolute inset-0 z-40 bg-black"
          >
            <F6Content />
          </motion.div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PART B — F6 PERSISTENT BANNER
          Sticky top-0, sits right after the 700vh block.
          -mt-screen so it overlaps flush — no gap, no black.
          Stays pinned as a banner while your next sections
          scroll underneath it.
      ══════════════════════════════════════════════ */}
      <div className="sticky top-0 -mt-[100vh] h-screen w-full bg-black">
        <F6Content />
      </div>

      {/* ══════════════════════════════════════════════
          PART C — Your next page sections go here.
          They scroll over the F6 banner naturally.
          Example placeholder — replace with your own content.
      ══════════════════════════════════════════════ */}
      {/* <YourNextSection /> */}
    </>
  );
}