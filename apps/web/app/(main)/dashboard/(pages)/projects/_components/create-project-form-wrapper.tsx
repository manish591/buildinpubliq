import { getGithubRepositories } from '@/app/data/github/get-github-repositories';
import { CreateProjectForm } from './create-project-form';

export async function CreateProjectFormWrapper() {
  const repositoriesData = await getGithubRepositories();

  return (
    <div className="max-w-xl">
      <CreateProjectForm repositoriesData={repositoriesData} />
    </div>
  );
}
