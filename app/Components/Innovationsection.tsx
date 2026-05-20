"use client";

/**
 * InnovationSection
 *
 * Fix: nav bar moved OUT of the left column (which had overflow:hidden)
 * into the sticky root container so it is never clipped.
 */

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

function mr(v: number, i0: number, i1: number, o0: number, o1: number) {
  const t = Math.max(0, Math.min(1, (v - i0) / (i1 - i0)));
  const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  return o0 + (o1 - o0) * e;
}

const NAV = ["LENS", "FRAME", "DESIGN"] as const;

interface Props {
  introSrc?:  string;
  lensSrc?:   string;
  frameSrc?:  string;
  designSrc?: string;
}

export default function InnovationSection({
  introSrc  = "/images/glasses-intro.png",
  lensSrc   = "/images/glasses-lens.png",
  frameSrc  = "/images/glasses-frame.png",
  designSrc = "/images/glasses-design.png",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Derived state ─────────────────────────────────────────
     0.00–0.13   intro hold
     0.13–0.26   intro exits UP
     0.26–0.30   gap
     0.30–0.54   LENS
     0.54–0.78   FRAME
     0.78–1.00   DESIGN
  ─────────────────────────────────────────────────────────── */
  const introOp  = Math.max(0, Math.min(1, mr(progress, 0.13, 0.24, 1, 0)));
  const introTY  = mr(progress, 0.13, 0.28, 0, -130);

  const navVisible  = progress >= 0.22;
  const navOp       = Math.max(0, Math.min(1, mr(progress, 0.22, 0.32, 0, 1)));
  const navTY       = mr(progress, 0.22, 0.32, 10, 0);

  const lensOn   = progress >= 0.30 && progress < 0.54;
  const frameOn  = progress >= 0.54 && progress < 0.78;
  const designOn = progress >= 0.78;
  const anySection = lensOn || frameOn || designOn;
  const introImgOn = !anySection && progress < 0.28;

  const activeTab = lensOn ? 0 : frameOn ? 1 : designOn ? 2 : -1;
  const parallaxY = mr(progress, 0, 1, 16, -24);

  const transition = "opacity 0.4s ease, transform 0.4s ease";

  return (
    <div ref={containerRef} className="h-[500vh]">

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">

        {/* ══ NAV BAR — sits DIRECTLY in the sticky root, never clipped ══
            Absolutely positioned at top-left of the viewport.
            Fades in after intro exits.                                    */}
        <div
          className="absolute left-[4.5%] top-8 z-50 flex items-center gap-3"
          style={{
            opacity:   navOp,
            transform: `translateY(${navTY}px)`,
            transition,
          }}
        >
          {NAV.map((label, i) => (
            <span key={label} className="flex items-center gap-3">
              {i > 0 && (
                <span className="text-sm text-black/25">·</span>
              )}
              <span
                className="select-none text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300"
                style={{ color: activeTab === i ? "#1A8A64" : "rgba(0,0,0,0.32)" }}
              >
                {label}
              </span>
            </span>
          ))}
        </div>

        {/* ══ Two-column grid ══ */}
        <div className="grid h-full grid-cols-[45%_55%]">

          {/* ── LEFT column ── */}
          {/* NOTE: no overflow-hidden here — we don't need it,
              nav is outside so nothing clips */}
          <div className="relative">

            {/* INTRO BLOCK — one wrapper, one style */}
            <div
              className="absolute inset-0 flex flex-col justify-center px-[9%]"
              style={{
                opacity:   introOp,
                transform: `translateY(${introTY}px)`,
                transition,
              }}
            >
              <h1 className="select-none text-[clamp(20px,3.2vw,50px)] font-light italic leading-tight tracking-[0.03em] text-black/80">
                INNOVATION
              </h1>
              <p className="my-2 select-none text-[clamp(13px,1.5vw,20px)] font-light text-black/40">
                &amp;
              </p>
              <h1 className="select-none text-[clamp(20px,3.2vw,50px)] font-black uppercase leading-tight tracking-[0.05em] text-black/[0.07]">
                TECHNOLOGY
              </h1>
              <div className="mt-5 flex items-center gap-3">
                {NAV.map((label, i) => (
                  <span key={label} className="flex items-center gap-3">
                    {i > 0 && <span className="text-black/20">·</span>}
                    <span className="select-none text-[9px] font-medium uppercase tracking-[0.2em] text-black/32">
                      {label}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* LENS content */}
            <div
              className="absolute left-[9%] top-[22vh] max-w-[300px] w-[82%]"
              style={{
                opacity:       lensOn ? 1 : 0,
                transform:     `translateY(${lensOn ? 0 : 18}px)`,
                transition,
                pointerEvents: lensOn ? "auto" : "none",
              }}
            >
              <h3 className="mb-3 text-[clamp(17px,1.8vw,24px)] font-bold leading-snug text-black/85">
                Lens Technology
              </h3>
              <p className="text-[13px] leading-relaxed text-black/55">
                <strong className="font-bold text-black/75">Lens Technology</strong>{" "}
                is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            {/* FRAME content */}
            <div
              className="absolute left-[9%] top-[22vh] max-w-[300px] w-[82%]"
              style={{
                opacity:       frameOn ? 1 : 0,
                transform:     `translateY(${frameOn ? 0 : 18}px)`,
                transition,
                pointerEvents: frameOn ? "auto" : "none",
              }}
            >
              <h3 className="mb-3 text-[clamp(17px,1.8vw,24px)] font-bold leading-snug text-black/85">
                Frame Material
              </h3>
              <p className="text-[13px] leading-relaxed text-black/55">
                <strong className="font-bold text-black/75">Frame Material</strong>{" "}
                lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            {/* DESIGN content */}
            <div
              className="absolute left-[9%] top-[22vh] max-w-[300px] w-[82%]"
              style={{
                opacity:       designOn ? 1 : 0,
                transform:     `translateY(${designOn ? 0 : 18}px)`,
                transition,
                pointerEvents: designOn ? "auto" : "none",
              }}
            >
              <h3 className="mb-3 text-[clamp(17px,1.8vw,24px)] font-bold leading-snug text-black/85">
                Performance Driven Design
              </h3>
              <p className="text-[13px] leading-relaxed text-black/55">
                <strong className="font-bold text-black/75">Performance Driven Design</strong>{" "}
                lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

          </div>

          {/* ── RIGHT: glasses ── */}
          <div
            className="relative flex items-center justify-center"
            style={{ transform: `translateY(${parallaxY}px)` }}
          >

            {/* INTRO */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: introImgOn ? 1 : 0, transition }}
            >
              <div className="relative h-[60%] w-[72%]">
                <Image src={introSrc} alt="Actics" fill className="object-contain" draggable={false} priority />
              </div>
            </div>

            {/* LENS */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: lensOn ? 1 : 0, transition }}
            >
              <div className="relative h-[60%] w-[72%]">
                <Image src={lensSrc} alt="Lens" fill className="object-contain" draggable={false} />
                <div
                  className="pointer-events-none absolute left-[55%] top-[38%] flex items-center"
                  style={{ opacity: lensOn ? 1 : 0, transition: "opacity 0.4s ease 0.25s" }}
                >
                  <div className="h-px w-12 bg-black/25" />
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#1A8A64]" />
                </div>
              </div>
            </div>

            {/* FRAME */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: frameOn ? 1 : 0, transition }}
            >
              <div className="relative h-[55%] w-[80%]">
                <Image src={frameSrc} alt="Frame" fill className="object-contain" draggable={false} />
                <div
                  className="pointer-events-none absolute left-[30%] top-[45%] flex items-center"
                  style={{ opacity: frameOn ? 1 : 0, transition: "opacity 0.4s ease 0.25s" }}
                >
                  <div className="h-px w-12 bg-black/25" />
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#1A8A64]" />
                </div>
              </div>
            </div>

            {/* DESIGN */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: designOn ? 1 : 0, transition }}
            >
              <div className="relative h-[65%] w-[55%]">
                <Image src={designSrc} alt="Design" fill className="object-contain" draggable={false} />
                <div
                  className="pointer-events-none absolute left-[55%] top-[55%] flex items-center"
                  style={{ opacity: designOn ? 1 : 0, transition: "opacity 0.4s ease 0.25s" }}
                >
                  <div className="h-px w-12 bg-black/25" />
                  <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#1A8A64]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}