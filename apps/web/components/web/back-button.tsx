'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function BackButton({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() => {
        router.back();
      }}
    >
      {children}
    </Button>
  );
}
