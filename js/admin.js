/**
 * ApexPatches - Store Manager & Admin Controller
 */

import { 
  getGalleryItems, 
  saveGalleryItems, 
  GALLERY_ITEMS, 
  getSiteSettings, 
  saveSiteSettings, 
  DEFAULT_SITE_SETTINGS,
  SHAPES,
  BADGE_ICONS
} from './data.js';

import { SupabaseManager } from './supabaseClient.js';

class StoreAdminManager {
  constructor() {
    this.currentTab = 'products';
    this.products = getGalleryItems();
    this.quotes = [];
    this.orders = [];
    this.productCatFilter = 'all';
    this.productSearch = '';
    this.quoteSearch = '';
    this.orderSearch = '';
    this.uploadedImageBase64 = null;

    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.loadInitialData();
    this.renderProducts();
    this.updateCounters();
  }

  cacheDOMElements() {
    // Navigation Tabs
    this.tabButtons = document.querySelectorAll('[data-admin-tab]');
    this.panels = {
      products: document.getElementById('panel-products'),
      quotes: document.getElementById('panel-quotes'),
      orders: document.getElementById('panel-orders'),
      pricing: document.getElementById('panel-pricing'),
      settings: document.getElementById('panel-settings')
    };

    // Counters
    this.badgePatches = document.getElementById('badge-total-patches');
    this.badgeQuotes = document.getElementById('badge-total-quotes');
    this.badgeOrders = document.getElementById('badge-total-orders');

    // Products Section
    this.productsGrid = document.getElementById('admin-products-grid');
    this.catFilterBtns = document.querySelectorAll('[data-cat-filter]');
    this.searchProductsInput = document.getElementById('search-products-input');
    this.btnAddNewPatch = document.getElementById('btn-add-new-patch');

    // Product Modal Editor
    this.modalPatch = document.getElementById('modal-patch-editor');
    this.modalPatchClose = document.getElementById('modal-patch-close');
    this.modalPatchTitle = document.getElementById('modal-patch-title');
    this.formPatch = document.getElementById('form-patch-editor');
    this.btnCancelPatch = document.getElementById('btn-cancel-patch-editor');
    
    // Editor Form Inputs
    this.inputPatchId = document.getElementById('edit-patch-id');
    this.inputPatchName = document.getElementById('edit-patch-name');
    this.inputPatchCategory = document.getElementById('edit-patch-category');
    this.inputPatchType = document.getElementById('edit-patch-type');
    this.inputPatchPrice = document.getElementById('edit-patch-price');
    this.inputPatchSize = document.getElementById('edit-patch-size');
    this.inputPatchBorder = document.getElementById('edit-patch-border');
    this.inputPatchFile = document.getElementById('edit-patch-file');
    this.inputPatchImgUrl = document.getElementById('edit-patch-imgurl');
    this.patchPreviewBox = document.getElementById('edit-patch-preview-box');
    this.patchPreviewImg = document.getElementById('edit-patch-preview-img');
    this.inputPatchDesc = document.getElementById('edit-patch-desc');

    // Quotes Section
    this.quotesTableBody = document.getElementById('admin-quotes-table-body');
    this.searchQuotesInput = document.getElementById('search-quotes-input');

    // Orders Section
    this.ordersList = document.getElementById('admin-orders-list');
    this.searchOrdersInput = document.getElementById('search-orders-input');

    // Invoice Modal
    this.modalInvoice = document.getElementById('printable-work-order');
    this.modalInvoiceClose = document.getElementById('modal-invoice-close');
    this.modalInvoiceContent = document.getElementById('modal-invoice-content');

    // Pricing & Settings Forms
    this.pricingForm = document.getElementById('pricing-rules-form');
    this.inputBasePrice = document.getElementById('input-base-price');
    this.settingsForm = document.getElementById('site-settings-form');
    this.settingWhatsApp = document.getElementById('setting-whatsapp');
    this.settingEmail = document.getElementById('setting-email');
    this.settingPhone = document.getElementById('setting-phone');
    this.settingAnnouncement = document.getElementById('setting-announcement');
    this.settingSupabaseUrl = document.getElementById('setting-supabase-url');
    this.settingSupabaseKey = document.getElementById('setting-supabase-key');
    this.btnResetDefaults = document.getElementById('btn-reset-defaults');

    // Exports
    this.btnExportPatches = document.getElementById('btn-export-catalog-csv');
    this.btnExportOrders = document.getElementById('btn-export-orders-csv');
    this.btnRefresh = document.getElementById('btn-admin-refresh');
  }

