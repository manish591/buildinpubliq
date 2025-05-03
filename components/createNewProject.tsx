import { auth } from '@/auth';
import { isGithubIntegrationInstalled } from '@/app/actions/github';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CirclePlus } from 'lucide-react';
import { CreateProjectForm } from './CreateProjectForm';

export async function CreateNewProject() {
  const session = await auth();
  const userId = session?.user?.id ?? '';
  const isGithubAppInstalled = await isGithubIntegrationInstalled(userId);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="flex items-center gap-2">
          <CirclePlus strokeWidth={1} width={16} height={16} />
          <span>Create New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <CreateProjectForm isGithubAppInstalled={isGithubAppInstalled} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
