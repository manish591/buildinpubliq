import Link from 'next/link';
import { ArrowRight, Link2, NotebookPen, Package2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full pb-28 sm:pb-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div>
            <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-600 px-3 py-1 text-sm">
              Simple Process
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works?
            </h2>
            <p className="text-gray-500 sm:w-[90%] lg:w-[75%] mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-lg mt-6">
              Our streamlined process makes getting started quick and easy.
              Follow these simple steps to transform your experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 mt-12">
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border">
              <NotebookPen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">1. Describe</h3>
            <p className="text-center text-sm text-gray-500">
              give your project a title and description. We'll use this to
              create a perfect social post.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border">
              <Link2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">2. Connect</h3>
            <p className="text-center text-sm text-gray-500">
              link your X and LinkedIn accounts. This allows us to post updates
              on your behalf automatically.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border">
              <Package2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">3. Ship</h3>
            <p className="text-center text-sm text-gray-500">
              push your code and create a pull request. We'll generate a post
              for you based on your update.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">4. Launch</h3>
            <p className="text-center text-sm text-gray-500">
              Your post is ready! Publish it right away or schedule it for
              later.
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Link href="/auth" className="inline-block">
            <Button
              variant="outline"
              className="rounded-md h-12 px-6 gap-2 text-base"
            >
              <span className="font-bold">Start Your Journey - It's Free </span>
              <ArrowRight className="h-10"></ArrowRight>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
