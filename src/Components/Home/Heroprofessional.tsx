"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Left side: premium 3D stage
 *  - Main image card with glass overlay, tilts toward the cursor (3D)
 *  - Glass floating stat cards at different depths (translateZ) with idle float
 *  - Soft glow orbs + rotating dashed ring for depth
 *  - Touch / mobile: gentle auto-float instead of mouse tilt
 *  - Respects prefers-reduced-motion
 */
export default function Heroprofessional() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  layersRef.current = [];
  const addLayer = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) layersRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

      // ---------- Entrance ----------
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-eyebrow]", { opacity: 0, y: 16, duration: 0.6 })
        .from(
          "[data-hero-heading]",
          { opacity: 0, y: 32, duration: 0.8 },
          "-=0.35",
        )
        .from("[data-hero-copy]", { opacity: 0, y: 24, duration: 0.7 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 18, duration: 0.6 }, "-=0.4")
        .from(
          "[data-tilt]",
          {
            opacity: 0,
            scale: 0.9,
            rotateY: -18,
            rotateX: 8,
            transformPerspective: 1200,
            duration: 1.2,
            ease: "expo.out",
          },
          0.1,
        )
        .from(
          "[data-orb]",
          { opacity: 0, scale: 0.4, stagger: 0.15, duration: 1.2 },
          0.2,
        )
        .from(
          "[data-float-card]",
          {
            opacity: 0,
            y: 40,
            z: -60,
            stagger: 0.14,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          "-=0.8",
        );

      if (prefersReducedMotion) return;

      // ---------- Idle floating (all devices) ----------
      gsap.utils.toArray<HTMLElement>("[data-float-inner]").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          duration: 2.6 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });

      gsap.to("[data-orb]", {
        x: "random(-14, 14)",
        y: "random(-14, 14)",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.6, from: "random" },
      });

      gsap.to("[data-ring]", {
        rotate: 360,
        duration: 40,
        ease: "none",
        repeat: -1,
      });

      // ---------- Mouse tilt (desktop only) ----------
      const stage = stageRef.current;
      const tilt = tiltRef.current;
      const shine = shineRef.current;

      if (stage && tilt && hasFinePointer) {
        const tiltX = gsap.quickTo(tilt, "rotateX", {
          duration: 0.7,
          ease: "power3.out",
        });
        const tiltY = gsap.quickTo(tilt, "rotateY", {
          duration: 0.7,
          ease: "power3.out",
        });

        const layerSetters = layersRef.current.map((layer) => ({
          x: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }),
          y: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" }),
          depth: Number(layer.dataset.depth ?? 1),
        }));

        let ticking = false;
        let nx = 0;
        let ny = 0;

        const apply = () => {
          tiltX(ny * -12);
          tiltY(nx * 14);
          layerSetters.forEach((s) => {
            s.x(nx * 26 * s.depth);
            s.y(ny * 26 * s.depth);
          });
          if (shine) {
            shine.style.background = `radial-gradient(500px circle at ${
              (nx + 0.5) * 100
            }% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.22), transparent 55%)`;
          }
          ticking = false;
        };

        const onMove = (e: MouseEvent) => {
          const r = stage.getBoundingClientRect();
          nx = (e.clientX - r.left) / r.width - 0.5;
          ny = (e.clientY - r.top) / r.height - 0.5;
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(apply);
          }
        };

        const onLeave = () => {
          nx = 0;
          ny = 0;
          tiltX(0);
          tiltY(0);
          layerSetters.forEach((s) => {
            s.x(0);
            s.y(0);
          });
          if (shine) shine.style.background = "transparent";
        };

        stage.addEventListener("mousemove", onMove, { passive: true });
        stage.addEventListener("mouseleave", onLeave, { passive: true });

        self.add(() => () => {
          stage.removeEventListener("mousemove", onMove);
          stage.removeEventListener("mouseleave", onLeave);
        });
      } else if (tilt) {
        // Touch devices: slow, subtle auto sway
        gsap.to(tilt, {
          rotateY: 6,
          rotateX: -4,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // ---------- Scroll parallax ----------
      gsap.to("[data-hero-stage]", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const glass =
    "border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_-18px_rgba(0,0,0,0.35)]";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper px-5 py-16 text-ink sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        {/* ================= LEFT: 3D STAGE ================= */}
        <div
          ref={stageRef}
          data-hero-stage
          className="relative mx-auto w-full max-w-[26rem] px-4 pb-10 pt-4 sm:max-w-lg sm:px-8 lg:order-1 lg:max-w-none"
          style={{ perspective: "1400px" }}
        >
          {/* Background glow orbs */}
          <div
            data-orb
            aria-hidden
            className="pointer-events-none absolute -left-6 -top-6 h-40 w-40  sm:h-56 sm:w-56"
          />
          <div
            data-orb
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-4 h-44 w-44 rounded-full  sm:h-64 sm:w-64"
          />

          {/* Rotating dashed ring */}
          <div
            data-ring
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-ink/15"
          />

          {/* Tilting 3D group */}
          <div
            ref={tiltRef}
            data-tilt
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Back plate for depth */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-ink/10 sm:translate-x-5 sm:translate-y-5"
              style={{ transform: "translateZ(-40px) translate(14px, 14px)" }}
            />

            {/* Main card */}
            <div
              ref={addLayer}
              data-depth="0.3"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-25px_rgba(0,0,0,0.55)] ring-1 ring-white/20 will-change-transform sm:aspect-square lg:aspect-[4/5]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="/Professional-Web-Development-Services-in-Bhubaneswar.png"
                alt="Web development team working on a project"
                className="absolute inset-0 h-full w-full scale-105 object-cover"
                loading="lazy"
              />

              {/* Readability gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              {/* Cursor-following shine */}
              <div
                ref={shineRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              />

              {/* Card content (lifted in 3D) */}
              <div
                className="relative flex h-full flex-col justify-between p-5 sm:p-8"
                style={{ transform: "translateZ(50px)" }}
              >
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-body text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Web Development
                </span>

                <div>
                  <p className="font-body text-xl font-bold leading-snug text-white sm:text-3xl">
                    We build websites that work as hard as you do.
                  </p>
                  <p className="mt-3 max-w-md font-body text-sm text-white/80 sm:text-base">
                    Fast, scalable, and search-ready platforms crafted for
                    businesses in Bhubaneswar and beyond.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating glass card: Fast */}
            <div
              ref={addLayer}
              data-depth="1.2"
              data-float-card
              className="absolute -left-3 top-6 will-change-transform sm:-left-8 sm:top-10"
              style={{ transform: "translateZ(90px)" }}
            >
              <div
                data-float-inner
                className={`w-[8.25rem] rounded-2xl p-3.5 sm:w-[9.5rem] sm:p-4 ${glass}`}
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
                  </svg>
                </div>
                <p className="font-body text-lg font-bold text-black sm:text-xl">
                  Fast
                </p>
                <p className="mt-0.5 font-body text-[11px] text-ink/60 sm:text-xs">
                  Optimized load times
                </p>
              </div>
            </div>

            {/* Floating glass card: Scalable */}
            <div
              ref={addLayer}
              data-depth="1.0"
              data-float-card
              className="absolute -right-3 bottom-28 will-change-transform sm:-right-8 sm:bottom-32"
              style={{ transform: "translateZ(70px)" }}
            >
              <div
                data-float-inner
                className={`w-[8.75rem] rounded-2xl p-3.5 sm:w-[10rem] sm:p-4 ${glass}`}
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                  </svg>
                </div>
                <p className="font-body text-lg font-bold text-black sm:text-xl">
                  Scalable
                </p>
                <p className="mt-0.5 font-body text-[11px] text-ink/60 sm:text-xs">
                  Built to grow with you
                </p>
              </div>
            </div>

            {/* Floating glass card: SEO */}
            <div
              ref={addLayer}
              data-depth="1.5"
              data-float-card
              className="absolute -bottom-8 left-1/2 will-change-transform"
              style={{ transform: "translateX(-50%) translateZ(110px)" }}
            >
              <div
                data-float-inner
                className={`w-[9rem] rounded-2xl p-3.5 text-center sm:w-[10.5rem] sm:p-4 ${glass}`}
              >
                <p className="font-body text-lg font-bold text-black sm:text-xl">
                  SEO
                </p>
                <p className="mt-0.5 font-body text-[11px] text-ink/60 sm:text-xs">
                  Search-ready by design
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: TEXT ================= */}
        <div className="max-w-2xl lg:order-2">
          <span
            data-hero-eyebrow
            className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-ink/70"
          >
            Bhubaneswar, Odisha
          </span>

          <h1
            data-hero-heading
            className="mt-5 text-3xl font-medium leading-tight text-black md:text-4xl lg:text-5xl"
          >
            Professional Web Development Services in Bhubaneswar
          </h1>

          <div data-hero-copy className="mt-6 space-y-4">
            <p className="text-[15px] leading-relaxed text-ink/70 sm:text-[17px]">
              Your website is more than just an online presence, it&apos;s often
              the first impression customers have of your business. A
              well-designed website builds trust, enhances user experience, and
              helps turn visitors into customers.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/70 sm:text-[17px]">
              As a Web Development Company in Bhubaneswar, we create websites
              and digital platforms designed around your business goals. Whether
              you need a corporate website, an e-commerce store, a custom web
              application, or a mobile-first solution, our focus is on building
              digital experiences that are fast, scalable, and easy to manage.
            </p>
            <p className="text-[15px] leading-relaxed text-ink/70 sm:text-[17px]">
              Every project is developed with performance, usability, and search
              visibility in mind. By combining modern design, responsive
              development, and user-focused functionality, we create websites
              that not only represent your brand professionally but also support
              long-term business growth.
            </p>
          </div>

          <div
            data-hero-cta
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/services/web-development"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-body text-sm font-semibold text-paper shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Explore Services
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
