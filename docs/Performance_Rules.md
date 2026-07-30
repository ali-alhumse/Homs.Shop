# PERFORMANCE_RULES.md

# Homs Shop Performance Standards

## Purpose

This document defines the performance standards for Homs Shop.

The application must remain fast, responsive, and scalable as data and users increase.

Performance is a requirement, not an optimization performed later.

---

# Core Principles

The application must:

- Load quickly.
- Minimize unnecessary operations.
- Reduce database requests.
- Optimize rendering.
- Handle large datasets efficiently.

---

# React Performance Rules

## Component Size

Components must remain small and focused.

Avoid:

- Huge components
- Multiple responsibilities
- Complex rendering logic

If a component becomes difficult to understand, split it.

---

# Re-render Control

Avoid unnecessary React re-renders.

Use:

- React.memo when needed
- useMemo for expensive calculations
- useCallback for stable functions

Do not use optimization blindly.

Only optimize when it improves performance.

---

# State Management

Do not store unnecessary data in global state.

Keep state as close as possible to where it is used.

Avoid:

- Large duplicated states
- Copying server data unnecessarily

---

# Data Fetching

Never fetch unnecessary data.

Wrong:

Load all products with all details.

Correct:

Load only required fields.

Example:

Product list:

- id
- name
- price
- image
- stock


Product details:

- Full information

---

# Pagination

Large datasets must always use pagination.

Required:

- Products
- Orders
- Customers
- Transactions
- Reports


Never load thousands of records at once.

---

# Infinite Scrolling

Use when appropriate.

Examples:

Product browsing

Activity logs


Avoid infinite scrolling in:

Financial reports

Administrative tables

---

# Database Performance

Always:

- Select required columns only.
- Use indexes.
- Optimize queries.
- Avoid unnecessary joins.

Avoid:

SELECT *

---

# Database Indexing

Indexes should exist for:

- Foreign keys
- Search fields
- Sorting fields
- Frequently filtered columns


Examples:

products.name

orders.status

orders.created_at

customers.phone

---

# Avoid N+1 Queries

Never request related data repeatedly.

Wrong:

Get 100 orders.

Then request customer for every order.


Correct:

Fetch required relations in one optimized query.

---

# Caching Strategy

Frequently used data should be cached.

Examples:

- Application settings
- User permissions
- Store information
- Static configurations


Every cache must have:

- Expiration strategy
- Refresh mechanism
- Invalidation method

---

# Code Splitting

Large features should be loaded only when needed.

Use lazy loading for:

- Reports
- Settings
- Analytics
- Large dashboards

---

# Images Optimization

All uploaded images must be optimized.

Rules:

- Compress images.
- Use appropriate formats.
- Generate thumbnails when needed.
- Avoid loading full-size images unnecessarily.

---

# File Loading

Large files must not block the application.

Examples:

- Excel imports
- Reports
- Invoice generation

Use:

- Background processing
- Progress indicators

---

# Tables Performance

Large tables must support:

- Pagination
- Filtering
- Sorting
- Searching


Avoid rendering thousands of rows.

Use virtualization when necessary.

---

# Search Performance

Search should be performed on optimized layers.

Small data:

Frontend filtering allowed.

Large data:

Database search required.

---

# Real-Time Performance

Real-time subscriptions must be controlled.

Rules:

- Subscribe only when needed.
- Remove subscriptions when leaving pages.
- Avoid duplicate listeners.

---

# Notifications Performance

Notifications must not overload the application.

Use:

- Pagination
- Read/unread states
- Lazy loading

---

# Background Tasks

Heavy operations should not block the UI.

Examples:

- Import Excel
- Generate reports
- Process images
- Export data


Show:

- Progress
- Status
- Completion result

---

# Bundle Optimization

Avoid importing unnecessary libraries.

Prefer:

Small focused packages.

Check:

- Bundle size
- Duplicate dependencies

---

# Network Optimization

Reduce:

- API requests
- Duplicate requests
- Large responses


Use:

- Caching
- Request deduplication
- Compression

---

# Mobile Performance

The application must perform well on:

- Low-end phones
- Slow networks
- Small screens


Avoid:

- Heavy animations
- Large initial bundles
- Huge images

---

# Monitoring

The application should support monitoring.

Track:

- Loading times
- Errors
- Slow queries
- Failed requests

---

# Performance Testing

Use:

## Lighthouse

For:

- Performance
- Accessibility
- Best practices


## k6

For:

- Load testing
- API performance
- Concurrent users


## Browser DevTools

For:

- Rendering analysis
- Network analysis

---

# Performance Checklist

Before completing any feature:

✓ No unnecessary renders

✓ Data is paginated

✓ Queries optimized

✓ Images optimized

✓ Loading states implemented

✓ Mobile performance checked

✓ Large operations handled asynchronously

✓ No duplicate requests

✓ Performance tested

---

# Golden Rules

Fast applications are designed, not fixed later.

Do not optimize everything.

Optimize what matters.

Never sacrifice data correctness for speed.

A slow feature is an incomplete feature.