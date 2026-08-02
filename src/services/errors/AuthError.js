import { AppError } from './AppError';

export class AuthError extends AppError {
  constructor(message, options = {}) {
    super(message, {
      code: options.code || 'AUTH_ERROR',
      ...options,
    });
    this.name = 'AuthError';
    this.status = options.status ?? null;
  }
}
