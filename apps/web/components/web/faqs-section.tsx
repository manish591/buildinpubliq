import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function FaqsSection() {
  return (
    <section>
      <div className="w-full max-w-[1380px] mx-auto px-4">
        <div className="flex justify-center">
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
      </div>
    </section>
  );
}
