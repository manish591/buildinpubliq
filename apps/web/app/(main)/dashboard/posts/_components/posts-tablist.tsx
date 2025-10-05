'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PostsTabList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'draft';

  function handleUpdateTabs(tab: string) {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center px-[2px]">
      <Button
        value="draft"
        variant="ghost"
        className={cn(
          'h-12 rounded-none border-b border-transparent px-4 hover:bg-transparent cursor-pointer',
          tab === 'draft' && 'border-primary',
        )}
        onClick={() => {
          handleUpdateTabs('draft');
        }}
      >
        Drafts
      </Button>
      <Button
        value="scheduled"
        variant="ghost"
        className={cn(
          'h-12 rounded-none border-b border-transparent px-4 hover:bg-transparent cursor-pointer',
          tab === 'scheduled' && 'border-primary',
        )}
        onClick={() => {
          handleUpdateTabs('scheduled');
        }}
      >
        Scheduled
      </Button>
      <Button
        value="published"
        variant="ghost"
        className={cn(
          'h-12 rounded-none border-b border-transparent px-4 hover:bg-transparent cursor-pointer',
          tab === 'published' && 'border-primary',
        )}
        onClick={() => {
          handleUpdateTabs('published');
        }}
      >
        Published
      </Button>
    </div>
  );
}
