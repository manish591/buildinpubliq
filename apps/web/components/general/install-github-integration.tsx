'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GithubSVGIcon } from '../svg-icons/github';

export function InstallGithubIntegration({
  className,
  redirectTo,
}: Readonly<{ className?: string; redirectTo: string }>) {
  function handleInstallGithubIntegration() {
    const githubAppName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME;
    const state = encodeURIComponent(JSON.stringify({ redirect: redirectTo }));
    window.location.href = `https://github.com/apps/${githubAppName}/installations/new?state=${state}`;
  }

  return (
    <Button
      variant="outline"
      className={cn('border py-2 px-3', className)}
      onClick={handleInstallGithubIntegration}
    >
      <GithubSVGIcon />
      <span>install github app</span>
    </Button>
  );
}
