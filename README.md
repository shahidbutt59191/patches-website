# ApexPatches - Premium Custom Patch Studio Website

A modern, responsive, high-converting e-commerce and customizer website for custom patches:
- **Custom Embroidered Patches** (Tajima precision high-density thread)
- **3D Molded PVC Rubber Morale Patches** (Tactical, waterproof)
- **Laser-Engraved & Debossed Leatherette Patches** (Beanies & trucker snapbacks)
- **Vintage Varsity Chenille Patches** (Letterman jackets & streetwear)
- **Jacquard Woven Patches** (Micro-lettering & complex logos)
- **Sublimated Full-Color Hybrid Patches** (Photographic gradients)

---

## ⚡ Supabase Database Integration

The website is fully integrated with **Supabase**! It automatically stores:
1. **Customer Quote Requests & Artworks** into the `quotes` table (and uploads logo files to the `patch-artworks` storage bucket).
2. **Shopping Cart Orders & Items** into the `orders` and `order_items` tables.

### 📋 3-Step Supabase Setup Guide:

#### Step 1: Create Supabase Tables
1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **SQL Editor** on the left menu -> **New query**.
3. Open [`supabase-schema.sql`](file:///e:/patches%20website/supabase-schema.sql) in this directory, copy its entire contents, paste it into the Supabase SQL editor, and click **Run**.
4. *(Optional for customer logos)*: In Supabase, go to **Storage** -> Click **New Bucket** -> Name it `patch-artworks` -> Toggle **Public bucket** to ON -> Save.

#### Step 2: Connect via Website UI (No coding required!)
1. Open the website by double-clicking `start.bat`.
2. Click the **"Connect Supabase"** button in the top navigation bar or the footer link.
3. Paste your **Project URL** and **anon public Key** (obtained from Supabase Dashboard -> **Project Settings** -> **API**).
4. Click **"Test Connection"** to verify that tables are accessible.
5. Click **"Save & Connect Database"**. The status pill will turn green: **"Supabase Connected"**!

*(Alternatively, you can open [`js/supabaseConfig.js`](file:///e:/patches%20website/js/supabaseConfig.js) and paste your URL and anonKey directly into the code).*

---

## 🚀 Vercel Deployment Guide

Aap is website ko Vercel par 2 tareeqon se live deploy kar sakte hain:

### Method 1: 1-Click Terminal Deploy (Sab se tez)
1. Folder mein mojood **[`deploy-vercel.bat`](file:///e:/patches%20website/deploy-vercel.bat)** par double click karein (ya terminal mein `npx vercel --prod` chalayein).
2. Pehli martaba Vercel aap se login (GitHub/Email) mangay ga.
3. Sawalaat ke liye sirf **Enter** press karte jayein.
4. Kuch hi seconds mein aap ki website live ho jayegi aur aap ko ek live URL mil jayega (e.g. `https://apexpatches.vercel.app`)!

### Method 2: GitHub se Vercel Connect Karein (Continuous Deployment)
1. GitHub par naya repository banayein (e.g. `patches-website`).
2. Apne terminal mein yeh commands chalayein:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/patches-website.git
   git branch -M main
   git push -u origin main
   ```
3. [Vercel Dashboard](https://vercel.com/dashboard) par jayein aur **"Add New..." -> "Project"** par click karein.
4. Apna GitHub repo select kar ke **"Deploy"** par click kar dein!

### 🔑 Vercel Par Supabase Environment Variables Kaise Add Karein?
Jab aap Vercel par deploy karein:
1. Vercel project dashboard mein **Settings -> Environment Variables** par jayein.
2. Yeh 2 variables add karein:
   - `SUPABASE_URL` = (Aap ka Supabase Project URL)
   - `SUPABASE_ANON_KEY` = (Aap ka Supabase Anon Key)
3. Website automatically Vercel environment variables se connect ho jayegi aur live site par Supabase database automatic chalna shuru ho jayega!

---

## 🌟 Key Features

1. **Interactive Live 2D/3D Patch Designer & Mockup Studio (`#customizer-section`)**:
   - Live SVG rendering with realistic stitch borders and cloth twill texture
   - Choose from 6 geometric & die-cut shapes (Shield, Circle, Hexagon, Bar, Diamond, Crest)
   - Real-time color pickers for fabric twill, merrowed border, and center embroidery thread
   - Preset tactical emblems (Eagle, Skull, Wolf, Wings, Mountain, Tiger) + **Upload your own custom logo file**
   - Curved upper and lower embroidered arc text with live SVG `<textPath>`
   - Realistic backing flipper (Flip to inspect Mil-Spec Hook & Loop Velcro, Iron-On, or Sew-On backing)
   - Switch mockup stage: Studio view, Tactical MOLLE Backpack, Biker Denim Jacket, or Snapback Cap
   - Real-time dynamic price calculation & 1-click **Add to Cart**

2. **Instant Bulk Price Calculator (`#calculator-section`)**:
   - Interactive sliders for dimensions (Width & Height) and Quantity (10 to 1,000+ pcs)
   - Coverage selectors: 50%, 75% standard, or 100% full thread coverage
   - Backing options and optional upgrades (Metallic Gold/Silver thread, Glow in the dark, 3-day express rush)
   - Real-time unit price, total price, volume savings badge, and estimated delivery date
   - 1-click "Add Calculated Spec to Cart" and "Auto-Fill Quote Form"

3. **Client Portfolio & Filterable Gallery (`#gallery-section`)**:
   - Filter by: Tactical, Biker MC, Leather & Hats, Varsity Chenille, Corporate Woven
   - Live search filter by keyword
   - Lightbox inspection modal showing stitch density, dimensions, and backing
   - 1-click "Open in 3D Customizer" to re-create existing designs

4. **Visual Backings & Borders Guide (`#backings-section`)**:
   - Educational breakdown of Hook & Loop (Velcro), Iron-On (Heat Seal), Sew-On, 3M Peel & Stick, and Neodymium Magnetic backings
   - Side-by-side comparison of Merrowed Border vs Laser-Cut / Heat-Cut Die-Cut Edge

5. **Slide-Out E-Commerce Shopping Cart & Checkout Drawer**:
   - LocalStorage cart persistence
   - Quantity modifiers and item removal
   - Promo coupon code system (`WELCOME10` for 10% off, `STITCH20` for $20 off, `FREESHIP` for free shipping)
   - Checkout modal with customer details, order confirmation reference (`#APX-XXXXXX`), and direct **Send Order to WhatsApp** link

6. **Free Artwork Proof Request Form (`#quote-form-section`)**:
   - Drag & drop artwork file uploader (PNG, JPG, PDF, SVG, AI, EPS)
   - Dimensions, quantity, and special instructions
   - Instant quote reference code (`QT-XXXXX`) and WhatsApp direct connect

7. **Floating Quick Actions**:
   - Floating WhatsApp button with pre-filled quote inquiries
   - Responsive sticky navigation bar with mobile hamburger menu

---

## 🚀 How to Run the Website

### Option 1: Double-Click (Easiest on Windows)
Simply double-click the **`start.bat`** file in this folder. It will start a local server and immediately open `http://localhost:8000` in your default web browser.

### Option 2: Using Python
Open PowerShell or Command Prompt in this folder and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js
```bash
npx serve .
```

---

## 📁 Project Structure

```
patches-website/
├── index.html            # Main HTML5 landing page & responsive UI
├── start.bat             # 1-Click launcher for Windows
├── README.md             # Documentation
├── styles/
│   └── main.css          # Custom embroidery textures, stitch borders & animations
├── js/
│   ├── app.js            # App init, FAQs, quotes, testimonials & toasts
│   ├── customizer.js     # Live 2D/3D interactive patch designer
│   ├── calculator.js     # Dynamic bulk price calculator
│   ├── gallery.js        # Filterable portfolio & inspection modal
│   ├── cart.js           # Shopping cart drawer & checkout modal
│   └── data.js           # Patch types, shapes, presets, backings & FAQs
```

---

## 🛠️ How to Customize Contact & WhatsApp Info

- **WhatsApp Number**: Open `index.html` and search for `wa.me/923000000000` and replace with your actual WhatsApp phone number (e.g., `wa.me/923XXXXXXXXX`).
- **Support Email**: Open `index.html` and search for `support@apexpatches.com`.
- **Brand Name**: Search `APEXPATCHES` in `index.html` to update your company name.
