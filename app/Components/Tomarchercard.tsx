"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Props {
  name: string;
  image: string;
  script?: boolean;
  ctaButtons?: string[];
  accentColor?: string;
}

export default function BrandImageScroll({
  name,
  image,
  script = false,
  ctaButtons = ["Shop Glasses", "Shop Sunglasses"],
  accentColor = "#1DBFAD",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      const ch = imageRef.current?.offsetHeight ?? 0;
      const th = textRef.current?.offsetHeight ?? 0;
      setTravel(Math.max(0, ch - th));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (imageRef.current) ro.observe(imageRef.current);
    if (textRef.current)  ro.observe(textRef.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, travel]);

  return (
    // Outer scroll container — 300vh gives slow pace
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: "300vh" }}
    >
      {/* Sticky viewport — pinned while scrolling */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-white overflow-hidden">

        {/* Card column — full viewport height */}
        <div className="flex flex-col h-full w-[min(420px,88vw)]">

          {/* Image — flex-1 fills all height above buttons */}
          <div
            ref={imageRef}
            className="relative w-full flex-1 min-h-0 overflow-hidden bg-[#edeae4]"
          >
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* Moving brand name */}
            <motion.div
              style={{ y }}
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none text-center"
            >
              <span
                ref={textRef}
                className={[
                  "block leading-none select-none whitespace-nowrap",
                  "text-[clamp(2.4rem,5vw,3.2rem)] font-extrabold",
                  script ? "normal-case tracking-[0.02em]" : "uppercase tracking-[0.12em]",
                ].join(" ")}
                style={{
                  fontFamily: script
                    ? "'Dancing Script', cursive"
                    : "'Trebuchet MS', 'Segoe UI', sans-serif",
                  color: "rgba(255,255,255,0.32)",
                  textShadow: "0 2px 16px rgba(0,0,0,0.08)",
                }}
              >
                {name}
              </span>
            </motion.div>
          </div>

          {/* Buttons — fixed 64px row, always visible */}
          <div className="h-16 shrink-0 flex items-center justify-center gap-3 bg-white">
            {ctaButtons.map((label) => (
              <button
                key={label}
                className="rounded-full px-6 py-2 text-[clamp(0.7rem,2vw,0.8rem)] font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer border-[1.5px]"
                style={{ borderColor: accentColor, color: accentColor }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.background = accentColor;
                  (e.currentTarget).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.background = "transparent";
                  (e.currentTarget).style.color = accentColor;
                }}
              >
                {label}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}