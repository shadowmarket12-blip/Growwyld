"use client";

import React, { useEffect, useRef } from "react";
import { Fraunces, Inter } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Cloud,
  Database,
  LineChart as LineChartIcon,
  Cpu,
  Globe,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import SmoothScroll from "../about/scroll";
import AboutFAQ from "@/Components/Faq/Aboutfaq";
import Image from "next/image";

import GooeyButton from "@/Components/Aboutus/bthr";
import Link from "next/link";
import ServicesSection3D from "@/Components/Aboutus/ServicesSection3D";
import VisionSection3D from "@/Components/Aboutus/VisionSection3d";
import ProfessionalsSection3D from "@/Components/Aboutus/Professionasection";
import CardsHover from "@/Components/Aboutus/CardsHover ";
import OurValues from "@/Components/Aboutus/OurValues";
import Serve from "@/Components/Aboutus/Serve";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  Shared animation variants                                          */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/* ------------------------------------------------------------------ */
/*  Section heading — the page's signature motif                       */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "left-wide";
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className={`mb-10 md:mb-14 ${align === "left-wide" ? "max-w-3xl" : "max-w-xl"}`}
    >
      <motion.div
        variants={fadeLeft}
        className="grow-line mb-4 flex items-center gap-3"
      >
        <span className="line-mark h-px w-10 origin-left scale-x-0 bg-[var(--accent)]" />
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] text-[var(--ink)]"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

