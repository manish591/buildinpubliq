import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { hasGithubIntegration } from '@/app/data/github/has-github-integration';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MainHeader } from '../../_components/main-header';
import { ConnectRepoButton } from './_components/connect-repo-button';
import { ConnectedRepoContainer } from './_components/connected-repo-container';
import { RepoSearchBox } from './_components/repo-search-bar';

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
          <div className="flex items-center gap-2">
            <SidebarTrigger className="sm:hidden" />
            <MainHeader.Title>Repositories</MainHeader.Title>
          </div>
          <ConnectRepoButton
            isGithubIntegrationInstalled={!!isgithubIntegrationInstalled}
          />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-8">
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
