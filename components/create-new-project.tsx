import { auth } from '@/auth';
import { isGithubIntegrationInstalled } from '@/app/actions/github';
import { CreateProjectForm } from './create-project-form';

export async function CreateNewProject() {
  const session = await auth();
  const userId = session?.user?.id ?? '';
  const isGithubAppInstalled = await isGithubIntegrationInstalled(userId);

  return <CreateProjectForm isGithubAppInstalled={isGithubAppInstalled} />;
}
