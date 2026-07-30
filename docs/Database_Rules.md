# DATABASE_RULES.md

# Homs Shop Database Standards

## Purpose

This document defines the official database architecture and development standards for Homs Shop.

Every database object must follow these rules.

Violating these rules is considered an architecture violation.

---

# Database Engine

Current database:

Supabase PostgreSQL

The system must remain compatible with standard PostgreSQL.

Avoid vendor lock-in whenever possible.

---

# Primary Keys

Every table MUST use UUID.

Example:

id UUID PRIMARY KEY

Never use auto increment integers.

---

# Required Columns

Every business table must include:

id

created_at

updated_at

deleted_at (Soft Delete)

created_by

updated_by

---

# Naming Convention

Tables

Use plural.

Correct:

products

orders

customers

employees

payments

Wrong:

product

tbl_products

ProductTable

---

Columns

Use snake_case.

Correct:

created_at

customer_name

payment_status

Wrong:

customerName

CreatedAt

Customer_Name

---

Foreign Keys

Always use:

table_name_id

Example:

customer_id

product_id

order_id

employee_id

---

# Soft Delete

Never permanently delete business data.

Use:

deleted_at

When deleting:

Update deleted_at instead of removing the row.

---

# Audit Trail

Important tables must support activity history.

Examples:

orders

payments

products

customers

Inventory changes

Every important action should be traceable.

---

# Timestamps

Use UTC.

Never depend on client time.

Database time is the source of truth.

---

# Relationships

Always define proper foreign keys.

Never store duplicated data unless necessary for performance.

Use normalization first.

Denormalize only with documented reasons.

---

# Indexes

Create indexes for:

Foreign Keys

Frequently searched columns

Filtering columns

Sorting columns

Unique values

Avoid unnecessary indexes.

---

# Constraints

Always use database constraints.

Examples:

NOT NULL

UNIQUE

CHECK

FOREIGN KEY

Never rely only on frontend validation.

---

# Transactions

Business operations involving multiple updates must use transactions.

Example:

Create Order

↓

Insert Order

↓

Insert Order Items

↓

Decrease Inventory

↓

Create Payment Record

↓

Commit

Rollback if any step fails.

---

# Row Level Security

Every table must be reviewed for RLS.

Never expose data without proper policies.

Default:

Deny all

Then explicitly allow.

---

# Roles

Database permissions should be based on roles.

Examples:

Owner

Manager

Employee

Customer

Never hardcode permissions.

---

# Views

Use Views for:

Reporting

Dashboards

Complex read-only queries

Never duplicate SQL everywhere.

---

# RPC Functions

Use PostgreSQL Functions (RPC) for:

Complex business operations

Financial calculations

Atomic operations

Heavy SQL logic

Avoid placing complex SQL inside frontend code.

---

# Triggers

Use triggers only when necessary.

Examples:

Update updated_at

Create Audit Log

Inventory synchronization

Avoid unnecessary trigger chains.

---

# Storage

Store only file references inside the database.

Never store binary files inside tables.

Examples:

Product Images

Invoices

Documents

Logos

---

# File Naming

Uploaded files should use UUID names.

Never trust original filenames.

---

# JSON Columns

Use JSONB only when flexibility is required.

Examples:

Application Settings

Dynamic Metadata

Avoid replacing relational design with JSON.

---

# Enum Strategy

Prefer PostgreSQL ENUM or lookup tables for:

Order Status

Payment Status

Shipment Status

User Roles

Never hardcode repeated status strings.

---

# Pagination

Never return unlimited rows.

Every query must support:

Pagination

Filtering

Sorting

Searching

---

# Searching

Support:

Full Text Search where appropriate.

Indexes should be optimized for searching.

---

# Performance

Avoid:

SELECT *

Always select only required columns.

Optimize joins.

Avoid N+1 queries.

---

# Security

Never expose sensitive columns unnecessarily.

Always validate ownership.

Never trust client input.

---

# Multi-Tenant Strategy

Each customer owns an independent database.

The application code remains shared.

Each deployment has:

Own Database

Own Environment Variables

Own Storage

Own Configuration

---

# White Label

Store configurable values inside settings.

Examples:

Store Name

Logo

Currency

Language

Tax

Primary Color

Contact Information

Never hardcode branding.

