"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Heroprofessional() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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

      // Entrance animation
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
          "[data-hero-stage]",
          { opacity: 0, scale: 0.92, duration: 0.9, ease: "power4.out" },
          "-=0.7",
        )
        .from(
          "[data-float-card]",
          { opacity: 0, y: 30, stagger: 0.12, duration: 0.6 },
          "-=0.5",
        );

      if (prefersReducedMotion) return;

      const stage = stageRef.current;

      if (stage && hasFinePointer) {
        const quickSetters = layersRef.current.map((layer) => {
          const depth = Number(layer.dataset.depth ?? 1);
          return {
            x: gsap.quickTo(layer, "x", { duration: 0.6, ease: "power2.out" }),
            y: gsap.quickTo(layer, "y", { duration: 0.6, ease: "power2.out" }),
            rotateX: gsap.quickTo(layer, "rotateX", {
              duration: 0.6,
              ease: "power2.out",
            }),
            rotateY: gsap.quickTo(layer, "rotateY", {
              duration: 0.6,
              ease: "power2.out",
            }),
            depth,
          };
        });

        let ticking = false;
        let lastX = 0;
        let lastY = 0;

        const applyMove = () => {
          quickSetters.forEach((setter) => {
            setter.x(lastX * 24 * setter.depth);
            setter.y(lastY * 24 * setter.depth);
            setter.rotateX(lastY * -6 * setter.depth);
            setter.rotateY(lastX * 6 * setter.depth);
          });
          ticking = false;
        };

        const handleMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          lastX = (e.clientX - rect.left) / rect.width - 0.5;
          lastY = (e.clientY - rect.top) / rect.height - 0.5;

          if (!ticking) {
            ticking = true;
            requestAnimationFrame(applyMove);
          }
        };

        const handleLeave = () => {
          layersRef.current.forEach((layer) => {
            gsap.to(layer, {
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };

        stage.addEventListener("mousemove", handleMove, { passive: true });
        stage.addEventListener("mouseleave", handleLeave, { passive: true });

        // ✅ use `self` (the context) instead of `ctx`
        self.add(() => () => {
          stage.removeEventListener("mousemove", handleMove);
          stage.removeEventListener("mouseleave", handleLeave);
        });
      }

      // Scroll parallax
      gsap.to("[data-hero-mesh]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-hero-stage]", {
        yPercent: -8,
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper px-6 py-16 text-ink sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Animated gradient mesh background */}
      <div
        data-hero-mesh
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <div className="absolute -top-40 left-1/4 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-ink/10 via-ink/5 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-[24rem] w-[24rem] rounded-full bg-gradient-to-bl from-ink/[0.08] via-ink/[0.04] to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[20rem] w-[20rem] rounded-full bg-gradient-to-tr from-ink/[0.06] to-transparent blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
        {/* 3D stage column */}
        <div
          ref={stageRef}
          data-hero-stage
          className="relative mx-auto aspect-square w-full max-w-md [perspective:1200px] sm:max-w-lg lg:order-1 lg:max-w-none"
        >
          {/* Base glass panel */}
          <div
            ref={addLayer}
            data-depth="0.6"
            className="absolute inset-6 rounded-[2rem] border border-ink/10 bg-gradient-to-br from-white/60 to-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] backdrop-blur-md [transform-style:preserve-3d] will-change-transform sm:inset-10"
          />

          {/* Center core shape */}
          <div
            ref={addLayer}
            data-depth="1"
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-br from-ink to-ink/70 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] [transform-style:preserve-3d] will-change-transform sm:h-52 sm:w-52"
          >
            <div className="flex h-full w-full items-center justify-center">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                className="h-16 w-16 text-paper/90 sm:h-20 sm:w-20"
              >
                <path
                  d="M4 6.5C4 5.67 4.67 5 5.5 5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M4 9h16M8 5v4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M8.5 13.5 10.5 15.5 15.5 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Floating stat cards */}
          <div
            ref={addLayer}
            data-depth="1.6"
            data-float-card
            className="absolute left-0 top-4 w-[9.5rem] rounded-2xl border border-ink/10 bg-paper/90 p-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.3)] backdrop-blur-sm will-change-transform sm:left-2 sm:top-6"
          >
            <p className="font-body text-2xl font-bold text-black">Fast</p>
            <p className="mt-0.5 font-body text-xs text-ink/60">
              Optimized load times
            </p>
          </div>

          <div
            ref={addLayer}
            data-depth="1.3"
            data-float-card
            className="absolute bottom-6 right-0 w-[10rem] rounded-2xl border border-ink/10 bg-paper/90 p-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.3)] backdrop-blur-sm will-change-transform sm:bottom-10 sm:right-2"
          >
            <p className="font-body text-2xl font-bold text-black">Scalable</p>
            <p className="mt-0.5 font-body text-xs text-ink/60">
              Built to grow with you
            </p>
          </div>

          <div
            ref={addLayer}
            data-depth="2"
            data-float-card
            className="absolute -bottom-2 left-1/2 w-[8.5rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-paper/90 p-4 text-center shadow-[0_18px_40px_-16px_rgba(0,0,0,0.3)] backdrop-blur-sm will-change-transform sm:left-1/3"
          >
            <p className="font-body text-2xl font-bold text-black">SEO</p>
            <p className="mt-0.5 font-body text-xs text-ink/60">
              Search-ready by design
            </p>
          </div>

          {/* Decorative ring */}
          <div
            ref={addLayer}
            data-depth="0.4"
            aria-hidden
            className="absolute inset-0 rounded-full border border-dashed border-ink/15 [transform-style:preserve-3d]"
          />
        </div>

        {/* Text column */}
        <div className="max-w-2xl lg:order-2">
          <h1
            data-hero-heading
            className="mt-5 text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3"
          >
            Professional Web Development Services in Bhubaneswar
          </h1>

          <div data-hero-copy className="mt-6 space-y-4">
            <p className="text-base leading-relaxed text-ink/70 sm:text-lg">
              Your website is more than just an online presence, it&apos;s often
              the first impression customers have of your business. A
              well-designed website builds trust, enhances user experience, and
              helps turn visitors into customers.
            </p>
            <p className="text-base leading-relaxed text-ink/70 sm:text-lg">
              As a Web Development Company in Bhubaneswar, we create websites
              and digital platforms designed around your business goals. Whether
              you need a corporate website, an e-commerce store, a custom web
              application, or a mobile-first solution, our focus is on building
              digital experiences that are fast, scalable, and easy to manage.
            </p>
            <p className="text-base leading-relaxed text-ink/70 sm:text-lg">
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
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-body text-sm font-semibold text-paper shadow-[0_8px_30px_-8px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Start Your Project
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-8 py-4 font-body text-sm font-semibold text-ink transition-colors duration-300 hover:bg-ink/5"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
