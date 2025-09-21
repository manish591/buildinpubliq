'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InstallGithubIntegration } from '@/components/general/install-github-integration';

export function InstallGithubIntegrationModal({
  showInstallGithubIntegrationModal,
  setShowInstallGithubIntegrationModal,
}: Readonly<{
  showInstallGithubIntegrationModal: boolean;
  setShowInstallGithubIntegrationModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}>) {
  return (
    <Dialog
      open={showInstallGithubIntegrationModal}
      onOpenChange={setShowInstallGithubIntegrationModal}
    >
      <DialogContent className="p-0 md:max-w-md gap-0 rounded-xl">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-medium">
            Install Github Integration
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 py-6 space-y-4">
          <p className="text-muted-foreground">
            Looks like you haven't installed out github app?
          </p>
          <p className="font-medium">
            You need to install github app to give us access to the repositories
            for which automated ideas will be generated.
          </p>
        </div>
        <DialogFooter className="py-4 px-6 border-t bg-muted rounded-b-xl">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              setShowInstallGithubIntegrationModal(false);
            }}
          >
            Cancel
          </Button>
          <InstallGithubIntegration
            className="h-9 bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            redirectTo="/dashboard/repositories"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function useInstallGithubIntegrationModal() {
  const [
    showInstallGithubIntegrationModal,
    setShowInstallGithubIntegrationModal,
  ] = useState(false);

  const installGithubIntegrationModalCallback = useCallback(() => {
    return (
      <InstallGithubIntegrationModal
        showInstallGithubIntegrationModal={showInstallGithubIntegrationModal}
        setShowInstallGithubIntegrationModal={
          setShowInstallGithubIntegrationModal
        }
      />
    );
  }, [showInstallGithubIntegrationModal]);

  return useMemo(
    () => ({
      setShowInstallGithubIntegrationModal,
      InstallGithubIntegrationModal: installGithubIntegrationModalCallback,
    }),
    [installGithubIntegrationModalCallback],
  );
}
