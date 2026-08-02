import { requestHandler } from '@services/api/requestHandler';
import { apiHelpers } from '@shared/api';

export const notificationService = {
  getAll({ page = 1, limit = 20 } = {}) {
    return requestHandler(
      (supabase) => {
        const { from, to } = apiHelpers.getPaginationParams(page, limit);
        return supabase
          .from('notifications')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(from, to);
      },
      {
        source: 'NotificationService',
        fallbackCode: 'FETCH_ERROR',
        fallbackMessage: 'Failed to load notifications',
        normalize: (result) => ({
          items: result.data || [],
          total: result.count ?? (result.data || []).length,
          page,
          limit,
        }),
      }
    );
  },

  markAsRead(id) {
    return requestHandler(
      (supabase) => supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id),
      {
        source: 'NotificationService',
        fallbackCode: 'UPDATE_ERROR',
        fallbackMessage: 'Failed to mark notification as read',
      }
    );
  },

  getUnreadCount() {
    return requestHandler(
      (supabase) => supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .is('read_at', null),
      {
        source: 'NotificationService',
        fallbackCode: 'FETCH_ERROR',
        fallbackMessage: 'Failed to get unread count',
        normalize: (result) => result.count ?? 0,
      }
    );
  },
};
