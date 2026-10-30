/**
 * ApexPatches - Data Source & Configurations
 */

export const PATCH_TYPES = [
  {
    id: 'embroidered',
    name: 'Embroidered Patches',
    tagline: 'The Classic Standard with Rich 3D Texture',
    badge: 'Most Popular',
    description: 'Woven with high-sheen 100% Rayon / Polyester embroidery thread onto high-density twill fabric. Features traditional merrowed stitched border.',
    bestFor: 'Uniforms, motorcycle clubs, streetwear, airsoft, martial arts, corporate workwear.',
    leadTime: '5-7 Days',
    minOrder: '10 pcs',
    startingPrice: '$1.45',
    coverageOptions: ['50% (Twill Background)', '75% (Dense Texture)', '100% (Full Thread Coverage)'],
    features: ['High-sheen Japanese threads', 'Up to 9 thread colors included', 'Merrowed or laser-cut border', 'Ultra-durable & wash-proof']
  },
  {
    id: 'pvc',
    name: 'PVC Rubber Patches',
    tagline: 'Waterproof, Tactical, 3D Molded',
    badge: 'Tactical Favorite',
    description: 'Crafted from flexible soft PVC rubber with 2D or 3D molded layers. Completely waterproof, UV resistant, and impervious to mud, dirt, and heavy weather.',
    bestFor: 'Tactical gear, military, law enforcement, airsoft teams, outdoor survival & diving apparel.',
    leadTime: '8-10 Days',
    minOrder: '25 pcs',
    startingPrice: '$1.95',
    coverageOptions: ['2D Multi-Level', '3D Sculpted Bevel', 'Glow-in-the-Dark Infused'],
    features: ['100% Waterproof & mud-proof', 'Crisp micro-details & sharp text', 'Recessed stitching channels', 'Custom pantone color matching']
  },
  {
    id: 'leather',
    name: 'Leather & Leatherette',
    tagline: 'Vintage Luxury & Laser-Etched Sophistication',
    badge: 'Premium Lifestyle',
    description: 'Genuine full-grain leather or premium synthetic leatherette with precision laser engraving, deep hot-foil debossing, or color fill.',
    bestFor: 'Trucker snapbacks, beanies, denim jackets, heritage lifestyle brands, bespoke coffee & brewery merch.',
    leadTime: '6-8 Days',
    minOrder: '25 pcs',
    startingPrice: '$1.80',
    coverageOptions: ['Laser Engraved', 'Hot Foil Debossed', 'Die-Cut Edge Stitch'],
    features: ['Real leather or vegan options', 'Perimeter stitch sewing channel', 'Ages with a rich vintage patina', 'Available in Tan, Cognac, Dark Roast, Black']
  },
  {
    id: 'chenille',
    name: 'Chenille Patches',
    tagline: 'Fluffy Nostalgic Collegiate Letterman Texture',
    badge: 'Retro Trend',
    description: 'Thick, fluffy looped yarn crafted with vintage moss-stitch embroidery, supported by double-felt backing. The timeless look of varsity letterman jackets.',
    bestFor: 'Varsity jackets, vintage streetwear, esports teams, university clubs, dance crews.',
    leadTime: '7-9 Days',
    minOrder: '25 pcs',
    startingPrice: '$2.30',
    coverageOptions: ['Classic Single Felt', 'Heavy Double Felt Base', 'Metallic Thread Accents'],
    features: ['Plush velvety 3D volume', 'Traditional moss & chain stitch', 'Felt border with clean laser trim', 'Bold iconic athletic look']
  },
  {
    id: 'woven',
    name: 'Woven Micro-Thread',
    tagline: 'Ultra-Fine Detail for Micro Text & Complex Logos',
    badge: 'Fine Detail',
    description: 'Unlike embroidered patches that stitch on top of twill, woven patches weave thin micro-threads together from scratch, producing flat, razor-sharp detail.',
    bestFor: 'Intricate corporate logos, small fonts under 2mm, detailed emblems, lightweight garments.',
    leadTime: '6-8 Days',
    minOrder: '50 pcs',
    startingPrice: '$1.10',
    coverageOptions: ['100% Full Woven', 'Laser-Cut Sealed Edge', 'Merrowed Edge'],
    features: ['Razor-sharp micro-lettering', 'No fabric show-through', 'Lightweight & ultra-flexible', 'Smooth flat surface finish']
  },
  {
    id: 'printed',
    name: 'Sublimated / Printed',
    tagline: 'Photographic Full-Color & Gradient Artwork',
    badge: 'Photo Real',
    description: 'Full-color dye-sublimation print fused into polyester twill with optional embroidery border. Perfect for photorealistic artwork, subtle color gradients, and portraits.',
    bestFor: 'Album art, complex gradient illustrations, commemorative memorial patches, full-color emblems.',
    leadTime: '5-7 Days',
    minOrder: '25 pcs',
    startingPrice: '$1.65',
    coverageOptions: ['Full Dye-Sublimation', 'Hybrid (Printed + Embroidered Outline)'],
    features: ['Unlimited gradients & colors', 'Photographic reproduction', 'Does not crack, peel, or fade', 'Stitched embroidered border']
  }
];

