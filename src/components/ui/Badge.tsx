import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'success' | 'highlight' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    neutral: 'bg-surface-800 text-[#A1A1A1] border-border-subtle',
    success: 'bg-surface-800 text-[#4ADE80] border-[#225533]',
    highlight: 'bg-surface-800 text-[#EDEDED] border-border-strong',
    outline: 'bg-transparent text-[#888888] border-border-subtle',
  }[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-50 caption-4 px-75 py-[3px] rounded-md border
        font-mono uppercase tracking-wider select-none
        ${variantStyles} ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            variant === 'success' ? 'bg-[#4ADE80]' : 'bg-[#EDEDED]'
          }`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};
