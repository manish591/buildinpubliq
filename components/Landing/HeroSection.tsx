import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="w-full text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl md:text-6xl lg:text-[5.25rem]">
        Build in the open<br></br> connect to be found
      </h1>
      <p className="mt-6 w-[80%] sm:w-[75%] lg:w-[55%] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
        Create your projects in the open and be discovered by a community eager
        to connect, collaborate, and celebrate innovation. Share your learning
        each for better visibility.
      </p>
      <div className="flex items-center gap-6 justify-center mt-10">
        <Link href="/auth" className="inline-block">
          <Button className="rounded-md h-12 px-6 gap-2 text-base">
            <span className="font-bold">Start Your Journey - It's Free </span>
            <ArrowRight className="h-10"></ArrowRight>
          </Button>
        </Link>
      </div>
    </div>
  );
}
