import { Bell, Search, Moon, Sun, LogOut, User } from 'lucide-react';
import { AppDropdown } from '@shared/components/AppDropdown';
import { useAuthContext } from '@modules/auth/providers/AuthProvider';
import { useThemeContext } from '@modules/theme/providers/ThemeProvider';

export function Header() {
  const { user, logout } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6">
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <AppDropdown
          trigger={
            <>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden text-sm font-medium text-gray-700 md:block">
                {user?.email || 'User'}
              </span>
            </>
          }
          align="right"
        >
          {(close) => (
            <>
              <button
                onClick={() => { close?.(); }}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => { close?.(); logout(); }}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          )}
        </AppDropdown>
      </div>
    </header>
  );
}
