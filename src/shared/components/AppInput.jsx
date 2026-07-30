import { forwardRef } from 'react';
import { cn } from '@shared/utils/cn';

export const AppInput = forwardRef(function AppInput(
  { label, error, className, id, ...props },
  ref
) {
  const inputId = id || props.name;

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});
