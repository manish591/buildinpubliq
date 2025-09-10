'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function InstallGithubIntegration() {
  function handleInstallGithubIntegration() {
    const githubAppName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME;
    window.location.href = `https://github.com/apps/${githubAppName}/installations/new`;
  }

  return (
    <Button
      variant="outline"
      className="border py-2 px-3"
      onClick={handleInstallGithubIntegration}
    >
      <div className="flex items-center gap-2">
        <Image
          src="/github.svg"
          width={16}
          height={16}
          alt="github"
          className="w-4 h-4"
        />
        <span>install github app</span>
      </div>
    </Button>
  );
}
