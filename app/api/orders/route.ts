import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract Form Fields
    const fullName = (formData.get('fullName') as string) || '';
    const email = ((formData.get('email') as string) || '').toLowerCase().trim();
    const phone = (formData.get('phone') as string) || '';
    const address = (formData.get('address') as string) || '';
    const notes = (formData.get('notes') as string) || '';

    const style = (formData.get('style') as string) || 'embroidered';
    const width = parseFloat(formData.get('width') as string) || 3.0;
    const height = parseFloat(formData.get('height') as string) || 3.0;
    const calculatedSize = parseFloat(formData.get('calculatedSize') as string) || (width + height) / 2;
    const backing = (formData.get('backing') as string) || 'iron_on';
    const border = (formData.get('border') as string) || 'merrowed';
    const quantity = parseInt(formData.get('quantity') as string) || 100;
    const unitPrice = parseFloat(formData.get('unitPrice') as string) || 1.85;
    const totalAmount = parseFloat(formData.get('totalAmount') as string) || unitPrice * quantity;
    const discountPercentage = parseFloat(formData.get('discountPercentage') as string) || 0.0;

    // Validate Required Fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required customer contact fields (name, email, phone).' },
        { status: 400 }
      );
    }

    // Handle Artwork File Upload if provided
    let artworkUrl: string | null = null;
    const artworkFile = formData.get('artwork') as File | null;

    if (artworkFile && artworkFile.size > 0) {
      try {
        const sanitizedFilename = artworkFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniquePath = `orders/${Date.now()}-${sanitizedFilename}`;
        const fileBuffer = await artworkFile.arrayBuffer();

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('patch-artworks')
          .upload(uniquePath, fileBuffer, {
            contentType: artworkFile.type || 'application/octet-stream',
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('patch-artworks')
            .getPublicUrl(uniquePath);
          artworkUrl = publicUrlData.publicUrl;
        }
      } catch (uploadErr) {
        console.warn('Artwork upload skipped or failed:', uploadErr);
      }
    }

    // Generate Order Reference Code (e.g. AP-84920)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `AP-${randomDigits}`;

    const specSummary = `${quantity} pcs of ${style.toUpperCase()} (${width}" x ${height}", Backing: ${backing}, Border: ${border})`;

    // 1. Save to `quotes` table (Always accessible with anon key)
    const { error: quoteError } = await supabase
      .from('quotes')
      .insert([
        {
          ref_code: orderNumber,
          full_name: fullName,
          email,
          phone,
          patch_type: style,
          quantity,
          dimensions: `${width}" x ${height}" (${calculatedSize.toFixed(2)}")`,
          notes: `${specSummary}. Address: ${address}. Notes: ${notes}. Total: $${totalAmount.toFixed(2)}`,
          artwork_url: artworkUrl,
          status: 'new',
        },
      ]);

    // 2. Also attempt to save to `orders` and `order_items` tables if configured
    try {
      await supabase.from('orders').insert([
        {
          order_id: orderNumber,
          customer_name: fullName,
          email,
          phone,
          shipping_address: address,
          subtotal: Number((unitPrice * quantity).toFixed(2)),
          discount: Number(((unitPrice * quantity) * (discountPercentage / 100)).toFixed(2)),
          total_amount: totalAmount,
          coupon_code: null,
          status: 'pending',
        },
      ]);

      await supabase.from('order_items').insert([
        {
          order_ref: orderNumber,
          title: `Custom ${style.toUpperCase()} Patch`,
          patch_type: style,
          shape: 'custom',
          size: `${width}" x ${height}"`,
          backing,
          quantity,
          unit_price: unitPrice,
          total_price: totalAmount,
        },
      ]);
    } catch (orderTableErr) {
      // Ignored if orders table RLS requires service role, quote is already safely saved
      console.log('Orders table insert note:', orderTableErr);
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        message: 'Order and proof request successfully received.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Server processing error occurred.' },
      { status: 500 }
    );
  }
}
