"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Phone, PhoneCall } from "lucide-react";

const TOKENS = {
  navy: "#0D1B2A",
  navyDeep: "#113E6E",
  ink: "#0F172A",
  slate: "#5B6B79",
  line: "#E4E7EC",
  surface: "#F5F6F8",
  accent: "#00B7C3",
  accentGreen: "#22C55E",
};

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ContactHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroShift = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section ref={heroRef} className="relative overflow-hidden">
      {/* Native CSS animations — GPU-composited, no per-frame JS cost */}
      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: .55; transform: scale(0.85); }
        }
        .cch-spin-cw   { animation: spin-cw 26s linear infinite; }
        .cch-spin-ccw  { animation: spin-ccw 20s linear infinite; }
        .cch-float     { animation: float-y 6s ease-in-out infinite; }
        .cch-pulse     { animation: pulse-dot 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cch-spin-cw, .cch-spin-ccw, .cch-float, .cch-pulse { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:py-32">
        {/* ---------------- Left: copy ---------------- */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          style={reduceMotion ? undefined : { opacity: heroFade, y: heroShift }}
        >
          <motion.h1
            variants={heroItem}
            className="text-2xl md:text-3xl lg:text-5xl font-medium mb-3"
            style={{ color: TOKENS.ink }}
          >
            Let&rsquo;s build IT infrastructure your business can rely on.
          </motion.h1>
          <motion.p
            variants={heroItem}
            className="mt-6 max-w-lg text-lg leading-relaxed"
            style={{ color: TOKENS.slate }}
          >
            Tell us what you&rsquo;re working on and a senior engineer will get
            back to you within one business day — no sales queue, no runaround.
          </motion.p>
          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-medium text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: TOKENS.navy }}
            >
              Start a conversation
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#offices"
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-[15px] font-medium transition-colors duration-200 hover:bg-[#F7F8FA]"
              style={{ borderColor: TOKENS.line, color: TOKENS.ink }}
            >
              Find an office
            </a>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t pt-8"
            style={{ borderColor: TOKENS.line }}
          >
            {[
              ["240+", "Enterprise clients"],
              ["99.98%", "Platform uptime"],
              ["24/7", "Incident response"],
            ].map(([n, l]) => (
              <div key={l}>
                <p
                  className="font-display text-2xl font-semibold"
                  style={{ color: TOKENS.ink }}
                >
                  {n}
                </p>
                <p className="mt-1 text-sm" style={{ color: TOKENS.slate }}>
                  {l}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------------- Right: 3D contact/call graphic ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          <div
            className="absolute inset-8 rounded-[2rem]"
            style={{ backgroundColor: TOKENS.surface }}
          />
          <div className="relative w-full py-10">
            <ContactCallGraphic reduceMotion={!!reduceMotion} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   3D "Contact us" call graphic — pointer-driven parallax tilt.
   - Idle spin/float/pulse: pure CSS keyframes (compositor thread,
     zero JS per frame).
   - Tilt: driven by pointer position, smoothed with a spring so
     it settles instead of chasing the cursor 1:1 — this is the
     only per-frame JS work, and it only runs while hovering.
   - Ambient glow: radial-gradient, not a blur filter, so it costs
     nothing to repaint under a moving 3D transform.
   ============================================================ */
function ContactCallGraphic({ reduceMotion }: { reduceMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, {
    stiffness: 150,
    damping: 18,
    mass: 0.4,
  });
  const springY = useSpring(rotateY, {
    stiffness: 150,
    damping: 18,
    mass: 0.4,
  });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 24); // left/right tilt
    rotateX.set(-py * 20); // up/down tilt
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative mx-auto flex h-[280px] w-full max-w-[380px] items-center justify-center sm:h-[340px] sm:max-w-[420px]"
      style={{ perspective: "1200px" }}
    >
      {/* ambient glow — gradient, no filter cost */}
      <div
        aria-hidden
        className="absolute h-[240px] w-[240px] rounded-full sm:h-[280px] sm:w-[280px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,183,195,0.22), rgba(0,183,195,0) 72%)",
        }}
      />

      {/* orbit rings — pure CSS animation */}
      <div
        aria-hidden
        className="absolute rounded-full border cch-spin-cw"
        style={{
          width: "88%",
          height: "88%",
          borderColor: "rgba(13,27,42,0.12)",
        }}
      />
      <div
        aria-hidden
        className="absolute rounded-full border cch-spin-ccw"
        style={{
          width: "70%",
          height: "70%",
          borderColor: "rgba(13,27,42,0.16)",
        }}
      >
        <span
          className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full cch-pulse"
          style={{
            backgroundColor: TOKENS.accent,
            boxShadow:
              "0 0 0 4px rgba(0,183,195,0.18), 0 0 16px rgba(0,183,195,0.6)",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* the 3D card — CSS float for idle bob, spring-driven pointer tilt on top */}
      <div className="cch-float">
        <motion.div
          className="relative flex h-[150px] w-[150px] items-center justify-center rounded-[28px] sm:h-[180px] sm:w-[180px]"
          style={{
            transformStyle: "preserve-3d",
            rotateX: reduceMotion ? 0 : springX,
            rotateY: reduceMotion ? 0 : springY,
            background: `linear-gradient(155deg, ${TOKENS.navy} 0%, ${TOKENS.navyDeep} 100%)`,
            boxShadow:
              "0 2px 4px rgba(13,27,42,0.25), 0 12px 24px rgba(13,27,42,0.28), 0 32px 60px rgba(13,27,42,0.35), inset 0 1px 1px rgba(255,255,255,0.16)",
            willChange: "transform",
          }}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          transition={{
            scale: { type: "spring", stiffness: 220, damping: 20 },
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px]"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 32%)",
            }}
          />
          <div style={{ transform: "translateZ(28px)" }}>
            <PhoneCall
              className="h-12 w-12 text-white sm:h-14 sm:w-14"
              strokeWidth={1.75}
            />
          </div>
        </motion.div>
      </div>

      {/* floating call-us chip */}
      <motion.a
        href="tel:+10000000000"
        className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm sm:bottom-0"
        style={{ borderColor: TOKENS.line, color: TOKENS.ink }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ y: -2 }}
      >
        <Phone className="h-4 w-4" style={{ color: TOKENS.accent }} />
        Call us anytime
      </motion.a>
    </div>
  );
}
