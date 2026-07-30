# MODULE_GUIDE.md

# Homs Shop Module Development Guide

## Purpose

This document defines the official rules for creating and maintaining Core Modules.

Modules are part of the application's infrastructure.

They provide shared functionality across the entire system.

Modules are not Features.

---

# What is a Module?

A Module is a reusable system that serves multiple Features.

Examples:

Authentication

Authorization

Settings

Notifications

Logging

Audit

Events

Storage

Payments

Shipping

Localization

Theme

Permissions

Analytics

Search

Backup

Import & Export

AI

Modules provide services.

Features consume those services.

---

# Module vs Feature

Feature

Example:

Products

Orders

Customers

Invoices

Employees

Coupons

Loyalty

Reports

Features deliver business functionality.

---

Module

Example:

Settings

Notification

Permission

Logging

Audit

Events

Storage

Localization

Theme

Authentication

Modules support Features.

---

# Core Rule

Features may depend on Modules.

Modules must NEVER depend on Features.

Wrong

Settings

↓

Products

Correct

Products

↓

Settings

---

# Module Folder Structure

modules/

module-name/

README.md

components/

services/

hooks/

providers/

constants/

validators/

tests/

index.js

Create only folders that are actually needed.

Avoid empty folders.

---

# Required Documentation

Every Module MUST include:

README.md

It should describe:

Purpose

Responsibilities

Public API

Dependencies

Events

Configuration

Examples

Future Improvements

Every Module must be documented.

---

# Responsibilities

Modules should provide reusable services.

Examples

NotificationService

SettingsService

PermissionService

StorageService

ThemeService

SearchService

AIService

Modules should never contain business-specific logic.

---

# Public API

Every Module should expose a clean API.

Example

NotificationService.success()

NotificationService.error()

SettingsService.get()

PermissionService.can()

ThemeService.change()

Avoid exposing internal implementation.

---

# Independence

Modules must remain independent.

One module should not tightly couple with another.

Communication should happen through interfaces or events whenever possible.

---

# UI Components

If a Module has UI components, they must be reusable.

Examples

AppToast

AppDialog

ThemeSwitcher

LanguageSelector

PermissionGate

---

# Performance

Modules should be lightweight.

Avoid unnecessary rendering.

Cache expensive operations.

Lazy load when possible.

---

# Configuration

Modules should support configuration.

Examples

Notification duration

Theme colors

Supported languages

Storage provider

Payment provider

Avoid hardcoded values.

---

# Security

Modules must never expose secrets.

Never trust frontend input.

Validate everything.

Protect sensitive operations.

---

# Testing

Every Module must include tests.

Minimum

Unit Tests

Critical modules should also include:

Integration Tests

E2E Tests when applicable.

---

# Logging

Critical modules should log important actions.

Examples

Authentication

Permission changes

Settings updates

Storage operations

Payment operations

---

# Versioning

Public APIs should remain stable.

Breaking changes must be documented.

Avoid changing public interfaces unnecessarily.

---

# Reusability

Modules should be reusable across different Features.

Never duplicate shared functionality inside Features.

---

# AI Instructions

Before creating a new Module:

Check if one already exists.

Before creating a new Feature:

Check if an existing Module already solves the problem.

Avoid creating duplicate infrastructure.

---

# Completion Checklist

Before marking a Module complete:

✓ README.md created

✓ Public API documented

✓ Tests written

✓ Responsive (if UI exists)

✓ Performance reviewed

✓ Security reviewed

✓ Documentation updated

✓ No duplicated logic

✓ Reusable by all Features

✓ Follows Architecture

---

# Golden Rules

Modules provide services.

Features provide business functionality.

Features depend on Modules.

Modules never depend on Features.

Shared logic belongs in Modules.

Business logic belongs in Features.

Every Module should be reusable, maintainable, documented, and independently testable.