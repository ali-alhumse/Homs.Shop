import { getSupabaseClient } from '@services/supabase';
import { successResponse, errorResponse } from '@shared/utils/response';

export const settingsService = {
  async getAll() {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Settings service unavailable');

      const { data, error } = await supabase
        .from('app_settings')
        .select('key, value, type')
        .eq('is_public', true);

      if (error) return errorResponse('FETCH_ERROR', 'Failed to load settings');

      const settings = {};
      for (const item of data || []) {
        settings[item.key] = parseValue(item.value, item.type);
      }

      return successResponse(settings);
    } catch (err) {
      return errorResponse('SETTINGS_ERROR', 'Failed to load settings');
    }
  },

  async get(key) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Settings service unavailable');

      const { data, error } = await supabase
        .from('app_settings')
        .select('value, type')
        .eq('key', key)
        .single();

      if (error) return errorResponse('NOT_FOUND', `Setting "${key}" not found`);

      return successResponse(parseValue(data.value, data.type));
    } catch (err) {
      return errorResponse('SETTINGS_ERROR', 'Failed to get setting');
    }
  },

  async set(key, value, updatedBy = null) {
    try {
      const supabase = getSupabaseClient();
      if (!supabase) return errorResponse('NO_CLIENT', 'Settings service unavailable');

      const { error } = await supabase
        .from('app_settings')
        .update({ value: String(value), updated_by: updatedBy, updated_at: new Date().toISOString() })
        .eq('key', key);

      if (error) return errorResponse('UPDATE_ERROR', 'Failed to update setting');

      return successResponse(null);
    } catch (err) {
      return errorResponse('SETTINGS_ERROR', 'Failed to update setting');
    }
  },
};

function parseValue(value, type) {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true' || value === true;
    case 'json':
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    default:
      return value;
  }
}
