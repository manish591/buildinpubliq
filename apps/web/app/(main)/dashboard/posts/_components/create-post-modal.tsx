'use client';

import { ChevronRight, Plus } from 'lucide-react';
import type { Prisma } from '@buildinpubliq/db';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PostDatetimePicker } from './post-datetime-picker';
import { ChannelsAvatarCombo } from './channels-avatar';

export function CreatePostModal({
  channels,
}: Readonly<{ channels: Prisma.Channel[] }>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl! gap-0 p-0 rounded-xl">
        <DialogHeader className="px-6 py-5 pb-2">
          <DialogTitle className="text-base flex items-center font-normal gap-2 text-muted-foreground">
            Post <ChevronRight className="size-4 text-muted-foreground/90" />{' '}
            <span className="text-foreground">New Post</span>
          </DialogTitle>
        </DialogHeader>
        {channels.length === 0 ? (
          <div className="min-h-[300px] px-6 py-4">
            <div className="h-full flex items-center justify-center border rounded-md">
              <div className="text-center">
                <h3 className="text-lg font-medium">No channels connected</h3>
                <p className="text-muted-foreground">
                  Connect a channel to start sharing your updates with the world
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <ChannelsAvatarCombo channels={channels} />
            <div className="max-h-[300px] overflow-y-auto px-6 pt-2 pb-4">
              <Textarea
                placeholder="Enter post content"
                className="min-h-[200px] focus-visible:ring-0 focus-visible:ring-transparent"
              />
            </div>
          </>
        )}
        <DialogFooter className="px-6 py-4 bg-muted/80 rounded-b-xl gap-0 sm:justify-between border-t">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-muted-foreground/70 p-0 m-0">
              When To Post
            </p>
            <PostDatetimePicker disabled={channels.length === 0} />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={channels.length === 0}
            >
              Save As Drafts
            </Button>
            <Button size="sm" disabled={channels.length === 0}>
              Schedule Posts
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
