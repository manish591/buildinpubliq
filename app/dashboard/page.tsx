import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { ProjectsGrid } from '@/components/projects-grid';
import { CreateNewProject } from '@/components/create-new-project';
import { isGithubIntegrationInstalled } from '@/app/actions/github';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect('/auth');
  }

  const githubInstallationData = await isGithubIntegrationInstalled(
    session.user.id,
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
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
    </div>
  );
}
