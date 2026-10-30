import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cjgjtpiicljnswbcvhcg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Q3HFEAMquFE8Ga6lccQ5bQ_4TYybnsA';

// Public Supabase Client (Browser & Client Components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server Role Client for Elevated API Route Operations
export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceKey);
};
