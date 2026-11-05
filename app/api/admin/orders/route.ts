import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const DATA_DIR = path.join(process.cwd(), 'data');
const OVERRIDES_FILE = path.join(DATA_DIR, 'order_overrides.json');

function readOverridesFromDisk(): Record<string, any> {
  try {
    if (fs.existsSync(OVERRIDES_FILE)) {
      return JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf8'));
    }
  } catch (e) {
    console.warn('Overrides disk read note:', e);
  }
  return {};
}

function writeOverridesToDisk(overrides: Record<string, any>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(overrides, null, 2), 'utf8');
  } catch (e) {
    console.warn('Overrides disk write note:', e);
  }
}

export async function GET() {
  try {
    const [quotesRes, ordersRes] = await Promise.all([
      supabase.from('quotes').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
    ]);

    // Read overrides from disk
    const diskOverrides = readOverridesFromDisk();

    // Read overrides from Supabase quotes snapshots (patch_type === 'order_override')
    const cloudOverrides: Record<string, any> = {};
    const rawQuotes = quotesRes.data || [];
    const overrideRows = rawQuotes.filter((q) => q.patch_type === 'order_override');
    
    // Sort oldest to newest so newest overrides win
    overrideRows.reverse().forEach((row) => {
      try {
        const parsed = typeof row.notes === 'string' ? JSON.parse(row.notes) : row.notes;
        if (parsed && parsed.order_id) {
          cloudOverrides[parsed.order_id] = {
            ...(cloudOverrides[parsed.order_id] || {}),
            ...parsed,
          };
        }
      } catch (e) {}
    });

    const activeOverrides = { ...diskOverrides, ...cloudOverrides };

    // Filter valid customer quotes
    const quotes = rawQuotes
      .filter(
        (q) =>
          q.ref_code !== 'APEX_SYSTEM_SETTINGS' &&
          !q.ref_code?.startsWith('SETTINGS_') &&
          !q.ref_code?.startsWith('OVERRIDE_') &&
          q.patch_type !== 'system_settings' &&
          q.patch_type !== 'settings' &&
          q.patch_type !== 'order_override'
      )
      .map((q) => {
        const ov = activeOverrides[q.ref_code] || activeOverrides[q.id];
        if (ov) {
          return {
            ...q,
            status: ov.status || q.status,
            courier: ov.courier || q.courier,
            tracking_number: ov.tracking_number !== undefined ? ov.tracking_number : q.tracking_number,
          };
        }
        return q;
      });

    // Filter and map valid orders
    const orders = (ordersRes.data || []).map((o) => {
      const ov = activeOverrides[o.order_id] || activeOverrides[o.id];
      if (ov) {
        return {
          ...o,
          status: ov.status || o.status,
          courier: ov.courier || o.courier,
          tracking_number: ov.tracking_number !== undefined ? ov.tracking_number : o.tracking_number,
        };
      }
      return o;
    });

    // Calculate factory KPIs with real pricing
    const totalOrdersCount = orders.length + quotes.length;
    const pendingProduction = [
      ...orders.filter((o) => o.status === 'production' || o.status === 'mass_production' || o.status === 'pending'),
      ...quotes.filter((q) => q.status === 'mass_production' || q.status === 'in_production'),
    ].length;

    let totalQuoteRevenue = 0;
    quotes.forEach((q) => {
      const match = (q.notes || '').match(/Total:\s*\$?([0-9,]+(?:\.[0-9]{1,2})?)/i);
      if (match && match[1]) {
        totalQuoteRevenue += parseFloat(match[1].replace(/,/g, '')) || 0;
      }
    });

    const totalOrderRevenue = orders.reduce((acc, curr) => acc + (parseFloat(curr.total_amount) || 0), 0);
    const combinedRevenue = totalOrderRevenue + totalQuoteRevenue;

    return NextResponse.json(
      {
        quotes,
        orders,
        stats: {
          totalOrders: totalOrdersCount,
          pendingProduction,
          totalRevenue: combinedRevenue.toFixed(2),
          totalQuotes: quotes.length,
        },
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id || body.order_id || body.orderId;
    const status = body.status;
    const courier = body.courier;
    const tracking_number = body.tracking_number || body.trackingNumber;

    if (!id) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    // 1. Write override to local disk
    const overrides = readOverridesFromDisk();
    overrides[id] = {
      ...(overrides[id] || {}),
      order_id: id,
      ...(status ? { status } : {}),
      ...(courier ? { courier } : {}),
      ...(tracking_number !== undefined ? { tracking_number } : {}),
      updated_at: new Date().toISOString(),
    };
    writeOverridesToDisk(overrides);

    // 2. Persist override to Supabase quotes table as an append-only snapshot
    try {
      await supabase.from('quotes').insert({
        ref_code: `OVERRIDE_${id}_${Date.now()}`,
        patch_type: 'order_override',
        full_name: 'Admin Order Override',
        email: 'admin@bdigitizing.com',
        phone: '0000000000',
        quantity: 1,
        notes: JSON.stringify(overrides[id]),
      });
    } catch (dbErr) {
      console.warn('Supabase override insert note:', dbErr);
    }

    // 3. Attempt direct row update if allowed
    try {
      if (body.type === 'quote') {
        await supabase.from('quotes').update({ status }).or(`id.eq.${id},ref_code.eq.${id}`);
      } else {
        await supabase.from('orders').update({ status }).or(`id.eq.${id},order_id.eq.${id}`);
      }
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: 'Status and order details updated successfully',
      data: overrides[id],
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    if (type === 'quote') {
      const { error } = await supabase.from('quotes').delete().or(`id.eq.${id},ref_code.eq.${id}`);
      if (error) console.warn('Supabase delete quote note:', error.message);
    } else {
      const { error } = await supabase.from('orders').delete().or(`id.eq.${id},order_id.eq.${id}`);
      if (error) console.warn('Supabase delete order note:', error.message);
    }

    return NextResponse.json({ success: true, message: 'Record processed for deletion' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
