"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const len = testimonials.length;

  const touchStartX = useRef<number | null>(null);

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
    if (isPaused || typeof window === "undefined") return;
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
  }, [activeIndex, isPaused, len]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % len) + len) % len);
    },
    [len],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) goPrev();
    else if (delta < -40) goNext();
    touchStartX.current = null;
    setIsPaused(false);
  };

  const active = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden  py-16 sm:py-20 lg:py-28"
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

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[340px_1fr] lg:gap-8 lg:items-center">
          {/* Left: heading + controls */}
          <div ref={headingRef} className="lg:pr-4">
            <h2 className="mt-6 max-w-2xl text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3">
              Testimonials
            </h2>

            {/* Active client summary */}
            <div className="mt-8 flex items-center gap-3">
              <span
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-serif text-sm font-bold ring-1 ring-inset transition-colors duration-500"
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
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] transition-all duration-300 hover:border-[#14213D] hover:bg-[#14213D] hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14213D]/15 bg-white text-[#14213D] transition-all duration-300 hover:border-[#14213D] hover:bg-[#14213D] hover:text-white"
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
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center gap-2">
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

          {/* Right: 3D coverflow stage */}
          <div
            ref={stageRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative h-[480px] w-full sm:h-[440px] lg:h-[460px]"
            style={{ perspective: "1600px" }}
          >
            <div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {testimonials.map((t, i) => {
                const d = circularDelta(i, activeIndex, len);
                const abs = Math.abs(d);
                if (abs > 2) return null;

                const isActive = d === 0;
                const translateX = d * 62; // % of card width
                const rotateY = d * -32; // deg
                const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.66;
                const opacity = isActive ? 1 : abs === 1 ? 0.55 : 0.22;
                const zIndex = 30 - abs * 10;
                const blur = isActive ? 0 : abs === 1 ? 1 : 2.5;

                return (
                  <div
                    key={t.id}
                    onClick={() => !isActive && goTo(i)}
                    className={`absolute left-1/2 top-1/2 w-[85%] max-w-md select-none rounded-[28px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isActive ? "cursor-default" : "cursor-pointer"
                    } ${abs === 2 ? "hidden md:block" : ""}`}
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                      filter: `blur(${blur}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className="relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:p-8"
                      style={{
                        background:
                          "linear-gradient(155deg, #1a4d7a 0%, #113E6E 55%, #0c2d52 100%)",
                        boxShadow: isActive
                          ? `0 30px 60px -20px rgba(17,62,110,0.45), 0 0 0 1px ${t.accent}30`
                          : "0 20px 40px -20px rgba(17,62,110,0.3)",
                      }}
                    >
                      {/* glow */}
                      <div
                        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl"
                        style={{ backgroundColor: `${t.accent}26` }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-[0.05]"
                        style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
                          backgroundSize: "28px 28px",
                        }}
                      />

                      <div className="relative z-10">
                        <div className="mb-6 flex items-start justify-between">
                          <Quote
                            className="h-9 w-9"
                            style={{ color: `${t.accent}66` }}
                          />
                          <div className="flex items-center gap-0.5">
                            {[...Array(t.rating)].map((_, i2) => (
                              <Star
                                key={i2}
                                className="h-3.5 w-3.5"
                                style={{ fill: t.accent, color: t.accent }}
                              />
                            ))}
                          </div>
                        </div>

                        <p
                          className={`font-serif leading-relaxed text-[#F5F3EE] ${
                            isActive
                              ? "text-base sm:text-lg"
                              : "text-sm sm:text-base"
                          }`}
                        >
                          {isActive ? t.content : `${t.content.slice(0, 120)}…`}
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-serif text-sm font-bold"
                          style={{
                            backgroundColor: `${t.accent}25`,
                            color: t.accent,
                          }}
                        >
                          {initials(t.name)}
                        </span>
                        <div className="min-w-0">
                          <h4 className="truncate font-serif text-sm font-semibold text-white sm:text-base">
                            {t.name}
                          </h4>
                          <p className="truncate text-xs text-white/50">
                            {t.role} ·{" "}
                            <span style={{ color: t.accent }}>{t.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* Autoplay progress bar — only on the active card */}
                      {isActive && (
                        <div className="relative z-10 mt-6 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
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
    </section>
  );
};

export default Testimonials;
