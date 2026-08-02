# Errors Module

Centralized error classes and logging for Homs Shop.

## Error Classes

- `AppError` — base error with code, source, action, details, timestamp
- `ApiError` — API/network failures (adds status, endpoint, retryable)
- `AuthError` — authentication/session failures
- `ValidationError` — input validation failures (adds fields)

## Usage

```js
import { handleError, AuthError } from '@services/errors';

try {
  await service.doWork();
} catch (error) {
  handleError(error, { source: 'ProductService', action: 'create' });
}
```

## Logging

- Development: full structured logs via `console.error`
- Production: safe minimal `[CODE] message` output
- Extensible: `registerErrorLogger(fn)` accepts a function that receives the
  normalized error entry. Hook Sentry, LogRocket, or Supabase Logs here without
  touching every call site.

## Rules

- Never expose stack traces or internal details to users.
- Never throw from `handleError`.
- Use `AppError` subclasses in services; wrap unknown errors automatically.
