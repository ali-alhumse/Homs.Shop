import { requestHandler } from '@services/api/requestHandler';

export const authService = {
  login(email, password) {
    return requestHandler(
      (supabase) => supabase.auth.signInWithPassword({ email, password }),
      {
        source: 'AuthService',
        fallbackCode: 'INVALID_CREDENTIALS',
        fallbackMessage: 'Invalid email or password',
      }
    );
  },

  logout() {
    return requestHandler(
      (supabase) => supabase.auth.signOut(),
      {
        source: 'AuthService',
        fallbackCode: 'LOGOUT_FAILED',
        fallbackMessage: 'Failed to log out',
      }
    );
  },

  getSession() {
    return requestHandler(
      (supabase) => supabase.auth.getSession(),
      {
        source: 'AuthService',
        fallbackCode: 'SESSION_ERROR',
        fallbackMessage: 'Failed to get session',
        normalize: (result) => result.data?.session ?? null,
      }
    );
  },

  resetPassword(email) {
    return requestHandler(
      (supabase) => supabase.auth.resetPasswordForEmail(email),
      {
        source: 'AuthService',
        fallbackCode: 'RESET_FAILED',
        fallbackMessage: 'Failed to send reset email',
      }
    );
  },
};
