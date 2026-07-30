# Auth Module

## Purpose
Handles user authentication, session management, and login/logout flows.

## Public API
- `AuthProvider` — Context provider wrapping the app
- `useAuthContext()` — Hook to access auth state
- `authService.login(email, password)` — Authenticate user
- `authService.logout()` — End session
- `authService.getSession()` — Get current session
- `authService.resetPassword(email)` — Send password reset

## Dependencies
- Supabase Auth
- Shared: response utilities

## Events
- Login successful
- Logout
- Session expired
