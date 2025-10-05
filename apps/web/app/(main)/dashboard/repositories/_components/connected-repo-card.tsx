'use client';

import type { Prisma } from '@buildinpubliq/db';
import {
  IconBrandGithub,
  IconDotsVertical,
  IconExternalLink,
  IconTrash,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useDisconnectRepoModal } from './disconnect-repo-modal';

export function ConnectedRepoCard({
  data,
}: Readonly<{ data: Prisma.GithubRepository }>) {
  const { DisconnectRepoModal, setShowDisconnectRepoModal } =
    useDisconnectRepoModal({ id: data.id });

  return (
    <>
      <div className="p-4 hover:bg-muted/70 group rounded-md">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-7 h-7 hidden sm:flex items-center justify-center border rounded-full bg-gradient-to-b from-transparent to-secondary ">
            <IconBrandGithub
              className="size-4 text-muted-foreground/90"
              strokeWidth={2}
            />
          </div>
          <div className="flex-1 flex items-center justify-between gap-12">
            <div>
              <Link
                href={data.repositoryUrl}
                target="_blank"
                className="font-medium leading-[1.5] lowercase hover:underline"
              >
                {data.fullName}
              </Link>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-4 ml-auto relative">
                <Badge
                  variant="outline"
                  className={cn(
                    'rounded-md h-7 font-normal px-2 capitalize bg-muted',
                    'flex gap-2 items-center',
                  )}
                >
                  {data.language}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn(
                        'w-7 h-7 border-transparent hover:bg-muted',
                        'hover:border-border group-hover:border-border cursor-pointer',
                      )}
                    >
                      <IconDotsVertical className="size-[14px]!" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      asChild
                    >
                      <Link href={data.repositoryUrl} target="_blank">
                        <IconExternalLink className="size-4" />
                        View repo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        setShowDisconnectRepoModal(true);
                      }}
                    >
                      <IconTrash className="size-4 text-destructive" />
                      <span className="text-destructive">Disconnect</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DisconnectRepoModal />
    </>
  );
}
