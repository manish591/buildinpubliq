import { ChannelsSection } from '@/components/web/channels-section';
import { FaqsSection } from '@/components/web/faqs-section';
import { FeaturesSection } from '@/components/web/features-section';
import { Footer } from '@/components/web/footer';
import { Header } from '@/components/web/header';
import { HeroSection } from '@/components/web/hero-section';
import { HowItWorksSection } from '@/components/web/how-it-works-section';
import { ReviewsSection } from '@/components/web/reviews-section';

export default async function Home() {
  return (
    <div>
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        {/* <ChannelsSection />
        <HowItWorksSection />
        <ReviewsSection />
        <FaqsSection /> */}
      </main>
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
}
