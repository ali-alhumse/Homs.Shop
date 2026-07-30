import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';

export const notificationService = {
  async getAll({ page = 1, limit = 20 } = {}) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Notification service unavailable');

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) return errorResponse('FETCH_ERROR', 'Failed to load notifications');

      return successResponse({ items: data || [], total: count, page, limit });
    } catch (err) {
      return errorResponse('NOTIFICATION_ERROR', 'Failed to load notifications');
    }
  },

  async markAsRead(id) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Notification service unavailable');

      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);

      if (error) return errorResponse('UPDATE_ERROR', 'Failed to mark notification as read');

      return successResponse(null);
    } catch (err) {
      return errorResponse('NOTIFICATION_ERROR', 'Failed to update notification');
    }
  },

  async getUnreadCount() {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Notification service unavailable');

      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .is('read_at', null);

      if (error) return errorResponse('FETCH_ERROR', 'Failed to get unread count');

      return successResponse(count || 0);
    } catch (err) {
      return errorResponse('NOTIFICATION_ERROR', 'Failed to get notification count');
    }
  },
};
