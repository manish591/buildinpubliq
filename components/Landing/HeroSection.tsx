import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="px-4 sm:px-6 md:gap-8 lg:gap-12">
      <div className="w-[80%] mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-8xl">
        Build in the open <br/>connect to be <span className="text-primary">found</span>
        </h1>
        <p className="mt-3 w-[90%] mx-auto text-muted-foreground md:text-xl">
        Create your projects in the open and be discovered by a community eager to connect, collaborate, and celebrate innovation. Our platform makes it easy to showcase your work and find others who share your passion for building.
        </p>
        <Link href="/login" className="inline-block mt-8">
          <Button className="h-14 rounded-md px-8 text-lg">
            <span>Start Your Journey</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}