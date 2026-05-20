"use client";

/**
 * ActicsEdgeSection
 * ─────────────────
 * Scroll through 3 content slides with a parallax glasses image.
 *
 * Layout (matches your screenshots):
 *   • White background
 *   • "THE ACTICS EDGE" — small caps eyebrow, centred, static
 *   • Body text — centred, fades + slides between 3 versions
 *   • Glasses image — fixed parallax (moves slower than scroll)
 *
 * Usage:
 *   <ActicsEdgeSection glassesImageSrc="/images/actics-glasses.png" />
 *
 * The component is self-contained (300vh). Place it right after
 * <BrandIntroSection /> in your page.
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/* ── Slide content ─────────────────────────────────────────── */
const SLIDES = [
  {
    body: (
      <>
        Actics combines{" "}
        <span className="text-[#1A8A64]">innovation</span> and style, offering
        advanced protection and{" "}
        <span className="text-[#1A8A64]">enhanced vision</span> for athletes
        pushing their limits.
      </>
    ),
  },
  {
    body: (
      <>
        Built for speed, comfort, and endurance, Actics enhances your{" "}
        <span className="text-[#1A8A64]">performance</span> across all sports,
        with clarity that lasts.
      </>
    ),
  },
  {
    body: (
      <>
        Actics redefines sports eyewear with precision, offering
        high-performance lenses and frames built for{" "}
        <span className="text-[#1A8A64]">action-packed adventures</span>.
      </>
    ),
  },
];

/* ── Easing helper ─────────────────────────────────────────── */
// Returns 0 at scroll edges and 1 at centre of a slide's window
function useSlideProgress(
  sv: ReturnType<typeof useScroll>["scrollYProgress"],
  start: number,
  end: number,
) {
  // fade in: start → start+0.08 | hold: +0.08 → end-0.08 | fade out: end-0.08 → end
  const opacity = useTransform(
    sv,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const y = useTransform(
    sv,
    [start, start + 0.1, end - 0.1, end],
    [20, 0, 0, -20],
    { clamp: true },
  );
  return { opacity, y };
}

interface Props {
  /** Path to the glasses product image — e.g. "/images/actics-glasses.png" */
  glassesImageSrc?: string;
}

export default function ActicsEdgeSection({
  glassesImageSrc = "/images/actics-glasses.png",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Text slides
       Slide 1: 0.00 → 0.38
       Slide 2: 0.33 → 0.67
       Slide 3: 0.62 → 1.00                                    */
  const s1 = useSlideProgress(scrollYProgress, 0.0,  0.38);
  const s2 = useSlideProgress(scrollYProgress, 0.33, 0.67);
  const s3 = useSlideProgress(scrollYProgress, 0.62, 1.0);

  /* ── Glasses parallax
       Moves UP 60px as you scroll from 0 → 1
       (image moves slower than the page → classic parallax feel) */
  const glassesY = useTransform(scrollYProgress, [0, 1], [30, -30], {
    clamp: true,
  });

  /* ── Glasses scale: very slight zoom-in across the 3 slides ── */
  const glassesScale = useTransform(scrollYProgress, [0, 1], [1, 1.06], {
    clamp: true,
  });

  return (
    /* 300vh — one slide per 100vh */
    <div ref={containerRef} className="h-[300vh]">

      {/* Sticky white stage */}
      <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden bg-white">

        {/* ── Top text area ── */}
        <div className="relative z-10 flex w-full flex-col items-center pt-[8vh]">

          {/* Eyebrow — always visible */}
          <p className="mb-6 select-none text-[11px] font-normal uppercase tracking-[0.4em] text-black/50">
            The Actics Edge
          </p>

          {/* Text slide container — fixed height so glasses don't jump */}
          <div className="relative h-[100px] w-full max-w-[640px] px-6">

            {/* Slide 1 */}
            <motion.p
              style={{ opacity: s1.opacity, y: s1.y }}
              className="absolute inset-x-0 select-none text-center text-[clamp(15px,1.6vw,19px)] font-normal leading-relaxed text-black/80"
            >
              {SLIDES[0].body}
            </motion.p>

            {/* Slide 2 */}
            <motion.p
              style={{ opacity: s2.opacity, y: s2.y }}
              className="absolute inset-x-0 select-none text-center text-[clamp(15px,1.6vw,19px)] font-normal leading-relaxed text-black/80"
            >
              {SLIDES[1].body}
            </motion.p>

            {/* Slide 3 */}
            <motion.p
              style={{ opacity: s3.opacity, y: s3.y }}
              className="absolute inset-x-0 select-none text-center text-[clamp(15px,1.6vw,19px)] font-normal leading-relaxed text-black/80"
            >
              {SLIDES[2].body}
            </motion.p>
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex items-center gap-2">
            {[s1, s2, s3].map((s, i) => (
              <motion.div
                key={i}
                style={{ opacity: s.opacity }}
                className="h-[5px] w-[5px] rounded-full bg-[#1A8A64]"
              />
            ))}
          </div>
        </div>

        {/* ── Glasses image — parallax ── */}
        <motion.div
          style={{ y: glassesY, scale: glassesScale }}
          className="absolute bottom-0 left-1/2 w-[min(580px,85vw)] -translate-x-1/2"
        >
          <Image
            src={glassesImageSrc}
            alt="Actics sports eyewear"
            width={580}
            height={420}
            className="h-auto w-full select-none"
            priority
            draggable={false}
          />
        </motion.div>

        {/* Subtle bottom gradient so glasses blend into white */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

      </div>
    </div>
  );
}