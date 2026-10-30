/**
 * ApexPatches - Interactive Live Patch Studio & Designer
 */

import { SHAPES, BADGE_ICONS, BACKINGS } from './data.js';

class PatchCustomizer {
  constructor() {
    this.state = {
      shapeId: 'shield',
      styleId: 'embroidered',
      fabricColor: '#0b0f17',
      borderColor: '#f59e0b',
      threadColor: '#f1f5f9',
      borderType: 'merrowed',
      iconId: 'eagle',
      customImageSrc: null,
      topText: 'TACTICAL UNIT',
      bottomText: 'EST. 2026',
      backingId: 'velcro',
      mockupView: 'studio', // 'studio', 'backpack', 'jacket', 'hat'
      isFlipped: false,
      sizeInch: 3.5,
      quantity: 50
    };

    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.render();
  }

  cacheDOMElements() {
    this.svgContainer = document.getElementById('customizer-svg-container');
    this.flipper = document.getElementById('customizer-flipper');
    this.mockupContainer = document.getElementById('customizer-mockup-stage');
    this.backLayer = document.getElementById('customizer-back-texture');
    this.customizerPriceEl = document.getElementById('customizer-unit-price');
    this.customizerTotalEl = document.getElementById('customizer-total-price');

    // Control inputs
    this.shapeBtns = document.querySelectorAll('[data-custom-shape]');
    this.styleBtns = document.querySelectorAll('[data-custom-style]');
    this.fabricColorPicker = document.getElementById('input-fabric-color');
    this.borderColorPicker = document.getElementById('input-border-color');
    this.threadColorPicker = document.getElementById('input-thread-color');
    this.iconBtns = document.querySelectorAll('[data-custom-icon]');
    this.topTextInput = document.getElementById('input-top-text');
    this.bottomTextInput = document.getElementById('input-bottom-text');
    this.backingBtns = document.querySelectorAll('[data-custom-backing]');
    this.mockupBtns = document.querySelectorAll('[data-custom-mockup]');
    this.flipToggleBtn = document.getElementById('btn-flip-patch');
    this.fileUploadInput = document.getElementById('input-custom-logo-file');
    this.resetLogoBtn = document.getElementById('btn-reset-logo');
    this.addToCartBtn = document.getElementById('btn-customizer-add-cart');
    this.sizeSlider = document.getElementById('customizer-size-slider');
    this.sizeDisplay = document.getElementById('customizer-size-display');
  }

