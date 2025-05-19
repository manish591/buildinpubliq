'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function SignoutButton() {
  return (
    <div className="mt-auto">
      <Button
        variant="outline"
        className="p-0 w-full justify-start bg-transparent border-0"
        onClick={() => {
          signOut({ redirect: true });
        }}
      >
        <div className="p-2 hover:bg-muted trasition rounded-md mt-2 flex items-center gap-2">
          <LogOut strokeWidth={1} width={16} height={16} />
          <span>Log Out</span>
        </div>
      </Button>
    </div>
  );
}
