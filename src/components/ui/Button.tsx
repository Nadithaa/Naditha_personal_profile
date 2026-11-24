import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Rule B1 text styles and Rule B2 spacing:
  // Main buttons: 8px vertical padding (py-75 / py-[8px]), 12px horizontal padding (px-100 / px-[12px])
  const baseClasses = `
    inline-flex items-center justify-center gap-75 font-semibold text-center select-none
    transition-all duration-300 ease-base-curve
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-surface-950
    active:scale-[0.98] active:translate-y-[1px]
    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    sm: 'button-sm px-75 py-[6px] rounded-md',
    md: 'button-md px-100 py-75 rounded-lg', // B2 standard: 8px vertical, 12px horizontal
    lg: 'button-lg px-200 py-100 rounded-lg',
  }[size];

  // Rule B4: Flat backgrounds, no gradients
  const variantClasses = {
    primary: 'bg-[#EDEDED] text-surface-950 hover:bg-white border border-transparent shadow-sm',
    secondary: 'bg-surface-800 text-[#EDEDED] hover:bg-surface-700 border border-border-subtle',
    outline: 'bg-transparent text-[#EDEDED] hover:bg-surface-850 border border-border-strong',
    ghost: 'bg-transparent text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-surface-850 border border-transparent',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
