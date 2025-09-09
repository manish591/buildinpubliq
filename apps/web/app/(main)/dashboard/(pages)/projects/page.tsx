import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { verifyAuthSession } from '@/app/data/users/verify-auth-session';
import { hasGithubIntegration } from '@/app/data/github/has-github-integration';
import { ProjectsSearchBar } from './_components/project-search-bar';
import { GithubPluginSettings } from './_components/github-plugin-settings';
import { InstallGithubIntegration } from './_components/install-github-integration';
import { ProjectsGrid } from './_components/projects-grid';

export default async function ProjectsPage() {
  await verifyAuthSession();
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
                <BreadcrumbPage>projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-4xl mx-auto py-6 px-6">
        <div className="mb-8">
          <div>
            <p className="text-3xl font-bold">my projects</p>
            <p className="text-foreground/70 mt-1 text-sm">
              manage and organize your development projects
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ProjectsSearchBar />
          <div className="flex gap-3">
            {githubIntegrationData && (
              <GithubPluginSettings
                githubIntegrationInstallationId={
                  githubIntegrationData.installationId
                }
              />
            )}
            {githubIntegrationData ? (
              <Button
                variant="default"
                className="flex items-center gap-2 cursor-pointer"
                asChild
              >
                <Link href="/dashboard/projects/new">
                  <Plus strokeWidth={2} width={16} height={16} />
                  <span>Create New Project</span>
                </Link>
              </Button>
            ) : (
              <InstallGithubIntegration />
            )}
          </div>
        </div>
        <ProjectsGrid />
      </main>
    </div>
  );
}
