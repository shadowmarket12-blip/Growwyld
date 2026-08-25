"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  accent: string; // hex used for this client's glow/gradient
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
  },
];

const AUTOPLAY_MS = 5500;

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

// shortest signed circular distance from `active` to `i` within a list of length `len`
const circularDelta = (i: number, active: number, len: number) => {
  let d = i - active;
  if (d > len / 2) d -= len;
  if (d < -len / 2) d += len;
  return d;
};

// Breakpoint-aware 3D depth tuning so the coverflow reads great on any device
type Depth = {
  translateStep: number; // % of card width per position
  rotateStep: number; // deg per position
  scale: [number, number, number]; // active, ±1, ±2
  perspective: number;
};

const getDepth = (width: number): Depth => {
  if (width < 640) {
    return {
      translateStep: 46,
      rotateStep: 16,
      scale: [1, 0.8, 0.64],
      perspective: 1000,
    };
  }
  if (width < 1024) {
    return {
      translateStep: 48,
      rotateStep: 22,
      scale: [1, 0.8, 0.65],
      perspective: 1300,
    };
  }
  return {
    translateStep: 50,
    rotateStep: 28,
    scale: [1, 0.78, 0.62],
    perspective: 1700,
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
    translateStep: 50,
    rotateStep: 28,
    scale: [1, 0.78, 0.62],
    perspective: 1700,
  });
  const len = testimonials.length;

  // ---- Drag / swipe state (pointer events unify mouse + touch) ----
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercent, setDragPercent] = useState(0); // live drag offset, % of stage width
  const dragStartX = useRef<number | null>(null);
  const stageWidthPx = useRef(1);

  // ---- Subtle parallax tilt on hover (desktop, non-drag) ----
  const quickRotX = useRef<gsap.QuickToFunc | null>(null);
  const quickRotY = useRef<gsap.QuickToFunc | null>(null);

  // Track viewport width for responsive depth
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

  // Entrance animation
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
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: { trigger: stageRef.current, start: "top 82%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Autoplay + progress bar
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

  // ---------------------------------------------------------------------
  // Pointer-driven drag-to-slide — works for mouse (desktop) and touch
  // ---------------------------------------------------------------------
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
        // subtle parallax tilt when just hovering (desktop, no drag)
        if (e.pointerType === "mouse" && stageRef.current) {
          const rect = stageRef.current.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotY.current?.(px * 8);
          quickRotX.current?.(-py * 8);
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
    const threshold = 12; // % of stage width to trigger a slide
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
      className="relative overflow-hidden py-12 sm:py-16 lg:py-28"
    >
      {/* Ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #14213D 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] transition-colors duration-700"
        style={{ backgroundColor: `${active.accent}1a` }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[340px_1fr] lg:gap-8 lg:items-center">
          {/* Left: heading + controls */}
          <div ref={headingRef} className="lg:pr-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#14213D]/10 bg-white px-3.5 py-1.5 shadow-sm">
              <Sparkles
                className="h-3.5 w-3.5"
                style={{ color: active.accent }}
              />
              <span className="text-[11px] font-medium tracking-wide text-[#14213D]/70">
                CLIENT STORIES
              </span>
            </div>

            <h2 className="mt-4 sm:mt-6 max-w-2xl text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3">
              Testimonials
            </h2>

            {/* Active client summary */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <span
                className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-xl font-serif text-sm font-bold ring-1 ring-inset transition-colors duration-500"
                style={{
                  backgroundColor: `${active.accent}1f`,
                  color: active.accent,
                  boxShadow: `inset 0 0 0 1px ${active.accent}40`,
                }}
              >
                {initials(active.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#14213D]">
                  {active.name}
                </p>
                <p className="truncate text-xs text-[#9CA3AF]">
                  {active.role} ·{" "}
                  <span style={{ color: active.accent }}>{active.company}</span>
                </p>
              </div>
            </div>

            {/* Controls: arrows + counter */}
            <div className="mt-6 sm:mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] transition-all duration-300 hover:border-[#14213D] hover:bg-[#14213D] hover:text-white active:scale-90"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] transition-all duration-300 hover:border-[#14213D] hover:bg-[#14213D] hover:text-white active:scale-90"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-baseline gap-1 font-serif text-sm text-[#9CA3AF]">
                <span className="text-base font-semibold text-[#14213D]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span>/ {String(len).padStart(2, "0")}</span>
              </div>

              <span className="hidden sm:inline text-[11px] text-[#9CA3AF]/80 ml-auto">
                Drag the cards to browse →
              </span>
            </div>

            {/* Dots */}
            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              {testimonials.map((t, index) => (
                <button
                  key={t.id}
                  onClick={() => goTo(index)}
                  aria-label={`Go to testimonial from ${t.name}`}
                  className="group relative h-1.5 rounded-full bg-[#14213D]/10 transition-all duration-500"
                  style={{
                    width: index === activeIndex ? "28px" : "8px",
                    backgroundColor:
                      index === activeIndex ? active.accent : undefined,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: 3D coverflow stage — drag/swipe to slide */}
          <div
            ref={stageRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={onPointerLeave}
            onPointerCancel={endDrag}
            className={`relative h-[380px] w-full sm:h-[420px] lg:h-[480px] touch-pan-y ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ perspective: `${depth.perspective}px` }}
          >
            {/* grounding shadow */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-2/3 -translate-x-1/2 rounded-full blur-2xl transition-colors duration-700"
              style={{ backgroundColor: `${active.accent}30` }}
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
                const rotateY = d * -depth.rotateStep + dragShift * -0.12;
                const scale = isActive
                  ? depth.scale[0]
                  : abs === 1
                    ? depth.scale[1]
                    : depth.scale[2];
                const opacity = isActive ? 1 : abs === 1 ? 0.55 : 0.22;
                const zIndex = 30 - abs * 10;
                const blur = isActive ? 0 : abs === 1 ? 1 : 2.5;

                return (
                  <div
                    key={t.id}
                    onClick={() => !isActive && !isDragging && goTo(i)}
                    className={`absolute left-1/2 top-1/2 w-[80%] sm:w-[85%] max-w-[340px] sm:max-w-md ${
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
                      className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] sm:rounded-[28px] p-5 sm:p-7 lg:p-8"
                      style={{
                        background:
                          "linear-gradient(155deg, #1a4d7a 0%, #113E6E 55%, #0c2d52 100%)",
                        boxShadow: isActive
                          ? `0 30px 70px -20px rgba(17,62,110,0.5), 0 0 0 1px ${t.accent}35, inset 0 1px 0 rgba(255,255,255,0.08)`
                          : "0 20px 40px -20px rgba(17,62,110,0.3)",
                        minHeight: "300px",
                        maxHeight: "360px",
                        height: "100%",
                      }}
                    >
                      {/* glow */}
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl"
                        style={{ backgroundColor: `${t.accent}26` }}
                      />
                      {/* rim light */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[28px]"
                        style={{
                          background: `linear-gradient(155deg, ${t.accent}22 0%, transparent 30%)`,
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.05]"
                        style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
                          backgroundSize: "28px 28px",
                        }}
                      />
                      {/* premium shimmer sweep on active card */}
                      {isActive && (
                        <div
                          className="pointer-events-none absolute inset-0 opacity-40"
                          style={{
                            background:
                              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.12) 45%, transparent 60%)",
                            backgroundSize: "250% 250%",
                            animation: "sheen-sweep 6s ease-in-out infinite",
                          }}
                        />
                      )}

                      <div className="relative z-10">
                        <div className="mb-4 sm:mb-6 flex items-start justify-between">
                          <Quote
                            className="h-7 w-7 sm:h-9 sm:w-9"
                            style={{ color: `${t.accent}66` }}
                          />
                          <div className="flex items-center gap-0.5">
                            {[...Array(t.rating)].map((_, i2) => (
                              <Star
                                key={i2}
                                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                                style={{ fill: t.accent, color: t.accent }}
                              />
                            ))}
                          </div>
                        </div>

                        <p
                          className={`font-serif leading-relaxed text-[#F5F3EE] ${
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

                      <div className="relative z-10 mt-4 sm:mt-6 flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl font-serif text-xs sm:text-sm font-bold"
                          style={{
                            backgroundColor: `${t.accent}25`,
                            color: t.accent,
                          }}
                        >
                          {initials(t.name)}
                        </span>
                        <div className="min-w-0">
                          <h4 className="truncate font-serif text-xs sm:text-sm lg:text-base font-semibold text-white">
                            {t.name}
                          </h4>
                          <p className="truncate text-[10px] sm:text-xs text-white/50">
                            {t.role} ·{" "}
                            <span style={{ color: t.accent }}>{t.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* Autoplay progress bar — only on the active card */}
                      {isActive && (
                        <div className="relative z-10 mt-4 sm:mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            ref={progressRef}
                            className="h-full origin-left rounded-full"
                            style={{
                              backgroundColor: t.accent,
                              transform: "scaleX(0)",
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
        @keyframes sheen-sweep {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
