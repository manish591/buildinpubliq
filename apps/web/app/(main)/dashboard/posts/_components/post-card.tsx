'use client';

import {
  AlertTriangle,
  Clock10,
  EllipsisVertical,
  FileCheck,
  FileText,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Prisma } from '@buildinpubliq/db';
import { formatDistanceToNow } from 'date-fns';
import { AVAILABLE_PLATFORM } from '@/constants';
import { useState } from 'react';
import { PostPreviewModal } from './post-preview-modal';

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
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const platformData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );
  const { bgColor, borderColor, color, icon } = POST_STATUS_DATA[post.status];

  return (
    <div className="relative border rounded-xl hover:bg-muted/70 group">
      <div className="p-4 relative flex items-center gap-3">
        <button
          type="button"
          aria-label={`Open post ${post.id}`}
          onClick={() => {
            setIsPreviewModalOpen(true);
          }}
          className="absolute inset-0 w-full h-full z-10 bg-transparent border-0 p-0 m-0"
        />
        <div className="relative w-max">
          <Avatar className="w-12 h-12">
            <AvatarImage src={channel.platformUserImg ?? ''} />
            <AvatarFallback>{channel.platformUserName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            {platformData &&
              (() => {
                const PlatformIcon = platformData.icon as any;
                return (
                  <PlatformIcon
                    className={cn(
                      'size-[18px] p-0.5 rounded-full',
                      platformData.iconBGColor,
                    )}
                  />
                );
              })()}
          </div>
        </div>
        <div className="flex items-center gap-8 flex-1">
          <div>
            <p className="font-medium text-base">{channel.platformUserName}</p>
            <div className="grid grid-cols-[minmax(0,1fr)_max-content] gap-2 items-center">
              <p className="text-muted-foreground whitespace-nowrap overflow-hidden overflow-ellipsis">
                {post.content}
              </p>
              <div className="shrink-0">
                <p className="text-xs p-0 m-0 text-muted-foreground/70">
                  {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
                </p>
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
            <div className="z-20">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-7 hover:bg-secondary group-hover:bg-secondary group-hover:border"
              >
                <EllipsisVertical />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PostPreviewModal
        post={post}
        channel={channel}
        isPreviewModalOpen={isPreviewModalOpen}
        setIsPreviewModalOpen={setIsPreviewModalOpen}
      />
    </div>
  );
}
