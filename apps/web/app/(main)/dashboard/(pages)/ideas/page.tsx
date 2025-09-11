import { Suspense } from 'react';
import { IdeasSearchBar } from './_components/ideas-search-bar';
import { RepositoriesList } from './_components/repositories-list';
import { hasGithubIntegration } from '@/app/data/github/has-github-integration';
import { InstallGithubIntegration } from './_components/install-github-integration';
import { IdeasList } from './_components/ideas-list';
import GithubSVGIcon from '@/components/svg-icons/github';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { redirect } from 'next/navigation';
import { CreateIdea } from './_components/create-idea';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { IdeasDisplayDropdown } from './_components/ideas-display-dropdown';
import { IdeasFilterDropdown } from './_components/ideas-filters-dropdown';

export default async function IdeasPage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  const githubIntegrationData = await hasGithubIntegration();

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>ideas</MainHeader.Title>
          <CreateIdea />
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <IdeasFilterDropdown />
            <IdeasDisplayDropdown />
          </div>
          <IdeasSearchBar />
        </div>
        <div className="flex mx-auto gap-8">
          <div className="w-80">
            <div className="py-6">
              <h2 className="font-semibold text-lg mb-4">Repositories</h2>
              {githubIntegrationData ? (
                <Suspense fallback={<p>loading...</p>}>
                  <RepositoriesList />
                </Suspense>
              ) : (
                <div className="p-8 rounded-md">
                  <div className="mb-4 text-center">
                    <GithubSVGIcon className="h-11 w-11 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-medium text-lg mb-2">Connect GitHub</h3>
                    <p className="text-sm text-foreground/70 mb-4 text-pretty max-w-[70%] mx-auto">
                      Install the GitHub app to access your repositories and
                      generate ideas from your PRs.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <InstallGithubIntegration />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 py-6">
            <IdeasList />
          </div>
        </div>
      </main>
    </div>
  );
}
