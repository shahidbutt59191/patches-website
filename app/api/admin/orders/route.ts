import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const [quotesRes, ordersRes] = await Promise.all([
      supabase.from('quotes').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
    ]);

    const quotes = quotesRes.data || [];
    const orders = ordersRes.data || [];

    // Calculate factory KPIs
    const totalOrdersCount = orders.length + quotes.length;
    const pendingProduction = orders.filter((o) => o.status === 'production' || o.status === 'pending').length;
    const totalRevenue = orders.reduce((acc, curr) => acc + (parseFloat(curr.total_amount) || 0), 0);

    return NextResponse.json({
      quotes,
      orders,
      stats: {
        totalOrders: totalOrdersCount,
        pendingProduction,
        totalRevenue: totalRevenue.toFixed(2),
        totalQuotes: quotes.length,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { type, id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    if (type === 'quote') {
      const { error } = await supabase.from('quotes').update({ status }).eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('orders').update({ status }).eq('order_id', id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
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
      const { error } = await supabase.from('quotes').delete().eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('orders').delete().eq('order_id', id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true, message: 'Record deleted' });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
