import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import CertificatesPreview from "@/components/sections/CertificatesPreview";
import CareerMilestones from "@/components/sections/CareerMilestones";
import CallToAction from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <CertificatesPreview />
      <CareerMilestones />
      <CallToAction />
    </>
  );
}