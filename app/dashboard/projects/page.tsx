import Link from 'next/link';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Button } from '@/components/ui/button';
import { CreateNewProject } from '@/components/createNewProject';

export default function Dashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 sm:items-center mb-6">
        <div>
          <p className="text-lg font-bold">my projects</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Manage and organize your development projects
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/projects/updates">
            <Button variant="outline" className="rounded-lg text-sm">
              View Updates
            </Button>
          </Link>
          <CreateNewProject />
        </div>
      </div>
      <ProjectsGrid />
    </div>
  );
}
