import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function FaqsSection() {
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
              Faqs
            </Badge>
            <h2 className="text-5xl font-normal mt-8">All You Need to Know</h2>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
