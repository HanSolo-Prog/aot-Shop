# AOT Revolution Store

Black & gold Attack on Titan merchandise storefront. Users browse and message on Facebook to order. Admin panel manages inventory and tracks orders.

---

## Stack

- **Frontend:** Vanilla HTML + CSS + JS (no framework needed)
- **Styles:** Custom design system — no Tailwind dependency, all in `globals.css`
- **Backend (to integrate):** Supabase (PostgreSQL + Auth + Storage)
- **Hosting:** Vercel
- **Ordering:** Facebook Messenger direct link

---

## File Structure

```
aot-store/
├── public/
│   └── robots.txt
├── src/
│   ├── config/
│   │   └── supabase.js        ← API layer + mock data
│   ├── pages/
│   │   ├── index.html         ← Landing page
│   │   ├── items.html         ← Browse + filter + search
│   │   ├── item-detail.html   ← Product detail + FB CTA
│   │   ├── admin-login.html   ← Hidden admin login
│   │   ├── admin-dashboard.html
│   │   ├── admin-products.html ← CRUD
│   │   ├── admin-stock.html
│   │   ├── admin-orders.html
│   │   └── 404.html
│   └── styles/
│       └── globals.css        ← Full design system
├── vercel.json
└── README.md
```

---

## Setup

### 1. Connect Supabase

Edit `src/config/supabase.js` — replace the top two constants:

```js
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

Then replace the mock API functions (marked clearly in the file) with real Supabase calls, e.g.:

```js
getProducts: async (filters = {}) => {
  let query = supabase.from('products').select('*').eq('status', 'active');
  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  if (filters.inStock) {
    query = query.gt('stock_quantity', 0);
  }
  return await query;
},
```

### 2. Create Supabase Tables

Run in Supabase SQL editor:

```sql
-- Products
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text check (category in ('Merch', 'Apparel', 'Accessories')),
  price decimal not null,
  image_url text,
  images text[], -- array of image URLs
  stock_quantity integer default 0,
  status text default 'active' check (status in ('active', 'inactive', 'coming_soon')),
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders
create table orders (
  id text primary key,
  customer_name text not null,
  customer_fb_profile text,
  product_id uuid references products(id),
  quantity integer not null default 1,
  total_price decimal,
  status text default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'completed')),
  notes text,
  order_date timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row-level security
alter table products enable row level security;
create policy "Public read" on products for select using (status = 'active');

alter table orders enable row level security;
-- Orders: only authenticated admins can read/write
create policy "Admin only" on orders using (auth.role() = 'authenticated');
```

### 3. Set Facebook Messenger Link

In `src/config/supabase.js`:
```js
const FB_MESSENGER_URL = 'https://m.me/YOUR_PAGE_ID';
```

Replace `YOUR_PAGE_ID` with your Facebook Page ID (found in Page Settings → About).

### 4. Admin Auth

The demo uses `sessionStorage` with hardcoded credentials. To use real Supabase Auth, replace `API.adminLogin` with:

```js
adminLogin: async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) sessionStorage.setItem('aot_admin', JSON.stringify(data.user));
  return { data: data?.user, error: error?.message };
},
```

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# From project root
vercel

# Set env vars in Vercel dashboard:
# SUPABASE_URL, SUPABASE_ANON_KEY
```

---

## Admin Access

URL: `yourdomain.com/admin`

Demo credentials (remove before production):
- Email: `admin@aot.store`
- Password: `titan2024`

---

## Design System Quick Reference

| Token | Value |
|-------|-------|
| `--black` | `#0a0a0a` |
| `--gold` | `#d4af37` |
| `--gray-dark` | `#1a1a1a` |
| `--font-display` | Bebas Neue |
| `--font-body` | Inter |
| `--font-mono` | Space Mono |

---

## Phase Roadmap

- [x] Phase 1 — Landing, Items, Detail, Design System
- [x] Phase 2 — Admin Login, Products CRUD, Stock, Orders
- [ ] Phase 3 — Real Supabase integration, Image upload, Mobile polish
- [ ] Phase 4 — Wishlist, Newsletter, Analytics, Reviews

---

## Notes

- No checkout — all orders go through FB Messenger
- Admin routes are blocked from search engines via `robots.txt`
- All stock updates are real-time once Supabase is connected
- Images: compress to <200KB before uploading to Supabase Storage
