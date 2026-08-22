"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * 👉 MANUALLY ADD YOUR GIFS HERE
 * Just drop paths/URLs in this array — the component auto-cycles through
 * them on its own. Put files in /public/gif/ and reference them as
 * "/gif/yourfile.gif" (or .svg / .png / .webp), or use any external URL.
 */
const GIFS: string[] = [
  "/gif/business-success-vision.svg",
  "/gif/growth-illustration.svg",
  "/gif/startup-business-promotion.svg",
];

// How long each gif stays on screen before crossfading to the next (ms)
const SLIDE_DURATION = 4500;

const GifShowcase: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next comes from right, -1 = from left
  const [isPaused, setIsPaused] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect touch devices so we can disable the mouse-tilt effect there
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Autoplay loop, pauses on hover
  useEffect(() => {
    if (GIFS.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % GIFS.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = (target: number) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  };

  // Mouse-tilt (3D card feel) — desktop only
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsPaused(false);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: 0.94,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 1.02,
    }),
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl"
    >
      {/* Ambient glow orbs so it still reads as a "hero visual" */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-56 h-56 sm:w-72 sm:h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-56 h-56 sm:w-72 sm:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Premium frame behind the image — no backdrop-blur.
          backdrop-filter has to resample everything behind it every time
          the page repaints, which is a major cause of scroll jank when
          it sits on top of animating/parallaxing elements like these orbs. */}
      <div className="absolute inset-4 sm:inset-8 rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_0_80px_-20px_rgba(0,217,255,0.35)]" />

      <motion.div
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative z-10 w-[78%] h-[78%] flex items-center justify-center"
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={GIFS[index]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Static glow layer — NOT animated, so the filter is only
                computed once instead of every frame of the zoom below. */}
            <div className="absolute max-w-full max-h-full pointer-events-none">
              <img
                src={GIFS[index]}
                alt=""
                aria-hidden="true"
                className="max-w-full max-h-full object-contain opacity-60 blur-xl scale-105"
                draggable={false}
              />
            </div>

            {/* Ken Burns slow zoom while the slide is visible — pure
                transform (GPU-accelerated), no filter on the animating
                element itself. */}
            <motion.img
              src={GIFS[index]}
              alt={`Showcase ${index + 1}`}
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{
                duration: SLIDE_DURATION / 1000 + 0.9,
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
              className="relative max-w-full max-h-full object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Progress bar + dot indicators */}
      {GIFS.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-2/3 max-w-xs">
          <div className="flex gap-2 w-full">
            {GIFS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show gif ${i + 1}`}
                className="relative flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden"
              >
                {i === index && (
                  <span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                    style={{
                      animation: `gif-progress ${SLIDE_DURATION}ms linear forwards`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
                {i < index && (
                  <span className="absolute inset-0 bg-cyan-400/70 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gif-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default GifShowcase;
