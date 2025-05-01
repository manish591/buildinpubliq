import Link from 'next/link';
import { CirclePlus } from 'lucide-react';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-lg font-bold">my projects</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Manage and organize your development projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-lg text-sm h-9">
            GitHub Plugin Settings
          </Button>
          <Link href="/dashboard/new">
            <Button variant="default" className="flex items-center gap-2">
              <CirclePlus strokeWidth={1} width={16} height={16} />
              <span>Create New Project</span>
            </Button>
          </Link>
        </div>
      </div>
      <ProjectsGrid />
    </div>
  );
}
