import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@shared/utils/cn';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

let toastId = 0;
let addToastFn = null;

export function showToast(type, message, duration = 4000) {
  if (addToastFn) {
    addToastFn({ id: ++toastId, type, message, duration });
  }
}

export function AppToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastFn = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    };
    return () => {
      addToastFn = null;
    };
  }, []);

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all',
              styles[toast.type]
            )}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-auto rounded p-1 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
