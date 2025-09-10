import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function IdeasSearchBar() {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input placeholder="search ideas..." className="pl-10" />
    </div>
  );
}
