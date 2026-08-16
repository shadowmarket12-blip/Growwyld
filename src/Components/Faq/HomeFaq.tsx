"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const faqs = [
  {
    question: "How do I choose the right IT services company in Odisha?",
    answer:
      "Focus on expertise, portfolio, communication, and the ability to understand your business goals before selecting a technology partner.",
  },
  {
    question: "How much does website development cost in Bhubaneswar?",
    answer:
      "Website costs vary depending on design requirements, functionality, integrations, and project complexity. Business websites and custom platforms typically have different pricing structures.",
  },
  {
    question:
      "What services does a digital marketing agency in Bhubaneswar provide?",
    answer:
      "Digital marketing agencies typically offer SEO, content marketing, social media management, paid advertising, local SEO, and lead generation services.",
  },
  {
    question: "How long does it take to develop a business website?",
    answer:
      "The timeline depends on the project's scope and features. A standard business website may take a few weeks, while custom platforms may require additional time.",
  },
  {
    question: "Why is SEO important for business growth?",
    answer:
      "SEO helps improve visibility in search engines, attract relevant traffic, and generate long-term leads without relying solely on paid advertising.",
  },
  {
    question: "How long does SEO take to show results?",
    answer:
      "SEO is a long-term strategy. Initial improvements can appear within a few weeks, while significant results generally take several months depending on competition and website authority.",
  },
  {
    question: "Can local SEO help my business get more customers?",
    answer:
      "Yes. Local SEO helps businesses improve visibility in Google Search and Google Maps, making it easier for nearby customers to discover and contact them.",
  },
  {
    question: "Which is better for my business: SEO or Google Ads?",
    answer:
      "Both serve different purposes. SEO supports long-term organic growth, while Google Ads can provide immediate visibility and lead generation.",
  },
  {
    question:
      "Do I need both a website and digital marketing for business growth?",
    answer:
      "A website acts as your digital foundation, while digital marketing helps potential customers find your business online and engage with your services.",
  },
];

export default function FAQ() {
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
