export interface SiteSettings {
  announcementText: string;
  announcementEnabled: boolean;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaText: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  supportEmail: string;
  supportPhone: string;
  basePrice: number;
  velcroFee: number;
  ironOnFee: number;
  magneticFee: number;
  peelStickFee: number;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  announcementText: '🔥 Use code WELCOME10 for 10% Off • Free Tajima Digitizing ($45 Value) • Free Proof in 6 Hours',
  announcementEnabled: true,
  heroBadge: 'Direct Tajima Production Facility • No Middlemen',
  heroHeadline: 'Custom Physical Patches Engineered to Last Decades.',
  heroSubheadline: 'Military-spec PVC rubber, 100% density Tajima embroidery, laser-cut leatherette, and vintage varsity chenille. Instant wholesale bulk discounts with a guaranteed free digital proof in 6 hours.',
  heroCtaText: 'Configure Your Custom Patch',
  whatsappNumber: '18005557282',
  whatsappDisplay: '+1 (800) 555-7282',
  supportEmail: 'orders@apexpatches.com',
  supportPhone: '+1 (800) 555-7282',
  basePrice: 1.85,
  velcroFee: 0.50,
  ironOnFee: 0.25,
  magneticFee: 0.95,
  peelStickFee: 0.35,
};
