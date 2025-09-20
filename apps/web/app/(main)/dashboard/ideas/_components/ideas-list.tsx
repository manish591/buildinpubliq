import { IconBulb } from '@tabler/icons-react';
import { getAllIdeas } from '@/app/data/ideas/get-all-ideas';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { IdeaCard } from './idea-card';

export async function IdeasList({
  options,
}: Readonly<{ options?: { query?: string } }>) {
  const allIdeas = await getAllIdeas(options);

  return (
    <div className="mt-6">
      {allIdeas.length === 0 ? (
        <div
          className={cn(
            'border min-h-[500px] flex justify-center',
            'items-center relative overflow-hidden rounded-xl',
          )}
        >
          <EmptyState>
            <div>
              <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                <IconBulb className="text-foreground/70" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <IconBulb className="text-foreground/70" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                <IconBulb className="text-foreground/70" />
              </EmptyState.Mockup>
            </div>
            <EmptyState.Title>No ideas found</EmptyState.Title>
            <EmptyState.Description>
              Your ideas will appear here
            </EmptyState.Description>
          </EmptyState>
        </div>
      ) : (
        <div className="space-y-4">
          {allIdeas.map((idea) => {
            return <IdeaCard key={idea.id} ideaData={idea} />;
          })}
        </div>
      )}
    </div>
  );
}
