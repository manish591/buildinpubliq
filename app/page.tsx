import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/Landing/HeroSection";
import { BenefitsSection } from "@/components/Landing/BenefitsSection";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <section className="w-full py-12 md:py-32">
          <div className="container space-y-32 md:space-y-44">
            <HeroSection />
            <BenefitsSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}