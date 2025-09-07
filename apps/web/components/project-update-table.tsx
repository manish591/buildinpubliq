import { format } from 'date-fns';
import { Check, Clock, FolderPlus } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getConnectedChannels } from '@/app/profile/actions';
import { auth } from '@/auth';
import { CreateNewUpdate } from '@/components/create-new-project-update';
import { ProjectUpdateRowActions } from '@/components/project-update-row-action';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export enum Status {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
}

export enum SocialPlatform {
  LINKEDIN = 'LINKEDIN',
  TWITTER = 'TWITTER',
}

export type TUpdates = {
  id: string;
  tagline: string;
  description: string;
  projectId: string;
  userId: string;
  scheduledAt: Date;
  postedAt: Date | null;
  status: Status;
  channel: SocialPlatform[];
  createdAt: Date;
  updatedAt: Date;
};

export async function ProjectUpdatesTable({
  data,
  projectId,
}: Readonly<{ data: TUpdates[]; projectId: string }>) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  const channelData = await getConnectedChannels(session.user.id ?? '');
  // const isLinkedinConnected = channelData.some(
  //   (channel) => channel.platform == 'LINKEDIN',
  // );
  // const isTwitterConnected = channelData.some(
  //   (channel) => channel.platform == 'TWITTER',
  // );
  const isLinkedinConnected = false;
  const isTwitterConnected = false;

  return (
    <>
      {data.length <= 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-muted/40 rounded-full p-6 mb-6">
            <FolderPlus className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">no updates yet</h2>
          <p className="text-muted-foreground text-center max-w-md mb-8">
            you haven&apos;t created any updates yet.
            <br /> start by creating your first update.
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
              <TableHead>content</TableHead>
              <TableHead className="hidden sm:table-cell">platforms</TableHead>
              <TableHead className="hidden sm:table-cell">status</TableHead>
              <TableHead className="hidden sm:table-cell">date</TableHead>
              <TableHead className="text-right sm:table-cell">
                actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="text-base line-clamp-4 max-w-md">
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
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
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
                    <ProjectUpdateRowActions
                      data={item}
                      projectId={projectId}
                      isTwitterConnected={isTwitterConnected}
                      isLinkedinConnected={isLinkedinConnected}
                    />
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
