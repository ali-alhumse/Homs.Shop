import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@modules/auth/providers/AuthProvider';
import { SettingsProvider } from '@modules/settings/providers/SettingsProvider';
import { ThemeProvider } from '@modules/theme/providers/ThemeProvider';
import { NotificationProvider } from '@modules/notification/providers/NotificationProvider';
import { PermissionProvider } from '@modules/permission/providers/PermissionProvider';

export function AppProvider({ children }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <PermissionProvider>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </PermissionProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
