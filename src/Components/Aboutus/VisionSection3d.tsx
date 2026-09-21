"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Fraunces, Inter } from "next/font/google";
import "./VisionSection3D.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

interface CardDimensions {
  width?: string;
  maxWidth?: string;
  marginLeft?: string;
  marginRight?: string;
  marginTop?: string;
}

interface Position {
  x: number;
  y: number;
}

const VisionSection3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth >= 640 && window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  // Mouse position for 3D tilt (disabled on mobile/tablet)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.innerWidth < 1024) return; // Disable on mobile/tablet

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return; // Explicitly check for null/undefined

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 100,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });

  // Show cards when section is in view
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value: number) => {
      if (value > 0.15 && value < 0.85) {
        setShowCards(true);
      } else {
        setShowCards(false);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Auto-play cards (only for desktop)
  useEffect(() => {
    if (!isAutoPlaying || !showCards || isMobile || isTablet) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, showCards, isMobile, isTablet]);

  interface VisionCard {
    icon: string;
    title: string;
    desc: string;
    color: string;
    accentColor: string;
    backgroundImage: string;
  }

  const visionCards: VisionCard[] = [
    {
      icon: "🎯",
      title: "The Vision",
      desc: "At Growwyld Tech, we believe technology should empower growth, create opportunities, and make it easier for businesses to achieve their goals.",
      color: "#1B4332",
      accentColor: "#00B7C3",
      backgroundImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    },
    {
      icon: "🚀",
      title: "Future Growth",
      desc: "Our vision is to become a trusted technology and digital growth partner for businesses across Odisha and India.",
      color: "#00B7C3",
      accentColor: "#1B4332",
      backgroundImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    },
    {
      icon: "💡",
      title: "Our Commitment",
      desc: "We are committed to delivering practical solutions that create measurable value for your business.",
      color: "#113E6E",
      accentColor: "#00B7C3",
      backgroundImage:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80",
    },
  ];

  // Calculate positions for circular layout (desktop only)
  const getCircularPosition = (index: number, totalCards: number): Position => {
    const angleStep = (2 * Math.PI) / totalCards;
    const angle = index * angleStep - Math.PI / 2;
    const radius = 220;
    const flattenFactor = 0.6;

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * flattenFactor,
    };
  };

  // Calculate positions for vertical layout (mobile/tablet)
  const getVerticalPosition = (index: number): Position => {
    if (isMobile) {
      return { x: 0, y: index * 180 - 180 };
    } else if (isTablet) {
      return { x: 0, y: index * 220 - 220 };
    }
    return { x: 0, y: 0 };
  };

  // Responsive card dimensions
  const getCardDimensions = (): CardDimensions => {
    if (isMobile) {
      return {
        width: "90%",
        maxWidth: "320px",
        marginLeft: "auto",
        marginRight: "auto",
      };
    } else if (isTablet) {
      return {
        width: "80%",
        maxWidth: "450px",
        marginLeft: "auto",
        marginRight: "auto",
      };
    } else {
      return { width: "320px", marginLeft: "-160px", marginTop: "-180px" };
    }
  };

  const cardDimensions = getCardDimensions();

  const isMobileOrTablet = isMobile || isTablet;

  return (
    <section
      ref={sectionRef}
      className={`${fraunces.variable} ${inter.variable} relative px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-40 overflow-hidden min-h-screen`}
      style={{
        background: "#0D1B2A",
      }}
    >
      {/* Background image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeCard}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
          style={{
            backgroundImage: `url(${visionCards[activeCard].backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: isMobileOrTablet ? "scroll" : "fixed",
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/50" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="h-0.5 bg-gradient-to-r from-white to-[#00B7C3]"
            />
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/90">
              Looking Ahead
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white max-w-3xl"
          >
            Our Vision for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00B7C3]">
              Future
            </span>
          </motion.h2>
        </motion.div>

        {/* Cards Container */}
        {isMobileOrTablet ? (
          // Mobile/Tablet Vertical Layout
          <div className="flex flex-col items-center gap-4 sm:gap-6 px-4">
            {visionCards.map((card, index) => {
              const isActive = activeCard === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-full cursor-pointer"
                  style={{
                    maxWidth: cardDimensions.maxWidth,
                  }}
                  onClick={() => setActiveCard(index)}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative rounded-2xl p-4 sm:p-6 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: `2px solid ${card.color}`,
                      boxShadow: isActive
                        ? `0 15px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px ${card.accentColor}60`
                        : "0 10px 20px rgba(0, 0, 0, 0.4)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                  >
                    {/* Animated border */}
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `linear-gradient(90deg, ${card.color}, ${card.accentColor}, ${card.color})`,
                        backgroundSize: "200% 100%",
                        animation: isActive
                          ? "gradientMove 4s linear infinite"
                          : "none",
                        opacity: 0.15,
                      }}
                    />

                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <motion.div
                        animate={{
                          rotate: isActive ? 360 : 0,
                        }}
                        transition={{
                          duration: 15,
                          repeat: isActive ? Infinity : 0,
                          ease: "linear",
                        }}
                        className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0"
                        style={{
                          filter: `drop-shadow(0 0 15px ${card.accentColor}80)`,
                        }}
                      >
                        {card.icon}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-[family-name:var(--font-display)] text-base sm:text-lg md:text-xl font-bold mb-2"
                          style={{ color: card.color }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-sm leading-relaxed text-gray-700 font-[family-name:var(--font-body)]">
                          {card.desc}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator for active card */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-1"
                        style={{
                          background: `linear-gradient(90deg, ${card.color}, ${card.accentColor})`,
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 5,
                          ease: "linear",
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Desktop Circular Layout
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="relative h-[600px] md:h-[700px] flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* Center point indicator */}
            <div className="absolute left-1/2 top-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full bg-white/20" />

            {visionCards.map((card, index) => {
              const pos = getCircularPosition(index, visionCards.length);
              const isActive = activeCard === index;

              return (
                <motion.div
                  key={index}
                  initial={{
                    x: -600,
                    y: 0,
                    opacity: 0,
                    scale: 0.3,
                    rotate: -90,
                  }}
                  animate={{
                    x: showCards ? pos.x : -600,
                    y: showCards ? pos.y : 0,
                    opacity: showCards ? (isActive ? 1 : 0.7) : 0,
                    scale: showCards ? (isActive ? 1.15 : 0.85) : 0.3,
                    rotate: showCards ? 0 : -90,
                    zIndex: isActive ? 10 : 1,
                  }}
                  transition={{
                    duration: 1.8,
                    delay: index * 0.4,
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                  }}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{
                    marginLeft: cardDimensions.marginLeft,
                    marginTop: cardDimensions.marginTop,
                    width: cardDimensions.width,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => {
                    setActiveCard(index);
                    setIsAutoPlaying(false);
                  }}
                >
                  <motion.div
                    animate={{
                      rotateX: isActive && showCards ? rotateX.get() : 0,
                      rotateY: isActive && showCards ? rotateY.get() : 0,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative rounded-3xl p-8 overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      border: `3px solid ${card.color}`,
                      boxShadow: isActive
                        ? `0 30px 60px -10px rgba(0, 0, 0, 0.6), 0 0 40px ${card.accentColor}60`
                        : "0 15px 30px rgba(0, 0, 0, 0.4)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      transform: isActive ? "scale(1.1)" : "scale(0.9)",
                      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {/* Animated border */}
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: `linear-gradient(90deg, ${card.color}, ${card.accentColor}, ${card.color})`,
                        backgroundSize: "200% 100%",
                        animation: isActive
                          ? "gradientMove 4s linear infinite"
                          : "none",
                        opacity: 0.15,
                      }}
                    />

                    {/* Icon with rotation */}
                    <motion.div
                      animate={{
                        rotate: isActive ? 360 : 0,
                        scale: isActive ? 1.2 : 1,
                      }}
                      transition={{
                        duration: 20,
                        repeat: isActive ? Infinity : 0,
                        ease: "linear",
                      }}
                      className="text-4xl md:text-5xl mb-6 inline-block"
                      style={{
                        filter: `drop-shadow(0 0 20px ${card.accentColor}80)`,
                      }}
                    >
                      {card.icon}
                    </motion.div>

                    <h3
                      className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold mb-4"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </h3>

                    <p className="text-xs md:text-sm leading-relaxed text-gray-700 font-[family-name:var(--font-body)]">
                      {card.desc}
                    </p>

                    {/* Progress indicator for active card */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-1"
                        style={{
                          background: `linear-gradient(90deg, ${card.color}, ${card.accentColor})`,
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 5,
                          ease: "linear",
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Card indicators */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {visionCards.map((card, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`${isMobile ? "h-1.5 sm:h-2" : "h-2"} rounded-full`}
              style={{
                backgroundColor:
                  activeCard === index
                    ? card.color
                    : "rgba(255, 255, 255, 0.3)",
                boxShadow:
                  activeCard === index
                    ? `0 0 15px ${card.accentColor}`
                    : "none",
              }}
              animate={{
                width:
                  activeCard === index
                    ? isMobile
                      ? 24
                      : 32
                    : isMobile
                      ? 12
                      : 16,
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>

        {/* Auto-play indicator - Only show on desktop */}
        {!isMobileOrTablet && (
          <div className="text-center mt-3 sm:mt-4">
            <motion.span
              className="text-xs text-white/60"
              animate={{
                opacity: isAutoPlaying ? [0.5, 1, 0.5] : 0.3,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {isAutoPlaying ? "● Auto-playing" : "○ Paused"}
            </motion.span>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisionSection3D;
