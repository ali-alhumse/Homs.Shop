# Homs Shop - AI Agent Instructions

## Read First

Before making any changes, read ALL documentation inside the `/docs` directory.

These documents define the project's architecture, coding standards, and development workflow.

Do not start coding before understanding the documentation.

---

## Priority Order

If multiple documents exist, follow this priority:

1. PROJECT_CONSTITUTION.md
2. ARCHITECTURE.md
3. DATABASE_RULES.md
4. SECURITY_RULES.md
5. API_RULES.md
6. CODING_STANDARDS.md
7. DESIGN_SYSTEM.md
8. UI_UX_RULES.md
9. FEATURE_GUIDE.md
10. MODULE_GUIDE.md
11. PERFORMANCE_RULES.md
12. TESTING_STRATEGY.md
13. ERROR_HANDLING.md
14. DEPLOYMENT.md

---

## Architecture Rules

Always follow the documented architecture.

Never introduce a new architecture.

Never ignore the existing folder structure.

Never create duplicate logic.

---

## Before Coding

Always:

- Read documentation.
- Understand the task.
- Check existing code.
- Reuse existing modules.
- Ask if requirements are unclear.

Never make architectural assumptions.

---

## Code Quality

Write clean, readable and maintainable code.

Avoid unnecessary complexity.

Prefer composition over duplication.

Split large components.

Follow the documented naming conventions.

---

## Features

Every Feature must:

- Follow FEATURE_GUIDE.md
- Have clear responsibility
- Remain independent
- Be documented
- Be testable

---

## Modules

Every Module must:

- Follow MODULE_GUIDE.md
- Be reusable
- Never depend on Features
- Expose a clean public API

---

## UI

Use:

- React
- Tailwind CSS

Never use:

- Bootstrap
- jQuery
- Inline styles (unless absolutely necessary)

All UI must follow DESIGN_SYSTEM.md and UI_UX_RULES.md.

---

## Database

Never modify database structure without following DATABASE_RULES.md.

Never bypass RLS.

Never hardcode business configuration.

---

## Security

Security is mandatory.

Never expose secrets.

Never trust client input.

Validate everything.

---

## Testing

New logic should include appropriate tests.

Do not mark a task complete if critical functionality is untested.

---

## Documentation

If a Feature or Module changes:

Update its documentation when required.

Documentation is part of the implementation.

---

## Scope

Modify only files related to the current task.

Avoid unrelated refactoring.

Avoid changing working code without reason.

---

## If Unsure

Stop.

Explain the uncertainty.

Ask for clarification instead of guessing.

---
Before writing any database query or migration:
1. Read docs/database/table_names.md
2. Use existing table names only
3. Do not create new tables without approval

---
## Final Rule

The goal is not only to make the application work.

The goal is to keep the project scalable, maintainable, secure and consistent for many years.
