# Coding Standards

## Naming

Components:

PascalCase

Example:

ProductCard.jsx


Functions:

camelCase

Example:

getProducts()


Files:

featureName + purpose


---

# React Rules

Components must be:

- Small
- Reusable
- Focused


Avoid:

Huge components.


---

# Hooks

Reusable logic must be inside hooks.

Example:

useProducts()

useOrders()


---

# Services

All business logic belongs here.


Examples:

productService

orderService


---

# Constants

Never write repeated strings.

Wrong:

"pending"


Correct:

ORDER_STATUS.PENDING


---

# No Duplicate Code

Always reuse existing code.