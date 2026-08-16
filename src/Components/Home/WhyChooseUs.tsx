// components/WhyChooseSection.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Target,
  Boxes,
  TrendingUp,
  Handshake,
  Rocket,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
  Compass,
  Shield,
  Zap,
  Globe,
  Palette,
  Brain,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Feature = {
  icon: LucideIcon;
  secondaryIcon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
};

const FEATURES: Feature[] = [
  {
    icon: Target,
    secondaryIcon: Compass,
    title: "Tailored Strategies",
    description: "Built around your business goals, not generic templates.",
    color: "#8C6A3A",
    gradient: "from-amber-600 to-yellow-700",
  },
  {
    icon: Boxes,
    secondaryIcon: Globe,
    title: "End-to-End Expertise",
    description: "Technology, marketing, branding, and growth under one roof.",
    color: "#B08A55",
    gradient: "from-orange-600 to-amber-700",
  },
  {
    icon: TrendingUp,
    secondaryIcon: Zap,
    title: "Results-Driven Approach",
    description: "Focused on visibility, leads, and long-term business growth.",
    color: "#9A7B49",
    gradient: "from-yellow-700 to-amber-800",
  },
  {
    icon: Handshake,
    secondaryIcon: Shield,
    title: "Transparent Collaboration",
    description: "Open communication and reliable support at every stage.",
    color: "#C4A265",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Rocket,
    secondaryIcon: Brain,
    title: "Scalable Solutions",
    description: "Flexible solutions designed to support future growth.",
    color: "#D9C29B",
    gradient: "from-amber-400 to-yellow-600",
  },
  {
    icon: Sparkles,
    secondaryIcon: Palette,
    title: "Innovation Focused",
    description: "Modern technologies and strategies to keep you ahead.",
    color: "#8C6A3A",
    gradient: "from-yellow-600 to-amber-700",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated Background Orbs                                           */
/* ------------------------------------------------------------------ */

function AnimatedBackground() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const orbs = document.querySelectorAll(".bg-orb");

    orbs.forEach((orb) => {
      gsap.to(orb, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: gsap.utils.random(-100, 100),
        x: gsap.utils.random(-50, 50),
        scale: gsap.utils.random(0.8, 1.2),
        opacity: gsap.utils.random(0.3, 0.6),
      });
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #8C6A3A 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating orbs */}
      <div className="bg-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-300/10 blur-3xl" />
      <div className="bg-orb absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-orange-200/15 to-amber-300/10 blur-3xl" />
      <div className="bg-orb absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-300/15 to-amber-400/10 blur-3xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative Compass Ring                                            */
/* ------------------------------------------------------------------ */

function CompassRing() {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="relative w-48 h-48 sm:w-64 sm:h-64"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-[#D9C29B]/20" />

        {/* Rotating ring with dashes */}
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#B08A55]/30" />

        {/* Inner decorative ring */}
        <div className="absolute inset-8 rounded-full border border-[#D9C29B]/30 bg-gradient-to-br from-[#FBFAF7]/50 to-transparent backdrop-blur-sm" />

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-[#B08A55] to-[#8C6A3A] shadow-lg shadow-[#B08A55]/30" />

        {/* Decorative dots */}
        {[0, 90, 180, 270].map((angle) => (
          <div
            key={angle}
            className="absolute w-2 h-2 rounded-full bg-[#D9C29B]/40"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(90px) translateY(-50%)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature Card with 3D flip                                          */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const SecondaryIcon = feature.secondaryIcon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = { stiffness: 160, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), springCfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), springCfg);
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      initial={{ opacity: 0, rotateX: 15, rotateY: -15, y: 60 }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-[28px] border border-[#EAE4D8]/60 p-8 shadow-[0_8px_30px_-12px_rgba(20,17,15,0.08)] transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(20,17,15,0.15)] hover:bg-white/95"
    >
      {/* Conic gradient border on hover */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${feature.color}40, transparent, ${feature.color}40, transparent)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "2px",
          animation: "rotateBorder 4s linear infinite",
        }}
      />

      {/* Cursor-follow glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${glowX} ${glowY}, ${feature.color}10, transparent 70%)`,
        }}
      />

      <div style={{ transform: "translateZ(50px)" }} className="relative">
        {/* Icon with 3D flip effect */}
        <div className="relative w-16 h-16 perspective-500">
          <motion.div
            animate={{ rotateY: isHovered ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-full h-full"
          >
            {/* Front face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-2xl backface-hidden"
              style={{
                background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}05)`,
                boxShadow: `0 8px 24px -8px ${feature.color}30, inset 0 0 0 1px ${feature.color}20`,
              }}
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                style={{ color: feature.color }}
              />
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-2xl backface-hidden"
              style={{
                transform: "rotateY(180deg)",
                background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                boxShadow: `0 8px 24px -8px ${feature.color}40, inset 0 0 0 1px ${feature.color}30`,
              }}
            >
              <SecondaryIcon
                size={28}
                strokeWidth={1.5}
                style={{ color: feature.color }}
              />
            </div>
          </motion.div>

          {/* Rotating ring around icon */}
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-2xl border-2 border-dashed"
            style={{ borderColor: `${feature.color}30` }}
          />
        </div>

        <h3
          className="mt-6 text-xl leading-snug text-[#14110F] sm:text-[1.35rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {feature.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#5B564E] sm:text-[15px]">
          {feature.description}
        </p>

        {/* Animated underline */}
        <div
          className="relative mt-4 h-0.5 w-0 bg-current transition-all duration-500 group-hover:w-full"
          style={{ backgroundColor: `${feature.color}40` }}
        />
      </div>

      {/* Animated index number */}
      <motion.span
        className="absolute right-6 top-6 text-4xl font-bold select-none"
        style={{
          color: `${feature.color}15`,
          fontFamily: "var(--font-display)",
          transform: "translateZ(30px)",
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          color: isHovered ? `${feature.color}25` : `${feature.color}10`,
        }}
        transition={{ duration: 0.3 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connecting Line                                                    */
/* ------------------------------------------------------------------ */

function ConnectingLine() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      scrollTrigger: {
        trigger: path,
        start: "top bottom+=100",
        end: "bottom top-=100",
        scrub: 1,
      },
      strokeDashoffset: 0,
      duration: 1,
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 200 100 C 400 200, 300 400, 500 300 C 700 200, 600 500, 800 350 C 1000 200, 950 450, 1050 300"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          fill="none"
          opacity="0.2"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9C29B" stopOpacity="0" />
            <stop offset="50%" stopColor="#B08A55" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D9C29B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic CTA Button                                                */
/* ------------------------------------------------------------------ */

function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const wrapper = wrapperRef.current;
    if (!button || !wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        ref={buttonRef}
        className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#14110F] via-[#1a1512] to-[#14110F] px-10 py-5 text-base font-medium tracking-wide text-white transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(20,17,15,0.4)]"
      >
        {/* Pulsing glow */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B08A55]/20 to-[#8C6A3A]/20 blur-xl animate-pulse" />
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <span className="relative">Start Growing Today</span>
        <ArrowUpRight
          size={20}
          className="relative transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Heading Word by Word                                      */
/* ------------------------------------------------------------------ */

function AnimatedHeading() {
  const words = ["Why", "Businesses", "Choose", "Growwyld Tech"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-[#9A7B49]"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-8 bg-[#B08A55] origin-right"
        />
        Why Us
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px w-8 bg-[#B08A55] origin-left"
        />
      </motion.p>

      <h2
        className="text-[2.4rem] leading-[1.08] tracking-tight text-[#14110F] sm:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 40, rotateX: -40 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.6 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-3"
            style={{ transformOrigin: "bottom" }}
          >
            {word === "Growwyld Tech" ? (
              <span className="italic text-[#9A7B49]">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </h2>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export default function WhyChooseSection() {
  return (
    <section
      className={`${fraunces.variable} ${inter.variable} relative w-full overflow-hidden bg-[#FBFAF7] py-24 sm:py-32 lg:py-40`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* Add keyframes for conic border rotation */}
      <style jsx>{`
        @keyframes rotateBorder {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .perspective-500 {
          perspective: 500px;
        }
      `}</style>

      <AnimatedBackground />
      <CompassRing />
      <ConnectingLine />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <AnimatedHeading />

        {/* Feature grid */}
        <div className="relative mt-16 grid grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex justify-center sm:mt-24"
        >
          <MagneticButton />
        </motion.div>
      </div>
    </section>
  );
}
