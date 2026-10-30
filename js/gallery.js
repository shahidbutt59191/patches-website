/**
 * ApexPatches - Filterable Gallery & Portfolio Showcase
 */

import { getGalleryItems, SHAPES, BADGE_ICONS } from './data.js';

class PatchGallery {
  constructor() {
    this.items = getGalleryItems();
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.activeItem = null;

    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.render();
  }

  cacheDOMElements() {
    this.grid = document.getElementById('gallery-grid');
    this.filterBtns = document.querySelectorAll('[data-gallery-filter]');
    this.searchInput = document.getElementById('gallery-search');
    this.modal = document.getElementById('gallery-modal');
    this.modalContent = document.getElementById('gallery-modal-content');
    this.modalClose = document.getElementById('gallery-modal-close');
  }

  bindEvents() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('pill-active'));
        btn.classList.add('pill-active');
        this.activeFilter = btn.getAttribute('data-gallery-filter');
        this.render();
      });
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
        this.closeModal();
      }
    });
  }

  generatePatchSVG(item) {
    if (item.customImgUrl) {
      return `
        <div class="w-full h-full p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <img src="${item.customImgUrl}" alt="${item.title}" class="max-w-[220px] max-h-[220px] object-contain filter drop-shadow-2xl rounded-xl" />
        </div>
      `;
    }

    const shape = SHAPES.find(s => s.id === item.shape) || SHAPES[0];
    const iconObj = BADGE_ICONS.find(i => i.id === item.icon) || BADGE_ICONS[0];

    return `
      <svg viewBox="0 0 300 300" class="w-full h-full p-6 select-none transition-transform duration-500 group-hover:scale-105 filter drop-shadow-xl">
        <defs>
          <clipPath id="clip-${item.id}">
            <path d="${shape.svgPath}" />
          </clipPath>
        </defs>
        <g clip-path="url(#clip-${item.id})">
          <path d="${shape.svgPath}" fill="${item.imgBg}" />
          <path d="${shape.svgPath}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,2" transform="scale(0.92) translate(12, 12)" opacity="0.8" />
          <g fill="#f1f5f9" color="#f1f5f9">
            ${iconObj.path}
          </g>
        </g>
        <!-- Border -->
        <path d="${shape.svgPath}" fill="none" stroke="#000" stroke-width="10" opacity="0.6" />
        <path d="${shape.svgPath}" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" />
        <path d="${shape.svgPath}" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7" />
      </svg>
    `;
  }

  render() {
    if (!this.grid) return;

    const filtered = this.items.filter(item => {
      const matchesFilter = this.activeFilter === 'all' || item.category === this.activeFilter;
      const matchesSearch = !this.searchQuery || 
        item.title.toLowerCase().includes(this.searchQuery) ||
        item.type.toLowerCase().includes(this.searchQuery) ||
        item.description.toLowerCase().includes(this.searchQuery);
      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      this.grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
          <p class="text-lg font-medium text-slate-300">No patch designs found</p>
          <p class="text-sm">Try searching another keyword or select "All Styles".</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    this.grid.innerHTML = filtered.map(item => `
      <div class="group bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col">
        <!-- Visual Patch Canvas -->
        <div class="relative h-64 bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
          <div class="absolute inset-0 bg-twill-texture opacity-30"></div>
          ${this.generatePatchSVG(item)}
          
          <!-- Badges -->
          <span class="absolute top-3 left-3 bg-slate-900/90 backdrop-blur border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ${item.type}
          </span>
          <span class="absolute top-3 right-3 bg-black/70 backdrop-blur text-slate-300 text-xs font-mono px-2.5 py-1 rounded-full">
            ${item.size}
          </span>

          <!-- Quick Action Hover Overlay -->
          <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
            <button data-quick-view="${item.id}" class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-transform hover:scale-105 shadow-lg flex items-center gap-1.5">
              <i data-lucide="zoom-in" class="w-4 h-4"></i> Inspect Stitches
            </button>
            <button data-recreate="${item.id}" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm rounded-xl border border-slate-600 transition-transform hover:scale-105 flex items-center gap-1.5">
              <i data-lucide="wand-2" class="w-4 h-4 text-amber-400"></i> Customize
            </button>
          </div>
        </div>

        <!-- Meta Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <h3 class="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                ${item.title}
              </h3>
              <div class="flex items-center text-amber-400 text-xs font-bold gap-1">
                <span>★</span>
                <span>${item.rating.toFixed(1)}</span>
                <span class="text-slate-500 text-[11px]">(${item.reviewsCount})</span>
              </div>
            </div>
            <p class="text-slate-400 text-xs line-clamp-2 mb-3">
              ${item.description}
            </p>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span class="flex items-center gap-1">
              <i data-lucide="shield" class="w-3.5 h-3.5 text-amber-500"></i> ${item.backing}
            </span>
            <span class="font-mono text-slate-300">
              ${item.border}
            </span>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Attach listeners to quick view buttons
    this.grid.querySelectorAll('[data-quick-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-quick-view');
        this.openModal(id);
      });
    });

    // Attach listeners to recreate buttons
    this.grid.querySelectorAll('[data-recreate]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-recreate');
        this.recreateInStudio(id);
      });
    });
  }

  openModal(id) {
    const item = this.items.find(i => i.id === id);
    if (!item || !this.modal || !this.modalContent) return;

    this.activeItem = item;

    this.modalContent.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- Visual Display -->
        <div class="relative bg-slate-950 rounded-2xl p-6 border border-slate-800 flex items-center justify-center min-h-[320px]">
          <div class="absolute inset-0 bg-twill-texture opacity-30"></div>
          ${this.generatePatchSVG(item)}
        </div>

        <!-- Details Sheet -->
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase">
              ${item.type}
            </span>
            <span class="text-xs text-slate-400 font-mono">
              Category: ${item.category.toUpperCase()}
            </span>
          </div>

          <h2 class="text-2xl font-black text-white mb-2">${item.title}</h2>
          <p class="text-slate-300 text-sm mb-6 leading-relaxed">${item.description}</p>

          <div class="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs font-mono text-slate-300 mb-6">
            <div class="flex justify-between border-b border-slate-800/80 pb-2">
              <span class="text-slate-400">Dimensions:</span>
              <span class="font-bold text-white">${item.size}</span>
            </div>
            <div class="flex justify-between border-b border-slate-800/80 pb-2">
              <span class="text-slate-400">Border Style:</span>
              <span class="font-bold text-amber-400">${item.border}</span>
            </div>
            <div class="flex justify-between border-b border-slate-800/80 pb-2">
              <span class="text-slate-400">Default Backing:</span>
              <span class="font-bold text-white">${item.backing}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Stitch Density / Spec:</span>
              <span class="font-bold text-emerald-400">${item.stitches}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <button id="modal-recreate-btn" class="flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2">
              <i data-lucide="edit-3" class="w-4 h-4"></i> Open in 3D Customizer
            </button>
            <button id="modal-quote-btn" class="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2">
              <i data-lucide="mail" class="w-4 h-4 text-amber-400"></i> Get Exact Quote
            </button>
          </div>
        </div>
      </div>
    `;

    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();

    const recreateBtn = document.getElementById('modal-recreate-btn');
    if (recreateBtn) {
      recreateBtn.addEventListener('click', () => {
        this.closeModal();
        this.recreateInStudio(item.id);
      });
    }

    const quoteBtn = document.getElementById('modal-quote-btn');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        this.closeModal();
        const quoteSection = document.getElementById('quote-form-section');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
          const notesInput = document.getElementById('quote-notes');
          if (notesInput) {
            notesInput.value = `Inquiring about portfolio design: "${item.title}" (${item.type}, ${item.size}).`;
          }
        }
      });
    }
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  recreateInStudio(id) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;

    const customizerSection = document.getElementById('customizer-section');
    if (customizerSection) {
      customizerSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.ApexCustomizer) {
      window.ApexCustomizer.state.shapeId = item.shape || 'shield';
      window.ApexCustomizer.state.iconId = item.icon || 'eagle';
      window.ApexCustomizer.state.topText = item.title.toUpperCase().slice(0, 15);
      window.ApexCustomizer.render();

      if (window.ApexApp && window.ApexApp.toast) {
        window.ApexApp.toast(`Loaded "${item.title}" into Patch Studio!`, 'success');
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ApexGallery = new PatchGallery();
});
