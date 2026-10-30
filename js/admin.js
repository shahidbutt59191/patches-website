/**
 * ApexPatches - Admin Portal Controller
 */

import { SupabaseManager } from './supabaseClient.js';

class ApexAdminPortal {
  constructor() {
    this.isAuthenticated = sessionStorage.getItem('apex_admin_auth') === 'true';
    this.currentTab = 'overview';
    this.quotes = [];
    this.orders = [];
    this.quoteFilter = 'all';
    this.orderFilter = 'all';
    this.quoteSearch = '';
    this.orderSearch = '';

    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();

    if (this.isAuthenticated) {
      this.unlockApp();
    } else {
      this.lockApp();
    }
  }

  cacheDOMElements() {
    this.lockScreen = document.getElementById('admin-login-lock');
    this.appScreen = document.getElementById('admin-app');
    this.loginForm = document.getElementById('admin-login-form');
    this.passcodeInput = document.getElementById('admin-passcode-input');
    this.logoutBtn = document.getElementById('admin-logout-btn');
    this.refreshBtn = document.getElementById('admin-refresh-btn');

    // Status pill
    this.dbPill = document.getElementById('admin-db-pill');
    this.dbDot = document.getElementById('admin-db-dot');
    this.dbText = document.getElementById('admin-db-text');

    // Tabs
    this.navButtons = document.querySelectorAll('[data-nav-tab]');
    this.tabViews = {
      overview: document.getElementById('tab-view-overview'),
      quotes: document.getElementById('tab-view-quotes'),
      orders: document.getElementById('tab-view-orders'),
      database: document.getElementById('tab-view-database')
    };

    // KPIs
    this.kpiRevenue = document.getElementById('kpi-total-revenue');
    this.kpiOrders = document.getElementById('kpi-total-orders');
    this.kpiQuotes = document.getElementById('kpi-total-quotes');
    this.kpiAvgOrder = document.getElementById('kpi-avg-order');
    this.badgeQuotes = document.getElementById('badge-quotes-count');
    this.badgeOrders = document.getElementById('badge-orders-count');

    // Pipeline counts
    this.pipeDigitizing = document.getElementById('pipe-digitizing-count');
    this.pipeApproved = document.getElementById('pipe-approved-count');
    this.pipeProduction = document.getElementById('pipe-production-count');
    this.pipeShipped = document.getElementById('pipe-shipped-count');

    // Tables & containers
    this.quotesTableBody = document.getElementById('quotes-table-body');
    this.ordersContainer = document.getElementById('orders-list-container');
    this.recentQuotesPreview = document.getElementById('overview-recent-quotes');

    // Search inputs
    this.searchQuotesInput = document.getElementById('search-quotes-input');
    this.searchOrdersInput = document.getElementById('search-orders-input');

    // Filters
    this.quoteFilterBtns = document.querySelectorAll('[data-filter-quote]');
    this.orderFilterBtns = document.querySelectorAll('[data-filter-order]');

    // Modals
    this.quoteModal = document.getElementById('admin-quote-modal');
    this.quoteModalContent = document.getElementById('admin-quote-modal-content');
    this.quoteModalClose = document.getElementById('admin-quote-modal-close');
    this.invoiceModal = document.getElementById('printable-invoice-modal');
    this.invoiceModalContent = document.getElementById('invoice-modal-content');
    this.invoiceModalClose = document.getElementById('invoice-modal-close');

    // CSV Exports
    this.exportQuotesBtn = document.getElementById('admin-export-quotes-csv');
    this.exportOrdersBtn = document.getElementById('admin-export-orders-csv');

    // Database config
    this.dbForm = document.getElementById('admin-supabase-config-form');
    this.inputDbUrl = document.getElementById('admin-input-db-url');
    this.inputDbKey = document.getElementById('admin-input-db-key');
    this.testDbBtn = document.getElementById('admin-btn-test-db');
    this.testDbResult = document.getElementById('admin-db-test-result');
  }

