import FAQ from "@/Components/Faq/HomeFaq";
import CTASection from "@/Components/Home/HomeCTA";
import ProjectsSection from "@/Components/Home/HomeProject";
import Testimonials from "@/Components/Home/HomeTestimonial";
import Services from "@/Components/Home/Service";
import ServicesSection from "@/Components/Home/ServiceMain";
import StatisticsSection from "@/Components/Home/Statistics";
// import WhyChooseSection from "@/Components/Home/WhyChooseUs";
import ProcessSection from "@/Components/Process/Process";
import TechStackSection from "@/Components/TechStack/TechStack";
import IndustriesSection from "@/Components/WeServe/WeServe";

export default function Home() {
  return (
    <div>
      <main>
        <Services />
        {/* <ProjectsSection /> */}
        {/* <StatisticsSection /> */}
        {/* <ProcessSection /> */}
        <ServicesSection />
        {/* <TechStackSection /> */}
        <IndustriesSection />
        <Testimonials />
        <CTASection />
        {/* <WhyChooseSection /> */}
        <FAQ />
      </main>
    </div>
  );
}
