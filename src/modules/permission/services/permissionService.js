import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';

export const permissionService = {
  async getUserPermissions(userId) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Permission service unavailable');

      const { data, error } = await supabase
        .from('user_permissions')
        .select('permission')
        .eq('user_id', userId);

      if (error) return errorResponse('FETCH_ERROR', 'Failed to load permissions');

      return successResponse(data?.map((p) => p.permission) || []);
    } catch (err) {
      return errorResponse('PERMISSION_ERROR', 'Failed to load permissions');
    }
  },

  can(permissions, required) {
    if (!permissions || !required) return false;
    return permissions.includes(required);
  },

  canAny(permissions, requiredList) {
    if (!permissions || !requiredList) return false;
    return requiredList.some((p) => permissions.includes(p));
  },
};
