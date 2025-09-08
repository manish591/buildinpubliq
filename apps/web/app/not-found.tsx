import { ArrowLeft } from 'lucide-react';
import { BackButton } from '@/components/web/back-button';

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold leading-[1.2] sm:text-5xl">
          404 Page <br />
          not found
        </h1>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <BackButton>
            <ArrowLeft className="h-5 w-5 text-gray-500" />
            <span>Back To Home</span>
          </BackButton>
        </div>
      </div>
    </main>
  );
}