export const BACKINGS = [
  {
    id: 'velcro',
    name: 'Hook & Loop (Velcro)',
    subtitle: 'Tactical & Removable',
    description: 'Comes with both Hook (male) sewn on patch and matching Loop (female) backing for fabrics. Perfect for tactical vests, backpacks, uniforms, and gear.',
    extraCost: 0.45,
    icon: 'ShieldCheck'
  },
  {
    id: 'iron-on',
    name: 'Iron-On (Heat Seal)',
    subtitle: 'Permanent Household Fix',
    description: 'Industrial-grade heat-activated thermoplastic film. Bonds permanently to denim, canvas, and cotton with a standard household iron or heat press.',
    extraCost: 0.25,
    icon: 'Flame'
  },
  {
    id: 'sew-on',
    name: 'Traditional Sew-On',
    subtitle: 'Maximum Permanence',
    description: 'Smooth, flexible backing with reinforced edge. The classic choice for leather vests, heavy motorcycle jackets, and heavy-duty industrial laundry.',
    extraCost: 0.00,
    icon: 'Needle'
  },
  {
    id: 'peel-stick',
    name: '3M Peel & Stick Adhesive',
    subtitle: 'Temporary & Event Wear',
    description: 'High-tack 3M pressure adhesive. Simply peel the liner and stick to hats, shirts, laptops, or phone cases for events, conventions, or temporary branding.',
    extraCost: 0.35,
    icon: 'StickyNote'
  },
  {
    id: 'magnetic',
    name: 'Magnetic Backing',
    subtitle: 'Zero Garment Damage',
    description: 'Rare-earth neodymium magnetic disc pair. Attach firmly through suits, silk, delicate blazers, and luxury fabrics without punching holes or ironing.',
    extraCost: 0.95,
    icon: 'Magnet'
  }
];

export const BORDER_TYPES = [
  {
    id: 'merrowed',
    name: 'Merrowed Stitched Border',
    description: 'Traditional heavy 3D wrapped overlock border (1/8" thick). Recommended for regular geometric shapes (circle, shield, rectangle, oval).',
    extraCost: 0.00
  },
  {
    id: 'laser-cut',
    name: 'Laser-Cut / Hot-Cut Edge',
    description: 'Sealed smooth edge cut precisely along the custom die-cut outline using industrial CNC laser. Essential for complex shapes and sharp corners.',
    extraCost: 0.20
  }
];

export const SHAPES = [
  { id: 'shield', name: 'Tactical Shield', svgPath: 'M 150 20 L 250 50 L 250 170 C 250 240, 150 280, 150 280 C 150 280, 50 240, 50 170 L 50 50 Z' },
  { id: 'circle', name: 'Classic Round', svgPath: 'M 150,150 m -115,0 a 115,115 0 1,0 230,0 a 115,115 0 1,0 -230,0' },
  { id: 'hexagon', name: 'MOLLE Hexagon', svgPath: 'M 150 25 L 245 80 L 245 220 L 150 275 L 55 220 L 55 80 Z' },
  { id: 'rectangle', name: 'Name Tape & Bar', svgPath: 'M 40 70 L 260 70 A 15 15 0 0 1 275 85 L 275 215 A 15 15 0 0 1 260 230 L 40 230 A 15 15 0 0 1 25 215 L 25 85 A 15 15 0 0 1 40 70 Z' },
  { id: 'diamond', name: 'Biker Diamond', svgPath: 'M 150 25 L 265 150 L 150 275 L 35 150 Z' },
  { id: 'crest', name: 'Varsity Crest', svgPath: 'M 45 40 L 255 40 L 255 190 Q 255 270 150 280 Q 45 270 45 190 Z' }
];

