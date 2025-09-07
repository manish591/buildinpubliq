'use client';

import { Delete } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteProjectUpdate } from '@/app/actions/updates';
import { Button } from '@/components/ui/button';

export function DeleteProjectUpdateButton({
  projectUpdateId,
  projectId,
}: Readonly<{ projectUpdateId: string; projectId: string }>) {
  const router = useRouter();

  async function handleDeleteProjectUpdate() {
    try {
      await deleteProjectUpdate(projectUpdateId, projectId);
      router.refresh();
    } catch (err) {
      console.log('error while deleting the project upadate', err);
    }
  }

  return (
    <Button
      variant="outline"
      className="bg-transparent px-0 border-none h-6 gap-2 lowercase"
      onClick={handleDeleteProjectUpdate}
    >
      <Delete className="h-5 w-5 text-gray-500" />
      <span>delete</span>
    </Button>
  );
}
