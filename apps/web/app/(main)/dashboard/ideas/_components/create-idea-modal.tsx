'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateIdeaForm } from './create-idea-form';

export function CreateIdeaModal() {
  const [showCreateIdeaModal, setShowCreateIdeaModal] = useState(false);

  return (
    <Dialog open={showCreateIdeaModal} onOpenChange={setShowCreateIdeaModal}>
      <DialogTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          New Idea
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-lg p-0 gap-0 rounded-xl">
        <DialogHeader className="py-4 px-4 sm:px-6 border-b">
          <DialogTitle className="text-xl font-medium text-left">
            Add Idea
          </DialogTitle>
        </DialogHeader>
        <CreateIdeaForm setShowCreateIdeaModal={setShowCreateIdeaModal} />
      </DialogContent>
    </Dialog>
  );
}
