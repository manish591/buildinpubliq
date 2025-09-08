'use client';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

export function LoginWithGithub({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={() => signIn('github')}
    >
      {children}
    </Button>
  );
}
