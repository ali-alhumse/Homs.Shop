# DEPLOYMENT.md

# Homs Shop Deployment Guide

## Purpose

This document defines the official deployment strategy for Homs Shop.

The goal is to keep deployments simple, secure, repeatable, and scalable.

---

# Deployment Philosophy

Homs Shop follows:

- One Shared Codebase
- One Customer Per Deployment
- One Database Per Customer
- One Storage Per Customer
- One Configuration Per Customer

Customers never share databases.

Customers never share storage.

Customers remain completely isolated.

---

# Customer Isolation

Every customer must have:

- Independent Supabase Project
- Independent PostgreSQL Database
- Independent Storage
- Independent Authentication
- Independent Environment Variables
- Independent Domain (Optional)

No customer data should ever be accessible by another customer.

---

# Shared Codebase

The application code is shared.

Business data is isolated.

Branding is configurable.

The same repository should serve every deployment.

Never create separate repositories for different customers.

---

# Deployment Process

New customer deployment:

1. Create Supabase Project

2. Apply Database Migrations

3. Configure Storage Buckets

4. Create Default Administrator

5. Insert Default Settings

6. Configure Environment Variables

7. Deploy Application

8. Verify Deployment

9. Deliver Credentials

---

# Environment Variables

Environment variables should contain infrastructure only.

Examples:

SUPABASE_URL

SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE

SMTP_HOST

SMTP_PORT

SMTP_USERNAME

SMTP_PASSWORD

JWT_SECRET

Never store business configuration inside .env.

---

# White Label

Every deployment should support:

Store Name

Logo

Primary Color

Secondary Color

Currency

Language

Timezone

Invoice Settings

Company Information

Support Information

All branding must come from Settings.

---

# Storage

Each customer owns independent Storage Buckets.

Examples:

products/

avatars/

documents/

logos/

invoices/

exports/

backups/

Never share storage between customers.

---

# Database

Each customer owns:

Independent Database

Independent Authentication

Independent Policies

Independent Settings

Independent Users

---

# Deployment Checklist

Before delivery verify:

Database connected

Storage working

Authentication working

RLS enabled

Administrator account created

Settings loaded

Uploads working

Notifications working

Payments configured

Shipping configured

Responsive verified

Tests passed

No console errors

---

# Updates

All customers share the same application version.

Updates should follow:

Backup

↓

Migration

↓

Deploy

↓

Verification

↓

Release

Never deploy without backup.

---

# Database Migration

Every schema update must use migrations.

Never manually edit production databases.

Every migration should be tested before deployment.

Whenever possible:

Migrations should support rollback.

---

# Backup Strategy

Before every deployment:

Database Backup

Storage Backup

Settings Backup

Migration Backup

Verify backup integrity before deployment.

---

# Rollback

If deployment fails:

Restore previous database

Restore previous settings

Restore previous storage

Redeploy previous version

Rollback should be documented.

---

# Monitoring

Every deployment should monitor:

Errors

Performance

Database

Storage

Authentication

API

Critical failures should be logged.

---

# Security

Never expose:

Service Keys

Secrets

Passwords

Private Configuration

Use HTTPS everywhere.

Enable RLS on every business table.

---

# Scaling

The architecture should support unlimited customer deployments.

Adding a new customer must not require code changes.

Only:

New deployment

New database

New settings

New administrator

---

# Future Automation

The architecture should support automatic deployment.

Future deployment process should become:

Create Customer

↓

Generate Configuration

↓

Provision Database

↓

Apply Migrations

↓

Seed Default Data

↓

Deploy

↓

Run Health Check

↓

Ready

No architecture changes should be required when automation is implemented.

---

# Versioning

Every deployment must include:

Application Version

Database Version

Migration Version

Deployment Date

Administrator Information

---

# Golden Rules

One codebase.

One deployment per customer.

One database per customer.

One storage per customer.

Never share customer data.

Always backup before deployment.

Everything configurable.

Deployment must be repeatable.

Deployment must be documented.

Deployment must be secure.