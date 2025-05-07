'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CirclePlus } from 'lucide-react';
import { Repository } from '@/app/actions/github';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ListRepositoriesContainer from '@/components/ListRepositoriesContainer';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createProject } from '@/app/actions/projects';
import { STATUS } from '@/constants/response';
import InstallRepo from './InstallRepo';

export function CreateProjectForm({
  isGithubAppInstalled,
}: Readonly<{ isGithubAppInstalled: boolean }>) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  async function handleCreateProjectForm(
    e: React.SyntheticEvent<HTMLButtonElement>,
  ) {
    e.preventDefault();

    if (!title || !description || !selectedRepo) {
      console.log('Data is missing');
      return;
    }

    try {
      const data = await createProject(title, description, selectedRepo);

      if (data.status === STATUS.ERROR) {
        console.log('ERROR: ', data.message);
        return;
      }

      if (data.status === STATUS.SUCCESS) {
        router.refresh();
        console.log('successfully created new project');
      }
    } catch (err) {
      console.log('Error occured', err);
    } finally {
      setDescription('');
      setSelectedRepo(null);
      setTitle('');
      setIsModalOpen(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="default" className="flex items-center gap-2">
          <CirclePlus strokeWidth={1} width={16} height={16} />
          <span>Create New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {isGithubAppInstalled ? (
            <div className="flex items-center md:col-start-2 md:col-span-2">
              <Card className="w-full p-0 border-none shadow-none">
                <CardHeader className="px-0">
                  <CardTitle>Create a New Project</CardTitle>
                  <CardDescription>
                    Fill out the form to create a new project.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-0">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter project title"
                      className="bg-transparent"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="please add relevant data, this will help us generate meaningful updates"
                      className="bg-transparent min-h-[100px]"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <ListRepositoriesContainer
                    selectedRepo={selectedRepo}
                    setSelectedRepo={setSelectedRepo}
                  />
                </CardContent>
                <CardFooter className="px-0 pt-6">
                  <Button
                    onClick={() => {
                      setDescription('');
                      setSelectedRepo(null);
                      setTitle('');
                      setIsModalOpen(false);
                    }}
                    variant="secondary"
                    className="mr-auto"
                  >
                    cancel
                  </Button>
                  <Button
                    type="submit"
                    className="ml-auto"
                    disabled={!title || !description || !selectedRepo}
                    onClick={handleCreateProjectForm}
                  >
                    create project
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <InstallRepo />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
