'use client';

import React from 'react';
import { MetricCard } from '@/components/shared/MetricCard';
import { formatEnergy, formatWater, formatCO2, formatCurrency } from '@/lib/utils/formatters';
import { ConsumptionResult } from '@/lib/types/consumption';

export interface DailyMetricsProps {
  consumption: ConsumptionResult;
  previousDayConsumption?: ConsumptionResult;
}

export function DailyMetrics({ consumption, previousDayConsumption }: DailyMetricsProps) {
  const calculateTrend = (current: number, previous: number | undefined): number | undefined => {
    if (previous === undefined || previous === 0) return undefined;
    return ((current - previous) / previous) * 100;
  };

  const energyTrend = calculateTrend(
    consumption.energyKwh,
    previousDayConsumption?.energyKwh
  );
  const waterTrend = calculateTrend(
    consumption.waterLiters,
    previousDayConsumption?.waterLiters
  );
  const co2Trend = calculateTrend(consumption.co2Kg, previousDayConsumption?.co2Kg);
  const costTrend = calculateTrend(
    consumption.costEuros,
    previousDayConsumption?.costEuros
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon="⚡"
        label="Energía"
        value={consumption.energyKwh.toFixed(3)}
        unit="kWh"
        trend={energyTrend}
        variant="info"
      />
      <MetricCard
        icon="💧"
        label="Agua"
        value={consumption.waterLiters.toFixed(2)}
        unit="L"
        trend={waterTrend}
        variant="info"
      />
      <MetricCard
        icon="🌍"
        label="CO₂"
        value={(consumption.co2Kg * 1000).toFixed(1)}
        unit="g"
        trend={co2Trend}
        variant={consumption.co2Kg > 0.1 ? 'danger' : consumption.co2Kg > 0.05 ? 'warning' : 'success'}
      />
      <MetricCard
        icon="💶"
        label="Coste"
        value={consumption.costEuros.toFixed(2)}
        unit="€"
        trend={costTrend}
        variant="info"
      />
    </div>
  );
}
