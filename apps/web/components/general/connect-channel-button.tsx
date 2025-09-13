'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function ConnectChannelButton({
  children,
  className,
  authorizationURL,
}: Readonly<{
  children: React.ReactNode;
  authorizationURL: string;
  className?: string;
}>) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'cursor-pointer hover:bg-transparent hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] transition-shadow',
        className,
      )}
      onClick={() => {
        window.location.href = authorizationURL;
      }}
    >
      {children}
    </Button>
  );
}
