import Link from 'next/link';
import { cn } from '@/lib/utils';

export function AppLogo({
  className,
  children,
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 app-logo', className)}
    >
      {children}
    </Link>
  );
}
