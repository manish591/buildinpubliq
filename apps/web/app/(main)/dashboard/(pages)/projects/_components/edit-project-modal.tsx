'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EditProjectForm } from './edit-project-form';

export function EditProjectModal({
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
      <Card className="w-full p-0 border-none shadow-none bg-background">
        <CardHeader className="px-0">
          <CardTitle>edit project</CardTitle>
          <CardDescription>
            fill out the form to edit a project.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
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
