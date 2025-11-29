// Helper for localStorage with expiry
// Stores items as { value: ..., expiry: timestamp }
export function setWithExpiry(key, value, ttl = 60000) {
  try {
    const item = {
      value,
      expiry: Date.now() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    // fallback: plain set
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;
  try {
    const item = JSON.parse(itemStr);
    // If item has expiry field, treat it as wrapped
    if (item && Object.prototype.hasOwnProperty.call(item, 'expiry')) {
      if (Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    }
    // Legacy raw value (no expiry) — re-wrap with default TTL and return parsed value
    try {
      const parsed = item;
      // re-save with expiry so it will expire going forward
      setWithExpiry(key, parsed);
      return parsed;
    } catch (e) {
      return item;
    }
  } catch (err) {
    // not JSON — return raw value
    return itemStr;
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
