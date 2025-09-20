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
import { CreateIdeaForm } from './create-idea-form';

export function CreateIdeaModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          New Idea
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md!">
        <DialogHeader>
          <DialogTitle>create new idea</DialogTitle>
          <DialogDescription>
            fill out the form below to create new idea
          </DialogDescription>
        </DialogHeader>
        <CreateIdeaForm />
      </DialogContent>
    </Dialog>
  );
}
