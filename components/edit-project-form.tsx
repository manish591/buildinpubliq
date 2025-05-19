'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editProject } from '@/app/actions/projects';
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

export type EditProjectFormProps = {
  id: string;
  title: string;
  description: string;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditProjectForm({
  id,
  title,
  description,
  setIsOpenForm,
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
      editProject(id, projectTitle, projectDescription);
      setIsOpenForm(false);
      router.refresh();
      console.log('project edited successfully');
    } catch (err) {
      console.log('Error occured', err);
    } finally {
      setProjectTitle('');
      setProjectDescription('');
    }
  }

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
        </CardContent>
        <CardFooter className="mt-6 px-2 pb-0">
          <Button
            onClick={() => {
              setProjectTitle('');
              setProjectDescription('');
              setIsOpenForm(false);
            }}
            variant="secondary"
            className="mr-auto"
          >
            cancel
          </Button>
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
