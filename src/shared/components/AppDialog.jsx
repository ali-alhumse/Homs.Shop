import { AppModal } from './AppModal';
import { AppButton } from './AppButton';

export function AppDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  return (
    <AppModal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-gray-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <AppButton variant="secondary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </AppButton>
        <AppButton variant={variant} onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </AppButton>
      </div>
    </AppModal>
  );
}
