import {
  AlertTriangle,
  Clock10,
  Copy,
  CopyPlus,
  Delete,
  EllipsisVertical,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Send,
  SquarePen,
} from 'lucide-react';
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
import { Prisma } from '@buildinpubliq/db';
import { format, formatDistanceToNow } from 'date-fns';
import { AVAILABLE_PLATFORM } from '@/constants';

const POST_STATUS_DATA = {
  [Prisma.PostStatus.DRAFT]: {
    color: 'text-neutral-500',
    bgColor: 'bg-neutral-50',
    borderColor: 'border-neutral-200',
    icon: <FileText className="size-4" strokeWidth={1.5} />,
  },
  [Prisma.PostStatus.FAILED]: {
    color: 'text-red-400',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: <AlertTriangle className="size-4" strokeWidth={1.5} />,
  },
  [Prisma.PostStatus.PUBLISHED]: {
    color: 'text-green-400',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: <FileCheck className="size-4" strokeWidth={1.5} />,
  },
  [Prisma.PostStatus.SCHEDULED]: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: <Clock10 className="size-4" strokeWidth={1.5} />,
  },
};

export function PostCard({
  post,
  channel,
}: Readonly<{ post: Prisma.Post; channel: Prisma.Channel }>) {
  const platformData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );

  const { bgColor, borderColor, color, icon } = POST_STATUS_DATA[post.status];

  return (
    <div className="border rounded-xl p-4 hover:bg-muted/70 group">
      <div className="flex items-center gap-3">
        <div className="relative w-max">
          <Avatar className="w-12 h-12">
            <AvatarImage src={channel.platformUserImg ?? ''} />
            <AvatarFallback>{channel.platformUserName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            {platformData && (
              <platformData.icon
                className={cn(
                  'size-[18px] p-0.5 rounded-full',
                  platformData.iconBGColor,
                )}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-8 flex-1">
          <div>
            <p className="font-medium text-base">{channel.platformUserName}</p>
            <div className="grid grid-cols-[minmax(0,1fr)_max-content] gap-2">
              <p className="text-muted-foreground whitespace-nowrap overflow-hidden overflow-ellipsis">
                {post.content}
              </p>
              <div className="shrink-0">
                <Tooltip>
                  <TooltipTrigger className="text-muted-foreground/60 text-xs">
                    {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {format(post.createdAt, 'MMM d, yyyy h:mm a')}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <div>
              <Badge
                variant="outline"
                className={cn(
                  'rounded-md h-7 font-normal px-2 capitalize',
                  'flex gap-2 items-center',
                  bgColor,
                  borderColor,
                  color,
                )}
              >
                {icon}
                {post.status.toLowerCase()}
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
