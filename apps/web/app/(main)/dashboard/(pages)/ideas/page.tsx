import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { IdeasSearchBar } from './_components/ideas-search-bar';
import { IdeasLayoutSwitcher } from './_components/ideas-layout-switcher';
import { IdeasSortBy } from './_components/ideas-sort-by';
import { RepositoriesList } from './_components/repositories-list';
import { hasGithubIntegration } from '@/app/data/github/has-github-integration';
import { InstallGithubIntegration } from './_components/install-github-integration';
import { IdeasList } from './_components/ideas-list';
import GithubSVGIcon from '@/components/svg-icons/github';
import { getCurrentUser } from '@/app/data/users/verify-auth-session';
import { redirect } from 'next/navigation';

export default async function IdeasPage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    redirect('/auth');
  }

  const githubIntegrationData = await hasGithubIntegration();

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>ideas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-6xl mx-auto py-6 px-6">
        <div className="mb-8">
          <div>
            <p className="text-3xl font-bold">my ideas</p>
            <p className="text-foreground/70 mt-1 text-sm">
              manage and organize your post ideas here
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <IdeasSearchBar />
          <IdeasSortBy />
          <IdeasLayoutSwitcher />
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Idea
          </Button>
        </div>
        <div className="flex mx-auto gap-8">
          <div className="w-80">
            <div className="py-6">
              <h2 className="font-semibold text-lg text-sidebar-foreground mb-4">
                Repositories
              </h2>
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
