import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { BenefitsSection } from '@/components/benefits-section';
import { GridPattern } from '@/components/magicui/grid-pattern';
import { HowItWorks } from '@/components/how-it-works';

export default async function Home() {
  return (
    <div>
      <Navbar />
      <main className="space-y-32 sm:space-y-40">
        <div className="pt-24 md:pt-32 relative flex w-full flex-col items-center justify-center overflow-hidden">
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
