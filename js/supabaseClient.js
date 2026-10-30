/**
 * ApexPatches - Supabase Client & Database Services
 */

import { SUPABASE_CONFIG } from './supabaseConfig.js';

class SupabaseService {
  constructor() {
    this.client = null;
    this.init();
  }

  getCredentials() {
    // Priority: localStorage (set via UI modal) -> fallback to supabaseConfig.js
    const storedUrl = localStorage.getItem('apex_supabase_url');
    const storedKey = localStorage.getItem('apex_supabase_key');

    const url = storedUrl && storedUrl.trim() !== '' ? storedUrl.trim() : (SUPABASE_CONFIG.url || '').trim();
    const anonKey = storedKey && storedKey.trim() !== '' ? storedKey.trim() : (SUPABASE_CONFIG.anonKey || '').trim();

    return { url, anonKey };
  }

  saveCredentials(url, anonKey) {
    localStorage.setItem('apex_supabase_url', url.trim());
    localStorage.setItem('apex_supabase_key', anonKey.trim());
    this.init();
  }

  clearCredentials() {
    localStorage.removeItem('apex_supabase_url');
    localStorage.removeItem('apex_supabase_key');
    this.client = null;
  }

  isConfigured() {
    const { url, anonKey } = this.getCredentials();
    return Boolean(url && anonKey && url.startsWith('http') && anonKey.length > 20);
  }

  init() {
    const { url, anonKey } = this.getCredentials();

    if (this.isConfigured() && window.supabase) {
      try {
        this.client = window.supabase.createClient(url, anonKey);
        console.log('⚡ Supabase client initialized successfully.');
      } catch (err) {
        console.error('Failed to initialize Supabase client:', err);
        this.client = null;
      }
    } else {
      this.client = null;
      // If not configured locally, check if deployed on Vercel with environment variables
      this.fetchVercelEnvConfig();
    }

    this.updateStatusPill();
  }

