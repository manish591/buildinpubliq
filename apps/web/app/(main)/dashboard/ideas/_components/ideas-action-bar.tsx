'use client';

import type { Prisma } from '@buildinpubliq/db';
import { IconX } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IdeasFilterDropdown } from './ideas-filters-dropdown';
import { IdeasSearchBar } from './ideas-search-bar';

export function IdeasActionBar({
  githubRepositories,
}: Readonly<{ githubRepositories: Prisma.GithubRepository[] }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const repository = searchParams.get('repository');
  const isFiltersApplied = !!repository;

  const repo = githubRepositories.find((repo) => repo.id === repository);
  const repoName = repo?.fullName.split('/')[1] ?? '';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2">
          <IdeasFilterDropdown githubRepositories={githubRepositories} />
        </div>
        <IdeasSearchBar />
      </div>
      {isFiltersApplied && (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {repository && (
              <div className="flex items-center rounded-md border">
                <Badge
                  variant="outline"
                  className="capitalize rounded-none h-10 font-normal text-sm border-0 border-r"
                >
                  <span className="text-muted-foreground">
                    Repository is{' '}
                    <span className="text-foreground font-medium">
                      {repoName}
                    </span>
                  </span>
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="gap-0 rounded-none w-8 cursor-pointer"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.delete('repository');
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <IconX className="text-muted-foreground" />
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
            <IconX className="text-muted-foreground" /> Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
