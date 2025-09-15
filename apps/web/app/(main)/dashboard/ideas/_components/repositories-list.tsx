import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { getAllGithubRepositories } from '@/app/data/github/get-all-github-repositories';
import { getInstalledRepositories } from '@/app/data/github/get-installed-repositories';
import { GithubSVGIcon } from '@/components/svg-icons/github';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AddRepository } from './add-repository';

export async function RepositoriesList() {
  const repositories = await getAllGithubRepositories();
  const installedRepos = await getInstalledRepositories();

  return (
    <>
      {repositories.length === 0 ? (
        <div className="space-y-2">
          <div className="p-8 rounded-md">
            <div className="mb-4 text-center">
              <GithubSVGIcon className="h-11 w-11 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium text-lg mb-2">
                No repository selected
              </h3>
              <p className="text-sm text-foreground/70 mb-4 text-pretty max-w-[70%] mx-auto">
                Select your first repository to start making new ideas
              </p>
            </div>
            <AddRepository repositoriesData={installedRepos}>
              <Button
                variant="outline"
                className="w-max mx-auto cursor-pointer"
                asChild
              >
                <div className="flex items-center gap-2">
                  <Plus strokeWidth={2} width={16} height={16} />
                  <span className="text-sm">Add new repository</span>
                </div>
              </Button>
            </AddRepository>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <AddRepository repositoriesData={installedRepos}>
            <Button
              variant="outline"
              className="w-full cursor-pointer border-2 border-dashed h-20 hover:bg-transparent py-0 hover:border-muted"
              asChild
            >
              <div className="flex items-center gap-2">
                <Plus strokeWidth={2} className="w-6 h-6" />
                <span className="text-base">Add new repository</span>
              </div>
            </Button>
          </AddRepository>
          {repositories.map((repo) => (
            <Card
              key={repo.id}
              className="cursor-pointer transition-all hover:bg-sidebar-accent/50 shadow-none"
            >
              <CardContent className="p-3">
                <div className="flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{repo.fullName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      {format(repo.updatedAt, 'PPP')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
