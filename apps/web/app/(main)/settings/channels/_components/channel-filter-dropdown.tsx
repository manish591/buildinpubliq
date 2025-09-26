'use client';

import { Prisma } from '@buildinpubliq/db';
import { ChevronDown, Filter, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ChannelFilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const platform = searchParams.get('platform');

  return (
    <div className="flex gap-4 flex-col items-stretch">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="cursor-pointer self-start">
            <Filter className="text-muted-foreground" />
            Filter
            <ChevronDown className="text-foreground/70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Select Channel</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.values(Prisma.Platform).map((platform) => {
            return (
              <DropdownMenuItem
                key={platform}
                className="capitalize cursor-pointer"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set('platform', platform.toLowerCase());
                  router.push(`${pathname}?${params.toString()}`);
                }}
              >
                {platform.toLowerCase()}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {platform && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center rounded-md border">
            <Badge
              variant="outline"
              className="capitalize rounded-none h-10 text-sm font-medium border-0 border-r"
            >
              Platform: {platform}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="gap-0 rounded-none w-8 cursor-pointer"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete('platform');
                router.push(`${pathname}?${params.toString()}`);
              }}
            >
              <X className="text-muted-foreground" />
            </Button>
          </div>
          <Button
            variant="outline"
            className="h-10 cursor-pointer"
            onClick={() => {
              router.push(`${pathname}`);
            }}
          >
            <X className="text-muted-foreground" /> Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
