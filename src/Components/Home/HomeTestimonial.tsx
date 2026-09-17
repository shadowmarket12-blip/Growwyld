"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Star,
  Quote,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  accent: string;
  metric: string;
  metricLabel: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Prakash Sahoo",
    role: "Founder",
    company: "Infinity Space",
    content:
      "Partnering with Growwyld Tech has been a great decision for our business. From developing our website to handling SEO and digital marketing activities, the team has consistently delivered quality work. They took the time to understand our business and created strategies that improved our online visibility and helped us reach more potential customers.",
    rating: 5,
    accent: "#C9A464",
    metric: "+180%",
    metricLabel: "Online Growth",
  },
  {
    id: 2,
    name: "Ashish Agarwal",
    role: "Founder",
    company: "AeroBill Software",
    content:
      "We wanted to improve our search visibility and attract more potential customers online. The team helped us strengthen our SEO strategy and optimize our website, resulting in better rankings and increased online exposure. Their communication, expertise, and commitment to delivering results made them a valuable partner for our business.",
    rating: 5,
    accent: "#7C93C9",
    metric: "Top 3",
    metricLabel: "Search Rankings",
  },
  {
    id: 3,
    name: "Debasis Mishra",
    role: "Director",
    company: "Blue Edge Trade Venture Pvt. Ltd.",
    content:
      "Growwyld Tech developed our corporate website for both our mining and EV business verticals. They understood our requirements clearly and transformed our ideas into a professional, modern website that represents our brand effectively. The project was handled with professionalism from start to finish, and the team remained available whenever we needed support or modifications. We are very satisfied with the outcome.",
    rating: 5,
    accent: "#8FBF9F",
    metric: "2x",
    metricLabel: "Business Growth",
  },
  {
    id: 4,
    name: "Rajesh Patra",
    role: "Owner",
    company: "Divine Puri Tours Holidays",
    content:
      "We wanted a website that would help tourists in Puri easily explore our services and connect with us online. The team delivered exactly what we were looking for. The website is user-friendly, visually appealing, and works smoothly across devices. Throughout the project, communication was clear and the entire process was hassle-free.",
    rating: 5,
    accent: "#D08B6A",
    metric: "5★",
    metricLabel: "User Experience",
  },
];

const AUTOPLAY_MS = 6000;

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const circularDelta = (i: number, active: number, len: number) => {
  let d = i - active;
  if (d > len / 2) d -= len;
  if (d < -len / 2) d += len;
  return d;
};

type Depth = {
  translateStep: number;
  rotateStep: number;
  scale: [number, number, number];
  perspective: number;
};

