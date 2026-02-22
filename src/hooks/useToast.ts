import { useState, useCallback } from 'react';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      // Remove o toast automaticamente após 3 segundos
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
    },
    []
  );

  return { toasts, showToast };
};
