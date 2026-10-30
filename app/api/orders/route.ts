import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const supabase = getServiceSupabase();

    // Extract Form Fields
    const fullName = formData.get('fullName') as string;
    const email = (formData.get('email') as string)?.toLowerCase().trim();
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
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
    if (!fullName || !email || !phone || !address || !quantity) {
      return NextResponse.json(
        { error: 'Missing required customer or patch specification fields.' },
        { status: 400 }
      );
    }

    if (quantity < 10) {
      return NextResponse.json(
        { error: 'Minimum factory production quantity is 10 pieces.' },
        { status: 400 }
      );
    }

    // Handle Artwork File Upload to Supabase Storage
    let artworkUrl = null;
    let artworkFilename = null;
    const artworkFile = formData.get('artwork') as File | null;

    if (artworkFile && artworkFile.size > 0) {
      const sanitizedFilename = artworkFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniquePath = `orders/${Date.now()}-${sanitizedFilename}`;
      const fileBuffer = await artworkFile.arrayBuffer();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('patch-artworks')
        .upload(uniquePath, fileBuffer, {
          contentType: artworkFile.type || 'application/octet-stream',
          upsert: false,
        });

      if (!uploadError && uploadData) {
        artworkFilename = artworkFile.name;
        const { data: publicUrlData } = supabase.storage
          .from('patch-artworks')
          .getPublicUrl(uniquePath);
        artworkUrl = publicUrlData.publicUrl;
      }
    }

    // 1. Upsert Customer Record
    let customerId: string | null = null;

    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update phone or address if modified
      await supabase
        .from('customers')
        .update({
          full_name: fullName,
          phone,
          shipping_address: address,
        })
        .eq('id', customerId);
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({
          full_name: fullName,
          email,
          phone,
          shipping_address: address,
        })
        .select('id')
        .single();

      if (customerError || !newCustomer) {
        return NextResponse.json(
          { error: `Database customer creation failed: ${customerError?.message}` },
          { status: 500 }
        );
      }
      customerId = newCustomer.id;
    }

    // 2. Generate Unique Order Number (e.g. AP-94812)
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `AP-${randomDigits}`;

    // 3. Insert Patch Order Record
    const { data: newOrder, error: orderError } = await supabase
      .from('patch_orders')
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        patch_style: style,
        width_inches: width,
        height_inches: height,
        calculated_size_inches: calculatedSize,
        backing,
        border,
        quantity,
        unit_price: unitPrice,
        subtotal_amount: Number((unitPrice * quantity).toFixed(2)),
        discount_percentage: discountPercentage,
        total_amount: totalAmount,
        artwork_url: artworkUrl,
        artwork_filename: artworkFilename,
        special_instructions: notes,
        status: 'pending_review',
      })
      .select('id, order_number')
      .single();

    if (orderError) {
      return NextResponse.json(
        { error: `Failed to insert patch order: ${orderError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        orderId: newOrder.id,
        orderNumber: newOrder.order_number,
        message: 'Order created successfully. Proof generation in progress.',
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
