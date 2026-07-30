import { useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';

export function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const result = await settingsService.getAll();
      if (result.success) {
        setSettings(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }
    load();
  }, []);

  function get(key, defaultValue = null) {
    return settings[key] !== undefined ? settings[key] : defaultValue;
  }

  return { settings, loading, error, get };
}
