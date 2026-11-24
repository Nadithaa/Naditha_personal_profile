import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-300 right-300 z-50 max-w-sm bg-surface-800 border border-border-strong text-[#EDEDED] px-100 py-75 rounded-lg shadow-2xl flex items-center gap-75 motion-base animate-in fade-in slide-in-from-bottom-2"
    >
      <CheckCircle2 className="w-5 h-5 text-[#4ADE80] shrink-0" />
      <span className="caption-1 text-[#EDEDED]">{message}</span>
    </div>
  );
};
