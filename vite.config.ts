import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env for existing code compatibility
      'process.env': {
        API_KEY: env.API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY: env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
        REACT_APP_FLUTTERWAVE_PUBLIC_KEY: env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY
      }
    }
  };
});