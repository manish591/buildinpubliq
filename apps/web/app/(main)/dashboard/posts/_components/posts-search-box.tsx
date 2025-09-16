import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function PostsSearchBox() {
  return (
    <div className="border rounded-md flex items-center w-xs px-2 gap-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Search className="size-4" />
      <Input
        placeholder="Search posts"
        className="w-full px-0 focus-visible:ring-0 focus-visible:ring-transparent border-0"
      />
    </div>
  );
}
