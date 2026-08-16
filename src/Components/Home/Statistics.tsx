"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  icon: React.ReactNode;
}

const StatisticsSection = () => {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats: StatItem[] = [
    {
      value: 50,
      suffix: "+",
      label: "Projects Completed",
      prefix: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      value: 10,
      suffix: "+",
      label: "Industries Served",
      prefix: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      value: 95,
      suffix: "%",
      label: "Client Satisfaction",
      prefix: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      value: 3,
      suffix: "+",
      label: "Years Experience",
      prefix: "",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    const durations = [2000, 1800, 2200, 1500];

    stats.forEach((stat, index) => {
      const startTime = Date.now();
      const duration = durations[index];

      const updateCounter = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * stat.value);

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = currentValue;
          return newCounters;
        });

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 overflow-hidden bg-white"
    >
      {/* Luxury background patterns */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Elegant corner decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, #000 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at bottom right, #000 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Left Aligned */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium text-black mb-3">
            Statistics Section
            <span className="relative inline-block">
              <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-r from-gray-100 to-gray-50 -z-0 transform -skew-x-12" />
            </span>
          </h2>

          <p className="text-black max-w-xl text-xs md:text-sm leading-relaxed font-light">
            Delivering exceptional results through innovation and dedication
          </p>
        </div>

        {/* Stats Grid - Always 2 columns on mobile and tablet, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative group ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } transition-all duration-700 ease-out`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative p-4 sm:p-6 lg:p-8 rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-200/50 group-hover:-translate-y-1 h-full">
                {/* Icon */}
                <div className="mb-3 sm:mb-4 relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-500 group-hover:from-gray-900 group-hover:to-gray-800 group-hover:text-white transition-all duration-500">
                    {stat.icon}
                  </div>
                </div>

                {/* Counter */}
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-black tracking-tight">
                      {stat.prefix}
                      {counters[index]}
                    </span>
                    <span className="text-base sm:text-lg lg:text-xl font-light text-black">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-10 sm:w-12 h-[2px] bg-gray-50 rounded-full mb-2 sm:mb-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-1000"
                    style={{
                      width: isVisible ? "100%" : "0%",
                      transitionDelay: `${index * 200}ms`,
                    }}
                  />
                </div>

                {/* Label */}
                <p className="text-[10px] sm:text-xs text-black font-light tracking-wide">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
