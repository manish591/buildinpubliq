'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IconBrandGithub,
  IconBulb,
  IconDotsVertical,
  IconEdit,
  IconNote,
  IconTrash,
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Prisma } from '@buildinpubliq/db';
import { useEditPostModal } from './edit-idea-modal';
import { useDeleteIdeaModal } from './delete-idea-modal';
import { useCreatePostModal } from '../../posts/_components/create-post-modal';

export function IdeaCard({ ideaData }: Readonly<{ ideaData: Prisma.Idea }>) {
  const { EditIdeaModal, setShowEditIdeaModal } = useEditPostModal({
    defaultValues: {
      id: ideaData.id,
      title: ideaData.title,
      content: ideaData.content,
    },
  });
  const { DeleteIdeaModal, setShowDeleteIdeaModal } = useDeleteIdeaModal({
    id: ideaData.id,
  });
  const { CreatePostModal, setShowCreatePostModal } = useCreatePostModal({
    content: ideaData.content,
  });

  return (
    <div className="border p-4 rounded-xl hover:bg-muted/70 group">
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-10 h-10 flex items-center justify-center border rounded-full bg-gradient-to-b from-transparent to-secondary ">
          <IconBulb className="text-muted-foreground/90" strokeWidth={1.5} />
        </div>
        <div className="flex-1 flex items-center justify-between gap-12">
          <div>
            <p className="font-medium leading-[1.5] capitalize">
              {ideaData.title}
            </p>
            <div className="grid grid-cols-[minmax(0,1fr)_max-content] gap-2 items-center">
              <p className="text-muted-foreground whitespace-nowrap overflow-hidden overflow-ellipsis capitalize">
                {ideaData.content}
              </p>
              <div className="shrink-0">
                {
                  <p className="text-xs p-0 m-0 text-muted-foreground/70">
                    {formatDistanceToNow(ideaData.createdAt, {
                      addSuffix: true,
                    })}
                  </p>
                }
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-4 ml-auto relative">
              {ideaData.githubRepositoryId ? (
                <Badge
                  variant="outline"
                  className={cn(
                    'rounded-md h-7 font-normal px-2 capitalize bg-muted',
                    'flex gap-2 items-center',
                  )}
                >
                  <IconBrandGithub
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                  buildinpubliq
                </Badge>
              ) : null}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-7 h-7 border-transparent hover:bg-muted',
                      'hover:border-border group-hover:border-border cursor-pointer',
                    )}
                  >
                    <IconDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setShowCreatePostModal(true);
                    }}
                  >
                    <IconNote className="size-4" />
                    Convert to post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setShowEditIdeaModal(true);
                    }}
                  >
                    <IconEdit className="size-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      setShowDeleteIdeaModal(true);
                    }}
                  >
                    <IconTrash className="size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <EditIdeaModal />
      <DeleteIdeaModal />
      <CreatePostModal />
    </div>
  );
}
