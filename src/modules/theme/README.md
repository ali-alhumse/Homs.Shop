# Theme Module

## Purpose
Manages light/dark theme toggling and persistence.

## Public API
- `ThemeProvider` — Context provider
- `useThemeContext()` — Hook with { theme, toggleTheme, setTheme }
- `themeService.getCurrentTheme()` — Read persisted theme
- `themeService.setTheme(theme)` — Apply and persist theme
