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

AppLogo.LogoIcon = ({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return (
    <div
      className={cn(
        'bg-primary w-7 h-7 rounded-sm flex items-center justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

AppLogo.AppName = ({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {children}
    </div>
  );
};
