"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const services = [
  {
    code: "WD-01",
    title: "Corporate Websites",
    desc: "Fast, credible websites that turn first impressions into trust — built for clarity and conversion.",
  },
  {
    code: "WD-02",
    title: "E-Commerce Stores",
    desc: "Storefronts built to handle real traffic and checkouts, with clean product discovery and fast load times.",
  },
  {
    code: "WD-03",
    title: "Custom Web Apps",
    desc: "Tailored platforms for healthcare, education, and growing teams — built around your actual workflow.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from("[data-services-heading]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      gsap.utils
        .toArray<HTMLElement>("[data-service-card]")
        .forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-paper px-6 py-24 text-ink sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div data-services-heading className="max-w-2xl">
          <h2 className="mt-5 text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3">
            Professional web development, built around your business goals.
          </h2>
          <p className="mt-6  text-base leading-relaxed text-ink/70 sm:text-lg">
            Your website is often the first impression customers have of your
            business. We build corporate sites, online stores, and custom
            platforms that are fast, scalable, and easy to manage — developed
            with performance, usability, and search visibility in mind from day
            one.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {services.map((s) => (
            <div
              data-service-card
              key={s.code}
              className="group flex flex-col justify-between bg-paper p-8 transition-colors duration-300 hover:bg-ink"
            >
              <div>
                <p className="mt-3 font-body text-sm leading-relaxed  transition-colors duration-300 group-hover:text-mist">
                  {s.desc}
                </p>
              </div>
              <span className="mt-8 inline-block font-mono text-[11px] uppercase tracking-widest text-ink/40 transition-colors duration-300 group-hover:text-signal">
                Learn more →
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-10 sm:flex-row sm:items-center">
          <p className="max-w-md  text-sm leading-relaxed text-black">
            Every project combines modern design, responsive development, and
            user-focused functionality — built to represent your brand and
            support long-term growth.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-body text-sm font-semibold text-paper transition-transform duration-300 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Start Your Project
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
