export interface PortfolioItem {
  id: string | number;
  title: string;
  category: 'tactical' | 'headwear' | 'biker' | 'varsity';
  styleId: string;
  badge: string;
  specs: string;
  batch: string;
  desc: string;
  badgeClass: string;
  image: string;
  altText?: string;
  basePrice?: number;
  active?: boolean;
}

export interface CustomerReviewItem {
  id: string;
  author: string;
  company: string;
  country?: string;
  rating: number;
  verifiedOrder: string;
  comment: string;
  date: string;
  featured: boolean;
  avatar?: string;
}

export interface SiteSettings {
  announcementText: string;
  announcementEnabled: boolean;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  supportEmail: string;
  supportPhone: string;
  turnaroundTime: string;
  promoCode: string;
  discountRate: number;

  // Base Prices for styles
  priceEmbroidered: number;
  priceIronOn: number;
  priceVelcro: number;
  priceWoven: number;
  priceLeather: number;
  pricePvc: number;

  // Backing Fees
  velcroFee: number;
  ironOnFee: number;
  peelStickFee: number;
  sewOnFee: number;

  // Live Portfolio Items
  portfolio: PortfolioItem[];

  // Live Customer Reviews
  reviews: CustomerReviewItem[];
}

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: 'Tactical Recon Skull Morale Badge',
    category: 'tactical',
    styleId: 'velcro',
    badge: '3D Soft Molded PVC',
    specs: '3.25" × 3.0" • Pantone 418C Coyote • Mil-Spec Hook Velcro',
    batch: '500 pcs',
    desc: 'Multi-tiered 3D liquid PVC casting with recessed perimeter stitching canal, waterproof polymer, and subdued tactical coloring.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800&auto=format&fit=crop&q=80',
    altText: 'Tactical Recon Skull 3D PVC Morale Patch on plate carrier',
    basePrice: 2.55,
    active: true,
  },
  {
    id: 2,
    title: 'Metro SWAT Special Operations Crest',
    category: 'tactical',
    styleId: 'embroidered',
    badge: '100% Tajima High Density',
    specs: '3.75" × 3.25" • 100% Madeira Thread • Merrowed Gold Border',
    batch: '250 pcs',
    desc: 'Full-density polyester thread coverage calibrated for extreme abrasion resistance on heavy tactical uniforms with zero fraying.',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
    image: 'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=800&auto=format&fit=crop&q=80',
    altText: 'Metro SWAT High Density Embroidered Shield Patch with Gold Merrowed Border',
    basePrice: 1.85,
    active: true,
  },
  {
    id: 3,
    title: 'Timber & Bean Artisan Coffee Roasters',
    category: 'headwear',
    styleId: 'leather',
    badge: 'Laser-Debossed Leatherette',
    specs: '2.75" × 2.0" • Fiber Laser Debossed • 3M Heavy Adhesive',
    batch: '300 pcs',
    desc: 'Rich caramel synthetic leather etched with microscopic detail and perimeter stitch channel for trucker snapbacks and winter beanies.',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    altText: 'Artisan Laser Debossed Leather Patch on Trucker Snapback Cap',
    basePrice: 2.45,
    active: true,
  },
  {
    id: 4,
    title: 'Iron Horse MC Top Rocker Arch',
    category: 'biker',
    styleId: 'embroidered',
    badge: 'Heavy Twill Embroidered',
    specs: '12.0" × 3.5" • Curved Rocker • Heavy Twill Sew-On Backing',
    batch: '100 sets',
    desc: 'Arch rocker patches engineered to withstand 80mph highway wind, rain, and motorcycle leather cut abrasion without puckering.',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    altText: 'Biker Motorcycle Club Heavy Twill Embroidered Rocker Cut',
    basePrice: 2.85,
    active: true,
  },
  {
    id: 5,
    title: 'State Championship Gold Varsity "E"',
    category: 'varsity',
    styleId: 'embroidered',
    badge: 'Vintage Chenille',
    specs: '4.5" × 4.0" • Loop Yarn Stitch • Double Stiff Wool Felt Base',
    batch: '150 pcs',
    desc: 'Traditional collegiate letterman jacket patch with heavy high-pile loop yarn, gold towel moss stitch, and thermal iron-on film.',
    badgeClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
    altText: 'Vintage Varsity Collegiate Chenille Letter Patch on Letterman Bomber Jacket',
    basePrice: 2.65,
    active: true,
  },
  {
    id: 6,
    title: 'Apex Esports Micro-Detail Tournament Crest',
    category: 'headwear',
    styleId: 'woven',
    badge: 'Jacquard Micro-Woven',
    specs: '2.5" × 2.5" • 50-Denier Damask • Laser Hot-Cut Edge',
    batch: '400 pcs',
    desc: 'Damask weaving machine running 50-denier micro-threads to resolve 0.5mm small text and intricate geometric lines impossible with embroidery.',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    altText: 'Jacquard Micro-Woven Tournament Crest Patch on Streetwear Hoodie',
    basePrice: 1.65,
    active: true,
  },
];

export const DEFAULT_REVIEWS: CustomerReviewItem[] = [
  {
    id: 'r1',
    author: 'David Miller',
    company: 'Apex Tactical Gear',
    country: 'USA',
    rating: 5,
    verifiedOrder: 'BD-43541 (250 pcs Velcro)',
    comment: 'Excellent quality and super fast delivery. Highly recommended!',
    date: 'Yesterday',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'r2',
    author: 'Sarah Johnson',
    company: 'Wilderness Explorers Club',
    country: 'Canada',
    rating: 5,
    verifiedOrder: 'BD-38910 (150 pcs Woven)',
    comment: 'Amazing patches! The colors are perfect. Will order again.',
    date: '3 days ago',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'r3',
    author: 'Ahmed Khan',
    company: 'Khan Motorsports MC',
    country: 'UK',
    rating: 5,
    verifiedOrder: 'BD-27480 (500 pcs Iron-On)',
    comment: 'Professional service and outstanding quality.',
    date: '5 days ago',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'r4',
    author: 'Michael Rossi',
    country: 'Australia',
    company: 'Outback Adventures',
    rating: 5,
    verifiedOrder: 'BD-19230 (300 pcs Leather)',
    comment: 'Turnaround was under 10 days and stitch density is unmatched!',
    date: '1 week ago',
    featured: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  announcementText: '🔥 Use code BDIGITIZE15 for 15% Off Your First Bulk Run • Free Digital Proof in 6 Hours',
  announcementEnabled: true,
  heroBadge: 'Premium Quality • Worldwide Shipping',
  heroHeadline: 'Custom Patches for Your Brand',
  heroSubheadline: 'High-quality embroidered, woven and custom patches with premium finishing. Perfect for businesses, teams & more.',
  whatsappNumber: '18005557282',
  whatsappDisplay: '+1 (800) 555-7282',
  supportEmail: 'support@bdigitizing.com',
  supportPhone: '+1 (800) 555-7282',
  turnaroundTime: '10-14 Days Turnaround',
  promoCode: 'BDIGITIZE15',
  discountRate: 15,

  // Default Base Rates
  priceEmbroidered: 1.85,
  priceIronOn: 1.95,
  priceVelcro: 2.35,
  priceWoven: 1.65,
  priceLeather: 2.45,
  pricePvc: 2.55,

  // Backing Addons
  velcroFee: 0.45,
  ironOnFee: 0.20,
  peelStickFee: 0.35,
  sewOnFee: 0.00,

  // Default Portfolio & Reviews
  portfolio: DEFAULT_PORTFOLIO,
  reviews: DEFAULT_REVIEWS,
};
