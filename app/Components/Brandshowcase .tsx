"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const BRANDS = [
  {
    id: "tom-archer",
    tag: "SPECSCART.",
    name: "TOM ARCHER",
    script: false,
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus vel viverra egestas arcu egestas pulvinar adipiscing laoreet. Ornare interdum erat metus facilisi sagittis malesuada elit. Quis arcu velit nibh porttitor malesuada. At senectus ultrices elit at gravida. Imperdiet et feugiat ac ut velit penatibus et vitae. Nulla vel facilisi integer lectus eu vitae sed.",
    cta: "Know the Brand",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1400&q=85",
    overlayColor: "rgba(10,12,22,0.78)",
  },
  {
    id: "marc-fabien",
    tag: "SPECSCART.",
    name: "Marc Fabien",
    script: true,
    description:
      "Lorem ipsum dolor sit amet consectetur. Tellus vel viverra egestas arcu egestas pulvinar adipiscing laoreet. Ornare interdum erat metus facilisi sagittis malesuada elit. Quis arcu velit nibh porttitor malesuada. At senectus ultrices elit at gravida. Imperdiet et feugiat ac ut velit penatibus et vitae. Nulla vel facilisi integer lectus eu vitae sed.",
    cta: "Know the Brand",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1400&q=85",
    overlayColor: "rgba(45,28,48,0.80)",
  },
] as const;

type Brand = (typeof BRANDS)[number];

const FADE = { duration: 0.5, ease: "easeInOut" } as const;

function PlayIcon({ size }: { size: number }) {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={c} cy={c} r={c - 1}   stroke="white" strokeWidth="1.5" opacity="0.5"  />
      <circle cx={c} cy={c} r={c * 0.6} stroke="white" strokeWidth="1"   opacity="0.22" />
      <path d={`M${c - 4} ${c - 5.5}l10 5.5-10 5.5V${c - 5.5}z`} fill="white" opacity="0.9" />
    </svg>
  );
}

function ArrowCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8l4 4-4 4M8 12h8" />
    </svg>
  );
}

