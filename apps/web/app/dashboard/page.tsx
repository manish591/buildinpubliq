import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isGithubIntegrationInstalled } from '@/app/actions/github';
import { auth } from '@/auth';
import { CreateNewProject } from '@/components/create-new-project';
import { ProjectsGrid } from '@/components/projects-grid';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect('/auth');
  }

  const githubInstallationData = await isGithubIntegrationInstalled(
    session.user.id,
  );

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-7xl mx-auto mt-10 px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 sm:items-center mb-6">
          <div>
            <p className="text-lg font-bold">my projects</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              manage and organize your development projects
            </p>
          </div>
          <div className="flex gap-3">
            {githubInstallationData && (
              <Link
                href={`https://github.com/settings/installations/${githubInstallationData.installationId}`}
                target="_blank"
              >
                <Button
                  variant="outline"
                  className="rounded-lg text-sm flex items-center"
                >
                  <span>github plugin settings</span>
                  <ExternalLink></ExternalLink>
                </Button>
              </Link>
            )}
            <CreateNewProject
              isGithubAppInstalled={githubInstallationData != null}
            />
          </div>
        </div>
        <ProjectsGrid isGithubAppInstalled={githubInstallationData != null} />
      </main>
    </div>
  );
}
