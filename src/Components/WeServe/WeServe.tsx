"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Fraunces, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Stethoscope,
  GraduationCap,
  Building2,
  ShoppingBag,
  Plane,
  Car,
  Factory,
  Truck,
  UtensilsCrossed,
  Cpu,
  Scale,
  Users,
  Clapperboard,
  Dumbbell,
  Sparkles,
  Wheat,
  Zap,
  HeartHandshake,
  Briefcase,
  Landmark,
  ShieldCheck,
  Wrench,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

type Industry = {
  name: string;
  icon: LucideIcon;
  items: string[];
  image: string;
};

const INDUSTRIES: Industry[] = [
  {
    name: "Healthcare & Medical",
    icon: Stethoscope,
    image: "/Industries/Healthcare & Medical.webp",
    items: [
      "Hospitals",
      "Clinics",
      "Diagnostic Centers",
      "Dental Clinics",
      "Telemedicine Platforms",
    ],
  },
  {
    name: "Education",
    icon: GraduationCap,
    image: "/Industries/Education.webp",
    items: [
      "Schools",
      "Colleges",
      "Universities",
      "Coaching Institutes",
      "EdTech Companies",
      "Online Learning Platforms",
      "Training Centers",
      "Pharmacies",
      "Healthcare Startups",
      "Medical Equipment Companies",
    ],
  },
  {
    name: "Real Estate & Construction",
    icon: Building2,
    image: "/Industries/Real Estate and  Construction.webp",
    items: [
      "Real Estate Agencies",
      "Property Developers",
      "Builders",
      "Construction Companies",
      "Interior Design Firms",
      "Architecture Firms",
    ],
  },
  {
    name: "E-Commerce & Retail",
    icon: ShoppingBag,
    image: "/Industries/E-Commerce and Retail.webp",
    items: [
      "Online Stores",
      "Retail Chains",
      "Supermarkets",
      "Fashion Brands",
      "Electronics Stores",
      "D2C Brands",
      "Marketplaces",
    ],
  },
  {
    name: "Travel & Hospitality",
    icon: Plane,
    image: "/Industries/Travel and Hospitality.webp",
    items: [
      "Hotels",
      "Resorts",
      "Travel Agencies",
      "Tour Operators",
      "Homestays",
      "Airlines",
      "Car Rental Companies",
    ],
  },
  {
    name: "Automotive",
    icon: Car,
    image: "/Industries/Automotive.webp",
    items: [
      "Car Dealerships",
      "Bike Dealerships",
      "Auto Parts Manufacturers",
      "EV Companies",
      "Vehicle Rental Businesses",
    ],
  },
  {
    name: "Manufacturing",
    icon: Factory,
    image: "/Industries/Manufacturing.webp",
    items: [
      "Industrial Manufacturers",
      "Machinery Manufacturers",
      "Textile Manufacturers",
      "Chemical Manufacturers",
      "FMCG Manufacturers",
    ],
  },
  {
    name: "Logistics & Transportation",
    icon: Truck,
    image: "/Industries/Logistics and Transportation.webp",
    items: [
      "Courier Services",
      "Logistics Companies",
      "Fleet Management Companies",
      "Warehousing Businesses",
      "Shipping Companies",
    ],
  },
  {
    name: "Food & Beverage",
    icon: UtensilsCrossed,
    image: "/Industries/Food and Beverage.webp",
    items: [
      "Restaurants",
      "Cafes",
      "Bakeries",
      "Cloud Kitchens",
      "Food Delivery Businesses",
      "Food Manufacturers",
    ],
  },
  {
    name: "Information Technology",
    icon: Cpu,
    image: "/Industries/Information Technology.webp",
    items: [
      "Software Companies",
      "SaaS Startups",
      "IT Service Providers",
      "Technology Consultants",
    ],
  },
  {
    name: "Legal Services",
    icon: Scale,
    image: "/Industries/Legal Services.webp",
    items: ["Law Firms", "Legal Consultants", "Corporate Legal Advisors"],
  },
  {
    name: "Human Resources",
    icon: Users,
    image: "/Industries/Human Resources.webp",
    items: ["Recruitment Agencies", "Staffing Companies", "HR Consultancies"],
  },
  {
    name: "Media & Entertainment",
    icon: Clapperboard,
    image: "/Industries/Media and  Entertainment.webp",
    items: [
      "Production Houses",
      "News Portals",
      "OTT Platforms",
      "Event Management Companies",
      "Influencers & Creators",
    ],
  },
  {
    name: "Sports & Fitness",
    icon: Dumbbell,
    image: "/Industries/Sports and Fitness.webp",
    items: [
      "Gyms",
      "Fitness Centers",
      "Sports Academies",
      "Yoga Centers",
      "Wellness Studios",
    ],
  },
  {
    name: "Beauty & Wellness",
    icon: Sparkles,
    image: "/Industries/Beauty Wellness.webp",
    items: ["Salons", "Spas", "Cosmetic Clinics", "Wellness Centers"],
  },
  {
    name: "Agriculture",
    icon: Wheat,
    image: "/Industries/Agriculture.webp",
    items: [
      "AgriTech Companies",
      "Farms",
      "Dairy Businesses",
      "Food Processing Units",
    ],
  },
  {
    name: "Energy & Utilities",
    icon: Zap,
    image: "/Industries/Energy and Utilities.webp",
    items: [
      "Solar Companies",
      "Renewable Energy Companies",
      "Power Distribution Companies",
      "Utility Providers",
    ],
  },
  {
    name: "NGOs & Nonprofits",
    icon: HeartHandshake,
    image: "/Industries/NGOs and Nonprofits.webp",
    items: [
      "Charitable Organizations",
      "Foundations",
      "Nonprofit Institutions",
    ],
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    image: "/Industries/Professional Services.webp",
    items: [
      "Chartered Accountants",
      "Business Consultants",
      "Marketing Agencies",
      "Event Agencies",
    ],
  },
  {
    name: "Religious & Community Organizations",
    icon: Landmark,
    image: "/Industries/Religious and Community Organizations.webp",
    items: [
      "Temples",
      "Churches",
      "Mosques",
      "Trusts",
      "Community Organizations",
    ],
  },
  {
    name: "Security & Surveillance",
    icon: ShieldCheck,
    image: "/Industries/Security and Surveillance.webp",
    items: ["Security Agencies", "CCTV Providers", "Access Control Companies"],
  },
  {
    name: "Home Services",
    icon: Wrench,
    image: "/Industries/Home Services.webp",
    items: [
      "Plumbing Services",
      "Electrical Services",
      "Cleaning Services",
      "Pest Control Companies",
    ],
  },
];

