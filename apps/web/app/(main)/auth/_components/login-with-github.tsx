'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function LoginWithGithub({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full cursor-pointer"
      onClick={() => signIn('github', { redirectTo: '/dashboard' })}
    >
      {children}
    </Button>
  );
}
