import { Prisma } from '@buildinpubliq/db';
import { format, formatDistanceToNow } from 'date-fns';
import type React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AVAILABLE_PLATFORM } from '@/constants';
import { cn } from '@/lib/utils';

export function PostPreviewModal({
  post,
  channel,
  isPreviewModalOpen,
  setIsPreviewModalOpen,
}: Readonly<{
  post: Prisma.Post;
  channel: Prisma.Channel;
  isPreviewModalOpen: boolean;
  setIsPreviewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const channelData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );

  const PlatformIcon = channelData?.icon as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  const postStatusAt = (() => {
    const statusMap: Record<
      Prisma.PostStatus,
      { content: string; date: Date | null }
    > = {
      [Prisma.PostStatus.PUBLISHED]: {
        content: 'Published on',
        date: post.publishedAt ?? post.updatedAt,
      },
      [Prisma.PostStatus.FAILED]: {
        content: 'Failed on',
        date: post.updatedAt,
      },
      [Prisma.PostStatus.SCHEDULED]: {
        content: 'Scheduled for',
        date: post.scheduledAt,
      },
      [Prisma.PostStatus.DRAFT]: {
        content: post.scheduledAt ? 'Draft Scheduled for' : 'Draft',
        date: post.scheduledAt,
      },
      [Prisma.PostStatus.PUBLISHING]: {
        content: 'Publishing on',
        date: post.scheduledAt,
      },
    };
    return statusMap[post.status] ?? { content: '', date: undefined };
  })();

  return (
    <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
      <DialogContent className="max-w-2xl! gap-0 p-0 rounded-xl">
        <DialogTitle className="sr-only">Post options dropdown</DialogTitle>
        <DialogHeader className="px-6 py-4 border-b">
          <p className="text-sm">
            <span className="capitalize">{postStatusAt.content}</span>{' '}
            <span className="font-medium">
              {postStatusAt.date
                ? format(postStatusAt.date, 'MMM d, h:mm a')
                : 'Not scheduled yet'}
            </span>
          </p>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto py-4">
          <div className="px-6 flex items-center gap-3">
            <Button
              className={cn(
                'relative w-max',
                'bg-transparent h-10 w-10 border-0 shadow-none p-0 rounded-full hover:bg-transparent cursor-pointer',
              )}
            >
              <Avatar className={cn('w-10 h-10')}>
                <AvatarImage src={channel.platformUserImg ?? ''} />
                <AvatarFallback>
                  {channel.platformUserName?.at(0)}
                </AvatarFallback>
              </Avatar>
              {PlatformIcon && (
                <span className="absolute size-[20px] bg-background right-[-4px] bottom-[-4px] rounded-full flex items-center justify-center">
                  <PlatformIcon
                    className={cn(
                      'size-4 p-0.5 rounded-full mt-[0.5px] mr-[0.5px]',
                      channelData?.iconBGColor,
                    )}
                    aria-hidden
                  />
                </span>
              )}
            </Button>
            <p className="font-medium">{channel.platformUserName}</p>
          </div>
          <div className="px-6 mt-4">
            <p>{post.content}</p>
          </div>
        </div>
        <DialogFooter className="px-6 py-4 bg-muted/80 rounded-b-xl items-center gap-0 sm:justify-between border-t">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground/70 p-0 m-0">
              You created this{' '}
              {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
