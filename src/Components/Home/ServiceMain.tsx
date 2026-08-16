"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Gem,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Zap,
  Target,
  Globe,
  Cpu,
  Palette,
  BarChart3,
  Building2,
  Briefcase,
  TrendingUp,
  X,
  Grid3x3,
  ZoomIn,
} from "lucide-react";
import "@/Components/Home/style/services-section.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const BRAND = {
  name: "Growwyld",
  tagline: "Digital Craft Studio",
  logo: "/Images/GT Transparent logo.png",
};

interface Category {
  title: string;
  image: string;
  /** Optional extra images for the "View all" gallery. Falls back to [image] if omitted. */
  gallery?: string[];
  services: string[];
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
  {
    title: "Web Development",
    image: "/services/web-development.webp",
    gallery: [
      "/services/web-development.webp",
      "/services/web-development-2.webp",
      "/services/web-development-3.webp",
    ],
    icon: <Globe className="h-4 w-4" />,
    services: [
      "Custom Website Development",
      "Business Website Development",
      "Corporate Website Development",
      "E-commerce Website Development",
      "Web Application Development",
      "Progressive Web Apps (PWA)",
      "Website Redesign & Revamp",
    ],
  },
  {
    title: "Mobile App Development",
    image: "/services/mobile-app-development.webp",
    gallery: [
      "/services/mobile-app-development.webp",
      "/services/mobile-app-development-2.webp",
    ],
    icon: <Cpu className="h-4 w-4" />,
    services: [
      "Android App Development",
      "iOS App Development",
      "Cross-Platform App Development",
      "Flutter App Development",
      "React Native App Development",
      "Mobile App Maintenance",
    ],
  },
  {
    title: "E-commerce Solutions",
    image: "/services/ecommerce-solutionweb.webp",
    gallery: [
      "/services/ecommerce-solutionweb.webp",
      "/services/ecommerce-solutionweb-2.webp",
    ],
    icon: <Briefcase className="h-4 w-4" />,
    services: [
      "Shopify Development",
      "WooCommerce Development",
      "Custom E-commerce Development",
      "Payment Gateway Integration",
      "Marketplace Development",
      "Website Maintenance & Support",
    ],
  },
  {
    title: "Cloud & DevOps",
    image: "/services/Cloud-DevOps.webp",
    icon: <Zap className="h-4 w-4" />,
    services: ["Docker & Kubernetes", "CI/CD Pipeline Setup"],
  },
  {
    title: "UI/UX Design",
    image: "/services/UIUX-Design.webp",
    gallery: [
      "/services/UIUX-Design.webp",
      "/services/UIUX-Design-2.webp",
      "/services/UIUX-Design-3.webp",
    ],
    icon: <Palette className="h-4 w-4" />,
    services: [
      "UI/UX Design",
      "Website Wireframing",
      "Mobile App Design",
      "Dashboard Design",
      "Prototyping",
      "User Experience Optimization",
    ],
  },
  {
    title: "Digital Marketing",
    image: "/services/Digital-Marketing.webp",
    gallery: [
      "/services/Digital-Marketing.webp",
      "/services/Digital-Marketing-2.webp",
    ],
    icon: <TrendingUp className="h-4 w-4" />,
    services: [
      "Search Engine Optimization (SEO)",
      "Local SEO (GMB)",
      "Graphic Designing",
      "Video Editing",
      "Corporate Videography",
      "Google Ads Management",
      "Meta Ads Management",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
    ],
  },
  {
    title: "Data & Analytics",
    image: "/services/Data-Analytics.webp",
    icon: <BarChart3 className="h-4 w-4" />,
    services: [
      "Business Intelligence Solutions",
      "Data Visualization Dashboards",
      "Analytics Integration",
      "Reporting Solutions",
    ],
  },
  {
    title: "Enterprise Solutions",
    image: "/services/Enterprise-solutions.webp",
    icon: <Building2 className="h-4 w-4" />,
    services: [
      "ERP Development",
      "CRM Development",
      "HRMS Development",
      "Inventory Management Systems",
      "Custom Software Development",
      "SaaS Product Development",
    ],
  },
  {
    title: "Business Applications",
    image: "/services/Business-Applications.webp",
    icon: <Target className="h-4 w-4" />,
    services: [
      "HRMS Development",
      "Payroll Management Systems",
      "Inventory Management Systems",
      "Accounting Software",
      "School Management Systems",
      "Hospital Management Systems",
      "Learning Management Systems (LMS)",
      "Real Estate Management Software",
    ],
  },
];

