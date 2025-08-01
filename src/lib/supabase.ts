import { createClient } from '@supabase/supabase-js';

// Note: These environment variables need to be set in your .env.local file
// You can find them in your Supabase project settings:
// - Go to your Supabase dashboard
// - Select your project
// - Go to Settings > API
// - Copy the Project URL and anon public key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Supabase environment variables are not set!');
  console.error('Please add the following to your .env.local file:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your-project-url');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  console.error('Get these from: https://supabase.com/dashboard/project/eophdwklcrvawvsqrypb/settings/api');
}

// Create client only if credentials exist
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; // Type assertion for development - will fail at runtime if not configured