import { useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';
import { getSupabaseClient } from '@services/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    let subscription = null;

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (!active) return;
        setUser(session?.user ?? null);
        setError(null);
        setLoading(false);
      });
      subscription = data.subscription;
    }

    async function init() {
      const result = await authService.getSession();
      if (!active) return;
      if (result.success && result.data?.user) {
        setUser(result.data.user);
      }
      setLoading(false);
    }

    init();

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
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

  const register = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    const result = await authService.register(credentials);
    if (result.success) {
      const session = result.data?.session;
      if (session?.user) {
        setUser(session.user);
      }
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

  return { user, loading, error, login, register, logout, isAuthenticated: !!user };
}
