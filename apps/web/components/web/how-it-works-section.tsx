import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function HowItWorksSection() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: false positive
    <section id="how-it-works" className="mt-32">
      <div className="w-full max-w-[1380px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
          <div>
            <div className="text-center sm:text-left">
              <Badge
                variant="outline"
                className={cn(
                  'h-8 bg-background text-base font-normal text-muted-foreground px-3',
                  'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]',
                )}
              >
                How it works?
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-5xl text-center sm:text-left font-normal mt-6">
              From setup to insight—
              <br />
              just three simple steps.
            </h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border flex items-start gap-4 p-4 max-w-full md:max-w-[80%]">
              <div className="rounded-full shrink-0 w-8 h-8 flex items-center justify-center bg-secondary text-secondary-foreground/60">
                1
              </div>
              <div>
                <p className="text-lg leading-[1]">Connect Github</p>
                <p className="mt-2 text-muted-foreground/80">
                  Install the app and link your repos.
                </p>
              </div>
            </div>
            <div className="rounded-md border flex items-start gap-4 p-4 max-w-full md:max-w-[80%]">
              <div className="rounded-full shrink-0 w-8 h-8 flex items-center justify-center bg-secondary text-secondary-foreground/60">
                2
              </div>
              <div>
                <p className="text-lg leading-[1]">Generate Ideas</p>
                <p className="mt-2 text-muted-foreground/80">
                  AI transforms your activity into short, engaging posts — no
                  copywriting needed.
                </p>
              </div>
            </div>
            <div className="rounded-md border flex items-start gap-4 p-4 max-w-full md:max-w-[80%]">
              <div className="rounded-full shrink-0 w-8 h-8 flex items-center justify-center bg-secondary text-secondary-foreground/60">
                3
              </div>
              <div>
                <p className="text-lg leading-[1]">Schedule & Publish</p>
                <p className="mt-2 text-muted-foreground/80">
                  Pick your channels (Twitter, LinkedIn, Bluesky, and more) and
                  schedule posts with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
