import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function HowItWorksSection() {
  return (
    <section className="mt-24">
      <div className="w-full max-w-[1380px] mx-auto px-4">
        <div className="grid grid-cols-2">
          <div className="flex justify-start">
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
          <h2 className="text-5xl font-normal mt-6">
            From setup to insight—
            <br />
            just three simple steps.
          </h2>
        </div>
      </div>
    </section>
  );
}
