import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="px-4 sm:px-6 md:gap-8 lg:gap-12 pb-8">
      <div className="w-[70%] mx-auto text-center">
        <h1 className="text-3xl font-normal tracking-tighter sm:text-4xl md:text-5xl lg:text-[5.25rem]">
        Build in the open <br/><span className="text-primary font-bold">connect to be found</span>
        </h1>
        <p className="mt-5 w-[80%] mx-auto text-muted-foreground md:text-base">
        Create your projects in the open and be discovered by a community eager to connect, collaborate, and celebrate innovation. Share your learning each for better visibility.
        </p>
        <div className="flex items-center gap-6 justify-center mt-10">
          <Link href="/login" className="inline-block">
            <Button className="rounded-md h-12 px-6 text-base">
              <span>Start Your Journey</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}