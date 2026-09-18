"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
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
// PERFORMANCE TIPS: Debounce function for mouse move
// ---------------------------------------------------------------------------
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );
};

// ---------------------------------------------------------------------------
// Premium heading animation — optimized 3D letter flip-up reveal
// ---------------------------------------------------------------------------
const PremiumHeading = React.memo(
  ({ text, className, delay = 0, gradient = false }) => {
    const letters = text.split("");

    const container = {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.025, delayChildren: delay },
      },
    };

    const letter = {
      hidden: { opacity: 0, y: 30, rotateX: 60 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        },
      },
    };

    return (
      <motion.div
        className={`${className} ${gradient ? "premium-sheen" : ""}`}
        style={{ perspective: 600, display: "flex", flexWrap: "wrap" }}
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
  },
);

PremiumHeading.displayName = "PremiumHeading";

// ---------------------------------------------------------------------------
// Premium 3D Orbiting Service Circle — Optimized for Performance
// ---------------------------------------------------------------------------
const ServiceCircle = React.memo(() => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const tiltTimeoutRef = useRef(null);

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

  // ---- Optimized Mouse-driven 3D tilt ----
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my],
  );

  const handleMouseLeave = useCallback(() => {
    if (tiltTimeoutRef.current) clearTimeout(tiltTimeoutRef.current);
    tiltTimeoutRef.current = setTimeout(() => {
      mx.set(0);
      my.set(0);
    }, 300);
  }, [mx, my]);

  useEffect(() => {
    return () => {
      if (tiltTimeoutRef.current) clearTimeout(tiltTimeoutRef.current);
    };
  }, []);

  if (!isMounted) {
    return (
      <div
        className="relative mx-auto orbit-stage"
        style={{
          width: "clamp(300px, 48vw, 520px)",
          height: "clamp(300px, 48vw, 520px)",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center mx-auto orbit-stage"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .orbit-stage {
          width: clamp(300px, 48vw, 520px);
          height: clamp(300px, 48vw, 520px);
        }

        @keyframes orbit-spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        
        @keyframes orbit-spin-reverse { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(-360deg); } 
        }
        
        @keyframes ring-spin-reverse { 
          from { transform: rotate(360deg); } 
          to { transform: rotate(0deg); } 
        }

        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -10px) scale(1.05); }
        }
        
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12px, 12px) scale(1.04); }
        }
        
        @keyframes blob-float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(8px, 12px) scale(1.03); }
        }

        .orbit-ring { 
          animation: orbit-spin 32s linear infinite;
          will-change: transform;
        }
        
        .orbit-stage:hover .orbit-ring { 
          animation-play-state: paused; 
        }
        
        .orbit-item-face { 
          animation: orbit-spin-reverse 32s linear infinite;
          will-change: transform;
        }
        
        .orbit-stage:hover .orbit-item-face { 
          animation-play-state: paused; 
        }

        .aurora-blob-1 { animation: blob-float-1 8s ease-in-out infinite; }
        .aurora-blob-2 { animation: blob-float-2 10s ease-in-out infinite; }
        .aurora-blob-3 { animation: blob-float-3 9s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .orbit-ring, .orbit-item-face, .center-sphere, .outer-ring, 
          .middle-ring, .aurora-blob-1, .aurora-blob-2, .aurora-blob-3 { 
            animation: none !important; 
          }
        }
      `}</style>

      {/* Ambient aurora glow blobs — REDUCED BLUR for performance */}
      <div
        className="absolute rounded-full opacity-20 aurora-blob-1 pointer-events-none"
        style={{
          width: "55%",
          height: "55%",
          top: "0%",
          left: "5%",
          background: "#FF6B6B",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full opacity-15 aurora-blob-2 pointer-events-none"
        style={{
          width: "50%",
          height: "50%",
          bottom: "0%",
          right: "0%",
          background: "#3FA9F5",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute rounded-full opacity-15 aurora-blob-3 pointer-events-none"
        style={{
          width: "45%",
          height: "45%",
          bottom: "8%",
          left: "0%",
          background: "#A78BFA",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />

      {/* Ground shadow for 3D grounding */}
      <div
        className="absolute bottom-0 w-1/3 h-6 sm:h-8 rounded-full bg-gray-900/10"
        style={{ filter: "blur(16px)", willChange: "transform" }}
      />

      {/* Mouse-tilt 3D wrapper */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Glass dashed guide ring */}
        <div
          className="absolute middle-ring"
          style={{
            width: "68%",
            height: "68%",
            borderRadius: "50%",
            border: "2px dashed rgba(148, 163, 184, 0.3)",
            animation: "ring-spin-reverse 24s linear infinite",
            willChange: "transform",
            backdropFilter: "none",
          }}
        />

        {/* Static glass hairline rims */}
        <div
          className="absolute rounded-full"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.4)",
            boxShadow: "inset 0 1px 6px rgba(255,255,255,0.3)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "68%",
            height: "68%",
            border: "1px solid rgba(209,213,219,0.3)",
          }}
        />

        {/* Center sphere with logo */}
        <motion.div
          className="absolute rounded-full flex items-center justify-center center-sphere"
          style={{
            width: "36%",
            height: "36%",
            background: "#FFFFFF",
            boxShadow:
              "0 8px 24px -8px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.8)",
            willChange: "transform",
          }}
          whileHover={{
            scale: 1.08,
            rotate: -3,
            transition: { type: "spring", stiffness: 280, damping: 22 },
          }}
        >
          <div className="relative w-[70%] h-[70%]">
            <Image
              src="/Images/GT Transparent logo.png"
              alt="Growwyld Tech logo"
              fill
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 110px, 150px"
              className="object-contain"
              priority
              quality={80}
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
                    className="flex flex-col items-center gap-1 group cursor-pointer -translate-x-1/2 -translate-y-1/2"
                    whileHover={{ scale: 1.15, y: -3 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    <div
                      className="relative flex items-center justify-center rounded-xl transition-shadow duration-200"
                      style={{
                        width: "clamp(48px, 9vw, 64px)",
                        height: "clamp(48px, 9vw, 64px)",
                        background: `linear-gradient(135deg, ${color}20, rgba(255,255,255,0.6))`,
                        border: `1.5px solid ${color}55`,
                        boxShadow: `0 8px 16px -6px ${color}44, inset 0 1px 2px rgba(255,255,255,0.5)`,
                        willChange: "transform",
                      }}
                    >
                      <Icon
                        className="transition-transform duration-200"
                        style={{
                          width: "48%",
                          height: "48%",
                          color,
                          willChange: "transform",
                        }}
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] lg:text-[11px] font-semibold text-gray-800 text-center px-1.5 py-0.5 group-hover:text-black max-w-[70px]">
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
});

ServiceCircle.displayName = "ServiceCircle";

// ---------------------------------------------------------------------------
// Main Hero Section Component — Optimized
// ---------------------------------------------------------------------------
export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ REMOVED LENIS - Using native smooth scroll instead
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    return () => {
      if (typeof window !== "undefined") {
        document.documentElement.style.scrollBehavior = "auto";
      }
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="relative min-h-screen bg-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1" />
            <div className="order-1 lg:order-2" />
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
          animation: sheen-move 4s ease-in-out infinite;
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
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  {["IT", "Services", "Company"].map((word, i) => (
                    <motion.span
                      key={word}
                      className="inline-block mr-3 last:mr-0"
                      initial={{ opacity: 0, y: 30, rotateX: 70 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        delay: 0.15 + i * 0.12,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span
                        className={
                          i === 1 ? "text-[##113E6E]" : "text-[#0D1B2A]"
                        }
                      >
                        {word}
                      </span>
                    </motion.span>
                  ))}
                  <motion.span
                    className="block text-2xl md:text-3xl lg:text-4xl font-medium text-[#000000] mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    in Odisha
                  </motion.span>
                </h1>
              </div>
            </div>

            <motion.p
              className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Growwyld Tech is a trusted IT Services Company in Odisha helping
              businesses transform ideas into meaningful digital experiences.
              From creating high-performing websites to improving online
              visibility and customer engagement, we deliver practical digital
              solutions that support long-term business growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <LearnMoreButton />
            </motion.div>
          </div>

          {/* Right Content - Service Circle */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <ServiceCircle />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
