import { AppError } from './AppError';

export class ValidationError extends AppError {
  constructor(message, options = {}) {
    super(message, {
      code: options.code || 'VALIDATION_ERROR',
      ...options,
    });
    this.name = 'ValidationError';
    this.fields = options.fields ?? null;
  }
}
