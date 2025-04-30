'use client';

import * as React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  async function handleLoginUser() {
    signIn('github', { callbackUrl: '/dashboard/projects' });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Button variant="outline" type="button" onClick={handleLoginUser}>
        <Image
          src="/github.svg"
          width={16}
          height={16}
          alt="github"
          className="w-4 h-4"
        />
        <span className="ml-2">GitHub</span>
      </Button>
    </div>
  );
}
