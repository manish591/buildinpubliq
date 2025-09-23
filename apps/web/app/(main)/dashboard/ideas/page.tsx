import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { getConnectedRepositories } from '@/app/data/github/get-connected-repositories';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { CreateIdeaModal } from './_components/create-idea-modal';
import { IdeasActionBar } from './_components/ideas-action-bar';
import { IdeasList } from './_components/ideas-list';

export default async function IdeasPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  const params = await searchParams;
  const query = (params.query as string) ?? undefined;
  const repository = (params.repository as string) ?? undefined;
  const githubRepositories = await getConnectedRepositories();

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Ideas</MainHeader.Title>
          <CreateIdeaModal />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <IdeasActionBar githubRepositories={githubRepositories} />
        <Suspense fallback={<div className="mt-6">Loading...</div>}>
          <IdeasList
            options={{
              query,
              repository,
            }}
          />
        </Suspense>
      </main>
    </div>
  );
}
