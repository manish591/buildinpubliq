import { auth } from '@/auth';
import { notFound, redirect } from 'next/navigation';
import { Clock, ExternalLink, SquarePen, Wifi } from 'lucide-react';
import getProjectDetails from '@/app/actions/projects';
import ProjectUpdatesTable from '@/components/ProjectUpdatesTable';
import { CreateNewUpdate } from '@/components/createNewUpdate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllProjectUpdates } from './actions';
import { getConnectedChannels } from '@/app/profile/actions';
import Link from 'next/link';

export default async function ProjectUpdates({
  params,
}: Readonly<{ params: Promise<{ projectID: string }> }>) {
  const session = await auth();

  if (!session?.user) {
    return redirect('/auth');
  }

  const { projectID } = await params;
  const projectDetails = await getProjectDetails(projectID);

  if (projectDetails == null) {
    notFound();
  }

  const allUpdates = await getAllProjectUpdates(projectDetails.id);
  const draftUpdates = allUpdates.filter((update) => update.status === 'DRAFT');
  const scheduledUpdates = allUpdates.filter(
    (update) => update.status === 'SCHEDULED',
  );
  const publishedUpdates = allUpdates.filter(
    (update) => update.status === 'PUBLISHED',
  );

  const channelData = await getConnectedChannels(session.user.id ?? '');
  const isLinkedinConnected = channelData.some(
    (channel) => channel.platform == 'LINKEDIN',
  );
  const isTwitterConnected = channelData.some(
    (channel) => channel.platform == 'TWITTER',
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 pb-8 px-4">
      <div className="flex justify-between items-center mb-6 gap-3">
        <div>
          <Link
            href={`${projectDetails.repositoryUrl}`}
            className="text-lg font-bold flex items-center gap-2"
          >
            {projectDetails.title}
            <ExternalLink className="h-5 w-5 text-gray-500"></ExternalLink>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs sm:text-sm">
            {projectDetails.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CreateNewUpdate
            isLinkedinConnected={isLinkedinConnected}
            isTwitterConnected={isTwitterConnected}
            projectId={projectID}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:gap-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <SquarePen className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftUpdates.length}</div>
            <p className="text-xs text-muted-foreground">
              Posts in draft stage
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledUpdates.length}</div>
            <p className="text-xs text-muted-foreground">Posts in queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Wifi className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedUpdates.length}</div>
            <p className="text-xs text-muted-foreground">Posts published</p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-background rounded-lg shadow-md p-6 mt-6">
        <Tabs defaultValue="all updates" className="w-full">
          <TabsList>
            <TabsTrigger value="all updates">all updates</TabsTrigger>
            <TabsTrigger value="draft">draft</TabsTrigger>
            <TabsTrigger value="scheduled">scheduled</TabsTrigger>
            <TabsTrigger value="published">published</TabsTrigger>
          </TabsList>
          <TabsContent value="all updates">
            <ProjectUpdatesTable data={allUpdates} projectId={projectID} />
          </TabsContent>
          <TabsContent value="draft">
            <ProjectUpdatesTable data={draftUpdates} projectId={projectID} />
          </TabsContent>
          <TabsContent value="scheduled">
            <ProjectUpdatesTable
              data={scheduledUpdates}
              projectId={projectID}
            />
          </TabsContent>
          <TabsContent value="published">
            <ProjectUpdatesTable
              data={publishedUpdates}
              projectId={projectID}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
