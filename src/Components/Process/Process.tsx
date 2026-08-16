"use client";

import React, { useEffect, useRef } from "react";
import { Fraunces, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/* ------------------------------------------------------------------ */
/*  Fonts                                                              */
/* ------------------------------------------------------------------ */

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
/*  Content                                                             */
/* ------------------------------------------------------------------ */

type Step = {
  numeral: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    numeral: "01",
    title: "Discover",
    description: "Understanding your business goals and challenges.",
  },
  {
    numeral: "02",
    title: "Plan",
    description: "Creating a customized strategy and roadmap.",
  },
  {
    numeral: "03",
    title: "Build",
    description: "Developing and implementing the solution.",
  },
  {
    numeral: "04",
    title: "Optimize",
    description: "Improving performance through continuous analysis.",
  },
  {
    numeral: "05",
    title: "Grow",
    description: "Supporting long-term business growth and scalability.",
  },
];

/* alternating vertical offset per card index — desktop zigzag rail */
const OFFSET = ["md:mt-0", "md:mt-24", "md:mt-0", "md:mt-24", "md:mt-0"];

/* ------------------------------------------------------------------ */
/*  Card accent palette — cycles through your 4 colors, one per card,  */
/*  wrapping back to the first once you run past 4 steps. Each entry   */
/*  carries a light/base/dark trio so every card still gets a proper   */
/*  faceted gradient (not just a flat swap) instead of a single flat   */
/*  hue.                                                                */
/* ------------------------------------------------------------------ */

type Accent = { base: string; light: string; dark: string };

