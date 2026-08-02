import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { validateEnv } from './config/env';
import { handleError } from '@services/errors';
import '@styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

function renderApp() {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

function renderConfigError(missingVars) {
  root.render(
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 shadow-sm">
        <h1 className="text-lg font-semibold text-red-700">Configuration Error</h1>
        <p className="mt-2 text-sm text-gray-600">
          The application is missing required environment variables:
        </p>
        <ul className="mt-4 space-y-2">
          {missingVars.map((name) => (
            <li
              key={name}
              className="rounded bg-red-50 px-3 py-2 font-mono text-xs text-red-700"
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-gray-500">
          Copy <code className="rounded bg-gray-100 px-1 py-0.5">.env.example</code> to{' '}
          <code className="rounded bg-gray-100 px-1 py-0.5">.env</code>, set the missing
          values, then restart the app.
        </p>
      </div>
    </div>
  );
}

const envStatus = validateEnv();

if (!envStatus.valid) {
  handleError(
    new Error(`Missing environment variables: ${envStatus.missing.join(', ')}`),
    { source: 'AppBootstrap', action: 'validateEnv' }
  );
  renderConfigError(envStatus.missing);
} else {
  renderApp();
}
