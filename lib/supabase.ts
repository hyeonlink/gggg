import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client Configuration
 * Using hardcoded credentials for environment stability.
 */
const supabaseUrl = 'https://ccrtzhqgagtnedlqqfpk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcnR6aHFnYWd0bmVjbHFxZnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTY5MjgsImV4cCI6MjA4MjAzMjkyOH0.zVBovv2KJoAYH3-SuQb9y-bTkdyZsEmTuYOTEQSKeJM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
