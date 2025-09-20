'use client';

import {
  IconBrandGithub,
  IconCheck,
  IconChevronDown,
  IconFilter2,
  IconSourceCode,
  IconUserCheck,
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
import { Prisma } from '@buildinpubliq/db';

const filters = [
  {
    value: 'source',
    label: 'Source',
    icon: IconSourceCode,
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
  const source = searchParams.get('source');

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
          <IconFilter2 />
          Filters
          <IconChevronDown className="text-foreground/70" />
        </Button>
      </PopoverTrigger>
      {currentFilter === '' ? (
        <PopoverContent className="w-[160px] p-0">
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
      {currentFilter === 'source' ? (
        <PopoverContent className="p-0 w-[180px]">
          <Command>
            <CommandInput placeholder="Search source" className="h-9" />
            <CommandList>
              <CommandEmpty>Source not found</CommandEmpty>
              <CommandGroup>
                {/* {channelsFilter.map((filter) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={(currentValue) => {
                      const params = new URLSearchParams(searchParams);
                      params.set('channel', currentValue);
                      router.push(`${pathname}?${params.toString()}`);
                    }}
                  >
                    <filter.icon className={cn('size-4', filter.bg)} />
                    {filter.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        channel === filter.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))} */}
                <CommandItem value="create-by-you">
                  <IconUserCheck className="size-4" />
                  Created By You
                  <IconCheck
                    className={cn(
                      'ml-auto',
                      source === 'create-by-you' ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
                {githubRepositories.map((repo) => {
                  const repoName = repo.fullName.split('/')[1].toLowerCase();
                  return (
                    <CommandItem
                      key={repo.id}
                      value={repoName}
                      className="capitalize"
                    >
                      <IconBrandGithub className="size-4" />
                      {repoName}
                      <IconCheck
                        className={cn(
                          'ml-auto',
                          source === repoName ? 'opacity-100' : 'opacity-0',
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
