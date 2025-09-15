import { redirect } from 'next/navigation';
import { MainHeader } from '@/app/(main)/_components/main-header';
import { Button } from '@/components/ui/button';
import { CalendarCheck, FileCheck, FilePen, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostsChannelFilterDropdown } from './_components/posts-channel-filter-dropdown';
import { PostsTimezonesDropdown } from './_components/posts-timezones-dropdown';
import { EmptyState } from '@/components/ui/empty-state';
import { getUserDetails } from '@/app/data/users/get-user-details';

export default async function PostsPage() {
  const userData = await getUserDetails();

  if (!userData) {
    redirect('/auth');
  }

  return (
    <div>
      <MainHeader>
        <MainHeader.Wrapper>
          <MainHeader.Title>Posts</MainHeader.Title>
          <Button>
            <Plus />
            Create Post
          </Button>
        </MainHeader.Wrapper>
      </MainHeader>
      <main className="w-full max-w-7xl mx-auto py-6 px-8">
        <Tabs defaultValue="drafts" className="w-full">
          <div className="flex items-center justify-between border-b">
            <TabsList>
              <TabsTrigger value="drafts">Drafts (6)</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled (7)</TabsTrigger>
              <TabsTrigger value="published">Published (2)</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <PostsChannelFilterDropdown />
              <PostsTimezonesDropdown />
            </div>
          </div>
          <TabsContent value="scheduled">
            <div className="border min-h-[500px] flex justify-center items-center relative overflow-hidden">
              <EmptyState>
                <div>
                  <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                    <CalendarCheck className="text-foreground/70" />
                  </EmptyState.Mockup>
                  <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <CalendarCheck className="text-foreground/60" />
                  </EmptyState.Mockup>
                  <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                    <CalendarCheck className="text-foreground/70" />
                  </EmptyState.Mockup>
                </div>
                <EmptyState.Title>No posts scheduled</EmptyState.Title>
                <EmptyState.Description>
                  Schedule some posts and they will appear here
                </EmptyState.Description>
                <EmptyState.Actions>
                  <Button>
                    <Plus /> New Post
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </EmptyState.Actions>
              </EmptyState>
            </div>
          </TabsContent>
          <TabsContent value="drafts">
            <div className="border min-h-[500px] flex justify-center items-center relative overflow-hidden">
              <EmptyState>
                <div>
                  <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                    <FilePen className="text-foreground/70" />
                  </EmptyState.Mockup>
                  <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <FilePen className="text-foreground/60" />
                  </EmptyState.Mockup>
                  <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                    <FilePen className="text-foreground/70" />
                  </EmptyState.Mockup>
                </div>
                <EmptyState.Title>No draft posts</EmptyState.Title>
                <EmptyState.Description>
                  Create your first draft post here
                </EmptyState.Description>
                <EmptyState.Actions>
                  <Button>
                    <Plus /> New Post
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </EmptyState.Actions>
              </EmptyState>
            </div>
          </TabsContent>
          <TabsContent value="published">
            <div className="border min-h-[500px] flex justify-center items-center relative overflow-hidden">
              <EmptyState>
                <div>
                  <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                    <FileCheck className="text-foreground/70" />
                  </EmptyState.Mockup>
                  <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <FileCheck className="text-foreground/60" />
                  </EmptyState.Mockup>
                  <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                    <FileCheck className="text-foreground/70" />
                  </EmptyState.Mockup>
                </div>
                <EmptyState.Title>No published posts</EmptyState.Title>
                <EmptyState.Description>
                  Your published post appear here
                </EmptyState.Description>
                <EmptyState.Actions>
                  <Button>
                    <Plus /> New Post
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </EmptyState.Actions>
              </EmptyState>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
