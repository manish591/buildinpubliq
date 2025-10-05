import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MainHeader } from '../../_components/main-header';
import { ChannelFilterDropdown } from './_components/channel-filter-dropdown';
import { ChannelsGrid } from './_components/channels-grid';
import { ConnectChannelsModal } from './_components/connect-channels-modal';

export default async function ChannelsSettingsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  const params = await searchParams;
  const platform = params.platform as string | undefined;

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="sm:hidden" />
            <MainHeader.Title>Channels</MainHeader.Title>
          </div>
          <ConnectChannelsModal />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-8">
        <div className="mb-6">
          <ChannelFilterDropdown />
        </div>
        <Suspense fallback={<p>loading...</p>}>
          <ChannelsGrid
            options={{
              platform,
            }}
          />
        </Suspense>
      </main>
    </div>
  );
}
