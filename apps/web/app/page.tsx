import { Footer } from '@/components/web/footer';
import { Header } from '@/components/web/header';
import { HeroSection } from '@/components/web/hero-section';

export default async function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
