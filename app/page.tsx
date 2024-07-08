import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/Landing/HeroSection";
import { BenefitsSection } from "@/components/Landing/BenefitsSection";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-8">
            <HeroSection />
            <BenefitsSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}