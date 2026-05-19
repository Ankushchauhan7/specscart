"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "TikTok",
    href: "#",
    icon: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z",
  },
  {
    label: "Facebook",
    href: "#",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "YouTube",
    href: "#",
    icon: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "Pinterest",
    href: "#",
    icon: "M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z",
  },
];

const navGroups = [
  { label: "Glasses", href: "/glasses" },
  { label: "Sunglasses", href: "/sunglasses" },
  { label: "Lenses", href: "/lenses" },
  { label: "Brands", href: "/brands" },
  { label: "Services", href: "/services" },
  { label: "Stores", href: "/stores" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Jobs", href: "/jobs" },
  { label: "Blogs", href: "/blogs" },
];

const navLinkStyle: React.CSSProperties = {
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "1.4",
};

export default function Footer() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (label: string) =>
    setOpenItem((prev) => (prev === label ? null : label));

  const navLinkClass =
    "text-white/85 hover:text-white transition-colors cursor-pointer";

  return (
    <footer>
      {/* ── Newsletter Bar ── */}
      <div className="bg-gray-50 border-b border-gray-200 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xl  font-bold text-gray-800 text-center md:text-left">
            Exclusive launches, early offers and some fun.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Join us for our Newsletter"
              className="w-full sm:flex-1 md:w-80 border border-gray-300 rounded-full px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all bg-white"
            />

            <button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full px-6 py-2.5 text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div
        className="text-white relative overflow-hidden"
        style={{ background: "linear-gradient(to right, #2F1339, #421E4E)" }}
      >
        {/* Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 18vw, 240px)",
            fontFamily: "'Segoe UI', sans-serif",
            fontWeight: 600,
            letterSpacing: ".8rem",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            opacity: 0.5,
            userSelect: "none",
            lineHeight: 1.5,
          }}
        >
          SPECSCART
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 relative z-10">
          {/* ════ DESKTOP layout (md+) ════ */}
          <div className="hidden lg:block">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-4 border-b border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                <Image
                  src="/specscart-logo.svg"
                  alt="Specscart"
                  width={160}
                  height={40}
                />
                <div className="flex items-center gap-2 text-sm text-white font-semibold">
                  Excellent 4.8 out of 5{" "}
                  <span className="text-green-400">★</span> Trustpilot
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Image
                  src="/paymentgateway.svg"
                  alt="Payment methods"
                  width={350}
                  height={40}
                />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_1px_1fr] gap-6 py-2">
              <div className="grid grid-cols-3 gap-6 pt-10">
                <ul className="flex flex-col gap-5">
                  {[
                    "Glasses",
                    "Sunglasses",
                    "Lenses",
                    "Services",
                    "Brands",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className={navLinkClass} style={navLinkStyle}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-5">
                  {["About Us", "Blogs", "Stores", "Reviews"].map((item) => (
                    <li key={item}>
                      <a href="#" className={navLinkClass} style={navLinkStyle}>
                        {item}
                      </a>
                    </li>
                  ))}
                  <li className="flex items-center gap-2 flex-wrap">
                    <a href="#" className={navLinkClass} style={navLinkStyle}>
                      Career
                    </a>
                    <span className="bg-[#1DBFAD] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold leading-tight">
                      We are Hiring
                    </span>
                  </li>
                </ul>
                <ul className="flex flex-col gap-5">
                  {[
                    "Help & FAQs",
                    "Your Prescription",
                    "How to Order",
                    "Delivery Information",
                  ].map((item) => (
                    <li key={item}>
                      <a href="#" className={navLinkClass} style={navLinkStyle}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="col-span-3 flex gap-3 flex-wrap pt-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 fill-white"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d={s.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              <div className="hidden md:block bg-white/10" />

              <div className="py-10">
                <p className="font-semibold text-base mb-4">
                  Help is always here
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Call Us",
                      sub: "+91-9810368018",
                      href: "tel:+919810368018",
                      icon: (
                        <svg
                          className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/70 group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Email Us",
                      sub: "support@brand.com",
                      href: "mailto:support@brand.com",
                      icon: (
                        <svg
                          className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/70 group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "Live Chat",
                      sub: "Chat Now",
                      href: "#",
                      icon: (
                        <svg
                          className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/70 group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                          />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-3 border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                    >
                      {item.icon}
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p className="text-xs text-white/60 mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </a>
                  ))}
                  <div className="flex items-start gap-3 border border-white/20 rounded-xl p-4">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold">Open From</p>
                      <p className="text-xs text-white/60 mt-0.5">
                        Mon–Sat 9:00 AM – 6:00 PM
                      </p>
                      <p className="text-xs text-white/60">
                        Sun 10:00 AM – 3:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════ MOBILE layout (< md) ════ */}
          <div className="lg:hidden">
            {/* Logo centered */}
            <div className="flex flex-col items-center pt-6 pb-4 border-b border-white/10">
              <Image
                src="/specscart-logo.svg"
                alt="Specscart"
                width={130}
                height={34}
              />
              <div className="flex items-center gap-2 text-xs text-white/80 font-semibold mt-2">
                Excellent 4.8 out of 5 <span className="text-green-400">★</span>{" "}
                Trustpilot
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center justify-center gap-2 py-3 border-b border-white/10 text-xs text-white/70">
              <svg
                className="w-4 h-4 text-white/50"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Open From</span>
              <span className="text-white/50">|</span>
              <span>Mon–Sat 9AM–6PM</span>
              <span className="text-white/50">|</span>
              <span>Sun 10AM–3PM</span>
            </div>

            {/* Quick contact row */}
            <div className="flex items-center justify-center gap-3 py-3 border-b border-white/10">
              {[
                {
                  label: "Call Us",
                  href: "tel:+919810368018",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  ),
                },
                {
                  label: "Email Us",
                  href: "mailto:s@brand.com",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Live Chat",
                  href: "#",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                      />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1.5 border border-white/25 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  {item.icon} {item.label}
                </a>
              ))}
            </div>

            {/* Accordion nav */}
            <div className="border-b border-white/10">
              {navGroups.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-white/10 last:border-0"
                >
                  <button
                    onClick={() => toggle(item.label)}
                    className="w-full flex items-center justify-between px-2 py-4 text-white/85 hover:text-white transition-colors"
                    style={navLinkStyle}
                  >
                    {item.label}
                    <span
                      className={`transition-transform duration-200 ${openItem === item.label ? "rotate-180" : ""}`}
                    >
                      <ChevronDown />
                    </span>
                  </button>
                  {openItem === item.label && (
                    <div className="pb-3 px-2">
                      <a
                        href={item.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        View all {item.label}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Discount badge row */}
            <div className="flex items-center justify-center gap-3 py-4 border-b border-white/10 flex-wrap">
              {["About Us", "Reviews", "Jobs", "Blogs"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-white/80 hover:text-white transition-colors font-medium"
                >
                  {l}
                </a>
              ))}
              <span className="bg-[#1DBFAD] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold">
                Student Discount
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center justify-center gap-2.5 py-4 border-b border-white/10 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-4 h-4 fill-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Payment icons */}
            <div className="flex justify-center py-4 border-b border-white/10">
              <Image
                src="/paymentgateway.svg"
                alt="Payment methods"
                width={300}
                height={36}
              />
            </div>
          </div>

          {/* ── Bottom bar (both) ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 border-t border-white/10 text-xs text-white/50">
            <p>Developed by HRM International Limited © 2024 Specscart.</p>
            <div className="flex items-center gap-3">
              <Link
                href="/sitemap"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <span>|</span>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
