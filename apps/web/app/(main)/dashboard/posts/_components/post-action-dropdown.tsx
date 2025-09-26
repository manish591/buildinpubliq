import { EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function PostActionDropdown({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn(
            'w-7 h-7 border-transparent hover:bg-muted',
            'hover:border-border group-hover:border-border cursor-pointer',
          )}
        >
          <EllipsisVertical className="size-[14px]!" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
