'use client';

import { Edit, ExternalLink, MoveHorizontal, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
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
import { EditProjectModal } from './edit-project-modal';

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
            <DialogTrigger className="hover:bg-transparent w-full flex justify-start text-left bg-transparent px-0 text-foreground no-underline lowercase items-center gap-2 cursor-pointer">
              <Edit className="h-4 w-4 text-foreground/70"></Edit>
              edit
            </DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={repositoryUrl}
              target="_blank"
              className="w-full flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4 text-foreground/70"></ExternalLink>
              view repo
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/projects/${id}`}
              className="w-full flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4 text-foreground/70"></RefreshCcw>
              view updates
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent>
          <DialogHeader>
            <EditProjectModal
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
