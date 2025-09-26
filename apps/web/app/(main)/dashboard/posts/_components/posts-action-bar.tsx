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
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <PostsFilterDropdown />
        </div>
        <div className="flex items-center gap-2 flex-1 sm:flex-none">
          <PostsSearchBox />
        </div>
      </div>
      {isFiltersApplied && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 justify-between w-full">
          <div className="flex items-center gap-2">
            {channel && (
              <div className="flex items-center rounded-md border">
                <Badge
                  variant="outline"
                  className="capitalize rounded-none h-10 font-normal text-sm border-0 border-r"
                >
                  <span className="text-muted-foreground">
                    Channel is{' '}
                    <span className="text-foreground font-medium">
                      {channel}
                    </span>
                  </span>
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
                  className="capitalize rounded-none h-10 font-normal text-sm border-0 border-r"
                >
                  <span className="text-muted-foreground">
                    Status is{' '}
                    <span className="text-foreground font-medium">
                      {status}
                    </span>
                  </span>
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
            className="h-10 cursor-pointer self-start"
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
