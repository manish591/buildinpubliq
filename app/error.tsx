'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Something Went Wrong
        </h1>
        <p className="text-foreground/60 mb-8">
          Oops! Something broke on our end. We’re working on fixing it. Please
          try again shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>
              <ChevronLeft strokeWidth={2} />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              router.refresh();
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
