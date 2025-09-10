import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddRepoForm, type GithubRepository } from './add-repo-form';

export async function AddRepoModal({
  repositoriesData,
}: Readonly<{ repositoriesData: GithubRepository[] }>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-max mx-auto flex items-center gap-2 cursor-pointer"
        >
          <Plus strokeWidth={2} width={16} height={16} />
          <span className="text-sm">Add new repository</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add repository</DialogTitle>
          <DialogDescription>
            Fill out the form to add new repository
          </DialogDescription>
        </DialogHeader>
        <AddRepoForm repositoriesData={repositoriesData} />
      </DialogContent>
    </Dialog>
  );
}
