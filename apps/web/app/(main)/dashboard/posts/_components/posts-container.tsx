import { File } from 'lucide-react';
import { getAllPosts } from '@/app/data/posts/get-all-posts';
import { EmptyState } from '@/components/ui/empty-state';
import { PostCard } from './post-card';

export async function PostsContainer({
  status,
  channel,
  query,
}: Readonly<{ status?: string; channel?: string; query?: string }>) {
  const postsData = await getAllPosts({ status, channel, query });

  return (
    <div className="mt-6">
      {postsData.length === 0 ? (
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
            <EmptyState.Title>No posts found</EmptyState.Title>
            <EmptyState.Description>
              Your post will appear here
            </EmptyState.Description>
          </EmptyState>
        </div>
      ) : (
        <div className="space-y-4">
          {postsData.map((post) => {
            return (
              <PostCard key={post.id} post={post} channel={post.channel} />
            );
          })}
        </div>
      )}
    </div>
  );
}
