"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamically import the GIF showcase (keeps parity with the old 3D scene import pattern)
const GifShowcase = dynamic(() => import("./GifShowcase"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#0d3155] animate-pulse rounded-2xl" />
  ),
});

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const orbOneRef = useRef<HTMLDivElement>(null);
  const orbTwoRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Keep GSAP's ScrollTrigger in sync with Lenis' virtual scroll
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Premium scroll-reveal: left content slides in from the left,
  // right visual slides in from the right, with a soft parallax drift
  // on the background orbs as the user scrolls. Wrapped in gsap.context
  // + matchMedia so it behaves correctly across breakpoints and cleans
  // up properly on unmount.
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: full premium motion
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power4.out" },
        });

        tl.fromTo(
          eyebrowRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          0,
        )
          .fromTo(
            headlineRef.current,
            { x: -80, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9 },
            0.1,
          )
          .fromTo(
            subtextRef.current,
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8 },
            0.25,
          )
          .fromTo(
            buttonsRef.current,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7 },
            0.35,
          )
          .fromTo(
            trustRef.current,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6 },
            0.45,
          )
          .fromTo(
            rightColRef.current,
            { x: 100, opacity: 0, scale: 0.92 },
            { x: 0, opacity: 1, scale: 1, duration: 1.1 },
            0.15,
          );

        // Subtle parallax drift on the glow orbs while scrolling through
        gsap.to(orbOneRef.current, {
          y: -80,
          x: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(orbTwoRef.current, {
          y: 80,
          x: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        return () => tl.kill();
      });

      // Mobile: lighter, faster reveal — no heavy parallax, no scale jump
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out", duration: 0.6 },
        });

        tl.fromTo(
          leftColRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1 },
          0,
        ).fromTo(
          rightColRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1 },
          0.15,
        );

        return () => tl.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax effect on mouse move (desktop only — skipped on touch)
  useEffect(() => {
    const mm = window.matchMedia("(min-width: 1024px)");
    if (!mm.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(headlineRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 0.6,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#113E6E]"
    >
      {/* Background gradient orbs for atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          ref={orbOneRef}
          className="absolute top-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"
        />
        <div
          ref={orbTwoRef}
          className="absolute bottom-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-tl from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"
        />
      </div>

      <div className="relative z-10 min-h-[100svh] lg:h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-14 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div
              ref={leftColRef}
              className="flex flex-col justify-center space-y-5 sm:space-y-6"
            >
              {/* Main Headline — small, premium scale */}
              <h1
                ref={headlineRef}
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white"
              >
                <span className="block">
                  IT Services Company in Odisha Helping Businesses Grow Online
                </span>
              </h1>

              {/* Supporting text */}
              <p
                ref={subtextRef}
                className="text-sm sm:text-base text-slate-300 max-w-md leading-relaxed"
              >
                Growwyld Tech is a trusted IT Services Company in Odisha helping
                businesses transform ideas into meaningful digital experiences.
                From creating high-performing websites to improving online
                visibility and customer engagement, we deliver practical digital
                solutions that support long-term business growth.
              </p>

              {/* CTA Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Started
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-6 py-3 border-2 border-slate-400 text-slate-300 text-sm font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <span className="flex items-center justify-center gap-2">
                    Explore Services
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Right - Auto-cycling GIF showcase */}
            <div
              ref={rightColRef}
              className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] lg:min-h-[600px]"
            >
              <GifShowcase />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
