'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MonthlyData } from '@/lib/types/consumption';

export interface MonthlyChartProps {
  data: MonthlyData[];
}

type MetricType = 'energyKwh' | 'waterLiters' | 'co2Kg' | 'costEuros';

const metricConfig = {
  energyKwh: {
    label: 'Energía (kWh)',
    color: '#3b82f6',
    unit: 'kWh',
  },
  waterLiters: {
    label: 'Agua (L)',
    color: '#06b6d4',
    unit: 'L',
  },
  co2Kg: {
    label: 'CO₂ (kg)',
    color: '#ef4444',
    unit: 'kg',
  },
  costEuros: {
    label: 'Coste (€)',
    color: '#eab308',
    unit: '€',
  },
};

export function MonthlyChart({ data }: MonthlyChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('co2Kg');

  const config = metricConfig[selectedMetric];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Consumo últimos 30 días</CardTitle>
          <div className="flex gap-2">
            {Object.entries(metricConfig).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedMetric(key as MetricType)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedMetric === key
                    ? 'bg-sustainable-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {value.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                label={{
                  value: config.unit,
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: '12px', fill: '#6b7280' },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [
                  `${value.toFixed(2)} ${config.unit}`,
                  config.label,
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={config.color}
                strokeWidth={2}
                dot={{ fill: config.color, r: 4 }}
                activeDot={{ r: 6 }}
                name={config.label}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
