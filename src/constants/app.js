export const APP = {
  NAME: 'Homs Shop',
  VERSION: '0.0.0',
  DEFAULT_PAGE_SIZE: 20,
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024,
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000,
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const SHIPMENT_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
};
