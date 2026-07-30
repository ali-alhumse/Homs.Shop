import { cn } from '@shared/utils/cn';

export function AppCard({ children, className, ...props }) {
  return (
    <div
      className={cn('rounded-lg border border-gray-200 bg-white p-6 shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}