const N = INDUSTRIES.length;
const TOTAL_SUBSECTORS = INDUSTRIES.reduce((sum, i) => sum + i.items.length, 0);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const ctaBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const modalImageRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const reducedRef = useRef(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------------------------------------------------------------- */
  /*  Entrance animation, scroll-triggered 3D card reveal, tilt, CTA   */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const bits = headingRef.current.querySelectorAll("[data-reveal]");
        if (reducedRef.current) {
          gsap.set(bits, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            bits,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.12,
            },
          );
        }
      }

      /* ---- scroll-triggered 3D reveal, one card at a time ---- */
      if (gridRef.current) {
        const tiles =
          gridRef.current.querySelectorAll<HTMLElement>("[data-tile]");
        if (reducedRef.current) {
          gsap.set(tiles, { opacity: 1, y: 0, scale: 1, rotateX: 0 });
        } else {
          gsap.set(tiles, {
            opacity: 0,
            y: 70,
            scale: 0.9,
            rotateX: -22,
            transformPerspective: 900,
            transformOrigin: "center bottom",
          });

          ScrollTrigger.batch(tiles, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.1,
                overwrite: true,
              }),
          });
        }
      }

      if (gridRef.current && !reducedRef.current) {
        const cardTiles =
          gridRef.current.querySelectorAll<HTMLElement>("button[data-tile]");
        const cleanups: Array<() => void> = [];

        cardTiles.forEach((tile) => {
          const rotateYTo = gsap.quickTo(tile, "rotateY", {
            duration: 0.5,
            ease: "power3.out",
          });
          const rotateXTo = gsap.quickTo(tile, "rotateX", {
            duration: 0.5,
            ease: "power3.out",
          });
          const liftTo = gsap.quickTo(tile, "y", {
            duration: 0.45,
            ease: "power3.out",
          });

          const onEnter = () => liftTo(-10);
          const onMove = (e: MouseEvent) => {
            const rect = tile.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            rotateYTo(px * 14);
            rotateXTo(-py * 14);
          };
          const onLeave = () => {
            liftTo(0);
            rotateXTo(0);
            rotateYTo(0);
          };

          tile.addEventListener("mouseenter", onEnter);
          tile.addEventListener("mousemove", onMove);
          tile.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            tile.removeEventListener("mouseenter", onEnter);
            tile.removeEventListener("mousemove", onMove);
            tile.removeEventListener("mouseleave", onLeave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      }
    }, sectionRef);

    const ctx2 = gsap.context(() => {
      if (ctaBtnRef.current && ctaWrapRef.current && !reducedRef.current) {
        const btn = ctaBtnRef.current;
        const wrap = ctaWrapRef.current;
        const xTo = gsap.quickTo(btn, "x", {
          duration: 0.5,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(btn, "y", {
          duration: 0.5,
          ease: "power3.out",
        });

        const handleMove = (e: MouseEvent) => {
          const rect = wrap.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          xTo(px * 24);
          yTo(py * 16);
        };
        const handleLeave = () => {
          xTo(0);
          yTo(0);
        };

        wrap.addEventListener("mousemove", handleMove);
        wrap.addEventListener("mouseleave", handleLeave);
        return () => {
          wrap.removeEventListener("mousemove", handleMove);
          wrap.removeEventListener("mouseleave", handleLeave);
        };
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ctx2.revert();
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Modal open / close / navigate                                    */
  /* ---------------------------------------------------------------- */
  const openModal = useCallback((i: number) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveIndex(i);
    setPhase("open");
  }, []);

  const closeModal = useCallback(() => {
    setPhase("closing");
    closeTimeout.current = setTimeout(() => {
      setPhase("closed");
      setActiveIndex(null);
    }, 320);
  }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      const next = (prev + dir + N) % N;
      return next;
    });
  }, []);

  // content fade whenever the active industry changes while the modal is open
  useEffect(() => {
    if (phase !== "open" || activeIndex === null || reducedRef.current) return;
    if (modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
    if (modalImageRef.current) {
      gsap.fromTo(
        modalImageRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      );
    }
  }, [activeIndex, phase]);

  // lock body scroll + keyboard controls while modal is open
  useEffect(() => {
    if (phase === "closed") return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [phase, closeModal, navigate]);

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const active = activeIndex !== null ? INDUSTRIES[activeIndex] : null;

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} relative w-full overflow-hidden bg-white py-24 sm:py-32 lg:py-40`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ambient decor — luxury layered glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* large soft gold glow, top-left */}
        <div
          className="absolute -left-56 -top-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(177,138,85,0.28), rgba(241,227,196,0.12) 45%, transparent 70%)",
          }}
        />

        {/* secondary glow, bottom-right */}
        <div
          className="absolute -right-64 bottom-0 h-[40rem] w-[40rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgba(9,27,45,0.18), rgba(176,138,85,0.10) 50%, transparent 75%)",
          }}
        />

        {/* fine ring accents — top-left */}
        <div className="absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full border border-[#091b2d]/20" />
        <div className="absolute -left-40 top-10 h-[26rem] w-[26rem] translate-x-6 translate-y-6 rounded-full border border-[#B08A55]/25" />

        {/* fine ring accents — bottom-right */}
        <div className="absolute -right-48 bottom-0 h-[36rem] w-[36rem] rounded-full border border-[#091b2d]/10" />
        <div className="absolute -right-48 bottom-0 h-[31rem] w-[31rem] translate-x-4 -translate-y-4 rounded-full border border-[#B08A55]/15" />

        {/* subtle conic sheen orb, upper-right */}
        <div
          className="absolute right-[8%] top-[12%] h-40 w-40 rounded-full opacity-[0.12] blur-2xl"
          style={{
            background:
              "conic-gradient(from 180deg, #F1E3C4, #B08A55, #8C6A3A, #D9C29B, #F1E3C4)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ---------------------------------------------------- */}
        {/*  Heading — left-aligned                                */}
        {/* ---------------------------------------------------- */}
        <div ref={headingRef} className="max-w-3xl text-left">
          {/* <p
            data-reveal
            className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-[#091b2d]"
          >
            <span className="h-px w-8 bg-[#091b2d]" />
            Where We Work
          </p> */}
          <h2
            data-reveal
            className="text-2xl md:text-3xl lg:text-5xl font-medium text-black"
          >
            Industries We <span className="italic text-[#091b2d]">Serve</span>
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-2xl text-base leading-relaxed text-black sm:text-lg text-justify [text-align-last:left]"
          >
            From healthcare providers and educational institutions to real
            estate companies, e-commerce brands, manufacturers, and technology
            startups, we partner with organizations across multiple sectors to
            build stronger digital experiences. By combining innovative
            technology, strategic marketing, and industry-focused solutions, we
            help businesses improve visibility, engage customers, and achieve
            sustainable growth in an increasingly digital world.
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/*  Bento directory                                       */}
        {/* ---------------------------------------------------- */}
        <div
          ref={gridRef}
          className="mt-16 grid auto-rows-[210px] grid-cols-2 gap-3 sm:mt-20 sm:auto-rows-[230px] sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
          style={{ perspective: "1400px" }}
        >
          {/* signature stat tile */}
          <div
            data-tile
            className="relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-[28px] bg-[#14110F] p-7 text-white sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full"
              style={{
                background:
                  "conic-gradient(from 180deg, #F1E3C4, #B08A55, #8C6A3A, #D9C29B, #F1E3C4)",
                opacity: 0.18,
                filter: "blur(2px)",
              }}
            />
            <LayoutGrid
              size={22}
              strokeWidth={1.6}
              className="relative text-[#B08A55]"
            />
            <div className="relative">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-5xl sm:text-6xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {N}
                </span>
                <span className="text-sm tracking-[0.15em] text-[#B7AE9C]">
                  INDUSTRIES
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {TOTAL_SUBSECTORS}+
                </span>
                <span className="text-sm tracking-[0.15em] text-[#B7AE9C]">
                  SUB-SECTORS
                </span>
              </div>
              <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-[#B7AE9C]">
                Tap any sector to explore who we build for.
              </p>
            </div>
          </div>

          {INDUSTRIES.map((industry, i) => {
            return (
              <button
                key={industry.name}
                data-tile
                onClick={() => openModal(i)}
                className="group relative overflow-hidden rounded-[28px] bg-[#14110F] text-left shadow-[0_18px_40px_-24px_rgba(20,17,15,0.35)] transition-shadow duration-300 hover:shadow-[0_30px_60px_-22px_rgba(20,17,15,0.5)]"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* your photo — see the `image:` field on this industry above */}
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 34vw, 50vw"
                  priority={i < 4}
                  className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.07]"
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                />
                {/* lightened overlay — top of image stays clear, only the
                    bottom (behind the text) darkens for legibility */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14110F]/90 via-[#14110F]/20 to-transparent"
                />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.22em] text-[#D9C29B]/85">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-white/80 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </div>

                  {/* icon badge removed so the photo reads clean —
                      title + count sit directly on the image */}
                  <div>
                    <h3
                      className="text-[15px] leading-snug text-white sm:text-base"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {industry.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#D9C29B]/80">
                      {industry.items.length} sub-sectors
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/*  CTA                                                   */}
        {/* ---------------------------------------------------- */}
        <div ref={ctaWrapRef} className="mt-20 flex justify-center lg:mt-28">
          <button
            ref={ctaBtnRef}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#14110F] px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-[#25201B]"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            />
            <span className="relative">Get Custom Pricing</span>
            <ArrowUpRight
              size={16}
              className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/*  Modal — fixed positioning only, nothing sticky           */}
      {/* ------------------------------------------------------ */}
      {phase !== "closed" && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} sub-sectors`}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8"
        >
          {/* backdrop */}
          <div
            onClick={closeModal}
            className={`absolute inset-0 bg-[#14110F] transition-opacity duration-300 ${
              phase === "open" ? "opacity-70" : "opacity-0"
            }`}
            style={{ backdropFilter: "blur(6px)" }}
          />

          {/* panel */}
          <div
            className={`relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_60px_120px_-30px_rgba(0,0,0,0.55)] transition-all duration-300 sm:flex-row ${
              phase === "open"
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-[0.97] opacity-0"
            }`}
            style={{ maxHeight: "min(640px, 88vh)" }}
          >
            {/* close */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#5B564E] shadow-sm transition-colors hover:text-[#14110F] sm:right-5 sm:top-5"
            >
              <X size={16} strokeWidth={1.75} />
            </button>

            {/* left — identity panel, background photo swaps per industry */}
            <div className="relative flex w-full flex-none flex-col justify-between overflow-hidden bg-[#14110F] p-8 text-white sm:w-[38%] sm:p-10">
              <div ref={modalImageRef} className="absolute inset-0">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  sizes="(min-width: 640px) 38vw, 100vw"
                  priority
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/75 to-[#14110F]/45"
                />
              </div>

              <div className="relative">
                <h3 className="text-2xl leading-tight sm:text-2xl">
                  {active.name}
                </h3>
                <p className="mt-2 text-sm text-white">
                  {active.items.length} sub-sectors we actively serve
                </p>
              </div>

              {/* prev / next */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => navigate(-1)}
                  aria-label="Previous industry"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#D9C29B] transition-colors hover:border-[#B08A55] hover:text-white"
                >
                  <ChevronLeft size={16} strokeWidth={1.75} />
                </button>
                <button
                  onClick={() => navigate(1)}
                  aria-label="Next industry"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#D9C29B] transition-colors hover:border-[#B08A55] hover:text-white"
                >
                  <ChevronRight size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* right — sub-sector list */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-10">
              <div ref={modalContentRef}>
                <span className="mb-5 block text-[11px] tracking-[0.22em] text-[#B7AE9C]">
                  WHO WE BUILD FOR
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {active.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#EAE4D8] bg-[#FBFAF7] px-4 py-2 text-sm text-[#5B564E] transition-colors duration-300 hover:border-[#D9C29B] hover:text-[#14110F]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <span className="mt-8 mb-4 block h-px w-16 bg-[#B08A55]/50" />
                <p className="text-sm leading-relaxed text-[#5B564E]">
                  Have a project in this space? We&rsquo;ll tailor a digital
                  strategy built around how {active.name.toLowerCase()} actually
                  operate — from visibility to conversion.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
