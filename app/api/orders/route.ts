import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    let fullName = '';
    let email = '';
    let phone = '';
    let address = '';
    let notes = '';
    let style = 'embroidered';
    let width = 3.0;
    let height = 3.0;
    let calculatedSize = 3.0;
    let backing = 'iron_on';
    let border = 'merrowed';
    let quantity = 100;
    let unitPrice = 1.85;
    let totalAmount = 185.0;
    let discountPercentage = 0.0;
    let artworkFile: File | null = null;
    let artworkUrl: string | null = null;

    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      fullName = (formData.get('fullName') as string) || (formData.get('name') as string) || '';
      email = ((formData.get('email') as string) || '').toLowerCase().trim();
      phone = (formData.get('phone') as string) || '';
      address = (formData.get('address') as string) || (formData.get('shippingAddress') as string) || '';
      notes = (formData.get('notes') as string) || '';

      style = (formData.get('style') as string) || (formData.get('patchStyle') as string) || 'embroidered';
      width = parseFloat(formData.get('width') as string) || parseFloat(formData.get('sizeWidth') as string) || 3.0;
      height = parseFloat(formData.get('height') as string) || parseFloat(formData.get('sizeHeight') as string) || 3.0;
      calculatedSize = parseFloat(formData.get('calculatedSize') as string) || (width + height) / 2;
      backing = (formData.get('backing') as string) || 'iron_on';
      border = (formData.get('border') as string) || 'merrowed';
      quantity = parseInt(formData.get('quantity') as string) || 100;
      unitPrice = parseFloat(formData.get('unitPrice') as string) || 1.85;
      totalAmount = parseFloat(formData.get('totalAmount') as string) || parseFloat(formData.get('totalPrice') as string) || unitPrice * quantity;
      discountPercentage = parseFloat(formData.get('discountPercentage') as string) || 0.0;

      const fileEntry = formData.get('artwork') || formData.get('file');
      if (fileEntry instanceof File && fileEntry.size > 0) {
        artworkFile = fileEntry;
      }
    } else {
      // JSON Payload Fallback
      const body = await req.json().catch(() => ({}));
      fullName = body.fullName || body.name || '';
      email = (body.email || '').toLowerCase().trim();
      phone = body.phone || '';
      address = body.address || body.shippingAddress || '';
      notes = body.notes || '';

      style = body.style || body.patchStyle || 'embroidered';
      width = parseFloat(body.width || body.sizeWidth) || 3.0;
      height = parseFloat(body.height || body.sizeHeight) || 3.0;
      calculatedSize = parseFloat(body.calculatedSize) || (width + height) / 2;
      backing = body.backing || 'iron_on';
      border = body.border || 'merrowed';
      quantity = parseInt(body.quantity) || 100;
      unitPrice = parseFloat(body.unitPrice) || 1.85;
      totalAmount = parseFloat(body.totalAmount || body.totalPrice) || unitPrice * quantity;
      discountPercentage = parseFloat(body.discountPercentage) || 0.0;
      artworkUrl = body.artworkUrl || null;
    }

    // Validate Required Fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Please enter your Name, Email, and Phone number.' },
        { status: 400 }
      );
    }

    // Handle Artwork File Upload if provided
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

    // Generate Order Reference Code (e.g. BD-84920)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `BD-${randomDigits}`;
    const specSummary = `${quantity} pcs of ${style.toUpperCase()} (${width}" x ${height}", Backing: ${backing}, Border: ${border})`;

    // 1. Save to `quotes` table (Always accessible with anon key)
    try {
      await supabase.from('quotes').insert([
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
    } catch (quoteErr) {
      console.warn('Quotes insert note:', quoteErr);
    }

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
      console.warn('Orders table insert note:', orderTableErr);
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        order: {
          id: orderNumber,
          ref_code: orderNumber,
          fullName,
          email,
          totalAmount,
        },
        message: 'Order and proof request successfully received.',
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/orders:', err);
    return NextResponse.json(
      { error: err.message || 'Server processing error occurred.' },
      { status: 500 }
    );
  }
}
