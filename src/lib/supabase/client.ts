import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || (typeof window !== 'undefined' ? (window as any).__ENV__?.NEXT_PUBLIC_SUPABASE_URL : undefined);
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (typeof window !== 'undefined' ? (window as any).__ENV__?.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined);

  if (!supabaseUrl || !supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      console.error('Supabase environment variables missing:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
        envUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        envKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        windowEnv: (window as any).__ENV__
      });
    }
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
