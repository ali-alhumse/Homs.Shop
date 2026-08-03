# Auth Feature

## Purpose
Provides the account creation and sign-in screens for Homs Shop.

## Responsibilities
- Login with email + password
- Create a new account (with email confirmation support)
- Redirect authenticated users to the dashboard
- Handle auth errors with friendly messages

## Pages
- `LoginPage` — `/login`
- `RegisterPage` — `/register`

## Components
None (uses shared `AppInput`, `AppButton`, `PageLoader`, `showToast`).

## Services
Uses `authService` from the Auth Module (`@modules/auth/services/authService`).

## Validators
- `authValidator.validateLogin({ email, password })`
- `authValidator.validateRegister({ firstName, lastName, email, password, confirmPassword, agreeTerms })`

## Public API
- `LoginPage` — sign-in screen
- `RegisterPage` — account creation screen
- `authValidator` — reusable validation rules

## Permissions
- Public routes — no authentication required to view.

## Routes
- `/login` → `LoginPage`
- `/register` → `RegisterPage`

## Events
- `LOGIN_SUCCESS` — user authenticated (handled by Auth module `onAuthStateChange`)
- `REGISTRATION_SUCCESS` — account created (with or without session)

## Dependencies
- Auth Module (`@modules/auth`)
- Shared components (`AppButton`, `AppInput`, `PageLoader`, `AppToast`)
- Constants (`ROUTES`)

## Future Improvements
- Forgot password / reset password page
- OAuth providers (Google, etc.)
- Phone authentication
