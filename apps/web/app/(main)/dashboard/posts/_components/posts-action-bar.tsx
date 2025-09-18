'use client';

import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PostsFilterDropdown } from './posts-filter-dropdown';
import { PostsSearchBox } from './posts-search-box';

export function PostsActionBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const channel = searchParams.get('channel');
  const status = searchParams.get('status');
  const isFiltersApplied = !!channel || !!status;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PostsFilterDropdown />
        </div>
        <div className="flex items-center gap-2">
          <PostsSearchBox />
        </div>
      </div>
      {isFiltersApplied && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {channel && (
              <div className="flex items-center rounded-md border">
                <Badge
                  variant="outline"
                  className="capitalize rounded-none h-10 text-sm font-medium border-0 border-r"
                >
                  Channel: {channel}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="gap-0 rounded-none w-8 cursor-pointer"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('channel');
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <X className="text-muted-foreground" />
                </Button>
              </div>
            )}
            {status && (
              <div className="flex items-center rounded-md border">
                <Badge
                  variant="outline"
                  className="capitalize rounded-none h-10 text-sm font-medium border-0 border-r"
                >
                  Status: {status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="gap-0 rounded-none w-8 cursor-pointer"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('status');
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <X className="text-muted-foreground" />
                </Button>
              </div>
            )}
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
