"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Collection {
  name: string;
  image: string;
  tag?: string;
  href?: string;
}

interface Props {
  title?: string;
  collections: Collection[];
  accentColor?: string;
}

export default function CollectionsCarousel({
  title = "COLLECTIONS",
  collections = [],
  accentColor = "#1DBFAD",
}: Props) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = collections.length;

  const go = useCallback(
    (next: number) => {
      const n = (next + total) % total;
      setDirection(next >= active ? 1 : -1);
      setActive(n);
    },
    [active, total]
  );

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 4000);
    return () => clearInterval(t);
  }, [active, go]);

  const prevIdx = (active - 1 + total) % total;
  const nextIdx = (active + 1) % total;

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      className="w-full bg-white select-none py-6"
      style={{ fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif" }}
    >
      {/* Header: title CENTERED, arrows TOP-RIGHT absolutely positioned */}
      <div className="relative flex items-center justify-center px-6 mb-5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.25em] text-gray-900 text-center py-10">
          {title}
        </h2>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <button
            onClick={() => go(active - 1)}
            className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Previous"
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go(active + 1)}
            className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:border-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Next"
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/*
        Full-width track — overflow hidden clips the peeks.
        Layout: [left-peek ~8%] [active ~76% with px gap] [right-peek ~8%]
        Side peeks are absolutely anchored to screen edges, active slide is centered.
      */}
      <div className="relative w-full overflow-hidden">

        {/* LEFT PEEK — anchored to left edge, shows right portion of prev slide */}
        <div
          className="absolute top-0 bottom-0 left-0 cursor-pointer z-10"
          style={{ width: "8vw" }}
          onClick={() => go(active - 1)}
        >
          {collections[prevIdx]?.image && (
            <div className="relative w-full h-full overflow-hidden rounded-r-xl">
              {/* Show the RIGHT edge of the prev slide image */}
              <img
                src={collections[prevIdx].image}
                alt=""
                className="absolute top-0 right-0 h-full object-cover"
                style={{
                  width: "calc(8vw + 76vw - 2px)",
                  maxWidth: "none",
                  objectPosition: "right center",
                }}
              />
              {/* Heavy dark overlay */}
              <div className="absolute inset-0 bg-black/60" />
              {/* Faded name + button */}
              <div className="absolute bottom-3 left-2 flex flex-col gap-1 opacity-75">
                <span
                  className="text-white font-extrabold tracking-wider"
                  style={{
                    fontSize: "clamp(0.55rem, 1.4vw, 0.85rem)",
                    textShadow: `0 0 10px ${accentColor}88`,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "7vw",
                    display: "block",
                    textOverflow: "ellipsis",
                  }}
                >
                  {collections[prevIdx]?.name}
                </span>
                <span
                  className="inline-block text-[9px] font-semibold tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: accentColor, color: "#fff", width: "fit-content" }}
                >
                  Shop Now
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ACTIVE SLIDE — centered with side margins = peek width + gap */}
        <div
          className="relative mx-auto overflow-hidden rounded-xl"
          style={{
            width: "calc(100% - 16vw - 16px)",
            aspectRatio: "16/9",
            marginLeft: "calc(8vw + 8px)",
            marginRight: "calc(8vw + 8px)",
          }}
        >
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              {collections[active]?.image && (
                <img
                  src={collections[active].image}
                  alt={collections[active].name}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Bottom gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 45%, transparent 100%)",
                }}
              />
              {/* Name + CTA */}
              <div className="absolute bottom-4 left-5 flex flex-col gap-2">
                <span
                  className="text-white font-extrabold tracking-wider"
                  style={{
                    fontSize: "clamp(1rem, 3vw, 1.6rem)",
                    textShadow: `0 0 24px ${accentColor}99, 0 2px 8px rgba(0,0,0,0.5)`,
                  }}
                >
                  {collections[active].name}
                </span>
                <a
                  href={collections[active].href ?? "#"}
                  className="inline-block text-xs font-semibold tracking-widest px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ background: accentColor, color: "#fff", width: "fit-content" }}
                >
                  Shop Now
                </a>
              </div>
              {/* Optional tag */}
              {collections[active].tag && (
                <div
                  className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {collections[active].tag}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT PEEK — anchored to right edge, shows left portion of next slide */}
        <div
          className="absolute top-0 bottom-0 right-0 cursor-pointer z-10"
          style={{
            width: "8vw",
            top: 0,
            bottom: 0,
          }}
          onClick={() => go(active + 1)}
        >
          {collections[nextIdx]?.image && (
            <div className="relative w-full h-full overflow-hidden rounded-l-xl">
              {/* Show the LEFT edge of the next slide image */}
              <img
                src={collections[nextIdx].image}
                alt=""
                className="absolute top-0 left-0 h-full object-cover"
                style={{
                  width: "calc(8vw + 76vw - 2px)",
                  maxWidth: "none",
                  objectPosition: "left center",
                }}
              />
              {/* Heavy dark overlay */}
              <div className="absolute inset-0 bg-black/60" />
              {/* Faded name + button */}
              <div className="absolute bottom-3 left-2 flex flex-col gap-1 opacity-75">
                <span
                  className="text-white font-extrabold tracking-wider"
                  style={{
                    fontSize: "clamp(0.55rem, 1.4vw, 0.85rem)",
                    textShadow: `0 0 10px ${accentColor}88`,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "7vw",
                    display: "block",
                    textOverflow: "ellipsis",
                  }}
                >
                  {collections[nextIdx]?.name}
                </span>
                <span
                  className="inline-block text-[9px] font-semibold tracking-widest px-2 py-0.5 rounded-full"
                  style={{ background: accentColor, color: "#fff", width: "fit-content" }}
                >
                  Shop Now
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {collections.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 18 : 6,
              height: 6,
              background: i === active ? accentColor : "#d1d5db",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}