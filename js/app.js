/**
 * ApexPatches - Main Application Engine
 */

import { PATCH_TYPES, BACKINGS, BORDER_TYPES, TESTIMONIALS, FAQS, getSiteSettings } from './data.js';
import { SupabaseManager } from './supabaseClient.js';

class ApexApp {
  constructor() {
    this.init();
  }

  init() {
    this.applySiteSettings();
    this.renderDynamicSections();
    this.setupNavigation();
    this.setupFAQ();
    this.setupQuoteForm();
    this.setupHeroPatchInteractions();
    this.setupScrollEffects();
    this.setupSupabaseModal();
  }

  applySiteSettings() {
    const s = getSiteSettings();
    // Update WhatsApp links
    if (s.whatsappRaw) {
      document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const url = new URL(link.href);
        const text = url.searchParams.get('text') || '';
        link.href = `https://wa.me/${s.whatsappRaw}${text ? '?text=' + encodeURIComponent(text) : ''}`;
      });
    }
  }

  // Toast System
  toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium backdrop-blur-md transition-all duration-300';

    if (type === 'success') {
      toast.classList.add('bg-emerald-950/90', 'border-emerald-500/40', 'text-emerald-200');
      toast.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0"></i><span>${message}</span>`;
    } else if (type === 'warning') {
      toast.classList.add('bg-amber-950/90', 'border-amber-500/40', 'text-amber-200');
      toast.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400 shrink-0"></i><span>${message}</span>`;
    } else if (type === 'error') {
      toast.classList.add('bg-rose-950/90', 'border-rose-500/40', 'text-rose-200');
      toast.innerHTML = `<i data-lucide="x-circle" class="w-5 h-5 text-rose-400 shrink-0"></i><span>${message}</span>`;
    } else {
      toast.classList.add('bg-slate-900/90', 'border-slate-700', 'text-slate-200');
      toast.innerHTML = `<i data-lucide="info" class="w-5 h-5 text-sky-400 shrink-0"></i><span>${message}</span>`;
    }

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger enter animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Remove after 4s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  renderDynamicSections() {
    // 1. Render Patch Types
    const patchTypesGrid = document.getElementById('patch-types-grid');
    if (patchTypesGrid) {
      patchTypesGrid.innerHTML = PATCH_TYPES.map(pt => `
        <div class="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ${pt.badge}
              </span>
              <span class="text-xs font-mono text-slate-400">
                From <strong class="text-white font-bold">${pt.startingPrice}</strong>/ea
              </span>
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
              ${pt.name}
            </h3>
            <p class="text-amber-400/90 text-xs font-medium mb-3">
              ${pt.tagline}
            </p>
            <p class="text-slate-400 text-xs mb-4 leading-relaxed">
              ${pt.description}
            </p>
            
            <div class="space-y-1.5 mb-5">
              ${pt.features.map(f => `
                <div class="flex items-center text-xs text-slate-300 gap-2">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-amber-400 shrink-0"></i>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div class="text-slate-400">
              Turnaround: <span class="text-white font-medium">${pt.leadTime}</span>
            </div>
            <button 
              data-select-type="${pt.id}"
              class="px-3.5 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-black text-amber-400 font-bold rounded-lg border border-slate-700 hover:border-amber-400 transition-all text-xs"
            >
              Customize →
            </button>
          </div>
        </div>
      `).join('');

      // Add click handler to "Customize" buttons
      patchTypesGrid.querySelectorAll('[data-select-type]').forEach(btn => {
        btn.addEventListener('click', () => {
          const typeId = btn.getAttribute('data-select-type');
          const customizerSection = document.getElementById('customizer-section');
          if (customizerSection) customizerSection.scrollIntoView({ behavior: 'smooth' });
          if (window.ApexCustomizer) {
            window.ApexCustomizer.state.styleId = typeId;
            const styleBtn = document.querySelector(`[data-custom-style="${typeId}"]`);
            if (styleBtn) {
              document.querySelectorAll('[data-custom-style]').forEach(b => b.classList.remove('pill-active', 'border-amber-500'));
              styleBtn.classList.add('pill-active', 'border-amber-500');
            }
            window.ApexCustomizer.render();
          }
        });
      });
    }

    // 2. Render Backings Guide
    const backingsGrid = document.getElementById('backings-grid');
    if (backingsGrid) {
      backingsGrid.innerHTML = BACKINGS.map(b => `
        <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <i data-lucide="${b.id === 'velcro' ? 'shield-check' : b.id === 'iron-on' ? 'flame' : b.id === 'magnetic' ? 'magnet' : 'scissors'}" class="w-5 h-5"></i>
          </div>
          <h4 class="text-base font-bold text-white mb-0.5">${b.name}</h4>
          <span class="text-xs text-amber-400/80 font-mono block mb-2">${b.subtitle}</span>
          <p class="text-xs text-slate-400 leading-relaxed">${b.description}</p>
        </div>
      `).join('');
    }

    // 3. Render Testimonials
    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = TESTIMONIALS.map(t => `
        <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1 text-amber-400 text-sm mb-3">
              ${'★'.repeat(t.rating)}
              <span class="text-slate-400 text-xs ml-2 font-mono">${t.date}</span>
            </div>
            <p class="text-slate-300 text-sm leading-relaxed mb-6 italic">
              "${t.text}"
            </p>
          </div>
          <div class="flex items-center gap-3 pt-4 border-t border-slate-800/80">
            <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-black font-extrabold flex items-center justify-center text-xs">
              ${t.avatar}
            </div>
            <div>
              <div class="text-sm font-bold text-white">${t.author}</div>
              <div class="text-xs text-slate-400">${t.role} • <span class="text-amber-400">${t.org}</span></div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // 4. Render FAQs
    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {
      faqContainer.innerHTML = FAQS.map((faq, i) => `
        <div class="border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden transition-all duration-200">
          <button 
            data-faq-toggle="${i}" 
            class="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-white hover:text-amber-400 transition-colors"
          >
            <span>${faq.q}</span>
            <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0"></i>
          </button>
          <div data-faq-answer="${i}" class="hidden px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 whitespace-pre-line">
            ${faq.a}
          </div>
        </div>
      `).join('');
    }

    if (window.lucide) window.lucide.createIcons();
  }

  setupNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  setupFAQ() {
    const toggles = document.querySelectorAll('[data-faq-toggle]');
    toggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-faq-toggle');
        const answer = document.querySelector(`[data-faq-answer="${idx}"]`);
        const icon = btn.querySelector('[data-lucide="chevron-down"]');

        if (answer) {
          const isHidden = answer.classList.contains('hidden');
          answer.classList.toggle('hidden', !isHidden);
          if (icon) {
            icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        }
      });
    });
  }

  setupHeroPatchInteractions() {
    const heroCard = document.getElementById('hero-patch-card');
    const heroFlipper = document.getElementById('hero-patch-flipper');
    const heroFlipBtn = document.getElementById('hero-flip-btn');

    if (heroFlipBtn && heroFlipper) {
      heroFlipBtn.addEventListener('click', () => {
        heroFlipper.classList.toggle('is-flipped');
      });
    }

    // 3D Tilt Effect on mouse movement over hero card
    if (heroCard) {
      heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = -(y / rect.height) * 16;
        const rotateY = (x / rect.width) * 16;
        heroCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg)`;
      });

      heroCard.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    }
  }

  setupQuoteForm() {
    const form = document.getElementById('free-quote-form');
    const fileInput = document.getElementById('quote-file-upload');
    const dropzone = document.getElementById('quote-dropzone');
    const fileLabel = document.getElementById('quote-file-label');
    const modal = document.getElementById('quote-success-modal');
    const modalRefCode = document.getElementById('quote-modal-ref');
    const modalDoneBtn = document.getElementById('quote-modal-done');

    let uploadedFileName = null;

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('border-amber-500', 'bg-amber-500/10');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('border-amber-500', 'bg-amber-500/10');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('border-amber-500', 'bg-amber-500/10');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          uploadedFileName = e.dataTransfer.files[0].name;
          if (fileLabel) {
            fileLabel.innerHTML = `
              <i data-lucide="file-check" class="w-6 h-6 text-emerald-400 mx-auto mb-1"></i>
              <span class="text-white font-bold">${uploadedFileName}</span> (Ready for digitizing)
            `;
            if (window.lucide) window.lucide.createIcons();
          }
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          uploadedFileName = e.target.files[0].name;
          if (fileLabel) {
            fileLabel.innerHTML = `
              <i data-lucide="file-check" class="w-6 h-6 text-emerald-400 mx-auto mb-1"></i>
              <span class="text-white font-bold">${uploadedFileName}</span> (Ready for digitizing)
            `;
            if (window.lucide) window.lucide.createIcons();
          }
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const refCode = `QT-${Math.floor(10000 + Math.random() * 90000)}`;

        const nameVal = document.getElementById('quote-name')?.value || 'Customer';
        const emailVal = document.getElementById('quote-email')?.value || '';
        const phoneVal = document.getElementById('quote-phone')?.value || '';
        const typeVal = document.getElementById('quote-patch-type')?.value || 'Custom Patches';
        const qtyVal = document.getElementById('quote-quantity')?.value || '50';
        const notesVal = document.getElementById('quote-notes')?.value || '';
        const selectedFile = fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;

        const dbIndicator = document.getElementById('quote-db-indicator');
        if (dbIndicator) {
          dbIndicator.innerHTML = '<span class="text-amber-400 font-mono animate-pulse">Syncing with database...</span>';
        }

        if (modal && modalRefCode) {
          modalRefCode.textContent = refCode;
          modal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';

          const whatsappQuoteBtn = document.getElementById('quote-modal-whatsapp');
          if (whatsappQuoteBtn) {
            const msg = encodeURIComponent(`Hello ApexPatches! I submitted Quote Request #${refCode} for ${qtyVal} pcs of ${typeVal}. My name is ${nameVal}. Please send my proof!`);
            whatsappQuoteBtn.href = `https://wa.me/923000000000?text=${msg}`;
          }
        }

        // Send to Supabase
        const quotePayload = {
          ref_code: refCode,
          full_name: nameVal,
          email: emailVal,
          phone: phoneVal,
          patch_type: typeVal,
          quantity: qtyVal,
          notes: notesVal
        };

        SupabaseManager.saveQuote(quotePayload, selectedFile).then(res => {
          if (!dbIndicator) return;
          if (res.success) {
            dbIndicator.innerHTML = '<span class="text-emerald-400 font-bold flex items-center justify-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5"></i> Synced to Supabase (quotes table)</span>';
          } else if (res.mode === 'local') {
            dbIndicator.innerHTML = '<span class="text-slate-400 text-[11px]">Handled locally (Supabase not configured)</span>';
          } else {
            dbIndicator.innerHTML = `<span class="text-rose-400 text-[11px]">Database notice: ${res.error}</span>`;
          }
          if (window.lucide) window.lucide.createIcons();
        });

        form.reset();
        if (fileLabel) {
          fileLabel.innerHTML = `
            <i data-lucide="upload-cloud" class="w-8 h-8 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform"></i>
            <span class="text-slate-200 font-medium">Click to upload artwork</span> or drag & drop<br/>
            <span class="text-[11px] text-slate-500">PNG, JPG, PDF, SVG, AI, EPS up to 25MB</span>
          `;
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    if (modalDoneBtn && modal) {
      modalDoneBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
  }

  setupSupabaseModal() {
    const modal = document.getElementById('supabase-modal');
    const closeBtn = document.getElementById('supabase-modal-close');
    const openBtns = document.querySelectorAll('[data-open-supabase-modal]');
    const form = document.getElementById('supabase-settings-form');
    const inputUrl = document.getElementById('input-supabase-url');
    const inputKey = document.getElementById('input-supabase-key');
    const testBtn = document.getElementById('btn-test-supabase');
    const testResult = document.getElementById('supabase-test-result');
    const clearBtn = document.getElementById('btn-clear-supabase');

    const openModal = () => {
      const creds = SupabaseManager.getCredentials();
      if (inputUrl) inputUrl.value = creds.url;
      if (inputKey) inputKey.value = creds.anonKey;
      if (testResult) testResult.classList.add('hidden');
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    };

    const closeModal = () => {
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Test connection
    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        const url = inputUrl?.value?.trim() || '';
        const key = inputKey?.value?.trim() || '';

        if (!url || !key) {
          if (testResult) {
            testResult.className = 'p-3 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300';
            testResult.textContent = 'Please enter both Supabase URL and Anon Key.';
            testResult.classList.remove('hidden');
          }
          return;
        }

        testBtn.disabled = true;
        testBtn.innerHTML = '<span class="animate-spin inline-block mr-1">⌛</span> Testing...';

        // Temporarily apply to manager to test
        SupabaseManager.saveCredentials(url, key);
        const result = await SupabaseManager.testConnection();

        testBtn.disabled = false;
        testBtn.innerHTML = '<i data-lucide="radio" class="w-4 h-4 text-emerald-400"></i><span>Test Connection</span>';
        if (window.lucide) window.lucide.createIcons();

        if (testResult) {
          testResult.classList.remove('hidden');
          if (result.success) {
            testResult.className = 'p-3 rounded-xl text-xs font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300';
            testResult.innerHTML = `✓ ${result.message}`;
          } else {
            testResult.className = 'p-3 rounded-xl text-xs font-mono bg-rose-950/80 border border-rose-500/40 text-rose-300';
            testResult.innerHTML = `✗ ${result.message}`;
          }
        }
      });
    }

    // Save settings
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const url = inputUrl?.value?.trim() || '';
        const key = inputKey?.value?.trim() || '';

        SupabaseManager.saveCredentials(url, key);
        closeModal();
        this.toast('✓ Supabase credentials saved & connected!', 'success');
      });
    }

    // Clear settings
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        SupabaseManager.clearCredentials();
        if (inputUrl) inputUrl.value = '';
        if (inputKey) inputKey.value = '';
        if (testResult) testResult.classList.add('hidden');
        SupabaseManager.updateStatusPill();
        this.toast('Supabase credentials removed.', 'info');
      });
    }
  }
  }

  setupScrollEffects() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
      if (!header) return;
      if (window.scrollY > 40) {
        header.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-slate-800');
      } else {
        header.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-slate-800');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ApexApp = new ApexApp();
});
