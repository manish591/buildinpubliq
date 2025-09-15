import { cn } from '@/lib/utils';

export function MainHeader({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) {
  return (
    <header className={cn('h-16 flex items-center border-b', className)}>
      {children}
    </header>
  );
}

MainHeader.Wrapper = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto px-8 flex items-center justify-between',
        className,
      )}
    >
      {children}
    </div>
  );
};

MainHeader.Title = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return <h1 className={cn('text-xl font-medium', className)}>{children}</h1>;
};
