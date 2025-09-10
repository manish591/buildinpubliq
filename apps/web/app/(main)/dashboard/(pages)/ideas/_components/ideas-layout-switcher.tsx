'use client';

import { LayoutGrid, List } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type IdeasLayoutOptions = 'grid' | 'list';

export function IdeasLayoutSwitcher() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const layout = searchParams.get('layout') ?? 'grid';

  return (
    <div className="border p-1 flex items-center rounded-md h-8 gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-6.5 w-6.5 hover:bg-secondary cursor-pointer',
          layout === 'grid' && 'bg-secondary',
        )}
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set('layout', 'grid');
          router.replace(`${pathname}?${params.toString()}`);
        }}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'h-6.5 w-6.5 hover:bg-secondary cursor-pointer',
          layout === 'list' && 'bg-secondary',
        )}
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set('layout', 'list');
          router.replace(`${pathname}?${params.toString()}`);
        }}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
