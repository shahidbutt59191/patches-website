export interface PatchOrderItem {
  order_id: string;
  title: string;
  patch_type: string;
  dimensions: string;
  quantity: number;
  backing: string;
  border?: string;
  customer_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  subtotal: number;
  total_amount: number;
  paid: boolean;
  status: 'proof_review' | 'mold_sampling' | 'mass_production' | 'backing_qc' | 'shipped';
  artwork_thumbnail?: string;
  created_at: string;
  notes?: string;
  tracking_number?: string;
  courier?: string;
}

export interface QuoteItem {
  id: string;
  ref_code: string;
  full_name: string;
  email: string;
  phone: string;
  patch_type: string;
  quantity: number;
  dimensions?: string;
  notes?: string;
  artwork_url?: string;
  status: string;
  created_at: string;
}

export interface B2BAccountItem {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  tier: string;
  discountPct: number;
  totalOrders: number;
  lifetimeSpend: number;
}