function BrandName({ brand, expanded }: { brand: Brand; expanded: boolean }) {
  const base: React.CSSProperties = {
    color: "#fff", lineHeight: 1.05, display: "block", whiteSpace: "nowrap",
  };
  if (brand.script) {
    return (
      <motion.span
        animate={{ fontSize: expanded ? "clamp(2.2rem,4.5vw,4rem)" : "clamp(1rem,2.5vw,1.6rem)" }}
        transition={FADE}
        style={{ ...base, fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
      >
        {brand.name}
      </motion.span>
    );
  }
  return (
    <motion.span
      animate={{ fontSize: expanded ? "clamp(1.6rem,3.5vw,2.9rem)" : "clamp(0.85rem,2vw,1.3rem)" }}
      transition={FADE}
      style={{ ...base, fontFamily: "'Trebuchet MS','Segoe UI',sans-serif", fontWeight: 800, letterSpacing: "0.1em" }}
    >
      {brand.name}
    </motion.span>
  );
}

export default function BrandSwitcher() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const activeBrand = BRANDS[activeIdx];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── MOBILE: stacked rows, single shared crossfading background ── */
  if (isMobile) {
    return (
      <div style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        overflow: "hidden",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI',Tahoma,sans-serif",
      }}>

        {/* ── Single shared background image (crossfades like desktop) ── */}
        <AnimatePresence>
          <motion.img
            key={activeBrand.id}
            src={activeBrand.image}
            alt={activeBrand.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              zIndex: 0,
            }}
          />
        </AnimatePresence>

        {/* ── Panels stacked vertically ── */}
        {BRANDS.map((brand, i) => {
          const expanded = activeIdx === i;
          return (
            <motion.div
              key={brand.id}
              animate={{ flex: expanded ? 1.85 : 0.75 }}
              transition={FADE}
              onClick={() => !expanded && setActiveIdx(i)}
              style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                cursor: expanded ? "default" : "pointer",
                minHeight: 0,
                flexShrink: 0,
              }}
            >
              {/* Dark gradient overlay per panel */}
              <motion.div
                animate={{ opacity: expanded ? 1 : 0.55 }}
                transition={FADE}
                style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(160deg, ${brand.overlayColor} 0%, rgba(0,0,0,0.15) 100%)`,
                  zIndex: 0,
                }}
              />

              {/* Content */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "flex-start",
                padding: "0 clamp(1.2rem, 5vw, 2rem)",
              }}>
                {/* TAG */}
                <motion.div
                  animate={{ opacity: expanded ? 1 : 0, maxHeight: expanded ? 30 : 0, marginBottom: expanded ? 12 : 0 }}
                  transition={FADE}
                  style={{ overflow: "hidden", pointerEvents: "none", width: "100%" }}
                >
                  <p style={{ fontSize: "clamp(9px,2.5vw,11px)", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.48)", textTransform: "uppercase", margin: 0 }}>
                    {brand.tag}
                  </p>
                </motion.div>

                {/* PLAY ICON */}
                <motion.div
                  animate={{ scale: expanded ? 1 : 0.72, opacity: expanded ? 1 : 0.55 }}
                  transition={FADE}
                  style={{ transformOrigin: "left center", marginBottom: "0.35rem" }}
                >
                  <PlayIcon size={expanded ? 32 : 20} />
                </motion.div>

                {/* BRAND NAME */}
                <motion.div animate={{ opacity: expanded ? 1 : 0.7 }} transition={FADE} style={{ width: "100%" }}>
                  <BrandName brand={brand} expanded={expanded} />
                </motion.div>

                {/* DESCRIPTION + CTA */}
                <motion.div
                  animate={{ opacity: expanded ? 1 : 0, maxHeight: expanded ? 400 : 0 }}
                  transition={FADE}
                  style={{ overflow: "hidden", pointerEvents: expanded ? "auto" : "none", width: "100%" }}
                >
                  <p style={{ fontSize: "clamp(0.72rem,3.2vw,0.85rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.62)", margin: "0.9rem 0 1.4rem", maxWidth: 320 }}>
                    {brand.description}
                  </p>
                  <button style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", borderBottom: "1.5px solid rgba(255,255,255,0.38)", paddingBottom: 3, color: "white", fontSize: "clamp(0.72rem,3vw,0.84rem)", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "inherit" }}>
                    {brand.cta} <ArrowCircle />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  /* ── DESKTOP: original design — completely unchanged ── */
  return (
    <div style={{
      position: "relative", display: "flex", flexDirection: "row",
      width: "100%", height: "100svh", minHeight: 400, maxHeight: 920,
      overflow: "hidden", background: "#0a0a0a", fontFamily: "'Segoe UI',Tahoma,sans-serif",
    }}>
      <AnimatePresence>
        <motion.img
          key={activeBrand.id} src={activeBrand.image} alt={activeBrand.name}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={FADE}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />
      </AnimatePresence>

      {BRANDS.map((brand, i) => {
        const expanded = activeIdx === i;
        return (
          <motion.div
            key={brand.id}
            animate={{ flex: expanded ? 1.85 : 0.75 }}
            transition={FADE}
            onClick={() => !expanded && setActiveIdx(i)}
            style={{ position: "relative", zIndex: 1, overflow: "hidden", cursor: expanded ? "default" : "pointer", minWidth: 0, flexShrink: 0 }}
          >
            <motion.div
              animate={{ opacity: expanded ? 1 : 0.45 }}
              transition={FADE}
              style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${brand.overlayColor} 0%, rgba(0,0,0,0.1) 100%)`, zIndex: 0 }}
            />

            <div style={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 clamp(1rem, 3vw, 3rem)" }}>
              <motion.div
                animate={{ opacity: expanded ? 1 : 0, maxHeight: expanded ? 40 : 0, marginBottom: expanded ? 18 : 0 }}
                transition={FADE}
                style={{ overflow: "hidden", pointerEvents: "none", width: "100%" }}
              >
                <p style={{ fontSize: "clamp(9px,1vw,11px)", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.48)", textTransform: "uppercase", margin: 0 }}>
                  {brand.tag}
                </p>
              </motion.div>

              <motion.div
                animate={{ scale: expanded ? 1 : 0.72, opacity: expanded ? 1 : 0.55 }}
                transition={FADE}
                style={{ transformOrigin: "left center", marginBottom: "0.4rem" }}
              >
                <PlayIcon size={expanded ? 36 : 22} />
              </motion.div>

              <motion.div animate={{ opacity: expanded ? 1 : 0.7 }} transition={FADE} style={{ width: "100%" }}>
                <BrandName brand={brand} expanded={expanded} />
              </motion.div>

              <motion.div
                animate={{ opacity: expanded ? 1 : 0, maxHeight: expanded ? 400 : 0 }}
                transition={FADE}
                style={{ overflow: "hidden", pointerEvents: expanded ? "auto" : "none", width: "100%" }}
              >
                <p style={{ fontSize: "clamp(0.65rem,0.9vw,0.86rem)", lineHeight: 1.82, color: "rgba(255,255,255,0.62)", margin: "1.2rem 0 1.8rem", maxWidth: 340 }}>
                  {brand.description}
                </p>
                <button style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", borderBottom: "1.5px solid rgba(255,255,255,0.38)", paddingBottom: 3, color: "white", fontSize: "clamp(0.72rem,0.9vw,0.84rem)", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "inherit" }}>
                  {brand.cta}
                  <ArrowCircle />
                </button>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}