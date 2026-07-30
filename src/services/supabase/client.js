import { createClient } from '@supabase/supabase-js';
import env from '@config/env';

let supabaseClient = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    if (!env.supabaseUrl || !env.supabaseAnonKey) {
      console.warn('Supabase credentials not configured');
      return null;
    }

    supabaseClient = createClient(env.supabaseUrl, env.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return supabaseClient;
}

export default getSupabaseClient;
