export class TimeoutError extends Error {
  constructor(message = 'The request timed out') {
    super(message);
    this.name = 'TimeoutError';
    this.code = 'TIMEOUT';
  }
}

export function withTimeout(promise, ms = 15000, message) {
  let timer;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new TimeoutError(message)), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

export default withTimeout;
