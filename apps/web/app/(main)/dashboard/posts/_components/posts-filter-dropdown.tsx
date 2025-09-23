'use client';

import * as React from 'react';
import {
  AlertTriangle,
  Check,
  ChevronDown,
  Clock,
  Clock10,
  FileCheck,
  FileText,
  ListFilter,
  Radio,
} from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
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
import { IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';

const filters = [
  {
    value: 'channel',
    label: 'Channel',
    icon: Radio,
  },
  {
    value: 'status',
    label: 'Status',
    icon: Clock,
  },
];

const channelsFilter = [
  {
    value: 'twitter',
    label: 'Twitter',
    icon: IconBrandX,
    bg: 'bg-black',
  },
  {
    value: 'linkedin',
    label: 'LinkedIn',
    icon: IconBrandLinkedin,
    bg: 'bg-[#0A66C2]',
  },
];

const statusFilter = [
  {
    value: 'draft',
    label: 'Draft',
    icon: FileText,
  },
  {
    value: 'failed',
    label: 'Failed',
    icon: AlertTriangle,
  },
  {
    value: 'published',
    label: 'Published',
    icon: FileCheck,
  },
  {
    value: 'scheduled',
    label: 'Scheduled',
    icon: Clock10,
  },
];

export function PostsFilterDropdown() {
  const [open, setOpen] = React.useState(false);
  const [currentFilter, setCurrentFilter] = React.useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const channel = searchParams.get('channel');
  const status = searchParams.get('status');

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
          <ListFilter />
          Filters
          <ChevronDown className="text-foreground/70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[160px] p-0" align="start">
        {currentFilter === '' && (
          <Command>
            <CommandInput placeholder="Search filters..." className="h-9" />
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
        )}
        {currentFilter === 'channel' && (
          <Command>
            <CommandInput placeholder="Search channel..." className="h-9" />
            <CommandList>
              <CommandEmpty>Channel not found</CommandEmpty>
              <CommandGroup>
                {channelsFilter.map((filter) => (
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
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
        {currentFilter === 'status' && (
          <Command>
            <CommandInput placeholder="Search status..." className="h-9" />
            <CommandList>
              <CommandEmpty>Invalid status</CommandEmpty>
              <CommandGroup>
                {statusFilter.map((filter) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.value}
                    onSelect={(currentValue) => {
                      const params = new URLSearchParams(searchParams);
                      params.set('status', currentValue);
                      router.push(`${pathname}?${params.toString()}`);
                    }}
                  >
                    <filter.icon className={cn('size-4')} />
                    {filter.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        status === filter.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
