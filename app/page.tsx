import ShaderHero from "@/components/ShaderHero";
import BentoGrid from "@/components/BentoGrid";
import TechPit from "@/components/TechPit";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ShaderHero />
      <div className="relative z-10">
        <BentoGrid />
        <TechPit />
        <Work />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
