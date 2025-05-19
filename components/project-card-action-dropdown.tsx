'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, ExternalLink, MoveHorizontal, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditProjectForm } from '@/components/edit-project-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export type ProjectCardDropdownProps = {
  id: string;
  title: string;
  description: string;
  repositoryUrl: string;
};

export function ProjectCardDropdown({
  id,
  title,
  description,
  repositoryUrl,
}: Readonly<ProjectCardDropdownProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoveHorizontal className="w-4 h-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <DialogTrigger className="w-full">
              <Button className="hover:bg-transparent w-full flex justify-start text-left bg-transparent h-5 px-0 text-foreground no-underline lowercase">
                <Edit className="h-5 w-5 text-gray-500"></Edit>
                <span>Edit</span>
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={repositoryUrl}
              target="_blank"
              className="w-full flex items-center gap-2"
            >
              <ExternalLink className="h-5 w-5 text-gray-500"></ExternalLink>
              View Repo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/projects/${id}`}
              className="w-full flex items-center gap-2"
            >
              <RefreshCcw className="h-5 w-5 text-gray-500"></RefreshCcw>
              view updates
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent>
          <DialogHeader>
            <EditProjectForm
              id={id}
              title={title}
              description={description}
              setIsOpenForm={setIsOpen}
            />
          </DialogHeader>
        </DialogContent>
      </DropdownMenu>
    </Dialog>
  );
}
