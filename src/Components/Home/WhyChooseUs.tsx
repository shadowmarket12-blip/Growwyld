"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  Zap,
  TrendingUp,
  Handshake,
  Rocket,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* -------------------------------------------------------------------- */
/*  Content                                                              */
/* -------------------------------------------------------------------- */

interface Reason {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  shadowColor: string;
  ringColor: string;
}

const REASONS: Reason[] = [
  {
    icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    title: "Tailored Strategies",
    description: "Built around your business goals, not generic templates.",
    gradient: "from-blue-600 to-indigo-600",
    shadowColor: "rgba(37, 99, 235, 0.3)",
    ringColor: "#2563EB",
  },
  {
    icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    title: "End-to-End Expertise",
    description: "Technology, marketing, branding, and growth under one roof.",
    gradient: "from-amber-500 to-orange-600",
    shadowColor: "rgba(245, 158, 11, 0.3)",
    ringColor: "#F59E0B",
  },
  {
    icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    title: "Results-Driven Approach",
    description: "Focused on visibility, leads, and long-term business growth.",
    gradient: "from-emerald-500 to-teal-600",
    shadowColor: "rgba(16, 185, 129, 0.3)",
    ringColor: "#10B981",
  },
  {
    icon: <Handshake className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    title: "Transparent Collaboration",
    description: "Open communication and reliable support at every stage.",
    gradient: "from-purple-500 to-pink-600",
    shadowColor: "rgba(168, 85, 247, 0.3)",
    ringColor: "#A855F7",
  },
  {
    icon: <Rocket className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    title: "Scalable Solutions",
    description: "Flexible solutions designed to support future growth.",
    gradient: "from-cyan-500 to-blue-600",
    shadowColor: "rgba(6, 182, 212, 0.3)",
    ringColor: "#06B6D4",
  },
  {
    icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    title: "Innovation Focused",
    description: "Modern technologies and strategies to keep you ahead.",
    gradient: "from-rose-500 to-red-600",
    shadowColor: "rgba(244, 63, 94, 0.3)",
    ringColor: "#F43F5E",
  },
];

const EASE = "expo.out";

/* -------------------------------------------------------------------- */
/*  Lenis <-> GSAP wiring                                                */
/* -------------------------------------------------------------------- */

function useLenisGsap() {
  useEffect(() => {
    const w = window as typeof window & { __growwyldLenis?: Lenis };

    if (w.__growwyldLenis) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    w.__growwyldLenis = lenis;

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 100);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete w.__growwyldLenis;
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);
}

/* -------------------------------------------------------------------- */
/*  Scroll reveal hook                                                   */
/* -------------------------------------------------------------------- */

