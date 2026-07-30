# Homs Shop Architecture

## Overview

Homs Shop is a scalable e-commerce management platform.

Technology:

- React
- Vite
- Tailwind CSS
- Supabase
- React Router


Architecture Style:

MVC + Feature Based Architecture

---

# Folder Structure

src/

features/

Each feature must contain:

components/
pages/
services/
hooks/
models/
validators/
constants/
tests/


---

# Feature Independence

Each feature behaves like an independent module.

Examples:

products
orders
customers
payments
shipping


A feature should not directly access another feature.

Communication happens through:

- Services
- Events
- Shared utilities


---

# Data Flow

Correct:

Component

↓

Hook

↓

Service

↓

Supabase/API


Wrong:

Component

↓

Supabase


---

# External Services

All external dependencies must have wrappers.

Examples:

Payment:

PaymentService

Shipping:

ShippingService

Notifications:

NotificationService


Never connect directly.