"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { FiMenu, FiX, FiChevronDown, FiArrowUpRight } from "react-icons/fi";

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  { name: "Web Development", href: "/services/web-development", icon: "🌐" },
  { name: "Mobile App Development", href: "/services/mobile-app", icon: "📱" },
  { name: "Ecommerce Solution", href: "/services/ecommerce", icon: "🛒" },
  { name: "Cloud & DevOps", href: "/services/cloud-devops", icon: "☁️" },
  { name: "UI/UX Design", href: "/services/ui-ux-design", icon: "🎨" },
  {
    name: "Digital Marketing",
    href: "/services/digital-marketing",
    icon: "📣",
  },
  { name: "Data Analytics", href: "/services/data-analytics", icon: "📊" },
  { name: "Enterprise Solutions", href: "/services/enterprise", icon: "🏢" },
  {
    name: "Business Applications",
    href: "/services/business-applications",
    icon: "💼",
  },
];

const resources = [
  {
    name: "Blogs",
    href: "/resources/blogs",
    icon: "📝",
    desc: "Insights & industry news",
  },
  {
    name: "Ebooks",
    href: "/resources/ebooks",
    icon: "📚",
    desc: "In-depth guides to download",
  },
  {
    name: "Gallery",
    href: "/resources/gallery",
    icon: "🖼️",
    desc: "Work we're proud of",
  },
  {
    name: "Testimonials",
    href: "/resources/testimonials",
    icon: "⭐",
    desc: "What our clients say",
  },
];

const industries = [
  { name: "Healthcare", href: "/industries/healthcare", icon: "🏥" },
  { name: "Finance & Banking", href: "/industries/finance", icon: "🏦" },
  { name: "Education", href: "/industries/education", icon: "🎓" },
  { name: "Retail & Ecommerce", href: "/industries/retail", icon: "🛍️" },
  { name: "Real Estate", href: "/industries/real-estate", icon: "🏗️" },
  { name: "Manufacturing", href: "/industries/manufacturing", icon: "🏭" },
  {
    name: "Logistics & Supply Chain",
    href: "/industries/logistics",
    icon: "🚚",
  },
  { name: "Travel & Hospitality", href: "/industries/travel", icon: "✈️" },
  { name: "Media & Entertainment", href: "/industries/media", icon: "🎬" },
];

type DropdownKey = "services" | "resources" | "industries" | null;

// ─── Easing constant ──────────────────────────────────────────────────────────
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DUR = "0.5s";

