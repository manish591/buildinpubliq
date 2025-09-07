import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center">
      <div className="text-center">
        <p className="text-base font-semibold">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-foreground/50">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-md px-3.5 py-2.5 text-sm flex items-center gap-3"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
              <span>Back To Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
