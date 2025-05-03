'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { STATUS } from '@/constants/response';
import { editProject } from '@/app/actions/projects';
import { useRouter } from 'next/navigation';

export type EditProjectFormProps = {
  id: string;
  title: string;
  description: string;
};

export function EditProjectForm({
  id,
  title,
  description,
}: Readonly<EditProjectFormProps>) {
  const [projectTitle, setProjectTitle] = useState(title);
  const [projectDescription, setProjectDescription] = useState(description);
  const router = useRouter();

  async function handleEditProject(e: React.SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!title || !description) {
      console.log('Data is missing');
      return;
    }

    try {
      const data = await editProject(id, projectTitle, projectDescription);

      console.log('the data', data);

      if (data.status === STATUS.SUCCESS) {
        router.refresh();
      }

      if (data.status === STATUS.ERROR) {
        console.log('ERROR: ', data.message);
      }
    } catch (err) {
      console.log('Error occured', err);
    }
  }

  return (
    <div className="flex items-center mb-4 md:col-start-2 md:col-span-2">
      <Card className="w-full p-0 border-none shadow-none">
        <CardHeader className="px-2">
          <CardTitle>edit project</CardTitle>
          <CardDescription>
            fill out the form to edit a project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-2">
          <div className="space-y-2">
            <Label htmlFor="title">project title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              className="bg-transparent"
              value={projectTitle}
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">project description</Label>
            <Textarea
              id="description"
              placeholder="Please add relevant data, This will help us generate meaningful updates"
              className="bg-transparent min-h-[100px]"
              value={projectDescription}
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
            />
          </div>
          {/* add input to display seelcted repo readonly */}
        </CardContent>
        <CardFooter className="mt-6 px-2">
          <Button
            type="submit"
            className="ml-auto"
            disabled={!title || !description}
            onClick={handleEditProject}
          >
            edit project
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
