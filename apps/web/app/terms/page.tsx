import { Footer } from '@/components/web/footer';
import { Header } from '@/components/web/header';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main>
        <div className="max-w-2xl py-12 sm:py-16 mx-auto px-4">
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl font-medium mb-4">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground/80 mb-6">
              Estimated reading time:{' '}
              <span className="font-semibold">2 minutes</span>. Understanding:{' '}
              <span className="font-semibold">50%</span>. Caring:{' '}
              <span className="font-semibold">0%</span>.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                1. <span className="font-semibold">No lawyers were harmed</span>{' '}
                in the making of these Terms.
              </li>
              <li>
                2. If you're reading this, congrats — you're part of the{' '}
                <span className="italic">0.01% of humans</span> who actually
                check T&Cs. 🏆
              </li>
              <li>
                3. We don't sell your data. Mostly because we don't have time,
                not because we're saints.
              </li>
              <li>
                4. Please don't try to hack us. We're just devs building in
                public, not the Pentagon.
              </li>
              <li>
                5. If something breaks… that's part of the “building in public”
                vibe. Enjoy the chaos.
              </li>
              <li>
                6. You can leave anytime. We'll be sad, but we'll survive
                (probably).
              </li>
              <li>
                7. By using this app, you agree to{' '}
                <span className="underline decoration-wavy decoration-pink-500">
                  vibe with us
                </span>{' '}
                . That's it.
              </li>
              <li>
                8. We don't offer{' '}
                <span className="font-semibold">dark mode</span>. Yeah, we know
                devs love it. Cope. 🌚
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
