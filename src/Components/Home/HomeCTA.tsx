"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Star, Shield, Gem } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/Components/Home/style/cta-section.css";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // If user prefers reduced motion, just show everything without animation
      if (prefersReducedMotion) {
        gsap.set(
          [
            headingRef.current,
            descriptionRef.current,
            buttonRef.current,
            decorativeRef.current,
            badgeRef.current,
          ],
          { opacity: 1, y: 0 },
        );
        return;
      }

      // Create a master timeline
      // 🔧 FIX: start earlier ("top 88%" instead of "top 70%") so the section
      // reveals as soon as it enters the viewport, not after you've scrolled
      // deep past it. This is what made it *feel* slow.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Badge/Label animation
      // 🔧 FIX: shorter durations across the whole timeline
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
      );

      // Heading animation
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.25",
      );

      // Description animation
      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // Button animation with scale effect
      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.4)",
        },
        "-=0.3",
      );

      // Decorative side animation
      // 🔧 FIX: much shorter duration (was 1.2s) and smaller offset so it
      // settles in quickly instead of dragging in slowly
      if (decorativeRef.current) {
        tl.fromTo(
          decorativeRef.current,
          { opacity: 0, x: 40, rotate: -4 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden  py-20 sm:py-24 lg:py-28"
    >
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #14213D 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-6">
            {/* Heading */}
            <div ref={headingRef}>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium leading-tight tracking-tight text-black ">
                Ready to Grow{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-black">
                    Your Business
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-px  to-transparent" />
                </span>
                ?
              </h2>
            </div>

            {/* Description */}
            <div ref={descriptionRef} className="space-y-4">
              <p className="text-base leading-relaxed text-black sm:text-lg">
                Every successful business needs a strong digital foundation.
                Whether you need a high-performing website, improved Google
                rankings, stronger brand visibility, or a complete digital
                growth strategy, Growwyld Tech can help.
              </p>
              <p className="text-base leading-relaxed text-black sm:text-lg">
                We work with businesses across India to deliver web development,
                digital marketing, and technology solutions that improve
                customer engagement, increase online visibility, and support
                long-term business growth.
              </p>
              <p className="text-base leading-relaxed text-black sm:text-lg">
                Let&apos;s turn your ideas into impactful digital experiences
                and create solutions that help your business stay competitive in
                an ever-evolving digital landscape.
              </p>
            </div>

            {/* CTA Button */}
            <div ref={buttonRef}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[#14213D] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_8px_32px_-12px_rgba(20,33,61,0.4)] transition-all duration-500 hover:shadow-[0_16px_48px_-16px_rgba(201,164,100,0.4)] hover:scale-105"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative flex items-center gap-4">
                  Talk to Our Experts
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A464] transition-all duration-300 group-hover:bg-[#D4B06A] group-hover:rotate-45">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side - Luxury Decorative Design */}
          {/* 🔧 FIX: removed `hidden lg:block`, now shows on ALL screen sizes.
              order-1 puts it at the top on mobile/tablet, lg:order-2 moves it to the
              right side on desktop (unchanged from before). Sizing is also scaled
              down responsively so it doesn't overwhelm small screens. */}
          <div
            ref={decorativeRef}
            className="order-1 lg:order-2 relative block"
          >
            <div className="relative mx-auto max-w-[280px] sm:max-w-sm lg:max-w-lg">
              {/* Main composition container */}
              <div className="relative">
                {/* Large outer geometric frame */}
                <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8">
                  <div className="absolute inset-0 rotate-45 rounded-3xl border-2 border-[#C9A464]/10" />
                  <div className="absolute inset-4 -rotate-45 rounded-3xl border border-dashed border-[#C9A464]/8" />
                </div>

                {/* Concentric luxury rings */}
                <div className="relative mx-auto flex aspect-square max-w-[220px] sm:max-w-[300px] lg:max-w-[380px] items-center justify-center">
                  {/* Outer ring */}
                  <div className="animate-spin-40s absolute inset-0 rounded-full">
                    <div
                      className="absolute inset-0 rounded-full border border-[#C9A464]/15"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent, rgba(201,164,100,0.05) 45deg, transparent 90deg, rgba(201,164,100,0.05) 180deg, transparent 270deg, rgba(201,164,100,0.05) 315deg)",
                      }}
                    />
                  </div>

                  {/* Middle ring with gradient */}
                  <div className="animate-spin-30s-reverse absolute inset-3 rounded-full">
                    <div className="absolute inset-0 rounded-full border border-[#C9A464]/20 bg-gradient-to-br from-[#C9A464]/5 to-transparent" />
                  </div>

                  {/* Dashed ring */}
                  <div className="animate-spin-25s absolute inset-7 rounded-full border border-dashed border-[#C9A464]/12" />

                  {/* Inner decorative ring */}
                  <div className="animate-spin-20s-reverse absolute inset-12 rounded-full border-2 border-[#14213D]/5" />

                  {/* Center medallion with logo */}
                  <div className="absolute inset-10 sm:inset-14 lg:inset-16 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-white via-[#FBFAF7] to-[#C9A464]/5 shadow-[0_0_60px_-20px_rgba(201,164,100,0.3)] p-5 sm:p-6 lg:p-8">
                    {/* Logo Image */}
                    <div className="relative flex items-center justify-center">
                      {/* Logo glow effect */}
                      <div className="absolute inset-0 scale-125 rounded-full bg-[#C9A464]/10 blur-2xl" />

                      {/* Replace with your actual logo path */}
                      <Image
                        src="/Images/GT Transparent logo.png" // Change this to your logo path
                        alt="Growwyld Tech Logo"
                        width={300}
                        height={300}
                        className="relative h-auto w-16 sm:w-20 lg:w-40 object-contain"
                        priority
                      />
                    </div>

                    {/* Decorative divider */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#C9A464]/40" />
                      <Gem className="h-3 w-3 text-black" />
                      <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#C9A464]/40" />
                    </div>
                  </div>

                  {/* Floating decorative elements */}
                  {/* Top diamond */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 rotate-45 rounded-sm border border-[#C9A464]/30 bg-white shadow-lg" />
                  </div>

                  {/* Right diamond */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <div className="h-5 w-5 sm:h-5.5 sm:w-5.5 lg:h-6 lg:w-6 rotate-45 rounded-sm border border-[#14213D]/10 bg-white shadow-md" />
                  </div>

                  {/* Bottom diamond */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <div className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 rotate-45 rounded-sm border border-[#C9A464]/20 bg-gradient-to-br from-white to-[#C9A464]/5 shadow-lg" />
                  </div>

                  {/* Left diamond */}
                  <div className="absolute left-0 top-1/3 -translate-x-1/2">
                    <div className="h-4 w-4 sm:h-4.5 sm:w-4.5 lg:h-5 lg:w-5 rotate-45 rounded-sm border border-[#14213D]/8 bg-white shadow-md" />
                  </div>
                </div>

                {/* Floating stars with different sizes */}
                <Star className="star-pulse absolute -right-4 top-[15%] h-5 w-5 fill-[#C9A464] text-[#C9A464]" />
                <Star className="star-pulse-delay-300 absolute -left-2 top-[25%] h-3 w-3 fill-[#C9A464] text-[#C9A464]" />
                <Star className="star-pulse-delay-500 absolute right-[10%] bottom-[20%] h-4 w-4 fill-[#C9A464] text-[#C9A464]" />
              </div>

              {/* Bottom trust indicators */}
              <div className="mt-8 sm:mt-10 lg:mt-12 space-y-4 sm:space-y-5 lg:space-y-6">
                {/* Star rating */}
                <div className="flex items-center justify-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#C9A464] text-[#C9A464] transition-transform hover:scale-125"
                    />
                  ))}
                </div>
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[#9CA3AF]">
                  Trusted by 200+ businesses
                </p>

                {/* Bottom accent line */}
                <div className="mx-auto flex max-w-[200px] items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A464]/30" />
                  <Shield className="h-4 w-4 text-[#C9A464]/50" />
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A464]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
