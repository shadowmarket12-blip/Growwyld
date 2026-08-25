"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  Smartphone,
  Cloud,
  Terminal,
  Palette,
  TrendingUp,
} from "lucide-react";
import LearnMoreButton from "../Aboutus/Bsix";

// ---------------------------------------------------------------------------
// Premium heading animation — 3D letter flip-up reveal + flowing gradient sheen
// ---------------------------------------------------------------------------
const PremiumHeading = ({ text, className, delay = 0, gradient = false }) => {
  const letters = text.split("");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.028, delayChildren: delay },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 36, rotateX: 70 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", stiffness: 260, damping: 22 },
    },
  };

  return (
    <motion.div
      className={`${className} ${gradient ? "premium-sheen" : ""}`}
      style={{ perspective: 800, display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{ display: "inline-block", transformStyle: "preserve-3d" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Premium 3D Orbiting Service Circle — bigger, mouse-tilt parallax, glass UI
// ---------------------------------------------------------------------------
const ServiceCircle = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services = useMemo(
    () => [
      { name: "Web Development", Icon: Code2, color: "#FF6B6B" },
      { name: "Mobile Apps", Icon: Smartphone, color: "#4ECDC4" },
      { name: "Cloud & DevOps", Icon: Cloud, color: "#3FA9F5" },
      { name: "Software Development", Icon: Terminal, color: "#A78BFA" },
      { name: "UI/UX Design", Icon: Palette, color: "#FF8B94" },
      { name: "Digital Marketing", Icon: TrendingUp, color: "#34D399" },
    ],
    [],
  );

  const angleStep = 360 / services.length;

  // ---- Mouse-driven 3D tilt (premium parallax) ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), {
    stiffness: 150,
    damping: 18,
    mass: 0.4,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 18,
    mass: 0.4,
  });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my],
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  if (!isMounted) return null;

  return (
    <div
      className="relative flex items-center justify-center mx-auto orbit-stage"
      style={{ perspective: "1400px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .orbit-stage {
          width: clamp(300px, 48vw, 520px);
          height: clamp(300px, 48vw, 520px);
        }

        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-spin-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes ring-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ring-spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes luxury-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 24px 60px -14px rgba(0,0,0,0.35),
              inset -10px -12px 24px rgba(0,0,0,0.22),
              inset 8px 10px 20px rgba(255,255,255,0.25);
          }
          50% {
            box-shadow: 0 30px 80px -10px rgba(0,0,0,0.45),
              inset -10px -12px 24px rgba(0,0,0,0.22),
              inset 8px 10px 20px rgba(255,255,255,0.35);
          }
        }
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -14px) scale(1.08); }
        }
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-16px, 16px) scale(1.06); }
        }
        @keyframes blob-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 18px) scale(1.05); }
        }

        .orbit-ring { animation: orbit-spin 28s linear infinite; will-change: transform; }
        .orbit-stage:hover .orbit-ring { animation-play-state: paused; }
        .orbit-item-face { animation: orbit-spin-reverse 28s linear infinite; will-change: transform; }
        .orbit-stage:hover .orbit-item-face { animation-play-state: paused; }

        .aurora-blob-1 { animation: blob-float-1 9s ease-in-out infinite; }
        .aurora-blob-2 { animation: blob-float-2 11s ease-in-out infinite; }
        .aurora-blob-3 { animation: blob-float-3 10s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-item-face, .center-sphere, .outer-ring, .middle-ring,
          .aurora-blob-1, .aurora-blob-2, .aurora-blob-3 { animation: none !important; }
        }
      `}</style>

      {/* Ambient aurora glow blobs — premium depth behind the sphere */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 aurora-blob-1 pointer-events-none"
        style={{
          width: "55%",
          height: "55%",
          top: "0%",
          left: "5%",
          background: "#FF6B6B",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-25 aurora-blob-2 pointer-events-none"
        style={{
          width: "50%",
          height: "50%",
          bottom: "0%",
          right: "0%",
          background: "#3FA9F5",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-25 aurora-blob-3 pointer-events-none"
        style={{
          width: "45%",
          height: "45%",
          bottom: "8%",
          left: "0%",
          background: "#A78BFA",
        }}
      />

      {/* Ground shadow for 3D grounding */}
      <div className="absolute bottom-0 w-1/3 h-6 sm:h-8 rounded-full bg-gray-900/20 blur-2xl" />

      {/* Mouse-tilt 3D wrapper — everything below tilts together like a real object */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Outer conic ring */}
        <div
          className="absolute outer-ring"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            opacity: 0.6,
            background:
              "conic-gradient(from 0deg, #FF6B6B 0%, #4ECDC4 15%, #3FA9F5 30%, #A78BFA 45%, #FF8B94 60%, #34D399 75%, #FF6B6B 100%)",
            maskImage:
              "radial-gradient(circle, transparent 68%, black 69%, black 72%, transparent 73%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 68%, black 69%, black 72%, transparent 73%)",
            animation: "ring-spin-slow 18s linear infinite",
            filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.12))",
          }}
        />

        {/* Glass dashed guide ring */}
        <div
          className="absolute middle-ring backdrop-blur-[1px]"
          style={{
            width: "68%",
            height: "68%",
            borderRadius: "50%",
            border: "2px dashed rgba(148, 163, 184, 0.4)",
            animation: "ring-spin-reverse 22s linear infinite",
          }}
        />

        {/* Static glass hairline rims */}
        <div
          className="absolute rounded-full"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "inset 0 1px 8px rgba(255,255,255,0.4)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "68%",
            height: "68%",
            border: "1px solid rgba(209,213,219,0.4)",
          }}
        />

        {/* Center sphere with logo */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center center-sphere"
          style={{
            width: "36%",
            height: "36%",
            background:
              "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #3FA9F5 50%, #A78BFA 75%, #FF8B94 100%)",
            backgroundSize: "400% 400%",
            animation:
              "luxury-gradient 8s ease infinite, pulse-glow 4s ease-in-out infinite",
          }}
          whileHover={{
            scale: 1.1,
            rotate: -4,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
        >
          <div
            className="absolute top-[10%] left-[16%] w-[40%] h-[30%] rounded-full opacity-75 blur-[2px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 58%, rgba(0,0,0,0.22) 100%)",
            }}
          />
          <div className="relative w-[70%] h-[70%]">
            <Image
              src="/Images/GT Transparent logo.png"
              alt="Growwyld Tech logo"
              fill
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 110px, 150px"
              className="object-contain drop-shadow-lg"
              priority
              quality={85}
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Orbiting glass-card service icons */}
        <div className="absolute inset-0 orbit-ring">
          {services.map(({ name, Icon, color }, index) => {
            const angle = angleStep * index;
            return (
              <div
                key={name}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 0,
                  height: 0,
                  transform: `rotate(${angle}deg) translateY(calc(-1 * clamp(130px, 24vw, 220px)))`,
                }}
              >
                <div
                  className="orbit-item-face"
                  style={{ transform: `rotate(${-angle}deg)` }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-1.5 group cursor-pointer -translate-x-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.2, y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div
                      className="relative flex items-center justify-center rounded-2xl backdrop-blur-md transition-shadow duration-300"
                      style={{
                        width: "clamp(46px, 9vw, 64px)",
                        height: "clamp(46px, 9vw, 64px)",
                        background: `linear-gradient(135deg, ${color}22, rgba(255,255,255,0.65))`,
                        border: `1.5px solid ${color}66`,
                        boxShadow: `0 10px 24px -8px ${color}55, inset 0 1px 2px rgba(255,255,255,0.6)`,
                      }}
                    >
                      <Icon
                        className="transition-transform duration-300 group-hover:scale-110"
                        style={{ width: "46%", height: "46%", color }}
                        strokeWidth={2.2}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/20 transition-colors duration-300 pointer-events-none" />
                    </div>
                    <p className="text-[8px] sm:text-[10px] lg:text-[11px] font-semibold text-gray-700 text-center whitespace-nowrap px-1.5 py-0.5 rounded-full bg-white/70 backdrop-blur-sm shadow-sm group-hover:text-gray-900 transition-colors duration-300">
                      {name}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Hero Section Component
// ---------------------------------------------------------------------------
export default function HeroSection() {
  const lenisRef = React.useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (typeof window !== "undefined" && window.__lenisInstance) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    if (typeof window !== "undefined") {
      window.__lenisInstance = lenis;
    }
    lenisRef.current = lenis;

    let frameId = null;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenis.destroy();
      if (typeof window !== "undefined") {
        window.__lenisInstance = null;
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="h-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="h-96 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <style>{`
        .premium-sheen {
          background-size: 250% 100%;
          animation: sheen-move 5s ease-in-out infinite;
        }
        @keyframes sheen-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .premium-sheen { animation: none !important; }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="space-y-3">
              <PremiumHeading
                text="IT Services Company in Odisha"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                delay={0.1}
              />
              <PremiumHeading
                text="Helping Businesses Grow Online"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 bg-clip-text text-transparent leading-tight"
                delay={0.5}
                gradient
              />
            </div>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Growwyld Tech is a trusted IT Services Company in Odisha helping
              businesses transform ideas into meaningful digital experiences.
              From creating high-performing websites to improving online
              visibility and customer engagement, we deliver practical digital
              solutions that support long-term business growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
            >
              <LearnMoreButton />
            </motion.div>
          </div>

          {/* Right Content - Service Circle */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <ServiceCircle />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm text-gray-600">
              Scroll to explore
            </p>
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