export const BADGE_ICONS = [
  {
    id: 'eagle',
    name: 'Majestic Eagle',
    path: `
      <path d="M150 95 C140 105 130 115 110 118 C100 120 85 115 75 125 C65 135 68 155 78 165 C90 175 115 170 125 180 C135 190 140 210 150 215 C160 210 165 190 175 180 C185 170 210 175 222 165 C232 155 235 135 225 125 C215 115 200 120 190 118 C170 115 160 105 150 95 Z" fill="currentColor" opacity="0.9"/>
      <path d="M142 125 C145 118 155 118 158 125 L154 138 C152 142 148 142 146 138 Z" fill="#f59e0b"/>
      <circle cx="138" cy="118" r="3" fill="#ffffff"/>
      <circle cx="162" cy="118" r="3" fill="#ffffff"/>
      <path d="M110 145 Q150 165 190 145" stroke="#ffffff" stroke-width="3" fill="none" stroke-linecap="round"/>
    `
  },
  {
    id: 'skull',
    name: 'Tactical Skull',
    path: `
      <path d="M110 105 C110 80 190 80 190 105 C190 130 185 150 175 160 L175 190 L125 190 L125 160 C115 150 110 130 110 105 Z" fill="currentColor"/>
      <ellipse cx="132" cy="120" rx="10" ry="14" fill="#0b0f17"/>
      <ellipse cx="168" cy="120" rx="10" ry="14" fill="#0b0f17"/>
      <path d="M146 142 L150 135 L154 142 Z" fill="#0b0f17"/>
      <line x1="135" y1="180" x2="135" y2="190" stroke="#0b0f17" stroke-width="3"/>
      <line x1="145" y1="180" x2="145" y2="190" stroke="#0b0f17" stroke-width="3"/>
      <line x1="155" y1="180" x2="155" y2="190" stroke="#0b0f17" stroke-width="3"/>
      <line x1="165" y1="180" x2="165" y2="190" stroke="#0b0f17" stroke-width="3"/>
    `
  },
  {
    id: 'wolf',
    name: 'Alpha Wolf',
    path: `
      <polygon points="150,75 175,120 205,95 190,145 220,175 175,185 150,225 125,185 80,175 110,145 95,95 125,120" fill="currentColor"/>
      <polygon points="135,135 145,145 130,148" fill="#f59e0b"/>
      <polygon points="165,135 155,145 170,148" fill="#f59e0b"/>
      <polygon points="146,180 154,180 150,192" fill="#0b0f17"/>
    `
  },
  {
    id: 'wings',
    name: 'Biker Wings',
    path: `
      <path d="M50 140 C80 110 130 130 150 160 C170 130 220 110 250 140 C210 160 180 200 150 200 C120 200 90 160 50 140 Z" fill="currentColor"/>
      <circle cx="150" cy="145" r="16" fill="#f59e0b"/>
      <polygon points="150,135 155,145 145,145" fill="#111827"/>
      <path d="M80 145 C100 130 130 150 140 165" stroke="#ffffff" stroke-width="2" fill="none"/>
      <path d="M220 145 C200 130 170 150 160 165" stroke="#ffffff" stroke-width="2" fill="none"/>
    `
  },
  {
    id: 'compass',
    name: 'Adventure Mountain',
    path: `
      <polygon points="150,85 205,185 95,185" fill="currentColor"/>
      <polygon points="150,85 170,120 158,125 150,118 142,125 130,120" fill="#ffffff"/>
      <polygon points="185,125 225,185 145,185" fill="currentColor" opacity="0.7"/>
      <circle cx="150" cy="140" r="55" stroke="#f59e0b" stroke-width="3" stroke-dasharray="6,4" fill="none"/>
    `
  },
  {
    id: 'tiger',
    name: 'Streetwear Tiger',
    path: `
      <circle cx="150" cy="145" r="45" fill="currentColor"/>
      <polygon points="115,100 130,115 105,120" fill="#f59e0b"/>
      <polygon points="185,100 170,115 195,120" fill="#f59e0b"/>
      <polygon points="135,135 145,145 130,148" fill="#111827"/>
      <polygon points="165,135 155,145 170,148" fill="#111827"/>
      <path d="M135 160 Q150 175 165 160" stroke="#f59e0b" stroke-width="4" fill="none"/>
    `
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Shadow Ghost Morale Patch',
    category: 'tactical',
    type: 'PVC Rubber 3D',
    size: '3.5" x 3.0"',
    border: 'Laser-Cut Molded',
    backing: 'Velcro Hook & Loop',
    colors: ['Tactical OD Green', 'Stealth Black', 'Night Glow'],
    stitches: '100% 3D Molded Polymer',
    description: 'Custom molded tactical morale patch for international special operations and night vision operators with embedded photoluminescent glow pigment.',
    rating: 5.0,
    reviewsCount: 38,
    imgBg: '#1e293b',
    shape: 'shield',
    icon: 'skull'
  },
  {
    id: 'gal-2',
    title: 'Hellriders MC Back Rocker',
    category: 'biker',
    type: 'Embroidered',
    size: '4.5" x 4.5"',
    border: 'Heavy Merrowed Border',
    backing: 'Heavy Duty Sew-On',
    colors: ['Crimson Red', 'Jet Black', 'Pure White', 'Metallic Gold'],
    stitches: '42,500 High-Density Stitches',
    description: 'Extra-dense rayon thread club rocker patch designed to withstand high winds, heavy rain, and harsh leather riding conditions.',
    rating: 5.0,
    reviewsCount: 64,
    imgBg: '#090d16',
    shape: 'diamond',
    icon: 'wings'
  },
  {
    id: 'gal-3',
    title: 'Timberline Peak Co. Leather Crest',
    category: 'lifestyle',
    type: 'Laser Engraved Leather',
    size: '3.0" x 2.5"',
    border: 'Debossed Stitch Channel',
    backing: 'Heat Seal Iron-On',
    colors: ['Dark Cognac Roast', 'Caramel Tan'],
    stitches: 'Laser Etched Deep Deboss',
    description: 'Full-grain oiled leather patch custom crafted for Pacific Northwest heritage wool snapbacks and premium flannel jackets.',
    rating: 4.9,
    reviewsCount: 29,
    imgBg: '#451a03',
    shape: 'crest',
    icon: 'compass'
  },
  {
    id: 'gal-4',
    title: 'State Championship Varsity Letter',
    category: 'sports',
    type: 'Vintage Chenille',
    size: '4.0" x 4.0"',
    border: 'Double Layer Wool Felt',
    backing: 'Industrial Iron-On',
    colors: ['Navy Blue Wool', 'Vibrant Athletic Gold', 'Snow White'],
    stitches: 'Plush Looped Moss Stitch',
    description: 'High-loft collegiate chenille patch with 100% genuine wool felt backing, crafted to honor varsity football athletes.',
    rating: 4.9,
    reviewsCount: 42,
    imgBg: '#0f172a',
    shape: 'circle',
    icon: 'tiger'
  },
  {
    id: 'gal-5',
    title: 'CyberOps Defense Taskforce',
    category: 'corporate',
    type: 'Micro Woven Patch',
    size: '3.0" x 3.0"',
    border: 'Merrowed Satin Border',
    backing: 'Velcro Hook & Loop',
    colors: ['Neon Cyan', 'Electric Cobalt', 'Carbon Black'],
    stitches: 'Micro-Jacquard Weave (Ultra Fine)',
    description: 'Engineered with 50-denier micro-threads to resolve high-frequency network vectors and 1.5mm monospace cybersecurity code.',
    rating: 5.0,
    reviewsCount: 19,
    imgBg: '#020617',
    shape: 'hexagon',
    icon: 'eagle'
  },
  {
    id: 'gal-6',
    title: 'Badlands Expedition Crew',
    category: 'tactical',
    type: 'Sublimated Hybrid Embroidery',
    size: '3.5" x 3.5"',
    border: 'Merrowed Khaki Thread',
    backing: 'Iron-On Heat Seal',
    colors: ['Desert Tan', 'Sunset Orange', 'Olive Drab', 'Burnt Ochre'],
    stitches: 'Full Color Dye-Sub + 14,000 Outline Stitches',
    description: 'Photographic canyon topography printed with zero pixelation and bordered with heavy Japanese rayon embroidery stitch.',
    rating: 4.8,
    reviewsCount: 22,
    imgBg: '#1c1917',
    shape: 'circle',
    icon: 'compass'
  }
];

