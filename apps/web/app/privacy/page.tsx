import { Footer } from '@/components/web/footer';
import { Header } from '@/components/web/header';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main>
        <div className="max-w-2xl py-12 sm:py-16 mx-auto px-4">
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl font-medium mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground/80 mb-6">
              Estimated reading time:{' '}
              <span className="font-semibold">1 minute</span>. Anxiety level:{' '}
              <span className="font-semibold">0%</span>. Trust factor:{' '}
              <span className="font-semibold">100%</span>.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                1. We don't share your data… because we literally{' '}
                <span className="font-semibold">have none</span>. 😌
              </li>
              <li>
                2. No cookies here 🍪 — unless you bring some. Then we'll
                happily eat them.
              </li>
              <li>
                3. Your secrets are safe with us. Mostly because we don't know
                them.
              </li>
              <li>
                4. If you think we're spying on you, relax. We can barely keep
                track of our own bugs.
              </li>
              <li>
                5. The only thing we track is how often the app crashes.
                (Spoiler: it's more than we'd like.)
              </li>
              <li>
                6. If laws change and we suddenly need to “collect data,” don't
                worry — we'll still procrastinate.
              </li>
            </ul>
          </div>
        </div>
      </main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
