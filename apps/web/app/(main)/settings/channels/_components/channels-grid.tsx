import { getAllChannels } from '@/app/data/channels/get-all-channels';
import { ChannelCard } from './channel-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Prisma } from '@buildinpubliq/db';

export async function ChannelsGrid({
  filters,
}: Readonly<{ filters: { platform?: Prisma.Platform } }>) {
  const allChannels = await getAllChannels(filters);

  return (
    <div>
      {allChannels.length === 0 ? (
        <div className="border min-h-[500px] flex justify-center items-center relative overflow-hidden rounded-md">
          <EmptyState>
            <div>
              <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                <Radio className="text-foreground/70" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Radio className="text-foreground/60" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                <Radio className="text-foreground/70" />
              </EmptyState.Mockup>
            </div>
            <EmptyState.Title>No channels connected</EmptyState.Title>
            <EmptyState.Description>
              Your connected channels will appear here
            </EmptyState.Description>
            <EmptyState.Actions>
              <Button>Connect Channels</Button>
              <Button variant="outline">Learn More</Button>
            </EmptyState.Actions>
          </EmptyState>
        </div>
      ) : (
        <div className="space-y-4">
          {allChannels.map((channel) => {
            return <ChannelCard key={channel.id} {...channel} />;
          })}
        </div>
      )}
    </div>
  );
}
