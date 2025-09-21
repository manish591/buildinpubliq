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

export function DisconnectRepoModal({
  id,
  showDisconnectRepoModal,
  setShowDisconnectRepoModal,
}: Readonly<{
  id: string;
  showDisconnectRepoModal: boolean;
  setShowDisconnectRepoModal: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState('');
  const [confirmationError, setConfirmationError] = useState(false);

  async function handleDisconnectRepo() {
    if (confirmText !== 'DISCONNECT') {
      setConfirmationError(true);
      return;
    }

    try {
      setShowDisconnectRepoModal(false);
      router.refresh();
    } catch (err) {
      console.log('Failed to disconnect the repo', err);
    }
  }

  return (
    <Dialog
      open={showDisconnectRepoModal}
      onOpenChange={setShowDisconnectRepoModal}
    >
      <DialogContent className="p-0 md:max-w-md gap-0 rounded-xl">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-medium">
            Disconnect Repo
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-6 space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to disconnect the following repo?
          </p>
          <p className="font-medium">
            You will no longer able to create post ideas using this repo. You
            have to reconnect in order to automate idea creation
          </p>
          <p className="text-muted-foreground">
            To verify, type <span className="font-medium">DISCONNECT</span>{' '}
            below
          </p>
          <Input
            type="text"
            value={confirmText}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmText(value);
              if (value === 'DISCONNECT') {
                setConfirmationError(false);
              }
            }}
          />
          {confirmationError ? (
            <p className="text-destructive text-sm">
              Please write DISCONNECT to confirm
            </p>
          ) : null}
        </div>
        <DialogFooter className="py-4 px-6 border-t bg-muted rounded-b-xl">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              setShowDisconnectRepoModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="cursor-pointer"
            onClick={handleDisconnectRepo}
          >
            Disconnect Repo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useDisconnectRepoModal({ id }: { id: string }) {
  const [showDisconnectRepoModal, setShowDisconnectRepoModal] = useState(false);

  const disconnectRepoModalCallback = useCallback(() => {
    return (
      <DisconnectRepoModal
        id={id}
        showDisconnectRepoModal={showDisconnectRepoModal}
        setShowDisconnectRepoModal={setShowDisconnectRepoModal}
      />
    );
  }, [showDisconnectRepoModal, id]);

  return useMemo(
    () => ({
      setShowDisconnectRepoModal,
      DisconnectRepoModal: disconnectRepoModalCallback,
    }),
    [disconnectRepoModalCallback],
  );
}
