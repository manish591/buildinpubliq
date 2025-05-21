'use client';

import { EditProjectForm } from '@/components/edit-project-form';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export function EditProject({
  id,
  title,
  description,
  setIsOpen,
}: Readonly<{
  id: string;
  title: string;
  description: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <div className="flex items-center md:col-start-2 md:col-span-2">
      <Card className="w-full p-0 border-none shadow-none">
        <CardHeader className="px-2">
          <CardTitle>edit project</CardTitle>
          <CardDescription>
            fill out the form to edit a project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-2">
          <EditProjectForm
            setIsOpen={setIsOpen}
            defaultProjectData={{
              id,
              title,
              description,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
