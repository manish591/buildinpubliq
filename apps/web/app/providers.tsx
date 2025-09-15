'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

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
