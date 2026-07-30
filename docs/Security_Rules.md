# SECURITY_RULES.md

# Homs Shop Security Standards

## Purpose

This document defines the mandatory security standards for Homs Shop.

Security is a core requirement, not an optional feature.

Every module, feature, database operation, and integration must follow these rules.

---

# Security Principles

The application must follow:

- Least Privilege Principle
- Defense In Depth
- Zero Trust Approach
- Secure By Default

Never trust:

- User input
- Frontend validation
- Client-side permissions
- External requests

All sensitive operations must be verified on trusted layers.

---

# Authentication

Authentication is handled through:

Supabase Authentication

Supported methods may include:

- Email and Password
- OAuth providers
- Phone authentication (future)

---

# Authentication Rules

Never store passwords manually.

Never store authentication tokens in database tables.

Never expose sensitive authentication data.

Sessions must be managed securely.

Users must be able to:

- Login
- Logout
- Reset password
- Manage sessions

---

# Authorization

Authentication confirms identity.

Authorization confirms permissions.

Every action requires permission verification.

Examples:

Create Product

Update Order

Delete Customer

View Financial Reports

Manage Employees

---

# Roles

The system must support role-based access control.

Examples:

Owner

Manager

Employee

Customer


Never write permission checks directly:

Wrong:

if(role === "admin")


Correct:

PermissionService.can("product.delete")

---

# Permissions

Permissions must be centralized.

Examples:

products.view

products.create

products.update

products.delete

orders.view

orders.update

payments.manage

reports.view

settings.manage

---

# Database Security

Supabase Row Level Security (RLS) must be enabled.

Default policy:

DENY ALL

Then explicitly allow required actions.

Never expose tables without policies.

---

# Row Level Security Rules

Every table must answer:

Who can read this?

Who can insert?

Who can update?

Who can delete?

What records can they access?

---

# Data Isolation

Each customer/store must only access its own data.

A user from Store A must never access:

Products of Store B

Orders of Store B

Customers of Store B

Financial data of Store B

---

# Multi Instance Security

Each sold copy of Homs Shop has:

- Own database
- Own storage
- Own configuration
- Own environment variables

No customer data sharing.

---

# Frontend Security

Frontend is never trusted.

Hiding a button is NOT security.

Example:

Wrong:

Hide delete button for employees.

Correct:

Frontend hides button.

Backend/database blocks deletion.

---

# Input Validation

All user input must be validated.

Validation layers:

1. Frontend validation
2. Service validation
3. Database constraints

Never rely on frontend validation only.

---

# Protection Against Common Attacks

The application must protect against:

## XSS

Rules:

- Escape user generated content.
- Sanitize HTML input.
- Avoid dangerous rendering.

---

## SQL Injection

Rules:

- Never build SQL using string concatenation.
- Use Supabase queries safely.
- Validate inputs.

---

## CSRF

Protect sensitive operations.

Use secure authentication mechanisms.

---

## Broken Access Control

Every request must verify ownership and permissions.

---

# File Security

Files are stored using Supabase Storage.

Rules:

- Never trust uploaded filenames.
- Generate unique file names.
- Validate file type.
- Validate file size.
- Restrict file access.

Examples:

Product images

Invoices

Documents

Logos

---

# Sensitive Data

Never expose:

- Passwords
- API Keys
- Private Tokens
- Payment Secrets
- Service Role Keys

Never send unnecessary database columns to frontend.

---

# Environment Variables

.env is only for secrets.

Allowed:

SUPABASE_URL

SUPABASE_ANON_KEY

SERVICE_ROLE_KEY

API_KEYS

SMTP_PASSWORD


Forbidden:

Store Name

Currency

Theme

Business Settings

---

# Payment Security

Payment operations must:

- Verify transactions server-side.
- Never trust payment success from frontend.
- Store transaction history.
- Log payment events.

---

# Audit Logging

Important actions must be logged.

Examples:

Login

Logout

Permission changes

Settings changes

Product deletion

Order status changes

Payment actions

Log:

Who

What

When

Previous value

New value

---

# Error Handling

Never expose internal errors to users.

Wrong:

Database error: relation does not exist


Correct:

Something went wrong. Please try again.

Detailed errors should be logged internally.

---

# Rate Limiting

Sensitive operations should have limits.

Examples:

Login attempts

Password reset

Payment requests

API requests

---

# Third Party Integrations

External services must be isolated.

Examples:

Payment gateways

Shipping providers

WhatsApp API

Email providers

Never place third-party logic inside features.

Use:

Integration Services

---

# Security Review

Every new feature must answer:

- Does it access user data?
- Does it require permissions?
- Does it expose sensitive information?
- Does it need RLS changes?
- Does it need audit logs?
- Does it handle files or payments?

---

# Security Checklist

Before completing any feature:

✓ Authentication considered

✓ Permissions implemented

✓ RLS reviewed

✓ Input validation added

✓ Sensitive data protected

✓ Errors handled safely

✓ Audit requirements checked

✓ File security checked

✓ Tests added

✓ No secrets exposed

---

# Golden Rules

Security is enforced on trusted layers.

Frontend security is not enough.

Database security is mandatory.

Never trust user input.

Never expose secrets.

Every user can only access data they own or are authorized to access.