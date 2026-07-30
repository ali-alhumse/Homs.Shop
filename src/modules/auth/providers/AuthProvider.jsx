import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { PageLoader } from '@shared/components/PageLoader';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuth();

  if (auth.loading) {
    return <PageLoader message="Signing in..." />;
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
