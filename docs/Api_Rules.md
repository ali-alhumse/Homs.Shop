# API_RULES.md

# Homs Shop API & Data Communication Standards

## Purpose

This document defines the official rules for communication between the frontend application, backend services, Supabase, and external integrations.

The goal is to create a clean, secure, scalable, and maintainable data layer.

---

# Core Principle

UI components must never communicate directly with databases or external APIs.

All communication must go through Services.

Correct flow:

Component

↓

Hook

↓

Service

↓

API / Supabase / External Provider


Wrong:

Component

↓

Supabase


---

# API Layer Architecture

The application follows this structure:

## Components

Responsible for:

- Displaying data
- User interaction

Never:

- Fetch data
- Modify database directly
- Handle business logic


---

## Hooks

Responsible for:

- Managing UI state
- Calling services
- Handling loading states
- Managing errors


Example:

useProducts()

useOrders()

useCustomers()


---

## Services

Responsible for:

- API communication
- Database operations
- Business operations
- Data transformation


Examples:

ProductService

OrderService

PaymentService

CustomerService


---

# Service Rules

Every service must:

- Have a single responsibility.
- Be independent from UI.
- Return clean data.
- Handle API errors.
- Validate responses.


Example:

Correct:

ProductService.create(product)


Wrong:

supabase.from("products").insert(product) inside component.


---

# Supabase Rules

Supabase access is only allowed inside:

services/

modules/

Never inside:

components/

pages/

hooks/

---

# Response Structure

All services should return consistent responses.

Success:

{
 success: true,
 data: result,
 error: null
}


Failure:

{
 success: false,
 data: null,
 error: {
   message,
   code
 }
}


---

# Error Handling

Never throw raw database errors to users.

Wrong:

"Postgres error 23505"


Correct:

"Product already exists"


Technical errors should be logged internally.

---

# Loading States

Every async operation must provide:

- Loading state
- Success state
- Error state


Example:

const {
 data,
 loading,
 error
} = useProducts();


---

# Pagination

Every large data request must support pagination.

Never load unlimited records.

Required parameters:

page

limit

sort

filters


Example:

ProductService.getAll({
 page:1,
 limit:20
})


---

# Filtering

Filtering logic belongs inside services.

Never filter thousands of records inside React.

Wrong:

Download all orders then filter.


Correct:

Database query with filters.


---

# Searching

Search operations must be optimized.

Use:

- Database indexes
- Full text search when needed
- Server-side filtering


---

# Data Transformation

Raw database data should not directly reach UI.

Services should transform:

Database Model

↓

Application Model

↓

UI


---

# API Naming

Use clear action names.

Correct:

getProducts()

createProduct()

updateOrderStatus()

deleteCustomer()


Avoid:

doAction()

handleData()

process()


---

# Mutations

Every create/update/delete operation must:

1. Validate input.
2. Check permissions.
3. Perform operation.
4. Return updated data.
5. Trigger required events.


---

# Transactions

Operations involving multiple changes must be atomic.

Example:

Creating an order:

Create Order

↓

Create Order Items

↓

Update Inventory

↓

Create Payment Record


All succeed or all fail.

---

# External APIs

External integrations must use dedicated services.

Examples:

PaymentService

WhatsAppService

ShippingService

EmailService


Never call external APIs directly from features.

---

# API Security

Every request must verify:

- Authentication
- Authorization
- Input validation
- Ownership


Never trust frontend data.

---

# Caching

Frequently used data may use caching.

Examples:

Settings

User permissions

Store information


Cache must have:

Expiration strategy

Refresh mechanism

Invalidation strategy


---

# Real-time Data

For real-time features use controlled subscriptions.

Examples:

Order updates

Notifications

Inventory changes


Never create unlimited listeners.

---

# File Uploads

File operations must go through StorageService.

Rules:

- Validate file type.
- Validate file size.
- Generate safe names.
- Return secure URLs.


---

# API Documentation

Every major service should document:

Purpose

Methods

Parameters

Return values

Errors


Example:

ProductService

Methods:

getAll()

create()

update()

delete()


---

# Testing

Services must include tests.

Required:

- Success cases
- Error cases
- Validation cases
- Permission cases


---

# Performance Rules

Avoid:

- Duplicate requests
- Unnecessary queries
- Large responses
- Repeated calculations


Always:

- Select required fields only.
- Paginate large data.
- Optimize queries.


---

# AI Development Rules

Before creating a new API/service:

Check existing services.

Never create duplicate communication layers.

Never put database queries in UI.

Never bypass existing modules.


---

# Golden Rules

Components display.

Hooks manage state.

Services communicate.

Database stores data.

Security validates access.

No layer should perform another layer's responsibility.