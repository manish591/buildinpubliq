'use client';

import { Button } from '@/components/ui/button';
import { useInstallGithubIntegrationModal } from './install-github-integration-modal';
import { useConnectRepoModal } from './connect-repo-modal';

export function ConnectRepoButton({
  isGithubIntegrationInstalled,
}: Readonly<{
  isGithubIntegrationInstalled: boolean;
}>) {
  const {
    InstallGithubIntegrationModal,
    setShowInstallGithubIntegrationModal,
  } = useInstallGithubIntegrationModal();

  const { ConnectRepoModal, setShowConnectRepoModal } = useConnectRepoModal();

  return (
    <>
      <Button
        className="cursor-pointer"
        onClick={() => {
          if (!isGithubIntegrationInstalled) {
            setShowInstallGithubIntegrationModal(true);
            return;
          }

          setShowConnectRepoModal(true);
        }}
      >
        Connect Repo
      </Button>
      <InstallGithubIntegrationModal />
      <ConnectRepoModal />
    </>
  );
}
