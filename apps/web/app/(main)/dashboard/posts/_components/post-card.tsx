'use client';

import {
  AlertTriangle,
  Clock10,
  Copy,
  CopyPlus,
  Delete,
  ExternalLink,
  FileCheck,
  FileText,
  SquarePen,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Prisma } from '@buildinpubliq/db';
import { formatDistanceToNow } from 'date-fns';
import { AVAILABLE_PLATFORM } from '@/constants';
import { useState } from 'react';
import { PostPreviewModal } from './post-preview-modal';
import { PostActionDropdown } from './post-action-dropdown';
import { EditPostModal } from './edit-post-modal';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useDeleteModal } from './delete-post-modal';
import { IconUpload } from '@tabler/icons-react';

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
  [Prisma.PostStatus.PUBLISHING]: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: <IconUpload className="size-4" strokeWidth={1.5} />,
  },
};

export function PostCard({
  post,
  channel,
}: Readonly<{ post: Prisma.Post; channel: Prisma.Channel }>) {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const { DeletePostModal, setShowDeletePostModal } = useDeleteModal({
    postId: post.id,
  });

  const platformData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );
  const { bgColor, borderColor, color, icon } = POST_STATUS_DATA[post.status];

  const PlatformIcon = platformData?.icon as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  const renderPlatformIcon = () =>
    PlatformIcon ? (
      <span
        className={cn(
          'h-[18px] w-[18px] p-0.5 rounded-full',
          platformData?.iconBGColor,
        )}
      >
        <PlatformIcon className={cn('text-white w-full! h-full!')} />
      </span>
    ) : null;

  const renderTimestamp = () => (
    <p className="text-xs p-0 m-0 text-muted-foreground/70">
      {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
    </p>
  );

  return (
    <div className="relative border rounded-xl hover:bg-muted/70 group">
      <div className="p-4 relative flex items-center gap-3">
        <button
          type="button"
          aria-label={`Open post ${post.id}`}
          onClick={() => setIsPreviewModalOpen(true)}
          className="absolute inset-0 w-full h-full z-10 bg-transparent border-0 p-0 m-0"
        />
        <div className="relative w-max hidden sm:block">
          <Avatar className="w-12 h-12">
            <AvatarImage src={channel.platformUserImg ?? ''} />
            <AvatarFallback>{channel.platformUserName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute size-[22px] bg-background right-0 bottom-[0%] rounded-full flex items-center justify-center">
            {renderPlatformIcon()}
          </div>
        </div>
        <div className="flex items-center gap-8 flex-1 relative">
          <div>
            <p className="font-medium text-base">{channel.platformUserName}</p>
            <div className="grid grid-cols-[minmax(0,1fr)_max-content] gap-2 items-center">
              <p className="text-muted-foreground whitespace-nowrap overflow-hidden overflow-ellipsis">
                {post.content}
              </p>
              <div className="shrink-0">{renderTimestamp()}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto relative">
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
            <div className="z-20">
              <PostActionDropdown>
                {post.status !== Prisma.PostStatus.PUBLISHED && (
                  <DropdownMenuItem
                    className="flex gap-2 items-center cursor-pointer"
                    onClick={() => {
                      setIsEditPostModalOpen(true);
                    }}
                  >
                    <SquarePen className="size-4" /> <span>Edit</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="hidden gap-2 items-center cursor-pointer">
                  <CopyPlus className="size-4" /> <span>Duplicate</span>
                </DropdownMenuItem>
                {post.status === Prisma.PostStatus.PUBLISHED && (
                  <>
                    <DropdownMenuItem className="hidden gap-2 items-center cursor-pointer">
                      <ExternalLink className="size-4" /> <span>View Post</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hidden gap-2 items-center cursor-pointer">
                      <Copy className="size-4" /> <span>Copy Link</span>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem
                  className="flex gap-2 items-center text-destructive! cursor-pointer"
                  onClick={() => {
                    setShowDeletePostModal(true);
                  }}
                >
                  <Delete className="size-4" /> <span>Delete</span>
                </DropdownMenuItem>
              </PostActionDropdown>
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
      <EditPostModal
        post={post}
        channel={channel}
        isEditPostModalOpen={isEditPostModalOpen}
        setIsEditPostModalOpen={setIsEditPostModalOpen}
      />
      <DeletePostModal />
    </div>
  );
}