  bindEvents() {
    // Shape selector
    this.shapeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const shape = btn.getAttribute('data-custom-shape');
        this.shapeBtns.forEach(b => b.classList.remove('pill-active', 'border-amber-500'));
        btn.classList.add('pill-active', 'border-amber-500');
        this.state.shapeId = shape;
        this.render();
      });
    });

    // Style selector
    this.styleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const style = btn.getAttribute('data-custom-style');
        this.styleBtns.forEach(b => b.classList.remove('pill-active', 'border-amber-500'));
        btn.classList.add('pill-active', 'border-amber-500');
        this.state.styleId = style;
        this.render();
      });
    });

    // Color pickers & presets
    if (this.fabricColorPicker) {
      this.fabricColorPicker.addEventListener('input', (e) => {
        this.state.fabricColor = e.target.value;
        this.render();
      });
    }

    if (this.borderColorPicker) {
      this.borderColorPicker.addEventListener('input', (e) => {
        this.state.borderColor = e.target.value;
        this.render();
      });
    }

    if (this.threadColorPicker) {
      this.threadColorPicker.addEventListener('input', (e) => {
        this.state.threadColor = e.target.value;
        this.render();
      });
    }

    // Color preset pill clicks
    document.querySelectorAll('[data-preset-color]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-color-target');
        const color = btn.getAttribute('data-preset-color');
        if (target === 'fabric') {
          this.state.fabricColor = color;
          if (this.fabricColorPicker) this.fabricColorPicker.value = color;
        } else if (target === 'border') {
          this.state.borderColor = color;
          if (this.borderColorPicker) this.borderColorPicker.value = color;
        } else if (target === 'thread') {
          this.state.threadColor = color;
          if (this.threadColorPicker) this.threadColorPicker.value = color;
        }
        this.render();
      });
    });

    // Icon presets
    this.iconBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.iconBtns.forEach(b => b.classList.remove('border-amber-500', 'bg-amber-500/20'));
        btn.classList.add('border-amber-500', 'bg-amber-500/20');
        this.state.iconId = btn.getAttribute('data-custom-icon');
        this.state.customImageSrc = null;
        if (this.resetLogoBtn) this.resetLogoBtn.classList.add('hidden');
        this.render();
      });
    });

    // Custom logo upload
    if (this.fileUploadInput) {
      this.fileUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.state.customImageSrc = event.target.result;
            if (this.resetLogoBtn) this.resetLogoBtn.classList.remove('hidden');
            this.render();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (this.resetLogoBtn) {
      this.resetLogoBtn.addEventListener('click', () => {
        this.state.customImageSrc = null;
        this.fileUploadInput.value = '';
        this.resetLogoBtn.classList.add('hidden');
        this.render();
      });
    }

    // Text inputs
    if (this.topTextInput) {
      this.topTextInput.addEventListener('input', (e) => {
        this.state.topText = e.target.value.toUpperCase();
        this.render();
      });
    }

    if (this.bottomTextInput) {
      this.bottomTextInput.addEventListener('input', (e) => {
        this.state.bottomText = e.target.value.toUpperCase();
        this.render();
      });
    }

    // Backing selector
    this.backingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.backingBtns.forEach(b => b.classList.remove('border-amber-500', 'bg-amber-500/20'));
        btn.classList.add('border-amber-500', 'bg-amber-500/20');
        this.state.backingId = btn.getAttribute('data-custom-backing');
        this.updateBackingTexture();
        this.updatePrice();
      });
    });

    // Flip patch toggle
    if (this.flipToggleBtn) {
      this.flipToggleBtn.addEventListener('click', () => {
        this.state.isFlipped = !this.state.isFlipped;
        if (this.flipper) {
          this.flipper.classList.toggle('is-flipped', this.state.isFlipped);
        }
        this.flipToggleBtn.innerHTML = this.state.isFlipped
          ? '<i data-lucide="rotate-ccw" class="w-4 h-4 inline mr-1"></i> View Front Artwork'
          : '<i data-lucide="shield-check" class="w-4 h-4 inline mr-1"></i> Flip to Backing View';
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Mockup Stage switcher
    this.mockupBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-custom-mockup');
        this.mockupBtns.forEach(b => b.classList.remove('pill-active'));
        btn.classList.add('pill-active');
        this.state.mockupView = view;
        this.updateMockupStage();
      });
    });

    // Size slider
    if (this.sizeSlider) {
      this.sizeSlider.addEventListener('input', (e) => {
        this.state.sizeInch = parseFloat(e.target.value);
        if (this.sizeDisplay) this.sizeDisplay.textContent = `${this.state.sizeInch.toFixed(1)}"`;
        this.updatePrice();
      });
    }

    // Add to cart from customizer
    if (this.addToCartBtn) {
      this.addToCartBtn.addEventListener('click', () => {
        const item = {
          id: `custom-${Date.now()}`,
          title: `Custom ${this.state.styleId.toUpperCase()} Patch (${this.state.shapeId})`,
          type: this.state.styleId,
          shape: this.state.shapeId,
          size: `${this.state.sizeInch}"`,
          backing: this.state.backingId,
          topText: this.state.topText,
          bottomText: this.state.bottomText,
          quantity: this.state.quantity,
          unitPrice: this.calculateUnitPrice(),
          totalPrice: this.calculateTotalPrice()
        };

        if (window.ApexCart) {
          window.ApexCart.addItem(item);
        }
      });
    }
  }

  updateMockupStage() {
    if (!this.mockupContainer) return;

    this.mockupContainer.className = 'w-full h-96 relative flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 border border-slate-800';

    if (this.state.mockupView === 'backpack') {
      this.mockupContainer.classList.add('bg-slate-900');
      this.mockupContainer.style.backgroundImage = 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)';
      this.svgContainer.style.transform = 'scale(0.85) rotate(-2deg)';
    } else if (this.state.mockupView === 'jacket') {
      this.mockupContainer.classList.add('mockup-jacket');
      this.mockupContainer.style.backgroundImage = '';
      this.svgContainer.style.transform = 'scale(0.9) rotate(3deg)';
    } else if (this.state.mockupView === 'hat') {
      this.mockupContainer.style.backgroundColor = '#18181b';
      this.mockupContainer.style.backgroundImage = 'radial-gradient(circle at 50% 30%, #27272a 0%, #09090b 100%)';
      this.svgContainer.style.transform = 'scale(0.75) translateY(-10px)';
    } else {
      // Studio
      this.mockupContainer.style.backgroundColor = '#0b0f17';
      this.mockupContainer.style.backgroundImage = 'radial-gradient(#1e293b 1px, transparent 1px)';
      this.mockupContainer.style.backgroundSize = '20px 20px';
      this.svgContainer.style.transform = 'scale(1)';
    }
  }

  updateBackingTexture() {
    if (!this.backLayer) return;
    const shape = SHAPES.find(s => s.id === this.state.shapeId) || SHAPES[0];

    let textureClass = 'velcro-texture';
    let label = 'MIL-SPEC HOOK & LOOP (VELCRO)';

    if (this.state.backingId === 'iron-on') {
      textureClass = 'iron-on-texture';
      label = 'HEAT-ACTIVATED SEAL FILM (IRON-ON)';
    } else if (this.state.backingId === 'sew-on') {
      textureClass = 'bg-slate-900 border-2 border-dashed border-slate-600';
      label = 'REINFORCED TWILL (SEW-ON)';
    } else if (this.state.backingId === 'peel-stick') {
      textureClass = 'bg-amber-100 text-slate-900 border-2 border-amber-400';
      label = '3M HIGH-TACK PRESSURE ADHESIVE';
    } else if (this.state.backingId === 'magnetic') {
      textureClass = 'bg-slate-800';
      label = 'NEODYMIUM MAGNETIC BACKING';
    }

    this.backLayer.innerHTML = `
      <svg viewBox="0 0 300 300" class="w-72 h-72 drop-shadow-2xl">
        <defs>
          <clipPath id="backClip">
            <path d="${shape.svgPath}" />
          </clipPath>
        </defs>
        <path d="${shape.svgPath}" fill="#111827" stroke="${this.state.borderColor}" stroke-width="8" stroke-dasharray="6,4" />
        <g clip-path="url(#backClip)">
          <foreignObject x="0" y="0" width="300" height="300">
            <div class="w-full h-full ${textureClass} flex flex-col items-center justify-center p-6 text-center">
              <span class="text-xs font-mono font-bold tracking-widest text-amber-400 bg-black/75 px-3 py-1.5 rounded-full border border-amber-400/40 uppercase">
                ${label}
              </span>
              <p class="text-[10px] text-slate-300 mt-2 max-w-[180px] bg-black/60 p-1 rounded">
                ${this.state.backingId === 'velcro' ? 'Genuine Military Grade Hook Fastener Sewn Along Perimeter' : 'Industrial Bonded Layer'}
              </p>
            </div>
          </foreignObject>
        </g>
      </svg>
    `;
  }

  calculateUnitPrice() {
    const base = 2.20;
    const sizeMultiplier = this.state.sizeInch / 3.0;
    let backingCost = 0.45;
    if (this.state.backingId === 'iron-on') backingCost = 0.25;
    if (this.state.backingId === 'sew-on') backingCost = 0.0;
    if (this.state.backingId === 'magnetic') backingCost = 0.95;

    let styleMultiplier = 1.0;
    if (this.state.styleId === 'pvc') styleMultiplier = 1.25;
    if (this.state.styleId === 'leather') styleMultiplier = 1.15;
    if (this.state.styleId === 'chenille') styleMultiplier = 1.35;

    const unit = (base * sizeMultiplier * styleMultiplier) + backingCost;
    return Math.max(1.10, unit);
  }

  calculateTotalPrice() {
    const unit = this.calculateUnitPrice();
    return (unit * this.state.quantity);
  }

  updatePrice() {
    const unit = this.calculateUnitPrice();
    const total = this.calculateTotalPrice();

    if (this.customizerPriceEl) {
      this.customizerPriceEl.textContent = `$${unit.toFixed(2)}`;
    }
    if (this.customizerTotalEl) {
      this.customizerTotalEl.textContent = `$${total.toFixed(2)}`;
    }
  }

  render() {
    const shape = SHAPES.find(s => s.id === this.state.shapeId) || SHAPES[0];
    const iconObj = BADGE_ICONS.find(i => i.id === this.state.iconId) || BADGE_ICONS[0];

    // Style adjustments
    let styleClass = 'merrowed-border';
    let filterEffect = '';
    let stitchPattern = `stroke-dasharray="4,2"`;

    if (this.state.styleId === 'pvc') {
      styleClass = 'pvc-patch-effect';
      stitchPattern = `stroke-width="12" stroke-linecap="round"`;
    } else if (this.state.styleId === 'leather') {
      styleClass = 'leather-debossed';
      stitchPattern = `stroke-dasharray="6,4" stroke-width="4"`;
    } else if (this.state.styleId === 'chenille') {
      stitchPattern = `stroke-dasharray="2,3" stroke-width="10"`;
    }

    // Build center graphic SVG
    let centerGraphic = '';
    if (this.state.customImageSrc) {
      centerGraphic = `
        <image href="${this.state.customImageSrc}" x="95" y="95" width="110" height="110" preserveAspectRatio="xMidYMid meet" />
      `;
    } else {
      centerGraphic = `
        <g fill="${this.state.threadColor}" color="${this.state.threadColor}">
          ${iconObj.path}
        </g>
      `;
    }

    const svgContent = `
      <svg viewBox="0 0 300 300" class="w-72 h-72 select-none filter drop-shadow-2xl">
        <defs>
          <filter id="threadEmboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
            <feOffset in="blur" dx="1" dy="2" result="offset"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="offset"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <pattern id="twillWeave" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
          </pattern>

          <!-- Text Curves -->
          <path id="topTextCurve" d="M 65 140 C 75 70, 225 70, 235 140" fill="none" />
          <path id="bottomTextCurve" d="M 75 190 C 115 250, 185 250, 225 190" fill="none" />
          
          <clipPath id="patchClip">
            <path d="${shape.svgPath}" />
          </clipPath>
        </defs>

        <!-- Base Fabric / Twill Fill -->
        <g clip-path="url(#patchClip)">
          <!-- Main Color -->
          <path d="${shape.svgPath}" fill="${this.state.fabricColor}" />
          <!-- Twill Pattern Overlay -->
          <rect x="0" y="0" width="300" height="300" fill="url(#twillWeave)" />
          
          <!-- Inner Precision Stitching Line -->
          <path d="${shape.svgPath}" fill="none" stroke="${this.state.borderColor}" stroke-width="2.5" ${stitchPattern} transform="scale(0.92) translate(12, 12)" opacity="0.85" />
          
          <!-- Center Clipart Graphic -->
          <g filter="url(#threadEmboss)">
            ${centerGraphic}
          </g>

          <!-- Top Arc Text -->
          ${this.state.topText ? `
            <text font-family="'Montserrat', sans-serif" font-weight="900" font-size="14" fill="${this.state.threadColor}" letter-spacing="3" filter="url(#threadEmboss)">
              <textPath href="#topTextCurve" startOffset="50%" text-anchor="middle">
                ${this.state.topText}
              </textPath>
            </text>
          ` : ''}

          <!-- Bottom Arc Text -->
          ${this.state.bottomText ? `
            <text font-family="'Montserrat', sans-serif" font-weight="800" font-size="12" fill="${this.state.borderColor}" letter-spacing="2" filter="url(#threadEmboss)">
              <textPath href="#bottomTextCurve" startOffset="50%" text-anchor="middle">
                ${this.state.bottomText}
              </textPath>
            </text>
          ` : ''}

          <!-- Star Accents -->
          <polygon points="75,150 78,156 84,156 79,160 81,166 75,162 70,166 72,160 67,156 73,156" fill="${this.state.borderColor}" />
          <polygon points="225,150 228,156 234,156 229,160 231,166 225,162 220,166 222,160 217,156 223,156" fill="${this.state.borderColor}" />
        </g>

        <!-- Heavy Overlocked Merrowed Border (Outer) -->
        <path d="${shape.svgPath}" fill="none" stroke="#000000" stroke-width="12" opacity="0.65" />
        <path d="${shape.svgPath}" fill="none" stroke="${this.state.borderColor}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
        <path d="${shape.svgPath}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="3,3" />
      </svg>
    `;

    if (this.svgContainer) {
      this.svgContainer.innerHTML = svgContent;
    }

    this.updateBackingTexture();
    this.updatePrice();
  }
}

// Instantiate and attach globally
document.addEventListener('DOMContentLoaded', () => {
  window.ApexCustomizer = new PatchCustomizer();
});
