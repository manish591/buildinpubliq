'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { deleteIdea } from '../actions';

export function DeleteIdeaModal({
  id,
  showDeleteIdeaModal,
  setShowDeleteIdeaModal,
}: Readonly<{
  id: string;
  showDeleteIdeaModal: boolean;
  setShowDeleteIdeaModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState('');
  const [confirmationError, setConfirmationError] = useState(false);

  async function handleDeletePost() {
    if (confirmText !== 'DELETE') {
      setConfirmationError(true);
      return;
    }

    try {
      await deleteIdea(id);
      setShowDeleteIdeaModal(false);
      router.refresh();
    } catch (err) {
      console.log('Failed to delete the idea', err);
    }
  }

  return (
    <Dialog open={showDeleteIdeaModal} onOpenChange={setShowDeleteIdeaModal}>
      <DialogContent className="p-0 md:max-w-md gap-0 rounded-xl">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-medium">Delete Idea</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-6 space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete the following idea?
          </p>
          <p className="font-medium">
            This action cannot be undone. This will permanently delete your idea
            and remove your data from our servers.
          </p>
          <p className="text-muted-foreground">
            To verify, type <span className="font-medium">DELETE</span> below
          </p>
          <Input
            type="text"
            value={confirmText}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmText(value);
              if (value === 'DELETE') {
                setConfirmationError(false);
              }
            }}
          />
          {confirmationError ? (
            <p className="text-destructive text-sm">
              Please write DELETE to confirm
            </p>
          ) : null}
        </div>
        <DialogFooter className="py-4 px-6 border-t bg-muted justify-end flex-row rounded-b-xl">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              setShowDeleteIdeaModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="cursor-pointer"
            onClick={handleDeletePost}
          >
            Delete Idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useDeleteIdeaModal({ id }: { id: string }) {
  const [showDeleteIdeaModal, setShowDeleteIdeaModal] = useState(false);

  const deleteIdeaModalCallback = useCallback(() => {
    return (
      <DeleteIdeaModal
        id={id}
        showDeleteIdeaModal={showDeleteIdeaModal}
        setShowDeleteIdeaModal={setShowDeleteIdeaModal}
      />
    );
  }, [showDeleteIdeaModal, id]);

  return useMemo(
    () => ({
      setShowDeleteIdeaModal,
      DeleteIdeaModal: deleteIdeaModalCallback,
    }),
    [deleteIdeaModalCallback],
  );
}
