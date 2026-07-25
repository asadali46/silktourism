import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />,
  };

  const bgStyles = {
    success: 'border-emerald-200 bg-white shadow-xl shadow-emerald-900/5',
    error: 'border-rose-200 bg-white shadow-xl shadow-rose-900/5',
    info: 'border-amber-200 bg-white shadow-xl shadow-amber-900/5',
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border ${
        bgStyles[toast.type]
      } transition-all duration-300 animate-slide-up`}
    >
      {icons[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
        {toast.message && <p className="text-xs text-slate-600 mt-0.5">{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
