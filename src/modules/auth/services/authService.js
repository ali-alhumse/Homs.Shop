import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';

export const authService = {
  async login(email, password) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Auth service unavailable');

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return errorResponse('INVALID_CREDENTIALS', 'Invalid email or password');

      return successResponse(data);
    } catch (err) {
      return errorResponse('AUTH_ERROR', 'Authentication failed. Please try again.');
    }
  },

  async logout() {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Auth service unavailable');

      const { error } = await supabase.auth.signOut();
      if (error) return errorResponse('LOGOUT_FAILED', 'Failed to log out');

      return successResponse(null);
    } catch (err) {
      return errorResponse('LOGOUT_ERROR', 'An error occurred during logout.');
    }
  },

  async getSession() {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Auth service unavailable');

      const { data, error } = await supabase.auth.getSession();
      if (error) return errorResponse('SESSION_ERROR', 'Failed to get session');

      return successResponse(data.session);
    } catch (err) {
      return errorResponse('SESSION_ERROR', 'An error occurred.');
    }
  },

  async resetPassword(email) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Auth service unavailable');

      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return errorResponse('RESET_FAILED', 'Failed to send reset email');

      return successResponse(null);
    } catch (err) {
      return errorResponse('RESET_ERROR', 'An error occurred.');
    }
  },
};
