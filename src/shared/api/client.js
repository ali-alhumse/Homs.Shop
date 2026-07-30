import { errorResponse } from '@shared/utils/response';
import { ROUTES } from '@constants/routes';

export const apiHelpers = {
  buildUrl(base, params = {}) {
    const query = Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');

    return query ? `${base}?${query}` : base;
  },

  mapDatabaseError(error) {
    if (!error) return null;

    const code = error.code || '';
    const message = error.message || '';

    if (code === '23505') return errorResponse('DUPLICATE_ENTRY', 'This record already exists');
    if (code === '23503') return errorResponse('REFERENCE_ERROR', 'This record is referenced by other data');
    if (code === '42P01') return errorResponse('NOT_FOUND', 'The requested resource was not found');
    if (code === '42501' || message.includes('permission denied')) {
      return errorResponse('FORBIDDEN', 'You do not have permission to perform this action');
    }

    return null;
  },

  redirectToLogin(navigate) {
    navigate(ROUTES.LOGIN, { replace: true });
  },

  getPaginationParams(page = 1, limit = 20) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    return { from, to, page, limit };
  },
};

export default apiHelpers;
