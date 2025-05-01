import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/Landing/HeroSection';
import { BenefitsSection } from '@/components/Landing/BenefitsSection';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { cn } from '@/lib/utils';
import HowItWorks from '@/components/Landing/how-it-works';

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main className="space-y-32 sm:space-y-40">
        <div className="pt-24 md:pt-32 relative flex w-full flex-col items-center justify-center overflow-hidden bg-background">
          <HeroSection />
          <GridPattern
            width={20}
            height={20}
            x={-1}
            y={-1}
            className={cn(
              '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ',
            )}
          />
        </div>
        <BenefitsSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
