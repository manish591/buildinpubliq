import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function HowItWorksSection() {
  return (
    <section className="mt-32">
      <div className="w-full max-w-[1380px] mx-auto px-4">
        <div className="grid grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-start">
            <Badge
              variant="outline"
              className={cn(
                'h-8 bg-background text-base font-normal text-muted-foreground px-3',
                'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] w-max',
              )}
            >
              How it works?
            </Badge>
            <h2 className="text-5xl font-normal mt-8">
              From setup to insight—
              <br />
              just three simple steps.
            </h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-md border flex items-start gap-4 p-4">
              <div className="rounded-full shrink-0 w-8 h-8 flex items-center justify-center bg-primary/60 text-primary-foreground">
                1
              </div>
              <div>
                <p className="text-lg leading-[1]">Connect Github</p>
                <p className="mt-2 text-muted-foreground/80">
                  Install the app and link your repos.
                </p>
              </div>
            </div>
            <div className="rounded-md border flex items-start gap-4 p-4">
              <div className="rounded-full shrink-0 w-8 h-8 flex items-center justify-center bg-primary/60 text-primary-foreground">
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
            <div className="rounded-md border flex items-start gap-4 p-4">
              <div className="rounded-full shrink-0 w-8 h-8 flex items-center justify-center bg-primary/60 text-primary-foreground">
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
