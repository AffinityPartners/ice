import { createClient } from '@supabase/supabase-js';

// This client uses the service role key and bypasses RLS
// Only use this in server-side code, never expose to client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if environment variables are set
if (!supabaseUrl) {
  console.error('⚠️ NEXT_PUBLIC_SUPABASE_URL is not set!');
  console.error('Add it to your .env.local file');
  console.error('Get it from: https://supabase.com/dashboard/project/eophdwklcrvawvsqrypb/settings/api');
}

if (!supabaseServiceKey) {
  console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is not set!');
  console.warn('Admin functionality will be limited.');
  console.warn('Add it to your .env.local file for full functionality');
  console.warn('Get it from: https://supabase.com/dashboard/project/eophdwklcrvawvsqrypb/settings/api');
}

// Only create admin client if both URL and service key exist
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;