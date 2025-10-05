import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { getUserDetails } from '@/app/data/users/get-user-details';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CreatePostButton } from './_components/create-post-button';
import { PostsActionBar } from './_components/posts-action-bar';
import { PostsContainer } from './_components/posts-container';

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
  const query = params.query as string | undefined;

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <div className="flex items-center gap-2">
            <SidebarTrigger className="sm:hidden" />
            <MainHeader.Title>Posts</MainHeader.Title>
          </div>
          <CreatePostButton />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-8">
        <PostsActionBar />
        <Suspense fallback={<p>Loading...</p>}>
          <PostsContainer status={status} channel={channel} query={query} />
        </Suspense>
      </main>
    </div>
  );
}
