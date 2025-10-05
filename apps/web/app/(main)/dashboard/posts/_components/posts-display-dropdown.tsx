import { Calendar, ChevronDown, List, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PostsDisplayDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2 />
          Display
          <ChevronDown className="text-foreground/70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] p-0">
        <div className="flex p-2 gap-2">
          <Button variant="ghost" className="w-full flex-col h-16">
            <List />
            List
          </Button>
          <Button
            variant="ghost"
            className="w-full flex-col h-16 border bg-muted"
          >
            <Calendar />
            Calendar
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
