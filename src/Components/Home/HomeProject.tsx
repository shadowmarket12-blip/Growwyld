"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

/* ------------------------------------------------------------------ */
/* Project data — edit freely                                          */
/* ------------------------------------------------------------------ */

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  href: string;
  /** Force external behaviour; otherwise auto-detected from href. */
  external?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "INFINITY SPACE",
    title: "INFINITY SPACE",
    description:
      "Infinity Space is a modern interior design studio in Odisha, specializing in stylish, functional, and customized residential and commercial interiors.",
    category: "Website . Digital Marketing",
    year: "2026",
    image: "/Project/p1.png",
    href: "https://infinityspaceodisha.com/",
  },
  {
    id: "BLUE EDGE TRADE VENTURE PVT. LTD",
    title: "BLUE EDGE TRADE VENTURE PVT. LTD",
    description:
      "Blue Edge Trade Venture Pvt. Ltd. is a leading mining company in Odisha, providing reliable mining, mineral trading, and related industrial solutions.",
    category: "Website",
    year: "2026",
    image: "/Project/p2.png",
    href: "https://blueedgetrade.in/",
  },
  {
    id: "JC ENTERPRISES",
    title: "JC ENTERPRISES",
    description:
      "J.C. Enterprise is a trusted supplier of electrical and electronic components, offering quality products and reliable solutions for various industrial and commercial needs.",
    category: "E-commerce · Digital Marketing",
    year: "2026",
    image: "/Project/p3.png",
    href: "https://jcenterprise.co.in/",
    external: true,
  },
  {
    id: "WWE TATTOO STUDIO",
    title: "WWE TATTOO STUDIO",
    description:
      "WWE Tattoo Studio is a professional tattoo studio in Bhubaneswar specializing in custom tattoos, portrait tattoos, cover-ups, tattoo removal, and piercing with a focus on creativity, precision, and hygiene.",
    category: "Custom Software · Automation",
    year: "2026",
    image: "/Project/p4.png",
    href: "https://wwetattoostudio.in/",
  },
];

/* ------------------------------------------------------------------ */
/* Magnetic link — small reusable wrapper                              */
/* ------------------------------------------------------------------ */

function MagneticLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: relX * 0.35,
      y: relY * 0.5,
      duration: 0.4,
      ease: "power3.out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-flex will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const cursorImgRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  /* ---------------- Lenis (guarded, idempotent) ---------------- */
  useEffect(() => {
    let createdHere = false;
    let cancelled = false;
    let rafId: number;

    (async () => {
      gsap.registerPlugin(ScrollTrigger);

      let lenis = (window as any).__lenis;
      if (!lenis) {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        lenis = new Lenis({
          duration: 1.15,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        (window as any).__lenis = lenis;
        createdHere = true;

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time: number) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        const loop = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      }

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      if (createdHere) {
        cancelAnimationFrame(rafId);
        (window as any).__lenis?.destroy();
        (window as any).__lenis = null;
      }
    };
  }, []);

  /* ---------------- GSAP entrance / scroll animations ---------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      /* Heading mask reveal */
      gsap.fromTo(
        ".proj-heading-line",
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".proj-fade",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      /* Divider draw-in */
      gsap.to(".proj-rule", {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      /* Staggered row entrance */
      gsap.fromTo(
        ".project-row",
        { opacity: 0, y: isDesktop ? 56 : 30 },
        {
          opacity: 1,
          y: 0,
          duration: isDesktop ? 1 : 0.7,
          ease: "power3.out",
          stagger: isDesktop ? 0.14 : 0.08,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      /* Row title mask reveal, synced roughly with row stagger */
      gsap.fromTo(
        ".project-title-inner",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: isDesktop ? 1 : 0.7,
          ease: "power3.out",
          stagger: isDesktop ? 0.14 : 0.08,
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      /* Static mobile/tablet thumbnails: gentle scale-in reveal */
      gsap.utils.toArray<HTMLElement>(".project-thumb-static").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------------- Cursor-follow image (desktop only, scoped to this section) ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches || !cursorImgRef.current) return;

    quickX.current = gsap.quickTo(cursorImgRef.current, "x", {
      duration: 0.55,
      ease: "power3",
    });
    quickY.current = gsap.quickTo(cursorImgRef.current, "y", {
      duration: 0.55,
      ease: "power3",
    });
  }, []);

  function handleSectionMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(min-width: 1024px)").matches ||
      !sectionRef.current
    )
      return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 24;
    const y = e.clientY - rect.top - 90;
    quickX.current?.(x);
    quickY.current?.(y);
  }

  function handleRowEnter(project: Project, index: number) {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;
    setActiveImage(project.image);
    setActiveIndex(index);
    if (!cursorImgRef.current) return;
    gsap.to(cursorImgRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
    });
  }

  function handleRowLeave() {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;
    setActiveIndex(null);
    if (!cursorImgRef.current) return;
    gsap.to(cursorImgRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleRowLeave}
      className={`${poppins.className} relative bg-white text-[#0A0A0A] px-6 md:px-12 py-24 md:py-25 overflow-hidden`}
    >
      <div
        ref={cursorImgRef}
        className="hidden lg:block absolute top-0 left-0 z-50 w-[240px] h-[160px] pointer-events-none opacity-0 scale-90 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="relative w-full h-full overflow-hidden border border-[#E4E4DF] bg-[#FAFAF8]">
          {activeImage && (
            <Image
              key={activeImage}
              src={activeImage}
              alt=""
              fill
              sizes="240px"
              className="object-cover"
            />
          )}
          <span className="absolute left-4 bottom-4 text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A] bg-white/85 px-2 py-1">
            {activeIndex !== null ? PROJECTS[activeIndex]?.year : ""}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px]">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium text-black">
              <span className="block overflow-hidden">
                <span className="proj-heading-line block">Recent Projects</span>
              </span>
            </h2>
            <p className="proj-fade mt-6 max-w-[52ch] text-[15px] md:text-[16.5px] leading-relaxed text-black">
              A curated look at recent work — websites, platforms and growth
              strategies built for businesses that wanted something better than
              the standard.
            </p>
          </div>

          <div className="proj-fade text-right shrink-0">
            <span className="text-[clamp(2rem,4vw,3rem)] font-light tabular-nums">
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[#6E6E6B] mt-1">
              Projects
            </div>
          </div>
        </div>

        <div className="proj-rule mt-16 md:mt-20 h-px w-full bg-[#113E6E] origin-left scale-x-0" />

        {/* List */}
        <div ref={listRef} className="mt-2">
          {PROJECTS.map((project, index) => {
            const isExternal =
              project.external ?? project.href.startsWith("http");
            const dimmed = activeIndex !== null && activeIndex !== index;
            return (
              <div
                key={project.id}
                className="project-row group relative border-b border-[#E4E4DF]"
                onMouseEnter={() => handleRowEnter(project, index)}
                onMouseLeave={handleRowLeave}
                style={{
                  opacity: dimmed ? 0.4 : 1,
                  transition: "opacity 0.5s ease",
                }}
              >
                <Link
                  href={project.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="grid grid-cols-[auto_1fr] lg:grid-cols-[64px_1fr_200px_90px_160px] items-center gap-x-6 gap-y-4 py-8 md:py-10"
                >
                  {/* Number */}
                  <span className="text-[13px] text-[#6E6E6B] tabular-nums transition-colors duration-300 group-hover:text-[#0A0A0A]">
                    {/* {String(index + 1).padStart(2, "0")} */}
                  </span>

                  {/* Title + description (+ mobile thumb) */}
                  <div className="min-w-0">
                    <span className="block overflow-hidden">
                      <span className="project-title-inner block font-light text-[clamp(1.5rem,3.6vw,2.4rem)] leading-tight transition-transform duration-500 ease-out lg:group-hover:translate-x-2">
                        {project.title}
                      </span>
                    </span>
                    <p className="mt-2 max-w-[52ch] text-[13.5px] md:text-[14.5px] leading-relaxed text-[#113E6E]">
                      {project.description}
                    </p>

                    {/* Static thumbnail — visible below desktop */}
                    <div className="project-thumb-static lg:hidden relative mt-5 aspect-[16/10] w-full max-w-[420px] overflow-hidden border border-[#E4E4DF] bg-[#FAFAF8]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                      />
                    </div>

                    {/* Mobile meta row */}
                    <div className="lg:hidden mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-[#6E6E6B]">
                      <span>{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[#6E6E6B]" />
                      <span>{project.year}</span>
                    </div>

                    <span className="lg:hidden mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em]">
                      View project
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>

                  {/* Category — desktop only */}
                  <span className="hidden lg:block text-[12px] uppercase tracking-[0.14em] text-[#6E6E6B]">
                    {project.category}
                  </span>

                  {/* Year — desktop only */}
                  <span className="hidden lg:block text-[13px] text-[#6E6E6B] tabular-nums">
                    {project.year}
                  </span>

                  {/* View project — desktop only, magnetic */}
                  <div className="hidden lg:flex justify-end">
                    <MagneticLink className="items-center gap-2 text-[12px] uppercase tracking-[0.2em]">
                      <span className="relative">
                        View Project
                        <span className="absolute left-0 -bottom-1 h-px w-full bg-[#0A0A0A] origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-400 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                      >
                        ↗
                      </span>
                    </MagneticLink>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
