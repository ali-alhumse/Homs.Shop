export class AppError extends Error {
  constructor(message, options = {}) {
    super(message || 'An unexpected error occurred');
    this.name = 'AppError';
    this.code = options.code || 'APP_ERROR';
    this.details = options.details ?? null;
    this.source = options.source || null;
    this.action = options.action || null;
    this.isOperational = options.isOperational ?? true;
    this.cause = options.cause ?? null;
    this.timestamp = new Date().toISOString();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
      source: this.source,
      action: this.action,
      isOperational: this.isOperational,
      timestamp: this.timestamp,
    };
  }
}