const getDepth = (width: number): Depth => {
  if (width < 640) {
    return {
      translateStep: 42,
      rotateStep: 14,
      scale: [1, 0.82, 0.68],
      perspective: 900,
    };
  }
  if (width < 1024) {
    return {
      translateStep: 46,
      rotateStep: 20,
      scale: [1, 0.8, 0.66],
      perspective: 1200,
    };
  }
  return {
    translateStep: 48,
    rotateStep: 26,
    scale: [1, 0.78, 0.62],
    perspective: 1600,
  };
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInnerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [depth, setDepth] = useState<Depth>({
    translateStep: 48,
    rotateStep: 26,
    scale: [1, 0.78, 0.62],
    perspective: 1600,
  });
  const len = testimonials.length;

  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const stageWidthPx = useRef(1);

  const quickRotX = useRef<gsap.QuickToFunc | null>(null);
  const quickRotY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const update = () => setDepth(getDepth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!stageInnerRef.current) return;
    quickRotX.current = gsap.quickTo(stageInnerRef.current, "rotateX", {
      duration: 0.7,
      ease: "power3.out",
    });
    quickRotY.current = gsap.quickTo(stageInnerRef.current, "rotateY", {
      duration: 0.7,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, stageRef.current], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        stageRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: stageRef.current, start: "top 82%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isPaused || isDragging || typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_MS / 1000,
          ease: "none",
          transformOrigin: "left center",
        },
      );
    }

    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % len);
    }, AUTOPLAY_MS);

    return () => {
      clearTimeout(timer);
      if (progressRef.current) gsap.killTweensOf(progressRef.current);
    };
  }, [activeIndex, isPaused, isDragging, len]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % len) + len) % len);
    },
    [len],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const stage = stageRef.current;
    if (!stage) return;
    stageWidthPx.current = stage.getBoundingClientRect().width || 1;
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setIsPaused(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || dragStartX.current === null) {
        if (e.pointerType === "mouse" && stageRef.current) {
          const rect = stageRef.current.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotY.current?.(px * 10);
          quickRotX.current?.(-py * 10);
        }
        return;
      }
      const deltaPx = e.clientX - dragStartX.current;
      const pct = (deltaPx / stageWidthPx.current) * 100;
      setDragPercent(pct);
    },
    [isDragging],
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    const threshold = 10;
    if (dragPercent <= -threshold) {
      goNext();
    } else if (dragPercent >= threshold) {
      goPrev();
    }
    setIsDragging(false);
    setDragPercent(0);
    dragStartX.current = null;
    setIsPaused(false);
  }, [isDragging, dragPercent, goNext, goPrev]);

  const onPointerLeave = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === "mouse" && !isDragging) {
        quickRotX.current?.(0);
        quickRotY.current?.(0);
      }
      endDrag();
    },
    [endDrag, isDragging],
  );

  const active = testimonials[activeIndex];

  const cards = useMemo(() => {
    return testimonials
      .map((t, i) => {
        const d = circularDelta(i, activeIndex, len);
        return { t, i, d, abs: Math.abs(d) };
      })
      .filter(({ abs }) => abs <= 2);
  }, [activeIndex, len]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-24 lg:py-32"
    >
      {/* Premium ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Animated gradient orbs */}
        <div
          className="absolute -top-20 left-1/4 h-96 w-96 rounded-full blur-[120px] transition-all duration-1000"
          style={{ backgroundColor: `${active.accent}15` }}
        />
        <div
          className="absolute -bottom-20 right-1/4 h-96 w-96 rounded-full blur-[120px] transition-all duration-1000"
          style={{ backgroundColor: `${active.accent}10` }}
        />

        {/* Subtle top border gradient */}
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-16 lg:items-center">
          {/* Left: heading + controls */}
          <div ref={headingRef} className="lg:pr-4">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" style={{ color: active.accent }} />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Client Success Stories
              </span>
            </div>

            {/* Premium heading */}
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3 mt-6">
              What Our{" "}
              <span
                className="relative inline-block"
                style={{ color: active.accent }}
              >
                Clients
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0 5 Q 50 0, 100 5"
                    fill="none"
                    stroke={active.accent}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                </svg>
              </span>{" "}
              Say About Us
            </h2>

            {/* Active client premium summary card */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/60 p-4 sm:p-6 backdrop-blur-sm shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-2xl font-serif text-lg sm:text-xl font-bold transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${active.accent}20, ${active.accent}40)`,
                    color: active.accent,
                    boxShadow: `0 8px 24px -8px ${active.accent}50, inset 0 0 0 2px ${active.accent}30`,
                  }}
                >
                  {initials(active.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">
                    {active.name}
                  </p>
                  <p className="text-sm text-slate-500 truncate">
                    {active.role} ·{" "}
                    <span style={{ color: active.accent }}>
                      {active.company}
                    </span>
                  </p>

                  {/* Success metric badge */}
                  <div
                    className="mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5"
                    style={{
                      backgroundColor: `${active.accent}10`,
                      border: `1px solid ${active.accent}30`,
                    }}
                  >
                    <TrendingUp
                      className="h-4 w-4"
                      style={{ color: active.accent }}
                    />
                    <span
                      className="text-sm font-bold"
                      style={{ color: active.accent }}
                    >
                      {active.metric}
                    </span>
                    <span className="text-xs text-slate-600">
                      {active.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium controls */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-90 shadow-lg shadow-slate-200/50"
                >
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-90 shadow-lg shadow-slate-200/50"
                >
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-slate-400">
                  / {String(len).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Premium dots with active indicator */}
            <div className="mt-6 flex items-center gap-2">
              {testimonials.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => goTo(index)}
                  aria-label={`Go to testimonial from ${t.name}`}
                  className="group relative transition-all duration-500"
                  style={{
                    width: index === activeIndex ? "32px" : "8px",
                    height: "8px",
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor:
                        index === activeIndex
                          ? active.accent
                          : "rgba(100, 116, 139, 0.3)",
                      boxShadow:
                        index === activeIndex
                          ? `0 0 12px ${active.accent}50`
                          : "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: 3D coverflow stage */}
          <div
            ref={stageRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={onPointerLeave}
            onPointerCancel={endDrag}
            className={`relative h-[420px] w-full sm:h-[480px] lg:h-[560px] touch-pan-y ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ perspective: `${depth.perspective}px` }}
          >
            {/* Ground shadow */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full blur-3xl transition-colors duration-700"
              style={{ backgroundColor: `${active.accent}40` }}
            />

            <div
              ref={stageInnerRef}
              className="relative h-full w-full select-none"
              style={{ transformStyle: "preserve-3d" }}
            >
              {cards.map(({ t, i, d, abs }) => {
                const isActive = d === 0;
                const dragShift = isDragging ? dragPercent : 0;
                const translateX = d * depth.translateStep + dragShift;
                const rotateY = d * -depth.rotateStep + dragShift * -0.15;
                const scale = isActive
                  ? depth.scale[0]
                  : abs === 1
                    ? depth.scale[1]
                    : depth.scale[2];
                const opacity = isActive ? 1 : abs === 1 ? 0.6 : 0.25;
                const zIndex = 30 - abs * 10;
                const blur = isActive ? 0 : abs === 1 ? 1 : 3;

                return (
                  <div
                    key={t.id}
                    onClick={() => !isActive && !isDragging && goTo(i)}
                    className={`absolute left-1/2 top-1/2 w-[85%] sm:w-[88%] max-w-[360px] sm:max-w-md ${
                      isActive ? "cursor-default" : "cursor-pointer"
                    } ${abs === 2 ? "hidden md:block" : ""} ${
                      isDragging
                        ? ""
                        : "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    }`}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      filter: `blur(${blur}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8"
                      style={{
                        background:
                          "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
                        boxShadow: isActive
                          ? `0 40px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px ${t.accent}40, inset 0 1px 0 rgba(255,255,255,0.1)`
                          : "0 20px 40px -20px rgba(0,0,0,0.3)",
                        minHeight: "320px",
                        maxHeight: "400px",
                        height: "100%",
                      }}
                    >
                      {/* Premium decorative elements */}
                      <div
                        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                        style={{ backgroundColor: `${t.accent}30` }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: `linear-gradient(145deg, ${t.accent}15 0%, transparent 40%)`,
                        }}
                      />

                      {/* Corner accents */}
                      <div
                        className="pointer-events-none absolute top-0 left-0 h-16 w-16"
                        style={{
                          borderTop: `2px solid ${t.accent}40`,
                          borderLeft: `2px solid ${t.accent}40`,
                          borderTopLeftRadius: "24px",
                        }}
                      />
                      <div
                        className="pointer-events-none absolute bottom-0 right-0 h-16 w-16"
                        style={{
                          borderBottom: `2px solid ${t.accent}40`,
                          borderRight: `2px solid ${t.accent}40`,
                          borderBottomRightRadius: "24px",
                        }}
                      />

                      {/* Shimmer effect */}
                      {isActive && (
                        <div
                          className="pointer-events-none absolute inset-0 opacity-30"
                          style={{
                            background:
                              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 45%, transparent 60%)",
                            backgroundSize: "250% 250%",
                            animation: "premium-sheen 5s ease-in-out infinite",
                          }}
                        />
                      )}

                      <div className="relative z-10">
                        <div className="mb-6 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-2xl"
                              style={{
                                backgroundColor: `${t.accent}20`,
                                border: `1px solid ${t.accent}40`,
                              }}
                            >
                              <Quote
                                className="h-6 w-6"
                                style={{ color: t.accent }}
                              />
                            </div>
                            {isActive && (
                              <span
                                className="hidden sm:inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `${t.accent}15`,
                                  color: t.accent,
                                  border: `1px solid ${t.accent}30`,
                                }}
                              >
                                <Sparkles className="h-3 w-3" />
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            {[...Array(t.rating)].map((_, i2) => (
                              <Star
                                key={i2}
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                style={{ fill: t.accent, color: t.accent }}
                              />
                            ))}
                          </div>
                        </div>

                        <p
                          className={`font-serif leading-relaxed text-slate-100 ${
                            isActive
                              ? "text-sm sm:text-base lg:text-lg"
                              : "text-xs sm:text-sm"
                          }`}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: isActive ? 6 : 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {isActive ? t.content : `${t.content.slice(0, 80)}…`}
                        </p>
                      </div>

                      <div className="relative z-10 mt-6">
                        <div className="flex items-center gap-4">
                          <span
                            className="flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-2xl font-serif text-sm sm:text-base font-bold"
                            style={{
                              background: `linear-gradient(135deg, ${t.accent}20, ${t.accent}40)`,
                              color: t.accent,
                              boxShadow: `inset 0 0 0 2px ${t.accent}30`,
                            }}
                          >
                            {initials(t.name)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate font-serif text-sm sm:text-base lg:text-lg font-semibold text-white">
                              {t.name}
                            </h4>
                            <p className="truncate text-xs sm:text-sm text-slate-400">
                              {t.role} ·{" "}
                              <span style={{ color: t.accent }}>
                                {t.company}
                              </span>
                            </p>
                          </div>

                          {/* Success metric */}
                          <div
                            className="hidden sm:flex flex-col items-center justify-center rounded-xl px-3 py-2"
                            style={{
                              backgroundColor: `${t.accent}10`,
                              border: `1px solid ${t.accent}30`,
                            }}
                          >
                            <span
                              className="text-lg font-bold"
                              style={{ color: t.accent }}
                            >
                              {t.metric}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {t.metricLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      {isActive && (
                        <div className="relative z-10 mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            ref={progressRef}
                            className="h-full origin-left rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${t.accent}, ${t.accent}80)`,
                              transform: "scaleX(0)",
                              boxShadow: `0 0 8px ${t.accent}`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes premium-sheen {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
