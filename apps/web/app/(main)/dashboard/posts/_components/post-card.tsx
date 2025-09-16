import {
  AlertTriangle,
  Clock10,
  Copy,
  CopyPlus,
  Delete,
  EllipsisVertical,
  ExternalLink,
  Eye,
  Send,
  SquarePen,
} from 'lucide-react';
import { LinkedinSVGIcon } from '@/components/svg-icons/linkedin';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function PostCard() {
  return (
    <div className="border rounded-xl p-4 hover:bg-muted/70 group">
      <div className="flex items-center gap-3">
        <div className="relative w-max">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            <LinkedinSVGIcon className="size-[18px] p-0.5 rounded-full text-white bg-[#0A66C2]" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div>
            <p className="font-medium text-base">manishdevrani777</p>
            <div className="flex items-center">
              <p className="line-clamp-1 text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellendus at et impedit veniam laboriosam harum! Animi
                veritatis harum dignissimos quas nesciunt, consequatur porro
                eius eaque quam rem esse iure mollitia?
              </p>
              <div className="shrink-0">
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground/70 text-sm">
                    Sept 4, 2025
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Aug 4, 2025, 4:30 AM</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Badge
                variant="outline"
                className={cn(
                  'rounded-md h-7 bg-red-50 text-red-400 border-red-200 font-normal px-3',
                  'flex gap-2 items-center',
                )}
              >
                <AlertTriangle className="size-4" strokeWidth={1.5} />
                Failed
              </Badge>
            </div>
            <div>
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
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <SquarePen className="size-4" /> <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <Eye className="size-4" /> <span>Preview</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <CopyPlus className="size-4" /> <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <ExternalLink className="size-4" /> <span>View Post</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <Copy className="size-4" /> <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-2 items-center">
                    <Send className="size-4" /> <span>Publish Now</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex gap-2 items-center text-destructive">
                    <Delete className="size-4" /> <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
