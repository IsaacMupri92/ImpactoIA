import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  success: 'bg-sustainable-100 text-sustainable-800 border-sustainable-300',
  warning: 'bg-warning-100 text-warning-800 border-warning-300',
  danger: 'bg-impact-100 text-impact-800 border-impact-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
  neutral: 'bg-gray-100 text-gray-800 border-gray-300',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function Badge({ children, variant = 'neutral', size = 'md', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <span className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}>
      {children}
    </span>
  );
}
