import { CirclePlus, Clock, SquarePen, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectUpdatesTable from '@/components/ProjectUpdatesTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default async function ProjectUpdates() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-8 pb-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-lg font-bold">my updates</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            manage your announcement posts that are generated from pull requests
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger>
              <Button variant="default" className="flex items-center gap-2">
                <CirclePlus strokeWidth={1} width={16} height={16} />
                <span>Create New update</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl">Create new update</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
      {/* <div className="grid gap-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <SquarePen className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">09</div>
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
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">Posts in queue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Wifi className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Posts published</p>
          </CardContent>
        </Card>
      </div> */}
      <div className="bg-background rounded-lg shadow-md p-6 mt-6">
        {/* <Tabs defaultValue="all updates" className="w-full">
          <TabsList>
            <TabsTrigger value="all updates">all updates</TabsTrigger>
            <TabsTrigger value="draft">draft</TabsTrigger>
            <TabsTrigger value="scheduled">scheduled</TabsTrigger>
            <TabsTrigger value="published">published</TabsTrigger>
          </TabsList>
          <TabsContent value="all updates">
            <ProjectUpdatesTable />
          </TabsContent>
          <TabsContent value="draft">
            all draft updates will show here
          </TabsContent>
          <TabsContent value="scheduled">
            all scheduled updates will show here
          </TabsContent>
          <TabsContent value="published">
            all published updates will show here
          </TabsContent>
        </Tabs> */}
        <ProjectUpdatesTable />
      </div>
    </div>
  );
}
