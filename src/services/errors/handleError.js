import { AppError } from './AppError';

const isProduction = import.meta.env.PROD === true;

const loggers = [];

export function registerErrorLogger(fn) {
  if (typeof fn === 'function') {
    loggers.push(fn);
  }
}

export function handleError(error, context = {}) {
  const normalized =
    error instanceof AppError
      ? error
      : new AppError(error?.message || 'An unexpected error occurred', {
          code: 'UNEXPECTED_ERROR',
          cause: error,
        });

  const entry = {
    ...normalized.toJSON(),
    source: context.source || normalized.source || 'unknown',
    action: context.action || normalized.action || null,
    details: context.details ?? normalized.details ?? null,
    stack: normalized.stack || null,
  };

  if (isProduction) {
    console.error(`[${entry.code}] ${entry.message}`);
  } else {
    console.error('[Homs.Shop]', entry);
  }

  for (const logger of loggers) {
    try {
      logger(entry);
    } catch (e) {
      if (!isProduction) {
        console.error('Error logger failed:', e);
      }
    }
  }

  return entry;
}

export function logError(error, context = {}) {
  return handleError(error, context);
}
