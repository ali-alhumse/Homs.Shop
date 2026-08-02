const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  appName: import.meta.env.VITE_APP_NAME || 'Homs Shop',
  appVersion: import.meta.env.VITE_APP_VERSION || '0.0.0',
};

const REQUIRED_ENV_VARS = [
  { key: 'VITE_SUPABASE_URL', value: env.supabaseUrl },
  { key: 'VITE_SUPABASE_ANON_KEY', value: env.supabaseAnonKey },
];

export function getMissingEnvVars() {
  return REQUIRED_ENV_VARS.filter((item) => !item.value).map((item) => item.key);
}

export function validateEnv() {
  const missing = getMissingEnvVars();
  return { valid: missing.length === 0, missing };
}

export default env;
