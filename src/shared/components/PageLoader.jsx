import { Spinner } from './Spinner';

export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-3 text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}
