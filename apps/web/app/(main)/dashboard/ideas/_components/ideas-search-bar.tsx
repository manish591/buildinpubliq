'use client';

import { IconSearch } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';

export function IdeasSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const [localQuery, setLocalQuery] = useState('');
  const debouncedQuery = useDebounce(localQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!debouncedQuery) {
      params.delete('query');
    } else {
      params.set('query', debouncedQuery);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, searchParams, router, pathname]);

  return (
    <div className="relative flex-1 max-w-xs">
      <IconSearch
        className={cn(
          'absolute left-3 top-1/2 transform -translate-y-1/2',
          'text-muted-foreground h-4 w-4',
        )}
      />
      <Input
        placeholder="Search ideas"
        className="pl-10"
        value={localQuery}
        onChange={(e) => {
          setLocalQuery(e.target.value);
        }}
      />
    </div>
  );
}
