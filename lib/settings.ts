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
}

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
};
