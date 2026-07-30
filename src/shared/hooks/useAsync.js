import { useState, useCallback } from 'react';

export function useAsync(serviceFn) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args) => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await serviceFn(...args);
        if (result?.success) {
          setState({ data: result.data, loading: false, error: null });
        } else {
          setState({ data: null, loading: false, error: result?.error || { message: 'Unknown error' } });
        }
        return result;
      } catch (err) {
        const error = { code: 'UNEXPECTED_ERROR', message: err.message || 'An unexpected error occurred' };
        setState({ data: null, loading: false, error });
        return { success: false, data: null, error };
      }
    },
    [serviceFn]
  );

  function reset() {
    setState({ data: null, loading: false, error: null });
  }

  return { ...state, execute, reset };
}