---

# Settings Architecture

The application configuration system must be scalable, extensible, secure, and independent from the application code.

Business configuration must never be hardcoded.

Infrastructure configuration belongs only in .env.

---

# Settings Module

The project should include a dedicated Settings module.

settings/

├── app_settings

├── setting_groups

├── setting_history

├── settingsService.js

├── useSettings.js

└── validators/

The Settings module is responsible for all application configuration.

No other feature should access the settings tables directly.

---

# app_settings

Stores all configurable values.

Recommended fields:

id

key

value

type

group_id

description

default_value

is_public

is_editable

validation_rules

sort_order

created_at

updated_at

created_by

updated_by

---

# setting_groups

Groups settings inside the admin panel.

Examples:

General

Branding

Localization

Business

Orders

Payments

Shipping

Notifications

Security

Features

Appearance

System

Integrations

AI

Social Media

---

# setting_history

Stores every settings modification.

Recommended fields:

id

setting_id

old_value

new_value

changed_by

changed_at

reason

Every settings modification should be traceable.

Settings should never silently change.

---

# Value Types

Supported types:

string

number

boolean

json

array

url

email

phone

image

color

date

time

datetime

markdown

html

---

# Feature Flags

The settings system must also support Feature Flags.

Examples:

enable_coupons

enable_loyalty

enable_reviews

enable_ai

enable_dark_mode

enable_sms

enable_whatsapp

enable_cash_payments

enable_online_payments

New features should be enabled without code modifications.

---

# Public Settings

Public settings can be sent to frontend.

Examples:

Store Name

Logo

Currency

Primary Color

Language

Timezone

Private settings must never leave the backend.

Examples:

API Keys

SMTP Password

JWT Secret

Service Role Keys

---

# Environment Variables

.env should contain infrastructure only.

Allowed:

Supabase URL

Supabase Keys

SMTP Credentials

OAuth Secrets

API Secrets

JWT Secrets

Service Role Keys

Forbidden:

Store Name

Logo

Currency

Tax Rate

WhatsApp Number

Invoice Prefix

Shipping Company

Theme

Business Settings

---

# Settings Service

Every part of the application must communicate with the settings module using SettingsService.

Examples:

SettingsService.get()

SettingsService.set()

SettingsService.getBoolean()

SettingsService.getColor()

SettingsService.getJSON()

SettingsService.refresh()

Direct database access is forbidden.

---

# React Hook

Frontend components must use:

useSettings()

Never query settings directly.

---

# Caching

Settings should be loaded once after login.

Cache in memory.

Refresh only when:

Admin updates settings

Manual refresh

Application reload

Avoid repeated database queries.

---

# Validation

Every setting must be validated before saving.

Examples:

Email validation

URL validation

Color validation

JSON validation

Number ranges

Required values

Validation belongs inside the Settings module.

---

# Dynamic Configuration

Adding a new setting must never require:

Database schema changes

Frontend architecture changes

Backend architecture changes

Only insert a new database record.

---

# White Label

The Settings module is responsible for White Label support.

Examples:

Store Name

Store Logo

Favicon

Brand Colors

Typography

Language

Currency

Invoice Design

Company Information

Tax Information

Support Information

Everything should be configurable.

---

# Audit

Every settings modification must be logged.

Log:

Who changed it

When

Old value

New value

Reason (optional)

---

# Backup

The architecture should support future implementation of:

Settings Backup

Settings Restore

Settings Export

Settings Import

No architecture changes should be required when adding these features.

---

# Golden Rules

The database is the source of truth.

The Settings module is the only gateway to configuration.

Frontend must never hardcode configurable values.

Business configuration belongs in the database.

Infrastructure configuration belongs in .env.

Every new configurable option must be added through the Settings module.

# Migration Rules

Every schema change must use migrations.

Never edit production database manually.

Every migration must be reversible whenever possible.

---

# Backup

Backups should be scheduled.

Always verify restore procedures.

A backup that cannot be restored is considered invalid.

---

# Logging

Database errors should be logged.

Critical operations should generate audit records.

---

# Golden Rules

Database is the single source of truth.

Business validation belongs in Services and database constraints.

Frontend validation improves UX but never replaces database validation.

Security always comes before convenience.

Performance optimization must never sacrifice data integrity.