/* -------------------------------------------------------------------- */
/*  Shared easing vocabulary — one hand, everywhere.                     */
/*  EASE     -> decisive, long settle for big reveals (was cubic-bezier  */
/*              0.16,1,0.3,1 under Framer; expo.out reads the same way)  */
/*  EASE_SOFT-> gentler settle for small/secondary reveals               */
/*  EASE_SPRING -> soft spring-like overshoot for modal/lightbox pop-ins */
/* -------------------------------------------------------------------- */

const EASE = "expo.out";
const EASE_SOFT = "power2.out";
const EASE_SPRING = "back.out(1.5)";

/* -------------------------------------------------------------------- */
/*  Lenis <-> GSAP wiring                                                */
/*  Lenis drives the raf loop through gsap.ticker so scroll, ScrollTrig- */
/*  ger, and every animation below share one clock — no drift, no        */
/*  double rAF loops fighting each other.                                */
/* -------------------------------------------------------------------- */

function useLenisGsap() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Single source of truth for the frame loop: Lenis updates scroll,
    // then ScrollTrigger is told about it, every tick — no second rAF
    // loop competing with GSAP's, which is what was fighting for frames
    // and reading as "laggy" scrolling.
    const tick = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fixes the "wrong on refresh" issue: on first paint, web fonts /
    // late image decode can still shift layout after ScrollTrigger has
    // already measured trigger positions. Re-measure once things settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 300);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);
}

/* -------------------------------------------------------------------- */
/*  Generic scroll-reveal hook — fromTo + ScrollTrigger, fires once.     */
/* -------------------------------------------------------------------- */

function useReveal<T extends HTMLElement>(opts?: {
  y?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: opts?.y ?? 28, scale: opts?.scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: opts?.duration ?? 0.7,
          delay: opts?.delay ?? 0,
          ease: opts?.ease ?? EASE,
          scrollTrigger: {
            trigger: el,
            start: opts?.start ?? "top 88%",
            once: true,
          },
        },
      );
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/* -------------------------------------------------------------------- */
/*  Moving brand logo                                                    */
/* -------------------------------------------------------------------- */

function BrandMark({ size = 56 }: { size?: number }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // pointer tilt (unchanged — plain DOM + CSS custom properties)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    function handleMove(e: MouseEvent) {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = el!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -18;
        const ry = (px - 0.5) * 18;
        el!.style.setProperty("--tiltX", `${rx}deg`);
        el!.style.setProperty("--tiltY", `${ry}deg`);
      });
    }
    function handleLeave() {
      el!.style.setProperty("--tiltX", "0deg");
      el!.style.setProperty("--tiltY", "0deg");
    }
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // entrance reveal
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.7, rotate: -8 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.7,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      className="brand-logo-scene relative shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="brand-logo-glow" aria-hidden="true" />
      <div className="brand-logo-float relative h-full w-full">
        <Image
          src={BRAND.logo}
          alt={`${BRAND.name} logo`}
          fill
          sizes="66px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Tilt hook — GSAP quickTo drives real CSS transforms on the card and  */
/*  its image layer. quickTo is GSAP's purpose-built replacement for a   */
/*  Framer spring: it interpolates repeated calls smoothly with its own  */
/*  internal easing, so rapid mousemove updates never feel like jumps.   */
/* -------------------------------------------------------------------- */

function useCardTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imgEl = imgWrapRef.current;
    if (!card || !imgEl) return;

    const quickRotX = gsap.quickTo(card, "rotateX", {
      duration: 0.6,
      ease: "power3.out",
    });
    const quickRotY = gsap.quickTo(card, "rotateY", {
      duration: 0.6,
      ease: "power3.out",
    });
    const quickImgX = gsap.quickTo(imgEl, "x", {
      duration: 0.6,
      ease: "power3.out",
    });
    const quickImgY = gsap.quickTo(imgEl, "y", {
      duration: 0.6,
      ease: "power3.out",
    });
    const quickImgScale = gsap.quickTo(imgEl, "scale", {
      duration: 0.6,
      ease: "power3.out",
    });

    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    let leaveTimer: ReturnType<typeof setTimeout> | null = null;

    function handleMove(e: MouseEvent) {
      // Only pay the compositing cost while actually interacting —
      // this is the single biggest win against scroll jank: nine
      // permanently-composited layers (will-change: transform) is
      // what was making the page feel heavy while scrolling past them.
      card!.style.willChange = "transform";
      if (leaveTimer) {
        clearTimeout(leaveTimer);
        leaveTimer = null;
      }

      const rect = card!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      quickRotX(7 - py * 14); // 0..1 -> 7..-7
      quickRotY(px * 14 - 7); // 0..1 -> -7..7
      quickImgX((px - 0.5) * 24);
      quickImgY((py - 0.5) * 24);
      quickImgScale(
        1 + Math.max(Math.abs(px - 0.5), Math.abs(py - 0.5)) * 0.16,
      );

      card!.style.setProperty("--mx", `${px * 100}%`);
      card!.style.setProperty("--my", `${py * 100}%`);
      card!.style.setProperty("--angle", `${px * 360}deg`);
    }
    function handleLeave() {
      quickRotX(0);
      quickRotY(0);
      quickImgX(0);
      quickImgY(0);
      quickImgScale(1);
      leaveTimer = setTimeout(() => {
        card!.style.willChange = "auto";
      }, 650);
    }
    card.addEventListener("mousemove", handleMove, { passive: true });
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, []);

  return { cardRef, imgWrapRef };
}

/* -------------------------------------------------------------------- */
/*  Premium 3D Card                                                      */
/* -------------------------------------------------------------------- */

