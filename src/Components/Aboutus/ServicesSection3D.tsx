"use client";

import React, { useEffect, useMemo, useCallback, useState } from "react";
import { ChevronRight } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import { motion } from "framer-motion";
import LearnMoreButton from "../Aboutus/Bsix";

// 3D Service Circle Component (Optimized)
const ServiceCircle = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const services = useMemo(
    () => [
      {
        name: "Web Development",
        gif: "/gifs/app-development.png",
        top: "8%",
        left: "50%",
        color: "#FF6B6B",
      },
      {
        name: "Mobile Apps",
        gif: "/gifs/app-development.png",
        top: "29%",
        left: "86.4%",
        color: "#4ECDC4",
      },
      {
        name: "Cloud & DevOps",
        gif: "/gifs/app-development.png",
        top: "71%",
        left: "86.4%",
        color: "#FFD93D",
      },
      {
        name: "Software Development",
        gif: "/gifs/app-development.png",
        top: "92%",
        left: "50%",
        color: "#A8E6CF",
      },
      {
        name: "UI/UX Design",
        gif: "/gifs/app-development.png",
        top: "71%",
        left: "13.6%",
        color: "#FF8B94",
      },
      {
        name: "Digital Marketing",
        gif: "/gifs/app-development.png",
        top: "29%",
        left: "13.6%",
        color: "#B8A9E8",
      },
    ],
    [],
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  if (!isMounted) return null;

  return (
    <div
      className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] flex items-center justify-center mx-auto"
      style={{
        perspective: "1200px",
        maxWidth: "600px",
        willChange: "transform",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) translateY(-12px);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes luxury-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 20px 40px -12px rgba(0,0,0,0.3), inset -8px -10px 20px rgba(0,0,0,0.2), inset 6px 8px 16px rgba(255,255,255,0.2); }
          50% { box-shadow: 0 20px 60px -8px rgba(0,0,0,0.4), inset -8px -10px 20px rgba(0,0,0,0.2), inset 6px 8px 16px rgba(255,255,255,0.3); }
        }

        .service-circle { will-change: transform; }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% {
              transform: translate(-50%, -50%) translateY(0px);
            }
            50% {
              transform: translate(-50%, -50%) translateY(-8px);
            }
          }
        }
      `}</style>

      {/* Ambient floor shadow */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 w-32 h-6 sm:w-48 sm:h-8 lg:w-64 lg:h-10 rounded-full bg-gray-900/15 blur-2xl will-change-transform" />

      {/* Outer ring with gradient spin */}
      <div
        className="absolute will-change-transform"
        style={{
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          opacity: 0.6,
          background:
            "conic-gradient(from 0deg, #FF6B6B 0%, #4ECDC4 15%, #FFD93D 30%, #A8E6CF 45%, #FF8B94 60%, #B8A9E8 75%, #FF6B6B 90%, #4ECDC4 100%)",
          maskImage:
            "radial-gradient(circle, transparent 62%, black 63%, black 66%, transparent 67%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 62%, black 63%, black 66%, transparent 67%)",
          animation: "spin-slow 18s linear infinite",
        }}
      />

      {/* Middle guide circle */}
      <div
        className="absolute will-change-transform"
        style={{
          width: "58%",
          height: "58%",
          borderRadius: "50%",
          borderTop: "2px dashed rgba(148, 163, 184, 0.3)",
          borderRight: "2px dashed rgba(148, 163, 184, 0.3)",
          borderBottom: "2px dashed rgba(148, 163, 184, 0.3)",
          borderLeft: "2px dashed rgba(148, 163, 184, 0.3)",
          animation: "spin-reverse 24s linear infinite",
        }}
      />

      {/* Static rims */}
      <div
        className="absolute"
        style={{
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "58%",
          height: "58%",
          borderRadius: "50%",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
      />

      {/* Center sphere with gradient */}
      <motion.div
        className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center service-circle"
        style={{
          background:
            "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #FFD93D 50%, #A8E6CF 75%, #FF8B94 100%)",
          backgroundSize: "400% 400%",
          animation:
            "luxury-gradient 8s ease infinite, pulse-glow 4s ease-in-out infinite",
          boxShadow:
            "inset -8px -10px 20px rgba(0,0,0,0.2), inset 6px 8px 16px rgba(255,255,255,0.2), 0 20px 40px -12px rgba(0,0,0,0.3)",
          willChange: "transform",
        }}
        whileHover={{
          scale: 1.08,
          rotate: -3,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        {/* glossy highlight */}
        <div
          className="absolute top-[12%] left-[18%] w-[38%] h-[28%] rounded-full opacity-70 blur-[2px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none",
          }}
        />

        {/* 3D inner shadow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.2) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo wrapper */}
        <div className="relative w-[82%] h-[82%]">
          <Image
            src="/Images/GT Transparent logo.png"
            alt="Growwyld Tech logo"
            fill
            sizes="(max-width: 640px) 70px, (max-width: 768px) 90px, (max-width: 1024px) 110px, 140px"
            className="object-contain drop-shadow-md"
            priority
            quality={80}
            loading="eager"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Orbiting service items */}
      {services.map((service, index) => (
        <motion.div
          key={index}
          className="absolute service-circle"
          style={{
            top: service.top,
            left: service.left,
            transform: "translate(-50%, -50%)",
            animation: `float 5s ease-in-out ${index * 0.35}s infinite`,
            zIndex: 10,
            willChange: "transform",
          }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.2 },
          }}
        >
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 group cursor-pointer">
            <motion.div
              className="relative will-change-transform rounded-full flex items-center justify-center overflow-hidden"
              style={{
                width: "56px",
                height: "56px",
                background: `linear-gradient(135deg, ${service.color}15, ${service.color}30)`,
                border: `2px solid ${service.color}`,
                boxShadow: `0 4px 12px -4px ${service.color}40`,
              }}
              whileHover={{
                y: -4,
                scale: 1.1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* SVG/PNG Image */}
              <Image
                src={service.gif}
                alt={service.name}
                fill
                sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                className="object-contain rounded-full p-2"
                unoptimized
                loading="eager"
                draggable={false}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
            </motion.div>

            <p className="text-[8px] sm:text-[10px] lg:text-xs font-semibold text-gray-700 text-center whitespace-nowrap px-1 group-hover:text-gray-900 transition-colors duration-300">
              {service.name}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main Hero Section Component
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
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-3">
              {/* Main Heading - normal text */}
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                IT Services Company in Odisha
              </motion.h1>

              {/* Gradient Heading - normal text */}
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-teal-600 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Helping Businesses Grow Online
              </motion.h2>
            </div>

            {/* Description with fade animation */}
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Growwyld Tech is a trusted IT Services Company in Odisha helping
              businesses transform ideas into meaningful digital experiences.
              From creating high-performing websites to improving online
              visibility and customer engagement, we deliver practical digital
              solutions that support long-term business growth.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <LearnMoreButton />
            </motion.div>
          </motion.div>

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
