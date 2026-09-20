"use client";

import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  type LucideIcon,
} from "lucide-react";
import ContactHero from "@/Components/Contactus/ContactususHero";
import ContactUsForm from "@/Components/Contactus/ContactUsForm";

/* ------------------------------------------------------------------ */
/* Design tokens (kept close to usage for easy re-theming)            */
/* ------------------------------------------------------------------ */
const TOKENS = {
  ink: "#0B1220",
  navy: "#142A54",
  navyDeep: "#0E1E40",
  blue: "#2F6FED",
  slate: "#5B6472",
  line: "#E6E9EE",
  surface: "#F7F8FA",
};

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
interface ContactCardData {
  icon: LucideIcon;
  label: string;
  primary: string;
  secondary: string;
  href: string;
}

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
}

interface ContactCardProps {
  card: ContactCardData;
  index: number;
}

/* ------------------------------------------------------------------ */
/* Static content                                                     */
/* ------------------------------------------------------------------ */
const CONTACT_CARDS: ContactCardData[] = [
  {
    icon: Phone,
    label: "Call us",
    primary: "+91 7008308543",
    secondary: "Mon–Fri, 8:00–19:00 CST",
    href: "tel:+91 7008308543",
  },
  {
    icon: Mail,
    label: "Email us",
    primary: "growwyldtech@gmail.com",
    secondary: "We reply within one business day",
    href: "mailto:growwyldtech@gmail.com",
  },
  {
    icon: Building2,
    label: "Visit headquarters",
    primary: "Nayapalli, Bhubaneswar, Odisha",
    secondary: "",
    href: "#",
  },
  {
    icon: Clock,
    label: "Support desk",
    primary: "24/7 for managed clients",
    secondary: "Priority response under 15 min",
    href: "#",
  },
];

/* ------------------------------------------------------------------ */
/* Motion variants                                                    */
/* ------------------------------------------------------------------ */
const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

function SectionHeading({
  kicker,
  title,
  sub,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {kicker && (
        <p className="text-sm font-medium mb-3" style={{ color: TOKENS.blue }}>
          {kicker}
        </p>
      )}
      <h2
        className="font-display font-semibold tracking-tight text-3xl sm:text-4xl"
        style={{ color: TOKENS.ink }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="mt-4 max-w-xl text-base leading-relaxed"
          style={{
            color: TOKENS.slate,
            marginInline: align === "center" ? "auto" : undefined,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function ContactCard({ card, index }: ContactCardProps) {
  const Icon = card.icon;
  return (
    <motion.a
      href={card.href}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col gap-4 rounded-2xl border bg-white p-6 sm:p-7 transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(20,42,84,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={
        {
          borderColor: TOKENS.line,
          "--tw-ring-color": TOKENS.blue,
        } as React.CSSProperties
      }
    >
      <span
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5"
        style={{ backgroundColor: TOKENS.surface }}
      >
        <Icon
          className="h-5 w-5"
          style={{ color: TOKENS.navy }}
          strokeWidth={1.75}
        />
      </span>
      <div>
        <p className="text-sm font-medium" style={{ color: TOKENS.slate }}>
          {card.label}
        </p>
        <p
          className="mt-1.5 font-display text-lg font-semibold"
          style={{ color: TOKENS.ink }}
        >
          {card.primary}
        </p>
        <p className="mt-1 text-sm" style={{ color: TOKENS.slate }}>
          {card.secondary}
        </p>
      </div>
      <ArrowUpRight
        className="absolute right-6 top-6 h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ color: TOKENS.blue }}
      />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                          */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroShift = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div className="min-h-screen bg-white" style={{ color: TOKENS.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        body, .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="font-body">
        {/* ---------------------------------------------------------- */}
        {/* Minimal header                                              */}
        {/* ---------------------------------------------------------- */}
        <header className="border-b" style={{ borderColor: TOKENS.line }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
            <a href="#" className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                style={{ backgroundColor: TOKENS.navy }}
              >
                N
              </span>
              <span className="font-display text-[17px] font-semibold">
                Northstack
              </span>
            </a>
            <a
              href="tel:+15128840192"
              className="hidden items-center gap-2 text-sm font-medium sm:flex"
              style={{ color: TOKENS.slate }}
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              +1 (512) 884-0192
            </a>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/* Hero                                                        */}
        {/* ---------------------------------------------------------- */}
        <section ref={heroRef} className="relative overflow-hidden">
          <ContactHero />
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Contact info cards                                          */}
        {/* ---------------------------------------------------------- */}
        <section className="mx-auto max-w-7xl px-6 pb-4 sm:px-10">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CONTACT_CARDS.map((card, i) => (
              <ContactCard card={card} index={i} key={card.label} />
            ))}
          </motion.div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* Form + supporting panel                                     */}
        {/* ---------------------------------------------------------- */}
        <section
          id="contact-form"
          className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32"
        >
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-2"
            >
              <SectionHeading
                kicker="Get in touch"
                title="Tell us about your project"
                sub="Whether it's a full infrastructure overhaul or a single security audit, we start every engagement with a scoping call — free, no obligation."
              />

              <ul className="mt-10 space-y-5">
                {[
                  "Response within one business day",
                  "Direct line to a senior engineer, not a queue",
                  "Fixed-scope proposal within one week",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 flex-shrink-0"
                      style={{ color: TOKENS.blue }}
                      strokeWidth={1.75}
                    />
                    <span
                      className="text-[15px]"
                      style={{ color: TOKENS.slate }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-10 rounded-2xl border p-6"
                style={{
                  borderColor: TOKENS.line,
                  backgroundColor: TOKENS.surface,
                }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: TOKENS.ink }}
                >
                  Prefer to talk it through first?
                </p>
                <p className="mt-1.5 text-sm" style={{ color: TOKENS.slate }}>
                  Call our front desk and we'll route you to the right team the
                  same day.
                </p>
                <a
                  href="tel:+15128840192"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: TOKENS.blue }}
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  +1 (512) 884-0192
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-3"
            >
              <ContactUsForm />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
