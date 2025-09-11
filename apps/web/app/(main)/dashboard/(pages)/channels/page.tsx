import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function ChannelsPage() {
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
                <BreadcrumbPage>channels</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="w-full max-w-6xl mx-auto py-6 px-6">
        <div className="mb-8">
          <div>
            <p className="text-3xl font-bold">my channels</p>
            <p className="text-foreground/70 mt-1 text-sm">
              manage and organize your channels here
            </p>
          </div>
        </div>
        <div>
          <div className="">
            <p className="text-xl font-medium">connect twitter</p>
          </div>
          <div className="">
            <p className="text-xl font-medium">connect linkedin</p>
          </div>
        </div>
      </main>
    </div>
  );
}
