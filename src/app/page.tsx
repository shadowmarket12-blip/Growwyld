import { Metadata } from "next";
import FAQ from "@/Components/Faq/HomeFaq";
import CTASection from "@/Components/Home/HomeCTA";
import ProjectsSection from "@/Components/Home/HomeProject";
import Testimonials from "@/Components/Home/HomeTestimonial";
import Services from "@/Components/Home/Service";
import ServicesSection from "@/Components/Home/ServiceMain";
import StatisticsSection from "@/Components/Home/Statistics";
import WhyChooseSection from "@/Components/Home/WhyChooseUs";
import ProcessSection from "@/Components/Process/Process";
import TechStackSection from "@/Components/TechStack/TechStack";
import IndustriesSection from "@/Components/WeServe/WeServe";
import HeroSection from "@/Components/Home/HeroSection";

export const metadata: Metadata = {
  title: "IT Services Company in Odisha, India | Growwyld Tech",
  description:
    "Growwyld Tech is a trusted IT services company in Odisha, India, offering web development, digital marketing, software solutions, and technology services for growing businesses.",
  keywords: [
    "IT services company in odisha",
    "IT services company in india",
    "web development services in bhubaneswar",
    "web development company in bhubaneswar",
    "digital marketing agency in bhubaneswar",
    "digital marketing services in bhubaneswar",
    "software development services",
  ],
  authors: [{ name: "Growwyld Tech" }],
  creator: "Growwyld Tech",
  publisher: "Growwyld Tech",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://growwyld.com", // Update with your domain
    title: "IT Services Company in Odisha, India | Growwyld Tech",
    description:
      "Growwyld Tech is a trusted IT services company in Odisha, India, offering web development, digital marketing, software solutions, and technology services for growing businesses.",
    siteName: "Growwyld Tech",
    images: [
      {
        url: "https://growwyld.com/og-image.jpg", // Update with your OG image URL
        width: 1200,
        height: 630,
        alt: "Growwyld Tech - IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Services Company in Odisha, India | Growwyld Tech",
    description:
      "Growwyld Tech is a trusted IT services company in Odisha, India, offering web development, digital marketing, software solutions, and technology services for growing businesses.",
    images: ["https://growwyld.com/og-image.jpg"], // Update with your OG image URL
  },
  alternates: {
    canonical: "https://growwyld.com", // Update with your domain
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Services />
      <StatisticsSection />
      <ProjectsSection />
      <TechStackSection />
      <ProcessSection />
      <ServicesSection />
      <IndustriesSection />
      <Testimonials />
      <WhyChooseSection />
      <CTASection />
      <FAQ />
    </main>
  );
}
