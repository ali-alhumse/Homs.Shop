# PRNSTITUTION.md

# Homs Shop Project Constitution

## Purpose

This document is the highest-level authority for the Homs Shop project.

Every developer, AI assistant, and contributor must follow this constitution before reading any other documentation.

If any document conflicts with this constitution, this constitution takes precedence.

---

# Vision

Build a modern, scalable, secure, maintainable, and white-label SaaS platform for managing online businesses.

The project must remain easy to extend, easy to test, and easy to maintain for many years.

---

# Core Principles

Every decision should prioritize:

- Simplicity
- Scalability
- Security
- Maintainability
- Performance
- Reusability
- Consistency
- User Experience

Never sacrifice long-term quality for short-term convenience.

---

# Architecture

The project follows a modular architecture.

Business Features are separated from Core Modules.

Shared functionality must remain inside Shared or Modules.

Never mix responsibilities.

Follow ARCHITECTURE.md.

---

# Documentation First

Before implementing any Feature or Module:

Read all related documentation.

Every implementation must follow the project documentation.

Documentation is part of the source code.

Undocumented work is considered incomplete.

---

# Feature Philosophy

Features represent business capabilities.

Examples:

Products

Orders

Customers

Invoices

Reports

Features must remain independent.

Features may depend on Modules.

Features must never directly depend on other Features.

---

# Module Philosophy

Modules provide reusable infrastructure.

Examples:

Authentication

Settings

Notifications

Permissions

Logging

Storage

Modules never depend on Features.

---

# Database Philosophy

The database is the single source of truth.

Business data belongs in the database.

Configuration belongs in the Settings module.

Infrastructure configuration belongs in .env.

Follow DATABASE_RULES.md.

---

# UI Philosophy

The interface must be:

Modern

Responsive

Accessible

Consistent

Professional

Use shared UI components.

Never duplicate UI.

Follow DESIGN_SYSTEM.md and UI_UX_RULES.md.

---

# Coding Philosophy

Readable code is more important than clever code.

Small components are better than large components.

Reusable code is better than duplicated code.

Follow CODING_STANDARDS.md.

---

# Security Philosophy

Security is mandatory.

Never trust client input.

Never bypass permissions.

Never expose secrets.

Security is required from the first line of code.

Follow SECURITY_RULES.md.

---

# Performance Philosophy

Performance must be considered during development.

Do not optimize prematurely.

Do not ignore obvious inefficiencies.

Measure before optimizing.

Follow PERFORMANCE_RULES.md.

---

# Testing Philosophy

Every feature must be testable.

Critical business logic must include automated tests.

A feature without tests is not considered complete.

Follow TESTING_STRATEGY.md.

---

# API Philosophy

Business logic belongs in Services.

Frontend components must never communicate directly with the database.

Follow API_RULES.md.

---

# Error Handling

Errors should be predictable.

Users should receive friendly messages.

Developers should receive useful logs.

Never expose internal errors.

Follow ERROR_HANDLING.md.

---

# White Label Philosophy

Everything that can vary between customers must be configurable.

Never hardcode:

Store Name

Logo

Colors

Language

Currency

Company Information

Business Settings

The same codebase should serve multiple customers.

---

# AI Development Rules

AI assistants must:

Read documentation first.

Respect architecture.

Avoid duplicate code.

Avoid unnecessary dependencies.

Never modify unrelated files.

Document every new Feature and Module.

---

# Project Structure

The project is organized into:

core/

features/

modules/

shared/

layouts/

router/

providers/

config/

assets/

styles/

Documentation must remain inside:

docs/

---

# Long-Term Maintainability

Every decision should make future development easier.

Temporary solutions should be clearly marked.

Technical debt should be minimized.

---

# Golden Rules

- Documentation before implementation.
- Architecture before code.
- Security before convenience.
- Performance after correctness.
- Reuse before creating.
- Simplicity before complexity.
- Configuration before hardcoding.
- Testing before release.
- Consistency over personal preference.
- Small changes are better than large rewrites.
- If a change affects many unrelated files, stop and re-evaluate the architecture.
- Every Feature and Module must include documentation.
- Business rules must never be hidden inside UI components.
- The project must remain understandable by a new developer or AI without external explanations.

---
# Continuous Improvement

The architecture is allowed to evolve.

However, every architectural change must improve:

- Maintainability
- Simplicity
- Performance
- Scalability
- Developer Experience

Architecture should never become more complex without a measurable benefit.
---
# Final Rule

When in doubt:

Choose the solution that is simpler, more maintainable, easier to test, and more consistent with the project architecture.