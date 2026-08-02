export const APP = {
  NAME: 'Homs Shop',
  VERSION: '0.0.0',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    PAGE_SIZES: [10, 20, 50, 100],
  },
  UPLOAD: {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  },
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
