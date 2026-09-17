"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Check, ArrowUpRight, ArrowUp } from "lucide-react";
import Lenis from "lenis";
import { Space_Grotesk, Inter } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FEATURES = [
  "Transparent Communication",
  "Result-Driven Strategies",
  "Tailored Solutions",
  "Long-Term Partnership",
];

const STATS = [
  { label: "Total Users", value: "24.5K", delta: "+12.5%" },
  { label: "Organic Traffic", value: "18.6K", delta: "+18.7%" },
  { label: "Conversion Rate", value: "3.65%", delta: "+8.4%" },
];

const CHANNELS = [
  { name: "Organic Search", value: 42, color: "#38BDF8" },
  { name: "Direct", value: 23, color: "#F472B6" },
  { name: "Social Media", value: 15, color: "#FBBF24" },
  { name: "Referral", value: 20, color: "#34D399" },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerReveal: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/* Donut chart geometry                                                */
/* ------------------------------------------------------------------ */

const DONUT_R = 38;
const DONUT_CIRC = 2 * Math.PI * DONUT_R;

function useDonutSegments() {
  let acc = 0;
  return CHANNELS.map((c) => {
    const len = (c.value / 100) * DONUT_CIRC;
    const seg = { ...c, dash: `${len} ${DONUT_CIRC - len}`, offset: -acc };
    acc += len;
    return seg;
  });
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function GrowthPartnerHero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  const donutSegments = useDonutSegments();

  /* Lenis smooth scroll - optimized */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  /* Scroll-linked parallax - optimized with useTransform */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yBlobA = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yBlobB = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const yBadge = useTransform(scrollYProgress, [0, 1], [20, -35]);
  const yChannels = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const yMock = useTransform(scrollYProgress, [0, 1], [25, -25]);

  /* Mouse-driven 3D tilt - optimized with springs */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, {
    stiffness: 120,
    damping: 15,
    mass: 0.3,
  });
  const springY = useSpring(rotateY, {
    stiffness: 120,
    damping: 15,
    mass: 0.3,
  });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || prefersReducedMotion) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 8);
      rotateX.set(-py * 8);
    },
    [canHover, prefersReducedMotion, rotateX, rotateY],
  );

  const handleMouseLeave = React.useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <section
      ref={sectionRef}
      className={`${display.variable} ${body.variable} relative w-full overflow-hidden py-24 sm:py-28 lg:py-32 font-[family-name:var(--font-body)]`}
    >
      {/* Ambient background - optimized with will-change and reduced blur */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[image:radial-gradient(circle,#ffffff12_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:radial-gradient(ellipse_80%_60%_at_70%_20%,#000_10%,transparent_75%)]" />
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : yBlobA }}
          className="absolute -left-32 top-10 h-[22rem] w-[22rem] rounded-full bg-emerald-500/15 blur-[100px] will-change-transform"
        />
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : yBlobB }}
          className="absolute -right-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[110px] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-12">
        {/* ---------------- Left column ---------------- */}
        <motion.div
          variants={containerReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-xl"
        >
          <motion.span
            variants={itemReveal}
            className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.22em] text-emerald-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_2px_rgba(16,185,129,0.5)]" />
            Why choose GrowWyld Tech
          </motion.span>

          <motion.h1
            variants={itemReveal}
            className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.4rem]"
          >
            Your Growth Partner{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              in the Digital World
            </span>
          </motion.h1>

          <motion.p
            variants={itemReveal}
            className="mt-6 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg"
          >
            We combine technology, strategy, and creativity to help your
            business grow smarter and scale beyond boundaries.
          </motion.p>

          <motion.ul variants={containerReveal} className="mt-8 space-y-3.5">
            {FEATURES.map((feature) => (
              <motion.li
                key={feature}
                variants={itemReveal}
                className="flex items-center gap-3 text-gray-700"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                  <Check
                    className="h-3.5 w-3.5 text-emerald-600"
                    strokeWidth={3}
                  />
                </span>
                <span className="text-[15px] sm:text-base">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemReveal} className="mt-10">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-8px_rgba(16,185,129,0.7)]"
            >
              Let&apos;s Grow Together
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

        {/* ---------------- Right column: 3D dashboard mockup ---------------- */}
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : yMock }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-lg [perspective:1600px] lg:max-w-none"
        >
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: springX,
              rotateY: springY,
              transformStyle: "preserve-3d",
            }}
            className="relative rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] sm:p-7"
          >
            {/* window chrome dots */}
            <div className="mb-5 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>

            {/* stats row */}
            <div className="grid grid-cols-3 gap-3 border-b border-gray-200 pb-5 sm:gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} style={{ transform: "translateZ(20px)" }}>
                  <p className="text-[11px] uppercase tracking-wide text-gray-500 sm:text-xs">
                    {stat.label}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-1.5">
                    <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-gray-900 sm:text-xl">
                      {stat.value}
                    </span>
                    <span className="flex items-center gap-0.5 text-[11px] font-medium text-emerald-600 sm:text-xs">
                      <ArrowUp className="h-3 w-3" />
                      {stat.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* line chart */}
            <div className="relative mt-5 h-40 w-full sm:h-48">
              <svg
                viewBox="0 0 400 160"
                fill="none"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="55%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                  <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M0,120 C25,118 35,88 60,90 C85,92 90,112 115,108 C140,104 150,68 175,66 C200,64 210,96 235,92 C260,88 270,52 295,46 C320,40 330,66 355,50 C370,40 380,20 400,14 L400,160 L0,160 Z"
                  fill="url(#lineFill)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                  d="M0,120 C25,118 35,88 60,90 C85,92 90,112 115,108 C140,104 150,68 175,66 C200,64 210,96 235,92 C260,88 270,52 295,46 C320,40 330,66 355,50 C370,40 380,20 400,14"
                  stroke="url(#lineStroke)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.circle
                  cx="400"
                  cy="14"
                  r="5.5"
                  fill="#FFFFFF"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.6 }}
                />
              </svg>
            </div>

            {/* floating: growth badge */}
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : yBadge,
                transform: "translateZ(50px)",
              }}
              className="absolute -bottom-6 left-4 z-20 sm:left-8"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)]"
              >
                <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-emerald-600">
                  +28%
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
                  Growth This Month
                </p>
              </motion.div>
            </motion.div>

            {/* floating: top channels donut */}
            <motion.div
              style={{
                y: prefersReducedMotion ? 0 : yChannels,
                transform: "translateZ(65px)",
              }}
              className="absolute -right-3 -bottom-10 z-30 sm:-right-8 sm:-bottom-12"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="w-[13.5rem] rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] sm:w-60 sm:p-5"
              >
                <p className="mb-3 text-xs font-semibold text-gray-700 sm:text-sm">
                  Top Channels
                </p>
                <div className="flex items-center gap-4">
                  <svg
                    viewBox="0 0 100 100"
                    className="h-16 w-16 shrink-0 -rotate-90 sm:h-20 sm:w-20"
                  >
                    {donutSegments.map((seg) => (
                      <motion.circle
                        key={seg.name}
                        cx="50"
                        cy="50"
                        r={DONUT_R}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="13"
                        strokeDasharray={seg.dash}
                        strokeDashoffset={seg.offset}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      />
                    ))}
                  </svg>
                  <ul className="space-y-1.5">
                    {CHANNELS.map((c) => (
                      <li
                        key={c.name}
                        className="flex items-center gap-1.5 text-[11px] text-gray-600"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