const ACCENTS: Accent[] = [
  { base: "#0D1B2A", light: "#3E5568", dark: "#040A10" }, // deep ink navy
  { base: "#113E6E", light: "#4E7DA6", dark: "#091B2D" }, // brand navy
  { base: "#00B7C3", light: "#6FE3EA", dark: "#00747D" }, // signal teal
  { base: "#22C55E", light: "#86EFAC", dark: "#12783F" }, // growth green
];

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const mobileLineProgressRef = useRef<HTMLDivElement | null>(null);

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const backRefs = useRef<Array<HTMLDivElement | null>>([]);
  const midRefs = useRef<Array<HTMLDivElement | null>>([]);
  const medallionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      /* ---------------------------------------------------------- */
      /*  Heading / tagline reveal — runs on every breakpoint        */
      /* ---------------------------------------------------------- */
      if (headingRef.current) {
        const bits = headingRef.current.querySelectorAll("[data-reveal]");
        if (prefersReducedMotion) {
          gsap.set(bits, { opacity: 1, x: 0, y: 0 });
        } else {
          gsap.fromTo(
            bits,
            { opacity: 0, x: -24, y: 14 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 90%",
              },
            },
          );
        }
      }

      /* ---------------------------------------------------------- */
      /*  Connecting gold thread — draws in as the rail scrolls in  */
      /* ---------------------------------------------------------- */
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: prefersReducedMotion ? 0 : length,
        });

        if (!prefersReducedMotion) {
          gsap.to(pathRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          });

          if (dotRef.current) {
            gsap.to(dotRef.current, {
              motionPath: {
                path: pathRef.current,
                align: pathRef.current,
                alignOrigin: [0.5, 0.5],
              },
              ease: "none",
              scrollTrigger: {
                trigger: railRef.current,
                start: "top 75%",
                end: "bottom 60%",
                scrub: 0.6,
              },
            });
          }
        }
      }

      /* ---------------------------------------------------------- */
      /*  Mobile / tablet rail line — draws in as the cards scroll   */
      /*  (desktop uses the SVG thread above instead, md:hidden)     */
      /* ---------------------------------------------------------- */
      if (mobileLineProgressRef.current) {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
          if (prefersReducedMotion) {
            gsap.set(mobileLineProgressRef.current, { scaleY: 1 });
            return;
          }

          gsap.set(mobileLineProgressRef.current, {
            scaleY: 0,
            transformOrigin: "50% 0%",
          });

          gsap.to(mobileLineProgressRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: railRef.current,
              start: "top 82%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          });
        });
      }

      /* ---------------------------------------------------------- */
      /*  Cards — layered "plaque" entrance + hover physics          */
      /* ---------------------------------------------------------- */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const back = backRefs.current[i];
        const mid = midRefs.current[i];
        const medallion = medallionRefs.current[i];
        const fromLeft = i % 2 === 0;

        if (prefersReducedMotion) {
          gsap.set(card, { opacity: 1, rotateX: 0, rotateY: 0, z: 0 });
          if (back) gsap.set(back, { x: 12, y: 12, z: -50 });
          if (mid) gsap.set(mid, { x: 6, y: 6, z: -24 });
          if (medallion) gsap.set(medallion, { scale: 1, z: 46, rotate: 0 });
          return;
        }

        /* the card folds open like a hinged plaque, then its layers   */
        /* separate into depth, then the seal drops into place         */
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 88%" },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          card,
          {
            opacity: 0,
            rotateX: -68,
            rotateY: fromLeft ? -16 : 16,
            z: -180,
            transformOrigin: "50% 0%",
          },
          { opacity: 1, rotateX: 0, rotateY: 0, z: 0, duration: 1.05 },
        );

        if (back) {
          tl.fromTo(
            back,
            { x: 0, y: 0, z: 0 },
            { x: 12, y: 12, z: -50, duration: 0.85, ease: "power2.out" },
            "-=0.75",
          );
        }
        if (mid) {
          tl.fromTo(
            mid,
            { x: 0, y: 0, z: 0 },
            { x: 6, y: 6, z: -24, duration: 0.85, ease: "power2.out" },
            "<",
          );
        }
        if (medallion) {
          tl.fromTo(
            medallion,
            { scale: 0.2, z: 0, rotate: -110, opacity: 0 },
            {
              scale: 1,
              z: 46,
              rotate: 0,
              opacity: 1,
              duration: 0.65,
              ease: "back.out(1.8)",
            },
            "-=0.55",
          );
        }

        /* cursor-driven tilt + light sweep, luxury display-case feel */
        const rotateXTo = gsap.quickTo(card, "rotateX", {
          duration: 0.6,
          ease: "power3.out",
        });
        const rotateYTo = gsap.quickTo(card, "rotateY", {
          duration: 0.6,
          ease: "power3.out",
        });
        const liftTo = gsap.quickTo(card, "y", {
          duration: 0.6,
          ease: "power3.out",
        });

        const shine = card.querySelector<HTMLElement>("[data-shine]");

        const handleMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          rotateYTo((px - 0.5) * 16);
          rotateXTo(-(py - 0.5) * 16);
          liftTo(-6);
          if (shine) {
            shine.style.setProperty("--mx", `${px * 100}%`);
            shine.style.setProperty("--my", `${py * 100}%`);
            shine.style.opacity = "1";
          }
        };
        const handleLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          liftTo(0);
          if (shine) shine.style.opacity = "0";
        };

        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);

        (card as any)._cleanup = () => {
          card.removeEventListener("mousemove", handleMove);
          card.removeEventListener("mouseleave", handleLeave);
        };
      });
    }, sectionRef);

    return () => {
      cardRefs.current.forEach((card) => {
        if (card && (card as any)._cleanup) (card as any)._cleanup();
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} relative w-full overflow-hidden bg-white pt-8 pb-12 sm:pt-10 sm:pb-14 lg:pt-9 lg:pb-20`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full border border-[#D7E1EB] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full border border-[#D7E1EB] opacity-50"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-10">
        {/* heading block — explicitly left-aligned on every breakpoint */}
        <div ref={headingRef} className="max-w-3xl text-left">
          <h2
            data-reveal
            className="text-left  leading-[1.08] tracking-tight text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3"
          >
            How We Work
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-xl text-left text-[15px] leading-relaxed text-black sm:mt-6 sm:text-lg"
          >
            A considered process, refined over every engagement — five
            deliberate stages that carry your business from first conversation
            to lasting growth.
          </p>
        </div>

        {/* -------------------------------------------------------- */}
        {/*  Rail — desktop zigzag with drawn navy thread              */}
        {/* -------------------------------------------------------- */}
        <div ref={railRef} className="relative mt-16 sm:mt-20 lg:mt-14">
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[220px] w-full md:block"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            <path
              d="M100,40 C200,40 200,160 300,160 C400,160 400,40 500,40 C600,40 600,160 700,160 C800,160 800,40 900,40"
              stroke="#D7E1EB"
              strokeWidth="1"
              fill="none"
            />
            <path
              ref={pathRef}
              d="M100,40 C200,40 200,160 300,160 C400,160 400,40 500,40 C600,40 600,160 700,160 C800,160 800,40 900,40"
              stroke="#1C4568"
              strokeWidth="1.4"
              fill="none"
            />
            <circle ref={dotRef} r="5" fill="#091B2D" />
          </svg>

          <div
            aria-hidden
            className="absolute left-6 top-2 bottom-2 w-px bg-[#D7E1EB] md:hidden"
          />
          <div
            ref={mobileLineProgressRef}
            aria-hidden
            className="absolute left-6 top-2 bottom-2 w-px bg-[#1C4568] md:hidden"
            style={{ transformOrigin: "50% 0%" }}
          />

          <div
            className="relative grid grid-cols-1 gap-x-8 gap-y-12 sm:gap-y-14 md:grid-cols-5 md:gap-y-0"
            style={{ perspective: "1800px" }}
          >
            {STEPS.map((step, i) => {
              /* cycle the 4 accent colors, one per card, wrapping around */
              const accent = ACCENTS[i % ACCENTS.length];

              return (
                <div
                  key={step.numeral}
                  className={`relative pl-16 md:pl-0 ${OFFSET[i]} md:pt-16`}
                >
                  {/* mobile node dot — tinted to this card's accent */}
                  <span
                    aria-hidden
                    className="absolute left-[19px] top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 bg-white md:hidden"
                    style={{ borderColor: accent.base }}
                  />

                  {/* ============ THE CARD — layered 3D plaque ============ */}
                  <div
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="group relative"
                    style={
                      {
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                        // per-card tinted hover shadow, read by the front plate below
                        "--accent-shadow": hexToRgba(accent.base, 0.32),
                      } as React.CSSProperties
                    }
                  >
                    {/* back bezel plate — deepest layer, faceted in this card's accent */}
                    <div
                      ref={(el) => {
                        backRefs.current[i] = el;
                      }}
                      aria-hidden
                      className="absolute inset-0 rounded-[26px]"
                      style={{
                        background: `linear-gradient(135deg, ${accent.light} 0%, ${accent.base} 55%, ${accent.dark} 100%)`,
                        transformStyle: "preserve-3d",
                      }}
                    />

                    {/* mid frame — thin glass layer, tinted to this card's accent */}
                    <div
                      ref={(el) => {
                        midRefs.current[i] = el;
                      }}
                      aria-hidden
                      className="absolute inset-0 rounded-[26px] border"
                      style={{
                        borderColor: hexToRgba(accent.base, 0.32),
                        backgroundColor: hexToRgba(accent.light, 0.14),
                        transformStyle: "preserve-3d",
                      }}
                    />

                    {/* front content plate */}
                    <div
                      className="relative overflow-hidden rounded-[26px] border border-[#E3EAF1] px-6 py-8 shadow-[0_1px_2px_rgba(9,27,45,0.05)] transition-shadow duration-300 sm:px-7 sm:py-10 group-hover:shadow-[0_30px_60px_-24px_var(--accent-shadow)]"
                      style={{
                        backgroundColor: accent.base,
                      }}
                    >
                      {/* pointer-tracked light sweep */}
                      <div
                        data-shine
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                        style={{
                          background:
                            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.9), transparent 60%)",
                        }}
                      />

                      {/* ghost numeral watermark, engraved feel, tinted to accent */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-3 -top-8 select-none text-[5rem] leading-none sm:text-[6rem]"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "rgba(255,255,255,0.08)",
                          WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                        }}
                      >
                        {step.numeral}
                      </span>

                      {/* seal medallion — sits forward in 3D space, faceted in accent */}
                      <div
                        ref={(el) => {
                          medallionRefs.current[i] = el;
                        }}
                        className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-full sm:mb-6 sm:h-14 sm:w-14"
                        style={{
                          background: `conic-gradient(from 180deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1), rgba(0,0,0,0.2), rgba(255,255,255,0.3), rgba(255,255,255,0.3))`,
                          boxShadow: `0 10px 24px -8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.2)`,
                        }}
                      >
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[12px] font-medium tracking-widest sm:h-10 sm:w-10 sm:text-[13px]"
                          style={{ color: accent.base }}
                        >
                          {step.numeral}
                        </span>
                      </div>

                      <div className="relative">
                        <h3
                          className="text-lg text-white sm:text-xl lg:text-2xl"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {step.title}
                        </h3>
                        <span className="mt-3 mb-4 block h-px w-10 bg-white/40 transition-all duration-500 group-hover:w-16" />
                        <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
                          {step.description}
                        </p>
                      </div>

                      {/* folded corner accent — signature micro-detail, in this card's accent */}
                      <div
                        aria-hidden
                        className="absolute bottom-0 right-0 h-9 w-9 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-0"
                        style={{
                          background: `linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%, rgba(0,0,0,0.3) 100%)`,
                          clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
