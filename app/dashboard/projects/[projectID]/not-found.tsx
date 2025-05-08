import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Project not found
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find the project you're looking for. It may have been
        deleted or the URL might be incorrect.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="h-5 w-5 text-gray-500" />
            <span>Back to Projects</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
