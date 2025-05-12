import Link from 'next/link';
import { SocialPlatform, Status } from '@prisma/client';
import { Check, Edit, Ellipsis, FolderPlus, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateNewUpdate } from './createNewUpdate';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getConnectedChannels } from '@/app/profile/actions';
import { format } from 'date-fns';
import { DeleteProjectUpdateButton } from './deleteProjectUpdateButton';

export type TUpdates = {
  id: string;
  tagline: string;
  description: string;
  projectId: string;
  userId: string;
  scheduledAt: Date | null;
  postedAt: Date | null;
  status: Status;
  channel: SocialPlatform[];
  createdAt: Date;
  updatedAt: Date;
};

export default async function ProjectUpdatesTable({
  data,
  projectId,
}: Readonly<{ data: TUpdates[]; projectId: string }>) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  const channelData = await getConnectedChannels(session.user.id ?? '');
  const isLinkedinConnected = channelData.some(
    (channel) => channel.platform == 'LINKEDIN',
  );
  const isTwitterConnected = channelData.some(
    (channel) => channel.platform == 'TWITTER',
  );

  return (
    <>
      {data.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-muted/40 rounded-full p-6 mb-6">
            <FolderPlus className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No updates yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            You haven't created any updates yet.
            <br /> Start by creating your first update.
          </p>
          <CreateNewUpdate
            isLinkedinConnected={isLinkedinConnected}
            isTwitterConnected={isTwitterConnected}
            projectId={projectId}
          />
        </div>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead className="hidden sm:table-cell">Platforms</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right sm:table-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="text-base line-clamp-3 max-w-sm">
                      {item.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex space-x-1">
                      {item.channel.map((channelName) => {
                        return (
                          <Badge
                            key={channelName}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {channelName}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.status != 'DRAFT' && (
                      <div className="flex gap-1 items-center">
                        {item.status === 'SCHEDULED' ? (
                          <Clock className="h-3 w-3 text-gray-500"></Clock>
                        ) : (
                          <Check className="h-3 w-3 text-green-500"></Check>
                        )}
                        <span className="mb-[3px]">
                          {item.scheduledAt &&
                            format(item?.scheduledAt, 'LLLL d, HH:mm aaa')}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-transparent px-2 border-none"
                          >
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
                              projectUpdateId={item.id}
                              projectId={projectId}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="pr-4">
                            {item.tagline}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="bg-secondary/30 p-4 rounded-md mt-4">
                          {item.description}
                        </div>
                        <DialogFooter className="mt-6">
                          <Link
                            href={`https://x.com/compose/post?text=${item.description}`}
                            target="_blank"
                          >
                            <Button>Post On Twitter</Button>
                          </Link>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
}
