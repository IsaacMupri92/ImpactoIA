'use client';

import React from 'react';

export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  success: 'bg-sustainable-600',
  warning: 'bg-warning-500',
  danger: 'bg-impact-600',
  info: 'bg-blue-600',
};

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  variant = 'success',
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  // Determinar variante automáticamente según el valor
  let autoVariant = variant;
  if (variant === 'success') {
    if (percentage < 33) autoVariant = 'success';
    else if (percentage < 66) autoVariant = 'warning';
    else autoVariant = 'danger';
  }

  const barColor = variantStyles[autoVariant];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeStyle}`}>
        <div
          className={`${barColor} ${sizeStyle} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
