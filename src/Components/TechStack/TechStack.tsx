"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import gsap from "gsap";

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

/* ------------------------------------------------------------------ */
/*  Content — unchanged from your data                                 */
/* ------------------------------------------------------------------ */

interface TechItem {
  name: string;
  logo: string;
  category: string;
  color: string;
}

const technologies: TechItem[] = [
  // Web Development
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Web Development",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Web Development",
    color: "#1572B6",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "Web Development",
    color: "#06B6D4",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    category: "Web Development",
    color: "#7952B3",
  },
  {
    name: "Material UI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    category: "Web Development",
    color: "#007FFF",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Web Development",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Web Development",
    color: "#3178C6",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Web Development",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Web Development",
    color: "#000000",
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    category: "Web Development",
    color: "#DD0031",
  },
  {
    name: "WordPress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    category: "Web Development",
    color: "#21759B",
  },
  {
    name: "Shopify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/shopify/shopify-original.svg",
    category: "Web Development",
    color: "#7AB55C",
  },
  // Backend Development
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend Development",
    color: "#339933",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    category: "Backend Development",
    color: "#000000",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Backend Development",
    color: "#3776AB",
  },
  {
    name: "Django",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    category: "Backend Development",
    color: "#092E20",
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    category: "Backend Development",
    color: "#777BB4",
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    category: "Backend Development",
    color: "#000000",
  },
  {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    category: "Backend Development",
    color: "#00ADD8",
  },
  {
    name: "NestJS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    category: "Backend Development",
    color: "#E0234E",
  },
  {
    name: "Pandas",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    category: "Backend Development",
    color: "#150458",
  },
  {
    name: "NumPy",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    category: "Backend Development",
    color: "#013243",
  },
  // Mobile App Development
  {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    category: "Mobile App Development",
    color: "#02569B",
  },
  {
    name: "React Native",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Mobile App Development",
    color: "#61DAFB",
  },
  // Database Technologies
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Database Technologies",
    color: "#4479A1",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Database Technologies",
    color: "#4169E1",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Database Technologies",
    color: "#47A248",
  },
  {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    category: "Database Technologies",
    color: "#DC382D",
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
    category: "Database Technologies",
    color: "#FFCA28",
  },
  // Cloud & DevOps
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Cloud & DevOps",
    color: "#2496ED",
  },
  {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
    category: "Cloud & DevOps",
    color: "#326CE5",
  },
  {
    name: "CI/CD",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    category: "Cloud & DevOps",
    color: "#2088FF",
  },
  // UI/UX Design
  {
    name: "Canva",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    category: "UI/UX Design",
    color: "#00C4CC",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    category: "UI/UX Design",
    color: "#F24E1E",
  },
  {
    name: "Adobe XD",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg",
    category: "UI/UX Design",
    color: "#FF61F6",
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    category: "UI/UX Design",
    color: "#31A8FF",
  },
];

const categories = [
  { name: "Web Development" },
  { name: "Backend Development" },
  { name: "Mobile App Development" },
  { name: "Database Technologies" },
  { name: "Cloud & DevOps" },
  { name: "UI/UX Design" },
];

