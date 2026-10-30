/**
 * ApexPatches - E-Commerce Shopping Cart & Order Manager
 */

import { SupabaseManager } from './supabaseClient.js';

class PatchCart {
  constructor() {
    this.items = this.loadCart();
    this.discount = 0;
    this.couponCode = null;

    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.render();
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('apex_patches_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('apex_patches_cart', JSON.stringify(this.items));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }

  cacheDOMElements() {
    this.drawer = document.getElementById('cart-drawer');
    this.backdrop = document.getElementById('cart-backdrop');
    this.closeBtn = document.getElementById('cart-close-btn');
    this.openBtns = document.querySelectorAll('[data-open-cart]');
    this.cartBadges = document.querySelectorAll('[data-cart-badge]');
    
    this.cartItemsList = document.getElementById('cart-items-list');
    this.cartEmptyState = document.getElementById('cart-empty-state');
    this.cartSubtotalEl = document.getElementById('cart-subtotal');
    this.cartDiscountEl = document.getElementById('cart-discount');
    this.cartTotalEl = document.getElementById('cart-total');
    
    this.couponInput = document.getElementById('cart-coupon-input');
    this.applyCouponBtn = document.getElementById('cart-apply-coupon-btn');
    this.couponMessage = document.getElementById('cart-coupon-msg');
    
    this.checkoutBtn = document.getElementById('cart-checkout-btn');
    this.checkoutModal = document.getElementById('checkout-modal');
    this.checkoutForm = document.getElementById('checkout-form');
    this.checkoutCloseBtn = document.getElementById('checkout-close-btn');
    this.orderSuccessModal = document.getElementById('order-success-modal');
  }

  bindEvents() {
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', () => this.openCart());
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeCart());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.closeCart());
    }

