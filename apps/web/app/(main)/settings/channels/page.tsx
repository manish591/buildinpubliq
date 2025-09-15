import type { Prisma } from '@buildinpubliq/db';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
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
  const platform = params.platform as Prisma.Platform | undefined;

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Channels</MainHeader.Title>
          <ConnectChannelsModal />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="mb-6">
          <ChannelFilterDropdown />
        </div>
        <Suspense fallback={<p>loading...</p>}>
          <ChannelsGrid
            filters={{
              platform,
            }}
          />
        </Suspense>
      </main>
    </div>
  );
}