function CategoryCard({
  cat,
  index,
  registerRef,
  isMobileActive,
  onOpen,
}: {
  cat: Category;
  index: number;
  registerRef: (el: HTMLDivElement | null, i: number) => void;
  isMobileActive: boolean;
  onOpen: (i: number) => void;
}) {
  const { cardRef, imgWrapRef } = useCardTilt();
  const gallery = cat.gallery && cat.gallery.length ? cat.gallery : [cat.image];
  const galleryCount = gallery.length;
  const previewServices = cat.services.slice(0, 2);
  const remaining = cat.services.length - previewServices.length;
  // Entrance (alternating left/right 3D swing-in) is orchestrated by the
  // parent via a single ScrollTrigger.batch — see ServicesSection. Doing it
  // per-card here meant 9 separate ScrollTriggers, and any card hidden by
  // the mobile "one active tab at a time" layout had 0 size when its
  // trigger fired, so it silently never got animated in. Batching from the
  // parent (and skipping the whole thing under lg breakpoint) fixes both.

  return (
    <div
      ref={(el) => {
        cardRef.current = el;
        registerRef(el, index);
      }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(index);
        }
      }}
      className={`premium-card-teal group relative flex cursor-pointer flex-col overflow-hidden rounded-[36px] outline-none
          transition-[transform,box-shadow] duration-500 ease-out
          hover:-translate-y-2.5 hover:shadow-[0_45px_100px_-24px_rgba(17,62,110,0.4),0_0_0_2px_#22C55E,0_0_0_4px_#113E6E,inset_0_1px_0_rgba(255,255,255,0.7)]
          ${isMobileActive ? "block" : "hidden"} lg:block`}
      style={{
        perspective: 1400,
        transformStyle: "preserve-3d",
        willChange: "auto",
        background:
          "linear-gradient(145deg, #EAF8FC 0%, #D6F1F8 50%, #EAF8FC 100%)",
        boxShadow:
          "0 25px 70px -20px rgba(56,189,248,0.28), 0 0 0 2px #22C55E, 0 0 0 4px #113E6E, inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {/* Animated conic foil border */}
      <div
        className="absolute inset-0 rounded-[36px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from var(--angle,0deg), #22C55E, #113E6E, #22C55E, #67e8f9, #22C55E)",
          padding: "2.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Inner gradient background */}
      <div className="absolute inset-[2.5px] rounded-[33.5px] bg-gradient-to-b from-[#EAF8FC] via-[#D6F1F8] to-[#EAF8FC] pointer-events-none" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-[2.5px] rounded-[33.5px] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #113E6E 0.5px, transparent 0.5px), radial-gradient(circle at 80% 70%, #22C55E 0.5px, transparent 0.5px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Ambient floating particles */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-[36px] opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        {[...Array(6)].map((_, p) => (
          <span
            key={p}
            className="card-particle"
            style={{
              left: `${12 + p * 15}%`,
              animationDelay: `${p * 0.35}s`,
              animationDuration: `${3.5 + (p % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* ---------- Hero image with parallax + overlaid title ---------- */}
      <div
        className="relative h-60 w-full overflow-hidden sm:h-68 group/image"
        style={{ transform: "translateZ(40px)" }}
      >
        <div
          ref={imgWrapRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 55vw"
            className="object-cover transition-[filter] duration-[1200ms] ease-out group-hover/image:brightness-[0.7]"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#113E6E] via-[#113E6E]/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-[opacity,transform] duration-[1400ms] ease-out group-hover:translate-x-full group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#22C55E]/20 to-transparent" />

        <div className="absolute inset-3 rounded-2xl border border-white/20 pointer-events-none" />
        <div className="absolute inset-5 rounded-xl border border-[#22C55E]/25 pointer-events-none" />

        <div className="absolute top-7 left-7 right-7 flex items-center justify-between">
          <span className="relative flex h-11 items-center gap-2 rounded-xl bg-gradient-to-br from-[#113E6E] via-[#1a4a7a] to-[#22C55E] px-3.5 shadow-xl shadow-[#113E6E]/30">
            <span className="font-serif text-[15px] italic leading-none text-white/90">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-4 w-px bg-white/30" />
            <Gem className="h-3.5 w-3.5 text-white" />
          </span>

          {galleryCount > 1 && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md">
              <Grid3x3 className="h-3 w-3" />
              {galleryCount} photos
            </span>
          )}
        </div>

        <div className="absolute bottom-7 left-7 right-7">
          <h3 className="text-2xl leading-tight text-white drop-shadow-2xl sm:text-2xl tracking-tight">
            {cat.title}
          </h3>
        </div>
      </div>

      {/* pointer-following glare, positioned by the same quickTo CSS vars */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[36px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"
        style={{
          background:
            "radial-gradient(900px circle at var(--mx,50%) var(--my,50%), rgba(17,62,110,0.1), transparent 45%)",
        }}
      />

      {/* ---------- Body ---------- */}
      <div
        className="relative flex flex-1 flex-col px-8 pb-8 pt-7 z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="relative flex items-center gap-4 mb-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#113E6E]/25 to-transparent" />
          <Diamond className="h-3 w-3 text-[#113E6E]/45" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#113E6E]/25 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#113E6E]/45">
            What&rsquo;s inside
          </span>

          <p className="text-[13.5px] leading-relaxed text-[#113E6E]/70">
            {previewServices.join(" · ")}
            {remaining > 0 && (
              <span className="text-[#0f8f4a]"> · +{remaining} more</span>
            )}
          </p>

          <div className="group/view relative flex items-center justify-between gap-3 rounded-2xl border border-[#113E6E]/15 bg-white/70 px-5 py-4 transition-all duration-500 group-hover:border-[#22C55E]/70 group-hover:bg-white group-hover:shadow-[0_16px_40px_-20px_rgba(17,62,110,0.35)]">
            <span className="flex items-center gap-3">
              <span className="flex -space-x-3">
                {gallery.slice(0, 3).map((src, i) => (
                  <span
                    key={src}
                    className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm"
                    style={{ zIndex: 3 - i }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#113E6E] transition-colors duration-300 group-hover:text-[#0f8f4a]">
                View all services
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#113E6E] text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#22C55E]">
              <ChevronDown className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-90" />
            </span>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#113E6E]/15 pt-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#113E6E]/10 border border-[#113E6E]/20">
              <Image
                src="/GT Transparent logo.png"
                alt="Description"
                width={10}
                height={10}
                className="rounded-full"
              />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-[#113E6E]/70">
                {BRAND.name}
              </span>
              <span className="text-[8px] tracking-[0.15em] text-[#113E6E]/50 uppercase">
                Excellence Guaranteed
              </span>
            </div>
          </div>
          <Link
            href="/contact"
            onClick={(e) => e.stopPropagation()}
            className="group/cta relative inline-flex items-center gap-2.5 text-[13px] font-medium text-[#113E6E] transition-all duration-300 hover:text-[#22C55E]"
          >
            <span className="relative">
              Explore Service
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#22C55E] transition-all duration-300 group-hover/cta:w-full" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#113E6E] to-[#22C55E] shadow-lg shadow-[#113E6E]/25 transition-all duration-300 group-hover/cta:rotate-45 group-hover/cta:shadow-xl group-hover/cta:shadow-[#22C55E]/40">
              <ArrowUpRight className="h-3.5 w-3.5 text-white" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  GalleryMosaic — bento grid that opens into a swipeable lightbox.     */
/*  No AnimatePresence: open/close/crossfade are hand-rolled with GSAP   */
/*  timelines so unmounting still gets to play an exit animation.        */
/* -------------------------------------------------------------------- */

function GalleryMosaic({ images, title }: { images: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxMounted, setLightboxMounted] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef(0);

  // reveal the bento tiles whenever the image set changes (i.e. modal opens)
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const tiles = el.querySelectorAll<HTMLElement>("[data-tile]");
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 12, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: EASE, stagger: 0.05 },
    );
  }, [images]);

  const openLightbox = (i: number) => setLightboxIndex(i);

  const go = useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((prev) => {
        if (prev === null) return prev;
        return (prev + dir + images.length) % images.length;
      });
    },
    [images.length],
  );

  const closeLightbox = useCallback(() => {
    const backdrop = backdropRef.current;
    if (!backdrop) {
      setLightboxIndex(null);
      setLightboxMounted(false);
      return;
    }
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.22,
      ease: EASE_SOFT,
      onComplete: () => {
        setLightboxIndex(null);
        setLightboxMounted(false);
      },
    });
  }, []);

  // mount + entrance animation
  useEffect(() => {
    if (lightboxIndex === null) return;
    setLightboxMounted(true);
  }, [lightboxIndex]);

  useEffect(() => {
    if (!lightboxMounted) return;
    const backdrop = backdropRef.current;
    if (!backdrop) return;
    gsap.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: EASE_SOFT },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxMounted]);

  // crossfade whenever the active image changes
  useEffect(() => {
    if (!lightboxMounted) return;
    const stage = stageRef.current;
    if (!stage) return;
    gsap.fromTo(
      stage,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1, duration: 0.35, ease: EASE },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, go, closeLightbox]);

  const handlePointerDown = (e: React.PointerEvent) => {
    swipeStartX.current = e.clientX;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = e.clientX - swipeStartX.current;
    const threshold = 60;
    if (dx < -threshold) go(1);
    else if (dx > threshold) go(-1);
  };

  const bentoClass = (i: number) => {
    const pattern = i % 5;
    if (pattern === 0) return "col-span-2 row-span-2";
    if (pattern === 2) return "col-span-2 row-span-1";
    return "col-span-1 row-span-1";
  };

  return (
    <>
      {/* ---- Responsive bento grid ---- */}
      <div
        ref={gridRef}
        className="grid auto-rows-[76px] grid-cols-3 gap-2 sm:auto-rows-[92px] sm:gap-2.5 md:auto-rows-[100px]"
        role="list"
        aria-label={`${title} image gallery`}
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            data-tile
            role="listitem"
            onClick={() => openLightbox(i)}
            style={{ opacity: 0 }}
            className={`group/tile relative overflow-hidden rounded-xl bg-[#0d2f52] transition-transform duration-200 ease-out hover:scale-[0.97] active:scale-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] ${
              images.length > 2 ? bentoClass(i) : "col-span-1 row-span-1"
            }`}
          >
            <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover/tile:scale-[1.12] group-hover/tile:rotate-1">
              <Image
                src={src}
                alt={`${title} image ${i + 1}`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 220px"
                className="object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#113E6E]/0 transition-colors duration-300 group-hover/tile:bg-[#113E6E]/45">
              <span className="flex h-8 w-8 scale-50 items-center justify-center rounded-full bg-white/90 text-[#113E6E] opacity-0 shadow-lg transition-all duration-300 group-hover/tile:scale-100 group-hover/tile:opacity-100">
                <ZoomIn size={14} strokeWidth={2} />
              </span>
            </div>

            <span className="pointer-events-none absolute left-2 top-2 h-2 w-2 rounded-full bg-[#22C55E] opacity-0 shadow-[0_0_10px_2px_rgba(34,197,94,0.8)] transition-opacity duration-300 group-hover/tile:opacity-100" />
          </button>
        ))}
      </div>

      {/* ---- Fullscreen lightbox ---- */}
      {lightboxMounted && lightboxIndex !== null && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-[#0B2643]/97 p-4 backdrop-blur-xl sm:p-8"
          style={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <div
            className="mb-4 flex w-full max-w-3xl items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">
              {title} — {lightboxIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              aria-label="Close image viewer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#22C55E]"
            >
              <X size={14} strokeWidth={1.75} />
            </button>
          </div>

          <div
            className="relative flex w-full max-w-3xl flex-1 items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-[#22C55E] sm:-left-4"
              >
                <ChevronLeft size={18} strokeWidth={1.75} />
              </button>
            )}

            <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl">
              <div
                ref={stageRef}
                className="absolute inset-0 cursor-grab select-none active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
              >
                <Image
                  key={lightboxIndex}
                  src={images[lightboxIndex]}
                  alt={`${title} full view ${lightboxIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 760px"
                  className="pointer-events-none select-none object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>

            {images.length > 1 && (
              <button
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-[#22C55E] sm:-right-4"
              >
                <ChevronRight size={18} strokeWidth={1.75} />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="mt-4 flex w-full max-w-3xl items-center justify-center gap-2 overflow-x-auto pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                    i === lightboxIndex
                      ? "ring-2 ring-[#22C55E] opacity-100"
                      : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------- */
/*  Main section                                                         */
/* -------------------------------------------------------------------- */

export default function ServicesSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalMounted, setModalMounted] = useState(false);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((i: number) => setModalIndex(i), []);

  const closeModal = useCallback(() => {
    const backdrop = modalBackdropRef.current;
    const card = modalCardRef.current;
    if (!backdrop || !card) {
      setModalIndex(null);
      setModalMounted(false);
      return;
    }
    gsap.to(card, {
      opacity: 0,
      y: 16,
      scale: 0.97,
      duration: 0.28,
      ease: EASE_SOFT,
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.3,
      ease: EASE_SOFT,
      onComplete: () => {
        setModalIndex(null);
        setModalMounted(false);
      },
    });
  }, []);

  const navigateModal = useCallback((dir: 1 | -1) => {
    setModalIndex((prev) => {
      if (prev === null) return prev;
      return (prev + dir + CATEGORIES.length) % CATEGORIES.length;
    });
  }, []);

  // mount on open
  useEffect(() => {
    if (modalIndex === null) return;
    setModalMounted(true);
  }, [modalIndex]);

  // entrance / re-entrance animation, replayed every time modalIndex changes
  useEffect(() => {
    if (!modalMounted) return;
    const backdrop = modalBackdropRef.current;
    const card = modalCardRef.current;
    if (!backdrop || !card) return;
    gsap.fromTo(
      backdrop,
      { opacity: 0 },
      { opacity: 1, duration: 0.24, ease: EASE_SOFT },
    );
    gsap.fromTo(
      card,
      { opacity: 0, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: EASE_SPRING },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalMounted, modalIndex]);

  useEffect(() => {
    if (modalIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigateModal(1);
      if (e.key === "ArrowLeft") navigateModal(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalIndex, closeModal, navigateModal]);

  const registerRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  useLenisGsap();

  /* ------------------------------------------------------------------ */
  /*  Card entrance: alternating left/right 3D swing-in.                 */
  /*  Desktop grid only — one ScrollTrigger.batch instead of one         */
  /*  ScrollTrigger per card (9 -> 1), and gsap.matchMedia re-runs        */
  /*  automatically on resize, so crossing the lg breakpoint never       */
  /*  leaves a card stuck at opacity 0.                                  */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({ isDesktop: "(min-width: 1024px)" }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!cards.length) return;

      if (!isDesktop) {
        // Mobile shows one card at a time via tabs — no scroll reveal,
        // just make sure every card is visible whenever it's toggled on.
        gsap.set(cards, {
          opacity: 1,
          x: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          clearProps: "willChange",
        });
        return;
      }

      gsap.set(cards, { opacity: 0 });

      const triggers = ScrollTrigger.batch(cards, {
        start: "top 87%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((el) => {
            const i = cards.indexOf(el as HTMLElement);
            const fromLeft = i % 2 === 0;
            const target = el as HTMLElement;
            target.style.willChange = "transform, opacity";
            gsap.fromTo(
              target,
              {
                opacity: 0,
                x: fromLeft ? -140 : 140,
                rotateY: fromLeft ? -58 : 58,
                rotateX: 6,
                scale: 0.9,
              },
              {
                opacity: 1,
                x: 0,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 1,
                ease: EASE,
                delay: (i % 3) * 0.07,
                force3D: true,
                onComplete: () => {
                  target.style.willChange = "auto";
                },
              },
            );
          });
        },
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    // Layout can settle a beat after mount (images/fonts) — make sure the
    // batch triggers are measured against final positions.
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      mm.revert();
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (idx: number) => {
    setActive(idx);
    requestAnimationFrame(() => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const target = cardRefs.current[idx];
      if (!target) return;
      target.scrollIntoView({
        behavior: "smooth",
        block: isDesktop ? "center" : "start",
      });
    });
  };

  const modalCategory = modalIndex !== null ? CATEGORIES[modalIndex] : null;
  const modalImages = useMemo(
    () =>
      modalCategory ? (modalCategory.gallery ?? [modalCategory.image]) : [],
    [modalCategory],
  );

  // service-chip stagger reveal, replayed each time the modal category changes
  useEffect(() => {
    if (!modalMounted) return;
    const chips = document.querySelectorAll<HTMLElement>("[data-service-chip]");
    gsap.fromTo(
      chips,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.25, ease: EASE, stagger: 0.03 },
    );
  }, [modalMounted, modalIndex]);

  const brandBarRef = useReveal<HTMLDivElement>({ y: -16, duration: 0.6 });
  const headingRef = useReveal<HTMLDivElement>({ y: 28, duration: 0.65 });
  const tabsRef = useReveal<HTMLDivElement>({
    y: 12,
    duration: 0.5,
    delay: 0.1,
  });

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-24 sm:py-28 md:py-36"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-[#22C55E]/[0.08] to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-gradient-to-tr from-[#113E6E]/[0.08] to-transparent rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #113E6E 1px, transparent 1px), radial-gradient(circle at 75% 75%, #22C55E 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#113E6E 1px, transparent 1px), linear-gradient(to right, #22C55E 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
        />
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#22C55E]/[0.06] rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#113E6E]/[0.07] rounded-full blur-2xl animate-float-delayed" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* ---------- brand bar ---------- */}
        <div
          ref={brandBarRef}
          style={{ opacity: 0 }}
          className="mb-16 flex items-center justify-between border-b border-[#113E6E]/15 pb-8 sm:mb-10"
        >
          <div className="flex items-center gap-4">
            <BrandMark />
            <div className="leading-tight">
              <div className="text-[1.4rem] tracking-tight text-[#113E6E] sm:text-2xl font-medium">
                {BRAND.name}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#113E6E]/60">
                {BRAND.tagline}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- heading row ---------- */}
        <div
          ref={headingRef}
          style={{ opacity: 0 }}
          className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <h2 className="mt-2 max-w-2xl text-3xl md:text-4xl lg:text-5xl font-medium text-black leading-tight">
              Solutions designed around your business goals
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-black">
              A full-stack technology partner for ambitious businesses — from
              first sketch to scaled product, we build, design and grow the
              systems your company runs on.
            </p>
          </div>

          <Link
            href="/contact"
            className="group relative inline-flex w-fit shrink-0 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#113E6E] via-[#1a4a7a] to-[#22C55E] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_18px_40px_-16px_rgba(17,62,110,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-16px_rgba(34,197,94,0.5)] border border-white/20"
          >
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
            <span className="relative">Get a Quote</span>
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/25 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5 text-white" />
            </span>
          </Link>
        </div>

        {/* ---------- category tabs ---------- */}
        <div
          ref={tabsRef}
          style={{ opacity: 0 }}
          className="mt-14 -mx-6 flex gap-x-3 gap-y-3 overflow-x-auto px-6 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => scrollToCard(i)}
              aria-pressed={active === i}
              className={`group relative shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-[13px] font-medium transition-all duration-400 ${
                active === i
                  ? "border-transparent bg-gradient-to-r from-[#113E6E] via-[#1a4a7a] to-[#22C55E] text-white shadow-[0_10px_30px_-12px_rgba(17,62,110,0.5)]"
                  : "border-[#113E6E]/15 bg-[#EAF8FC] text-[#113E6E]/80 hover:border-[#22C55E]/60 hover:text-[#113E6E] hover:bg-[#D6F1F8]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`${active === i ? "text-white" : "text-[#113E6E]/60 group-hover:text-[#113E6E]"}`}
                >
                  {cat.icon}
                </span>
                {cat.title}
              </span>
            </button>
          ))}
        </div>

        {/* ---------- premium card grid ---------- */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 xl:grid-cols-3"
          style={{ perspective: 1600 }}
        >
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              index={i}
              registerRef={registerRef}
              isMobileActive={active === i}
              onOpen={openModal}
            />
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/*  Modal — manually mounted/unmounted; GSAP plays the      */}
      {/*  entrance every time it mounts or the category changes,  */}
      {/*  and an exit tween before the DOM node is removed.       */}
      {/* ------------------------------------------------------ */}
      {modalMounted && modalCategory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${modalCategory.title} services`}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8"
        >
          <div
            ref={modalBackdropRef}
            onClick={closeModal}
            className="absolute inset-0 bg-[#0B2643]"
            style={{ backdropFilter: "blur(10px)", opacity: 0 }}
          />

          <div
            ref={modalCardRef}
            className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_60px_120px_-30px_rgba(17,62,110,0.5)]"
            style={{ maxHeight: "min(720px, 90vh)", opacity: 0 }}
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#113E6E] shadow-sm transition-colors hover:text-[#22C55E] sm:right-5 sm:top-5"
            >
              <X size={16} strokeWidth={1.75} />
            </button>

            <div className="flex flex-1 flex-col overflow-y-auto sm:flex-row sm:overflow-hidden">
              {/* left — mosaic gallery + identity panel */}
              <div className="relative flex w-full flex-none flex-col gap-5 bg-[#113E6E] p-6 sm:w-[46%] sm:overflow-y-auto sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.25em] text-[#22C55E]">
                    {String((modalIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                    {String(CATEGORIES.length).padStart(2, "0")}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-sm">
                    {modalCategory.icon}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl">
                    {modalCategory.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/70">
                    {modalCategory.services.length} services ·{" "}
                    {modalImages.length} image
                    {modalImages.length > 1 ? "s" : ""}
                  </p>
                </div>

                <GalleryMosaic
                  images={modalImages}
                  title={modalCategory.title}
                />

                <div className="mt-auto flex items-center gap-2 pt-2">
                  <button
                    onClick={() => navigateModal(-1)}
                    aria-label="Previous category"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#22C55E] hover:text-white"
                  >
                    <ChevronLeft size={16} strokeWidth={1.75} />
                  </button>
                  <button
                    onClick={() => navigateModal(1)}
                    aria-label="Next category"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#22C55E] hover:text-white"
                  >
                    <ChevronRight size={16} strokeWidth={1.75} />
                  </button>
                  <span className="ml-2 text-[11px] text-white/40">
                    Browse categories
                  </span>
                </div>
              </div>

              {/* right — service chips */}
              <div className="flex-1 overflow-y-auto bg-[#F3FBFD] p-6 sm:p-10">
                <span className="mb-5 block text-[11px] uppercase tracking-[0.22em] text-[#113E6E]/50">
                  What&rsquo;s Included
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {modalCategory.services.map((s) => (
                    <span
                      key={s}
                      data-service-chip
                      style={{ opacity: 0 }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#113E6E]/15 bg-white px-4 py-2 text-sm text-[#113E6E] shadow-sm transition-colors duration-300 hover:border-[#22C55E] hover:text-[#0f8f4a]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                      {s}
                    </span>
                  ))}
                </div>

                <span className="mt-8 mb-4 block h-px w-16 bg-[#22C55E]/40" />
                <p className="text-sm leading-relaxed text-[#113E6E]/70">
                  Have a project that needs {modalCategory.title.toLowerCase()}?
                  Let&rsquo;s talk about how we can bring it to life.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2.5 text-[13px] font-medium text-[#113E6E] transition-all duration-300 hover:text-[#22C55E]"
                >
                  Get in touch
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#113E6E] to-[#22C55E] shadow-lg shadow-[#113E6E]/25">
                    <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
