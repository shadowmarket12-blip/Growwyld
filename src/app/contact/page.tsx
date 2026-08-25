// components/ContactPage.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Navigation,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  User,
  Briefcase,
  Star,
  Shield,
  Award,
  Globe,
} from "lucide-react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// ---------------------------------------------------------------------------
// TiltCard — reusable GSAP-driven 3D mouse-tilt wrapper
// ---------------------------------------------------------------------------
const TiltCard = ({
  children,
  className = "",
  intensity = 10,
  glow = "#7C5CFC",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const glowX = useRef<gsap.QuickToFunc | null>(null);
  const glowY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    quickX.current = gsap.quickTo(cardRef.current, "rotateY", {
      duration: 0.6,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(cardRef.current, "rotateX", {
      duration: 0.6,
      ease: "power3.out",
    });
    glowX.current = gsap.quickTo(cardRef.current, "--mx", {
      duration: 0.3,
      ease: "power2.out",
    });
    glowY.current = gsap.quickTo(cardRef.current, "--my", {
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      quickY.current?.((0.5 - py) * intensity);
      quickX.current?.((px - 0.5) * intensity);
      glowX.current?.(px * 100);
      glowY.current?.(py * 100);
    },
    [intensity],
  );

  const handleLeave = useCallback(() => {
    quickX.current?.(0);
    quickY.current?.(0);
  }, []);

  return (
    <div style={{ perspective: 1000 }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`tilt-card relative ${className}`}
        style={
          {
            transformStyle: "preserve-3d",
            "--glow": glow,
          } as React.CSSProperties
        }
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 60%)",
            opacity: 0.08,
          }}
        />
        {children}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// ContactOrb — signature 3D orbiting visual
// ---------------------------------------------------------------------------
const ContactOrb = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!innerRef.current) return;
    quickX.current = gsap.quickTo(innerRef.current, "rotateY", {
      duration: 0.8,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(innerRef.current, "rotateX", {
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    quickX.current?.(px * 22);
    quickY.current?.(-py * 22);
  }, []);

  const handleLeave = useCallback(() => {
    quickX.current?.(0);
    quickY.current?.(0);
  }, []);

  const orbitItems = [
    { Icon: Mail, color: "#7C5CFC", angle: 0 },
    { Icon: Phone, color: "#2DD4BF", angle: 90 },
    { Icon: MessageSquare, color: "#FF6B9D", angle: 180 },
    { Icon: MapPin, color: "#FFB84D", angle: 270 },
  ];

  return (
    <div
      ref={stageRef}
      className="relative mx-auto contact-orb-stage"
      style={{ perspective: 1400 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <style>{`
        .contact-orb-stage { width: clamp(260px, 34vw, 400px); height: clamp(260px, 34vw, 400px); }
        @keyframes orb-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orb-spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes core-pulse {
          0%, 100% { box-shadow: 0 0 60px 10px rgba(124,92,252,0.25), inset 0 0 40px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 90px 18px rgba(124,92,252,0.4), inset 0 0 50px rgba(255,255,255,0.2); }
        }
        @keyframes core-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ring-drift { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .orbit-track { animation: orb-spin 24s linear infinite; }
        .contact-orb-stage:hover .orbit-track { animation-play-state: paused; }
        .orbit-face { animation: orb-spin-rev 24s linear infinite; }
        .contact-orb-stage:hover .orbit-face { animation-play-state: paused; }
        .ring-outer { animation: ring-drift 30s linear infinite; }
        .ring-inner { animation: ring-drift 22s linear infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .orbit-track, .orbit-face, .ring-outer, .ring-inner, .core-pulse { animation: none !important; }
        }
      `}</style>

      <div
        ref={innerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* soft grounding glow */}
        <div className="absolute w-2/3 h-2/3 rounded-full bg-[#7C5CFC]/10 blur-3xl" />

        {/* outer ring */}
        <div
          className="absolute ring-outer rounded-full"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(124,92,252,0.15)",
            background:
              "conic-gradient(from 0deg, #7C5CFC22, #2DD4BF22, #FF6B9D22, #FFB84D22, #7C5CFC22)",
            maskImage:
              "radial-gradient(circle, transparent 70%, black 71%, black 74%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 70%, black 71%, black 74%, transparent 75%)",
          }}
        />
        {/* inner dashed ring */}
        <div
          className="absolute ring-inner rounded-full"
          style={{
            width: "70%",
            height: "70%",
            border: "1.5px dashed rgba(124,92,252,0.2)",
          }}
        />

        {/* core */}
        <div
          className="relative rounded-full flex items-center justify-center core-pulse"
          style={{
            width: "34%",
            height: "34%",
            background:
              "linear-gradient(135deg, #7C5CFC 0%, #2DD4BF 45%, #FF6B9D 100%)",
            backgroundSize: "300% 300%",
            animation:
              "core-gradient 6s ease infinite, core-pulse 3.5s ease-in-out infinite",
          }}
        >
          <div
            className="absolute top-[14%] left-[18%] w-[36%] h-[26%] rounded-full opacity-70 blur-[2px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
            }}
          />
          <Sparkles className="w-1/3 h-1/3 text-white relative drop-shadow-lg" />
        </div>

        {/* orbiting channel icons */}
        <div className="absolute inset-0 orbit-track">
          {orbitItems.map(({ Icon, color, angle }, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: 0,
                height: 0,
                transform: `rotate(${angle}deg) translateY(calc(-1 * clamp(110px, 17vw, 170px)))`,
              }}
            >
              <div
                className="orbit-face"
                style={{ transform: `rotate(${-angle}deg)` }}
              >
                <div
                  className="flex items-center justify-center rounded-2xl backdrop-blur-md -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110"
                  style={{
                    width: "clamp(46px, 8vw, 58px)",
                    height: "clamp(46px, 8vw, 58px)",
                    background: `linear-gradient(135deg, ${color}20, rgba(255,255,255,0.8))`,
                    border: `1.5px solid ${color}50`,
                    boxShadow: `0 8px 24px -8px ${color}60`,
                  }}
                >
                  <Icon
                    style={{ width: "44%", height: "44%", color }}
                    strokeWidth={2.2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Contact Page
// ---------------------------------------------------------------------------
const ContactPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lenis smooth scroll
  useEffect(() => {
    if (!isMounted) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, [isMounted]);

  // GSAP entrance animations
  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(".hero-orb", {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: "power3.out",
      });

      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: ".stats-bar",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".form-card", {
        scrollTrigger: {
          trigger: ".form-card",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".info-card", {
        scrollTrigger: {
          trigger: ".info-stack",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".form-field", {
        scrollTrigger: {
          trigger: ".form-card",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`,
    );
    const mailtoLink = `mailto:hello@growwyld.com?subject=${subject}&body=${body}`;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  if (!isMounted) {
    return <div className="relative min-h-screen bg-white" />;
  }

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="relative min-h-screen overflow-x-hidden bg-white text-stone-900"
    >
      <style>{`
        @keyframes aurora-drift-1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.1); } }
        @keyframes aurora-drift-2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-35px,30px) scale(1.08); } }
        @keyframes aurora-drift-3 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,25px) scale(1.06); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.5; } }
        .aurora-1 { animation: aurora-drift-1 14s ease-in-out infinite; }
        .aurora-2 { animation: aurora-drift-2 16s ease-in-out infinite; }
        .aurora-3 { animation: aurora-drift-3 12s ease-in-out infinite; }
        .star { animation: twinkle 3.5s ease-in-out infinite; }
        .glass {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.08);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .glass-input {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(0,0,0,0.1);
        }
        .glass-input:focus { border-color: #7C5CFC; background: rgba(255,255,255,1); box-shadow: 0 0 0 3px rgba(124,92,252,0.1); }
        @media (prefers-reduced-motion: reduce) {
          .aurora-1, .aurora-2, .aurora-3, .star { animation: none !important; }
        }
      `}</style>

      {/* Premium aurora background - light version */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#7C5CFC]/10 blur-[120px] aurora-1" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#2DD4BF]/10 blur-[120px] aurora-2" />
        <div className="absolute top-[35%] left-[45%] w-[400px] h-[400px] rounded-full bg-[#FF6B9D]/8 blur-[110px] aurora-3" />

        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* twinkling stars */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute star rounded-full bg-stone-400"
            style={{
              width: 2,
              height: 2,
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.6}s`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="w-full max-w-6xl mx-auto">
          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16 md:mb-20">
            <div className="text-center lg:text-left">
              <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-6">
                <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
                <span className="text-xs font-medium text-stone-700 tracking-wide">
                  LET&apos;S BUILD SOMETHING GREAT
                </span>
              </div>

              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-stone-900">
                Get in{" "}
                <span className="bg-gradient-to-r from-[#7C5CFC] via-[#FF6B9D] to-[#2DD4BF] bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>

              <p className="hero-subtitle text-stone-600 text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                Growwyld Tech is ready to help you turn your next idea into a
                high-performing digital product. Reach out and let&apos;s talk.
              </p>
            </div>

            <div className="hero-orb flex justify-center">
              <ContactOrb />
            </div>
          </div>

          {/* Stats bar */}
          <div className="stats-bar mb-12 md:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Star,
                  value: "4.9/5",
                  label: "Client Rating",
                  color: "#FFB84D",
                },
                {
                  icon: Shield,
                  value: "500+",
                  label: "Projects Delivered",
                  color: "#7C5CFC",
                },
                {
                  icon: Award,
                  value: "15+",
                  label: "Years Experience",
                  color: "#FF6B9D",
                },
                {
                  icon: Globe,
                  value: "20+",
                  label: "Countries Served",
                  color: "#2DD4BF",
                },
              ].map((item, index) => (
                <TiltCard
                  key={index}
                  className="stat-item"
                  glow={item.color}
                  intensity={8}
                >
                  <div className="glass rounded-2xl p-5 md:p-6">
                    <item.icon
                      className="w-5 h-5 md:w-6 md:h-6 mb-2 md:mb-3"
                      style={{ color: item.color }}
                    />
                    <p className="text-lg md:text-2xl font-bold text-stone-900 mb-1">
                      {item.value}
                    </p>
                    <p className="text-xs md:text-sm text-stone-500">
                      {item.label}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Main grid — form + info stack */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Form */}
            <TiltCard
              className="form-card lg:col-span-3"
              glow="#7C5CFC"
              intensity={4}
            >
              <div className="glass rounded-3xl p-6 md:p-10">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">
                      Send us a Message
                    </h2>
                    <p className="text-xs md:text-sm text-stone-500">
                      Fill out the form below and we&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="form-field">
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-all duration-300"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-all duration-300"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="form-field">
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-all duration-300"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label className="block text-xs font-medium text-stone-700 mb-1.5">
                          Subject *
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-all duration-300"
                            placeholder="Project Inquiry"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="block text-xs font-medium text-stone-700 mb-1.5">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg glass-input text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#7C5CFC] transition-all duration-300 resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn w-full mt-6 relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#7C5CFC] via-[#FF6B9D] to-[#2DD4BF] text-white font-semibold text-sm py-3 hover:shadow-lg hover:shadow-[#7C5CFC]/30 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Opening Email...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Email Client Opened!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </div>
            </TiltCard>

            {/* Info stack */}
            <div className="info-stack lg:col-span-2 flex flex-col gap-4">
              <TiltCard className="info-card" glow="#7C5CFC" intensity={8}>
                <a
                  href="mailto:hello@growwyld.com"
                  className="group glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#7C5CFC]/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#7C5CFC]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-stone-900 mb-0.5">
                      Email Us
                    </h3>
                    <p className="text-xs text-stone-500">hello@growwyld.com</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#7C5CFC] group-hover:translate-x-1 transition-all" />
                </a>
              </TiltCard>

              <TiltCard className="info-card" glow="#2DD4BF" intensity={8}>
                <a
                  href="tel:+919876543210"
                  className="group glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#2DD4BF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-stone-900 mb-0.5">
                      Call Us
                    </h3>
                    <p className="text-xs text-stone-500">+91 98765 43210</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#2DD4BF] group-hover:translate-x-1 transition-all" />
                </a>
              </TiltCard>

              <TiltCard className="info-card" glow="#FF6B9D" intensity={8}>
                <a
                  href="https://maps.google.com/?q=20.2961,85.8245"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FF6B9D]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#FF6B9D]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-stone-900 mb-0.5">
                      Visit Us
                    </h3>
                    <p className="text-xs text-stone-500">
                      Baramunda, Bhubaneswar
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#FF6B9D] group-hover:translate-x-1 transition-all" />
                </a>
              </TiltCard>

              {/* Map preview card */}
              <TiltCard
                className="info-card flex-1"
                glow="#FFB84D"
                intensity={5}
              >
                <div className="glass rounded-2xl p-5 relative overflow-hidden min-h-[180px] flex flex-col justify-between">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="relative flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FFB84D]" />
                    <span className="text-xs text-stone-600">
                      Average response time: under 24 hours
                    </span>
                  </div>
                  <a
                    href="https://www.google.com/maps?q=20.2961,85.8245"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative self-start mt-4 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7C5CFC] to-[#2DD4BF] text-white font-semibold text-xs shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
