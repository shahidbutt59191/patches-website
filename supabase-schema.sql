-- ==============================================================================
-- ApexPatches - Supabase Database Schema & Setup Script
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- Dashboard -> SQL Editor -> New query -> Paste and click "Run"
-- ==============================================================================

-- 1. Enable UUID Extension (usually enabled by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. Create 'quotes' Table (Customer Artwork Proof & Quote Inquiries)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ref_code TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    patch_type TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 50,
    dimensions TEXT,
    notes TEXT,
    artwork_url TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'digitizing', 'proof_sent', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast lookup by reference code and email
CREATE INDEX IF NOT EXISTS idx_quotes_ref_code ON public.quotes(ref_code);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON public.quotes(email);

-- ==============================================================================
-- 3. Create 'orders' Table (E-commerce Order Quotes & Bookings)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    coupon_code TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'proof_approved', 'production', 'shipped', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders(email);

-- ==============================================================================
-- 4. Create 'order_items' Table (Individual Patch Specs in an Order)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_ref TEXT NOT NULL REFERENCES public.orders(order_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    patch_type TEXT NOT NULL,
    shape TEXT,
    size TEXT NOT NULL,
    backing TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 10,
    unit_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    custom_top_text TEXT,
    custom_bottom_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_ref ON public.order_items(order_ref);

-- ==============================================================================
-- 5. Row Level Security (RLS) Policies
-- ==============================================================================
-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors (your website customers) to submit quotes
CREATE POLICY "Allow anonymous users to insert quotes" 
    ON public.quotes 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

-- Allow reading quotes
CREATE POLICY "Allow users to view quotes" 
    ON public.quotes 
    FOR SELECT 
    TO anon, authenticated 
    USING (true);

-- Allow updating quotes (for Admin portal status changes)
CREATE POLICY "Allow updating quotes" 
    ON public.quotes 
    FOR UPDATE 
    TO anon, authenticated 
    USING (true);

-- Allow deleting quotes
CREATE POLICY "Allow deleting quotes" 
    ON public.quotes 
    FOR DELETE 
    TO anon, authenticated 
    USING (true);

-- Allow anonymous visitors to insert orders
CREATE POLICY "Allow anonymous users to insert orders" 
    ON public.orders 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

-- Allow reading orders (for Admin portal)
CREATE POLICY "Allow viewing orders" 
    ON public.orders 
    FOR SELECT 
    TO anon, authenticated 
    USING (true);

-- Allow updating orders (for Admin portal status changes)
CREATE POLICY "Allow updating orders" 
    ON public.orders 
    FOR UPDATE 
    TO anon, authenticated 
    USING (true);

-- Allow deleting orders
CREATE POLICY "Allow deleting orders" 
    ON public.orders 
    FOR DELETE 
    TO anon, authenticated 
    USING (true);

-- Allow anonymous visitors to insert order items
CREATE POLICY "Allow anonymous users to insert order items" 
    ON public.order_items 
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

-- Allow reading order items (for Admin portal)
CREATE POLICY "Allow viewing order items" 
    ON public.order_items 
    FOR SELECT 
    TO anon, authenticated 
    USING (true);

-- Allow deleting order items
CREATE POLICY "Allow deleting order items" 
    ON public.order_items 
    FOR DELETE 
    TO anon, authenticated 
    USING (true);

-- ==============================================================================
-- 6. Setup Storage Bucket for Customer Artworks (Optional)
-- ==============================================================================
-- In Supabase Dashboard:
-- 1. Go to "Storage" in the left sidebar
-- 2. Click "New Bucket"
-- 3. Name it: patch-artworks
-- 4. Toggle "Public Bucket" to ON (so uploaded logos can be previewed)
-- 5. Under Storage Policies, click "New Policy":
--    - Name: "Allow Public Uploads"
--    - Operations: INSERT
--    - Target roles: anon, authenticated
--    - Policy definition: true
