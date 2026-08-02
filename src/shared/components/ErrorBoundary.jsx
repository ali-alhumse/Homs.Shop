import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { AppButton } from './AppButton';
import { handleError } from '@services/errors/handleError';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    handleError(error, {
      source: 'ErrorBoundary',
      action: 'render',
      details: info,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">Something went wrong</h2>
            <p className="mt-2 text-sm text-gray-500">
              {this.props.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <AppButton onClick={this.handleRetry} className="mt-4" variant="secondary">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </AppButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
