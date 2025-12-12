import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://klgcrfzbpzqlodqlcpgb.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsZ2NyZnpicHpxbG9kcWxjcGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MjYxNDgsImV4cCI6MjA4MTEwMjE0OH0.8Mr_3p3HlLJcQQEtehGg3kvhtMG_DM6fWfI2E9oMHXg';

// Fallback for development if env vars are missing to prevent crash.
// Note: The Anon Key is required to actually fetch data.
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder'
);