import { cn } from '@shared/utils/cn';

export function Skeleton({ className, variant = 'text' }) {
  const variants = {
    text: 'h-4 w-full',
    circle: 'h-10 w-10 rounded-full',
    rect: 'h-20 w-full',
    card: 'h-40 w-full rounded-lg',
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded bg-gray-200',
        variants[variant],
        className
      )}
    />
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-6">
      <Skeleton variant="circle" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="rect" className="h-24" />
    </div>
  );
}
