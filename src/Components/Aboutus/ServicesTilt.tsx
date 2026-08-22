"use client";

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

type Service = { desc: string; gif: string };

function TiltCard({ s, index }: { s: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ rx: 0, ry: 0 });
  const currentRef = useRef({ rx: 0, ry: 0 });

  const animate = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;

    currentRef.current.rx +=
      (targetRef.current.rx - currentRef.current.rx) * 0.12;
    currentRef.current.ry +=
      (targetRef.current.ry - currentRef.current.ry) * 0.12;

    el.style.setProperty("--rx", `${currentRef.current.rx}deg`);
    el.style.setProperty("--ry", `${currentRef.current.ry}deg`);

    const needsMore =
      Math.abs(targetRef.current.rx - currentRef.current.rx) > 0.01 ||
      Math.abs(targetRef.current.ry - currentRef.current.ry) > 0.01;

    if (needsMore) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      rafRef.current = null;
    }
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const MAX_TILT = 7;
    targetRef.current.ry = (px - 0.5) * MAX_TILT * 2;
    targetRef.current.rx = -(py - 0.5) * MAX_TILT * 2;

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  const handleLeave = () => {
    targetRef.current = { rx: 0, ry: 0 };
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(animate);
    }
  };

  // Encode the path so filenames with spaces (e.g. "Growth Illustration.svg")
  // don't break next/image's loader.
  const safeSrc = encodeURI(s.gif);

  return (
    <motion.div
      variants={fadeUp}
      className="tilt-perspective w-full max-w-[560px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="tilt-card relative rounded-[28px] border border-[var(--line)] bg-white overflow-hidden w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] transform-gpu"
        style={
          {
            "--rx": "0deg",
            "--ry": "0deg",
            transform: "rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)",
            transformStyle: "preserve-3d",
          } as React.CSSProperties
        }
      >
        {/* Base image layer */}
        <div
          className="absolute inset-0"
          style={{ transform: "translateZ(0px)" }}
        >
          <Image
            src={safeSrc}
            alt={`Service ${index + 1}`}
            fill
            unoptimized={safeSrc.endsWith(".svg")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            className="object-cover"
            onError={(e) => {
              // Visible fallback so you can immediately see if a path is wrong
              console.error("Image failed to load:", safeSrc);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/20 via-[#0D1B2A]/55 to-[#0D1B2A]/90" />
        </div>

        {/* Floating index badge */}
        <div
          className="absolute top-6 left-6 md:top-8 md:left-8 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm z-10"
          style={{ transform: "translateZ(60px)" }}
        >
          <span className="font-[family-name:var(--font-display)] text-lg md:text-xl text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Glass content panel */}
        <div
          className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 md:p-8 z-10"
          style={{ transform: "translateZ(40px)" }}
        >
          <p className="text-sm md:text-base lg:text-lg text-white/95 leading-relaxed font-medium mb-5">
            {s.desc}
          </p>

          <div className="flex items-center gap-3 text-white/85">
            <span className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
            <span className="text-xs md:text-sm font-medium tracking-wide">
              Explore Service
            </span>
            <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2} />
          </div>
        </div>

        {/* Rim light border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10 z-10"
          style={{ transform: "translateZ(1px)" }}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesTilt({ services }: { services: Service[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 justify-items-center place-items-center"
    >
      {services.map((s, index) => (
        <TiltCard key={index} s={s} index={index} />
      ))}
    </motion.div>
  );
}
