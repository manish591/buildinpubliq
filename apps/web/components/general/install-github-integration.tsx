'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GITHUB_APP_NAME = process.env.NEXT_PUBLIC_GITHUB_APP_NAME;

export function InstallGithubIntegration({
  className,
  redirectTo,
}: Readonly<{ className?: string; redirectTo: string }>) {
  return (
    <Button
      variant="outline"
      className={cn('border py-2 px-3 cursor-pointer', className)}
      onClick={() => {
        const state = encodeURIComponent(
          JSON.stringify({ redirect: redirectTo }),
        );
        window.location.href = `https://github.com/apps/${GITHUB_APP_NAME}/installations/new?state=${state}`;
      }}
    >
      <IconBrandGithub />
      <span>Install Github App</span>
    </Button>
  );
}
