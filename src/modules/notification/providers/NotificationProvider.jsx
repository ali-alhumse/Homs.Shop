import { createContext, useContext, useCallback } from 'react';
import { showToast } from '@shared/components/AppToast';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const notify = useCallback((type, message) => {
    showToast(type, message);
  }, []);

  return <NotificationContext.Provider value={{ notify }}>{children}</NotificationContext.Provider>;
}

export function useNotificationContext() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be used within NotificationProvider');
  return ctx;
}
