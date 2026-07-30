import { useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      const result = await authService.getSession();
      if (result.success && result.data?.user) {
        setUser(result.data.user);
      }
      setLoading(false);
    }
    init();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    const result = await authService.login(email, password);
    if (result.success) {
      setUser(result.data.user);
    } else {
      setError(result.error);
    }
    setLoading(false);
    return result;
  }, []);

  const logout = useCallback(async () => {
    const result = await authService.logout();
    if (result.success) {
      setUser(null);
    }
    return result;
  }, []);

  return { user, loading, error, login, logout, isAuthenticated: !!user };
}
