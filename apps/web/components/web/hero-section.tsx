import {
  IconBrandBluesky,
  IconBrandThreads,
  IconBrandX,
} from '@tabler/icons-react';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="z-30 py-12 relative flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1380px] grid grid-cols-1 sm:grid-cols-2 px-4 items-center">
        <div>
          <h1 className="text-center sm:text-left text-4xl font-medium leading-[1.2] sm:text-4xl md:text-[70px]">
            GitHub Pull Requests <br />
            <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
              To
            </span>{' '}
            <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
              Shareable
            </span>{' '}
            <span className="bg-gradient-to-b from-foreground to-muted bg-clip-text text-transparent">
              Ideas.
            </span>
          </h1>
        </div>
        <div>
          <p className="mt-4 sm:mt-0 text-center sm:text-right text-muted-foreground text-base/relaxed max-w-[95%] sm:max-w-[70%] ml-auto">
            Auto-generate updates directly from your GitHub activity, schedule
            them in advance, and seamlessly publish across Twitter, LinkedIn.
          </p>
          <div className="flex items-center gap-4 justify-center sm:justify-end mt-6 sm:mt-4">
            <Button className="rounded-full" asChild>
              <Link href="/auth" className="inline-block">
                <span>Get Started</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[1380px] px-4 mt-10">
        <div
          className="p-16 pb-0 rounded-3xl relative"
          style={{
            backgroundImage:
              'linear-gradient(235.85134265566074deg, #ffffff 0%, var(--token-a61a6e73-ca59-4dcf-881d-6ea1b2705903, rgb(217, 217, 217)) 30.288460850715637%, rgb(255, 255, 255) 74.03846383094788%, rgb(235, 236, 237) 89.90384340286255%, rgb(228, 229, 231) 100%)',
          }}
        >
          <Image
            src="https://res.cloudinary.com/dcugqfvvg/image/upload/v1758748255/Group_1_5_raonuw.png"
            alt="dashboard-mockup"
            width={1080}
            height={800}
            className="mx-auto rotate-2 w-[600px] mb-[-20px]"
          />
          <div className="absolute top-[20%] left-[15%] sm:left-[23%] text-sm w-max p-0.5 rounded-[2px] bg-black opacity-40 blur-[3px]">
            <IconBrandX className="size-8 sm:size-10 text-white" />
          </div>
          <div className="absolute top-[55%] left-[12%] sm:left-[20%] text-sm w-max p-0.5 rounded-[2px] bg-[#0a66c2] opacity-40 blur-[3px]">
            <Linkedin className="size-8 sm:size-10 text-white" />
          </div>
          <div className="absolute top-[30%] sm:right-[23%] right-[15%] text-sm w-max p-0.5 rounded-[2px] bg-[#01AAFF] opacity-40 blur-[3px]">
            <IconBrandBluesky className="size-8 sm:size-10 text-white" />
          </div>
          <div className="absolute top-[60%] sm:right-[20%] right-[12%] text-sm w-max p-0.5 rounded-[2px] bg-black opacity-40 blur-[3px]">
            <IconBrandThreads className="size-8 sm:size-10 text-white" />
          </div>
        </div>
      </div>
      <div className="w-full h-[120px] bg-background blur-xl absolute top-[85%]"></div>
    </section>
  );
}
