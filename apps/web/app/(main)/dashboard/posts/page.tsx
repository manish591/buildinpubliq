import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { PostsChannelFilterDropdown } from './_components/posts-channel-filter-dropdown';
import { PostsTimezonesDropdown } from './_components/posts-timezones-dropdown';
import { PostsTabList } from './_components/posts-tablist';
import { CreatePostModal } from './_components/create-post-modal';
import { PostsTabcontent } from './_components/posts-tabcontent';

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
  const tab = params.tab as string | undefined;

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Posts</MainHeader.Title>
          <CreatePostModal />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="flex items-center justify-between border-b">
          <PostsTabList />
          <div className="flex items-center gap-2">
            <PostsChannelFilterDropdown />
            <PostsTimezonesDropdown />
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <PostsTabcontent tab={tab ?? 'draft'} />
        </Suspense>
      </main>
    </div>
  );
}
