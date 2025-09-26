import { ArrowLeft } from 'lucide-react';
import { BackButton } from '@/components/web/back-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-medium leading-[1.2] sm:text-5xl">
          404 Page <br />
          not found
        </h1>
        <div className="mt-6 flex items-center justify-center gap-x-4">
          <BackButton>
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <span>Back</span>
          </BackButton>
          <Button asChild>
            <Link href="/">
              <span>Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
