import { requestHandler } from '@services/api/requestHandler';

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

export const settingsService = {
  getAll() {
    return requestHandler(
      (supabase) => supabase
        .from('app_settings')
        .select('key, value, type')
        .eq('is_public', true),
      {
        source: 'SettingsService',
        fallbackCode: 'FETCH_ERROR',
        fallbackMessage: 'Failed to load settings',
        normalize: (result) => {
          const settings = {};
          for (const item of result.data || []) {
            settings[item.key] = parseValue(item.value, item.type);
          }
          return settings;
        },
      }
    );
  },

  get(key) {
    return requestHandler(
      (supabase) => supabase
        .from('app_settings')
        .select('value, type')
        .eq('key', key)
        .single(),
      {
        source: 'SettingsService',
        fallbackCode: 'NOT_FOUND',
        fallbackMessage: `Setting "${key}" not found`,
        normalize: (result) => parseValue(result.data.value, result.data.type),
      }
    );
  },

  set(key, value, updatedBy = null) {
    return requestHandler(
      (supabase) => supabase
        .from('app_settings')
        .update({
          value: String(value),
          updated_by: updatedBy,
          updated_at: new Date().toISOString(),
        })
        .eq('key', key),
      {
        source: 'SettingsService',
        fallbackCode: 'UPDATE_ERROR',
        fallbackMessage: 'Failed to update setting',
      }
    );
  },
};
