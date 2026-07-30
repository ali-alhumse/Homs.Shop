# Permission Module

## Purpose
Centralized permission checking and role-based access control.

## Public API
- `PermissionProvider` — Context provider
- `usePermissionContext()` — Hook with { can, canAny, permissions }
- `permissionService.getUserPermissions(userId)` — Fetch user permissions
- `permissionService.can(permissions, required)` — Check single permission
- `permissionService.canAny(permissions, list)` — Check any permission

## Permission Format
`resource.action` (e.g., `products.create`, `orders.view`)
