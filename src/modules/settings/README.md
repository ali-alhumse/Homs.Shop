# Settings Module

## Purpose
Centralized configuration management for the application. Stores all white-label and business settings.

## Public API
- `SettingsProvider` — Context provider
- `useSettingsContext()` — Hook to access settings
- `settingsService.getAll()` — Get all public settings
- `settingsService.get(key)` — Get a single setting
- `settingsService.set(key, value)` — Update a setting

## Dependencies
- Supabase (app_settings table)
- Shared: response utilities

## Settings Groups
General, Branding, Localization, Business, Orders, Payments, etc.