  async fetchVercelEnvConfig() {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data.url && data.anonKey && data.url.startsWith('http')) {
          this.saveCredentials(data.url, data.anonKey);
          console.log('⚡ Auto-loaded Supabase credentials from Vercel environment.');
        }
      }
    } catch (e) {
      // Ignored when running static offline or server without /api
    }
  }

  async testConnection() {
    if (!this.isConfigured()) {
      return { success: false, message: 'Supabase URL or Anon Key is missing.' };
    }

    if (!this.client && window.supabase) {
      this.init();
    }

    if (!this.client) {
      return { success: false, message: 'Supabase library is not loaded or credentials invalid.' };
    }

    try {
      // Test querying the quotes table
      const { data, error } = await this.client
        .from('quotes')
        .select('id')
        .limit(1);

      if (error) {
        // Table might not exist or permission denied
        return { 
          success: false, 
          message: `Database error: ${error.message}. Make sure you ran supabase-schema.sql in your Supabase SQL editor.` 
        };
      }

      return { 
        success: true, 
        message: 'Connected to Supabase successfully! Tables are ready.' 
      };
    } catch (err) {
      return { 
        success: false, 
        message: `Connection failed: ${err.message || 'Network error'}` 
      };
    }
  }

  /**
   * Upload customer artwork to Supabase Storage bucket 'patch-artworks'
   */
  async uploadArtwork(file, refCode) {
    if (!this.client || !file) return null;

    try {
      const ext = file.name.split('.').pop();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = `quotes/${refCode}_${Date.now()}_${sanitizedName}`;

      const { data, error } = await this.client.storage
        .from('patch-artworks')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.warn('Storage upload error (Bucket patch-artworks might not be public or created):', error.message);
        return null;
      }

      const { data: publicUrlData } = this.client.storage
        .from('patch-artworks')
        .getPublicUrl(filePath);

      return publicUrlData?.publicUrl || null;
    } catch (err) {
      console.warn('Artwork upload exception:', err);
      return null;
    }
  }

  /**
   * Insert new Quote Request into Supabase 'quotes' table
   */
  async saveQuote(quotePayload, file = null) {
    if (!this.client) {
      console.info('Supabase not connected. Quote handled locally.');
      return { success: false, mode: 'local' };
    }

    try {
      let artworkUrl = null;
      if (file) {
        artworkUrl = await this.uploadArtwork(file, quotePayload.ref_code);
      }

      const row = {
        ref_code: quotePayload.ref_code,
        full_name: quotePayload.full_name,
        email: quotePayload.email,
        phone: quotePayload.phone,
        patch_type: quotePayload.patch_type,
        quantity: parseInt(quotePayload.quantity, 10) || 50,
        dimensions: quotePayload.dimensions || '',
        notes: quotePayload.notes || '',
        artwork_url: artworkUrl,
        status: 'new'
      };

      const { data, error } = await this.client
        .from('quotes')
        .insert([row])
        .select();

      if (error) {
        console.error('Error inserting quote to Supabase:', error);
        return { success: false, error: error.message };
      }

      console.log('✓ Quote saved to Supabase:', data);
      return { success: true, data: data[0] };
    } catch (err) {
      console.error('Failed to save quote to Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Insert new Order and Order Items into Supabase 'orders' & 'order_items'
   */
  async saveOrder(orderPayload) {
    if (!this.client) {
      console.info('Supabase not connected. Order handled locally.');
      return { success: false, mode: 'local' };
    }

    try {
      const orderRow = {
        order_id: orderPayload.orderId,
        customer_name: orderPayload.name,
        email: orderPayload.email,
        phone: orderPayload.phone,
        shipping_address: orderPayload.address,
        subtotal: orderPayload.subtotal || orderPayload.total,
        discount: orderPayload.discount || 0,
        total_amount: orderPayload.total,
        coupon_code: orderPayload.couponCode || null,
        status: 'pending'
      };

      // 1. Insert into orders table
      const { data: orderData, error: orderError } = await this.client
        .from('orders')
        .insert([orderRow])
        .select();

      if (orderError) {
        console.error('Error inserting order into Supabase:', orderError);
        return { success: false, error: orderError.message };
      }

      // 2. Insert order items
      if (orderPayload.items && orderPayload.items.length > 0) {
        const itemRows = orderPayload.items.map(item => ({
          order_ref: orderPayload.orderId,
          title: item.title,
          patch_type: item.type || 'embroidered',
          shape: item.shape || '',
          size: item.size || '3.5"',
          backing: item.backing || 'velcro',
          quantity: item.quantity || 10,
          unit_price: item.unitPrice || 0,
          total_price: item.totalPrice || 0,
          custom_top_text: item.topText || null,
          custom_bottom_text: item.bottomText || null
        }));

        const { error: itemsError } = await this.client
          .from('order_items')
          .insert(itemRows);

        if (itemsError) {
          console.warn('Order created, but error inserting line items:', itemsError);
        }
      }

      console.log('✓ Order and items saved to Supabase:', orderPayload.orderId);
      return { success: true, order: orderData[0] };
    } catch (err) {
      console.error('Failed to save order to Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Admin: Fetch all quotes from Supabase
   */
  async getAllQuotes() {
    if (!this.client) return { success: false, data: [] };

    try {
      const { data, error } = await this.client
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (err) {
      console.error('Error fetching quotes:', err);
      return { success: false, error: err.message, data: [] };
    }
  }

  /**
   * Admin: Update Quote Status
   */
  async updateQuoteStatus(quoteId, status) {
    if (!this.client) return { success: false };

    try {
      const { data, error } = await this.client
        .from('quotes')
        .update({ status })
        .eq('id', quoteId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Error updating quote status:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Admin: Delete Quote
   */
  async deleteQuote(quoteId) {
    if (!this.client) return { success: false };

    try {
      const { error } = await this.client
        .from('quotes')
        .delete()
        .eq('id', quoteId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error deleting quote:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Admin: Fetch all orders and their items
   */
  async getAllOrders() {
    if (!this.client) return { success: false, data: [] };

    try {
      const { data: orders, error: ordersErr } = await this.client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersErr) throw ordersErr;

      const { data: items, error: itemsErr } = await this.client
        .from('order_items')
        .select('*');

      if (itemsErr) console.warn('Could not fetch line items:', itemsErr);

      // Attach items to orders
      const combined = (orders || []).map(o => ({
        ...o,
        items: (items || []).filter(item => item.order_ref === o.order_id)
      }));

      return { success: true, data: combined };
    } catch (err) {
      console.error('Error fetching orders:', err);
      return { success: false, error: err.message, data: [] };
    }
  }

  /**
   * Admin: Update Order Status
   */
  async updateOrderStatus(orderId, status) {
    if (!this.client) return { success: false };

    try {
      const { data, error } = await this.client
        .from('orders')
        .update({ status })
        .eq('order_id', orderId)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Error updating order status:', err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Admin: Delete Order
   */
  async deleteOrder(orderId) {
    if (!this.client) return { success: false };

    try {
      const { error } = await this.client
        .from('orders')
        .delete()
        .eq('order_id', orderId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error deleting order:', err);
      return { success: false, error: err.message };
    }
  }

  updateStatusPill() {
    const statusPill = document.getElementById('supabase-status-pill');
    const statusText = document.getElementById('supabase-status-text');
    const statusDot = document.getElementById('supabase-status-dot');

    if (!statusPill) return;

    if (this.isConfigured()) {
      statusPill.classList.remove('border-slate-700', 'bg-slate-900/60');
      statusPill.classList.add('border-emerald-500/40', 'bg-emerald-950/40');
      if (statusDot) statusDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      if (statusText) statusText.textContent = 'Supabase Connected';
    } else {
      statusPill.classList.remove('border-emerald-500/40', 'bg-emerald-950/40');
      statusPill.classList.add('border-slate-700', 'bg-slate-900/60');
      if (statusDot) statusDot.className = 'w-2 h-2 rounded-full bg-amber-400';
      if (statusText) statusText.textContent = 'Connect Supabase';
    }
  }
}

export const SupabaseManager = new SupabaseService();
window.ApexSupabase = SupabaseManager;
