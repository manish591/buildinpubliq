import {
  IconBrandBluesky,
  IconBrandMastodon,
  IconBrandThreads,
  IconBrandX,
} from '@tabler/icons-react';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

export function ChannelsSection() {
  return (
    <section className="mt-24">
      <div className="w-full max-w-[1380px] mx-auto px-4">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={cn(
              'h-8 bg-background text-base font-normal text-muted-foreground px-3',
              'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)]',
            )}
          >
            Channels
          </Badge>
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal mt-6 text-center leading-[1.2]">
          Share Everywhere
          <br />
          That Matters
        </h2>
        <div className="mt-12 max-w-[80%] sm:max-w-max mx-auto bg-muted rounded-md p-6 flex items-center justify-center sm:justify-start flex-wrap sm:flex-nowrap gap-6 px-10">
          <div className="bg-black p-1 w-max rounded-[4px]">
            <IconBrandX className="text-white size-10" />
          </div>
          <div className="bg-[#0a66c2] p-1 w-max rounded-[4px]">
            <Linkedin className="text-white size-10" />
          </div>
          <div className="bg-[#01AAFF] p-1 w-max rounded-[4px]">
            <IconBrandBluesky className="text-white size-10" />
          </div>
          <div className="bg-black p-1 w-max rounded-[4px]">
            <IconBrandThreads className="text-white size-10" />
          </div>
          <div className="bg-[#6364FF] p-1 w-max rounded-[4px]">
            <IconBrandMastodon className="text-white size-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
