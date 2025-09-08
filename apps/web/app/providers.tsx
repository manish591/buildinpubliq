'use client';

import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Toaster richColors closeButton duration={6000} position="top-right" />
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
