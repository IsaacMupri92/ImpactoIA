'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ToolStats } from '@/lib/types/consumption';
import { TOOLS } from '@/data/toolsData';

export interface ToolBreakdownProps {
  toolStats: ToolStats[];
}

export function ToolBreakdown({ toolStats }: ToolBreakdownProps) {
  const chartData = toolStats.map((stat) => {
    const tool = TOOLS.find((t) => t.id === stat.toolId);
    return {
      name: tool?.name || stat.toolId,
      co2: stat.co2Kg * 1000, // Convert to grams
      percentage: stat.percentage,
      icon: tool?.icon || '🤖',
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desglose por herramienta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Percentage bars */}
          <div className="space-y-3">
            {chartData.map((tool, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700">
                    {tool.icon} {tool.name}
                  </span>
                  <span className="text-gray-600">
                    {tool.co2.toFixed(1)}g CO₂ ({tool.percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-sustainable-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${tool.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  label={{
                    value: 'CO₂ (g)',
                    position: 'insideBottom',
                    offset: -5,
                    style: { fontSize: '12px', fill: '#6b7280' },
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}g CO₂`, 'Emisiones']}
                />
                <Bar dataKey="co2" fill="#22c55e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
