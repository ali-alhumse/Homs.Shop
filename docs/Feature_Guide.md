# FEATURE_GUIDE.md

# Homs Shop Feature Development Guide

## Purpose

This document defines the official standard for designing, implementing, documenting, testing, and maintaining every feature inside Homs Shop.

Every feature MUST follow this guide.

Failure to follow these rules is considered an architecture violation.

---

# Core Philosophy

Every feature must be:

- Independent
- Reusable
- Testable
- Responsive
- Scalable
- Maintainable
- Easy to remove
- Easy to extend

Each feature should behave like an independent application inside the project.

A feature must never directly depend on another feature.

---

# Feature Folder Structure

Every feature should follow this structure when needed.

features/

feature-name/

    README.md

    components/

    pages/

    services/

    hooks/

    models/

    validators/

    constants/

    tests/

    index.js

Only create folders that are actually needed.

Avoid empty folders.

---

# Feature Documentation (Required)

Every feature MUST include a README.md file.

A feature without documentation is considered incomplete.

README.md should contain:

- Feature purpose
- Responsibilities
- Pages
- Components
- Services
- Public API
- Permissions
- Routes
- Events
- Dependencies
- Future improvements
- Notes for developers

The README should always be updated whenever the feature changes.

---

# Before Creating Any Feature

Before writing code always verify:

1. Does this feature already exist?

2. Can an existing component be reused?

3. Can an existing hook be reused?

4. Can an existing service be reused?

5. Can an existing validator be reused?

6. Does this feature follow the architecture?

Never duplicate existing code.

---

# Responsibilities

## Components

Responsible for:

- Rendering UI
- User interaction

Never:

- Fetch data directly
- Call Supabase directly
- Implement business logic

---

## Hooks

Responsible for:

- State management
- Calling services
- Managing UI behavior

Never:

- Contain business rules

---

## Services

Responsible for:

- Business logic
- API calls
- Supabase communication
- Data transformation

Never:

- Render UI

---

## Models

Responsible for:

- Data models
- Mapping
- Serialization

---

## Validators

Responsible for:

- Input validation
- Business validation

Validation must never be placed inside UI components.

---

## Constants

Responsible for:

- Status values
- Roles
- Labels
- Default values

Never hardcode repeated strings.

---

# UI Rules

Every feature must use shared UI components.

Examples:

- AppButton
- AppInput
- AppCard
- AppTable
- AppModal
- AppDialog
- AppSelect
- AppPagination
- AppToast

Never build duplicate UI components.

Always reuse existing ones.

---

# Responsive Rules

Every feature MUST work correctly on:

- Mobile
- Tablet
- Laptop
- Desktop
- Large Screens

Use Mobile First approach.

Responsive behavior must be built into the component itself.

Never create separate Mobile and Desktop pages.

---

# Loading States

Every async operation must support:

- Loading
- Success
- Error

Use:

- Skeleton
- Spinner
- Progress Indicator

Never freeze the interface.

---

# Empty States

Every page displaying data must support:

- Loading State
- Empty State
- Error State
- Data State

Blank pages are not allowed.

---

# Notifications

Never use:

- alert()
- confirm()
- prompt()

Always use:

NotificationService

For confirmations:

AppDialog

---

# Permissions

Every feature must validate permissions.

Never rely only on hidden buttons.

Permissions must also be enforced by backend/database policies.

---

# Events

Features should communicate through Events whenever possible.

Example:

Order Created

↓

Inventory Updated

↓

Invoice Generated

↓

Notification Sent

↓

Audit Log Created

Avoid direct feature-to-feature communication.

---

# Performance

Keep components small.

Lazy load large pages.

Memoize expensive calculations.

Avoid unnecessary re-renders.

Optimize rendering whenever possible.

---

# Accessibility

Every feature should support:

- Keyboard navigation
- Screen readers
- Visible focus
- Proper labels
- Accessible color contrast

---

# White Label Compatibility

Never hardcode:

- App Name
- Logo
- Colors
- Currency
- Language
- Tax
- Store Information

Everything must come from Settings.

---

# Testing

Every feature must include tests.

Minimum:

- Unit Tests
- Component Tests

Critical features should also include:

- End-to-End Tests

A feature without tests is incomplete.

---

# Completion Checklist

Before considering a feature complete:

✓ README.md created and updated

✓ Architecture respected

✓ Responsive on all screen sizes

✓ Permissions implemented

✓ Validation completed

✓ Tests added

✓ Loading handled

✓ Empty State handled

✓ Error State handled

✓ Notifications implemented

✓ Shared Components reused

✓ No duplicated code

✓ Code reviewed

✓ Documentation updated

Only after all items are completed can a feature be merged into the project.

# Golden Rule

If implementing a new feature requires modifying many unrelated files, stop.

Re-evaluate the architecture before writing code.

A feature should be added with minimal impact on the rest of the application.

The goal is high cohesion and low coupling.