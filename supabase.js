// ─────────────────────────────────────────
// Supabase Configuration
// ─────────────────────────────────────────

const SUPABASE_URL = 'https://tpsbheiqjmncxgvvpkfq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwc2JoZWlxam1uY3hndnZwa2ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDE1NDQsImV4cCI6MjA5NzcxNzU0NH0.uqZj0DHGmkM6iUbcebABsVu6rQbkyvllnS1qZGpNpaE';

// Initialize Supabase client via CDN (loaded in HTML)
// All pages must include: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─────────────────────────────────────────
// MOCK DATA — fallback / demo
// ─────────────────────────────────────────

const MOCK_PRODUCTS = [
  { id: '1', name: 'Survey Corps Hoodie', description: 'Heavyweight fleece hoodie featuring the Wings of Freedom emblem. Premium cotton-poly blend. Machine wash safe.', category: 'Apparel', price: 1299, image_url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'], stock_quantity: 24, status: 'active', created_at: '2024-01-15', featured: true },
  { id: '2', name: 'Titan Wall Poster Set', description: 'Set of 4 high-quality 18×24" art prints. Wall Maria, Rose, Sina, and Paradis scenes. Matte finish.', category: 'Merch', price: 649, image_url: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=600&q=80', images: ['https://images.unsplash.com/photo-1519638831568-d9897f54ed69?w=600&q=80'], stock_quantity: 3, status: 'active', created_at: '2024-01-20', featured: true },
  { id: '3', name: 'ODM Gear Keychain', description: '3D die-cast zinc alloy ODM gear replica. Antique bronze finish. Chain length: 12cm.', category: 'Accessories', price: 299, image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'], stock_quantity: 0, status: 'active', created_at: '2024-02-01', featured: false },
  { id: '4', name: 'Levi Ackerman Figure', description: '1/7 scale PVC figure. Hand-painted, 24cm tall. Includes dual blades and display stand.', category: 'Merch', price: 3499, image_url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80', images: ['https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=600&q=80'], stock_quantity: 7, status: 'active', created_at: '2024-02-10', featured: true },
  { id: '5', name: 'Wings of Freedom Cap', description: 'Structured snapback cap with embroidered Survey Corps emblem. One size fits all.', category: 'Apparel', price: 549, image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80', images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80'], stock_quantity: 15, status: 'active', created_at: '2024-02-15', featured: true },
  { id: '6', name: 'AOT Enamel Pin Set', description: '6-piece hard enamel pin set. Mikasa, Armin, Levi, Eren, Hange, and Titan. Rubber clasp back.', category: 'Accessories', price: 399, image_url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80', images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80'], stock_quantity: 2, status: 'active', created_at: '2024-02-20', featured: true },
  { id: '7', name: 'Titan Graphic Tee', description: '100% ringspun cotton tee with oversized Colossus Titan graphic. Available S-3XL.', category: 'Apparel', price: 699, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80'], stock_quantity: 30, status: 'active', created_at: '2024-03-01', featured: false },
  { id: '8', name: 'Attack on Titan Manga Box Set', description: 'Complete manga series, volumes 1-34. English edition. Includes exclusive art book.', category: 'Merch', price: 4999, image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80', images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80'], stock_quantity: 5, status: 'active', created_at: '2024-03-10', featured: false },
  { id: '9', name: 'Mikasa Ackerman Jacket', description: 'Slim fit coach jacket with embroidered patches. 100% nylon shell. Interior mesh lining.', category: 'Apparel', price: 2199, image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80'], stock_quantity: 4, status: 'active', created_at: '2024-03-15', featured: false },
  { id: '10', name: 'Survey Corps Canvas Tote', description: 'Heavy-duty 12oz canvas tote bag. Wings of Freedom screen print. 15"×16" with 11" handles.', category: 'Accessories', price: 349, image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80', images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80'], stock_quantity: 12, status: 'active', created_at: '2024-03-20', featured: false },
  { id: '11', name: 'Colossus Titan Mug', description: '400ml ceramic mug with color-changing heat reveal. Hot liquid reveals full Colossus titan.', category: 'Merch', price: 449, image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80', images: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80'], stock_quantity: 18, status: 'active', created_at: '2024-04-01', featured: false },
  { id: '12', name: 'Rumbling Collector Box', description: "Limited edition collector's box. Includes figure, artbook, 2 pins, and exclusive poster. Only 100 made.", category: 'Merch', price: 6999, image_url: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', images: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80'], stock_quantity: 1, status: 'active', created_at: '2024-04-10', featured: false },
];

const MOCK_ORDERS = [
  { id: 'ORD-001', customer_name: 'Franz K.', product_id: '1', quantity: 2, total_price: 2598, status: 'confirmed', order_date: '2024-04-12', notes: 'Size L' },
  { id: 'ORD-002', customer_name: 'Hana M.', product_id: '4', quantity: 1, total_price: 3499, status: 'shipped', order_date: '2024-04-11', notes: '' },
  { id: 'ORD-003', customer_name: 'Rico B.', product_id: '6', quantity: 3, total_price: 1197, status: 'pending', order_date: '2024-04-14', notes: 'Wants gift wrap' },
  { id: 'ORD-004', customer_name: 'Petra R.', product_id: '2', quantity: 1, total_price: 649, status: 'completed', order_date: '2024-04-08', notes: '' },
  { id: 'ORD-005', customer_name: 'Oluo B.', product_id: '12', quantity: 1, total_price: 6999, status: 'confirmed', order_date: '2024-04-13', notes: 'Priority' },
];

