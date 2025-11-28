'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export interface MetricCardProps {
  value: string | number;
  unit: string;
  label: string;
  icon: string;
  trend?: number; // Percentage change (positive or negative)
  variant?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const variantStyles = {
  success: 'border-sustainable-300 bg-sustainable-50',
  warning: 'border-warning-300 bg-warning-50',
  danger: 'border-impact-300 bg-impact-50',
  info: 'border-blue-300 bg-blue-50',
};

const iconBgStyles = {
  success: 'bg-sustainable-100',
  warning: 'bg-warning-100',
  danger: 'bg-impact-100',
  info: 'bg-blue-100',
};

export function MetricCard({
  value,
  unit,
  label,
  icon,
  trend,
  variant = 'info',
  className = '',
}: MetricCardProps) {
  const variantStyle = variantStyles[variant];
  const iconBgStyle = iconBgStyles[variant];

  return (
    <Card className={`${variantStyle} ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold font-mono text-gray-900">{value}</p>
              <p className="text-lg font-medium text-gray-600">{unit}</p>
            </div>
            {trend !== undefined && trend !== 0 && (
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={`text-sm font-medium ${
                    trend > 0 ? 'text-impact-600' : 'text-sustainable-600'
                  }`}
                >
                  {trend > 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">vs. ayer</span>
              </div>
            )}
          </div>
          <div
            className={`${iconBgStyle} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
