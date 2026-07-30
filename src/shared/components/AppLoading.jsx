import { Spinner } from './Spinner';
import { PageLoader } from './PageLoader';
import { LoadingOverlay } from './LoadingOverlay';

export function AppLoading({ fullPage = false, message = 'Loading...', overlay = false }) {
  if (fullPage) {
    return <PageLoader message={message} />;
  }

  if (overlay) {
    return <LoadingOverlay message={message} />;
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Spinner size="lg" />
    </div>
  );
}
