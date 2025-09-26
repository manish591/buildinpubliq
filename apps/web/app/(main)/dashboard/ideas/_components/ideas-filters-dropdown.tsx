'use client';

import type { Prisma } from '@buildinpubliq/db';
import {
  IconBrandGithub,
  IconCheck,
  IconChevronDown,
  IconFilter2,
} from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const filters = [
  {
    value: 'repository',
    label: 'Repository',
    icon: IconBrandGithub,
  },
];

export function IdeasFilterDropdown({
  githubRepositories,
}: Readonly<{ githubRepositories: Prisma.GithubRepository[] }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');
  const repository = searchParams.get('repository');

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setCurrentFilter('');
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <IconFilter2 className="text-muted-foreground" />
          Filters
          <IconChevronDown className="text-foreground/70" />
        </Button>
      </PopoverTrigger>
      {currentFilter === '' ? (
        <PopoverContent className="w-[160px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search filters" className="h-9" />
            <CommandList>
              <CommandEmpty>No filters found.</CommandEmpty>
              <CommandGroup>
                {filters.map((filter) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={(currentValue) => {
                      setCurrentFilter(currentValue);
                    }}
                    className="flex items-center gap-2"
                  >
                    <filter.icon />
                    {filter.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      ) : null}
      {currentFilter === 'repository' ? (
        <PopoverContent className="p-0 w-[180px]" align="start">
          <Command>
            <CommandInput placeholder="Search source" className="h-9" />
            <CommandList>
              <CommandEmpty>Source not found</CommandEmpty>
              <CommandGroup>
                {githubRepositories.map((repo) => {
                  const repoName = repo.fullName.split('/')[1].toLowerCase();
                  return (
                    <CommandItem
                      key={repo.id}
                      value={repoName}
                      className="capitalize"
                      onSelect={() => {
                        const params = new URLSearchParams(searchParams);
                        params.set('repository', repo.id);
                        router.push(`${pathname}?${params.toString()}`);
                      }}
                    >
                      <IconBrandGithub className="size-4" />
                      {repoName}
                      <IconCheck
                        className={cn(
                          'ml-auto',
                          repository === repo.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      ) : null}
    </Popover>
  );
}
