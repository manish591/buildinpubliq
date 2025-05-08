import { CirclePlus, Clock, SquarePen, Wifi } from 'lucide-react';
import { notFound } from 'next/navigation';
import getProjectDetails from '@/app/actions/projects';
import { Button } from '@/components/ui/button';
import ProjectUpdatesTable from '@/components/ProjectUpdatesTable';
import { CreateNewUpdate } from '@/components/createNewUpdate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { getAllProjectUpdates } from './actions';

export default async function ProjectUpdates({
  params,
}: Readonly<{ params: Promise<{ projectID: string }> }>) {
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

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 pb-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-lg font-bold">{projectDetails.title}</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {projectDetails.description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <Button variant="default" className="flex items-center gap-2">
                <CirclePlus strokeWidth={1} width={16} height={16} />
                <span>create new update</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <CreateNewUpdate />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
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
            <ProjectUpdatesTable data={allUpdates} />
          </TabsContent>
          <TabsContent value="draft">
            <ProjectUpdatesTable data={draftUpdates} />
          </TabsContent>
          <TabsContent value="scheduled">
            <ProjectUpdatesTable data={scheduledUpdates} />
          </TabsContent>
          <TabsContent value="published">
            <ProjectUpdatesTable data={publishedUpdates} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
