'use client';

import { Prisma } from '@buildinpubliq/db';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AVAILABLE_PLATFORM } from '@/constants';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function EditPostModal({
  post,
  channel,
  isEditPostModalOpen,
  setIsEditPostModalOpen,
}: Readonly<{
  post: Prisma.Post;
  channel: Prisma.Channel;
  isEditPostModalOpen: boolean;
  setIsEditPostModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const [scheduledAt, setScheduledAt] = useState<Date | null>(post.scheduledAt);
  const [content, setContent] = useState(post.content);
  const [errors, setErrors] = useState({
    content: '',
    scheduledAt: '',
  });

  const platformData = AVAILABLE_PLATFORM.find(
    (p) => p.name === channel.platform,
  );

  const PlatformIcon = platformData?.icon as
    | React.ComponentType<React.SVGProps<SVGSVGElement>>
    | undefined;

  const isErrors = Object.values(errors).some((err) => err !== '');

  const isContentEmpty = content === '';
  const isScheduledAtFalsy = !scheduledAt;
  const hasContentChanged = content !== post.content;
  const hasScheduledAtChanged = scheduledAt !== post.scheduledAt;

  const buttonConfigs = {
    DRAFT: {
      primary: {
        label: 'Schedule Post',
      },
      secondary: {
        label: 'Save Draft',
      },
    },
    SCHEDULED: {
      primary: {
        label: 'Save',
        disabled: true,
      },
      secondary: {
        label: 'Move to Draft',
        disabled: true,
      },
    },
    FAILED: {
      primary: {
        label: 'Move to Draft',
        disabled: true,
      },
      secondary: {
        label: 'Schedule',
        disabled: true,
      },
    },
    PUBLISHED: null,
  };

  const config = buttonConfigs[post.status];

  async function handleEditPost() {
    try {
      router.refresh();
      console.log('this works');
    } catch (err) {
      console.log('Failed to create posts', err);
    }
  }

  return (
    <Dialog
      open={isEditPostModalOpen}
      onOpenChange={(open) => {
        setIsEditPostModalOpen(open);
        if (!open) {
          setScheduledAt(post.scheduledAt);
          setContent(post.content);
        }
      }}
    >
      <DialogContent className="max-w-2xl! gap-0 p-0 rounded-xl">
        <DialogHeader className="px-6 py-5 pb-2">
          <DialogTitle className="text-base flex items-center font-normal gap-2 text-muted-foreground">
            Post <ChevronRight className="size-4 text-muted-foreground/90" />{' '}
            <span className="text-foreground">Edit Post</span>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto px-6 pt-2 pb-4">
          <div className="flex gap-2 items-start">
            <div className="mt-2 flex items-center gap-4 bg-background">
              {PlatformIcon && (
                <PlatformIcon
                  className={cn(
                    'size-6 p-1 rounded-full',
                    platformData?.iconBGColor,
                  )}
                  aria-hidden
                />
              )}
            </div>
            <Textarea
              value={content}
              onChange={(e) => {
                const value = e.target.value;
                setContent(value);
                if (!value) {
                  setErrors((prev) => ({
                    ...prev,
                    content: 'You gotta write something first!',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, content: '' }));
                }
              }}
              placeholder="Enter post content"
              className="min-h-[200px] focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>
        </div>
        <DialogFooter className="px-6 py-4 bg-muted/80 rounded-b-xl gap-0 sm:justify-between border-t">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-muted-foreground/70 p-0 m-0">
              When To Post
            </p>
            {/* <PostDatetimePicker
              scheduledAt={scheduledAt}
              setScheduledAt={setScheduledAt}
            /> */}
          </div>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleEditPost}
                  // disabled={isErrors}
                >
                  {config?.secondary.label}
                </Button>
              </TooltipTrigger>
              {isErrors && (
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              )}
            </Tooltip>
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={handleEditPost}
              disabled={Object.values(errors).some((err) => err !== '')}
            >
              {config?.primary.label}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