// ─── Navbar ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Drawer refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false); // keeps drawer in DOM during close animation
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Entrance animation ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const el = navRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { y: -90, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.05 },
    );
  }, [mounted]);

  // ── Scroll listener ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // ── Dropdown open animation (desktop mega menus) ────────────────────────
  useEffect(() => {
    if (!activeDropdown) return;
    const panel = dropdownRefs.current[activeDropdown];
    if (!panel) return;
    gsap.fromTo(
      panel,
      { opacity: 0, y: 10, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" },
    );
  }, [activeDropdown]);

  // ── Drawer open/close: mount, animate, unmount ──────────────────────────
  useEffect(() => {
    if (!mounted) return;

    if (mobileOpen) {
      setDrawerMounted(true);
      return;
    }

    // closing: only animate out if it was actually mounted/open before
    if (!drawerMounted) return;

    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    if (!overlay || !drawer) {
      setDrawerMounted(false);
      return;
    }

    // 🔧 SLOWED DOWN CLOSE ANIMATION — was 0.4s / 0.35s with "power3.in" / "power2.in"
    const tl = gsap.timeline({
      onComplete: () => setDrawerMounted(false),
    });
    tl.to(drawer, { x: "100%", duration: 0.9, ease: "power2.inOut" }, 0).to(
      overlay,
      { opacity: 0, duration: 0.75, ease: "power2.inOut" },
      0.05, // overlay lingers slightly behind the drawer for a softer feel
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen, mounted]);

  // Animate the drawer IN once it's mounted in the DOM
  useEffect(() => {
    if (!drawerMounted || !mobileOpen) return;
    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    if (!overlay || !drawer) return;

    gsap.set(drawer, { x: "100%" });
    gsap.set(overlay, { opacity: 0 });

    // 🔧 SLOWED DOWN OPEN ANIMATION — was 0.3s / 0.45s with "power2.out" / "power3.out"
    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.7, ease: "power2.out" }, 0).to(
      drawer,
      { x: "0%", duration: 0.9, ease: "power3.out" },
      0.05, // drawer starts a beat after overlay fades in, feels less abrupt
    );
  }, [drawerMounted, mobileOpen]);

  // ── Lock body scroll while drawer is open ───────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const original = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [mobileOpen, mounted]);

  // ── Close drawer on Escape ───────────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  // ── Reset accordion state when drawer fully closes ──────────────────────
  useEffect(() => {
    if (!drawerMounted) setMobileExpanded(null);
  }, [drawerMounted]);

  // ── Outside click (desktop mega menus only) ─────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mounted]);

  // ── Hover helpers (desktop mega menus) ───────────────────────────────────
  const handleEnter = (key: DropdownKey) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveDropdown(key);
  };
  const handleLeave = () => {
    leaveTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const closeDrawer = () => setMobileOpen(false);

  const s = mounted && scrolled; // shorthand: "is scrolled"

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50"
      style={{
        paddingTop: s ? "0px" : "12px",
        paddingLeft: s ? "0px" : "12px",
        paddingRight: s ? "0px" : "12px",
        transition: `padding-top ${DUR} ${EASE}, padding-left ${DUR} ${EASE}, padding-right ${DUR} ${EASE}`,
      }}
    >
      <div
        style={{
          maxWidth: s ? "100%" : "80rem",
          margin: "0 auto",
          transition: `max-width ${DUR} ${EASE}`,
        }}
      >
        {/* ── The nav card ── */}
        <nav
          style={{
            backgroundColor: "#ffffff",
            borderRadius: s ? "0px" : "16px",
            boxShadow: s
              ? "0 1px 0 0 rgba(0,0,0,0.10)"
              : "0 20px 40px -8px rgba(0,0,0,0.15)",
            borderTopWidth: s ? "0px" : "1px",
            borderLeftWidth: s ? "0px" : "1px",
            borderRightWidth: s ? "0px" : "1px",
            borderBottomWidth: "1px",
            transition: [
              `border-radius  ${DUR} ${EASE}`,
              `box-shadow     ${DUR} ${EASE}`,
              `border-top-width    ${DUR} ${EASE}`,
              `border-left-width   ${DUR} ${EASE}`,
              `border-right-width  ${DUR} ${EASE}`,
            ].join(", "),
          }}
        >
          {/* ── Top bar ── */}
          <div
            className="flex items-center justify-between gap-4"
            style={{
              paddingTop: s ? "12px" : "20px",
              paddingBottom: s ? "12px" : "20px",
              paddingLeft: s ? "48px" : "20px",
              paddingRight: s ? "48px" : "20px",
              transition: [
                `padding-top    ${DUR} ${EASE}`,
                `padding-bottom ${DUR} ${EASE}`,
                `padding-left   ${DUR} ${EASE}`,
                `padding-right  ${DUR} ${EASE}`,
              ].join(", "),
            }}
          >
            {/* Logo */}
            <Link href="/" className="shrink-0 z-10">
              <Image
                src="/logo.png"
                width={150}
                height={42}
                alt="Company Logo"
                priority
              />
            </Link>

            {/* ── Desktop Links ── */}
            <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium text-black">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>

              {/* Services */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter("services")}
                onMouseLeave={handleLeave}
              >
                <DropdownTrigger
                  label="Services"
                  open={activeDropdown === "services"}
                />
                {activeDropdown === "services" && (
                  <div
                    ref={(el) => {
                      dropdownRefs.current["services"] = el;
                    }}
                    onMouseEnter={() => handleEnter("services")}
                    onMouseLeave={handleLeave}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-6 origin-top"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-4 px-1">
                      What We Do
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {services.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center gap-3 rounded-xl p-3 hover:bg-white/50 transition-all duration-150"
                        >
                          <span className="text-lg leading-none group-hover:scale-110 transition-transform duration-150">
                            {item.icon}
                          </span>
                          <span className="text-sm font-medium text-black group-hover:text-green-600 transition-colors leading-snug">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/30 flex items-center justify-between">
                      <p className="text-xs text-black/40">
                        Need something custom?
                      </p>
                      <Link
                        href="/contact"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-semibold text-black hover:text-green-600 flex items-center gap-1 transition-colors"
                      >
                        Talk to us <FiArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/products">Products</NavLink>

              {/* Industries */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter("industries")}
                onMouseLeave={handleLeave}
              >
                <DropdownTrigger
                  label="Industries"
                  open={activeDropdown === "industries"}
                />
                {activeDropdown === "industries" && (
                  <div
                    ref={(el) => {
                      dropdownRefs.current["industries"] = el;
                    }}
                    onMouseEnter={() => handleEnter("industries")}
                    onMouseLeave={handleLeave}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[700px] rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-6 origin-top"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-4 px-1">
                      Industries We Serve
                    </p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {industries.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center gap-3 rounded-xl p-3 hover:bg-white/50 transition-all duration-150"
                        >
                          <span className="text-lg leading-none group-hover:scale-110 transition-transform duration-150">
                            {item.icon}
                          </span>
                          <span className="text-sm font-medium text-black group-hover:text-green-600 transition-colors leading-snug">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-white/30 flex items-center justify-between">
                      <p className="text-xs text-black/40">
                        Don't see your industry?
                      </p>
                      <Link
                        href="/contact"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-semibold text-black hover:text-green-600 flex items-center gap-1 transition-colors"
                      >
                        Let's talk <FiArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/works">Our Works</NavLink>

              {/* Resources */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter("resources")}
                onMouseLeave={handleLeave}
              >
                <DropdownTrigger
                  label="Resources"
                  open={activeDropdown === "resources"}
                />
                {activeDropdown === "resources" && (
                  <div
                    ref={(el) => {
                      dropdownRefs.current["resources"] = el;
                    }}
                    onMouseEnter={() => handleEnter("resources")}
                    onMouseLeave={handleLeave}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/30 p-5 origin-top"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-4 px-1">
                      Explore
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {resources.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 rounded-xl p-3 hover:bg-white/50 transition-all duration-150"
                        >
                          <span className="text-lg leading-none mt-0.5 group-hover:scale-110 transition-transform duration-150">
                            {item.icon}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-black group-hover:text-green-600 transition-colors">
                              {item.name}
                            </p>
                            <p className="text-xs text-black/50 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="hidden lg:block shrink-0">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold overflow-hidden bg-[#05c954] text-white shadow-[0_12px_35px_rgba(5,201,84,.35)] hover:shadow-[0_18px_45px_rgba(5,201,84,.55)] hover:-translate-y-1 active:scale-95 transition-all duration-500"
              >
                <span className="relative z-10">Contact Us</span>
                <FiArrowUpRight
                  size={15}
                  className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                />
                <span className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-500 bg-white/20 pointer-events-none" />
              </Link>
            </div>

            {/* ── Hamburger (mobile + tablet) ── */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden relative flex items-center justify-center w-14 h-14 rounded-full bg-[#05c954] text-white shadow-[0_0_30px_rgba(5,201,84,0.35)] hover:bg-[#04b44b] hover:shadow-[0_0_45px_rgba(5,201,84,0.55)] hover:scale-110 transition-all duration-300 active:scale-95"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <FiMenu size={24} />
            </button>
          </div>

          {/* ── Progress bar (fades in on scroll) ── */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(34,197,94,0.5), transparent)",
              opacity: s ? 1 : 0,
              transition: `opacity ${DUR} ${EASE}`,
            }}
          />
        </nav>
      </div>

      {/* ── Mobile / Tablet Drawer (right → left slide-in) ── */}
      {drawerMounted && (
        <>
          {/* Backdrop */}
          <div
            ref={overlayRef}
            onClick={closeDrawer}
            className="lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            style={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="lg:hidden fixed top-0 right-0 z-[70] h-[100dvh] w-[86%] max-w-sm bg-white shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.35)] flex flex-col"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 shrink-0">
              <Link href="/" onClick={closeDrawer} className="shrink-0">
                <Image
                  src="/logo.png"
                  width={120}
                  height={34}
                  alt="Company Logo"
                />
              </Link>
              <button
                onClick={closeDrawer}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-black/5 text-black hover:bg-black/10 active:scale-95 transition-all duration-200"
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Drawer scrollable content */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 flex flex-col gap-1 text-sm font-medium text-black"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <MobileLink href="/" onClick={closeDrawer}>
                Home
              </MobileLink>
              <MobileLink href="/about" onClick={closeDrawer}>
                About
              </MobileLink>

              <MobileAccordion
                label="Services"
                open={mobileExpanded === "services"}
                onToggle={() =>
                  setMobileExpanded((p) =>
                    p === "services" ? null : "services",
                  )
                }
              >
                {services.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl hover:bg-black/5 text-black transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </MobileAccordion>

              <MobileLink href="/products" onClick={closeDrawer}>
                Products
              </MobileLink>

              <MobileAccordion
                label="Industries"
                open={mobileExpanded === "industries"}
                onToggle={() =>
                  setMobileExpanded((p) =>
                    p === "industries" ? null : "industries",
                  )
                }
              >
                {industries.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl hover:bg-black/5 text-black transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </MobileAccordion>

              <MobileLink href="/works" onClick={closeDrawer}>
                Our Works
              </MobileLink>

              <MobileAccordion
                label="Resources"
                open={mobileExpanded === "resources"}
                onToggle={() =>
                  setMobileExpanded((p) =>
                    p === "resources" ? null : "resources",
                  )
                }
              >
                {resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl hover:bg-black/5 text-black transition-colors"
                  >
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <p className="text-black/80">{item.name}</p>
                      <p className="text-xs text-black/40 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </MobileAccordion>
            </div>

            {/* Drawer footer CTA (sticky at bottom) */}
            <div className="shrink-0 px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-black/10">
              <Link
                href="/contact"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#05c954] py-3.5 text-white font-semibold shadow-lg shadow-green-500/20 hover:opacity-90 transition-opacity"
              >
                Contact Us <FiArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 rounded-xl text-black transition-colors duration-200 group"
    >
      {children}
      <span className="absolute bottom-1 left-4 right-4 h-[1.5px] rounded-full bg-gradient-to-r from-green-400 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
    </Link>
  );
}

function DropdownTrigger({ label, open }: { label: string; open: boolean }) {
  return (
    <button
      className={[
        "relative flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
        open
          ? "bg-white/20 text-black"
          : "text-black hover:text-green-600 hover:bg-white/10",
      ].join(" ")}
    >
      {label}
      <FiChevronDown
        size={14}
        className={`transition-transform duration-250 ${open ? "rotate-180 text-green-600" : ""}`}
      />
    </button>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2.5 rounded-xl text-black hover:bg-black/5 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          clearProps: "height",
        },
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div>
      <button
        onClick={onToggle}
        className={[
          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors",
          open ? "bg-black/5 text-black" : "text-black hover:bg-black/5",
        ].join(" ")}
      >
        <span>{label}</span>
        <FiChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180 text-green-600" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        style={{ height: 0, overflow: "hidden", opacity: 0 }}
      >
        <div className="pl-2 pt-1 pb-1 flex flex-col gap-0.5">{children}</div>
      </div>
    </div>
  );
}
