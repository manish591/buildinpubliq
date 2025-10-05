import { IconBrandGithub } from '@tabler/icons-react';
import { getConnectedRepositories } from '@/app/data/github/get-connected-repositories';
import { EmptyState } from '@/components/ui/empty-state';
import { cn } from '@/lib/utils';
import { ConnectedRepoCard } from './connected-repo-card';

export async function ConnectedRepoContainer({
  options,
}: Readonly<{ options?: { query?: string } }>) {
  const repositories = await getConnectedRepositories(options);

  return (
    <div className="mt-6">
      {repositories.length === 0 ? (
        <div
          className={cn(
            'border min-h-[500px] flex justify-center',
            'items-center relative overflow-hidden rounded-xl',
          )}
        >
          <EmptyState>
            <div>
              <EmptyState.Mockup className="scale-[0.85] translate-y-6 opacity-80">
                <IconBrandGithub className="text-foreground/70" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="z-10 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <IconBrandGithub className="text-foreground/70" />
              </EmptyState.Mockup>
              <EmptyState.Mockup className="scale-[0.85] -translate-y-6 opacity-80">
                <IconBrandGithub className="text-foreground/70" />
              </EmptyState.Mockup>
            </div>
            <EmptyState.Title>No respositories found</EmptyState.Title>
            <EmptyState.Description>
              Your connected repositories will appear here
            </EmptyState.Description>
          </EmptyState>
        </div>
      ) : (
        <div className="border rounded-xl divide-y divide-y-border">
          {repositories.map((repo) => {
            return <ConnectedRepoCard key={repo.id} data={repo} />;
          })}
        </div>
      )}
    </div>
  );
}
