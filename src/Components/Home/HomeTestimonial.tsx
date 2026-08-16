"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Star, Quote, Sparkles, ArrowUpRight } from "lucide-react";
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

const AUTOPLAY_MS = 6000;

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = testimonials[activeIndex];

  // Entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([headingRef.current, panelRef.current], { opacity: 1, y: 0 });
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
        panelRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: panelRef.current, start: "top 82%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Crossfade content whenever activeIndex changes
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!contentRef.current) return;

    if (prefersReducedMotion) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
    );
  }, [activeIndex]);

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
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => {
      clearTimeout(timer);
      if (progressRef.current) gsap.killTweensOf(progressRef.current);
    };
  }, [activeIndex, isPaused]);

  const selectTestimonial = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FBFAF7] py-20 sm:py-24 lg:py-32"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #14213D 1px, transparent 0)`,
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A464]/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div ref={headingRef} className="mb-14 sm:mb-16">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A464]/20 bg-[#C9A464]/5 px-5 py-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C9A464]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#C9A464]">
                  Client Stories
                </span>
              </div>

              <h2 className="mt-6 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-[#14213D] sm:text-4xl lg:text-5xl">
                Results our clients{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#C9A464]">
                    talk about
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-[#C9A464]/60 to-transparent" />
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-base text-[#6B7280]">
                Every project below is a real business we&apos;ve worked
                alongside — read what changed for them.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-[#EDEAE3] bg-white px-6 py-4 shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[#C9A464] text-[#C9A464]"
                  />
                ))}
              </div>
              <span className="font-serif text-2xl font-bold text-[#14213D]">
                5.0
              </span>
              <span className="ml-1 text-xs text-[#9CA3AF]">
                / 200+ reviews
              </span>
            </div>
          </div>
        </div>

        {/* Spotlight layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          {/* Client rail */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {testimonials.map((t, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => selectTestimonial(index)}
                  className={`group relative flex min-w-[220px] flex-shrink-0 items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-300 lg:min-w-0 ${
                    isActive
                      ? "border-[#14213D] bg-[#14213D] shadow-[0_8px_24px_-8px_rgba(20,33,61,0.35)]"
                      : "border-[#EDEAE3] bg-white hover:border-[#C9A464]/40"
                  }`}
                >
                  <span
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-serif text-sm font-bold transition-colors duration-300"
                    style={{
                      backgroundColor: isActive ? `${t.accent}25` : "#F5F3EE",
                      color: isActive ? t.accent : "#14213D",
                    }}
                  >
                    {initials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-sm font-semibold transition-colors duration-300 ${
                        isActive ? "text-white" : "text-[#14213D]"
                      }`}
                    >
                      {t.name}
                    </span>
                    <span
                      className={`block truncate text-xs transition-colors duration-300 ${
                        isActive ? "text-white/60" : "text-[#9CA3AF]"
                      }`}
                    >
                      {t.company}
                    </span>
                  </span>

                  {/* active indicator */}
                  <span
                    className={`absolute left-0 top-1/2 hidden h-8 w-1 -translate-y-1/2 rounded-r-full transition-opacity duration-300 lg:block ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundColor: t.accent }}
                  />
                </button>
              );
            })}
          </div>

          {/* Spotlight panel */}
          <div
            ref={panelRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl bg-[#14213D] p-8 sm:p-12"
          >
            {/* Ambient glow tied to active client's accent */}
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl transition-colors duration-700"
              style={{ backgroundColor: `${active.accent}22` }}
            />
            <div
              className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full blur-3xl transition-colors duration-700"
              style={{ backgroundColor: `${active.accent}14` }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />

            <div ref={contentRef} className="relative z-10">
              <div className="mb-8 flex items-start justify-between">
                <Quote
                  className="h-12 w-12 transition-colors duration-500"
                  style={{ color: `${active.accent}55` }}
                />
                <div className="flex items-center gap-0.5">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{ fill: active.accent, color: active.accent }}
                    />
                  ))}
                </div>
              </div>

              <blockquote>
                <p className="font-serif text-xl leading-relaxed text-[#F5F3EE] sm:text-2xl sm:leading-relaxed">
                  {active.content}
                </p>
              </blockquote>
            </div>

            <div className="relative z-10 mt-10 flex items-end justify-between gap-6">
              <div>
                <h4 className="font-serif text-lg font-semibold text-white">
                  {active.name}
                </h4>
                <p className="text-sm text-white/50">
                  {active.role} ·{" "}
                  <span style={{ color: active.accent }}>{active.company}</span>
                </p>
              </div>

              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-500"
                style={{ borderColor: `${active.accent}40` }}
              >
                <ArrowUpRight
                  className="h-4 w-4 transition-colors duration-500"
                  style={{ color: active.accent }}
                />
              </div>
            </div>

            {/* Autoplay progress bar */}
            <div className="relative z-10 mt-8 flex gap-1.5">
              {testimonials.map((t, index) => (
                <div
                  key={t.id}
                  className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"
                >
                  {index === activeIndex && (
                    <div
                      ref={progressRef}
                      className="h-full origin-left rounded-full"
                      style={{
                        backgroundColor: active.accent,
                        transform: "scaleX(0)",
                      }}
                    />
                  )}
                  {index < activeIndex && (
                    <div
                      className="h-full rounded-full opacity-40"
                      style={{ backgroundColor: active.accent }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
