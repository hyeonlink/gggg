
import { createClient } from '@supabase/supabase-js';

// Assume environment variables are provided by the hosting environment
const supabaseUrl = (process.env as any).SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = (process.env as any).SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our Supabase tables
export type Tables = {
  clubs: any;
  pending_clubs: any;
  sponsors: any;
  users_profile: any;
};
