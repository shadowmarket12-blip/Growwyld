"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Fraunces, Inter } from "next/font/google";
import gsap from "gsap";
import "./TechStackSection.css";

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
/*  Content                                                             */
/* ------------------------------------------------------------------ */

interface TechItem {
  name: string;
  logo: string;
  color: string;
}

const technologies: TechItem[] = [
  // Web Development
  {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
  },
  {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "#7952B3",
  },
  {
    name: "Material UI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    color: "#007FFF",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
  },
  {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    color: "#DD0031",
  },
  {
    name: "WordPress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    color: "#21759B",
  },
  // Backend Development
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "#000000",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
  },
  {
    name: "Django",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    color: "#092E20",
  },
  {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#777BB4",
  },
  {
    name: "Flask",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    color: "#000000",
  },
  {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    color: "#00ADD8",
  },
  {
    name: "NestJS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    color: "#E0234E",
  },
  {
    name: "Pandas",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    color: "#150458",
  },
  {
    name: "NumPy",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
    color: "#013243",
  },
  // Mobile App Development
  {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    color: "#02569B",
  },
  {
    name: "React Native",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  // Database Technologies
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4479A1",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    color: "#DC382D",
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
    color: "#FFCA28",
  },
  // Cloud & DevOps
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
  },
  {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
    color: "#326CE5",
  },
  {
    name: "CI/CD",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    color: "#2088FF",
  },
  // UI/UX Design
  {
    name: "Canva",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    color: "#00C4CC",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
  },
  {
    name: "Adobe XD",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg",
    color: "#FF61F6",
  },
  {
    name: "Photoshop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
    color: "#31A8FF",
  },
];

/* ------------------------------------------------------------------ */
/*  One marquee row — duplicates its items so the loop is seamless.    */
/* ------------------------------------------------------------------ */

const MarqueeRow: React.FC<{
  items: TechItem[];
  direction: "left" | "right";
  speed: number;
  reduced: boolean;
}> = ({ items, direction, speed, reduced }) => {
  if (items.length === 0) return null;

  const repeated = useMemo(() => {
    const minCopies = Math.max(2, Math.ceil(8 / items.length));
    const base = Array.from({ length: minCopies }, () => items).flat();
    return [...base, ...base];
  }, [items]);

  const approxCardWidth = 100;
  const trackWidth = repeated.length * approxCardWidth;
  const duration = reduced ? 0 : trackWidth / 2 / speed;

  return (
    <div className="tsm-row">
      <div
        className="tsm-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: reduced ? "paused" : "running",
        }}
      >
        {repeated.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="tsm-card"
            style={{ "--tc": tech.color } as React.CSSProperties}
            aria-hidden={i >= repeated.length / 2 ? true : undefined}
          >
            <div className="tsm-card-inner">
              <img
                src={tech.logo}
                alt={tech.name}
                loading="lazy"
                className="tsm-logo"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const TechStackSection = () => {
  const [reduced, setReduced] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const bits = headingRef.current.querySelectorAll("[data-reveal]");
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  // Split technologies into two rows
  const rowA = technologies.filter((_, i) => i % 2 === 0);
  const rowB = technologies.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} relative w-full overflow-hidden bg-white py-15 sm:py-17 lg:py-18`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div ref={headingRef} className="max-w-3xl text-left">
          <h1
            data-reveal
            className="tracking-tight text-black text-2xl md:text-3xl lg:text-5xl font-medium mb-3"
          >
            Technologies We Work With
          </h1>
        </div>

        {/* Tech marquee — two rows, opposite directions */}
        <div className="tsm-wrap mt-14 sm:mt-16">
          <MarqueeRow
            items={rowA}
            direction="left"
            speed={40}
            reduced={reduced}
          />
          <MarqueeRow
            items={rowB}
            direction="right"
            speed={40}
            reduced={reduced}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
