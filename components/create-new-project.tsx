'use client';

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InstallRepo } from '@/components/install-repo';
import { CreateProjectForm } from '@/components/create-project-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export function CreateNewProject({
  isGithubAppInstalled,
}: Readonly<{ isGithubAppInstalled: boolean }>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <Button variant="default" className="flex items-center gap-2">
          <CirclePlus strokeWidth={2} width={16} height={16} />
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
                  <CreateProjectForm
                    setIsOpen={setIsModalOpen}
                    defaultProjectData={{
                      title: '',
                      description: '',
                      id: '',
                      selectedRepo: null,
                    }}
                  />
                </CardContent>
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
