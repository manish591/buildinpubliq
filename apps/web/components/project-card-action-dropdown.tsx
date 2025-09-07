'use client';

import { Edit, ExternalLink, MoveHorizontal, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { EditProject } from '@/components/edit-project';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoveHorizontal className="w-4 h-4" />
            <span className="sr-only">toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <DialogTrigger className="w-full">
              <Button className="hover:bg-transparent w-full flex justify-start text-left bg-transparent h-5 px-0 text-foreground no-underline lowercase">
                <Edit className="h-5 w-5 text-gray-500"></Edit>
                <span>edit</span>
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
              view repo
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
            <EditProject
              id={id}
              title={title}
              description={description}
              setIsOpen={setIsModalOpen}
            />
          </DialogHeader>
        </DialogContent>
      </DropdownMenu>
    </Dialog>
  );
}
