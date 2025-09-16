import { File } from 'lucide-react';
import { getAllPosts } from '@/app/data/posts/get-all-posts';
import { EmptyState } from '@/components/ui/empty-state';
import { PostCard } from './post-card';

export async function PostsContainer({ tab }: Readonly<{ tab: string }>) {
  const postsData = await getAllPosts({ status: tab });

  return (
    <div className="mt-6">
      {postsData.length > 0 ? (
        <div className="border min-h-[500px] flex justify-center items-center relative overflow-hidden rounded-xl">
          <EmptyState>
            <div>
              <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                <File className="text-foreground/70" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <File className="text-foreground/60" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                <File className="text-foreground/70" />
              </EmptyState.Mockup>
            </div>
            <EmptyState.Title>No {tab} posts</EmptyState.Title>
            <EmptyState.Description>
              Your {tab} post appear here
            </EmptyState.Description>
          </EmptyState>
        </div>
      ) : (
        <div>
          <PostCard />
        </div>
      )}
    </div>
  );
}