  bindEvents() {
    // Tab switching
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-admin-tab');
        this.switchTab(tab);
      });
    });

    // Refresh
    if (this.btnRefresh) {
      this.btnRefresh.addEventListener('click', () => {
        this.loadInitialData();
        this.renderProducts();
        this.toast('Store data refreshed!', 'info');
      });
    }

    // Category filters for products
    this.catFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.catFilterBtns.forEach(b => b.classList.remove('tab-active'));
        btn.classList.add('tab-active');
        this.productCatFilter = btn.getAttribute('data-cat-filter');
        this.renderProducts();
      });
    });

    // Search products
    if (this.searchProductsInput) {
      this.searchProductsInput.addEventListener('input', (e) => {
        this.productSearch = e.target.value.toLowerCase().trim();
        this.renderProducts();
      });
    }

    // Search quotes
    if (this.searchQuotesInput) {
      this.searchQuotesInput.addEventListener('input', (e) => {
        this.quoteSearch = e.target.value.toLowerCase().trim();
        this.renderQuotes();
      });
    }

    // Search orders
    if (this.searchOrdersInput) {
      this.searchOrdersInput.addEventListener('input', (e) => {
        this.orderSearch = e.target.value.toLowerCase().trim();
        this.renderOrders();
      });
    }

    // Open Add Patch Modal
    if (this.btnAddNewPatch) {
      this.btnAddNewPatch.addEventListener('click', () => this.openPatchEditor());
    }

    // Close Modal
    if (this.modalPatchClose) {
      this.modalPatchClose.addEventListener('click', () => this.closePatchEditor());
    }
    if (this.btnCancelPatch) {
      this.btnCancelPatch.addEventListener('click', () => this.closePatchEditor());
    }
    if (this.modalPatch) {
      this.modalPatch.addEventListener('click', (e) => {
        if (e.target === this.modalPatch) this.closePatchEditor();
      });
    }

    // Image file upload in editor
    if (this.inputPatchFile) {
      this.inputPatchFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.uploadedImageBase64 = event.target.result;
            if (this.patchPreviewBox && this.patchPreviewImg) {
              this.patchPreviewImg.src = this.uploadedImageBase64;
              this.patchPreviewBox.classList.remove('hidden');
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Save Patch Form Submit
    if (this.formPatch) {
      this.formPatch.addEventListener('submit', (e) => {
        e.preventDefault();
        this.savePatchProduct();
      });
    }

    // Pricing rules form
    if (this.pricingForm) {
      this.pricingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const settings = getSiteSettings();
        settings.basePrice = parseFloat(this.inputBasePrice?.value) || 2.20;
        saveSiteSettings(settings);
        this.toast('✓ Pricing rules saved and applied to live calculator!', 'success');
      });
    }

    // Site settings form
    if (this.settingsForm) {
      this.settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const settings = getSiteSettings();
        settings.whatsappRaw = this.settingWhatsApp?.value?.trim().replace(/[^0-9]/g, '') || '923000000000';
        settings.whatsappDisplay = `+${settings.whatsappRaw}`;
        settings.supportEmail = this.settingEmail?.value?.trim() || 'support@apexpatches.com';
        settings.phone = this.settingPhone?.value?.trim() || '+1 (800) 555-PATCH';
        settings.announcement = this.settingAnnouncement?.value?.trim() || '';

        // Save Supabase credentials if entered
        const supaUrl = this.settingSupabaseUrl?.value?.trim() || '';
        const supaKey = this.settingSupabaseKey?.value?.trim() || '';
        if (supaUrl && supaKey) {
          SupabaseManager.saveCredentials(supaUrl, supaKey);
        }

        saveSiteSettings(settings);
        this.toast('✓ Website settings updated successfully!', 'success');
      });
    }

    // Reset Defaults
    if (this.btnResetDefaults) {
      this.btnResetDefaults.addEventListener('click', () => {
        if (confirm('Reset to original sample patches and settings?')) {
          localStorage.removeItem('apex_custom_gallery');
          localStorage.removeItem('apex_site_settings');
          this.products = getGalleryItems();
          this.renderProducts();
          this.populateSettings();
          this.toast('Restored original sample catalog.', 'info');
        }
      });
    }

    // Close invoice modal
    if (this.modalInvoiceClose) {
      this.modalInvoiceClose.addEventListener('click', () => this.closeWorkOrder());
    }
    if (this.modalInvoice) {
      this.modalInvoice.addEventListener('click', (e) => {
        if (e.target === this.modalInvoice) this.closeWorkOrder();
      });
    }

    // Exports
    if (this.btnExportPatches) {
      this.btnExportPatches.addEventListener('click', () => this.exportPatchesCSV());
    }
    if (this.btnExportOrders) {
      this.btnExportOrders.addEventListener('click', () => this.exportOrdersCSV());
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    this.tabButtons.forEach(btn => {
      if (btn.getAttribute('data-admin-tab') === tab) {
        btn.classList.add('tab-active');
        btn.classList.remove('text-slate-300');
      } else {
        btn.classList.remove('tab-active');
        btn.classList.add('text-slate-300');
      }
    });

    Object.keys(this.panels).forEach(key => {
      if (this.panels[key]) {
        const isCurrent = key === tab;
        this.panels[key].classList.toggle('hidden', !isCurrent);
        this.panels[key].style.display = isCurrent ? 'block' : 'none';
      }
    });

    if (tab === 'quotes') this.renderQuotes();
    if (tab === 'orders') this.renderOrders();
    if (tab === 'pricing' || tab === 'settings') this.populateSettings();

    if (window.lucide) window.lucide.createIcons();
  }

  async loadInitialData() {
    this.products = getGalleryItems();

    if (SupabaseManager.isConfigured()) {
      const [qRes, oRes] = await Promise.all([
        SupabaseManager.getAllQuotes(),
        SupabaseManager.getAllOrders()
      ]);
      this.quotes = qRes.success ? qRes.data : [];
      this.orders = oRes.success ? oRes.data : [];
    } else {
      try {
        const storedQuotes = localStorage.getItem('apex_local_quotes');
        this.quotes = storedQuotes ? JSON.parse(storedQuotes) : this.getSampleQuotes();
        const storedOrders = localStorage.getItem('apex_local_orders');
        this.orders = storedOrders ? JSON.parse(storedOrders) : this.getSampleOrders();
      } catch (e) {
        this.quotes = this.getSampleQuotes();
        this.orders = this.getSampleOrders();
      }
    }

    this.updateCounters();
  }

  getSampleQuotes() {
    return [
      {
        id: 'q-sample-1',
        ref_code: 'QT-84291',
        full_name: 'Captain Ryan Miller',
        email: 'ryan.miller@vanguard.com',
        phone: '+1 555-0192',
        patch_type: '3D PVC Rubber',
        quantity: 150,
        dimensions: '3.5" x 3.0"',
        notes: 'Velcro backing. OD Green background with night-vision glow border.',
        artwork_url: null,
        status: 'digitizing',
        created_at: new Date().toISOString()
      }
    ];
  }

  getSampleOrders() {
    return [
      {
        order_id: 'APX-591024',
        customer_name: 'David Kowalski',
        email: 'david@rustandiron.org',
        phone: '+1 555-8821',
        shipping_address: '104 Highway Blvd, Austin, TX, 78701',
        total_amount: 320.00,
        status: 'production',
        created_at: new Date().toISOString(),
        items: [
          {
            title: 'Hellriders MC Back Rocker',
            patch_type: 'Embroidered',
            size: '4.5" x 4.5"',
            backing: 'sew-on',
            quantity: 50,
            unit_price: 6.40,
            total_price: 320.00
          }
        ]
      }
    ];
  }

  updateCounters() {
    if (this.badgePatches) this.badgePatches.textContent = this.products.length;
    if (this.badgeQuotes) this.badgeQuotes.textContent = this.quotes.length;
    if (this.badgeOrders) this.badgeOrders.textContent = this.orders.length;
  }

  populateSettings() {
    const s = getSiteSettings();
    if (this.inputBasePrice) this.inputBasePrice.value = s.basePrice || 2.20;
    if (this.settingWhatsApp) this.settingWhatsApp.value = s.whatsappRaw || '923000000000';
    if (this.settingEmail) this.settingEmail.value = s.supportEmail || 'support@apexpatches.com';
    if (this.settingPhone) this.settingPhone.value = s.phone || '+1 (800) 555-PATCH';
    if (this.settingAnnouncement) this.settingAnnouncement.value = s.announcement || '';

    const creds = SupabaseManager.getCredentials();
    if (this.settingSupabaseUrl) this.settingSupabaseUrl.value = creds.url;
    if (this.settingSupabaseKey) this.settingSupabaseKey.value = creds.anonKey;
  }

  // ===========================================================================
  // PRODUCTS & GALLERY CATALOG CONTROLLER
  // ===========================================================================
  renderProducts() {
    if (!this.productsGrid) return;

    const filtered = this.products.filter(item => {
      const matchCat = this.productCatFilter === 'all' || item.category === this.productCatFilter;
      const matchSearch = !this.productSearch ||
        item.title.toLowerCase().includes(this.productSearch) ||
        item.type.toLowerCase().includes(this.productSearch) ||
        (item.description && item.description.toLowerCase().includes(this.productSearch));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.productsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-500 bg-[#0d1322] border border-[#1e293f] rounded-2xl">
          <i data-lucide="package-search" class="w-12 h-12 mx-auto mb-3 opacity-30"></i>
          <p class="text-sm font-bold text-slate-300">No patch products found</p>
          <p class="text-xs text-slate-400 mt-1 mb-4">Click "Add New Patch" to create a new product for your live website.</p>
          <button onclick="window.ApexAdmin.openPatchEditor()" class="px-4 py-2 bg-amber-500 text-black font-bold text-xs rounded-xl">
            Add First Patch
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    this.productsGrid.innerHTML = filtered.map(item => `
      <div class="admin-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-200">
        <!-- Image Thumbnail Area -->
        <div class="h-48 bg-[#080c14] border-b border-[#1e293f] relative flex items-center justify-center p-4 overflow-hidden">
          ${item.customImgUrl ? `
            <img src="${item.customImgUrl}" alt="${item.title}" class="max-w-full max-h-full object-contain filter drop-shadow-xl" />
          ` : `
            <div class="text-amber-500/80 font-mono text-xs flex flex-col items-center">
              <i data-lucide="shield" class="w-16 h-16 mb-1 text-amber-500"></i>
              <span>Vector Preset (${item.shape || 'Shield'})</span>
            </div>
          `}

          <!-- Category Badge -->
          <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-amber-400 border border-amber-500/30">
            ${item.category}
          </span>

          <!-- Price Pill -->
          <span class="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30">
            From ${item.startingPrice || '$2.20'}
          </span>
        </div>

        <!-- Meta Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
              ${item.title}
            </h4>
            <div class="text-xs text-slate-400 font-mono mb-2 flex items-center gap-2">
              <span class="text-slate-300 font-medium">${item.type}</span>
              <span>•</span>
              <span>${item.size || '3.5"'}</span>
            </div>
            <p class="text-[11px] text-slate-400 line-clamp-2 mb-4 leading-relaxed">
              ${item.description || 'Custom crafted with precision Tajima embroidery thread.'}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="pt-3 border-t border-[#1e293f] flex items-center justify-between">
            <span class="text-[11px] font-mono text-slate-500">
              Backing: <strong class="text-slate-300 font-bold">${item.backing || 'Velcro'}</strong>
            </span>
            <div class="flex items-center gap-2">
              <button data-edit-patch="${item.id}" class="px-3 py-1.5 bg-[#18223a] hover:bg-[#202d4d] text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <i data-lucide="edit-2" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Edit</span>
              </button>
              <button data-delete-patch="${item.id}" class="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-lg border border-rose-500/20 transition-colors" title="Delete from Website">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    // Bind Edit & Delete buttons
    this.productsGrid.querySelectorAll('[data-edit-patch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-patch');
        this.openPatchEditor(id);
      });
    });

    this.productsGrid.querySelectorAll('[data-delete-patch]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-patch');
        this.deletePatchProduct(id);
      });
    });
  }

  openPatchEditor(id = null) {
    this.uploadedImageBase64 = null;
    if (this.patchPreviewBox) this.patchPreviewBox.classList.add('hidden');
    if (this.inputPatchFile) this.inputPatchFile.value = '';

    if (id) {
      // Edit mode
      const item = this.products.find(p => p.id === id);
      if (!item) return;

      if (this.modalPatchTitle) this.modalPatchTitle.textContent = `Edit Patch: ${item.title}`;
      if (this.inputPatchId) this.inputPatchId.value = item.id;
      if (this.inputPatchName) this.inputPatchName.value = item.title;
      if (this.inputPatchCategory) this.inputPatchCategory.value = item.category || 'tactical';
      if (this.inputPatchType) this.inputPatchType.value = item.type || 'Embroidered';
      if (this.inputPatchPrice) this.inputPatchPrice.value = item.startingPrice || '$2.45';
      if (this.inputPatchSize) this.inputPatchSize.value = item.size || '3.5" x 3.0"';
      if (this.inputPatchBorder) this.inputPatchBorder.value = item.border || 'Heavy Merrowed Border';
      if (this.inputPatchImgUrl) this.inputPatchImgUrl.value = item.customImgUrl || '';
      if (this.inputPatchDesc) this.inputPatchDesc.value = item.description || '';

      if (item.customImgUrl && this.patchPreviewBox && this.patchPreviewImg) {
        this.patchPreviewImg.src = item.customImgUrl;
        this.patchPreviewBox.classList.remove('hidden');
      }
    } else {
      // New mode
      if (this.modalPatchTitle) this.modalPatchTitle.textContent = 'Add New Patch to Website';
      if (this.inputPatchId) this.inputPatchId.value = '';
      if (this.inputPatchName) this.inputPatchName.value = '';
      if (this.inputPatchPrice) this.inputPatchPrice.value = '$2.45';
      if (this.inputPatchSize) this.inputPatchSize.value = '3.5" x 3.0"';
      if (this.inputPatchBorder) this.inputPatchBorder.value = 'Heavy Merrowed Border';
      if (this.inputPatchImgUrl) this.inputPatchImgUrl.value = '';
      if (this.inputPatchDesc) this.inputPatchDesc.value = '';
    }

    if (this.modalPatch) {
      this.modalPatch.classList.remove('hidden');
      this.modalPatch.style.display = 'flex';
    }
    if (window.lucide) window.lucide.createIcons();
  }

  closePatchEditor() {
    if (this.modalPatch) {
      this.modalPatch.classList.add('hidden');
      this.modalPatch.style.display = 'none';
    }
  }

  closeWorkOrder() {
    if (this.modalInvoice) {
      this.modalInvoice.classList.add('hidden');
      this.modalInvoice.style.display = 'none';
    }
  }

  savePatchProduct() {
    const id = this.inputPatchId?.value?.trim();
    const title = this.inputPatchName?.value?.trim();
    const category = this.inputPatchCategory?.value;
    const type = this.inputPatchType?.value;
    const price = this.inputPatchPrice?.value?.trim();
    const size = this.inputPatchSize?.value?.trim() || '3.5"';
    const border = this.inputPatchBorder?.value?.trim() || 'Merrowed Border';
    const desc = this.inputPatchDesc?.value?.trim() || '';

    // Image priority: Uploaded file -> Image URL
    let imageUrl = this.uploadedImageBase64 || this.inputPatchImgUrl?.value?.trim() || null;

    if (!title) {
      this.toast('Please enter a patch title.', 'warning');
      return;
    }

    if (id) {
      // Update existing
      const index = this.products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.products[index].title = title;
        this.products[index].category = category;
        this.products[index].type = type;
        this.products[index].startingPrice = price.startsWith('$') ? price : `$${price}`;
        this.products[index].size = size;
        this.products[index].border = border;
        this.products[index].description = desc;
        if (imageUrl) this.products[index].customImgUrl = imageUrl;
      }
      this.toast(`✓ "${title}" updated successfully!`, 'success');
    } else {
      // Add new
      const newPatch = {
        id: `custom-patch-${Date.now()}`,
        title,
        category,
        type,
        startingPrice: price.startsWith('$') ? price : `$${price}`,
        size,
        border,
        backing: 'Velcro Hook & Loop',
        colors: ['Tactical Black', 'Gold Thread'],
        stitches: 'Tajima Precision Craft',
        description: desc || 'Custom crafted patch with ultra-dense thread and durable backing.',
        rating: 5.0,
        reviewsCount: 1,
        customImgUrl: imageUrl,
        shape: 'shield',
        icon: 'eagle',
        imgBg: '#1e293b'
      };
      this.products.unshift(newPatch);
      this.toast(`✓ "${title}" added to live website!`, 'success');
    }

    saveGalleryItems(this.products);
    this.renderProducts();
    this.updateCounters();
    this.closePatchEditor();
  }

  deletePatchProduct(id) {
    const item = this.products.find(p => p.id === id);
    if (!item) return;

    if (confirm(`Are you sure you want to delete "${item.title}" from the live website?`)) {
      this.products = this.products.filter(p => p.id !== id);
      saveGalleryItems(this.products);
      this.renderProducts();
      this.updateCounters();
      this.toast(`Deleted "${item.title}" from website.`, 'info');
    }
  }

  // ===========================================================================
  // QUOTES & CUSTOMER ARTWORKS
  // ===========================================================================
  renderQuotes() {
    if (!this.quotesTableBody) return;

    const filtered = this.quotes.filter(q => {
      const matchSearch = !this.quoteSearch ||
        (q.ref_code && q.ref_code.toLowerCase().includes(this.quoteSearch)) ||
        (q.full_name && q.full_name.toLowerCase().includes(this.quoteSearch)) ||
        (q.email && q.email.toLowerCase().includes(this.quoteSearch));
      return matchSearch;
    });

    if (filtered.length === 0) {
      this.quotesTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center text-slate-500 font-mono">
            No customer quote requests found.
          </td>
        </tr>
      `;
      return;
    }

    this.quotesTableBody.innerHTML = filtered.map(q => {
      const statusColors = {
        new: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        digitizing: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        proof_sent: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        rejected: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      };

      const dateStr = q.created_at ? new Date(q.created_at).toLocaleDateString() : 'Recent';
      const cleanPhone = (q.phone || '').replace(/[^0-9]/g, '');

      return `
        <tr class="hover:bg-[#121a2d] transition-colors">
          <td class="p-4 font-mono font-bold text-amber-400">
            #${q.ref_code}
            <span class="block text-[10px] text-slate-500 font-normal">${dateStr}</span>
          </td>
          <td class="p-4">
            <div class="font-bold text-white">${q.full_name}</div>
            <div class="text-[11px] text-slate-400 font-mono">${q.email}</div>
            <div class="text-[11px] text-slate-400 font-mono">${q.phone}</div>
          </td>
          <td class="p-4 font-mono">
            <span class="text-white font-medium">${q.patch_type}</span>
            <span class="block text-slate-400 text-[11px]">${q.quantity} pcs ${q.dimensions ? `(${q.dimensions})` : ''}</span>
          </td>
          <td class="p-4">
            ${q.artwork_url ? `
              <a href="${q.artwork_url}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-mono font-bold hover:bg-amber-500/20">
                <i data-lucide="image" class="w-3.5 h-3.5"></i> View File
              </a>
            ` : `
              <span class="text-slate-500 text-[11px] font-mono">No file</span>
            `}
          </td>
          <td class="p-4">
            <select data-update-quote="${q.id}" class="bg-[#080c14] border border-[#1e293f] rounded-lg px-2.5 py-1 text-xs font-mono font-bold ${statusColors[q.status] || 'text-white'} focus:border-amber-500 outline-none">
              <option value="new" ${q.status === 'new' ? 'selected' : ''}>New</option>
              <option value="digitizing" ${q.status === 'digitizing' ? 'selected' : ''}>In Digitizing</option>
              <option value="proof_sent" ${q.status === 'proof_sent' ? 'selected' : ''}>Proof Sent</option>
              <option value="approved" ${q.status === 'approved' ? 'selected' : ''}>Approved</option>
              <option value="rejected" ${q.status === 'rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </td>
          <td class="p-4 text-right space-x-2">
            <a 
              href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${q.full_name}! Regarding your custom patch inquiry #${q.ref_code} (${q.quantity} pcs of ${q.patch_type}), your Tajima digital proof is ready!`)}" 
              target="_blank" 
              class="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 rounded-lg border border-emerald-500/30 inline-flex items-center gap-1 text-xs font-semibold"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </a>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    this.quotesTableBody.querySelectorAll('[data-update-quote]').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const id = sel.getAttribute('data-update-quote');
        const status = e.target.value;
        if (SupabaseManager.isConfigured()) {
          await SupabaseManager.updateQuoteStatus(id, status);
        } else {
          const q = this.quotes.find(item => item.id === id);
          if (q) q.status = status;
          localStorage.setItem('apex_local_quotes', JSON.stringify(this.quotes));
        }
        this.toast(`Quote status updated to "${status}"`, 'success');
      });
    });
  }

  // ===========================================================================
  // ORDERS & PRODUCTION QUEUE
  // ===========================================================================
  renderOrders() {
    if (!this.ordersList) return;

    const filtered = this.orders.filter(o => {
      if (!this.orderSearch) return true;
      return (o.order_id && o.order_id.toLowerCase().includes(this.orderSearch)) ||
             (o.customer_name && o.customer_name.toLowerCase().includes(this.orderSearch)) ||
             (o.email && o.email.toLowerCase().includes(this.orderSearch));
    });

    if (filtered.length === 0) {
      this.ordersList.innerHTML = `
        <div class="bg-[#0d1322] border border-[#1e293f] rounded-2xl p-8 text-center text-slate-500 font-mono text-xs">
          No orders found matching search criteria.
        </div>
      `;
      return;
    }

    this.ordersList.innerHTML = filtered.map(o => {
      const cleanPhone = (o.phone || '').replace(/[^0-9]/g, '');
      const dateStr = o.created_at ? new Date(o.created_at).toLocaleDateString() : 'Recent';

      return `
        <div class="bg-[#0d1322] border border-[#1e293f] rounded-2xl p-6 hover:border-amber-500/40 transition-colors">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1e293f] pb-4 mb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono font-black text-amber-400 text-base">#${o.order_id}</span>
                <span class="text-xs font-mono text-slate-500">• ${dateStr}</span>
              </div>
              <div class="text-xs text-slate-300 font-medium mt-0.5">
                ${o.customer_name} • <span class="text-slate-400 font-mono">${o.email}</span> • <span class="text-slate-400 font-mono">${o.phone}</span>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-xl font-black font-mono text-emerald-400">$${(parseFloat(o.total_amount) || 0).toFixed(2)}</span>
              <select data-order-status="${o.order_id}" class="bg-[#080c14] border border-[#1e293f] rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-amber-400 focus:border-amber-500 outline-none">
                <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending Review</option>
                <option value="proof_approved" ${o.status === 'proof_approved' ? 'selected' : ''}>Proof Approved</option>
                <option value="production" ${o.status === 'production' ? 'selected' : ''}>In Tajima Production</option>
                <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Completed</option>
              </select>
            </div>
          </div>

          <!-- Items Breakdown -->
          <div class="space-y-2 mb-4">
            ${(o.items || []).map(item => `
              <div class="bg-[#080c14] p-3 rounded-xl border border-[#1e293f] flex items-center justify-between text-xs font-mono">
                <div>
                  <span class="font-bold text-white">${item.title}</span>
                  <span class="text-slate-400 ml-2">(${item.size} • ${item.backing.toUpperCase()})</span>
                </div>
                <div class="text-slate-300 font-bold">
                  ${item.quantity} pcs = <span class="text-amber-400">$${(parseFloat(item.total_price) || 0).toFixed(2)}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 pt-2">
            <div class="truncate max-w-md">
              Ship: <strong class="text-slate-300 font-normal">${o.shipping_address || 'Pending'}</strong>
            </div>

            <div class="flex items-center gap-2">
              <button data-print-work-order="${o.order_id}" class="px-3.5 py-1.5 bg-[#18223a] hover:bg-[#202d4d] text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <i data-lucide="printer" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Print Work Order</span>
              </button>
              <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${o.customer_name}! Your ApexPatches order #${o.order_id} is currently in: ${o.status.toUpperCase()}.`)}" target="_blank" class="px-3.5 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 rounded-lg border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    this.ordersList.querySelectorAll('[data-order-status]').forEach(sel => {
      sel.addEventListener('change', async (e) => {
        const orderId = sel.getAttribute('data-order-status');
        const newStatus = e.target.value;
        if (SupabaseManager.isConfigured()) {
          await SupabaseManager.updateOrderStatus(orderId, newStatus);
        } else {
          const ord = this.orders.find(o => o.order_id === orderId);
          if (ord) ord.status = newStatus;
          localStorage.setItem('apex_local_orders', JSON.stringify(this.orders));
        }
        this.toast(`Order #${orderId} set to "${newStatus}"`, 'success');
      });
    });

    this.ordersList.querySelectorAll('[data-print-work-order]').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.getAttribute('data-print-work-order');
        this.openWorkOrder(orderId);
      });
    });
  }

  openWorkOrder(orderId) {
    const o = this.orders.find(item => item.order_id === orderId);
    if (!o || !this.modalInvoice || !this.modalInvoiceContent) return;

    this.modalInvoiceContent.innerHTML = `
      <div class="text-left font-mono text-xs">
        <div class="flex justify-between items-start border-b border-slate-700 pb-4 mb-4">
          <div>
            <div class="text-2xl font-black text-white font-sans">APEX<span class="text-amber-500">PATCHES</span></div>
            <div class="text-slate-400 text-[11px]">Factory Production Work Order</div>
          </div>
          <div class="text-right">
            <div class="text-base font-black text-amber-400">#${o.order_id}</div>
            <div class="text-slate-400">${o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A'}</div>
          </div>
        </div>

        <div class="bg-[#080c14] p-4 rounded-xl border border-[#1e293f] mb-4">
          <div><strong>Customer:</strong> ${o.customer_name} (${o.phone})</div>
          <div><strong>Ship To:</strong> ${o.shipping_address}</div>
        </div>

        <table class="w-full text-left mb-6 border-collapse">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
              <th class="py-2">Item</th>
              <th class="py-2 text-center">Qty</th>
              <th class="py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            ${(o.items || []).map(i => `
              <tr>
                <td class="py-2">${i.title} (${i.size} • ${i.backing})</td>
                <td class="py-2 text-center">${i.quantity}</td>
                <td class="py-2 text-right">$${(parseFloat(i.total_price) || 0).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="text-right text-base font-bold text-white mb-6">
          Total: <span class="text-amber-400 font-mono">$${(parseFloat(o.total_amount) || 0).toFixed(2)}</span>
        </div>

        <div class="no-print flex gap-3">
          <button onclick="window.print()" class="flex-1 py-3 bg-amber-500 text-black font-extrabold text-xs rounded-xl">
            Print Work Order
          </button>
          <button onclick="window.ApexAdmin.closeWorkOrder()" class="py-3 px-6 bg-slate-800 text-white rounded-xl">
            Close
          </button>
        </div>
      </div>
    `;

    this.modalInvoice.classList.remove('hidden');
    this.modalInvoice.style.display = 'flex';
  }

  // ===========================================================================
  // EXPORTS
  // ===========================================================================
  exportPatchesCSV() {
    const headers = ['ID,Title,Category,Type,Price,Size,Border'];
    const rows = this.products.map(p => [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.type}"`,
      `"${p.startingPrice}"`,
      `"${p.size}"`,
      `"${p.border}"`
    ].join(','));

    this.downloadCSV('apex_patch_catalog.csv', [headers, ...rows].join('\n'));
    this.toast('Catalog CSV downloaded!', 'success');
  }

  exportOrdersCSV() {
    const headers = ['OrderID,Date,Customer,Email,Phone,Amount,Status'];
    const rows = this.orders.map(o => [
      `"${o.order_id}"`,
      `"${o.created_at || ''}"`,
      `"${(o.customer_name || '').replace(/"/g, '""')}"`,
      `"${o.email || ''}"`,
      `"${o.phone || ''}"`,
      o.total_amount,
      `"${o.status || ''}"`
    ].join(','));

    this.downloadCSV('apex_orders.csv', [headers, ...rows].join('\n'));
    this.toast('Orders CSV downloaded!', 'success');
  }

  downloadCSV(filename, content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-mono font-medium backdrop-blur-md transition-all duration-300';

    if (type === 'success') {
      toast.classList.add('bg-emerald-950/90', 'border-emerald-500/40', 'text-emerald-200');
      toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i><span>${msg}</span>`;
    } else if (type === 'warning') {
      toast.classList.add('bg-amber-950/90', 'border-amber-500/40', 'text-amber-200');
      toast.innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 shrink-0"></i><span>${msg}</span>`;
    } else {
      toast.classList.add('bg-[#121a2d]', 'border-[#1e293f]', 'text-slate-200');
      toast.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-sky-400 shrink-0"></i><span>${msg}</span>`;
    }

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ApexAdmin = new StoreAdminManager();
});
