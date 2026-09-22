"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const faqs = [
  {
    question: "Why was Growwyld Tech founded?",
    answer:
      "Growwyld Tech was founded in 2025 with the vision of helping businesses leverage technology and digital marketing to achieve sustainable growth. Our goal is to provide practical, high-quality digital solutions that create measurable business value without unnecessary complexity.",
  },
  {
    question: "What makes Growwyld Tech different from other IT companies?",
    answer:
      "We combine expertise in both technology and digital marketing, allowing businesses to build strong digital foundations while also improving their online visibility and customer reach. Our approach focuses on long-term growth, transparency, and measurable results.",
  },
  {
    question: "Do you work with businesses outside Odisha?",
    answer:
      "Yes. While Growwyld Tech is based in Bhubaneswar, we work with businesses across Odisha and India through remote collaboration and digital project management.",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "We work with startups, healthcare organizations, educational institutions, real estate companies, hospitality businesses, e-commerce brands, manufacturers, professional service providers, and growing enterprises across various industries.",
  },
  {
    question: "How do you approach new projects?",
    answer:
      "Every project begins with understanding the client's goals, challenges, and business requirements. Based on this understanding, we create a tailored strategy and recommend solutions that align with their objectives and growth plans.",
  },
  {
    question: "Do you provide both technology and digital marketing services?",
    answer:
      "Yes. Our team brings expertise in website development, software solutions, SEO, digital marketing, content strategy, local search optimization, and other digital growth services, allowing businesses to manage multiple requirements under one roof.",
  },
  {
    question:
      "Why is it important to have both a website and digital marketing strategy?",
    answer:
      "A website provides the foundation for your online presence, while digital marketing helps potential customers discover your business. Combining both helps improve visibility, engagement, and long-term business growth.",
  },
  {
    question: "Can startups work with Growwyld Tech?",
    answer:
      "Absolutely. We work with startups, small businesses, and growing organizations looking for scalable technology and marketing solutions that fit their goals and budget.",
  },
];

export default function AboutFAQ() {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      // Heading block fades + slides up as it enters the viewport
      gsap.from("[data-faq-heading]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Each FAQ row reveals one by one as you scroll down to it
      gsap.utils.toArray<HTMLElement>("[data-faq-card]").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div data-faq-heading className="mx-auto mb-20 max-w-3xl text-center">
          <h2 className="mt-6 text-xl sm:text-2xl md:text-3xl lg:text-5xl font-medium text-black">
            Everything You Need to Know
          </h2>
        </div>

        {/* FAQ */}

        <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => {
            const open = active === index;

            return (
              <div
                key={index}
                data-faq-card
                className="overflow-hidden rounded-2xl border-[#001129] bg-white shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-lg border"
              >
                <button
                  onClick={() => setActive(open ? null : index)}
                  className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left"
                >
                  <h3 className="pr-4 sm:pr-6 text-sm sm:text-base md:text-lg text-black">
                    {faq.question}
                  </h3>

                  <div
                    className={`
                      flex
                      h-8
                      w-8
                      sm:h-10
                      sm:w-10
                      md:h-11
                      md:w-11
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        open
                          ? "bg-[#001129] text-white rotate-45"
                          : "bg-slate-100 text-slate-600"
                      }
                    `}
                  >
                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-500 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-8 pl-10 sm:pl-14 md:pl-20 text-sm sm:text-[15px] md:text-[17px] leading-7 sm:leading-7 md:leading-8 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
