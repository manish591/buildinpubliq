import { Suspense } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CreateProjectFormWrapper } from './_components/create-project-form-wrapper';

export default async function NewProjectPage() {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/projects">
                  projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>new</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-4xl mx-auto py-6 px-6">
        <div className="mb-8">
          <div>
            <p className="text-3xl font-bold">Create New Project</p>
            <p className="text-foreground/70 mt-1 text-sm">
              Fill out the form to create a new project.
            </p>
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <CreateProjectFormWrapper />
        </Suspense>
      </main>
    </div>
  );
}
