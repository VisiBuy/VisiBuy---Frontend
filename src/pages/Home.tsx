import CTA from "../ui/CTA";

// import Footer from "../ui/Footer";
// import Header from "../ui/Header";

import Hero from "@/components/Hero";
import CulturalShowcase from "@/components/CulturalShowCase";
import HowItWorks from "@/components/HowItWorks";
import WhyVisibuy from "@/components/WhyVisibuy";
import SneakerDrop from "@/components/SneakerDrop";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Testimonials from "@/components/Testimonial";

function Home() {
  return (
    <>
      <Hero/>
      <CulturalShowcase />
      <HowItWorks />
      <WhyVisibuy/>
      <SneakerDrop/>
      <Testimonials/>
      <FAQ/>
      <FinalCTA/>
    </>
  );
}

export default Home;
