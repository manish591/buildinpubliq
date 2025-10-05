import { FileCheck } from 'lucide-react';
import { getAllPosts } from '@/app/data/posts/get-all-posts';
import { EmptyState } from '@/components/ui/empty-state';
import { TabsContent } from '@/components/ui/tabs';

export async function PublishedPostsTabContent() {
  const postsData = await getAllPosts({ status: 'published' });

  return (
    <TabsContent value="published">
      {postsData.length === 0 ? (
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
          </EmptyState>
        </div>
      ) : (
        <div>mt posts</div>
      )}
    </TabsContent>
  );
}
