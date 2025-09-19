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
import { deletePost } from '../actions';

export function DeletePostModal({
  postId,
  showDeletePostModal,
  setShowDeletePostModal,
}: Readonly<{
  postId: string;
  showDeletePostModal: boolean;
  setShowDeletePostModal: React.Dispatch<React.SetStateAction<boolean>>;
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
      await deletePost(postId);
      setShowDeletePostModal(false);
      router.refresh();
    } catch (err) {
      console.log('Failed to delete the post', err);
    }
  }

  return (
    <Dialog open={showDeletePostModal} onOpenChange={setShowDeletePostModal}>
      <DialogContent className="p-0 md:max-w-md gap-0 rounded-xl">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-medium">Delete Post</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-6 space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete the following link?
          </p>
          <p className="font-medium">
            This action cannot be undone. This will permanently delete your post
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
        <DialogFooter className="py-4 px-6 border-t bg-muted rounded-b-xl">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              setShowDeletePostModal(false);
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
            Delete Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useDeleteModal({ postId }: { postId: string }) {
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);

  const DeletePostModalCallback = useCallback(() => {
    return (
      <DeletePostModal
        postId={postId}
        showDeletePostModal={showDeletePostModal}
        setShowDeletePostModal={setShowDeletePostModal}
      />
    );
  }, [showDeletePostModal]);

  return useMemo(
    () => ({
      setShowDeletePostModal,
      DeletePostModal: DeletePostModalCallback,
    }),
    [DeletePostModalCallback],
  );
}
