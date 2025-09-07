'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import type * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GithubAuthForm({ className, ...props }: UserAuthFormProps) {
  return (
    <div className={cn('grid gap-6 w-[90%] mx-auto', className)} {...props}>
      <Button
        variant="secondary"
        type="button"
        onClick={() => {
          signIn('github', { redirectTo: '/dashboard' });
        }}
      >
        <Image
          src="/github.svg"
          width={16}
          height={16}
          alt="github"
          className="w-4 h-4"
        />
        <span className="ml-2">github</span>
      </Button>
    </div>
  );
}