export const TESTIMONIALS = [
  {
    author: 'Marcus Vance',
    role: 'Founder & Lead Designer',
    org: 'Vanguard Tactical Outfitters',
    avatar: 'MV',
    rating: 5,
    date: '2 weeks ago',
    text: 'ApexPatches created 1,200 custom 3D PVC patches for our tactical plate carrier launch. The detail is mindblowing — even tiny 2pt serial numbers came out razor-sharp. Turnaround was under 8 days and our customers are obsessed!'
  },
  {
    author: 'David "Ironhead" Kowalski',
    role: 'Road Captain',
    org: 'Rust & Iron Motorcycle Club',
    avatar: 'DK',
    rating: 5,
    date: '1 month ago',
    text: 'We have ordered from 4 different patch companies over the last 10 years. ApexPatches is hands down the best quality. Thick merrowed edges, rock solid stitching, and thread that does not fray even after thousands of highway miles in rain and sun.'
  },
  {
    author: 'Elena Rostova',
    role: 'Merchandise Director',
    org: 'Apex Athletics & Streetwear',
    avatar: 'ER',
    rating: 5,
    date: '3 weeks ago',
    text: 'The Chenille patches we ordered for our autumn streetwear capsule sold out in 48 hours. The fuzzy texture and double felt backing give our hoodies a 300-dollar luxury feel. Customer support digitizing was free and approved in 4 hours!'
  },
  {
    author: 'Chief Gregory Hayes',
    role: 'Battalion Commander',
    org: 'Metro Station 14 Fire & Rescue',
    avatar: 'GH',
    rating: 5,
    date: 'Just now',
    text: 'Exceptional service. They digitized our station badge directly from a worn-out photo on our wall. The digital proof was spotless and the final embroidered turnout patches are tough as nails. Highly recommended.'
  }
];

