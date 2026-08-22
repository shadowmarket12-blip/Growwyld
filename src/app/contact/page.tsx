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
  Heart,
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

  // Initialize Lenis smooth scroll
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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, [isMounted]);

  // GSAP Animations
  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animations
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

      // Stats bar animation
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

      // Main content animation
      gsap.from(".main-content", {
        scrollTrigger: {
          trigger: ".main-content",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Form fields animation
      gsap.from(".form-field", {
        scrollTrigger: {
          trigger: ".main-content",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
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
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  if (!isMounted) {
    return <div className="relative min-h-screen bg-[#fafafa]" />;
  }

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen overflow-x-hidden bg-[#fafafa]"
    >
      {/* Subtle Luxury Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl" />

        {/* Fine Lines Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 100px), repeating-linear-gradient(90deg, #000, #000 1px, transparent 1px, transparent 100px)",
          }}
        />
      </div>

      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="w-full max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-gray-700 tracking-wide">
                PREMIUM CONTACT EXPERIENCE
              </span>
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Let's Create{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Something Great
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7C50 2 150 2 198 7"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
              </span>
            </h1>

            <p className="hero-subtitle text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              We're here to help you achieve your goals. Reach out to us and
              let's start a conversation about your next project.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar mb-12 md:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Star, value: "4.9/5", label: "Client Rating" },
                { icon: Shield, value: "500+", label: "Projects Delivered" },
                { icon: Award, value: "15+", label: "Years Experience" },
                { icon: Globe, value: "20+", label: "Countries Served" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="stat-item relative overflow-hidden rounded-2xl bg-white p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 mb-2 md:mb-3" />
                    <p className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
                      {item.value}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content - Unified Luxury Card */}
          <div className="main-content">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-xl overflow-hidden">
              {/* Top Section with Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-100">
                <a
                  href="mailto:hello@growwyld.com"
                  className="group p-6 md:p-8 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-transparent transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
                        Email Us
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        hello@growwyld.com
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                <a
                  href="tel:+919876543210"
                  className="group p-6 md:p-8 hover:bg-gradient-to-br hover:from-teal-50 hover:to-transparent transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
                        Call Us
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        +91 98765 43210
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=20.2961,85.8245"
                  target="_blank"
                  className="group p-6 md:p-8 hover:bg-gradient-to-br hover:from-blue-50 hover:to-transparent transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
                        Visit Us
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        Baramunda, Bhubaneswar
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              </div>

              {/* Bottom Section with Form and Map */}
              <div className="grid lg:grid-cols-2">
                {/* Form Section */}
                <div className="p-6 md:p-10 lg:border-r border-gray-100">
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                        Send us a Message
                      </h2>
                      <p className="text-xs md:text-sm text-gray-600">
                        Fill out the form below and we'll get back to you within
                        24 hours.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="form-field">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="form-field">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Subject *
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                              placeholder="Project Inquiry"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-field">
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          Message *
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Tell us about your project..."
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="submit-btn w-full mt-6 relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm py-3 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
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

                {/* Map Section */}
                <div className="relative min-h-[400px] lg:min-h-full bg-gray-50">
                  {/* Map Background */}
                  <div className="absolute inset-0">
                    {/* Grid Pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage:
                          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />

                    {/* Roads */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 600 600"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 100 0 L 100 600"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M 300 0 L 300 600"
                        stroke="#f3f4f6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 500 0 L 500 600"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M 0 150 L 600 150"
                        stroke="#f3f4f6"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 0 350 L 600 350"
                        stroke="#e5e7eb"
                        strokeWidth="3"
                      />
                      <path
                        d="M 0 500 L 600 500"
                        stroke="#f3f4f6"
                        strokeWidth="1.5"
                      />
                    </svg>

                    {/* Location Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                      <div className="relative">
                        <div className="absolute -inset-4 rounded-full bg-emerald-500/10 animate-ping" />
                        <div
                          className="absolute -inset-8 rounded-full bg-emerald-500/5 animate-ping"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <div className="relative w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-8 bg-gradient-to-b from-emerald-600 to-transparent" />
                      </div>

                      <div className="absolute top-full mt-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-lg">
                          <p className="font-semibold text-gray-900 text-sm">
                            Baramunda
                          </p>
                          <p className="text-gray-600 text-xs">
                            Bhubaneswar, Odisha
                          </p>
                          <p className="text-emerald-600 text-xs font-medium mt-1">
                            📍 Main Office
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                        +
                      </button>
                      <button className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                        −
                      </button>
                      <button className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all shadow-sm">
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Get Directions Button */}
                    <a
                      href="https://www.google.com/maps?q=20.2961,85.8245"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 md:mt-16">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                We'd Love to Hear From You!
              </h3>
              <p className="text-gray-600 text-xs md:text-sm max-w-md">
                Whether you have a question about our services, pricing, or
                anything else, our team is ready to answer all your questions.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-gray-600">
                  Average response time: Under 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
