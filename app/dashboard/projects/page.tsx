import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { isGithubIntegrationInstalled } from '@/app/actions/github';
import { auth } from '@/auth';
import { CreateProjectForm } from '@/components/CreateProjectForm';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id ?? '';
  const isGithubAppInstalled = await isGithubIntegrationInstalled(userId);

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 sm:items-center mb-6">
        <div>
          <p className="text-lg font-bold">my projects</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Manage and organize your development projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/projects/updates">
            <Button variant="outline" className="rounded-lg text-sm h-9">
              View Updates
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger>
              <Button variant="default" className="flex items-center gap-2">
                <CirclePlus strokeWidth={1} width={16} height={16} />
                <span>Create New Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <CreateProjectForm
                  isGithubAppInstalled={isGithubAppInstalled}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ProjectsGrid />
    </div>
  );
}
