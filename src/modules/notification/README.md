# Notification Module

## Purpose
Manages in-app toast notifications and notification history.

## Public API
- `NotificationProvider` — Context provider
- `useNotificationContext()` — Hook to fire notifications
- `notificationService.getAll()` — Fetch notification history
- `notificationService.markAsRead(id)` — Mark notification read
- `notificationService.getUnreadCount()` — Get unread count
- `showToast(type, message)` — Static toast trigger

## Types
success, error, warning, info
