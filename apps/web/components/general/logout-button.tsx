'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LogoutButton({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <Button
      variant="outline"
      className={cn(
        'p-0 w-full justify-start bg-transparent border-0',
        className,
      )}
      onClick={() => {
        signOut({ redirectTo: '/auth' });
      }}
    >
      {children}
    </Button>
  );
}
