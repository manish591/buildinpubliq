'use client';

import { Prisma } from '@buildinpubliq/db';
import { ChevronRight, CircleAlert, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import { ChannelsAvatar } from './channels-avatar';
import { PostSchedulerModal } from './post-scheduler-modal';
import { createPost } from '../actions';

export function CreatePostModal({
  channels,
}: Readonly<{ channels: Prisma.Channel[] }>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null);
  const [baseContent, setBaseContent] = useState('');
  const [selectedChannels, setSelectedChannels] = useState(() => {
    return channels.map((channel) => channel.id);
  });
  const [channelsContent, setChannelsContent] = useState(() => {
    return channels.map((channel) => ({ channelId: channel.id, content: '' }));
  });
  const [isScheduledAtInPast, setIsScheduledAtInPast] = useState(false);
  const router = useRouter();

  const isContentEmpty = channelsContent.some((ch) => ch.content === '');
  const isChannelsNotSelected =
    channels.length === 0 || selectedChannels.length === 0;

  async function handleCreatePosts(status: Prisma.PostStatus) {
    if (scheduledAt && scheduledAt < new Date()) {
      setIsScheduledAtInPast(true);
      return;
    }

    try {
      const updatedChannelsContent = channelsContent.filter((ch) =>
        selectedChannels.includes(ch.channelId),
      );
      const data = {
        status,
        scheduledAt,
        selectedChannels,
        channelsContent: updatedChannelsContent,
      };
      await createPost(data);
      setIsModalOpen(false);
      setScheduledAt(null);
      setBaseContent('');
      setChannelsContent(
        channels.map((channel) => ({ channelId: channel.id, content: '' })),
      );
      setSelectedChannels(channels.map((channel) => channel.id));
      router.refresh();
    } catch (err) {
      console.log('Failed to create posts', err);
    }
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        setIsModalOpen(open);
        if (!open) {
          setScheduledAt(null);
          setBaseContent('');
          setChannelsContent(
            channels.map((channel) => ({ channelId: channel.id, content: '' })),
          );
          setSelectedChannels(channels.map((channel) => channel.id));
        }
      }}
    >
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
        {isScheduledAtInPast && (
          <div className="px-6">
            <div className="flex items-center gap-2 py-2 px-4 text-destructive border border-destructive rounded-md">
              <CircleAlert className="size-4" />
              <span>It seems like your selected date is in the past</span>
            </div>
          </div>
        )}
        <div className="max-h-[300px] overflow-y-auto px-6 py-4">
          {channels.length === 0 ? (
            <div className="min-h-[250px] h-full">
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No channels connected</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect a channel to start sharing your updates with the
                    world
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-background">
                {channels.map((channel) => {
                  return (
                    <ChannelsAvatar
                      key={channel.id}
                      channel={channel}
                      selectedChannels={selectedChannels}
                      setSelectedChannels={setSelectedChannels}
                    />
                  );
                })}
              </div>
              {selectedChannels.length === 0 ? (
                <div className="min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">
                      No channels selected
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Please select a channel to create post
                    </p>
                  </div>
                </div>
              ) : (
                <Textarea
                  placeholder="Enter post content"
                  className="min-h-[200px] focus-visible:ring-0 focus-visible:ring-transparent"
                  value={baseContent}
                  onChange={(e) => {
                    const value = e.target.value;
                    setBaseContent(value);
                    setChannelsContent((prevChannelContent) => {
                      return prevChannelContent.map((item) => ({
                        ...item,
                        content: value,
                      }));
                    });
                  }}
                />
              )}
            </div>
          )}
        </div>
        <DialogFooter className="px-6 py-4 bg-muted/80 rounded-b-xl gap-0 sm:justify-between border-t">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-muted-foreground/70 p-0 m-0">
              When To Post
            </p>
            <PostSchedulerModal
              scheduledAt={scheduledAt}
              setScheduledAt={setScheduledAt}
              setIsScheduledAtInPast={setIsScheduledAtInPast}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={isChannelsNotSelected || isContentEmpty}
              onClick={() => handleCreatePosts('DRAFT')}
            >
              Save As Drafts
            </Button>
            <Button
              size="sm"
              disabled={isChannelsNotSelected || !scheduledAt || isContentEmpty}
              onClick={() => handleCreatePosts('SCHEDULED')}
            >
              Schedule Posts
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
