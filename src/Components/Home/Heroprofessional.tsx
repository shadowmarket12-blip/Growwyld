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
          { opacity: 0, scale: 0.94, duration: 0.9, ease: "power4.out" },
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
            setter.x(lastX * 18 * setter.depth);
            setter.y(lastY * 18 * setter.depth);
            setter.rotateX(lastY * -4 * setter.depth);
            setter.rotateY(lastX * 4 * setter.depth);
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
      {/* Soft background texture (kept subtle, not the main visual anymore) */}
      <div
        data-hero-mesh
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
        {/* Left column — solid color / image card box */}
        <div
          ref={stageRef}
          data-hero-stage
          className="relative mx-auto w-full max-w-md [perspective:1200px] lg:order-1 lg:max-w-none"
        >
          {/* Main card: image + strong color overlay so any text stays readable */}
          <div
            ref={addLayer}
            data-depth="0.5"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.45)] [transform-style:preserve-3d] will-change-transform sm:aspect-square lg:aspect-[4/5]"
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
              alt="Web development team working on a project"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />

            {/* Solid color wash for brand feel + guaranteed contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-indigo-950/70 to-indigo-950/90" />

            {/* Content inside the card */}
            <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
              <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                Web Development
              </span>

              <div>
                <p className="font-body text-2xl font-bold leading-snug text-white sm:text-3xl">
                  We build websites that work as hard as you do.
                </p>
                <p className="mt-3 font-body text-sm text-white/80 sm:text-base">
                  Fast, scalable, and search-ready platforms crafted for
                  businesses in Bhubaneswar and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Floating stat cards */}
          <div
            ref={addLayer}
            data-depth="1.4"
            data-float-card
            className="absolute -left-4 top-6 w-[9rem] rounded-2xl border border-ink/10 bg-paper/95 p-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] backdrop-blur-sm will-change-transform sm:-left-6 sm:top-8 sm:w-[9.5rem]"
          >
            <p className="font-body text-2xl font-bold text-black">Fast</p>
            <p className="mt-0.5 font-body text-xs text-ink/60">
              Optimized load times
            </p>
          </div>

          <div
            ref={addLayer}
            data-depth="1.1"
            data-float-card
            className="absolute -right-4 bottom-24 w-[9.5rem] rounded-2xl border border-ink/10 bg-paper/95 p-4 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] backdrop-blur-sm will-change-transform sm:-right-6 sm:w-[10rem]"
          >
            <p className="font-body text-2xl font-bold text-black">Scalable</p>
            <p className="mt-0.5 font-body text-xs text-ink/60">
              Built to grow with you
            </p>
          </div>

          <div
            ref={addLayer}
            data-depth="1.7"
            data-float-card
            className="absolute -bottom-6 left-1/2 w-[8.5rem] -translate-x-1/2 rounded-2xl border border-ink/10 bg-paper/95 p-4 text-center shadow-[0_18px_40px_-16px_rgba(0,0,0,0.35)] backdrop-blur-sm will-change-transform"
          >
            <p className="font-body text-2xl font-bold text-black">SEO</p>
            <p className="mt-0.5 font-body text-xs text-ink/60">
              Search-ready by design
            </p>
          </div>
        </div>

        {/* Text column */}
        <div className="max-w-2xl lg:order-2">
          <span
            data-hero-eyebrow
            className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-ink/70"
          >
            Bhubaneswar, Odisha
          </span>

          <h1
            data-hero-heading
            className="mt-5 text-2xl font-medium text-black md:text-3xl lg:text-5xl"
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