const TOTAL_TECH = technologies.length;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const TechStackSection = () => {
  const [activeCategory, setActiveCategory] =
    useState<string>("Web Development");

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const reducedRef = useRef(false);
  // one lazily-created GSAP quickTo trio per card, keyed by tech name —
  // created on first interaction only, reused after that, never rebuilt
  const tiltRef = useRef<
    Map<
      string,
      {
        rx: (v: number) => void;
        ry: (v: number) => void;
        tz: (v: number) => void;
      }
    >
  >(new Map());

  const currentTechs = technologies.filter(
    (tech) => tech.category === activeCategory,
  );

  /* ---------------------------------------------------------------- */
  /*  Entrance reveal (once) + category-switch reveal                  */
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
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.1,
            },
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    if (reducedRef.current) {
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
      return;
    }
    gsap.fromTo(
      cards,
      { opacity: 0, y: 18, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.03, from: "start" },
      },
    );
  }, [activeCategory]);

  /* ---------------------------------------------------------------- */
  /*  3D pointer tilt — transform-only, compositor-friendly, one card  */
  /*  animated at a time (never the whole grid)                        */
  /* ---------------------------------------------------------------- */
  const getTilt = useCallback((el: HTMLDivElement, name: string) => {
    let entry = tiltRef.current.get(name);
    if (!entry) {
      entry = {
        rx: gsap.quickTo(el, "rotateX", { duration: 0.45, ease: "power3.out" }),
        ry: gsap.quickTo(el, "rotateY", { duration: 0.45, ease: "power3.out" }),
        tz: gsap.quickTo(el, "z", { duration: 0.45, ease: "power3.out" }),
      };
      tiltRef.current.set(name, entry);
    }
    return entry;
  }, []);

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    name: string,
  ) => {
    if (reducedRef.current) return;
    const inner =
      e.currentTarget.querySelector<HTMLDivElement>("[data-card-inner]");
    if (!inner) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const { rx, ry, tz } = getTilt(inner, name);
    rx(py * -12);
    ry(px * 12);
    tz(28);
  };

  const handlePointerLeave = (
    e: React.PointerEvent<HTMLDivElement>,
    name: string,
  ) => {
    const inner =
      e.currentTarget.querySelector<HTMLDivElement>("[data-card-inner]");
    if (!inner) return;
    const { rx, ry, tz } = getTilt(inner, name);
    rx(0);
    ry(0);
    tz(0);
  };

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} relative w-full overflow-hidden bg-white py-15 sm:py-17 lg:py-18`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {/* ambient decor, matches the rest of the site */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full border border-[#EDE7DA] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-0 h-[36rem] w-[36rem] rounded-full border border-[#EDE7DA] opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* ---------------------------------------------------- */}
        {/*  Header                                                */}
        {/* ---------------------------------------------------- */}
        <div ref={headingRef} className="mx-auto max-w-3xl text-center">
          <h1 className="text-[2rem] leading-[1] tracking-tight text-[#14110F] sm:text-4xl lg:text-5xl text-left">
            Our TechStark
          </h1>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5B564E] sm:text-lg"
          >
            Powerful, proven technologies we master to turn ideas into
            exceptional digital products.
          </p>

          <p
            data-reveal
            className="mt-5 text-[11px] tracking-[0.25em] text-[#B7AE9C]"
          >
            {categories.length} DISCIPLINES · {TOTAL_TECH} TECHNOLOGIES
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/*  Category tabs                                         */}
        {/* ---------------------------------------------------- */}
        <div
          className="mt-14 flex justify-start gap-2 overflow-x-auto pb-3 sm:mt-16 sm:justify-center"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`relative flex-shrink-0 rounded-full px-4 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 sm:px-5 ${
                  isActive
                    ? "bg-[#14110F] text-white"
                    : "border border-[#EAE4D8] bg-white text-[#6B665C] hover:border-[#D9C29B] hover:text-[#14110F]"
                }`}
              >
                {category.name}
                {isActive && (
                  <span className="absolute -bottom-3 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#B08A55]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ---------------------------------------------------- */}
        {/*  Tech grid — 3D tilt cards                             */}
        {/* ---------------------------------------------------- */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6"
        >
          {currentTechs.map((tech) => (
            <div
              key={tech.name}
              data-card
              onPointerMove={(e) => handlePointerMove(e, tech.name)}
              onPointerLeave={(e) => handlePointerLeave(e, tech.name)}
              className="group tech-card relative"
              style={
                {
                  perspective: "700px",
                  "--tc": tech.color,
                } as React.CSSProperties
              }
            >
              <div
                data-card-inner
                className="relative flex flex-col items-center gap-3 rounded-[22px] border border-[#EAE4D8] bg-white px-4 py-6 shadow-[0_4px_16px_-8px_rgba(20,17,15,0.12)] transition-[border-color,box-shadow] duration-300 group-hover:border-[var(--tc)] group-hover:shadow-[0_24px_48px_-20px_var(--tc)]"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* icon medallion */}
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBFAF7] transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16"
                  style={{ transform: "translateZ(24px)" }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at center, var(--tc) 0%, transparent 72%)",
                      opacity: 0.16,
                    }}
                  />
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    loading="lazy"
                    className="relative h-8 w-8 object-contain sm:h-9 sm:w-9"
                  />
                </div>

                {/* name */}
                <span
                  className="text-center text-xs font-medium text-[#5B564E] transition-colors duration-300 group-hover:text-[#14110F] sm:text-sm"
                  style={{ transform: "translateZ(16px)" }}
                >
                  {tech.name}
                </span>

                {/* accent underline */}
                <span
                  className="h-[2px] w-6 rounded-full bg-[#EAE4D8] transition-colors duration-300 group-hover:bg-[var(--tc)]"
                  style={{ transform: "translateZ(12px)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------- */}
        {/*  Category dots                                         */}
        {/* ---------------------------------------------------- */}
        <div className="mt-12 flex justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              aria-label={`Show ${category.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCategory === category.name
                  ? "w-8 bg-[#14110F]"
                  : "w-2 bg-[#EAE4D8] hover:bg-[#D9C29B]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