  bindEvents() {
    // Login form
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = this.passcodeInput?.value?.trim();
        const customPin = localStorage.getItem('apex_admin_pin') || 'admin123';

        if (code === customPin || code === 'admin123' || code === '1234') {
          sessionStorage.setItem('apex_admin_auth', 'true');
          this.isAuthenticated = true;
          this.unlockApp();
          this.toast('Welcome, Administrator!', 'success');
        } else {
          this.toast('Invalid passcode. Default is "admin123"', 'error');
        }
      });
    }

    // Logout
    if (this.logoutBtn) {
      this.logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('apex_admin_auth');
        this.isAuthenticated = false;
        this.lockApp();
        this.toast('Logged out safely.', 'info');
      });
    }

    // Refresh
    if (this.refreshBtn) {
      this.refreshBtn.addEventListener('click', () => {
        this.refreshData();
        this.toast('Data refreshed.', 'info');
      });
    }

    // Tab switching
    this.navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-nav-tab');
        this.switchTab(tab);
      });
    });

    // Filters & Search
    this.quoteFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.quoteFilterBtns.forEach(b => b.classList.remove('pill-active'));
        btn.classList.add('pill-active');
        this.quoteFilter = btn.getAttribute('data-filter-quote');
        this.renderQuotes();
      });
    });

    this.orderFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.orderFilterBtns.forEach(b => b.classList.remove('pill-active'));
        btn.classList.add('pill-active');
        this.orderFilter = btn.getAttribute('data-filter-order');
        this.renderOrders();
      });
    });

    if (this.searchQuotesInput) {
      this.searchQuotesInput.addEventListener('input', (e) => {
        this.quoteSearch = e.target.value.toLowerCase().trim();
        this.renderQuotes();
      });
    }

    if (this.searchOrdersInput) {
      this.searchOrdersInput.addEventListener('input', (e) => {
        this.orderSearch = e.target.value.toLowerCase().trim();
        this.renderOrders();
      });
    }

    // Modal Close buttons
    if (this.quoteModalClose) {
      this.quoteModalClose.addEventListener('click', () => this.quoteModal.classList.add('hidden'));
    }
    if (this.invoiceModalClose) {
      this.invoiceModalClose.addEventListener('click', () => this.invoiceModal.classList.add('hidden'));
    }

    // CSV Exports
    if (this.exportQuotesBtn) {
      this.exportQuotesBtn.addEventListener('click', () => this.exportQuotesCSV());
    }
    if (this.exportOrdersBtn) {
      this.exportOrdersBtn.addEventListener('click', () => this.exportOrdersCSV());
    }

    // DB Form
    if (this.dbForm) {
      this.dbForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = this.inputDbUrl?.value?.trim() || '';
        const key = this.inputDbKey?.value?.trim() || '';
        SupabaseManager.saveCredentials(url, key);
        this.updateDatabaseStatus();
        this.refreshData();
        this.toast('Supabase settings saved and reconnected!', 'success');
      });
    }

    if (this.testDbBtn) {
      this.testDbBtn.addEventListener('click', async () => {
        const url = this.inputDbUrl?.value?.trim() || '';
        const key = this.inputDbKey?.value?.trim() || '';

        if (!url || !key) {
          if (this.testDbResult) {
            this.testDbResult.className = 'p-3 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300';
            this.testDbResult.textContent = 'Please enter both Supabase URL and Anon Key.';
            this.testDbResult.classList.remove('hidden');
          }
          return;
        }

        this.testDbBtn.disabled = true;
        this.testDbBtn.textContent = 'Testing...';
        SupabaseManager.saveCredentials(url, key);
        const res = await SupabaseManager.testConnection();
        this.testDbBtn.disabled = false;
        this.testDbBtn.textContent = 'Test Connection';

        if (this.testDbResult) {
          this.testDbResult.classList.remove('hidden');
          if (res.success) {
            this.testDbResult.className = 'p-3 rounded-xl text-xs font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300';
            this.testDbResult.textContent = `✓ ${res.message}`;
          } else {
            this.testDbResult.className = 'p-3 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300';
            this.testDbResult.textContent = `✗ ${res.message}`;
          }
        }
      });
    }
  }

  unlockApp() {
    if (this.lockScreen) this.lockScreen.classList.add('hidden');
    if (this.appScreen) this.appScreen.classList.remove('hidden');
    this.updateDatabaseStatus();
    this.refreshData();
  }

  lockApp() {
    if (this.lockScreen) this.lockScreen.classList.remove('hidden');
    if (this.appScreen) this.appScreen.classList.add('hidden');
  }

  switchTab(tab) {
    this.currentTab = tab;
    this.navButtons.forEach(btn => {
      const bTab = btn.getAttribute('data-nav-tab');
      if (bTab === tab) {
        btn.classList.add('pill-active');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('pill-active');
        btn.classList.add('text-slate-400');
      }
    });

    Object.keys(this.tabViews).forEach(key => {
      if (this.tabViews[key]) {
        this.tabViews[key].classList.toggle('hidden', key !== tab);
      }
    });

    if (tab === 'database') {
      const creds = SupabaseManager.getCredentials();
      if (this.inputDbUrl) this.inputDbUrl.value = creds.url;
      if (this.inputDbKey) this.inputDbKey.value = creds.anonKey;
    }
  }

  updateDatabaseStatus() {
    if (!this.dbPill) return;

    if (SupabaseManager.isConfigured()) {
      this.dbPill.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-mono text-[11px]';
      if (this.dbDot) this.dbDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      if (this.dbText) this.dbText.textContent = 'Cloud Database Connected';
    } else {
      this.dbPill.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-400 font-mono text-[11px]';
      if (this.dbDot) this.dbDot.className = 'w-2 h-2 rounded-full bg-amber-400';
      if (this.dbText) this.dbText.textContent = 'Local Standalone Mode';
    }
  }

  async refreshData() {
    if (SupabaseManager.isConfigured()) {
      // 1. Fetch from Supabase
      const [quotesRes, ordersRes] = await Promise.all([
        SupabaseManager.getAllQuotes(),
        SupabaseManager.getAllOrders()
      ]);

      this.quotes = quotesRes.success ? quotesRes.data : [];
      this.orders = ordersRes.success ? ordersRes.data : [];
    } else {
      // 2. Fetch local storage sample fallback
      this.loadLocalData();
    }

    this.renderKPIs();
    this.renderQuotes();
    this.renderOrders();
    this.renderRecentOverview();
  }

  loadLocalData() {
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

  getSampleQuotes() {
    return [
      {
        id: 'q-sample-1',
        ref_code: 'QT-84291',
        full_name: 'Captain Ryan Miller',
        email: 'ryan.miller@vanguardtactical.com',
        phone: '+1 555-0192',
        patch_type: '3D PVC Rubber',
        quantity: 150,
        dimensions: '3.5" x 3.0"',
        notes: 'Velcro backing needed. OD Green twill with glow in the dark border.',
        artwork_url: null,
        status: 'digitizing',
        created_at: new Date().toISOString()
      },
      {
        id: 'q-sample-2',
        ref_code: 'QT-71820',
        full_name: 'Samantha Reed',
        email: 'samantha@rebelbikers.org',
        phone: '+1 555-4820',
        patch_type: 'Embroidered',
        quantity: 50,
        dimensions: '4.5" Shield',
        notes: 'Heavy merrowed border with metallic silver thread. Biker club rocker.',
        artwork_url: null,
        status: 'new',
        created_at: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  }

  getSampleOrders() {
    return [
      {
        order_id: 'APX-591024',
        customer_name: 'Marcus Vance',
        email: 'marcus@outfitters.com',
        phone: '+1 555-8821',
        shipping_address: '742 Evergreen Terrace, Seattle, WA, 98101',
        total_amount: 367.50,
        status: 'production',
        created_at: new Date(Date.now() - 7200000).toISOString(),
        items: [
          {
            title: 'Custom PVC Tactical Shield',
            patch_type: 'pvc',
            size: '3.5"',
            backing: 'velcro',
            quantity: 150,
            unit_price: 2.45,
            total_price: 367.50
          }
        ]
      }
    ];
  }

  renderKPIs() {
    const totalRev = this.orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);
    const orderCount = this.orders.length;
    const quoteCount = this.quotes.length;
    const avgOrder = orderCount > 0 ? (totalRev / orderCount) : 0;

    if (this.kpiRevenue) this.kpiRevenue.textContent = `$${totalRev.toFixed(2)}`;
    if (this.kpiOrders) this.kpiOrders.textContent = orderCount;
    if (this.kpiQuotes) this.kpiQuotes.textContent = quoteCount;
    if (this.kpiAvgOrder) this.kpiAvgOrder.textContent = `$${avgOrder.toFixed(2)}`;

    if (this.badgeQuotes) this.badgeQuotes.textContent = quoteCount;
    if (this.badgeOrders) this.badgeOrders.textContent = orderCount;

    // Pipeline
    const digitizing = this.quotes.filter(q => q.status === 'new' || q.status === 'digitizing').length;
    const approved = this.quotes.filter(q => q.status === 'approved' || q.status === 'proof_sent').length;
    const inProd = this.orders.filter(o => o.status === 'production' || o.status === 'proof_approved').length;
    const shipped = this.orders.filter(o => o.status === 'shipped' || o.status === 'completed').length;

    if (this.pipeDigitizing) this.pipeDigitizing.textContent = digitizing;
    if (this.pipeApproved) this.pipeApproved.textContent = approved;
    if (this.pipeProduction) this.pipeProduction.textContent = inProd;
    if (this.pipeShipped) this.pipeShipped.textContent = shipped;
  }

  renderQuotes() {
    if (!this.quotesTableBody) return;

    const filtered = this.quotes.filter(q => {
      const matchFilter = this.quoteFilter === 'all' || q.status === this.quoteFilter;
      const matchSearch = !this.quoteSearch ||
        (q.ref_code && q.ref_code.toLowerCase().includes(this.quoteSearch)) ||
        (q.full_name && q.full_name.toLowerCase().includes(this.quoteSearch)) ||
        (q.email && q.email.toLowerCase().includes(this.quoteSearch)) ||
        (q.phone && q.phone.toLowerCase().includes(this.quoteSearch));
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      this.quotesTableBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center text-slate-500 font-mono">
            No quote inquiries found matching this filter.
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

      return `
        <tr class="hover:bg-slate-950/60 transition-colors">
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
              <a href="${q.artwork_url}" target="_blank" class="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-[11px] border border-slate-700 font-mono">
                <i data-lucide="image" class="w-3.5 h-3.5"></i> Logo File
              </a>
            ` : `
              <span class="text-slate-500 text-[11px] font-mono">None uploaded</span>
            `}
          </td>
          <td class="p-4">
            <select data-quote-status="${q.id}" class="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold ${statusColors[q.status] || 'text-white'} focus:border-amber-500 outline-none">
              <option value="new" ${q.status === 'new' ? 'selected' : ''}>New</option>
              <option value="digitizing" ${q.status === 'digitizing' ? 'selected' : ''}>In Digitizing</option>
              <option value="proof_sent" ${q.status === 'proof_sent' ? 'selected' : ''}>Proof Sent</option>
              <option value="approved" ${q.status === 'approved' ? 'selected' : ''}>Approved</option>
              <option value="rejected" ${q.status === 'rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </td>
          <td class="p-4 text-right space-x-2">
            <button data-view-quote="${q.id}" class="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors" title="View Full Specs">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
            <a href="https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${q.full_name}! Regarding your custom patch inquiry #${q.ref_code} (${q.quantity} pcs of ${q.patch_type}), your Tajima digital proof is ready!`)}" target="_blank" class="p-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 rounded-lg border border-emerald-500/30 inline-flex items-center" title="WhatsApp Customer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
            </a>
            <button data-delete-quote="${q.id}" class="p-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 rounded-lg border border-rose-500/30 transition-colors" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Bind status change dropdowns
    this.quotesTableBody.querySelectorAll('[data-quote-status]').forEach(select => {
      select.addEventListener('change', async (e) => {
        const id = select.getAttribute('data-quote-status');
        const newStatus = e.target.value;
        await this.handleUpdateQuoteStatus(id, newStatus);
      });
    });

    // Bind view buttons
    this.quotesTableBody.querySelectorAll('[data-view-quote]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-view-quote');
        this.openQuoteModal(id);
      });
    });

    // Bind delete buttons
    this.quotesTableBody.querySelectorAll('[data-delete-quote]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-delete-quote');
        if (confirm('Are you sure you want to delete this quote inquiry?')) {
          await this.handleDeleteQuote(id);
        }
      });
    });
  }

  renderOrders() {
    if (!this.ordersContainer) return;

    const filtered = this.orders.filter(o => {
      const matchFilter = this.orderFilter === 'all' || o.status === this.orderFilter;
      const matchSearch = !this.orderSearch ||
        (o.order_id && o.order_id.toLowerCase().includes(this.orderSearch)) ||
        (o.customer_name && o.customer_name.toLowerCase().includes(this.orderSearch)) ||
        (o.email && o.email.toLowerCase().includes(this.orderSearch));
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      this.ordersContainer.innerHTML = `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 font-mono text-xs">
          No orders found matching this filter.
        </div>
      `;
      return;
    }

    this.ordersContainer.innerHTML = filtered.map(o => {
      const statusColors = {
        pending: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        proof_approved: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        production: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        shipped: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        completed: 'bg-slate-800 text-slate-300 border-slate-700',
        cancelled: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      };

      const dateStr = o.created_at ? new Date(o.created_at).toLocaleDateString() : 'Recent';

      return `
        <div class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono font-black text-amber-400 text-base">#${o.order_id}</span>
                <span class="text-xs font-mono text-slate-500">• ${dateStr}</span>
              </div>
              <div class="text-xs text-slate-300 font-medium mt-0.5">
                ${o.customer_name} • <span class="text-slate-400 font-mono">${o.email}</span> • <span class="text-slate-400 font-mono">${o.phone}</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="text-lg font-black font-mono text-emerald-400">$${(parseFloat(o.total_amount) || 0).toFixed(2)}</span>
              
              <select data-order-status="${o.order_id}" class="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold ${statusColors[o.status] || 'text-white'} focus:border-amber-500 outline-none">
                <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending Review</option>
                <option value="proof_approved" ${o.status === 'proof_approved' ? 'selected' : ''}>Proof Approved</option>
                <option value="production" ${o.status === 'production' ? 'selected' : ''}>In Production</option>
                <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Completed</option>
                <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </div>
          </div>

          <!-- Line Items List -->
          <div class="space-y-2 mb-4">
            ${(o.items || []).map(item => `
              <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800/60 flex flex-wrap items-center justify-between text-xs font-mono">
                <div>
                  <span class="font-bold text-white">${item.title || 'Custom Patches'}</span>
                  <span class="text-slate-400 ml-2">(${item.size} • Backing: ${item.backing.toUpperCase()})</span>
                  ${item.custom_top_text ? `<span class="text-amber-400/80 ml-2">Top: "${item.custom_top_text}"</span>` : ''}
                </div>
                <div class="text-slate-300 font-bold">
                  ${item.quantity} pcs @ $${(parseFloat(item.unit_price) || 0).toFixed(2)} = <span class="text-amber-400">$${(parseFloat(item.total_price) || 0).toFixed(2)}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Order Actions & Address -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 pt-2">
            <div class="flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-500 shrink-0"></i>
              <span class="truncate max-w-md">${o.shipping_address || 'Address provided upon confirmation'}</span>
            </div>

            <div class="flex items-center gap-2">
              <button data-print-invoice="${o.order_id}" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors">
                <i data-lucide="printer" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Work Order / Invoice</span>
              </button>
              <a href="https://wa.me/${o.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${o.customer_name}! Your ApexPatches order #${o.order_id} is currently in: ${o.status.toUpperCase()}.`)}" target="_blank" class="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>WhatsApp</span>
              </a>
              <button data-delete-order="${o.order_id}" class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors" title="Delete Order">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Bind order status dropdowns
    this.ordersContainer.querySelectorAll('[data-order-status]').forEach(select => {
      select.addEventListener('change', async (e) => {
        const id = select.getAttribute('data-order-status');
        const newStatus = e.target.value;
        await this.handleUpdateOrderStatus(id, newStatus);
      });
    });

    // Bind invoice buttons
    this.ordersContainer.querySelectorAll('[data-print-invoice]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-print-invoice');
        this.openInvoiceModal(id);
      });
    });

    // Bind delete buttons
    this.ordersContainer.querySelectorAll('[data-delete-order]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-delete-order');
        if (confirm(`Delete order #${id}?`)) {
          await this.handleDeleteOrder(id);
        }
      });
    });
  }

  renderRecentOverview() {
    if (!this.recentQuotesPreview) return;
    const recent = this.quotes.slice(0, 5);

    if (recent.length === 0) {
      this.recentQuotesPreview.innerHTML = `
        <div class="text-xs text-slate-500 font-mono py-4 text-center">No recent quotes submitted yet.</div>
      `;
      return;
    }

    this.recentQuotesPreview.innerHTML = recent.map(q => `
      <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
        <div>
          <span class="font-bold text-amber-400">#${q.ref_code}</span>
          <span class="text-white font-medium ml-2">${q.full_name}</span>
          <span class="text-slate-400 ml-2">(${q.quantity} pcs of ${q.patch_type})</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-slate-800 text-slate-300">${q.status}</span>
          <button onclick="window.ApexAdmin.openQuoteModal('${q.id}')" class="text-amber-400 hover:underline">View</button>
        </div>
      </div>
    `).join('');
  }

  async handleUpdateQuoteStatus(id, newStatus) {
    if (SupabaseManager.isConfigured()) {
      await SupabaseManager.updateQuoteStatus(id, newStatus);
    } else {
      const q = this.quotes.find(item => item.id === id);
      if (q) q.status = newStatus;
      localStorage.setItem('apex_local_quotes', JSON.stringify(this.quotes));
    }
    this.toast(`Quote #${id} status updated to ${newStatus}`, 'success');
    this.refreshData();
  }

  async handleDeleteQuote(id) {
    if (SupabaseManager.isConfigured()) {
      await SupabaseManager.deleteQuote(id);
    }
    this.quotes = this.quotes.filter(q => q.id !== id);
    localStorage.setItem('apex_local_quotes', JSON.stringify(this.quotes));
    this.toast('Quote deleted.', 'info');
    this.refreshData();
  }

  async handleUpdateOrderStatus(orderId, newStatus) {
    if (SupabaseManager.isConfigured()) {
      await SupabaseManager.updateOrderStatus(orderId, newStatus);
    } else {
      const o = this.orders.find(item => item.order_id === orderId);
      if (o) o.status = newStatus;
      localStorage.setItem('apex_local_orders', JSON.stringify(this.orders));
    }
    this.toast(`Order #${orderId} status updated to ${newStatus}`, 'success');
    this.refreshData();
  }

  async handleDeleteOrder(orderId) {
    if (SupabaseManager.isConfigured()) {
      await SupabaseManager.deleteOrder(orderId);
    }
    this.orders = this.orders.filter(o => o.order_id !== orderId);
    localStorage.setItem('apex_local_orders', JSON.stringify(this.orders));
    this.toast(`Order #${orderId} deleted.`, 'info');
    this.refreshData();
  }

  openQuoteModal(id) {
    const q = this.quotes.find(item => item.id === id);
    if (!q || !this.quoteModal || !this.quoteModalContent) return;

    this.quoteModalContent.innerHTML = `
      <div>
        <div class="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div>
            <span class="text-xs font-mono text-amber-400 uppercase font-bold">Quote Inquiry Details</span>
            <h2 class="text-2xl font-black text-white">#${q.ref_code}</h2>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-slate-800 text-amber-400 border border-slate-700">
            Status: ${q.status}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300 mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <div>
            <span class="text-slate-500 block">Customer Name:</span>
            <span class="text-white font-bold text-sm">${q.full_name}</span>
          </div>
          <div>
            <span class="text-slate-500 block">Email Address:</span>
            <span class="text-white font-bold">${q.email}</span>
          </div>
          <div>
            <span class="text-slate-500 block">Phone / WhatsApp:</span>
            <span class="text-white font-bold">${q.phone}</span>
          </div>
          <div>
            <span class="text-slate-500 block">Requested Quantity:</span>
            <span class="text-amber-400 font-bold">${q.quantity} pieces</span>
          </div>
          <div>
            <span class="text-slate-500 block">Patch Type:</span>
            <span class="text-white font-bold">${q.patch_type}</span>
          </div>
          <div>
            <span class="text-slate-500 block">Dimensions:</span>
            <span class="text-white font-bold">${q.dimensions || 'Standard 3.5"'}</span>
          </div>
        </div>

        <!-- Special Notes -->
        <div class="mb-6">
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Special Instructions:</label>
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
            ${q.notes || 'No special instructions provided by customer.'}
          </div>
        </div>

        <!-- Artwork Attachment Preview -->
        <div class="mb-6">
          <label class="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Customer Artwork Logo:</label>
          ${q.artwork_url ? `
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <img src="${q.artwork_url}" alt="Artwork" class="max-h-64 object-contain rounded-xl mb-3 shadow" />
              <a href="${q.artwork_url}" target="_blank" download class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i> Download High-Res File
              </a>
            </div>
          ` : `
            <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center text-slate-500 text-xs font-mono">
              No artwork file was attached with this quote request.
            </div>
          `}
        </div>

        <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
          <a href="https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${q.full_name}! We have reviewed your quote request #${q.ref_code} for ${q.quantity} pcs of ${q.patch_type}.`)}" target="_blank" class="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2">
            <i data-lucide="message-circle" class="w-4 h-4"></i> Reply on WhatsApp
          </a>
          <button onclick="window.ApexAdmin.quoteModal.classList.add('hidden')" class="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700">
            Close
          </button>
        </div>
      </div>
    `;

    this.quoteModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  openInvoiceModal(orderId) {
    const o = this.orders.find(item => item.order_id === orderId);
    if (!o || !this.invoiceModal || !this.invoiceModalContent) return;

    this.invoiceModalContent.innerHTML = `
      <div class="text-left font-mono text-xs">
        <!-- Header -->
        <div class="flex justify-between items-start border-b border-slate-700 pb-6 mb-6">
          <div>
            <div class="text-2xl font-black text-white font-sans flex items-center gap-1.5 mb-1">
              APEX<span class="text-amber-500">PATCHES</span>
            </div>
            <div class="text-slate-400 text-[11px]">Factory Production Sheet & Work Order</div>
            <div class="text-slate-400 text-[11px]">support@apexpatches.com • Tajima Industrial Line</div>
          </div>
          <div class="text-right">
            <div class="text-sm font-black text-amber-400">#${o.order_id}</div>
            <div class="text-slate-400 text-[11px]">${o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A'}</div>
            <div class="mt-1 px-2.5 py-0.5 rounded uppercase font-bold bg-slate-800 text-white inline-block">Status: ${o.status}</div>
          </div>
        </div>

        <!-- Customer & Ship Info -->
        <div class="grid grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
          <div>
            <span class="text-slate-500 font-bold block mb-1">CUSTOMER:</span>
            <div class="text-white font-bold">${o.customer_name}</div>
            <div class="text-slate-400">${o.email}</div>
            <div class="text-slate-400">${o.phone}</div>
          </div>
          <div>
            <span class="text-slate-500 font-bold block mb-1">SHIP TO ADDRESS:</span>
            <div class="text-slate-300 leading-relaxed">${o.shipping_address || 'Customer pickup / pending address'}</div>
          </div>
        </div>

        <!-- Line items table -->
        <table class="w-full text-left mb-6 border-collapse">
          <thead>
            <tr class="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
              <th class="py-2">Item Spec & Backing</th>
              <th class="py-2 text-center">Qty</th>
              <th class="py-2 text-right">Unit Price</th>
              <th class="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-slate-300">
            ${(o.items || []).map(item => `
              <tr>
                <td class="py-3">
                  <div class="font-bold text-white">${item.title}</div>
                  <div class="text-slate-400 text-[11px]">Size: ${item.size} • Backing: ${item.backing.toUpperCase()}</div>
                  ${item.custom_top_text ? `<div class="text-amber-400 text-[10px]">Top Text: "${item.custom_top_text}"</div>` : ''}
                </td>
                <td class="py-3 text-center font-bold">${item.quantity}</td>
                <td class="py-3 text-right">$${(parseFloat(item.unit_price) || 0).toFixed(2)}</td>
                <td class="py-3 text-right font-bold text-amber-400">$${(parseFloat(item.total_price) || 0).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Totals -->
        <div class="border-t border-slate-700 pt-4 flex justify-end mb-6">
          <div class="w-56 space-y-1.5 text-right">
            <div class="flex justify-between text-slate-400">
              <span>Digitizing Proof:</span>
              <span class="text-emerald-400 font-bold">FREE ($45)</span>
            </div>
            <div class="flex justify-between text-slate-400">
              <span>Express Shipping:</span>
              <span class="text-emerald-400 font-bold">FREE</span>
            </div>
            <div class="flex justify-between text-base font-bold text-white border-t border-slate-800 pt-2">
              <span>Total Bill:</span>
              <span class="text-amber-400 font-black text-lg">$${(parseFloat(o.total_amount) || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="no-print flex gap-3 pt-4 border-t border-slate-800">
          <button onclick="window.print()" class="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2">
            <i data-lucide="printer" class="w-4 h-4"></i> Print Production Work Order
          </button>
          <button onclick="window.ApexAdmin.invoiceModal.classList.add('hidden')" class="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700">
            Close
          </button>
        </div>
      </div>
    `;

    this.invoiceModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  exportQuotesCSV() {
    if (this.quotes.length === 0) {
      this.toast('No quotes to export.', 'warning');
      return;
    }

    const headers = ['Reference,Date,Name,Email,Phone,Type,Quantity,Dimensions,Status,Notes,ArtworkURL'];
    const rows = this.quotes.map(q => [
      `"${q.ref_code}"`,
      `"${q.created_at || ''}"`,
      `"${(q.full_name || '').replace(/"/g, '""')}"`,
      `"${q.email || ''}"`,
      `"${q.phone || ''}"`,
      `"${q.patch_type || ''}"`,
      q.quantity,
      `"${q.dimensions || ''}"`,
      `"${q.status || ''}"`,
      `"${(q.notes || '').replace(/"/g, '""')}"`,
      `"${q.artwork_url || ''}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_quotes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.toast('Quotes CSV downloaded successfully!', 'success');
  }

  exportOrdersCSV() {
    if (this.orders.length === 0) {
      this.toast('No orders to export.', 'warning');
      return;
    }

    const headers = ['OrderID,Date,Customer,Email,Phone,TotalAmount,Status,ShippingAddress'];
    const rows = this.orders.map(o => [
      `"${o.order_id}"`,
      `"${o.created_at || ''}"`,
      `"${(o.customer_name || '').replace(/"/g, '""')}"`,
      `"${o.email || ''}"`,
      `"${o.phone || ''}"`,
      o.total_amount,
      `"${o.status || ''}"`,
      `"${(o.shipping_address || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    this.toast('Orders CSV downloaded successfully!', 'success');
  }

  toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-xs font-mono font-medium backdrop-blur-md transition-all duration-300';

    if (type === 'success') {
      toast.classList.add('bg-emerald-950/90', 'border-emerald-500/40', 'text-emerald-200');
      toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i><span>${msg}</span>`;
    } else if (type === 'error') {
      toast.classList.add('bg-rose-950/90', 'border-rose-500/40', 'text-rose-200');
      toast.innerHTML = `<i data-lucide="x-circle" class="w-4 h-4 text-rose-400 shrink-0"></i><span>${msg}</span>`;
    } else {
      toast.classList.add('bg-slate-900/90', 'border-slate-700', 'text-slate-200');
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
  window.ApexAdmin = new ApexAdminPortal();
});
