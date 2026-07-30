import { Spinner } from './Spinner';

export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm">
      <div className="text-center">
        <Spinner size="lg" />
        {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
      </div>
    </div>
  );
}
