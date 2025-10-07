'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BASE_URL } from '@/constants';

export function InstallGithubIntegration({
  className,
  redirectTo,
}: Readonly<{ className?: string; redirectTo: string }>) {
  console.log('the based url', BASE_URL);
  function handleInstallGithubIntegration() {
    const githubAppName = process.env.NEXT_PUBLIC_GITHUB_APP_NAME;
    const state = encodeURIComponent(JSON.stringify({ redirect: redirectTo }));
    window.location.href = `https://github.com/apps/${githubAppName}/installations/new?state=${state}`;
  }

  return (
    <Button
      variant="outline"
      className={cn('border py-2 px-3 cursor-pointer', className)}
      onClick={handleInstallGithubIntegration}
    >
      <IconBrandGithub />
      <span>Install Github App</span>
    </Button>
  );
}
