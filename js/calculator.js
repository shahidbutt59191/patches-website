/**
 * ApexPatches - Instant Dynamic Price Calculator
 */

class PatchCalculator {
  constructor() {
    this.state = {
      type: 'embroidered',
      width: 3.0,
      height: 3.0,
      coverage: 75,
      quantity: 100,
      backing: 'velcro',
      metallicThread: false,
      glowThread: false,
      rushService: false
    };

    this.init();
  }

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.calculate();
  }

  cacheDOMElements() {
    this.typeSelect = document.getElementById('calc-patch-type');
    this.widthSlider = document.getElementById('calc-width-slider');
    this.widthVal = document.getElementById('calc-width-val');
    this.heightSlider = document.getElementById('calc-height-slider');
    this.heightVal = document.getElementById('calc-height-val');
    this.sizeAvgDisplay = document.getElementById('calc-avg-size');
    this.qtySlider = document.getElementById('calc-qty-slider');
    this.qtyVal = document.getElementById('calc-qty-val');
    this.backingSelect = document.getElementById('calc-backing-select');
    
    this.coverageBtns = document.querySelectorAll('[data-calc-coverage]');
    this.optMetallic = document.getElementById('calc-opt-metallic');
    this.optGlow = document.getElementById('calc-opt-glow');
    this.optRush = document.getElementById('calc-opt-rush');

    // Outputs
    this.unitPriceOut = document.getElementById('calc-unit-price');
    this.totalPriceOut = document.getElementById('calc-total-price');
    this.savingsOut = document.getElementById('calc-savings-badge');
    this.deliveryDateOut = document.getElementById('calc-est-delivery');
    this.addCalcToCartBtn = document.getElementById('calc-btn-add-cart');
    this.requestProofBtn = document.getElementById('calc-btn-request-proof');
  }

  bindEvents() {
    if (this.typeSelect) {
      this.typeSelect.addEventListener('change', (e) => {
        this.state.type = e.target.value;
        this.calculate();
      });
    }

    if (this.widthSlider) {
      this.widthSlider.addEventListener('input', (e) => {
        this.state.width = parseFloat(e.target.value);
        if (this.widthVal) this.widthVal.textContent = `${this.state.width.toFixed(2)}"`;
        this.updateAverageSize();
        this.calculate();
      });
    }

    if (this.heightSlider) {
      this.heightSlider.addEventListener('input', (e) => {
        this.state.height = parseFloat(e.target.value);
        if (this.heightVal) this.heightVal.textContent = `${this.state.height.toFixed(2)}"`;
        this.updateAverageSize();
        this.calculate();
      });
    }

    if (this.qtySlider) {
      this.qtySlider.addEventListener('input', (e) => {
        this.state.quantity = parseInt(e.target.value, 10);
        if (this.qtyVal) this.qtyVal.textContent = `${this.state.quantity} pcs`;
        this.calculate();
      });
    }

    // Quick quantity pills
    document.querySelectorAll('[data-calc-qty-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qty = parseInt(btn.getAttribute('data-calc-qty-preset'), 10);
        this.state.quantity = qty;
        if (this.qtySlider) this.qtySlider.value = qty;
        if (this.qtyVal) this.qtyVal.textContent = `${qty} pcs`;
        document.querySelectorAll('[data-calc-qty-preset]').forEach(b => b.classList.remove('pill-active'));
        btn.classList.add('pill-active');
        this.calculate();
      });
    });

    // Coverage buttons
    this.coverageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.coverageBtns.forEach(b => b.classList.remove('pill-active'));
        btn.classList.add('pill-active');
        this.state.coverage = parseInt(btn.getAttribute('data-calc-coverage'), 10);
        this.calculate();
      });
    });

    if (this.backingSelect) {
      this.backingSelect.addEventListener('change', (e) => {
        this.state.backing = e.target.value;
        this.calculate();
      });
    }

    if (this.optMetallic) {
      this.optMetallic.addEventListener('change', (e) => {
        this.state.metallicThread = e.target.checked;
        this.calculate();
      });
    }

    if (this.optGlow) {
      this.optGlow.addEventListener('change', (e) => {
        this.state.glowThread = e.target.checked;
        this.calculate();
      });
    }

    if (this.optRush) {
      this.optRush.addEventListener('change', (e) => {
        this.state.rushService = e.target.checked;
        this.calculate();
      });
    }

    // Add to cart
    if (this.addCalcToCartBtn) {
      this.addCalcToCartBtn.addEventListener('click', () => {
        const quote = this.calculateQuote();
        const item = {
          id: `calc-${Date.now()}`,
          title: `Custom ${this.state.type.toUpperCase()} Bulk Order`,
          type: this.state.type,
          shape: 'custom-spec',
          size: `${this.state.width}" x ${this.state.height}" (${((this.state.width + this.state.height) / 2).toFixed(1)}" avg)`,
          backing: this.state.backing,
          quantity: this.state.quantity,
          unitPrice: quote.unitPrice,
          totalPrice: quote.totalPrice,
          coverage: `${this.state.coverage}%`,
          upgrades: [
            this.state.metallicThread ? 'Metallic Gold/Silver' : null,
            this.state.glowThread ? 'Glow In Dark' : null,
            this.state.rushService ? '3-Day Rush Production' : null
          ].filter(Boolean)
        };

        if (window.ApexCart) {
          window.ApexCart.addItem(item);
        }
      });
    }

    // Request Proof button: autofill and scroll to quote form
    if (this.requestProofBtn) {
      this.requestProofBtn.addEventListener('click', () => {
        const quoteSection = document.getElementById('quote-form-section');
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
          const typeInput = document.getElementById('quote-patch-type');
          const qtyInput = document.getElementById('quote-quantity');
          const sizeInput = document.getElementById('quote-size');
          const notesInput = document.getElementById('quote-notes');

          if (typeInput) typeInput.value = this.state.type;
          if (qtyInput) qtyInput.value = this.state.quantity;
          if (sizeInput) sizeInput.value = `${this.state.width}" x ${this.state.height}"`;
          if (notesInput) {
            notesInput.value = `Instant Quote Reference: Backing: ${this.state.backing}, Coverage: ${this.state.coverage}%, Metallic: ${this.state.metallicThread ? 'Yes' : 'No'}, Glow: ${this.state.glowThread ? 'Yes' : 'No'}, Rush: ${this.state.rushService ? 'Yes' : 'No'}.`;
          }

          if (window.ApexApp && window.ApexApp.toast) {
            window.ApexApp.toast('✨ Specs copied to Quote Form below!', 'success');
          }
        }
      });
    }
  }

  updateAverageSize() {
    const avg = (this.state.width + this.state.height) / 2;
    if (this.sizeAvgDisplay) {
      this.sizeAvgDisplay.textContent = `${avg.toFixed(2)}"`;
    }
  }

  calculateQuote() {
    const avgSize = (this.state.width + this.state.height) / 2;
    
    // Base unit matrix for 3.0" patch across quantities
    let baseRate = 3.60;
    const qty = this.state.quantity;

    if (qty < 25) baseRate = 8.50;
    else if (qty < 50) baseRate = 5.20;
    else if (qty < 100) baseRate = 3.40;
    else if (qty < 250) baseRate = 2.10;
    else if (qty < 500) baseRate = 1.45;
    else if (qty < 1000) baseRate = 1.05;
    else baseRate = 0.78;

    // Size multiplier
    const sizeFactor = Math.pow(avgSize / 3.0, 1.15);

    // Patch style multiplier
    let typeFactor = 1.0;
    if (this.state.type === 'pvc') typeFactor = 1.28;
    else if (this.state.type === 'leather') typeFactor = 1.20;
    else if (this.state.type === 'chenille') typeFactor = 1.35;
    else if (this.state.type === 'woven') typeFactor = 0.92;
    else if (this.state.type === 'printed') typeFactor = 1.12;

    // Coverage multiplier
    let coverageFactor = 1.0;
    if (this.state.coverage === 50) coverageFactor = 0.90;
    else if (this.state.coverage === 100) coverageFactor = 1.20;

    // Backing cost
    let backingFee = 0.0;
    if (this.state.backing === 'velcro') backingFee = 0.45;
    else if (this.state.backing === 'iron-on') backingFee = 0.25;
    else if (this.state.backing === 'peel-stick') backingFee = 0.35;
    else if (this.state.backing === 'magnetic') backingFee = 0.95;

    // Upgrades
    let upgradeFees = 0.0;
    if (this.state.metallicThread) upgradeFees += 0.20;
    if (this.state.glowThread) upgradeFees += 0.35;

    let unit = (baseRate * sizeFactor * typeFactor * coverageFactor) + backingFee + upgradeFees;
    if (this.state.rushService) unit *= 1.25;

    // Minimum boundary
    unit = Math.max(0.65, unit);

    const total = unit * qty;
    
    // Calculate estimated savings compared to small batch
    const smallBatchEquivalent = 8.50 * sizeFactor * typeFactor * coverageFactor;
    const savingsPercent = Math.max(0, Math.round(((smallBatchEquivalent - unit) / smallBatchEquivalent) * 100));

    return {
      unitPrice: unit,
      totalPrice: total,
      savingsPercent
    };
  }

  calculate() {
    const { unitPrice, totalPrice, savingsPercent } = this.calculateQuote();

    if (this.unitPriceOut) {
      this.unitPriceOut.textContent = `$${unitPrice.toFixed(2)}`;
    }
    if (this.totalPriceOut) {
      this.totalPriceOut.textContent = `$${totalPrice.toFixed(2)}`;
    }
    if (this.savingsOut) {
      this.savingsOut.textContent = `Save ${savingsPercent}% (Volume Tier)`;
    }

    if (this.deliveryDateOut) {
      const daysToAdd = this.state.rushService ? 4 : 8;
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + daysToAdd);
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      this.deliveryDateOut.textContent = targetDate.toLocaleDateString('en-US', options);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ApexCalculator = new PatchCalculator();
});
