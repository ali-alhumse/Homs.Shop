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

  async register({ email, password, firstName, lastName }) {
    return requestHandler(
      (supabase) =>
        supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`.trim(),
            },
          },
        }),
      {
        source: 'AuthService',
        fallbackCode: 'REGISTRATION_FAILED',
        fallbackMessage: 'Unable to create your account. Please try again.',
        normalize: (result) => result.data,
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
