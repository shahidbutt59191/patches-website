/**
 * Vercel Serverless Function: Exposes Supabase public configuration
 * Reads SUPABASE_URL and SUPABASE_ANON_KEY from Vercel Environment Variables
 */

export default function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  // Supabase public anon key & URL are safe to expose to browser client
  return res.status(200).json({
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
  });
}
