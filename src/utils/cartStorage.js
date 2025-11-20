const STORAGE_KEY = 'publisher_cart_v1';
let saveTimer = null;

export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to load cart from localStorage', e);
    return [];
  }
}

export function saveCart(cart) {
  // debounce writes to avoid excessive localStorage churn
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
    saveTimer = null;
  }, 120);
}

export function subscribeCartChanges(onChange) {
  const handler = (e) => {
    if (e.key !== STORAGE_KEY) return;
    try {
      const v = e.newValue ? JSON.parse(e.newValue) : [];
      onChange(v);
    } catch (err) {
      console.warn('Failed to parse cart from storage event', err);
    }
  };
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export function clearStoredCart() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to remove cart from localStorage', e);
  }
}

export default {
  loadCart,
  saveCart,
  subscribeCartChanges,
  clearStoredCart,
};
