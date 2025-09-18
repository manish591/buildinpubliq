import {
  Copy,
  CopyPlus,
  Delete,
  EllipsisVertical,
  ExternalLink,
  SquarePen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PostCardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-7 hover:bg-secondary group-hover:bg-secondary group-hover:border"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex gap-2 items-center">
          <SquarePen className="size-4" /> <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 items-center">
          <CopyPlus className="size-4" /> <span>Duplicate</span>
        </DropdownMenuItem>
        {/* {post.status === 'PUBLISHED' && (
          <>
            <DropdownMenuItem className="flex gap-2 items-center">
              <ExternalLink className="size-4" /> <span>View Post</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 items-center">
              <Copy className="size-4" /> <span>Copy Link</span>
            </DropdownMenuItem>
          </>
        )} */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2 items-center text-destructive!">
          <Delete className="size-4" /> <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