export const FAQS = [
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'We accept custom patch orders as low as 10 pieces! Whether you need a small batch for your squad, motorcycle club, or family reunion, or 10,000+ pieces for an international apparel brand, we provide factory-direct pricing with no minimum penalties.'
  },
  {
    q: 'How fast will I receive my custom patches?',
    a: 'Standard production time is 6 to 8 business days after you approve your free digital artwork proof. We also offer an express Rush Service of 3 to 5 business days. Express shipping worldwide via DHL / FedEx takes 2-4 days.'
  },
  {
    q: 'Is digitizing and artwork proof really free?',
    a: 'YES, 100% FREE! Unlike competitors who charge $30–$50 setup or digitizing fees, we provide complimentary Tajima-grade embroidery digitizing and send you a photo-realistic digital proof within 6 hours. You get unlimited free revisions until you are 100% satisfied.'
  },
  {
    q: 'What is the difference between Merrowed and Laser-Cut borders?',
    a: 'A Merrowed border is a traditional, heavy overlock rolled edge (approx. 1/8" thick) wrapped around standard shapes (circle, shield, rectangle). A Laser-Cut (or heat cut) edge is trimmed flush using precision laser beams, making it essential for complex die-cut contours, stars, flames, and tactical velcro shapes.'
  },
  {
    q: 'Which backing should I choose for my patches?',
    a: '• Hook & Loop (Velcro): Best for tactical vests, uniforms, backpacks, and interchangeable gear.\n• Iron-On (Heat Seal): Best for jeans, jackets, cotton hoodies, and permanent DIY attachment.\n• Sew-On: Best for heavy biker leather, canvas bags, and items undergoing extreme industrial washing.\n• 3M Peel & Stick: Perfect for one-day events, conferences, trade shows, and temporary placement.\n• Magnetic: Zero holes or glue, ideal for delicate blazers, suits, and silk.'
  },
  {
    q: 'Can I see a sample before full mass production?',
    a: 'Absolutely! For every single order, we create a high-resolution digital mock proof for your approval first. For large production orders (250+ patches), we can also sew a real physical production sample patch and email you macro high-def photos before running the complete batch.'
  }
];

// Dynamic Gallery Storage
export function getGalleryItems() {
  try {
    const custom = localStorage.getItem('apex_custom_gallery');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Error reading custom gallery:', e);
  }
  return GALLERY_ITEMS;
}

export function saveGalleryItems(items) {
  try {
    localStorage.setItem('apex_custom_gallery', JSON.stringify(items));
  } catch (e) {
    console.error('Error saving gallery items:', e);
  }
}

// Site Settings
export const DEFAULT_SITE_SETTINGS = {
  companyName: 'ApexPatches',
  tagline: 'The Custom Patch Studio',
  whatsappRaw: '923000000000',
  whatsappDisplay: '+92 300 0000000',
  supportEmail: 'support@apexpatches.com',
  phone: '+1 (800) 555-PATCH',
  announcement: '⭐ FLASH SALE: 10% OFF with code WELCOME10 • 🚀 FREE Artwork Proof in 6 Hours • 📦 Free Global Shipping on $100+',
  basePrice: 2.20
};

export function getSiteSettings() {
  try {
    const saved = localStorage.getItem('apex_site_settings');
    if (saved) return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
  } catch (e) {}
  return DEFAULT_SITE_SETTINGS;
}

export function saveSiteSettings(settings) {
  try {
    localStorage.setItem('apex_site_settings', JSON.stringify(settings));
  } catch (e) {}
}
