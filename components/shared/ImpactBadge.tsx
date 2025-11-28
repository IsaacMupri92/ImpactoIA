import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { getImpactLevel } from '@/lib/calculations/consumption';

export interface ImpactBadgeProps {
  co2Kg: number;
  className?: string;
}

const impactLabels = {
  low: 'Impacto Bajo',
  medium: 'Impacto Medio',
  high: 'Impacto Alto',
  'very-high': 'Impacto Muy Alto',
};

const impactVariants = {
  low: 'success' as const,
  medium: 'warning' as const,
  high: 'danger' as const,
  'very-high': 'danger' as const,
};

export function ImpactBadge({ co2Kg, className = '' }: ImpactBadgeProps) {
  const level = getImpactLevel(co2Kg);
  const label = impactLabels[level];
  const variant = impactVariants[level];

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
