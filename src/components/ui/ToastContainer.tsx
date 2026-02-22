import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: { id: number; message: string; type: 'success' | 'error' }[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-[320px] pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md
            animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-auto
            ${
              toast.type === 'success'
                ? 'bg-white/10 border-white/20 text-white'
                : 'bg-red-500/20 border-red-500/50 text-red-200'
            }
          `}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={18} className="text-green-400" />
          ) : (
            <AlertCircle size={18} className="text-red-400" />
          )}
          <span className="text-xs font-medium tracking-tight flex-1">
            {toast.message}
          </span>
        </div>
      ))}
    </div>
  );
};