// ─────────────────────────────────────────
// API Layer — real Supabase with mock fallback
// ─────────────────────────────────────────

const API = {
  getProducts: async (filters = {}) => {
    try {
      let query = supabase.from('products').select('*').eq('status', 'active');
      if (filters.category && filters.category !== 'All') query = query.eq('category', filters.category);
      if (filters.search) query = query.ilike('name', `%${filters.search}%`);
      if (filters.inStock) query = query.gt('stock_quantity', 0);
      if (filters.minPrice != null) query = query.gte('price', filters.minPrice);
      if (filters.maxPrice != null) query = query.lte('price', filters.maxPrice);
      if (filters.sort === 'price_asc') query = query.order('price', { ascending: true });
      else if (filters.sort === 'price_desc') query = query.order('price', { ascending: false });
      else query = query.order('created_at', { ascending: false });
      const { data, error } = await query;
      if (error) throw error;
      return { data, error: null };
    } catch (e) {
      console.warn('Supabase fallback:', e.message);
      // Mock fallback
      let products = [...MOCK_PRODUCTS];
      if (filters.search) { const q = filters.search.toLowerCase(); products = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)); }
      if (filters.category && filters.category !== 'All') products = products.filter(p => p.category === filters.category);
      if (filters.inStock) products = products.filter(p => p.stock_quantity > 0);
      if (filters.minPrice != null) products = products.filter(p => p.price >= filters.minPrice);
      if (filters.maxPrice != null) products = products.filter(p => p.price <= filters.maxPrice);
      if (filters.sort === 'price_asc') products.sort((a, b) => a.price - b.price);
      else if (filters.sort === 'price_desc') products.sort((a, b) => b.price - a.price);
      return { data: products, error: null };
    }
  },

  getProduct: async (id) => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) throw error;
      return { data, error: null };
    } catch {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      return { data: product || null, error: product ? null : 'Not found' };
    }
  },

  getFeatured: async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('status', 'active').eq('featured', true).limit(6);
      if (error) throw error;
      return { data, error: null };
    } catch {
      return { data: MOCK_PRODUCTS.filter(p => p.featured), error: null };
    }
  },

  getRelated: async (id, category) => {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('category', category).neq('id', id).eq('status', 'active').limit(4);
      if (error) throw error;
      return { data, error: null };
    } catch {
      return { data: MOCK_PRODUCTS.filter(p => p.id !== id && p.category === category).slice(0, 4), error: null };
    }
  },

  createProduct: async (product) => {
    try {
      const { data, error } = await supabase.from('products').insert([product]).select().single();
      if (error) throw error;
      return { data, error: null };
    } catch {
      const newProduct = { ...product, id: Date.now().toString(), created_at: new Date().toISOString() };
      MOCK_PRODUCTS.push(newProduct);
      return { data: newProduct, error: null };
    }
  },

  updateProduct: async (id, updates) => {
    try {
      const { data, error } = await supabase.from('products').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
      if (error) throw error;
      return { data, error: null };
    } catch {
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
      if (idx !== -1) MOCK_PRODUCTS[idx] = { ...MOCK_PRODUCTS[idx], ...updates };
      return { data: MOCK_PRODUCTS[idx], error: null };
    }
  },

  deleteProduct: async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      return { error: null };
    } catch {
      const idx = MOCK_PRODUCTS.findIndex(p => p.id === id);
      if (idx !== -1) MOCK_PRODUCTS.splice(idx, 1);
      return { error: null };
    }
  },

  getOrders: async () => {
    try {
      const { data, error } = await supabase.from('orders').select('*, product:products(name, image_url, category)').order('order_date', { ascending: false });
      if (error) throw error;
      return { data, error: null };
    } catch {
      return { data: MOCK_ORDERS.map(o => ({ ...o, product: MOCK_PRODUCTS.find(p => p.id === o.product_id) || {} })), error: null };
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const { error } = await supabase.from('orders').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
      return { error: null };
    } catch {
      const order = MOCK_ORDERS.find(o => o.id === id);
      if (order) order.status = status;
      return { error: null };
    }
  },

  adminLogin: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      sessionStorage.setItem('aot_admin', JSON.stringify(data.user));
      return { data: data.user, error: null };
    } catch (e) {
      return { data: null, error: e.message };
    }
  },

  adminLogout: async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem('aot_admin');
  },

  getAdmin: () => {
    const stored = sessionStorage.getItem('aot_admin');
    return stored ? JSON.parse(stored) : null;
  },
};

// ─────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────

const Utils = {
  formatPrice: (p) => `₱${Number(p).toLocaleString()}`,

  stockStatus: (qty) => {
    if (qty === 0) return { text: 'Out of Stock', cls: 'out', badge: 'badge-out' };
    if (qty <= 5) return { text: `Only ${qty} left`, cls: 'low', badge: 'badge-low' };
    return { text: 'In Stock', cls: 'in', badge: 'badge-gold' };
  },

  statusColor: (status) => ({
    pending: '#e67e22', confirmed: '#3498db', shipped: '#9b59b6',
    completed: '#27ae60', active: '#27ae60', inactive: '#7f8c8d', coming_soon: '#f39c12',
  })[status] || '#7f8c8d',

  toast: (msg, type = 'default') => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  },

  requireAdmin: () => {
    if (!API.getAdmin()) {
      window.location.href = '/admin-login.html';
      return false;
    }
    return true;
  },
};

// FB Messenger — update with your page URL
const FB_MESSENGER_URL = 'https://www.facebook.com/Hans.Dev.io';
