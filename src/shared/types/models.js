/**
 * @typedef {Object} User
 * @property {string} id - UUID
 * @property {string} email
 * @property {string} role - One of ROLES
 * @property {string} [full_name]
 * @property {string} [avatar_url]
 * @property {boolean} [is_active]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Product
 * @property {string} id - UUID
 * @property {string} name
 * @property {string} [description]
 * @property {number} price
 * @property {number} [compare_price]
 * @property {number} stock
 * @property {string} [barcode]
 * @property {string} [sku]
 * @property {string} [category_id]
 * @property {string} [image_url]
 * @property {boolean} [is_active]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Order
 * @property {string} id - UUID
 * @property {string} order_number
 * @property {string} customer_id
 * @property {string} status - One of ORDER_STATUS
 * @property {number} total
 * @property {number} [discount]
 * @property {string} [notes]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Customer
 * @property {string} id - UUID
 * @property {string} name
 * @property {string} [phone]
 * @property {string} [email]
 * @property {string} [address]
 * @property {number} [total_orders]
 * @property {number} [total_spent]
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {Array} items
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 */

/**
 * @typedef {Object} ServiceResponse
 * @property {boolean} success
 * @property {*} data
 * @property {{ code: string, message: string, details: * }|null} error
 */

export {};