    if (this.applyCouponBtn && this.couponInput) {
      this.applyCouponBtn.addEventListener('click', () => {
        this.applyCoupon(this.couponInput.value.trim().toUpperCase());
      });
    }

    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        if (this.items.length === 0) {
          if (window.ApexApp) window.ApexApp.toast('Your cart is empty!', 'warning');
          return;
        }
        this.closeCart();
        this.openCheckoutModal();
      });
    }

    if (this.checkoutCloseBtn && this.checkoutModal) {
      this.checkoutCloseBtn.addEventListener('click', () => {
        this.checkoutModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    if (this.checkoutForm) {
      this.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.processOrder();
      });
    }
  }

  openCart() {
    if (!this.drawer || !this.backdrop) return;
    this.drawer.classList.remove('translate-x-full');
    this.backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    if (!this.drawer || !this.backdrop) return;
    this.drawer.classList.add('translate-x-full');
    this.backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  addItem(item) {
    this.items.push(item);
    this.saveCart();
    this.render();
    this.openCart();

    if (window.ApexApp && window.ApexApp.toast) {
      window.ApexApp.toast(`Added "${item.title}" to cart!`, 'success');
    }
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.saveCart();
    this.render();
  }

  updateItemQty(index, newQty) {
    if (newQty < 10) newQty = 10;
    this.items[index].quantity = newQty;
    this.items[index].totalPrice = this.items[index].unitPrice * newQty;
    this.saveCart();
    this.render();
  }

  applyCoupon(code) {
    if (!this.couponMessage) return;

    if (code === 'WELCOME10') {
      this.discount = 0.10;
      this.couponCode = code;
      this.couponMessage.textContent = '✓ 10% discount applied!';
      this.couponMessage.className = 'text-xs text-emerald-400 mt-1';
    } else if (code === 'STITCH20') {
      this.discount = 20; // flat $20
      this.couponCode = code;
      this.couponMessage.textContent = '✓ $20 off applied!';
      this.couponMessage.className = 'text-xs text-emerald-400 mt-1';
    } else if (code === 'FREESHIP') {
      this.couponCode = code;
      this.couponMessage.textContent = '✓ Free Worldwide Express Shipping activated!';
      this.couponMessage.className = 'text-xs text-emerald-400 mt-1';
    } else {
      this.couponMessage.textContent = 'Invalid promo code. Try "WELCOME10".';
      this.couponMessage.className = 'text-xs text-rose-400 mt-1';
    }
    this.render();
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  calculateTotal() {
    const subtotal = this.getSubtotal();
    let discountAmount = 0;
    if (typeof this.discount === 'number' && this.discount < 1) {
      discountAmount = subtotal * this.discount;
    } else if (this.discount >= 1) {
      discountAmount = this.discount;
    }
    return Math.max(0, subtotal - discountAmount);
  }

  render() {
    const count = this.items.length;
    this.cartBadges.forEach(b => {
      b.textContent = count;
      b.classList.toggle('hidden', count === 0);
    });

    if (!this.cartItemsList || !this.cartEmptyState) return;

    if (count === 0) {
      this.cartItemsList.classList.add('hidden');
      this.cartEmptyState.classList.remove('hidden');
      if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = '$0.00';
      if (this.cartTotalEl) this.cartTotalEl.textContent = '$0.00';
      return;
    }

    this.cartItemsList.classList.remove('hidden');
    this.cartEmptyState.classList.add('hidden');

    this.cartItemsList.innerHTML = this.items.map((item, idx) => `
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative group">
        <button data-remove-cart="${idx}" class="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors p-1" title="Remove item">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>

        <div class="pr-6">
          <h4 class="text-sm font-bold text-white">${item.title}</h4>
          <p class="text-xs text-slate-400 mt-0.5">
            Size: ${item.size} • Backing: ${item.backing.toUpperCase()}
          </p>
          ${item.topText ? `<p class="text-[11px] font-mono text-amber-400/80">Text: "${item.topText}"</p>` : ''}
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">Qty:</span>
            <input 
              type="number" 
              min="10" 
              step="5" 
              value="${item.quantity}" 
              data-item-qty="${idx}" 
              class="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white text-center font-mono focus:border-amber-500 outline-none"
            />
          </div>
          <div class="text-right">
            <div class="text-xs font-mono text-slate-400">$${item.unitPrice.toFixed(2)}/ea</div>
            <div class="text-sm font-bold font-mono text-amber-400">$${item.totalPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    `).join('');

    const subtotal = this.getSubtotal();
    const total = this.calculateTotal();
    const discountAmt = subtotal - total;

    if (this.cartSubtotalEl) this.cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (this.cartDiscountEl) this.cartDiscountEl.textContent = `-$${discountAmt.toFixed(2)}`;
    if (this.cartTotalEl) this.cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Bind item buttons
    this.cartItemsList.querySelectorAll('[data-remove-cart]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-remove-cart'), 10);
        this.removeItem(idx);
      });
    });

    this.cartItemsList.querySelectorAll('[data-item-qty]').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(input.getAttribute('data-item-qty'), 10);
        this.updateItemQty(idx, parseInt(e.target.value, 10));
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  openCheckoutModal() {
    if (!this.checkoutModal) return;
    this.checkoutModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const checkoutTotal = document.getElementById('checkout-modal-total');
    if (checkoutTotal) {
      checkoutTotal.textContent = `$${this.calculateTotal().toFixed(2)}`;
    }
  }

  processOrder() {
    const name = document.getElementById('checkout-name')?.value || 'Valued Customer';
    const email = document.getElementById('checkout-email')?.value || '';
    const phone = document.getElementById('checkout-phone')?.value || '';
    const address = document.getElementById('checkout-address')?.value || '';
    const orderId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderDetails = {
      orderId,
      name,
      email,
      phone,
      address,
      items: [...this.items],
      total: this.calculateTotal(),
      date: new Date().toLocaleDateString()
    };

    // Close checkout
    if (this.checkoutModal) this.checkoutModal.classList.add('hidden');

    // Show order success modal
    this.showSuccessModal(orderDetails);

    // Sync to Supabase
    SupabaseManager.saveOrder(orderDetails).then(res => {
      const dbStatus = document.getElementById('order-db-status');
      if (!dbStatus) return;
      if (res.success) {
        dbStatus.innerHTML = '<span class="text-emerald-400 font-bold flex items-center justify-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5"></i> Order Synced to Supabase Database</span>';
      } else if (res.mode === 'local') {
        dbStatus.innerHTML = '<span class="text-slate-500 text-[11px]">Processed locally (Supabase not configured)</span>';
      } else {
        dbStatus.innerHTML = `<span class="text-rose-400 text-[11px]">Database notice: ${res.error}</span>`;
      }
      if (window.lucide) window.lucide.createIcons();
    });

    // Clear cart
    this.items = [];
    this.saveCart();
    this.render();
  }

  showSuccessModal(order) {
    if (!this.orderSuccessModal) return;

    const modalContent = document.getElementById('order-success-content');
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="text-center">
          <div class="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <i data-lucide="check-circle-2" class="w-8 h-8"></i>
          </div>
          <h3 class="text-2xl font-black text-white">Order Quote Confirmed!</h3>
          <p class="text-xs font-mono text-amber-400 mt-1 mb-2">Order ID: #${order.orderId}</p>
          <div id="order-db-status" class="text-xs font-mono mb-4 text-slate-400">
            <span class="animate-pulse">Syncing order to database...</span>
          </div>
          <p class="text-sm text-slate-300 mb-6">
            Thank you, <strong class="text-white">${order.name}</strong>! Our master digitizers have received your order specifications. We are generating your free photorealistic artwork proof right now.
          </p>

          <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 text-left text-xs font-mono text-slate-300 space-y-2 mb-6">
            <div class="flex justify-between border-b border-slate-800 pb-1.5">
              <span>Customer:</span>
              <span class="text-white font-bold">${order.name}</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-1.5">
              <span>Email:</span>
              <span class="text-white font-bold">${order.email}</span>
            </div>
            <div class="flex justify-between border-b border-slate-800 pb-1.5">
              <span>Estimated Delivery:</span>
              <span class="text-emerald-400 font-bold">6-8 Business Days</span>
            </div>
            <div class="flex justify-between pt-1">
              <span>Total Quoted Amount:</span>
              <span class="text-amber-400 font-bold text-sm">$${order.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <a 
              href="https://wa.me/923000000000?text=${encodeURIComponent(`Hi ApexPatches! I just submitted order #${order.orderId} for $${order.total.toFixed(2)}. Please send me my free digital proof.`)}" 
              target="_blank" 
              class="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <i data-lucide="message-circle" class="w-4 h-4"></i> Send Order to WhatsApp
            </a>
            <button id="success-close-btn" class="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700">
              Done
            </button>
          </div>
        </div>
      `;
    }

    this.orderSuccessModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();

    const doneBtn = document.getElementById('success-close-btn');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        this.orderSuccessModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ApexCart = new PatchCart();
});
