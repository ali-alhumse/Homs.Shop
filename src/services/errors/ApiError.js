import { AppError } from './AppError';

export class ApiError extends AppError {
  constructor(message, options = {}) {
    super(message, {
      code: options.code || 'API_ERROR',
      ...options,
    });
    this.name = 'ApiError';
    this.status = options.status ?? null;
    this.endpoint = options.endpoint ?? null;
    this.retryable = options.retryable ?? false;
  }
}