function useReveal<T extends HTMLElement>(opts?: {
  y?: number;
  duration?: number;
  delay?: number;
  x?: number;
  scale?: number;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: opts?.y ?? 24,
          x: opts?.x ?? 0,
          scale: opts?.scale ?? 1,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: opts?.duration ?? 0.7,
          delay: opts?.delay ?? 0,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* -------------------------------------------------------------------- */
/*  Circular Card Component                                              */
/* -------------------------------------------------------------------- */

function CircularCard({
  reason,
  registerRef,
  index,
  total,
  radius,
}: {
  reason: Reason;
  registerRef: (el: HTMLDivElement | null, i: number) => void;
  index: number;
  total: number;
  radius: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  const style: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    opacity: 0,
  };

  const handleMouseEnter = () => {
    if (cardRef.current && window.innerWidth >= 1024) {
      gsap.to(cardRef.current, {
        scale: 1.15,
        rotate: 5,
        duration: 0.5,
        ease: "back.out(1.7)",
        transformPerspective: 800,
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && window.innerWidth >= 1024) {
      gsap.to(cardRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
        transformPerspective: 800,
      });
    }
  };

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        registerRef(el, index);
      }}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex h-16 w-16 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-44 xl:w-44 flex-col items-center justify-center overflow-hidden rounded-full bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 md:p-3 shadow-[0_10px_30px_-15px_rgba(17,62,110,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(17,62,110,0.4)] transition-shadow duration-300 cursor-pointer"
    >
      {/* Gradient ring */}
      <div
        className="absolute inset-0 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${reason.ringColor}, transparent, ${reason.ringColor}, transparent)`,
        }}
      />

      {/* Inner ring */}
      <div
        className="absolute inset-[2px] rounded-full bg-white/95 backdrop-blur-sm"
        style={{ border: `2px solid ${reason.ringColor}25` }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Icon container */}
        <div
          className={`flex h-6 w-6 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full bg-gradient-to-br ${reason.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
          style={{
            boxShadow: `0 6px 15px -3px ${reason.shadowColor}`,
          }}
        >
          <span className="text-white">{reason.icon}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1 sm:mt-1.5 text-[7px] sm:text-[9px] md:text-[10px] lg:text-xs font-semibold text-slate-800 leading-tight">
          {reason.title}
        </h3>

        {/* Description - visible only on larger screens */}
        <p className="hidden lg:block mt-0.5 text-[8px] text-slate-600 leading-snug px-1">
          {reason.description}
        </p>

        {/* Decorative line */}
        <div
          className={`mt-0.5 sm:mt-1 h-[2px] w-3 sm:w-5 bg-gradient-to-r ${reason.gradient} rounded-full transition-all duration-300 group-hover:w-6`}
        />
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 30px 8px ${reason.shadowColor}`,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Main section                                                         */
/* -------------------------------------------------------------------- */

export default function WhyChooseSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const centerOrbRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(130);
  const [isMounted, setIsMounted] = useState(false);

  useLenisGsap();

  // Calculate radius based on viewport
  useIsomorphicLayoutEffect(() => {
    const calculateRadius = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setRadius(80);
      } else if (width < 640) {
        setRadius(110);
      } else if (width < 768) {
        setRadius(150);
      } else if (width < 1024) {
        setRadius(190);
      } else if (width < 1280) {
        setRadius(230);
      } else {
        setRadius(260);
      }
    };

    calculateRadius();
    setIsMounted(true);
  }, []);

  // Update radius on resize
  useEffect(() => {
    if (!isMounted) return;

    let timeout: NodeJS.Timeout;
    const calculateRadius = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 400) {
          setRadius(80);
        } else if (width < 640) {
          setRadius(110);
        } else if (width < 768) {
          setRadius(150);
        } else if (width < 1024) {
          setRadius(190);
        } else if (width < 1280) {
          setRadius(230);
        } else {
          setRadius(260);
        }
      }, 100);
    };

    window.addEventListener("resize", calculateRadius);
    return () => {
      window.removeEventListener("resize", calculateRadius);
      clearTimeout(timeout);
    };
  }, [isMounted]);

  const headingRef = useReveal<HTMLHeadingElement>({
    y: 30,
    x: -40,
    duration: 0.8,
    delay: 0.1,
  });
  const subRef = useReveal<HTMLParagraphElement>({
    y: 20,
    x: -40,
    duration: 0.7,
    delay: 0.2,
  });
  const badgeRef = useReveal<HTMLDivElement>({
    y: 20,
    duration: 0.6,
    delay: 0.05,
    scale: 0.9,
  });

  const registerRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  // Card entrance animations
  useEffect(() => {
    if (!isMounted) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.3, rotate: -90, y: 50 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: 0,
            duration: 0.6,
            ease: EASE,
            delay: 0.2 + i * 0.08,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  // Center orb pulse animation
  useEffect(() => {
    if (!isMounted || !centerOrbRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(centerOrbRef.current, {
        scale: 1.05,
        boxShadow: "0 0 50px 15px rgba(59, 130, 246, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Subtle decorative rings in background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[400px] rounded-full border border-blue-100/40 sm:h-[550px] sm:w-[550px] lg:h-[650px] lg:w-[650px]" />
        <div className="absolute inset-10 rounded-full border border-blue-100/25 sm:inset-14" />
        <div className="absolute inset-20 rounded-full border border-blue-100/15 sm:inset-28" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned */}
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            ref={badgeRef}
            style={{ opacity: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium text-blue-700">
              Why Choose Us
            </span>
          </div>

          <h2
            ref={headingRef}
            style={{ opacity: 0 }}
            className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900"
          >
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Growwyld Tech
            </span>
          </h2>
          <p
            ref={subRef}
            style={{ opacity: 0 }}
            className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600"
          >
            Six commitments that shape every project we take on — from the first
            strategy call to the growth that follows.
          </p>
        </div>

        {/* Circular Orbit Layout */}
        <div
          className="relative mt-10 sm:mt-14 h-[280px] sm:h-[420px] md:h-[500px] lg:h-[580px] xl:h-[620px]"
          style={{ perspective: 2000 }}
        >
          {/* Center orb */}
          <div
            ref={centerOrbRef}
            className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 shadow-[0_0_30px_8px_rgba(37,99,235,0.25)]"
          >
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white">
                6
              </div>
              <div className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-wider text-white/80">
                Reasons
              </div>
            </div>
          </div>

          {/* Circular cards */}
          {REASONS.map((reason, i) => (
            <CircularCard
              key={reason.title}
              reason={reason}
              index={i}
              total={REASONS.length}
              registerRef={registerRef}
              radius={radius}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
