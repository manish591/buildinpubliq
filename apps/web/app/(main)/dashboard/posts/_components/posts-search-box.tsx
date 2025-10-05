'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export function PostsSearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toString();
  const [localQuery, setLocalQuery] = useState(query ?? '');
  const debouncedQuery = useDebounce(localQuery);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!debouncedQuery) {
      params.delete('query');
    } else {
      params.set('query', debouncedQuery);
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedQuery, pathname, router, searchParams]);

  return (
    <div className="border rounded-md flex items-center w-full sm:w-xs px-2 gap-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Search className="size-4 text-muted-foreground" />
      <Input
        placeholder="Search posts"
        className="w-full px-0 focus-visible:ring-0 focus-visible:ring-transparent border-0"
        value={localQuery}
        onChange={(e) => {
          setLocalQuery(e.target.value);
        }}
      />
    </div>
  );
}
