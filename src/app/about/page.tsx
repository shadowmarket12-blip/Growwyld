"use client";

/**
 * Growwyld Tech — About Us (Editorial / Luxury Monochrome)
 * -------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind CSS + GSAP + Lenis
 *
 * Install:
 *   npm install gsap lenis
 *
 * Usage:
 *   Drop at app/about/page.tsx (or import <AboutPage /> anywhere).
 *   Tailwind must already be configured — this file only uses
 *   arbitrary-value classes, no config changes required.
 *
 * Design concept — "The Growth Journal"
 *   A pure white / near-black editorial system, built like a print
 *   magazine laid out on the web. Every section leads with its own
 *   eyebrow label and heading, flush left, before any supporting
 *   content — there is no separate numbered rail competing for
 *   attention. A hairline rule draws in at each section break, and
 *   one recurring line-art mark — concentric growth rings, read from
 *   the name "Growwyld" — appears once as a large diagram. No color
 *   anywhere; hierarchy comes from type scale, spacing and the
 *   invert-on-hover interaction, not from an accent hue.
 *
 *   Palette:  #FFFFFF canvas · #0A0A0A ink · #6E6E6B muted ·
 *             #FAFAF8 panel · #E4E4DF hairline
 *   Type:     Poppins only — light weights for display, medium/
 *             semibold for emphasis, wide-tracked uppercase for
 *             labels. One family, disciplined weight scale.
 * -------------------------------------------------------------
 */

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { Poppins } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#story", label: "Story" },
  { href: "#approach", label: "Approach" },
  { href: "#values", label: "Values" },
  { href: "#faq", label: "FAQ" },
];

const FOUNDERS = [
  {
    index: "01",
    title: "Growth & Marketing",
    body: "Search engine optimization, content strategy and online growth — turning visibility into a pipeline of the right customers.",
  },
  {
    index: "02",
    title: "Technology & Product",
    body: "Websites, digital platforms and technology-driven solutions — building the foundation everything else stands on.",
  },
];

const DIFFERENTIATORS = [
  {
    index: "01",
    label: "Foundation",
    body: "A website is where your business lives online — built to load fast, read clearly and convert.",
  },
  {
    index: "02",
    label: "Visibility",
    body: "SEO and digital marketing bring the right audience to that foundation, consistently.",
  },
  {
    index: "03",
    label: "Compounding",
    body: "Built together, technology and marketing reinforce each other — that's where sustainable growth happens.",
  },
];

const VALUES = [
  {
    label: "Integrity",
    body: "Honest communication, transparent processes and realistic expectations.",
  },
  {
    label: "Innovation",
    body: "We continuously explore new technologies, tools and strategies to deliver better outcomes.",
  },
  {
    label: "Collaboration",
    body: "We work closely with our clients and treat every project as a partnership.",
  },
  {
    label: "Growth",
    body: "Help businesses grow, while continuously improving ourselves.",
  },
];

const INDUSTRIES = [
  "Startups",
  "Healthcare",
  "Education",
  "Real Estate",
  "Hospitality",
  "E-commerce",
  "Manufacturing",
  "Professional Services",
];

const FAQS = [
  {
    q: "Why was Growwyld Tech founded?",
    a: "Founded in 2025 to help businesses leverage technology and digital marketing for sustainable growth — practical, high-quality digital solutions that create measurable value without unnecessary complexity.",
  },
  {
    q: "What makes Growwyld Tech different from other IT companies?",
    a: "We combine expertise in both technology and digital marketing, so businesses build a strong digital foundation while also improving visibility and customer reach — with a focus on transparency and measurable results.",
  },
  {
    q: "Do you work with businesses outside Odisha?",
    a: "Yes. We're based in Bhubaneswar, and we work with businesses across Odisha and India through remote collaboration and digital project management.",
  },
  {
    q: "Which industries do you serve?",
    a: "Startups, healthcare organizations, educational institutions, real estate companies, hospitality businesses, e-commerce brands, manufacturers, professional service providers and growing enterprises.",
  },
  {
    q: "How do you approach new projects?",
    a: "Every project begins with understanding your goals, challenges and requirements. From there, we create a tailored strategy and recommend solutions aligned with your objectives.",
  },
  {
    q: "Do you provide both technology and digital marketing services?",
    a: "Yes — website development, software solutions, SEO, digital marketing, content strategy and local search optimization, so you can manage multiple requirements under one roof.",
  },
  {
    q: "Can startups work with Growwyld Tech?",
    a: "Absolutely. We work with startups, small businesses and growing organizations looking for scalable technology and marketing solutions that fit their goals and budget.",
  },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                                */
/* ------------------------------------------------------------------ */

/** Wide-tracked uppercase label. No numbering — just what the section is. */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="reveal mb-5 block text-[11px] font-medium uppercase tracking-[0.28em] text-[#6E6E6B]">
      {children}
    </span>
  );
}

