const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  appName: import.meta.env.VITE_APP_NAME || 'Homs Shop',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.0.0',
};

export default env;
