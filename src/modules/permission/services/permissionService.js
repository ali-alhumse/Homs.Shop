import { requestHandler } from '@services/api/requestHandler';

export const permissionService = {
  getUserPermissions(userId) {
    return requestHandler(
      (supabase) => supabase
        .from('user_permissions')
        .select('permission')
        .eq('user_id', userId),
      {
        source: 'PermissionService',
        fallbackCode: 'FETCH_ERROR',
        fallbackMessage: 'Failed to load permissions',
        normalize: (result) => (result.data || []).map((p) => p.permission),
      }
    );
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