function PremiumGrowthChart() {
  const cyanPathRef = useRef<SVGPathElement>(null);
  const greenPathRef = useRef<SVGPathElement>(null);
  const cyanAreaRef = useRef<SVGPathElement>(null);
  const greenAreaRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cyanPath = cyanPathRef.current;
    const greenPath = greenPathRef.current;
    if (!cyanPath || !greenPath) return;

    const cyanLen = cyanPath.getTotalLength();
    const greenLen = greenPath.getTotalLength();

    gsap.set(cyanPath, { strokeDasharray: cyanLen, strokeDashoffset: cyanLen });
    gsap.set(greenPath, {
      strokeDasharray: greenLen,
      strokeDashoffset: greenLen,
    });
    gsap.set([cyanAreaRef.current, greenAreaRef.current], { opacity: 0 });
    gsap.set(dotRef.current, { opacity: 0, scale: 0 });
    gsap.set(ringRef.current, { opacity: 0, scale: 0 });

    if (prefersReducedMotion) {
      gsap.set(cyanPath, { strokeDashoffset: 0 });
      gsap.set(greenPath, { strokeDashoffset: 0 });
      gsap.set([cyanAreaRef.current, greenAreaRef.current], { opacity: 1 });
      gsap.set(dotRef.current, { opacity: 1, scale: 1 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.5 });
    tl.to(greenPath, {
      strokeDashoffset: 0,
      duration: 1.7,
      ease: "power2.inOut",
    })
      .to(
        cyanPath,
        { strokeDashoffset: 0, duration: 1.9, ease: "power2.inOut" },
        "-=1.35",
      )
      .to(
        greenAreaRef.current,
        { opacity: 0.55, duration: 0.9, ease: "power1.out" },
        "-=1.4",
      )
      .to(
        cyanAreaRef.current,
        { opacity: 0.7, duration: 0.9, ease: "power1.out" },
        "-=1.1",
      )
      .to(
        dotRef.current,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" },
        "-=0.3",
      )
      .to(
        ringRef.current,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(3)" },
        "<",
      );

    // Ambient pulsing glow ring around the latest data point
    gsap.to(ringRef.current, {
      scale: 1.9,
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      ease: "sine.out",
      delay: tl.duration() + 0.3,
    });
    gsap.to(dotRef.current, {
      y: -3,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: tl.duration() + 0.2,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Aurora glow behind the panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(38% 45% at 22% 20%, #00B7C3 0%, transparent 70%), radial-gradient(42% 50% at 85% 85%, #22C55E 0%, transparent 70%)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[28px] p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(13,27,42,0.55)]"
        style={{
          background:
            "linear-gradient(155deg, #0D1B2A 0%, #0D1B2A 40%, #113E6E 100%)",
        }}
      >
        {/* fine noise/dot grid overlay for texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Header row */}
        <div className="relative mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/50 mb-1">
              Client Growth Index
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-white">
              Real, measurable lift
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-md"
          >
            <ArrowUpRight
              className="h-3.5 w-3.5 text-[#00B7C3]"
              strokeWidth={2.5}
            />
            <span className="text-xs md:text-sm font-semibold text-white">
              +248%
            </span>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="relative">
          <svg
            viewBox="0 0 360 220"
            className="w-full h-auto"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="cyanFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B7C3" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#00B7C3" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="cyanStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#00B7C3" />
              </linearGradient>
            </defs>

            {/* grid */}
            {[20, 80, 140, 200].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="360"
                y2={y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            ))}

            {/* green series — engagement */}
            <path
              ref={greenAreaRef}
              d="M4 175 C 55 168, 85 150, 118 145 S 185 128, 218 118 S 275 95, 315 78 L 356 68 L 356 220 L 4 220 Z"
              fill="url(#greenFill)"
            />
            <path
              ref={greenPathRef}
              d="M4 175 C 55 168, 85 150, 118 145 S 185 128, 218 118 S 275 95, 315 78 L 356 68"
              stroke="#22C55E"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* cyan series — revenue (front layer) */}
            <path
              ref={cyanAreaRef}
              d="M4 190 C 60 185, 90 160, 120 150 S 190 120, 220 100 S 280 55, 315 35 S 345 18, 356 12 L 356 220 L 4 220 Z"
              fill="url(#cyanFill)"
            />
            <path
              ref={cyanPathRef}
              d="M4 190 C 60 185, 90 160, 120 150 S 190 120, 220 100 S 280 55, 315 35 S 345 18, 356 12"
              stroke="url(#cyanStroke)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <circle
              ref={ringRef}
              cx="356"
              cy="12"
              r="10"
              fill="none"
              stroke="#00B7C3"
              strokeWidth="2"
            />
            <circle
              ref={dotRef}
              cx="356"
              cy="12"
              r="5.5"
              fill="#ffffff"
              stroke="#00B7C3"
              strokeWidth="2.5"
            />
          </svg>

          {/* Floating glass stat chip, overlapping the chart */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="absolute left-1 bottom-1 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            <span className="text-[11px] md:text-xs font-medium text-white/90">
              Live client growth
            </span>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="relative mt-6 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00B7C3]" />
            <span className="text-xs text-white/60">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            <span className="text-xs text-white/60">Engagement</span>
          </div>
        </div>

        {/* Footer meta row */}
        <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/45">
              Founded
            </p>
            <p className=" text-base md:text-lg text-white">Early 2025</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.2em] uppercase text-white/45">
              Based in
            </p>
            <p className=" text-base md:text-lg text-white">Bhubaneswar</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const industryNodes = [
  { icon: Code2, label: "Engineering" },
  { icon: Cloud, label: "Cloud & Infra" },
  { icon: Database, label: "Data" },
  { icon: LineChartIcon, label: "Growth" },
  { icon: Cpu, label: "Automation" },
  { icon: Globe, label: "Reach" },
];

function IndustryPulse() {
  const pathRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const path = pathRef.current;
    if (!path || prefersReducedMotion) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut",
      scrollTrigger: { trigger: path, start: "top 85%" },
    });

    if (pulseRef.current) {
      gsap.set(pulseRef.current, { opacity: 0 });
      gsap.to(pulseRef.current, {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
        opacity: 1,
        duration: 3.2,
        repeat: -1,
        ease: "power1.inOut",
        delay: 1,
        scrollTrigger: { trigger: path, start: "top 85%" },
      });
    }
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative mt-14 overflow-hidden rounded-[28px] p-8 md:p-12"
      style={{
        background: "linear-gradient(140deg, #0D1B2A 0%, #113E6E 100%)",
      }}
    >
      {/* ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "#00B7C3" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "#22C55E" }}
      />

      <div className="relative mb-10 flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-[#00B7C3]" />
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/70">
          Powering the IT &amp; Growth Stack
        </span>
      </div>

      <div className="relative">
        {/* connecting signal line */}
        <svg
          viewBox="0 0 600 60"
          className="absolute left-0 top-6 w-full h-auto hidden md:block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M20 30 Q 110 -10, 200 30 T 380 30 T 560 30"
            stroke="url(#pulseStroke)"
            strokeWidth="1.5"
            fill="none"
          />
          <defs>
            <linearGradient id="pulseStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#00B7C3" />
            </linearGradient>
          </defs>
          <circle ref={pulseRef} r="4" fill="#00B7C3" />
        </svg>

        <div className="relative grid grid-cols-2 gap-y-8 md:grid-cols-6 md:gap-x-2">
          {industryNodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 3 + (i % 3) * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span
                  className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/15 backdrop-blur-md"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(160deg, rgba(0,183,195,0.25), rgba(0,183,195,0.05))"
                        : "linear-gradient(160deg, rgba(34,197,94,0.25), rgba(34,197,94,0.05))",
                  }}
                >
                  <Icon
                    className="h-5 w-5 md:h-6 md:w-6"
                    strokeWidth={1.75}
                    style={{ color: i % 2 === 0 ? "#00B7C3" : "#22C55E" }}
                  />
                </span>
                <span className="text-[11px] md:text-xs font-medium text-white/70">
                  {node.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable card                                                       */
/* ------------------------------------------------------------------ */

function Card({
  icon,
  title,
  desc,
  className = "",
}: {
  icon: string;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative rounded-2xl border border-[var(--line)] bg-white p-7 md:p-8 transition-colors duration-300 hover:border-[var(--accent)]/50 ${className}`}
    >
      <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <h3 className=" text-lg md:text-xl mb-2 text-black">{title}</h3>
      <p className="text-sm md:text-base leading-relaxed text-black">{desc}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const AboutPage = () => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const marks = gsap.utils.toArray<HTMLElement>(".line-mark");
    marks.forEach((mark) => {
      gsap.to(mark, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mark,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const founders = [
    {
      icon: "◆",
      desc: "One founder brings expertise in digital marketing, search engine optimization, content strategy, and online growth. The other comes from a software development background with experience in building websites, digital platforms, and technology-driven solutions. Together, they combined their strengths to bridge the gap between technology and marketing—creating a company that helps businesses not only build digital assets but also generate meaningful business results from them.",
    },
    {
      icon: "◇",
      desc: "Behind Growwyld Tech are two founders from humble backgrounds who share a common belief: businesses deserve access to high-quality digital solutions at a fair and justified price.",
    },
  ];

  const differentiators = [
    {
      icon: "①",
      title: "Practical Solutions",
      desc: "We understand business objectives first, then recommend what creates measurable value — nothing more, nothing less.",
    },
    {
      icon: "②",
      title: "Integrated Approach",
      desc: "Technology and marketing working together, bridging the gap between building digital assets and generating real results.",
    },
    {
      icon: "③",
      title: "Genuine Partnership",
      desc: "A team that cares about your success — quality solutions without unnecessary complexity or inflated costs.",
    },
  ];

  const services = [
    {
      desc: "We help businesses establish, strengthen, and scale their digital presence through a combination of technology, strategy, and creativity. From professional websites and custom web applications to SEO, local search optimization, content marketing, and digital growth strategies, our solutions are designed to help businesses improve visibility, attract the right audience, and create long-term opportunities.",
      gif: "/gif/Growth-Illustration.svg",
    },
    {
      desc: "",
      gif: "/gif/Startup-business-promotion.svg",
    },
  ];

  return (
    <SmoothScroll>
      <div
        className={`${fraunces.variable} ${inter.variable} relative min-h-screen bg-white text-[var(--ink)] font-[family-name:var(--font-body)] overflow-x-hidden`}
        style={
          {
            "--bg": "#FFFFFF",
            "--ink": "#14140F",
            "--ink-soft": "#5B5C55",
            "--accent": "#1B4332",
            "--accent-soft": "#E9EFE9",
            "--gold": "#B08D57",
            "--line": "#E4E3DC",
          } as React.CSSProperties
        }
      >
        {/* ---------------------------------------------------------- */}
        {/* Hero                                                        */}
        {/* ---------------------------------------------------------- */}
        <section className="relative px-6 md:px-12 pt-28 md:pt-36 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">
            <div>
              <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-label="Breadcrumb"
                className="mb-8"
              >
                <ol className="flex items-center gap-2 text-sm">
                  {/* Home */}
                  <li>
                    <a
                      href="/"
                      className="group inline-flex items-center gap-2 font-medium text-[#113E6E]/60 transition-colors duration-300 hover:text-[#00B7C3]"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#113E6E]/50 transition-colors duration-300 group-hover:text-[#00B7C3]"
                      >
                        <path
                          d="M3 10.5L12 3L21 10.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5.5 9.5V20H18.5V9.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 20V14H14.5V20"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span>Home</span>
                    </a>
                  </li>

                  {/* Separator */}
                  <li aria-hidden="true" className="text-[#113E6E]/25">
                    /
                  </li>

                  {/* Current page */}
                  <li
                    aria-current="page"
                    className="font-semibold text-[#0D1B2A]"
                  >
                    About Us
                  </li>
                </ol>

                {/* Elegant accent line */}
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-[#00B7C3] to-transparent" />
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-px w-10 bg-[#00B7C3]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0D1B2A]/75 md:text-sm">
                  About Growwyld Tech
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className=" text-4xl md:text-4xl lg:text-[3rem] leading-[1.05] mb-6 text-black"
              >
                Where ambition
                <br />
                <span className="italic text-black">meets innovation</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-base md:text-lg leading-relaxed text-black max-w-lg mb-9"
              >
                Every business starts with an idea. Some remain ideas, while
                others grow into something meaningful. Growwyld Tech was born in
                early 2025 with a simple yet powerful vision—to help businesses
                leverage technology and digital marketing to unlock their true
                growth potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact">
                  <div className="text-white text-sm">
                    <GooeyButton />
                  </div>
                </Link>
                {/* <button className="px-7 py-3.5 rounded-full border border-[var(--line)] text-sm md:text-base font-medium tracking-wide text-[var(--ink)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]">
                  Explore
                </button> */}
              </motion.div>
            </div>

            {/* Signature visual — premium multi-series growth chart */}
            <PremiumGrowthChart />
          </div>
        </section>
        {/* ---------------------------------------------------------- */}
        {/* Founders                                                    */}
        {/* ---------------------------------------------------------- */}
        <section className="px-6 md:px-12 py-10 md:py-18">
          {/* <ProfessionalsSection3D /> */}
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Our Journey                                                 */}
        {/* ---------------------------------------------------------- */}
        <section className="px-6 md:px-12 py-20 md:py-28 ">
          <VisionSection3D />
        </section>

        {/* ---------------------------------------------------------- */}
        {/* What makes us different                                    */}
        {/* ---------------------------------------------------------- */}
        <section className="px-6 md:px-12 py-20 md:py-28 ">
          {/* <Serve /> */}
        </section>

        {/* ---------------------------------------------------------- */}
        {/*  Services — optimized                                       */}
        {/* ---------------------------------------------------------- */}
        <section className="px-6 md:px-12 py-20 md:py-28 ">
          {/* <CardsHover /> */}
          <OurValues />
        </section>
        {/* faq */}
        <AboutFAQ />
      </div>
    </SmoothScroll>
  );
};

export default AboutPage;
