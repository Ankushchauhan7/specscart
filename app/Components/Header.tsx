"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const GlassesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 36 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="12" r="7" /><circle cx="27" cy="12" r="7" />
    <path d="M2 12 Q2 4 9 4" /><path d="M34 12 Q34 4 27 4" />
    <line x1="16" y1="12" x2="20" y2="12" />
  </svg>
);

const CartIcon = ({ count = 0 }: { count?: number }) => (
  <span className="relative">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-[#2bb5a0] text-white text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center leading-none">
        {count}
      </span>
    )}
  </span>
);

const CloseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Glasses",       href: "/glasses",       hasDropdown: true  },
  { label: "Sunglasses",    href: "/sunglasses",    hasDropdown: true  },
  { label: "Try At Home",   href: "/try-at-home",   hasDropdown: false },
  { label: "Free Eye-Test", href: "/free-eye-test", hasDropdown: false },
  { label: "Accessories",   href: "/accessories",   hasDropdown: true  },
];

const ICON_BUTTONS = [
  { icon: <SearchIcon />,         label: "Search",   href: "/search"  },
  { icon: <UserIcon />,           label: "Account",  href: "/account" },
  { icon: <HeartIcon />,          label: "Wishlist", href: "/wishlist" },
  { icon: <GlassesIcon />,        label: "Store",    href: "/store"   },
  { icon: <CartIcon count={1} />, label: "Cart",     href: "/cart"    },
];

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [promoClosed, setPromoClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 font-sans">

      {/* ── White main header — desktop/laptop only ────────────────────────── */}
      <div
        className={`hidden lg:block bg-white border-b border-gray-200 relative overflow-hidden transition-[height] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled ? "h-14" : "h-[75px]"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 relative h-full">

          {/* ── Logo — outer div handles position/animation, inner Link owns relative context ── */}
          <div
            className={`absolute top-0 z-20 w-[210px]
              transition-[left,transform,height] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]
              ${scrolled
                ? "left-0 translate-x-0 h-14"
                : "left-1/2 -translate-x-1/2 h-full"
              }`}
          >
            {/* block + relative: makes <a> a proper block so h-full works, and gives fill Image its context */}
            <Link href="/" className="relative block w-full h-full">
              <Image
                src="/Headlogo.svg"
                alt="Specscart"
                fill
                priority
                className="object-fill"
              />
            </Link>
          </div>

          {/* ── Left column ────────────────────────────────────────────────── */}
          <div className="flex flex-col h-full">

            {/* Info row — collapses on scroll */}
            <div
              className={`flex items-center gap-3 text-xs text-gray-500 font-medium overflow-hidden whitespace-nowrap
                transition-[height,opacity] duration-[400ms] ease-in-out
                ${scrolled ? "h-0 opacity-0" : "h-9 opacity-100"}`}
            >
              <span className="bg-[#2d1b4e] text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm shrink-0">
                Ski Goggles
              </span>
              <span>Free Shipping &amp; Returns</span>
              <span className="text-gray-300">|</span>
              <span>24-hour Dispatch</span>
            </div>

            {/* Nav row */}
            <nav
              className={`flex items-center gap-0.5
                transition-[height,padding-left] duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                ${scrolled ? "h-14 pl-[226px]" : "h-[52px] pl-0"}`}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1 text-[12px] font-semibold text-gray-900 px-3 py-2 rounded hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <span className="text-gray-400 mt-px"><ChevronIcon /></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Right column ───────────────────────────────────────────────── */}
          <div className="absolute right-6 top-0 h-full flex flex-col items-end">

            {/* Help | Sign In — collapses on scroll */}
            <div
              className={`flex items-center text-xs text-gray-600 font-medium gap-1 overflow-hidden
                transition-[height,opacity] duration-[400ms] ease-in-out
                ${scrolled ? "h-0 opacity-0" : "h-9 opacity-100"}`}
            >
              <Link href="/help"   className="px-1 hover:text-gray-900 transition-colors">Help</Link>
              <span className="text-gray-300">|</span>
              <Link href="/signin" className="px-1 hover:text-gray-900 transition-colors">Sign In</Link>
            </div>

            {/* Icon buttons */}
            <div
              className={`flex items-center gap-0 transition-[height] duration-[450ms] ease-in-out
                ${scrolled ? "h-14" : "h-[52px]"}`}
            >
              {ICON_BUTTONS.map(({ icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Teal promo bar ─────────────────────────────────────────────────── */}
      <div
        className={`relative flex items-center justify-center text-white text-[13px] font-medium bg-[#2bb5a0]
          overflow-hidden transition-[height,opacity] duration-[400ms] ease-in-out
          ${promoClosed ? "h-0 opacity-0" : "h-10 opacity-100"}`}
      >
        <span className="px-10 whitespace-nowrap">
          Free Shipping &amp; 24 Hr Dispatch. Even On Weekends
        </span>
        <button
          onClick={() => setPromoClosed(true)}
          aria-label="Dismiss"
          className="absolute right-5 opacity-75 hover:opacity-100 transition-opacity p-1"
        >
          <CloseIcon />
        </button>
      </div>

    </header>
  );
}