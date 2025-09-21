import { MainHeader } from '../../_components/main-header';
import { RepoSearchBox } from './_components/repo-search-bar';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ConnectedRepoContainer } from './_components/connected-repo-container';
import { ConnectRepoButton } from './_components/connect-repo-button';
import { hasGithubIntegration } from '@/app/data/github/has-github-integration';

export default async function Repositories({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  const isgithubIntegrationInstalled = await hasGithubIntegration();

  const params = await searchParams;
  const query = (params.query as string) ?? undefined;

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Repositories</MainHeader.Title>
          <ConnectRepoButton
            isGithubIntegrationInstalled={!!isgithubIntegrationInstalled}
          />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div>
          <RepoSearchBox />
        </div>
        <Suspense>
          <ConnectedRepoContainer
            options={{
              query,
            }}
          />
        </Suspense>
      </main>
    </div>
  );
}
