import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

export function EmptyState({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {children}
    </div>
  );
}

EmptyState.Mockup = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card/70 p-3 flex gap-4 items-center',
        className,
      )}
    >
      <span className="rounded-xl w-12 h-12 flex items-center justify-center border bg-card/60">
        {children}
      </span>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] animate-none bg-accent/40" />
        <Skeleton className="h-4 w-[200px] animate-none bg-secondary" />
      </div>
    </div>
  );
};

EmptyState.Title = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return (
    <h3 className={cn('text-xl font-semibold mb-2', className)}>{children}</h3>
  );
};

EmptyState.Description = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return (
    <p className={cn('text-muted-foreground mb-6 leading-relaxed', className)}>
      {children}
    </p>
  );
};

EmptyState.Actions = ({
  children,
  className,
}: Readonly<{ children?: React.ReactNode; className?: string }>) => {
  return <div className={cn('flex gap-3', className)}>{children}</div>;
};
