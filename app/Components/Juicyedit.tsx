"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface Props {
  image?: string;
}

export default function JuicyEdit({
  image = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=85",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const taglineY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:ital,wght@1,500&display=swap');`}</style>

      {/* Dark green outer border */}
      <div>
        <div className="flex justify-center text-center max-w-3xl mx-auto my-10 items-center">
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="text-center text-sm text-gray-600 py-10">
              Lorem ipsum dolor sit amet consectetur. Rhoncus in quis faucibus
              suspendisse id velit odio sed. Nulla euismod purus proin sit lorem
              mauris ultrices amet risus. Vel leo tincidunt in in nec. Tristique
              pulvinar senectus a ultrices pharetra nibh natoque enim.
            </h2>
          </div>
        </div>
        <div
          ref={ref}
          className="relative w-full overflow-hidden aspect-[16/7] min-h-[320px]"
        >
          {/* BG image */}
          <img
            src={image}
            alt="The Juicy Edit"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

          {/* Shop Women — top left */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
            <a
              href="/sunglasses/womens-sunglasses"
              className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 text-[11px] md:text-xs font-semibold tracking-wide px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow hover:shadow-md transition-all duration-200 group"
            >
              Shop Women
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                →
              </span>
            </a>
          </div>

          {/* Shop Men — top right */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
            <a
              href="/sunglasses/mens-sunglasses"
              className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 text-[11px] md:text-xs font-semibold tracking-wide px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow hover:shadow-md transition-all duration-200 group"
            >
              Shop Men
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                →
              </span>
            </a>
          </div>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center">
            {/* Tagline */}
            <motion.p
              style={{
                y: taglineY,
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
              }}
              className="text-white/90 text-[10px] sm:text-[11px] md:text-[13px] tracking-[0.45em] uppercase mb-3 md:mb-4 drop-shadow"
            >
              Step into the pulse of Fashion
            </motion.p>

            {/* CTA pill */}
            <a
              href="/collections/the-juicy-edit"
              className="inline-flex items-center gap-2 mb-4 md:mb-5 bg-[#f5ede0]/90 hover:bg-[#f5ede0] text-gray-800 text-[11px] md:text-[13px] font-bold tracking-[0.12em] uppercase px-5 md:px-7 py-2 md:py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-white/40"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-70"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Shop Collection
            </a>

            {/* "The Juicy edit" script title */}
            <div className="flex flex-col items-center leading-none">
              {/* "The Juicy" */}
              <span
                className="block text-[clamp(2.8rem,8vw,6.5rem)] font-bold leading-none select-none bg-gradient-to-br from-orange-500 via-amber-400 to-red-600 bg-clip-text text-transparent drop-shadow-lg"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                The Juicy
              </span>
              {/* "edit" offset right */}
              <span
                className="block self-end mr-[8%] text-[clamp(1.4rem,4vw,3.2rem)] font-bold leading-none select-none -mt-1 md:-mt-2 bg-gradient-to-br from-orange-500 via-amber-400 to-red-500 bg-clip-text text-transparent drop-shadow"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                edit
              </span>
            </div>

            {/* Description */}
            <p className="text-white/80 text-[10px] sm:text-[11px] md:text-xs max-w-[560px] leading-relaxed mt-3 md:mt-4 px-4 drop-shadow">
              Introducing our fun range of Tom Archer sunglasses, inspired by
              the sizzle of the sun and the fizzle of the soda pop. They are a
              toast to all succulent things you crave when the mercury rises.
              So, slip them on and let your style melt the heat away.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
