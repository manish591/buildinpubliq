import { FilePen } from 'lucide-react';
import { getAllPosts } from '@/app/data/posts/get-all-posts';
import { EmptyState } from '@/components/ui/empty-state';
import { TabsContent } from '@/components/ui/tabs';

export async function DraftPostsTabContent() {
  const postsData = await getAllPosts({ status: 'draft' });

  return (
    <TabsContent value="drafts">
      {postsData.length === 0 ? (
        <div className="border min-h-[500px] flex justify-center items-center relative overflow-hidden rounded-md">
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
          </EmptyState>
        </div>
      ) : (
        <div>my posts</div>
      )}
    </TabsContent>
  );
}
