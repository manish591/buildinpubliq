import { verifyAuthSession } from '@/app/data/users/verify-auth-session';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default async function OverviewPage() {
  await verifyAuthSession();

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-4xl mx-auto py-6 px-6">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 sm:items-center mb-6">
          <div>
            <p className="text-3xl font-bold">overview</p>
            <p className="text-foreground/70 mt-1 text-sm">
              manage and organize your development projects
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
