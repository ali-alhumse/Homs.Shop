import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';
import { apiHelpers } from '@shared/api';
import { handleError } from '@services/errors';

export async function requestHandler(queryFn, options = {}) {
  const {
    source = 'Service',
    fallbackCode = 'DB_ERROR',
    fallbackMessage = 'An error occurred',
    normalize,
  } = options;

  const supabase = getSupabaseClient();
  if (!supabase) {
    return errorResponse('NO_CLIENT', 'Service unavailable');
  }

  let result;
  try {
    result = await queryFn(supabase);
  } catch (err) {
    handleError(err, { source, action: fallbackCode });
    return errorResponse(fallbackCode, fallbackMessage);
  }

  if (result?.error) {
    const mapped = apiHelpers.mapDatabaseError(result.error);
    if (mapped) return mapped;
    handleError(result.error, { source, action: fallbackCode });
    return errorResponse(fallbackCode, fallbackMessage);
  }

  const data = normalize ? normalize(result) : result?.data ?? null;
  return successResponse(data);
}

export default requestHandler;