/**
 * Eyebrow + heading, always flush left and always the first thing in a
 * section — content and supporting grids sit below it, never beside it.
 * The heading itself mask-reveals on scroll, same technique as the hero.
 */
function SectionHeading({
  eyebrow,
  children,
  maxWidth = "20ch",
  className = "",
}: {
  eyebrow: string;
  children: ReactNode;
  maxWidth?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="heading-mask overflow-hidden">
        <span
          className="heading-line block font-light leading-[1.08] text-[clamp(2rem,4vw,3.3rem)]"
          style={{ maxWidth }}
        >
          {children}
        </span>
      </h2>
    </div>
  );
}

/** Hairline rule that draws in left-to-right when its section enters view. */
function SectionRule() {
  return (
    <div className="draw-rule reveal mb-16 h-px w-full origin-left scale-x-0 bg-[#0A0A0A] md:mb-20" />
  );
}

/** The recurring growth-rings mark, pure line art. */
function GrowthRings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g className="ring-draw" style={{ transformOrigin: "230px 240px" }}>
        <circle
          cx="230"
          cy="240"
          r="70"
          stroke="#0A0A0A"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle
          cx="230"
          cy="240"
          r="118"
          stroke="#0A0A0A"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="230"
          cy="240"
          r="166"
          stroke="#0A0A0A"
          strokeWidth="1"
          opacity="0.15"
        />
      </g>
      <g className="ring-draw" style={{ transformOrigin: "410px 240px" }}>
        <circle
          cx="410"
          cy="240"
          r="70"
          stroke="#0A0A0A"
          strokeWidth="1"
          opacity="0.85"
        />
        <circle
          cx="410"
          cy="240"
          r="130"
          stroke="#0A0A0A"
          strokeWidth="1"
          opacity="0.4"
        />
        <circle
          cx="410"
          cy="240"
          r="190"
          stroke="#0A0A0A"
          strokeWidth="1"
          opacity="0.18"
        />
      </g>
      <circle cx="320" cy="240" r="2.5" fill="#0A0A0A" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const faqRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let lenis: import("lenis").default | undefined;
    let rafId: number;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis?.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      const loop = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      setupAnimations(rootRef.current);
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  function setupAnimations(root: HTMLElement | null) {
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Hero entrance — masked line reveals */
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .fromTo(
        root.querySelectorAll(".hero-line"),
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1 },
      )
      .fromTo(
        root.querySelectorAll(".hero-fade"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.55",
      );

    /* Section rule draw-ins */
    gsap.utils.toArray<HTMLElement>(".draw-rule").forEach((el) => {
      gsap.to(el, {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    /* Section heading mask reveals — same language as the hero, on scroll */
    gsap.utils.toArray<HTMLElement>(".heading-mask").forEach((mask) => {
      const line = mask.querySelector(".heading-line");
      if (!line) return;
      gsap.fromTo(
        line,
        { yPercent: 112, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: mask, start: "top 88%", once: true },
        },
      );
    });

    /* Generic grouped reveals */
    root
      .querySelectorAll<HTMLElement>("[data-reveal-group]")
      .forEach((group) => {
        const items = group.querySelectorAll(".reveal:not(.draw-rule)");
        gsap.fromTo(
          items,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: group, start: "top 84%", once: true },
          },
        );
      });

    /* Ring-draw stroke reveal */
    root.querySelectorAll<SVGGElement>(".ring-draw").forEach((g) => {
      g.querySelectorAll("circle").forEach((c, i) => {
        const r = parseFloat(c.getAttribute("r") || "0");
        const circumference = 2 * Math.PI * r;
        gsap.set(c, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });
        gsap.to(c, {
          strokeDashoffset: 0,
          duration: 1.7,
          ease: "power2.inOut",
          delay: i * 0.12,
          scrollTrigger: { trigger: g, start: "top 78%", once: true },
        });
      });
    });

    /* Parallax plates */
    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || "0.15");
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    /* Counters */
    root.querySelectorAll<HTMLElement>("[data-count-to]").forEach((el) => {
      const to = parseFloat(el.dataset.countTo || "0");
      const obj = { val: 0 };
      gsap.to(obj, {
        val: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => (el.textContent = Math.round(obj.val).toString()),
      });
    });

    /* Card tilt-lift on hover — desktop only, subtle, luxury not gimmicky */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      root.querySelectorAll<HTMLElement>("[data-lift]").forEach((card) => {
        const strength = 6;
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateX: -py * strength,
            rotateY: px * strength,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }
  }

  function toggleFaq(index: number) {
    const next = openFaq === index ? null : index;
    faqRefs.current.forEach((el, i) => {
      if (!el) return;
      const inner = el.querySelector<HTMLElement>(".faq-inner");
      if (!inner) return;
      if (i === index) {
        gsap.to(el, {
          height: next === index ? inner.scrollHeight : 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else if (i === openFaq) {
        gsap.to(el, { height: 0, duration: 0.4, ease: "power2.inOut" });
      }
    });
    setOpenFaq(next);
  }

  return (
    <div
      ref={rootRef}
      className={`${poppins.variable} ${poppins.className} relative overflow-x-clip bg-white text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white`}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .reveal, .hero-line, .hero-fade, .draw-rule, .heading-line { opacity: 1 !important; transform: none !important; }
        }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-thumb { background: #0A0A0A; }
        ::-webkit-scrollbar-track { background: #fff; }
        [data-lift] { transform-style: preserve-3d; will-change: transform; }
      `}</style>

      {/* ---------------------------------------------------------- */}
      {/* Nav                                                          */}
      {/* ---------------------------------------------------------- */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#E4E4DF] bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6 md:h-[76px] md:px-12">
          <a href="#top" className="text-[19px] font-medium tracking-tight">
            Growwyld <span className="italic font-light">Tech</span>
          </a>

          <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6E6E6B] md:flex">
            {NAV_LINKS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="transition-colors hover:text-[#0A0A0A]"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="group relative hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] sm:inline-flex"
            >
              Let&rsquo;s talk
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#0A0A0A] transition-transform duration-300 group-hover:scale-x-100" />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className="block h-px w-5 bg-[#0A0A0A] transition-transform duration-300"
                style={{
                  transform: menuOpen
                    ? "translateY(3px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block h-px w-5 bg-[#0A0A0A] transition-transform duration-300"
                style={{
                  transform: menuOpen
                    ? "translateY(-3px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className="overflow-hidden border-t border-[#E4E4DF] bg-white transition-[max-height,opacity] duration-400 ease-in-out md:hidden"
          style={{ maxHeight: menuOpen ? 320 : 0, opacity: menuOpen ? 1 : 0 }}
        >
          <nav className="flex flex-col px-6 py-6">
            {NAV_LINKS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#E4E4DF] py-4 text-[15px] font-light first:pt-0 last:border-none"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#6E6E6B]"
            >
              Let&rsquo;s talk →
            </a>
          </nav>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                         */}
      {/* ---------------------------------------------------------- */}
      <section
        id="top"
        className="relative px-6 pb-24 pt-40 md:px-12 md:pb-32 md:pt-52"
      >
        <div className="mx-auto max-w-[1320px]">
          <div className="hero-fade mb-8 text-[11px] font-medium uppercase tracking-[0.3em] text-[#6E6E6B]">
            About — Est. 2025, Bhubaneswar, Odisha
          </div>

          <h1 className="text-left font-light leading-[0.98] text-[clamp(2.6rem,9vw,7.4rem)]">
            <span className="block overflow-hidden">
              <span className="hero-line block">Where ambition</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic font-light">
                meets innovation.
              </span>
            </span>
          </h1>

          <div className="hero-fade mt-12 grid items-end gap-8 border-t border-[#E4E4DF] pt-8 md:mt-16 md:grid-cols-[1fr_auto]">
            <p className="max-w-[54ch] text-[15.5px] leading-relaxed text-[#3A3A38] md:text-[17px]">
              Growwyld Tech was born in early 2025 from a simple belief:
              businesses deserve reliable technology and digital marketing
              partners — without the unnecessary complexity or inflated cost.
            </p>
            <a
              href="#story"
              className="group inline-flex shrink-0 items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em]"
            >
              <span className="relative">
                Read our story
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[#0A0A0A] transition-transform duration-300 group-hover:scale-x-0" />
              </span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Story                                                        */}
      {/* ---------------------------------------------------------- */}
      <section id="story" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <SectionHeading eyebrow="Our Story" maxWidth="18ch">
              Two founders, one belief in fair, honest growth.
            </SectionHeading>

            <div className="reveal grid gap-10 text-[15px] leading-relaxed text-[#3A3A38] md:grid-cols-2 md:gap-16 md:text-[16px]">
              <p>
                What started as conversations around the challenges faced by
                small and growing businesses soon evolved into a mission. Too
                many organizations struggled to find reliable technology
                partners who could deliver quality without unnecessary
                complexity — they needed practical guidance, modern digital
                solutions, and a team that genuinely cared about their success.
              </p>
              <p>
                Behind Growwyld Tech are two founders from humble backgrounds,
                sharing a common belief: businesses deserve access to
                high-quality digital solutions at a fair and justified price.
                Together, they bridged the gap between technology and marketing
                — a company that helps businesses build digital assets{" "}
                <em className="font-light italic">and</em> generate real
                business results from them.
              </p>
            </div>

            <div className="mt-16 grid gap-px border border-[#E4E4DF] bg-[#E4E4DF] sm:grid-cols-2">
              {FOUNDERS.map((f) => (
                <div
                  key={f.index}
                  data-lift
                  className="reveal group bg-white p-8 transition-colors duration-500 hover:bg-[#0A0A0A] hover:text-white md:p-10"
                >
                  <span className="text-[12px] text-[#6E6E6B] transition-colors duration-500 group-hover:text-white/50">
                    {f.index}
                  </span>
                  <h3 className="mt-5 text-[22px] font-normal">{f.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#6E6E6B] transition-colors duration-500 group-hover:text-white/70">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Approach — diagram with parallax plate                      */}
      {/* ---------------------------------------------------------- */}
      <section
        id="approach"
        className="bg-[#FAFAF8] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <SectionHeading eyebrow="Our Approach" maxWidth="22ch">
              Growth happens where technology and marketing overlap.
            </SectionHeading>

            <p className="reveal max-w-[60ch] text-[15px] leading-relaxed text-[#3A3A38] md:text-[16px]">
              Many businesses invest in a website but struggle to generate
              visibility. Others market heavily without a strong digital
              foundation. We build both, deliberately, as one system.
            </p>

            <div className="mt-16 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-0 divide-y divide-[#E4E4DF] border-t border-[#E4E4DF]">
                {DIFFERENTIATORS.map((d) => (
                  <div
                    key={d.index}
                    className="reveal flex gap-6 py-7 md:gap-10"
                  >
                    <span className="shrink-0 pt-1 text-[13px] text-[#6E6E6B]">
                      {d.index}
                    </span>
                    <div>
                      <h3 className="text-[19px] font-normal">{d.label}</h3>
                      <p className="mt-2 max-w-[48ch] text-[14px] leading-relaxed text-[#6E6E6B]">
                        {d.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reveal relative aspect-[4/3] overflow-hidden border border-[#E4E4DF] bg-white">
                <div
                  data-parallax="0.18"
                  className="ring-draw absolute inset-0 flex scale-110 items-center justify-center"
                >
                  <GrowthRings className="h-[85%] w-[85%]" />
                </div>
                <span className="absolute bottom-5 left-5 text-[10.5px] uppercase tracking-[0.2em] text-[#6E6E6B]">
                  Plate 01 — Merging Disciplines
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Values                                                       */}
      {/* ---------------------------------------------------------- */}
      <section id="values" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <SectionHeading eyebrow="Our Values" maxWidth="16ch">
              Four principles we don&rsquo;t compromise on.
            </SectionHeading>

            <div className="grid gap-px border border-[#E4E4DF] bg-[#E4E4DF] sm:grid-cols-2">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  data-lift
                  className="reveal group bg-white p-8 transition-colors duration-500 hover:bg-[#0A0A0A] hover:text-white md:p-10"
                >
                  <span className="block h-px w-8 bg-[#0A0A0A] transition-colors duration-500 group-hover:bg-white" />
                  <h3 className="mt-6 text-[22px] font-normal">{v.label}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#6E6E6B] transition-colors duration-500 group-hover:text-white/70">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Why choose us + stats + industries                          */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-[#FAFAF8] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <SectionHeading eyebrow="Why Us" maxWidth="18ch">
              No one-size-fits-all. No unnecessary complexity.
            </SectionHeading>

            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <p className="reveal max-w-[52ch] text-[15px] leading-relaxed text-[#3A3A38]">
                  We take the time to understand each client&rsquo;s goals,
                  challenges and opportunities before recommending a strategy.
                  Every project is approached with a commitment to quality,
                  continuous improvement and measurable outcomes.
                </p>

                <div className="mt-14 grid max-w-[420px] grid-cols-3 gap-6 border-t border-[#E4E4DF] pt-8">
                  <div className="reveal">
                    <div className="text-[clamp(2rem,4vw,2.7rem)] font-light">
                      <span data-count-to="2025">0</span>
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-[#6E6E6B]">
                      Founded
                    </div>
                  </div>
                  <div className="reveal">
                    <div className="text-[clamp(2rem,4vw,2.7rem)] font-light">
                      <span data-count-to="2">0</span>
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-[#6E6E6B]">
                      Disciplines
                    </div>
                  </div>
                  <div className="reveal">
                    <div className="text-[clamp(2rem,4vw,2.7rem)] font-light">
                      <span data-count-to="8">0</span>+
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-[#6E6E6B]">
                      Industries
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="reveal mb-6 text-[11px] font-medium uppercase tracking-[0.24em] text-[#6E6E6B]">
                  Industries we work with
                </div>
                <div className="flex flex-wrap gap-3">
                  {INDUSTRIES.map((ind) => (
                    <span
                      key={ind}
                      className="reveal cursor-default border border-[#E4E4DF] px-4 py-2 text-[13.5px] transition-colors duration-300 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
                <p className="reveal mt-10 max-w-[48ch] text-[13.5px] leading-relaxed text-[#6E6E6B]">
                  Based in Bhubaneswar, we work with startups and growing brands
                  across India, regardless of industry — our focus stays the
                  same: practical solutions for real business challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Vision statement                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <Eyebrow>Our Vision</Eyebrow>
            <h2 className="heading-mask overflow-hidden">
              <span className="heading-line block max-w-[26ch] font-light italic leading-[1.22] text-[clamp(1.7rem,4.2vw,3.4rem)]">
                To become a trusted technology and digital growth partner for
                businesses across Odisha and India — building a stronger
                presence in an increasingly connected world.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* FAQ                                                          */}
      {/* ---------------------------------------------------------- */}
      <section id="faq" className="bg-[#FAFAF8] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <SectionHeading eyebrow="FAQ" maxWidth="20ch">
              Good questions, honest answers.
            </SectionHeading>

            <div className="max-w-[820px] divide-y divide-[#E4E4DF] border-b border-t border-[#E4E4DF]">
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={f.q} className="reveal">
                    <button
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-[12px] text-[#6E6E6B]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[16px] font-normal transition-opacity group-hover:opacity-60 md:text-[18px]">
                          {f.q}
                        </span>
                      </span>
                      <span
                        className="shrink-0 text-[20px] font-light transition-transform duration-300"
                        style={{
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>
                    <div
                      ref={(el) => {
                        faqRefs.current[i] = el;
                      }}
                      style={{
                        height: isOpen ? "auto" : 0,
                        overflow: "hidden",
                      }}
                    >
                      <div className="faq-inner pb-6 pl-10 pr-10 text-[14.5px] leading-relaxed text-[#6E6E6B]">
                        {f.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* CTA + footer                                                 */}
      {/* ---------------------------------------------------------- */}
      <section id="contact" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1320px]">
          <SectionRule />
          <div data-reveal-group>
            <Eyebrow>Contact</Eyebrow>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <h2 className="heading-mask overflow-hidden">
                <span className="heading-line block max-w-[16ch] font-light leading-[1.02] text-[clamp(2.1rem,6vw,4.6rem)]">
                  Let&rsquo;s build something worth growing.
                </span>
              </h2>
              <a
                href="mailto:hello@growwyldtech.com"
                className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden border border-[#0A0A0A] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#0A0A0A] transition-transform duration-400 ease-out group-hover:scale-x-100" />
                <span className="relative transition-colors duration-300 group-hover:text-white">
                  Start a conversation
                </span>
                <span className="relative transition-colors duration-300 group-hover:text-white">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E4E4DF] px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 text-[12px] text-[#6E6E6B] sm:flex-row">
          <span>
            © {new Date().getFullYear()} Growwyld Tech · Bhubaneswar, Odisha
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em]">
            Technology · Marketing · Growth
          </span>
        </div>
      </footer>
    </div>
  );
}
