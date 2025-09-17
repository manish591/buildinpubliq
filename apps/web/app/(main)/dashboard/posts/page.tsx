import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { CreatePostModal } from './_components/create-post-modal';
import { PostsContainer } from './_components/posts-container';
import { PostsDisplayDropdown } from './_components/posts-display-dropdown';
import { PostsFilterDropdown } from './_components/posts-filter-dropdown';
import { PostsSearchBox } from './_components/posts-search-box';
import { getAllChannels } from '@/app/data/channels/get-all-channels';

export default async function PostsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const userData = await getUserDetails();

  if (!userData) {
    redirect('/auth');
  }

  const params = await searchParams;
  const status = params.status as string | undefined;
  const channel = params.channel as string | undefined;

  const channels = await getAllChannels();

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Posts</MainHeader.Title>
          <CreatePostModal channels={channels} />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PostsFilterDropdown />
            <PostsDisplayDropdown />
          </div>
          <div className="flex items-center gap-2">
            <PostsSearchBox />
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <PostsContainer status={status ?? 'draft'} channel={channel} />
        </Suspense>
      </main>
    </div>
  );
}
