import { Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { MainHeader } from '../../_components/main-header';
import { ChannelCard } from './_components/channel-card';
import { ConnectChannelsModal } from './_components/connect-channels-modal';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { redirect } from 'next/navigation';
import { getAllChannels } from '@/app/data/channels/get-all-channels';
import { ChannelFilterDropdown } from './_components/channel-filter-dropdown';

export default async function ChannelsSettingsPage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  const allChannels = await getAllChannels();

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Channels</MainHeader.Title>
          <ConnectChannelsModal />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="flex items-center gap-3 justify-between mb-6">
          <div className="flex items-center gap-2">
            <ChannelFilterDropdown />
          </div>
        </div>
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
          allChannels.map((channel) => {
            return <ChannelCard key={channel.id} {...channel} />;
          })
        )}
      </main>
    </div>
  );
}
