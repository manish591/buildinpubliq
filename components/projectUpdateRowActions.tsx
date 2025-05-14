'use client';

import { useState } from 'react';
import { Edit, Ellipsis } from 'lucide-react';
import { editProjectUpdate } from '@/app/actions/updates';
import { Button } from '@/components/ui/button';
import { DeleteProjectUpdateButton } from '@/components/deleteProjectUpdateButton';
import { TUpdates } from '@/components/ProjectUpdatesTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProjectUpdateForm } from '@/components/ProjectUpdateForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export function ProjectUpdateRowActions({
  data,
  projectId,
  isTwitterConnected,
  isLinkedinConnected,
}: Readonly<{
  data: TUpdates;
  projectId: string;
  isTwitterConnected: boolean;
  isLinkedinConnected: boolean;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-transparent px-2 border-none">
            <Ellipsis className="h-5 w-5"></Ellipsis>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-36 rounded-lg"
          side={'bottom'}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuItem className="gap-2">
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent px-0 border-none h-6 gap-2 lowercase"
              >
                <Edit className="h-5 w-5 text-gray-500" />
                Edit
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            <DeleteProjectUpdateButton
              projectUpdateId={data.id}
              projectId={projectId}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="p-0">
        <DialogHeader>
          <div className="flex items-center md:col-start-2 md:col-span-2">
            <Card className="w-full p-0 border-none shadow-none">
              <CardHeader className="pt-10">
                <CardTitle>edit update</CardTitle>
                <CardDescription>
                  fill out the form to edit the update.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ProjectUpdateForm
                  isTwitterConnected={isTwitterConnected}
                  isLinkedinConnected={isLinkedinConnected}
                  defaultProjectUpdateData={{
                    id: data.id,
                    tagline: data.tagline,
                    description: data.description,
                    platform: data.channel,
                    status: data.status,
                    scheduledAt: data.scheduledAt,
                    projectId: projectId,
                  }}
                  onSubmitFunc={editProjectUpdate}
                  closeModal={setIsModalOpen}
                />
              </CardContent>
            </Card>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
