import {
  IconBrandBluesky,
  IconBrandThreads,
  IconBrandX,
  IconChartLine,
  IconDotsVertical,
  IconExchange,
  IconGitPullRequest,
  IconGitPullRequestClosed,
} from '@tabler/icons-react';
import { Linkedin } from 'lucide-react';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function FeaturesSection() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: false positive
    <section id="features" className="relative mt-16">
      <div className="w-full max-w-[1380px] mx-auto px-4">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={cn(
              'h-8 bg-background text-base font-normal text-muted-foreground px-3',
              'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]',
            )}
          >
            Features
          </Badge>
        </div>
        <div className="text-center mt-6">
          <h2 className="text-3xl sm:text-5xl leading-[1.2] font-normal">
            Everything You Need
            <br /> to Build Out Loud
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-12">
          <div className="md:col-span-2 p-8 rounded-md bg-gradient-to-b from-transparent to-muted border">
            <h3 className="text-[24px] sm:text-[26px] font-normal">
              Auto-Ideas from GitHub
            </h3>
            <p className="mt-4 text-base text-muted-foreground/80">
              Every pull request becomes a ready-to-share update, so you never
              run out of things to post.
            </p>
            <div className="mt-8 select-none">
              <div className="relative max-w-[70%] mx-auto p-4 rounded-md border bg-background">
                <div className="flex items-center gap-4">
                  <span>
                    <IconGitPullRequest
                      className="size-10 text-accent-foreground"
                      strokeWidth={1}
                    />
                  </span>
                  <div>
                    <p className="text-xl">Authentication</p>
                    <p className="text-base text-muted-foreground/80">
                      Seamless Login
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative max-w-[80%] mx-auto p-4 rounded-md border bg-background mt-[-55px] z-10 shadow-[0px_-2px_16px_0_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-4">
                  <span>
                    <IconGitPullRequestClosed
                      className="size-10 text-primary"
                      strokeWidth={1}
                    />
                  </span>
                  <div>
                    <p className="text-xl">Authentication Flow</p>
                    <p className="text-base text-muted-foreground/80">
                      Seamless Login
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 p-8 rounded-md bg-gradient-to-b from-transparent to-muted border">
            <h3 className="text-[24px] sm:text-[26px] font-normal">
              Multi-Channel Scheduling
            </h3>
            <p className="mt-4 text-base text-muted-foreground/80">
              Schedule once and publish across Twitter, LinkedIn, Threads,
              Bluesky, and more without lifting a finger.
            </p>
            <div className="mt-8 flex items-center gap-6 flex-wrap">
              <div className="bg-black p-1 w-max rounded-[4px]">
                <IconBrandX className="text-white size-8 sm:size-10" />
              </div>
              <div className="bg-[#0a66c2] p-1 w-max rounded-[4px]">
                <Linkedin className="text-white size-8 sm:size-10" />
              </div>
              <div className="bg-[#01AAFF] p-1 w-max rounded-[4px]">
                <IconBrandBluesky className="text-white size-8 sm:size-10" />
              </div>
              <div className="bg-black p-1 w-max rounded-[4px]">
                <IconBrandThreads className="text-white size-8 sm:size-10" />
              </div>
            </div>
            <div className="mt-8 text-muted-foreground/80">
              4+ Channels supported
            </div>
          </div>
          <div className="md:col-span-2 p-8 rounded-md bg-gradient-to-b from-transparent to-muted border">
            <h3 className="text-[24px] sm:text-[26px] font-normal">
              AI-Powered Content Creation
            </h3>
            <p className="mt-4 text-base text-muted-foreground/80">
              AI that transforms your code into content.
            </p>
            <div className="mt-8">
              <div className="relative h-[130px] w-[180px] sm:h-[150px] sm:w-[200px] mx-auto overflow-hidden rounded-md border border-zinc-950/10 bg-white text-zinc-700 outline-hidden dark:border-zinc-50/20 dark:bg-zinc-950 dark:text-zinc-300">
                <div className="flex items-center justify-center h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-hidden">
                  <div className="flex h-full flex-col items-start justify-center">
                    <p className="text-4xl sm:text-5xl text-black">AI</p>
                  </div>
                </div>
                <BorderTrail className="bg-primary" size={120} />
              </div>
            </div>
          </div>
          <div className="md:col-span-3 grid-s p-8 rounded-md bg-gradient-to-b from-transparent to-muted border">
            <h3 className="text-[24px] sm:text-[26px] font-normal">
              Account Management & Cross-Posting
            </h3>
            <p className="mt-4 text-base text-muted-foreground/80">
              3 accounts connected
            </p>
            <div className="mt-8 space-y-2">
              <div className="select-none pointer-events-none bg-background rounded-md p-3 border flex items-center gap-3">
                <div className="relative w-max">
                  <Avatar className="w-12 h-12">
                    <AvatarImage />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
                    <span
                      className={cn(
                        'h-[18px] w-[18px] p-0.5 rounded-full',
                        'bg-black',
                      )}
                    >
                      <IconBrandX
                        className={cn('text-white w-full! h-full!')}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium">manish591</p>
                  <p className="text-sm text-muted-foreground/80">
                    Twitter/X Account
                  </p>
                </div>
                <div className="ml-auto">
                  <Button size="icon" variant="ghost">
                    <IconDotsVertical className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="select-none pointer-events-none bg-background rounded-md p-3 border flex items-center gap-3">
                <div className="relative w-max">
                  <Avatar className="w-12 h-12">
                    <AvatarImage />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
                    <span
                      className={cn(
                        'h-[18px] w-[18px] p-0.5 rounded-full',
                        'bg-[#01AAFF]',
                      )}
                    >
                      <IconBrandBluesky
                        className={cn('text-white w-full! h-full!')}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium">anjali29</p>
                  <p className="text-sm text-muted-foreground/80">
                    Bluesky Account
                  </p>
                </div>
                <div className="ml-auto">
                  <Button size="icon" variant="ghost">
                    <IconDotsVertical className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="select-none pointer-events-none bg-background rounded-md p-3 border flex items-center gap-3">
                <div className="relative w-max">
                  <Avatar className="w-12 h-12 bg-muted text-muted-foreground">
                    <AvatarImage />
                    <AvatarFallback className="text-black">V</AvatarFallback>
                  </Avatar>
                  <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
                    <span
                      className={cn(
                        'h-[18px] w-[18px] p-0.5 rounded-full',
                        'bg-black',
                      )}
                    >
                      <IconBrandX
                        className={cn('text-white w-full! h-full!')}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-medium">virat879</p>
                  <p className="text-sm text-muted-foreground/80">
                    Twitter/X Account
                  </p>
                </div>
                <div className="ml-auto">
                  <Button size="icon" variant="ghost">
                    <IconDotsVertical className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 p-8 rounded-md bg-gradient-to-b from-transparent to-muted border">
            <h3 className="text-[24px] sm:text-[26px] font-normal">
              Coming soon...
            </h3>
            <p className="mt-4 text-base text-muted-foreground/80">
              We're just getting started. Soon you'll unlock more channels to
              share your journey, detailed analytics to measure impact, and
              smart workflows that make building in public even easier.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-8 gap-2 border bg-background flex flex-col items-center justify-center rounded-md">
                <IconExchange className="size-8 text-primary" />
                <p className="text-base leading-[1.3] text-muted-foreground/80 text-center">
                  More <br />
                  Channels
                </p>
              </div>
              <div className="p-8 gap-2 border bg-background flex flex-col items-center justify-center rounded-md">
                <IconChartLine className="size-8 text-primary" />
                <p className="text-base leading-[1.3] text-muted-foreground/80 text-center">
                  Channel <br />
                  Analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
